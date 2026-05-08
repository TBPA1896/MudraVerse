import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, BookOpen, Star, Users } from 'lucide-react';
import GlassCard from '../components/Common/GlassCard';

interface Story {
  id: string;
  title: string;
  mudra: string;
  emoji: string;
  excerpt: string;
  content: string;
  characters: string[];
  moral: string;
}

const StoriesPage: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: '1',
      title: 'The Divine Anjali',
      mudra: 'Anjali Mudra',
      emoji: '🙏',
      excerpt: 'How Lord Rama greeted sage Vishwamitra with the sacred gesture of respect.',
      content: 'In the ancient kingdom of Ayodhya, when young Prince Rama first met the great sage Vishwamitra, he performed the Anjali Mudra - pressing his palms together at his heart center. The sage was pleased by this gesture of respect and humility. This mudra represents the unity of individual consciousness with universal consciousness, honoring the divine in all beings.',
      characters: ['Lord Rama', 'Sage Vishwamitra', 'King Dasharatha'],
      moral: 'True respect comes from the heart and is expressed through humble gestures.'
    },
    {
      id: '2',
      title: 'The Peacock Crown',
      mudra: 'Mayura Mudra',
      emoji: '🦚',
      excerpt: 'The story behind Krishna\'s divine peacock feather crown and its sacred meaning.',
      content: 'Once, Lord Krishna was playing his divine flute in the forest of Vrindavan. The peacocks, enchanted by the melodious music, began to dance in ecstasy. The king of peacocks approached Krishna and offered his most beautiful feather as a token of devotion. Krishna accepted it graciously and adorned his crown with the peacock feather, symbolizing beauty, grace, and divine love.',
      characters: ['Lord Krishna', 'Peacock King', 'Gopis of Vrindavan'],
      moral: 'True beauty lies in devotion and surrender to the divine.'
    },
    {
      id: '3',
      title: 'The Lotus of Creation',
      mudra: 'Alapadma Mudra',
      emoji: '🪷',
      excerpt: 'The cosmic lotus from which Lord Brahma emerged to create the universe.',
      content: 'From the navel of the sleeping Lord Vishnu arose a magnificent lotus flower. As the petals unfurled, Lord Brahma appeared, seated in the center of the bloom. This cosmic lotus, represented by the Alapadma Mudra, symbolizes the unfolding of creation, purity emerging from the primordial waters, and the infinite potential within every being.',
      characters: ['Lord Vishnu', 'Lord Brahma', 'Cosmic Serpent Shesha'],
      moral: 'From the divine source, all creation unfolds in perfect harmony.'
    },
    {
      id: '4',
      title: 'The Swan\'s Wisdom',
      mudra: 'Hamsasya Mudra',
      emoji: '🦢',
      excerpt: 'How Goddess Saraswati\'s swan teaches us to separate truth from illusion.',
      content: 'Goddess Saraswati\'s divine swan, Hamsa, possesses the unique ability to separate milk from water when mixed together. This represents the power of wisdom to distinguish truth from falsehood, the eternal from the temporary. The Hamsasya Mudra embodies this divine discrimination that leads to enlightenment.',
      characters: ['Goddess Saraswati', 'Divine Swan Hamsa', 'Seekers of Knowledge'],
      moral: 'True wisdom lies in the ability to discern between the real and the illusory.'
    }
  ];

  if (selectedStory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-white to-[#F5E6D3]/50 py-8">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center mb-8"
          >
            <button
              onClick={() => setSelectedStory(null)}
              className="mr-4 p-2 rounded-full bg-[#C41E3A]/10 text-[#C41E3A] hover:bg-[#C41E3A]/20 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-3xl font-bold text-[#1F4E79]">Sacred Story</h1>
          </motion.div>

          {/* Story Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Story Header */}
            <div className="text-center mb-8">
              <div className="text-8xl mb-4">{selectedStory.emoji}</div>
              <h2 className="text-4xl font-bold text-[#1F4E79] mb-4">{selectedStory.title}</h2>
              <div className="flex items-center justify-center space-x-2 mb-6">
                <div className="w-3 h-3 bg-[#DAA520] rounded-full" />
                <p className="text-[#C41E3A] font-semibold text-lg">{selectedStory.mudra}</p>
                <div className="w-3 h-3 bg-[#DAA520] rounded-full" />
              </div>
            </div>

            {/* Story Card */}
            <GlassCard className="p-8 bg-white/90">
              {/* Content */}
              <div className="mb-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedStory.content}
                </p>
              </div>

              {/* Characters */}
              <div className="bg-[#F5E6D3]/50 rounded-xl p-6 mb-6">
                <h3 className="text-[#1F4E79] font-semibold mb-4 flex items-center text-xl">
                  <Users className="mr-2" size={20} />
                  Characters
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedStory.characters.map((character) => (
                    <span
                      key={character}
                      className="px-4 py-2 bg-[#C41E3A]/10 border border-[#C41E3A]/20 rounded-full text-[#1F4E79] font-medium"
                    >
                      {character}
                    </span>
                  ))}
                </div>
              </div>

              {/* Moral */}
              <div className="bg-gradient-to-r from-[#C41E3A]/10 to-[#DAA520]/10 rounded-xl p-6 border border-[#C41E3A]/20">
                <h3 className="text-[#1F4E79] font-semibold mb-3 flex items-center text-xl">
                  <Star className="mr-2" size={20} />
                  Divine Wisdom
                </h3>
                <p className="text-gray-700 italic text-lg">"{selectedStory.moral}"</p>
              </div>

              {/* Action Button */}
              <motion.div
                className="text-center mt-8"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button className="px-8 py-4 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all">
                  🧘‍♀ Learn This Mudra
                </button>
              </motion.div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-white to-[#F5E6D3]/50 py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-6xl mb-6">📜</div>
          <h1 className="text-5xl font-bold text-[#1F4E79] mb-4">
            Sacred Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the mythology behind each mudra and their cultural significance
          </p>
        </motion.div>

        {/* Stories Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedStory(story)}
                className="cursor-pointer"
              >
                <GlassCard className="p-8 bg-white/90 hover:bg-white/95 transition-all h-full">
                  <div className="flex items-start justify-between mb-6">
                    <div className="text-6xl">{story.emoji}</div>
                    <div className="text-[#C41E3A] opacity-60 group-hover:opacity-100 transition-opacity">
                      <BookOpen size={24} />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#1F4E79] mb-3">{story.title}</h3>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-[#DAA520] rounded-full" />
                    <span className="text-[#C41E3A] font-semibold">{story.mudra}</span>
                    <div className="w-2 h-2 bg-[#DAA520] rounded-full" />
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-6">
                    {story.excerpt}
                  </p>

                  {/* Character Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {story.characters.slice(0, 2).map((character) => (
                      <span
                        key={character}
                        className="px-3 py-1 bg-[#F5E6D3]/70 border border-[#C41E3A]/20 rounded-full text-[#1F4E79] text-sm font-medium"
                      >
                        {character}
                      </span>
                    ))}
                    {story.characters.length > 2 && (
                      <span className="px-3 py-1 text-gray-500 text-sm">
                        +{story.characters.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#C41E3A] font-medium">Read Story →</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={16} className="text-[#DAA520] fill-current" />
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <GlassCard className="p-8 bg-gradient-to-r from-[#C41E3A]/5 to-[#DAA520]/5 max-w-2xl mx-auto">
            <div className="text-5xl mb-4">🏛</div>
            <h3 className="text-2xl font-bold text-[#1F4E79] mb-3">Explore More Stories</h3>
            <p className="text-gray-600 mb-6">
              Unlock premium mythology content with 50+ epic tales from Indian classical dance tradition
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Unlock Premium Stories
            </motion.button>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
};

export default StoriesPage;
