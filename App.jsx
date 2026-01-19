import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AuthSection from './components/AuthSection';
import LandingPage from './components/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import { BookOpen } from 'lucide-react';
import { GlassToastContainer, useToast } from './components/ui/glass-toast';

function App() {
  const { toasts, addToast, removeToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleAuthSuccess = () => {
      navigate('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    addToast('info', 'Logged Out', 'You have been successfully signed out.');
    navigate('/');
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
        navigate('/');
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden">
      <GlassToastContainer toasts={toasts} removeToast={removeToast} />
      
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 bg-black pointer-events-none" />

      {/* Fixed Logo Top Left */}
      <div className="fixed top-6 left-6 md:left-10 z-[10000]">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={handleLogoClick}
          >
             <div className="bg-emerald-500/10 p-2 rounded-lg border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors backdrop-blur-md">
                <BookOpen className="h-5 w-5 text-emerald-500" />
             </div>
             <span className="text-xl font-bold text-white tracking-tight drop-shadow-md">ClutchPrep</span>
          </div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-grow">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route 
                    path="/auth" 
                    element={
                        <div className="min-h-screen pt-24 flex flex-col items-center justify-center">
                            <AuthSection onAuthComplete={handleAuthSuccess} />
                        </div>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <div className="min-h-screen pt-24">
                                <Dashboard onLogout={handleLogout} />
                            </div>
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
