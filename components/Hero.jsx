import React from 'react';
import { ArrowRight, CheckCircle, Zap } from 'lucide-react';
import { Sparkles } from './ui/sparkles';
import { ShinyButton } from './ui/shiny-button';
import { motion } from 'framer-motion';

const Hero = ({ onGetStarted }) => {
  return (
    <div className="relative w-full min-h-screen bg-black pb-20">
      {/* Sparkles Background - Covers entire hero section */}
      <div className="absolute inset-0 top-0 left-0 right-0 bottom-0 z-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/20 to-black" />
        
        {/* Sparkles effect */}
        <Sparkles
          density={250}
          color="#10b981"
          minSize={1.2}
          maxSize={4}
          speed={1.5}
          className="w-full h-full"
        />
        
        {/* Subtle radial gradient overlays for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(16,185,129,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,rgba(16,185,129,0.05)_0%,transparent_50%)]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full min-h-screen px-4 flex items-center flex-col justify-center pt-24 sm:pt-28 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[90%] xl:max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col items-center justify-center"
        >
          <div className="max-w-5xl px-4 text-center">
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold mb-6 border border-emerald-500/20 backdrop-blur-md"
            >
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered Exam Analysis
            </motion.div>
            
            {/* Main Headlines */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-2 flex justify-center"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight drop-shadow-2xl text-center uppercase">
                EXAM TOMORROW?
              </h2>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-2xl"
            >
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-600">
                Study Only What Matters.
              </span>
            </motion.h1>

            {/* Features List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 flex flex-wrap justify-center gap-4 text-xs md:text-sm text-white font-bold tracking-wide drop-shadow-lg"
            >
              <div className="flex items-center bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-sm hover:bg-emerald-500/20 transition-colors">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" /> 
                Instant Analysis
              </div>
              <div className="flex items-center bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-sm hover:bg-emerald-500/20 transition-colors">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" /> 
                95% Accuracy
              </div>
              <div className="flex items-center bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 backdrop-blur-sm hover:bg-emerald-500/20 transition-colors">
                <CheckCircle className="h-4 w-4 text-emerald-400 mr-2" /> 
                No Credit Card Req.
              </div>
            </motion.div>
            
            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-300 mb-8 drop-shadow-md leading-relaxed"
            >
              Upload previous year question papers and instantly find high-weightage topics. Stop wasting time on low-value chapters.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <ShinyButton onClick={onGetStarted}>
                Get Started 
                <ArrowRight className="h-6 w-6" />
              </ShinyButton>
            </motion.div>
            
            {/* Floating Elements for Visual Interest */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-10 -left-10 w-20 h-20 border border-emerald-500/30 rounded-full"
            />
            <motion.div 
              animate={{ 
                y: [0, 15, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute -bottom-5 -right-5 w-16 h-16 border border-emerald-400/20 rounded-full"
            />
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-emerald-500/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-emerald-500 rounded-full mt-2" />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;