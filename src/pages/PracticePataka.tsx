 import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Camera,
  Square,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Settings,
  Target,
  TrendingUp,
  CheckCircle,
  XCircle,
  RotateCcw
} from 'lucide-react';
import GlassCard from '../components/Common/GlassCard';
import AIGuru from '../components/Common/AIGuru';
import {
  calculateAccuracyByMudra,
  generateFeedbackByMudra,
  drawHandLandmarks,
  MudraType,
  FeedbackItem
} from '../utils/handTracking';

const PracticePataka: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [accuracy, setAccuracy] = useState(87);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [sessionTime] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([
    { type: 'correct', message: 'Perfect finger alignment!', timestamp: '0:15' },
    { type: 'warning', message: 'Thumb needs slight adjustment', timestamp: '0:32' },
    { type: 'correct', message: 'Excellent wrist position', timestamp: '0:45' }
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [handLandmarks, setHandLandmarks] = useState<{ x: number; y: number; z: number }[][]>([]);
  const [isHandDetected, setIsHandDetected] = useState(false);

  const mudraInstructions = {
    name: 'Pataka',
    sanskrit: 'पताका',
    description: 'All fingers extended and joined together like a flag',
    steps: [
      'Extend all fingers straight',
      'Keep fingers close together',
      'Thumb pressed against palm',
      'Palm facing outward'
    ]
  };

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'correct': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <XCircle className="w-4 h-4 text-yellow-600" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-600" />;
      default: return <Target className="w-4 h-4 text-gray-600" />;
    }
  };

  // Hand recognition setup
  useEffect(() => {
    if (!isRecording) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let hands: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let mpCamera: any;

    const setupHandTracking = async () => {
      const { Hands } = await import('@mediapipe/hands');
      const { Camera: MediaPipeCamera } = await import('@mediapipe/camera_utils');

      hands = new Hands({
        locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.85,
        minTrackingConfidence: 0.85,
        selfieMode: false,
      });

      hands.onResults((results: { multiHandLandmarks: { x: number; y: number; z: number }[][] | null }) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          setHandLandmarks(results.multiHandLandmarks);
          setIsHandDetected(true);
          const landmarks = results.multiHandLandmarks[0];
          const calculatedAccuracy = calculateAccuracyByMudra(MudraType.Pataka, landmarks);
          setAccuracy(Math.round(calculatedAccuracy));
          setFeedback(generateFeedbackByMudra(MudraType.Pataka, landmarks, calculatedAccuracy, feedback));
        } else {
          setHandLandmarks([]);
          setIsHandDetected(false);
        }
      });

      if (videoRef.current) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          videoRef.current!.srcObject = stream;
          videoRef.current!.onloadedmetadata = () => {
            mpCamera = new MediaPipeCamera(videoRef.current!, {
              onFrame: async () => {
                await hands.send({ image: videoRef.current! });
              },
              width: 640,
              height: 480,
            });
            mpCamera.start();
          };
        });
      }
    };

    setupHandTracking();

    return () => {
      setHandLandmarks([]);
      setIsHandDetected(false);
      if (mpCamera) mpCamera.stop();
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [isRecording]);



  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      drawHandLandmarks(canvasRef.current, videoRef.current, handLandmarks, isHandDetected);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [handLandmarks, isHandDetected]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-white to-[#F5E6D3]/50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F4E79] mb-4">
            Practice Pataka Mudra
          </h1>
          <p className="text-xl text-gray-600">
            Real-time AI feedback for perfect Pataka formation
          </p>
        </motion.div>

        {/* Main Practice Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Camera & AI Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <GlassCard className="p-6 bg-white/80">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#1F4E79]">Live Practice</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsAudioOn(!isAudioOn)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {isAudioOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                  <button
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    title="Settings"
                  >
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Camera Feed */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-6">
                {isRecording ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-96 object-cover"
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    />

                    {/* AI Overlay */}
                    <div className="absolute inset-0">
                      {/* Hand Detection Status */}
                      <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 rounded-full px-3 py-2">
                        <div className={`w-2 h-2 rounded-full ${isHandDetected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                        <span className="text-white text-sm font-medium">
                          {isHandDetected ? 'HAND DETECTED' : 'NO HAND'}
                        </span>
                      </div>

                      {/* Accuracy Meter */}
                      <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-3">
                        <div className="text-white text-sm font-medium mb-2">Accuracy</div>
                        <div className="flex items-center space-x-2">
                          <div className={`text-2xl font-bold ${isHandDetected ? (accuracy >= 90 ? 'text-green-400' : accuracy >= 75 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-400'}`}>
                            {isHandDetected ? `${accuracy}%` : '--'}
                          </div>
                          <TrendingUp className={`w-4 h-4 ${isHandDetected ? (accuracy >= 90 ? 'text-green-400' : accuracy >= 75 ? 'text-yellow-400' : 'text-red-400') : 'text-gray-400'}`} />
                        </div>
                        {isHandDetected && (
                          <div className="mt-2">
                            <span className="text-xs text-white">
                              {accuracy >= 90
                                ? 'Excellent Pataka!'
                                : accuracy >= 75
                                ? 'Good Pataka, keep practicing!'
                                : 'Pataka needs improvement'}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Recording Indicator */}
                      <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-red-600 rounded-full px-3 py-2">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span className="text-white text-sm font-medium">LIVE TRACKING</span>
                      </div>

                      {/* Mudra Guide Overlay */}
                      <div className="absolute bottom-4 right-4 bg-black/50 rounded-lg p-3 max-w-xs">
                        <div className="text-white text-sm font-medium mb-2">Target Mudra</div>
                        <div className="text-yellow-400 text-sm">
                          {mudraInstructions.name}
                        </div>
                        <div className="text-gray-300 text-xs mt-1">
                          {mudraInstructions.description}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-96 text-gray-400">
                    <div className="text-center">
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg font-medium mb-2">Camera Feed</p>
                      <p className="text-sm">Start recording to begin hand tracking</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                {!isRecording ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startRecording}
                    className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                  >
                    <Play className="w-5 h-5" />
                    <span>Start Practice</span>
                  </motion.button>
                ) : (
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopRecording}
                      className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                    >
                      <Square className="w-5 h-5" />
                      <span>Stop</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-[#1F4E79] text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                    >
                      <Pause className="w-5 h-5" />
                      <span>Pause</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                    >
                      <RotateCcw className="w-5 h-5" />
                      <span>Restart</span>
                    </motion.button>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* AI Guidance & Feedback */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* AI Guru */}
            <GlassCard className="p-6 bg-white/80">
              <AIGuru
                message="Your thumb position is perfect! Now focus on keeping your fingers straight and aligned."
                isListening={isRecording}
              />
            </GlassCard>

            {/* Current Mudra Instructions */}
            <GlassCard className="p-6 bg-white/80">
              <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">Current Mudra</h3>
              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-[#1F4E79]">
                  {mudraInstructions.name}
                </h4>
                <div className="text-[#DAA520] text-base mb-1">
                  {mudraInstructions.sanskrit}
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {mudraInstructions.description}
                </p>
              </div>
              <div className="space-y-2">
                {mudraInstructions.steps.map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Feedback */}
            <GlassCard className="p-6 bg-white/80">
              <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">AI Feedback</h3>
              <div className="space-y-3">
                {feedback.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    {getFeedbackIcon(item.type)}
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">{item.message}</p>
                      <span className="text-xs text-gray-500">{item.timestamp}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* Session Stats */}
            <GlassCard className="p-6 bg-white/80">
              <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">Session Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{sessionTime > 0 ? `${Math.floor(sessionTime / 60)}:${(sessionTime % 60).toString().padStart(2, '0')}` : '0:00'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Accuracy</span>
                  <span className="font-semibold text-green-600">{accuracy}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Corrections Made</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Perfect Holds</span>
                  <span className="font-semibold text-[#DAA520]">12</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PracticePataka;
