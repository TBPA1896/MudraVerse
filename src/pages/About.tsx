import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe, Award, BookOpen, Sparkles } from 'lucide-react';
import GlassCard from '../components/Common/GlassCard';

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Cultural Preservation',
      description: 'Safeguarding the ancient traditions of Indian classical dance for future generations'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Inclusive Learning',
      description: 'Making classical dance accessible to everyone, regardless of location or background'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Innovation',
      description: 'Blending cutting-edge AI technology with traditional teaching methods'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Community',
      description: 'Connecting dancers worldwide to share knowledge and celebrate diversity'
    }
  ];

  const team = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Co-Founder & Cultural Director',
      expertise: 'Bharatanatyam Guru, 25+ years experience',
      avatar: '👩‍🏫',
      description: 'Leading classical dance educator and cultural preservation advocate'
    },
    {
      name: 'Arjun Patel',
      role: 'Co-Founder & CTO',
      expertise: 'AI/ML Engineer, Computer Vision',
      avatar: '👨‍💻',
      description: 'Expert in AI-powered motion analysis and real-time feedback systems'
    },
    {
      name: 'Meera Krishnan',
      role: 'Head of Curriculum',
      expertise: 'Multiple Classical Dance Forms',
      avatar: '💃',
      description: 'Master of Bharatanatyam, Kuchipudi, and Odissi dance forms'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Lead AR/VR Developer',
      expertise: 'Immersive Technology Specialist',
      avatar: '🥽',
      description: 'Creating next-generation learning experiences through virtual reality'
    }
  ];

  const achievements = [
    { number: '10,000+', label: 'Active Learners' },
    { number: '150+', label: 'Classical Gurus' },
    { number: '50+', label: 'Countries Reached' },
    { number: '95%', label: 'Success Rate' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-white to-[#F5E6D3]/50">
      <div className="container mx-auto px-6 py-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#1F4E79] mb-6">
            About MudraVerse
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            We are on a mission to revolutionize the way Indian classical dance is learned, 
            practiced, and preserved, using the power of artificial intelligence while 
            honoring the ancient traditions passed down through generations.
          </p>
        </motion.section>

        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard className="p-12 bg-white/80 max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-[#1F4E79] text-center mb-8">
              Our Story
            </h2>
            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
              <p className="text-center mb-6">
                Born from the convergence of ancient wisdom and modern technology, MudraVerse was 
                created by a team of passionate classical dancers, AI researchers, and cultural 
                preservationists who recognized the urgent need to make traditional Indian dance 
                forms accessible to a global audience.
              </p>
              <p className="text-center mb-6">
                Our journey began when we realized that many aspiring dancers around the world 
                lack access to qualified gurus and traditional learning environments. We set out 
                to create a platform that could bridge this gap while maintaining the sanctity 
                and authenticity of these sacred art forms.
              </p>
              <p className="text-center">
                Today, MudraVerse stands as a testament to the beautiful marriage of tradition 
                and innovation, helping thousands of students worldwide connect with their 
                cultural roots through the timeless language of dance.
              </p>
            </div>
          </GlassCard>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-[#1F4E79] text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 text-center bg-white/80 hover:bg-white/90 h-full">
                  <div className="text-[#C41E3A] mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[#1F4E79] mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <GlassCard className="p-12 bg-gradient-to-r from-[#1F4E79]/10 to-[#C41E3A]/10">
            <h2 className="text-3xl font-serif font-bold text-[#1F4E79] text-center mb-12">
              Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#C41E3A] mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.section>

        {/* Our Team */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-serif font-bold text-[#1F4E79] text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="p-8 text-center bg-white/80 hover:bg-white/90">
                  <div className="text-6xl mb-4">{member.avatar}</div>
                  <h3 className="text-xl font-semibold text-[#1F4E79] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#C41E3A] font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    {member.expertise}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {member.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Technology & Culture */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-[#1F4E79] mb-6">
                Where Tradition Meets Innovation
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  At MudraVerse, we believe that technology should enhance, not replace, 
                  traditional learning methods. Our AI-powered platform analyzes the 
                  intricate movements of classical dance with unprecedented precision, 
                  providing real-time feedback that mirrors the guidance of a master guru.
                </p>
                <p>
                  Every algorithm we develop is informed by centuries-old traditions, 
                  ensuring that the cultural essence and spiritual significance of each 
                  mudra and movement is preserved and respected in our digital interpretation.
                </p>
                <p>
                  Our commitment goes beyond just teaching dance steps – we're preserving 
                  cultural stories, historical contexts, and the philosophical foundations 
                  that make Indian classical dance a truly transformative art form.
                </p>
              </div>
            </div>
            <GlassCard className="p-8 bg-gradient-to-br from-[#1F4E79]/10 to-[#C41E3A]/10">
              <div className="text-center space-y-6">
                <div className="text-6xl mb-4">🕉️</div>
                <h3 className="text-2xl font-semibold text-[#1F4E79] mb-4">
                  Cultural Heritage + AI Technology
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <BookOpen className="w-8 h-8 text-[#C41E3A] mx-auto mb-2" />
                    <p className="font-medium text-[#1F4E79]">Ancient Wisdom</p>
                    <p className="text-sm text-gray-600">Natya Shastra traditions</p>
                  </div>
                  <div>
                    <Sparkles className="w-8 h-8 text-[#DAA520] mx-auto mb-2" />
                    <p className="font-medium text-[#1F4E79]">Modern Tech</p>
                    <p className="text-sm text-gray-600">AI-powered learning</p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <GlassCard className="p-12 bg-gradient-to-r from-[#C41E3A]/10 to-[#DAA520]/10">
            <h2 className="text-3xl font-serif font-bold text-[#1F4E79] mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Whether you're a beginner taking your first steps into classical dance or 
              an experienced performer looking to refine your art, MudraVerse is here to 
              support your journey while preserving this beautiful cultural tradition.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full font-semibold text-lg hover:shadow-2xl transition-shadow"
            >
              Start Your Journey Today
            </motion.button>
          </GlassCard>
        </motion.section>
      </div>
    </div>
  );
};

export default About;