import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-[#1F4E79] to-[#C41E3A] text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">मु</span>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold">MudraVerse</h3>
                <p className="text-white/80">AI-Powered Classical Dance Learning</p>
              </div>
            </div>
            <p className="text-white/90 mb-6 max-w-md">
              Preserving and revolutionizing the ancient art of Bharatiya Natya through 
              cutting-edge AI technology and immersive learning experiences.
            </p>
            <div className="flex items-center text-white/80">
              <span className="mr-2">Made with</span>
              <Heart className="w-4 h-4 text-red-400" />
              <span className="ml-2">for Indian Classical Dance</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { path: '/mudra-library', label: 'Mudra Library' },
                { path: '/practice', label: 'Practice Mode' },
                { path: '/ar-learning', label: 'AR Learning' },
                { path: '/community', label: 'Community' },
                { path: '/exam-prep', label: 'Exam Prep' }
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-white/80">hello@mudraverse.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-white/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span className="text-white/80">Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/80 text-sm">
            © 2025 MudraVerse. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-white/80 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/80 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white text-sm transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;