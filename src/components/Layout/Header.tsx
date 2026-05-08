import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/mudra-library', label: 'Mudra Library' },
    { path: '/practice', label: 'Practice' },
    { path: '/ar-learning', label: 'AR Learning' },
    { path: '/exam-prep', label: 'Exam Prep' },
    { path: '/stories', label: 'Stories' },
    { path: '/community', label: 'Community' },
    { path: '/about', label: 'About' }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-[#DAA520]/20 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#C41E3A] to-[#DAA520] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">मु</span>
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-[#1F4E79]">MudraVerse</h1>
              <p className="text-xs text-gray-600">AI-Powered Classical Dance</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-[#C41E3A] ${
                  location.pathname === item.path ? 'text-[#C41E3A]' : 'text-gray-700'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#F5E6D3] hover:bg-[#DAA520]/20 rounded-full transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-600 hover:text-[#C41E3A] transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-[#C41E3A] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full hover:shadow-lg transition-shadow"
                >
                  Start Learning
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pt-4 border-t border-gray-200"
            >
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === item.path ? 'text-[#C41E3A]' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                {!isAuthenticated && (
                  <div className="flex flex-col space-y-2 pt-3 border-t border-gray-200">
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-sm font-medium text-gray-700"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-4 py-2 bg-gradient-to-r from-[#C41E3A] to-[#DAA520] text-white rounded-full text-center"
                    >
                      Start Learning
                    </Link>
                  </div>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;