import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircle } from 'lucide-react';

interface AIGuruProps {
  message: string;
  isListening?: boolean;
  className?: string;
}

const AIGuru: React.FC<AIGuruProps> = ({ message, isListening = false, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
    >
      {/* Guru Avatar */}
      <div className="relative">
        <motion.div
          animate={isListening ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#DAA520] via-[#C41E3A] to-[#1F4E79] p-1"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F5E6D3] to-white flex items-center justify-center">
            <span className="text-2xl">🕉️</span>
          </div>
        </motion.div>
        
        {/* Listening Indicator */}
        {isListening && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-3 h-3 text-white" />
          </motion.div>
        )}
      </div>

      {/* Message Bubble */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute left-20 top-0 max-w-xs"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl rounded-tl-none p-4 shadow-lg border border-[#DAA520]/20">
          <div className="flex items-start space-x-2">
            <MessageCircle className="w-4 h-4 text-[#C41E3A] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-800 font-medium leading-relaxed">
              {message}
            </p>
          </div>
        </div>
        
        {/* Arrow */}
        <div className="absolute left-0 top-4 w-0 h-0 border-t-8 border-b-8 border-r-8 border-transparent border-r-white/90"></div>
      </motion.div>
    </motion.div>
  );
};

export default AIGuru;