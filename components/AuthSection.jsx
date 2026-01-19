import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiLoader } from './ui/ai-loader';
import { GlassToastContainer, useToast } from './ui/glass-toast';
import { ShinyButton } from './ui/shiny-button';

const API_URL = import.meta.env.VITE_BACKEND_API ;
const fastTransition = { duration: 0.3, ease: "easeOut" };

const AuthSection = ({ onAuthComplete }) => {
  const [view, setView] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setIsLoading(true);

    if (view === 'signup' && formData.password.length < 8) {
        addToast('error', 'Weak Password', 'Password must be at least 8 characters long.');
        setIsLoading(false);
        return;
    }

    const endpoint = view === 'login' ? '/user/login' : '/user/signup';
    const payload = view === 'login' 
        ? { email: formData.email, password: formData.password }
        : { name: formData.name, email: formData.email, password: formData.password };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        addToast('success', 'Welcome!', view === 'login' ? 'Logged in successfully.' : 'Account created successfully.');
        onAuthComplete();
      } else {
        throw new Error('No access token received');
      }

    } catch (err) {
      addToast('error', 'Auth Error', err.message || "There was an unexpected error. Finish what you were doing.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center px-4 py-12">
      <GlassToastContainer toasts={toasts} removeToast={removeToast} />
      <div className="w-full max-w-md relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
             <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={fastTransition}
                className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl p-12 flex flex-col items-center justify-center min-h-[400px] will-change-transform"
             >
                <AiLoader text={view === 'signup' ? "Creating" : "Loading"} />
                <p className="mt-4 text-zinc-400 text-sm animate-pulse">Authenticating...</p>
             </motion.div>
          ) : (
            <motion.div
              key={view}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -10 }}
              transition={fastTransition}
              className="bg-zinc-900/80 border border-zinc-800 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden relative group will-change-transform"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
              
              <div className="p-8 relative z-10">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                    {view === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-zinc-400 text-sm">
                    {view === 'login'
                      ? 'Enter your credentials to access your dashboard.'
                      : 'Join ClutchPrep to start studying smarter.'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {view === 'signup' && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Full Name</label>
                      <div className="relative group/input">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-zinc-500 group-focus-within/input:text-emerald-500 transition-colors" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="John Doe"
                          className="block w-full pl-10 pr-3 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-zinc-500 group-focus-within/input:text-emerald-500 transition-colors" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="you@example.com"
                        className="block w-full pl-10 pr-3 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative group/input">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-zinc-500 group-focus-within/input:text-emerald-500 transition-colors" />
                      </div>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="••••••••"
                        className="block w-full pl-10 pr-3 py-3 bg-zinc-950/50 border border-zinc-800 rounded-xl text-white placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <ShinyButton 
                      type="submit"
                      className="w-full"
                    >
                      {view === 'login' ? 'Log In' : 'Create Account'}
                      <ArrowRight className="h-5 w-5" />
                    </ShinyButton>
                  </div>
                </form>

                <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
                  <p className="text-zinc-500 text-sm">
                    {view === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setView(view === 'login' ? 'signup' : 'login')}
                      className="font-semibold transition-colors hover:underline text-emerald-400 hover:text-emerald-300"
                    >
                      {view === 'login' ? 'Sign Up' : 'Log In'}
                    </button>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthSection;
