import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Bookmark, 
  TrendingUp, 
  Users, 
  Crown, 
  Award,
  Plus,
  Search,
  Filter,
  Play
} from 'lucide-react';
import { mockCommunityPosts } from '../utils/mockData';
import GlassCard from '../components/Common/GlassCard';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'leaderboard' | 'events'>('posts');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const leaderboard = [
    { rank: 1, name: 'Priya Menon', score: 2850, avatar: '👩‍🎓', badge: 'Mudra Master' },
    { rank: 2, name: 'Rajesh Kumar', score: 2640, avatar: '🕺', badge: 'Rhythm Pro' },
    { rank: 3, name: 'Meera Nair', score: 2380, avatar: '💃', badge: 'Expression Queen' },
    { rank: 4, name: 'Arjun Singh', score: 2190, avatar: '🧑‍🎓', badge: 'Adavu Expert' },
    { rank: 5, name: 'Lakshmi Devi', score: 2050, avatar: '👩‍🏫', badge: 'Cultural Guru' }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Live Masterclass: Bharatanatyam Basics',
      instructor: 'Guru Lakshmi Devi',
      date: '2025-01-20',
      time: '7:00 PM IST',
      participants: 156,
      type: 'live'
    },
    {
      id: 2,
      title: 'Global Dance Challenge: Varnam Competition',
      description: 'Submit your best Varnam performance',
      deadline: '2025-01-25',
      prize: 'MudraVerse Premium Access',
      participants: 89,
      type: 'competition'
    },
    {
      id: 3,
      title: 'Cultural Discussion: History of Mudras',
      moderator: 'Dr. Radhika Sharma',
      date: '2025-01-22',
      time: '6:00 PM IST',
      participants: 67,
      type: 'discussion'
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
            Global Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with dancers, share your journey, and learn together in our vibrant community
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-2 bg-white/80 inline-flex mx-auto">
            {[
              { key: 'posts', label: 'Community Posts', icon: MessageSquare },
              { key: 'leaderboard', label: 'Leaderboard', icon: TrendingUp },
              { key: 'events', label: 'Events', icon: Users }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white shadow-lg'
                    : 'text-gray-600 hover:text-[#C41E3A]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </GlassCard>
        </motion.div>

        {/* Community Posts */}
        {activeTab === 'posts' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          >
            {/* Main Feed */}
            <div className="lg:col-span-3 space-y-6">
              {/* Create Post */}
              <GlassCard className="p-6 bg-white/80">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#C41E3A] to-[#DAA520] rounded-full flex items-center justify-center text-white font-bold">
                    P
                  </div>
                  <button className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                    Share your dance journey...
                  </button>
                  <button className="p-3 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full hover:shadow-lg transition-shadow">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </GlassCard>

              {/* Posts */}
              {mockCommunityPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <GlassCard className="p-6 bg-white/80 hover:bg-white/90">
                    {/* Post Header */}
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#1F4E79] to-[#C41E3A] rounded-full flex items-center justify-center text-white font-bold">
                        {post.author[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-[#1F4E79]">{post.author}</h3>
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          <span className="text-gray-500 text-sm">
                            {post.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-medium text-gray-800 mb-2">{post.title}</h4>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>

                    {/* Video Thumbnail */}
                    {post.videoUrl && (
                      <div className="relative bg-gray-200 rounded-xl h-48 mb-4 overflow-hidden group cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1F4E79]/80 to-[#C41E3A]/80 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-[#C41E3A] transition-colors">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-[#1F4E79] transition-colors">
                          <MessageSquare className="w-5 h-5" />
                          <span className="text-sm font-medium">{post.comments}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-gray-600 hover:text-[#DAA520] transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span className="text-sm font-medium">Share</span>
                        </button>
                      </div>
                      <button className="text-gray-600 hover:text-[#DAA520] transition-colors">
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Trending Topics */}
              <GlassCard className="p-6 bg-white/80">
                <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">Trending Topics</h3>
                <div className="space-y-3">
                  {[
                    '#BharatanatyamBasics',
                    '#MudraChallenge',
                    '#ClassicalDanceJourney',
                    '#TemplePerformance',
                    '#AIFeedback'
                  ].map((topic, index) => (
                    <button
                      key={index}
                      className="block text-[#C41E3A] hover:text-[#DAA520] font-medium text-sm transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </GlassCard>

              {/* Top Contributors */}
              <GlassCard className="p-6 bg-white/80">
                <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">Top Contributors</h3>
                <div className="space-y-3">
                  {leaderboard.slice(0, 3).map((user, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.badge}</p>
                      </div>
                      <span className="text-[#DAA520] font-semibold text-sm">
                        {user.score}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* Leaderboard */}
        {activeTab === 'leaderboard' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            <GlassCard className="p-8 bg-white/80">
              <h2 className="text-3xl font-serif font-bold text-[#1F4E79] text-center mb-8">
                Global Leaderboard
              </h2>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <motion.div
                    key={user.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-6 p-6 rounded-xl ${
                      user.rank <= 3 ? 'bg-gradient-to-r from-[#DAA520]/10 to-[#C41E3A]/10' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-center w-12 h-12">
                      {user.rank === 1 && <Crown className="w-8 h-8 text-yellow-500" />}
                      {user.rank === 2 && <Award className="w-8 h-8 text-gray-400" />}
                      {user.rank === 3 && <Award className="w-8 h-8 text-yellow-600" />}
                      {user.rank > 3 && (
                        <span className="text-2xl font-bold text-gray-600">#{user.rank}</span>
                      )}
                    </div>
                    <div className="text-4xl">{user.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-[#1F4E79]">{user.name}</h3>
                      <p className="text-gray-600">{user.badge}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-[#DAA520]">{user.score}</p>
                      <p className="text-gray-500 text-sm">points</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Events */}
        {activeTab === 'events' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-6 bg-white/80 hover:bg-white/90 h-full">
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                    event.type === 'live' ? 'bg-red-100 text-red-600' :
                    event.type === 'competition' ? 'bg-blue-100 text-blue-600' :
                    'bg-green-100 text-green-600'
                  }`}>
                    {event.type === 'live' && '🔴 Live Event'}
                    {event.type === 'competition' && '🏆 Competition'}
                    {event.type === 'discussion' && '💬 Discussion'}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-[#1F4E79] mb-3">
                    {event.title}
                  </h3>
                  
                  {'instructor' in event && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Instructor:</span> {event.instructor}
                    </p>
                  )}
                  
                  {'moderator' in event && (
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Moderator:</span> {event.moderator}
                    </p>
                  )}
                  
                  {'description' in event && (
                    <p className="text-gray-600 mb-4">{event.description}</p>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    {'date' in event && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Date:</span> {event.date} at {event.time}
                      </p>
                    )}
                    
                    {'deadline' in event && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Deadline:</span> {event.deadline}
                      </p>
                    )}
                    
                    {'prize' in event && (
                      <p className="text-sm text-[#DAA520] font-medium">
                        <span className="text-gray-600">Prize:</span> {event.prize}
                      </p>
                    )}
                    
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Participants:</span> {event.participants}
                    </p>
                  </div>
                  
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-xl font-semibold hover:shadow-lg transition-shadow">
                    {event.type === 'live' && 'Join Live Session'}
                    {event.type === 'competition' && 'Participate Now'}
                    {event.type === 'discussion' && 'Join Discussion'}
                  </button>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Community;