import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Play, Volume2, Eye, Star } from 'lucide-react';
import { mockMudras } from '../utils/mockData';
import GlassCard from '../components/Common/GlassCard';

// Update Pataka, Tripataka, Kartarimukha, Mayura, Ardhachandra, and Arala mudra image URLs
const updatedMudras = mockMudras.map(mudra => {
  if (mudra.name.toLowerCase() === 'pataka') {
    return { ...mudra, imageUrl: 'https://image2url.com/images/1758655357443-01429643-1369-4028-9e19-d2d9559e7739.jpg' };
  }
  if (mudra.name.toLowerCase() === 'tripataka') {
    return { ...mudra, imageUrl: 'https://image2url.com/images/1758655769477-6bacf774-60bc-414f-a264-d68c2b105c16.jpg' };
  }
  if (mudra.name.toLowerCase() === 'kartarimukha') {
    return { ...mudra, imageUrl: 'https://image2url.com/images/1758655921981-0f3931e5-0f13-44af-943b-1aed387964c8.jpg' };
  }
  if (mudra.name.toLowerCase() === 'mayura') {
    return { ...mudra, imageUrl: 'https://image2url.com/images/1758656000562-e4c854e1-50e4-4fbf-9281-70ecafb7143a.jpg' };
  }
  if (mudra.name.toLowerCase() === 'ardhachandra') {
    return { ...mudra, imageUrl: 'https://image2url.com/images/1758656080912-bb7397db-ef5a-40ba-b4f8-cf56bf501dbb.jpg' };
  }
  if (mudra.name.toLowerCase() === 'arala') {
    return { ...mudra, imageUrl: 'https://image2url.com/images/1758656148643-84c5240c-e129-4570-a1db-e96a06bd1bc3.jpg' };
  }
  return mudra;
});

const MudraLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'asamyukta' | 'samyukta'>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [selectedMudra, setSelectedMudra] = useState<any>(null);

  const filteredMudras = useMemo(() => {
    return updatedMudras.filter(mudra => {
      const matchesSearch = mudra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mudra.sanskritName.includes(searchTerm) ||
                           mudra.meaning.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || mudra.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || mudra.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const speakSanskrit = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      speechSynthesis.speak(utterance);
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
            Mudra Library
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the sacred language of hand gestures in Indian classical dance. 
            Each mudra carries deep meaning and cultural significance.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <GlassCard className="p-6 bg-white/80">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search mudras by name, meaning, or usage..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C41E3A] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                >
                  <option value="all">All Categories</option>
                  <option value="asamyukta">Asamyukta (Single Hand)</option>
                  <option value="samyukta">Samyukta (Double Hand)</option>
                </select>

                <select
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C41E3A]"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value as any)}
                >
                  <option value="all">All Levels</option>
                  <option value="easy">Beginner</option>
                  <option value="medium">Intermediate</option>
                  <option value="hard">Advanced</option>
                </select>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredMudras.length} mudras
            {searchTerm && <span> for "{searchTerm}"</span>}
          </p>
        </motion.div>

        {/* Mudras Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredMudras.map((mudra, index) => (
            <motion.div
              key={mudra.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard 
                className="overflow-hidden bg-white/80 hover:bg-white/90 group cursor-pointer"
                onClick={() => setSelectedMudra(mudra)}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={mudra.imageUrl}
                    alt={mudra.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 right-4">
                      <button className="p-2 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
                        <Eye className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold text-[#1F4E79] group-hover:text-[#C41E3A] transition-colors">
                        {mudra.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg text-[#DAA520] font-medium">
                          {mudra.sanskritName}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            speakSanskrit(mudra.sanskritName);
                          }}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Volume2 className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(mudra.difficulty)}`}>
                      {mudra.difficulty}
                    </span>
                  </div>

                  <p className="text-gray-600 italic mb-3">"{mudra.meaning}"</p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {mudra.description}
                  </p>

                  {/* Usage Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mudra.usage.slice(0, 3).map((use, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-[#F5E6D3] text-[#1F4E79] text-xs rounded-md"
                      >
                        {use}
                      </span>
                    ))}
                    {mudra.usage.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{mudra.usage.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/practice/${mudra.name.toLowerCase()}`);
                      }}
                      className="flex items-center space-x-1 px-3 py-2 bg-[#C41E3A] text-white rounded-lg text-sm hover:bg-[#C41E3A]/90 transition-colors"
                    >
                      <Play className="w-4 h-4" />
                      <span>Practice</span>
                    </button>
                    <button className="p-2 text-gray-400 hover:text-[#DAA520] transition-colors">
                      <Star className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {filteredMudras.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No mudras found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Mudra Detail Modal */}
      {selectedMudra && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMudra(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedMudra.imageUrl}
                alt={selectedMudra.name}
                className="w-full h-96 object-cover"
              />
              <button
                onClick={() => setSelectedMudra(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-white"
              >
                ×
              </button>
            </div>
            
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-[#1F4E79] mb-2">
                    {selectedMudra.name}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl text-[#DAA520] font-medium">
                      {selectedMudra.sanskritName}
                    </span>
                    <button
                      onClick={() => speakSanskrit(selectedMudra.sanskritName)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <Volume2 className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>
                <span className={`px-3 py-2 rounded-full text-sm font-medium ${getDifficultyColor(selectedMudra.difficulty)}`}>
                  {selectedMudra.difficulty}
                </span>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-[#1F4E79] mb-2">Meaning</h3>
                  <p className="text-gray-700 text-lg italic">"{selectedMudra.meaning}"</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1F4E79] mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedMudra.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-[#1F4E79] mb-2">Usage & Symbolism</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMudra.usage.map((use: string, i: number) => (
                      <span
                        key={i}
                        className="px-3 py-2 bg-[#F5E6D3] text-[#1F4E79] rounded-lg"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => navigate(`/practice/${selectedMudra.name.toLowerCase()}`)}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
                  >
                    Start Practice
                  </button>
                  <button className="px-6 py-3 border-2 border-[#C41E3A] text-[#C41E3A] rounded-xl font-semibold hover:bg-[#C41E3A] hover:text-white transition-colors">
                    View in AR
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default MudraLibrary;