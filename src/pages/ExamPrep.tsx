import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Clock,
  Target,
  Award,
  Play,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Star,
  Trophy,
  FileText,
  Brain,
  Zap
} from 'lucide-react';

const ExamPrep = () => {
  const [selectedExam, setSelectedExam] = useState('bharatanatyam-basic');
  const [mockExamStarted, setMockExamStarted] = useState(false);

  const examTypes = [
    {
      id: 'bharatanatyam-basic',
      name: 'Bharatanatyam Basic Certification',
      level: 'Beginner',
      duration: '45 min',
      questions: 25,
      practicals: 8,
      passingScore: 70,
      description: 'Foundation mudras, basic adavus, and theory'
    },
    {
      id: 'kathak-intermediate',
      name: 'Kathak Intermediate Level',
      level: 'Intermediate',
      duration: '60 min',
      questions: 30,
      practicals: 12,
      passingScore: 75,
      description: 'Complex mudras, pirouettes, and expression'
    },
    {
      id: 'classical-advanced',
      name: 'Classical Dance Advanced',
      level: 'Advanced',
      duration: '90 min',
      questions: 40,
      practicals: 20,
      passingScore: 80,
      description: 'Master level techniques and choreography'
    }
  ];

  const mockExamStats = {
    totalAttempts: 12,
    bestScore: 87,
    averageScore: 82,
    timeSpent: '6.5 hours',
    strongAreas: ['Basic Mudras', 'Theory', 'Rhythm'],
    weakAreas: ['Complex Expressions', 'Speed Accuracy']
  };

  const syllabusTopics = [
    {
      topic: 'Fundamental Mudras',
      completed: 24,
      total: 28,
      accuracy: 92,
      status: 'good'
    },
    {
      topic: 'Basic Adavus',
      completed: 18,
      total: 20,
      accuracy: 87,
      status: 'good'
    },
    {
      topic: 'Facial Expressions',
      completed: 12,
      total: 18,
      accuracy: 74,
      status: 'needs-work'
    },
    {
      topic: 'Talam & Rhythm',
      completed: 8,
      total: 12,
      accuracy: 89,
      status: 'good'
    },
    {
      topic: 'Cultural History',
      completed: 15,
      total: 15,
      accuracy: 96,
      status: 'excellent'
    }
  ];

  const recentMockExams = [
    { date: '2 days ago', score: 87, duration: '42 min', status: 'passed' },
    { date: '5 days ago', score: 79, duration: '44 min', status: 'passed' },
    { date: '1 week ago', score: 85, duration: '41 min', status: 'passed' },
    { date: '1 week ago', score: 68, duration: '47 min', status: 'failed' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'needs-work': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-900 mb-4">
            Certification & Exam Prep
          </h1>
          <p className="text-xl text-indigo-700 max-w-3xl mx-auto">
            Prepare for official classical dance certifications with AI-powered mock exams
            and personalized study plans
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Selection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-6">Select Certification</h2>
              <div className="space-y-4">
                {examTypes.map((exam) => (
                  <motion.div
                    key={exam.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedExam(exam.id)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      selectedExam === exam.id
                        ? 'bg-gradient-to-r from-indigo-100 to-purple-100 border-2 border-indigo-300'
                        : 'bg-white/50 hover:bg-indigo-50 border border-indigo-200'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-indigo-900">{exam.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getLevelColor(exam.level)}`}>
                        {exam.level}
                      </span>
                    </div>
                    <p className="text-indigo-700 mb-4">{exam.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-indigo-600" />
                        <span className="text-indigo-700">{exam.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        <span className="text-indigo-700">{exam.questions} questions</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Play className="w-4 h-4 text-indigo-600" />
                        <span className="text-indigo-700">{exam.practicals} practicals</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-indigo-600" />
                        <span className="text-indigo-700">{exam.passingScore}% to pass</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mock Exam Interface */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden"
            >
              {!mockExamStarted ? (
                <div className="p-8 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-indigo-900 mb-4">AI-Powered Mock Exam</h3>
                  <p className="text-indigo-700 mb-8 max-w-2xl mx-auto">
                    Take a comprehensive practice exam with real-time AI evaluation of your mudras,
                    expressions, and theoretical knowledge. Get instant feedback and personalized recommendations.
                  </p>
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-indigo-50 rounded-xl p-4">
                      <Zap className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-indigo-900">Instant Feedback</h4>
                      <p className="text-sm text-indigo-700">Real-time AI analysis</p>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4">
                      <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-purple-900">Detailed Analytics</h4>
                      <p className="text-sm text-purple-700">Performance insights</p>
                    </div>
                    <div className="bg-pink-50 rounded-xl p-4">
                      <Trophy className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                      <h4 className="font-semibold text-pink-900">Certification Ready</h4>
                      <p className="text-sm text-pink-700">Official exam simulation</p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMockExamStarted(true)}
                    className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Start Mock Exam
                  </motion.button>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Mock Exam in Progress</h3>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-indigo-200 text-sm">Time Remaining</p>
                        <p className="text-2xl font-mono font-bold">38:45</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-indigo-200">Question 12 of 25 • Practical Section</div>
                    <div className="w-64 bg-indigo-400/30 rounded-full h-2">
                      <div className="bg-white h-2 rounded-full" style={{width: '48%'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Syllabus Progress */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-indigo-900 mb-6">Syllabus Completion</h2>
              <div className="space-y-4">
                {syllabusTopics.map((topic, index) => (
                  <div key={index} className="border-b border-indigo-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-indigo-900">{topic.topic}</h3>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(topic.status)}`}>
                          {topic.accuracy}% accuracy
                        </span>
                        {topic.status === 'excellent' && <CheckCircle className="w-5 h-5 text-green-500" />}
                        {topic.status === 'needs-work' && <AlertCircle className="w-5 h-5 text-yellow-500" />}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="w-full bg-indigo-200 rounded-full h-2">
                          <div
                            className="bg-indigo-600 h-2 rounded-full"
                            style={{width: `${(topic.completed / topic.total) * 100}%`}}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm text-indigo-600 font-medium">
                        {topic.completed}/{topic.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance Stats */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Your Performance</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl">
                  <div className="text-3xl font-bold text-green-700 mb-1">{mockExamStats.bestScore}%</div>
                  <div className="text-green-600 text-sm">Best Score</div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-700">{mockExamStats.averageScore}%</div>
                    <div className="text-blue-600 text-xs">Average</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-700">{mockExamStats.totalAttempts}</div>
                    <div className="text-purple-600 text-xs">Attempts</div>
                  </div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <div className="text-lg font-bold text-amber-700">{mockExamStats.timeSpent}</div>
                  <div className="text-amber-600 text-xs">Total Study Time</div>
                </div>
              </div>
            </motion.div>

            {/* Strengths & Weaknesses */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Analysis</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Strong Areas
                  </h4>
                  <div className="space-y-1">
                    {mockExamStats.strongAreas.map((area, index) => (
                      <div key={index} className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-amber-700 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Needs Improvement
                  </h4>
                  <div className="space-y-1">
                    {mockExamStats.weakAreas.map((area, index) => (
                      <div key={index} className="text-sm text-amber-600 bg-amber-50 px-2 py-1 rounded">
                        {area}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Attempts */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Recent Mock Exams</h3>
              <div className="space-y-3">
                {recentMockExams.map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                    <div>
                      <div className="text-sm text-indigo-600">{exam.date}</div>
                      <div className="text-xs text-indigo-500">{exam.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${exam.status === 'passed' ? 'text-green-600' : 'text-red-600'}`}>
                        {exam.score}%
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        exam.status === 'passed' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {exam.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPrep;
