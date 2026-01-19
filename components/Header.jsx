import React from 'react';
import { BookOpen, Menu, X } from 'lucide-react';

const Header = ({ onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => onNavigate('landing')}
          >
            <BookOpen className="h-8 w-8 text-emerald-500" />
            <span className="ml-2 text-xl font-bold text-white tracking-tight">ClutchPrep</span>
          </div>
          
          <nav className="hidden md:flex space-x-8 items-center">
            <button onClick={() => onNavigate('landing')} className="text-zinc-400 hover:text-emerald-400 font-medium transition-colors">Home</button>
            <button className="text-zinc-400 hover:text-emerald-400 font-medium transition-colors">Features</button>
            <button onClick={() => onNavigate('test')} className="text-zinc-400 hover:text-emerald-400 font-medium transition-colors">Practice Test</button>
            <button className="text-zinc-400 hover:text-emerald-400 font-medium transition-colors">Login</button>
            <button 
              onClick={() => onNavigate('analysis')}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-900 text-white font-bold hover:from-emerald-500 hover:to-black transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] border border-emerald-500/20"
            >
              Get Started
            </button>
          </nav>

          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-zinc-400 hover:text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button onClick={() => { onNavigate('landing'); setIsMenuOpen(false); }} className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-md w-full text-left">Home</button>
            <button onClick={() => { onNavigate('test'); setIsMenuOpen(false); }} className="block px-3 py-2 text-base font-medium text-zinc-300 hover:text-emerald-400 hover:bg-zinc-800 rounded-md w-full text-left">Practice Test</button>
            <button onClick={() => { onNavigate('analysis'); setIsMenuOpen(false); }} className="block px-3 py-2 text-base font-medium text-emerald-400 bg-emerald-500/10 rounded-md w-full text-left">Get Started</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;