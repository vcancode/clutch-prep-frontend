import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

const fastTransition = { duration: 0.3, ease: "easeOut" };

export const StepCard = ({ title, step, description, icon: Icon, className }) => {
  return (
    <motion.div 
      whileHover={{ y: -8, scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={fastTransition}
      className={cn(
        "group relative p-8 h-[340px] flex flex-col justify-between rounded-xl border border-zinc-800 bg-black transition-all duration-300 hover:border-emerald-500/30 overflow-hidden will-change-transform",
        className
      )}
    >
      {/* Hover Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-zinc-950/50 to-zinc-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Top Section */}
      <div className="flex justify-between items-start relative z-10">
        <motion.div 
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={fastTransition}
            className="h-14 w-14 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center transition-colors duration-300 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20"
        >
          <Icon className="h-7 w-7 text-zinc-400 transition-colors duration-300 group-hover:text-emerald-400" />
        </motion.div>
        
        <motion.div 
            whileHover={{ scale: 1.2, backgroundColor: "white" }}
            transition={fastTransition}
            className="h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg bg-zinc-900/50"
        >
          <ArrowUpRight className="h-5 w-5 text-zinc-400 transition-colors duration-300 group-hover:text-black" />
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 mt-auto">
        <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{title}</h3>
        
        <div className="flex items-center gap-2 mb-5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-500 tracking-widest uppercase">{step}</span>
        </div>
        
        <p className="text-zinc-500 text-sm leading-relaxed group-hover:text-zinc-300 transition-colors duration-300 pr-4">
            {description}
        </p>
      </div>
    </motion.div>
  );
};
