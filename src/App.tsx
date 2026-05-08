import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import AuthModal from './components/Auth/AuthModal';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import MudraLibrary from './pages/MudraLibrary';
import Practice from './pages/Practice';
import PracticePataka from './pages/PracticePataka';
import PracticeTripataka from './pages/PracticeTripataka';
import PracticeKartarimukha from './pages/PracticeKartarimukha';
import PracticeMayura from './pages/PracticeMayura';
import PracticeArdhachandra from './pages/PracticeArdhachandra';
import PracticeArala from './pages/PracticeArala';
import ARLearning from './pages/ARLearning';
import Community from './pages/Community';
import About from './pages/About';
import ExamPrep from './pages/ExamPrep';
import StoriesPage from './pages/stories';

interface User {
  id: string;
  name: string;
  email: string;
  level: string;
  totalPracticeHours: number;
  mudrasLearned: number;
  accuracyScore: number;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleLogin = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignup = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  const handleAuth = (userData: User) => {
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-[#F5E6D3] via-white to-[#F5E6D3]/50">
        <Header
          isAuthenticated={!!user}
          onLogout={handleLogout}
        />

        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/dashboard" /> :
                <Navigate to="/" state={{ openAuth: 'login' }} />
              }
            />
            <Route
              path="/signup"
              element={
                user ? <Navigate to="/dashboard" /> :
                <Navigate to="/" state={{ openAuth: 'signup' }} />
              }
            />
            <Route
              path="/dashboard"
              element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
            />
            <Route path="/mudra-library" element={<MudraLibrary />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/practice/pataka" element={<PracticePataka />} />
            <Route path="/practice/tripataka" element={<PracticeTripataka />} />
            <Route path="/practice/kartarimukha" element={<PracticeKartarimukha />} />
            <Route path="/practice/mayura" element={<PracticeMayura />} />
            <Route path="/practice/ardhachandra" element={<PracticeArdhachandra />} />
            <Route path="/practice/arala" element={<PracticeArala />} />
            <Route path="/ar-learning" element={<ARLearning />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/exam-prep" element={<ExamPrep />} />
            <Route path="/stories" element={<StoriesPage />} />
          </Routes>
        </main>

        <Footer />

        {/* Auth Modal */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          mode={authMode}
          onModeChange={setAuthMode}
          onAuth={handleAuth}
        />

        {/* Global Auth Handlers */}
        <div className="hidden">
          <button onClick={handleLogin} data-auth="login">Login</button>
          <button onClick={handleSignup} data-auth="signup">Signup</button>
        </div>
      </div>
    </Router>
  );
}

export default App;
