import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Hand,
  ArrowRight,
  Star,
  Clock,
  Target,
  BookOpen
} from 'lucide-react';
import GlassCard from '../components/Common/GlassCard';

const Practice: React.FC = () => {
  const mudras = [
    {
      id: 'pataka',
      name: 'Pataka',
      sanskrit: 'पताका',
      description: 'All fingers extended and joined together like a flag',
      difficulty: 'Beginner',
      estimatedTime: '5-10 min',
      route: '/practice/pataka'
    },
    {
      id: 'tripataka',
      name: 'Tripataka',
      sanskrit: 'त्रिपताका',
      description: 'Three fingers extended, ring and little fingers bent',
      difficulty: 'Beginner',
      estimatedTime: '5-10 min',
      route: '/practice/tripataka'
    },
    {
      id: 'kartarimukha',
      name: 'Kartarimukha',
      sanskrit: 'कर्तरीमुख',
      description: 'Scissors gesture with index and middle fingers',
      difficulty: 'Intermediate',
      estimatedTime: '10-15 min',
      route: '/practice/kartarimukha'
    },
    {
      id: 'mayura',
      name: 'Mayura',
      sanskrit: 'मयूर',
      description: 'Peacock gesture with thumb and little finger extended',
      difficulty: 'Intermediate',
      estimatedTime: '10-15 min',
      route: '/practice/mayura'
    },
    {
      id: 'ardhachandra',
      name: 'Ardhachandra',
      sanskrit: 'अर्धचन्द्र',
      description: 'Half-moon gesture with curved fingers',
      difficulty: 'Advanced',
      estimatedTime: '15-20 min',
      route: '/practice/ardhachandra'
    },
    {
      id: 'arala',
      name: 'Arala',
      sanskrit: 'अरला',
      description: 'Little finger bent while others remain extended',
      difficulty: 'Advanced',
      estimatedTime: '15-20 min',
      route: '/practice/arala'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return <Star className="w-4 h-4" />;
      case 'Intermediate': return <Target className="w-4 h-4" />;
      case 'Advanced': return <BookOpen className="w-4 h-4" />;
      default: return <Hand className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-white to-[#F5E6D3]/50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1F4E79] mb-4">
            Practice Mudras
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose a mudra to practice with real-time AI feedback and guided instruction.
            Master the ancient art of hand gestures through interactive learning.
          </p>
        </motion.div>

        {/* Mudra Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mudras.map((mudra, index) => (
            <motion.div
              key={mudra.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="p-6 bg-white/80 hover:bg-white/90 transition-all duration-300 group cursor-pointer">
                <Link to={mudra.route} className="block">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#1F4E79] mb-1">
                        {mudra.name}
                      </h3>
                      <div className="text-[#DAA520] font-medium mb-2">
                        {mudra.sanskrit}
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getDifficultyColor(mudra.difficulty)}`}>
                      {getDifficultyIcon(mudra.difficulty)}
                      <span>{mudra.difficulty}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {mudra.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{mudra.estimatedTime}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#1F4E79] group-hover:text-[#DAA520] transition-colors">
                      <span className="text-sm font-medium">Practice Now</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#C41E3A] to-[#DAA520] h-2 rounded-full transition-all duration-300 group-hover:w-full w-0"></div>
                  </div>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Practice Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <GlassCard className="p-8 bg-white/80">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-serif font-bold text-[#1F4E79] mb-4">
                Practice Tips
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Follow these guidelines to get the most out of your mudra practice sessions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Hand className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F4E79] mb-2">Position</h3>
                <p className="text-gray-600 text-sm">
                  Ensure good lighting and position your hand clearly in the camera frame
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F4E79] mb-2">Focus</h3>
                <p className="text-gray-600 text-sm">
                  Pay attention to the AI feedback and make gradual adjustments
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#1F4E79] mb-2">Patience</h3>
                <p className="text-gray-600 text-sm">
                  Practice regularly and be patient with yourself as you learn
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Practice;
