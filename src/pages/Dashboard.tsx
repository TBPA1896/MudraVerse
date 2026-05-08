import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Clock, 
  Target, 
  TrendingUp, 
  Play, 
  BookOpen, 
  Users, 
  Award,
  Calendar,
  Sparkles
} from 'lucide-react';
import GlassCard from '../components/Common/GlassCard';
import AIGuru from '../components/Common/AIGuru';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

interface DashboardProps {
  user: {
    id: string;
    name: string;
    email: string;
    level?: string;
    totalPracticeHours?: number;
    mudrasLearned?: number;
    accuracyScore?: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [userStats, setUserStats] = useState<{
    mudrasLearned?: number;
    totalPracticeHours?: number;
    accuracyScore?: number;
    level?: string;
  }>({
    mudrasLearned: user.mudrasLearned,
    totalPracticeHours: user.totalPracticeHours,
    accuracyScore: user.accuracyScore,
    level: user.level
  });

  useEffect(() => {
    if (!user?.id) return;
    const userDocRef = doc(db, 'users', user.id);
    const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
      const data = snapshot.data() as any | undefined;
      if (data) {
        setUserStats({
          mudrasLearned: typeof data.mudrasLearned === 'number' ? data.mudrasLearned : 0,
          totalPracticeHours: typeof data.totalPracticeHours === 'number' ? data.totalPracticeHours : 0,
          accuracyScore: typeof data.accuracyScore === 'number' ? data.accuracyScore : 0,
          level: typeof data.level === 'string' ? data.level : 'Beginner'
        });
      }
    });
    return () => unsubscribe();
  }, [user?.id]);

  const stats = [
    { label: 'Mudras Learned', value: userStats.mudrasLearned ?? user.mudrasLearned ?? 0, change: '+0 this week', icon: Target, color: 'text-[#C41E3A]' },
    { label: 'Practice Hours', value: userStats.totalPracticeHours ?? user.totalPracticeHours ?? 0, change: '+0 hours', icon: Clock, color: 'text-[#1F4E79]' },
    { label: 'Accuracy Score', value: typeof (userStats.accuracyScore ?? user.accuracyScore) === 'number' ? `${userStats.accuracyScore ?? user.accuracyScore}%` : '0%', change: '+0% improved', icon: TrendingUp, color: 'text-[#DAA520]' },
    { label: 'Level', value: userStats.level ?? user.level ?? 'Beginner', change: '', icon: Award, color: 'text-green-600' }
  ];

  const quickActions = [
    { title: 'Start Practice', subtitle: 'Continue your Adavu training', icon: Play, color: 'from-[#C41E3A] to-[#DAA520]', path: '/practice' },
    { title: 'Mudra Library', subtitle: 'Explore new hand gestures', icon: BookOpen, color: 'from-[#1F4E79] to-[#C41E3A]', path: '/mudra-library' },
    { title: 'AR Learning', subtitle: 'Immersive 3D experience', icon: Sparkles, color: 'from-[#DAA520] to-[#1F4E79]', path: '/ar-learning' },
    { title: 'Community', subtitle: 'Connect with dancers', icon: Users, color: 'from-green-500 to-blue-500', path: '/community' }
  ];

  const recentActivity = [
    // For now, you can keep this static or later fetch real activity data
    { type: 'practice', title: 'Practiced Pataka Mudra', time: '2 hours ago', score: 92 },
    { type: 'achievement', title: 'Unlocked "Rhythm Master" badge', time: '1 day ago', score: null }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-white to-[#F5E6D3]/50">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1F4E79] mb-2">
                Welcome back, {user.name}! 🙏
              </h1>
              <p className="text-gray-600 text-lg">
                Ready to continue your classical dance journey?
              </p>
            </div>
            
            {/* AI Guru */}
            <AIGuru
              message="Today's focus: Perfect your Mayura mudra! I've noticed your thumb positioning needs slight adjustment."
              className="mt-4 lg:mt-0"
            />
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <GlassCard className="p-6 bg-white/80 hover:bg-white/90">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <h3 className="font-semibold text-gray-700 mb-1">{stat.label}</h3>
                {stat.change && <p className="text-sm text-green-600 font-medium">{stat.change}</p>}
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-[#1F4E79] mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <motion.div key={action.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 + index * 0.1 }}>
                  <Link to={action.path}>
                    <GlassCard className="p-6 bg-white/80 hover:bg-white/90 group">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#1F4E79] group-hover:text-[#C41E3A] transition-colors">{action.title}</h3>
                          <p className="text-gray-600 text-sm">{action.subtitle}</p>
                        </div>
                      </div>
                    </GlassCard>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            <h2 className="text-2xl font-semibold text-[#1F4E79] mb-6">Recent Activity</h2>
            <GlassCard className="p-6 bg-white/80">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-[#C41E3A] rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-sm font-medium">{activity.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-gray-500 text-xs">{activity.time}</span>
                        {activity.score && <span className="text-[#DAA520] text-xs font-medium">{activity.score}% accuracy</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/profile" className="block mt-4 text-center text-[#C41E3A] text-sm font-medium hover:underline">
                View All Activity
              </Link>
            </GlassCard>
          </motion.div>
        </div>

        {/* Progress Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
          <h2 className="text-2xl font-semibold text-[#1F4E79] mb-6">Progress Overview</h2>
          <GlassCard className="p-8 bg-white/80">
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Progress Chart</p>
                <p className="text-sm">Visual analytics coming soon</p>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
