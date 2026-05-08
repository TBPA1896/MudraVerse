import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Users, Trophy, Sparkles, ArrowRight, CheckCircle } from 'lucide-react';
import GlassCard from '../components/Common/GlassCard';

const Landing: React.FC = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'AI-Powered Recognition',
      description: 'Real-time mudra and posture analysis with personalized feedback'
    },
    {
      icon: <Play className="w-8 h-8" />,
      title: 'Interactive Practice',
      description: 'Step-by-step Adavu training with rhythm synchronization'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Global Community',
      description: 'Connect with dancers worldwide and share your journey'
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: 'Certification Ready',
      description: 'Prepare for official dance certifications with AI guidance'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Menon',
      role: 'Bharatanatyam Student',
      content: 'MudraVerse transformed my practice. The AI feedback is incredibly precise!',
      rating: 5,
      avatar: '👩‍🎓'
    },
    {
      name: 'Guru Lakshmi Devi',
      role: 'Classical Dance Teacher',
      content: 'An excellent tool for preserving our cultural heritage through technology.',
      rating: 5,
      avatar: '👩‍🏫'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Kuchipudi Performer',
      content: 'The AR learning mode is revolutionary. It feels like having a guru beside you.',
      rating: 5,
      avatar: '🕺'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#1F4E79]/90 via-[#C41E3A]/80 to-[#DAA520]/90"
          style={{
            backgroundImage: `url('https://image2url.com/images/1758649522519-e9c27e61-9ea5-4011-9d12-dfebb82bce77.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
        />
        
        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 w-4 h-4 bg-[#DAA520] rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute bottom-32 left-16 w-6 h-6 bg-[#F5E6D3] rounded-full opacity-40"
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto" // Changed from max-w-4xl to max-w-6xl for wider text box
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-6xl md:text-8xl font-serif font-extrabold text-white mb-8 drop-shadow-lg"
            >
              MudraVerse
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/90 mb-6 font-semibold"
            >
              Your AI Guru for Bharatiya Natya
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl text-white/80 mb-16 max-w-3xl mx-auto font-medium"
            >
              Revolutionary AI-powered platform that transforms how Indian Classical Dance 
              is learned, practiced, and preserved for future generations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/signup"
                className="group px-10 py-5 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full font-bold text-2xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group px-10 py-5 border-2 border-white text-white rounded-full font-bold text-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 flex items-center space-x-2">
                <Play className="w-6 h-6" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-[#F5E6D3] to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1F4E79] mb-6">
              What is MudraVerse?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A comprehensive platform combining ancient wisdom with modern AI to create 
              the most immersive classical dance learning experience ever built.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 text-center bg-white/80 hover:bg-white/90">
                  <div className="text-[#C41E3A] mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1F4E79] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gradient-to-br from-[#1F4E79] to-[#C41E3A]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Revolutionary Features
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Experience the future of classical dance education with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: 'Real-time Mudra Recognition',
                description: 'Advanced AI analyzes your hand positions and provides instant feedback',
                points: ['99.5% accuracy rate', 'All 28 Asamyukta mudras', 'Instant corrections', 'Progress tracking']
              },
              {
                title: 'AR/VR Learning Environment',
                description: 'Immersive 3D environments with virtual guru guidance',
                points: ['WebAR integration', 'Virtual stage experience', 'Interactive 3D models', 'Multi-angle views']
              },
              {
                title: 'AI-Powered Performance Analysis',
                description: 'Comprehensive evaluation of rhythm, expression, and technique',
                points: ['Talam synchronization', 'Abhinaya scoring', 'Posture analysis', 'Custom feedback']
              },
              {
                title: 'Global Dance Community',
                description: 'Connect with dancers, teachers, and cultural enthusiasts worldwide',
                points: ['Peer feedback system', 'Live masterclasses', 'Cultural discussions', 'Performance sharing']
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <GlassCard className="p-8 bg-white/10 border-white/20">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/90 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-center space-x-2 text-white/80">
                        <CheckCircle className="w-4 h-4 text-[#DAA520]" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-white to-[#F5E6D3]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1F4E79] mb-6">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of dancers who have transformed their practice with MudraVerse
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 bg-white/90 text-center">
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6 leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <h4 className="font-semibold text-[#1F4E79]">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#C41E3A] to-[#DAA520]">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Begin Your Dance Journey Today
            </h2>
            <p className="text-xl text-white/90 mb-12">
              Join thousands of dancers preserving and celebrating Indian classical dance heritage
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-4 bg-white text-[#C41E3A] rounded-full font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Start Learning for Free
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Landing;