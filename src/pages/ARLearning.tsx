import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  Monitor,
  Headphones,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Settings,
  Maximize,
  Eye,
  Hand,
  Zap,
  Camera,
  TrendingUp,
  RotateCw,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import GlassCard from '../components/Common/GlassCard';
import {
  Landmark,
  FeedbackItem,
  calculateMudraAccuracy,
  generateMudraFeedback,
  drawHandLandmarks
} from '../utils/handTracking';

const ARLearning: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<'ar' | 'vr' | '3d'>('ar');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);

  // Hand tracking states
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vrCanvasRef = useRef<HTMLCanvasElement>(null);
  const threeCanvasRef = useRef<HTMLCanvasElement>(null);
  const [handLandmarks, setHandLandmarks] = useState<Landmark[][]>([]);
  const [isHandDetected, setIsHandDetected] = useState(false);
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [videoReady, setVideoReady] = useState(false);

  // VR mode states
  const [vrHandPosition, setVrHandPosition] = useState({ x: 0, y: 0 });
  const [vrHandRotation, setVrHandRotation] = useState(0);
  const [vrAccuracy, setVrAccuracy] = useState(0);
  const [isVrInteracting, setIsVrInteracting] = useState(false);

  // 3D mode states
  const [threeScene, setThreeScene] = useState<any>(null);
  const [threeCamera, setThreeCamera] = useState<any>(null);
  const [threeRenderer, setThreeRenderer] = useState<any>(null);
  const [threeModel, setThreeModel] = useState<any>(null);
  const [threeRotation, setThreeRotation] = useState({ x: 0, y: 0 });
  const [threeZoom, setThreeZoom] = useState(1);

  const lessons = [
    {
      id: 1,
      title: 'Basic Hand Positions',
      description: 'Learn fundamental mudras with AR guidance',
      duration: '15 min',
      difficulty: 'Beginner',
      mudras: ['Pataka', 'Tripataka', 'Kartarimukha']
    },
    {
      id: 2,
      title: 'Intermediate Gestures',
      description: 'Practice complex single-hand mudras',
      duration: '25 min',
      difficulty: 'Intermediate',
      mudras: ['Mayura', 'Ardhachandra', 'Arala']
    },
    {
      id: 3,
      title: 'Advanced Combinations',
      description: 'Master double-hand mudra sequences',
      duration: '35 min',
      difficulty: 'Advanced',
      mudras: ['Anjali', 'Kapota', 'Karkata']
    }
  ];

  // Hand tracking setup for AR mode
  useEffect(() => {
    if (!isPlaying || selectedMode !== 'ar') return;

    let hands: any;
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

      hands.onResults((results: { multiHandLandmarks: Landmark[][] | null }) => {
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
          setHandLandmarks(results.multiHandLandmarks);
          setIsHandDetected(true);
          const landmarks = results.multiHandLandmarks[0];
          const calculatedAccuracy = calculateMudraAccuracy(landmarks);
          setAccuracy(Math.round(calculatedAccuracy));
          setFeedback(prev => generateMudraFeedback(landmarks, calculatedAccuracy, prev));
        } else {
          setHandLandmarks([]);
          setIsHandDetected(false);
        }
      });

      if (videoRef.current) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          videoRef.current!.srcObject = stream;
          videoRef.current!.onloadedmetadata = () => {
            setVideoReady(true);
            mpCamera = new MediaPipeCamera(videoRef.current!, {
              onFrame: async () => {
                await hands.send({ image: videoRef.current! });
              },
              width: 640,
              height: 480,
            });
            mpCamera.start();
          };
        }).catch(() => setVideoReady(false));
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
  }, [isPlaying, selectedMode]);

  // Drawing effect
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      drawHandLandmarks(canvasRef.current, videoRef.current, handLandmarks, isHandDetected);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [handLandmarks, isHandDetected]);

  // VR mode setup
  useEffect(() => {
    if (!isPlaying || selectedMode !== 'vr') return;

    const canvas = vrCanvasRef.current;
    if (!canvas) return;

    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isDragging = false;
    let lastMousePos = { x: 0, y: 0 };

    const drawVirtualHand = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw temple background
      ctx.fillStyle = '#1F4E79';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw temple elements
      ctx.fillStyle = '#DAA520';
      ctx.fillRect(50, 50, 540, 10); // Temple base
      ctx.fillRect(100, 30, 10, 40); // Pillars
      ctx.fillRect(200, 30, 10, 40);
      ctx.fillRect(400, 30, 10, 40);
      ctx.fillRect(530, 30, 10, 40);

      // Draw virtual hand
      ctx.save();
      ctx.translate(vrHandPosition.x + 320, vrHandPosition.y + 240);
      ctx.rotate(vrHandRotation);

      // Draw palm
      ctx.fillStyle = '#F5E6D3';
      ctx.fillRect(-30, -20, 60, 40);

      // Draw fingers (Pataka mudra - all fingers extended)
      ctx.fillStyle = '#F5E6D3';
      // Thumb
      ctx.fillRect(-40, -15, 15, 8);
      // Index finger
      ctx.fillRect(5, -35, 8, 25);
      // Middle finger
      ctx.fillRect(15, -40, 8, 30);
      // Ring finger
      ctx.fillRect(25, -38, 8, 28);
      // Pinky finger
      ctx.fillRect(35, -35, 8, 25);

      // Draw finger joints
      ctx.fillStyle = '#E8D5B7';
      // Thumb joint
      ctx.fillRect(-35, -12, 5, 5);
      // Finger joints
      for (let i = 0; i < 4; i++) {
        ctx.fillRect(7 + i * 10, -32 + i * 2, 4, 4);
        ctx.fillRect(7 + i * 10, -22 + i * 2, 4, 4);
      }

      ctx.restore();

      // Draw interaction indicator
      if (isVrInteracting) {
        ctx.fillStyle = 'rgba(196, 30, 58, 0.8)';
        ctx.beginPath();
        ctx.arc(vrHandPosition.x + 320, vrHandPosition.y + 240, 50, 0, 2 * Math.PI);
        ctx.fill();
      }

      // Draw accuracy indicator
      ctx.fillStyle = vrAccuracy >= 80 ? '#4CAF50' : vrAccuracy >= 60 ? '#FFC107' : '#F44336';
      ctx.fillRect(10, 10, vrAccuracy * 2, 20);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '12px Arial';
      ctx.fillText(`Accuracy: ${vrAccuracy}%`, 15, 25);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - 320;
      const y = e.clientY - rect.top - 240;
      const distance = Math.sqrt(x * x + y * y);

      if (distance < 50) {
        isDragging = true;
        lastMousePos = { x: e.clientX, y: e.clientY };
        setIsVrInteracting(true);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMousePos.x;
        const deltaY = e.clientY - lastMousePos.y;

        setVrHandPosition(prev => ({
          x: prev.x + deltaX,
          y: prev.y + deltaY
        }));

        setVrHandRotation(prev => prev + deltaX * 0.01);

        lastMousePos = { x: e.clientX, y: e.clientY };

        // Calculate accuracy based on hand position and rotation
        const distanceFromCenter = Math.sqrt(vrHandPosition.x ** 2 + vrHandPosition.y ** 2);
        const rotationAccuracy = Math.max(0, 100 - Math.abs(vrHandRotation) * 50);
        const positionAccuracy = Math.max(0, 100 - distanceFromCenter * 0.5);
        const newAccuracy = Math.round((rotationAccuracy + positionAccuracy) / 2);
        setVrAccuracy(Math.min(100, Math.max(0, newAccuracy)));
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsVrInteracting(false);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    const animate = () => {
      drawVirtualHand();
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, selectedMode, vrHandPosition, vrHandRotation, vrAccuracy, isVrInteracting]);

  // 3D mode setup
  useEffect(() => {
    if (!isPlaying || selectedMode !== '3d') return;

    const initThreeJS = async () => {
      const { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh } = await import('three');

      const scene = new Scene();
      const camera = new PerspectiveCamera(75, 640 / 480, 0.1, 1000);
      const renderer = new WebGLRenderer({ canvas: threeCanvasRef.current!, antialias: true });

      renderer.setSize(640, 480);
      camera.position.z = 5;

      // Create Pataka mudra model (simplified hand shape)
      const palmGeometry = new BoxGeometry(1, 0.6, 0.2);
      const fingerGeometry = new BoxGeometry(0.15, 0.8, 0.15);
      const material = new MeshBasicMaterial({ color: 0xF5E6D3 });

      const palm = new Mesh(palmGeometry, material);
      scene.add(palm);

      // Add fingers
      const fingers = [];
      for (let i = 0; i < 5; i++) {
        const finger = new Mesh(fingerGeometry, material);
        finger.position.x = -0.3 + i * 0.15;
        finger.position.y = 0.3;
        scene.add(finger);
        fingers.push(finger);
      }

      setThreeScene(scene);
      setThreeCamera(camera);
      setThreeRenderer(renderer);
      setThreeModel({ palm, fingers });

      const animate = () => {
        requestAnimationFrame(animate);

        // Apply rotation and zoom
        camera.position.z = 5 / threeZoom;
        scene.rotation.x = threeRotation.x;
        scene.rotation.y = threeRotation.y;

        renderer.render(scene, camera);
      };
      animate();
    };

    initThreeJS();

    return () => {
      if (threeRenderer) {
        threeRenderer.dispose();
      }
    };
  }, [isPlaying, selectedMode, threeRotation, threeZoom]);

  const mudraInstructions: Record<string, {
    name: string;
    sanskrit: string;
    description: string;
    steps: string[];
  }> = {
    pataka: {
      name: 'Pataka',
      sanskrit: 'पताका',
      description: 'All fingers extended and joined together like a flag',
      steps: [
        'Extend all fingers straight',
        'Keep fingers close together',
        'Thumb pressed against palm',
        'Palm facing outward'
      ]
    }
  };

  const currentMudra = lessons[currentLesson].mudras[0].toLowerCase(); // Default to first mudra in lesson

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Real-time Tracking',
      description: `Advanced computer vision tracks every finger movement${isHandDetected ? ` - Accuracy: ${accuracy}%` : ''}`
    },
    {
      icon: <Hand className="w-8 h-8" />,
      title: '3D Hand Models',
      description: 'Detailed 3D models show perfect mudra formation'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Instant Feedback',
      description: 'Get immediate corrections and encouragement'
    }
  ];

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
            AR/VR Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immersive learning experiences with virtual guru guidance and 3D visualization
          </p>
        </motion.div>

        {/* Mode Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-6 bg-white/80">
            <h2 className="text-2xl font-semibold text-[#1F4E79] mb-6">Choose Your Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  mode: 'ar', 
                  icon: <Smartphone className="w-8 h-8" />, 
                  title: 'Augmented Reality', 
                  description: 'Overlay digital mudras on your real hands',
                  device: 'Mobile/Tablet'
                },
                { 
                  mode: 'vr', 
                  icon: <Headphones className="w-8 h-8" />, 
                  title: 'Virtual Reality', 
                  description: 'Immersive temple environment with virtual guru',
                  device: 'VR Headset'
                },
                { 
                  mode: '3d', 
                  icon: <Monitor className="w-8 h-8" />, 
                  title: '3D Visualization', 
                  description: 'Interactive 3D models and animations',
                  device: 'Desktop/Laptop'
                }
              ].map((option) => (
                <motion.button
                  key={option.mode}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedMode(option.mode as any)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedMode === option.mode
                      ? 'border-[#C41E3A] bg-[#C41E3A]/5'
                      : 'border-gray-200 hover:border-[#DAA520]'
                  }`}
                >
                  <div className={`${selectedMode === option.mode ? 'text-[#C41E3A]' : 'text-gray-600'} mb-4`}>
                    {option.icon}
                  </div>
                  <h3 className={`font-semibold mb-2 ${selectedMode === option.mode ? 'text-[#C41E3A]' : 'text-[#1F4E79]'}`}>
                    {option.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                  <span className="text-xs text-gray-500">{option.device}</span>
                </motion.button>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Learning Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AR/VR Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <GlassCard className="p-6 bg-white/80">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-[#1F4E79]">
                  {selectedMode === 'ar' && 'AR Experience'}
                  {selectedMode === 'vr' && 'VR Environment'}
                  {selectedMode === '3d' && '3D Visualization'}
                </h2>
                <div className="flex items-center space-x-3">
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Maximize className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* AR/VR Display */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden mb-6">
                {selectedMode === 'ar' ? (
                  isPlaying ? (
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

                        {/* Tracking Indicator */}
                        <div className="absolute bottom-4 left-4 flex items-center space-x-2 bg-green-600 rounded-full px-3 py-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-medium">LIVE TRACKING</span>
                        </div>

                        {/* Mudra Guide Overlay */}
                        <div className="absolute bottom-4 right-4 bg-black/50 rounded-lg p-3 max-w-xs">
                          <div className="text-white text-sm font-medium mb-2">Target Mudra</div>
                          <div className="text-yellow-400 text-sm">
                            {mudraInstructions[currentMudra]?.name || 'Pataka'}
                          </div>
                          <div className="text-gray-300 text-xs mt-1">
                            {mudraInstructions[currentMudra]?.description || 'All fingers extended and joined together like a flag'}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 text-gray-400">
                      <div className="text-center">
                        <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">AR Camera Feed</p>
                        <p className="text-sm">Start experience to begin hand tracking</p>
                      </div>
                    </div>
                  )
                ) : selectedMode === 'vr' ? (
                  isPlaying ? (
                    <div className="relative">
                      <canvas
                        ref={vrCanvasRef}
                        className="w-full h-96 cursor-pointer"
                      />

                      {/* VR Overlay */}
                      <div className="absolute inset-0">
                        {/* Interaction Status */}
                        <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 rounded-full px-3 py-2">
                          <div className={`w-2 h-2 rounded-full ${isVrInteracting ? 'bg-green-400' : 'bg-blue-400'} animate-pulse`}></div>
                          <span className="text-white text-sm font-medium">
                            {isVrInteracting ? 'INTERACTING' : 'READY TO INTERACT'}
                          </span>
                        </div>

                        {/* VR Accuracy Meter */}
                        <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-3">
                          <div className="text-white text-sm font-medium mb-2">VR Accuracy</div>
                          <div className="flex items-center space-x-2">
                            <div className={`text-2xl font-bold ${vrAccuracy >= 80 ? 'text-green-400' : vrAccuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                              {vrAccuracy}%
                            </div>
                            <TrendingUp className={`w-4 h-4 ${vrAccuracy >= 80 ? 'text-green-400' : vrAccuracy >= 60 ? 'text-yellow-400' : 'text-red-400'}`} />
                          </div>
                          {vrAccuracy >= 80 && (
                            <div className="mt-2">
                              <span className="text-xs text-white">
                                Excellent VR Pataka!
                              </span>
                            </div>
                          )}
                        </div>

                        {/* VR Instructions */}
                        <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg p-3 max-w-xs">
                          <div className="text-white text-sm font-medium mb-2">VR Controls</div>
                          <div className="text-gray-300 text-xs">
                            Click and drag the virtual hand to practice Pataka mudra
                          </div>
                        </div>

                        {/* Temple Environment Indicator */}
                        <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-purple-600 rounded-full px-3 py-2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-medium">TEMPLE ENVIRONMENT</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 text-gray-400 bg-gradient-to-br from-[#1F4E79]/90 to-[#C41E3A]/80">
                      <div className="text-center">
                        <Headphones className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">VR Temple Environment</p>
                        <p className="text-sm">Start experience to enter virtual temple</p>
                      </div>
                    </div>
                  )
                ) : (
                  isPlaying ? (
                    <div className="relative">
                      <canvas
                        ref={threeCanvasRef}
                        className="w-full h-96"
                      />

                      {/* 3D Controls */}
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <button
                          onClick={() => setThreeRotation(prev => ({ ...prev, y: prev.y - 0.1 }))}
                          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
                          title="Rotate Left"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setThreeRotation(prev => ({ ...prev, y: prev.y + 0.1 }))}
                          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
                          title="Rotate Right"
                        >
                          <RotateCw className="w-4 h-4 transform rotate-180" />
                        </button>
                        <button
                          onClick={() => setThreeZoom(prev => Math.max(0.5, prev - 0.1))}
                          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
                          title="Zoom Out"
                        >
                          <ZoomOut className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setThreeZoom(prev => Math.min(2, prev + 0.1))}
                          className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-colors"
                          title="Zoom In"
                        >
                          <ZoomIn className="w-4 h-4" />
                        </button>
                      </div>

                      {/* 3D Overlay */}
                      <div className="absolute inset-0">
                        {/* 3D Status */}
                        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 rounded-full px-3 py-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-white text-sm font-medium">3D MODEL ACTIVE</span>
                        </div>

                        {/* 3D Info */}
                        <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg p-3 max-w-xs">
                          <div className="text-white text-sm font-medium mb-2">3D Pataka Model</div>
                          <div className="text-gray-300 text-xs">
                            Use controls to rotate and zoom the 3D hand model
                          </div>
                        </div>

                        {/* Model Details */}
                        <div className="absolute bottom-4 right-4 bg-black/50 rounded-lg p-3">
                          <div className="text-white text-sm font-medium mb-2">Model Info</div>
                          <div className="text-gray-300 text-xs">
                            Zoom: {(threeZoom * 100).toFixed(0)}%<br/>
                            Rotation: {(threeRotation.y * 180 / Math.PI).toFixed(0)}°
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-96 text-gray-400 bg-gradient-to-br from-[#1F4E79]/90 to-[#C41E3A]/80">
                      <div className="text-center">
                        <Monitor className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium mb-2">3D Model Viewer</p>
                        <p className="text-sm">Start experience to view interactive 3D model</p>
                      </div>
                    </div>
                  )
                )}
                
                {/* Overlay Controls */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 rounded-lg p-3 flex justify-between items-center">
                    <div className="text-white text-sm">
                      Lesson {lessons[currentLesson].id}: {lessons[currentLesson].title} - {mudraInstructions[currentMudra]?.name || 'Pataka'}
                    </div>
                    <div className="text-white text-sm">
                      Progress: {isHandDetected ? `${accuracy}%` : '0%'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span>{isPlaying ? 'Pause' : 'Start'} Experience</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-6 py-3 bg-[#1F4E79] text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </motion.button>
              </div>
            </GlassCard>
          </motion.div>

          {/* Lesson Selection & Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Lesson Selection */}
            <GlassCard className="p-6 bg-white/80">
              <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">Available Lessons</h3>
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <motion.button
                    key={lesson.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setCurrentLesson(index)}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      currentLesson === index
                        ? 'bg-[#C41E3A]/10 border-2 border-[#C41E3A]'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className={`font-semibold ${
                        currentLesson === index ? 'text-[#C41E3A]' : 'text-[#1F4E79]'
                      }`}>
                        {lesson.title}
                      </h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        lesson.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                        lesson.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {lesson.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{lesson.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{lesson.duration}</span>
                      <span>{lesson.mudras.length} mudras</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </GlassCard>

            {/* Features */}
            <GlassCard className="p-6 bg-white/80">
              <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">Experience Features</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="text-[#C41E3A] mt-1">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1F4E79] mb-1">{feature.title}</h4>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>

            {/* AI Feedback */}
            {selectedMode === 'ar' && isPlaying && (
              <GlassCard className="p-6 bg-white/80">
                <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">AI Feedback</h3>
                <div className="space-y-3 max-h-48 overflow-y-auto">
                  {feedback.length > 0 ? feedback.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <div className={`w-4 h-4 rounded-full mt-1 ${
                        item.type === 'correct' ? 'bg-green-500' :
                        item.type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{item.message}</p>
                        <span className="text-xs text-gray-500">{item.timestamp}</span>
                      </div>
                    </motion.div>
                  )) : (
                    <p className="text-gray-500 text-sm">Start tracking to receive feedback</p>
                  )}
                </div>
              </GlassCard>
            )}

            {/* Current Mudra Instructions */}
            <GlassCard className="p-6 bg-white/80">
              <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">Current Mudra</h3>
              <div className="text-center mb-4">
                <h4 className="text-lg font-bold text-[#1F4E79]">
                  {mudraInstructions[currentMudra]?.name || 'Pataka'}
                </h4>
                <div className="text-[#DAA520] text-base mb-1">
                  {mudraInstructions[currentMudra]?.sanskrit || 'पताका'}
                </div>
                <p className="text-gray-600 text-sm mt-2">
                  {mudraInstructions[currentMudra]?.description || 'All fingers extended and joined together like a flag'}
                </p>
              </div>
              <div className="space-y-2">
                {(mudraInstructions[currentMudra]?.steps || [
                  'Extend all fingers straight',
                  'Keep fingers close together',
                  'Thumb pressed against palm',
                  'Palm facing outward'
                ]).map((step, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span className="text-gray-700 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* System Requirements */}
            <GlassCard className="p-6 bg-white/80">
              <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">System Requirements</h3>
              <div className="space-y-2 text-sm">
                {selectedMode === 'ar' && (
                  <>
                    <p className="text-gray-600">• Modern smartphone or tablet</p>
                    <p className="text-gray-600">• Camera access permission</p>
                    <p className="text-gray-600">• Good lighting conditions</p>
                    <p className="text-gray-600">• Stable internet connection</p>
                  </>
                )}
                {selectedMode === 'vr' && (
                  <>
                    <p className="text-gray-600">• VR headset (Quest, Vive, etc.)</p>
                    <p className="text-gray-600">• 6DOF hand tracking support</p>
                    <p className="text-gray-600">• 2m x 2m play space</p>
                    <p className="text-gray-600">• High-speed internet</p>
                  </>
                )}
                {selectedMode === '3d' && (
                  <>
                    <p className="text-gray-600">• Modern web browser</p>
                    <p className="text-gray-600">• WebGL support</p>
                    <p className="text-gray-600">• 4GB RAM minimum</p>
                    <p className="text-gray-600">• Broadband connection</p>
                  </>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ARLearning;