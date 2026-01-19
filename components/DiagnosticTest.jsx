import React from 'react';
import { Check, Clock, AlertTriangle, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';
import { ShinyButton } from './ui/shiny-button';

const DiagnosticTest = ({ onExit, id }) => {
  return (
    <div id={id} className="min-h-screen w-full flex flex-col items-center justify-center py-24 px-6 md:px-12 lg:px-24 relative overflow-hidden">
      <div className="w-full max-w-[90%] xl:max-w-screen-xl mx-auto flex flex-col items-center relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-4xl"
        >
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-semibold mb-6 border border-emerald-500/20">
                <Crosshair className="h-4 w-4 mr-2" />
                Adaptive Assessment Engine
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Find your <span className="text-red-500 decoration-red-500/30 underline decoration-4 underline-offset-8">weak spots</span> <br/>
                before the exam does.
            </h2>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Our diagnostic test uses AI to dynamically probe your knowledge on high-weightage topics. In just 10 minutes, know exactly what you need to revise.
            </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center w-full">
            
            {/* Mock UI Representation */}
            <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative group perspective-1000 w-full"
            >
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.01] group-hover:-rotate-1">
                    {/* Mock Header */}
                    <div className="flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="text-zinc-500 text-xs font-mono">LIVE_ASSESSMENT_V2.0</div>
                    </div>

                    {/* Mock Question */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="bg-red-500/10 text-red-400 text-xs px-2 py-1 rounded border border-red-500/20">High Probability</span>
                            <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded">Thermodynamics</span>
                        </div>
                        <h3 className="text-xl text-white font-medium leading-snug">
                            For an adiabatic process, which of the following relations is correct?
                        </h3>
                        <div className="space-y-3">
                            {[
                                "PV = constant",
                                "TV^(γ-1) = constant",
                                "P/T = constant",
                                "V/T = constant"
                            ].map((opt, i) => (
                                <div key={i} className={`p-4 rounded-xl border text-base flex justify-between items-center ${i === 1 ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-300' : 'bg-zinc-900 border-zinc-800 text-zinc-500'}`}>
                                    <span>{opt}</span>
                                    {i === 1 && <Check className="h-5 w-5" />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute -right-6 -bottom-6 bg-zinc-900 border border-zinc-700 p-5 rounded-2xl shadow-xl flex items-center gap-4 animate-pulse-slow">
                    <div className="bg-red-500/20 p-2.5 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                        <div className="text-xs text-zinc-400 uppercase tracking-wide">Analysis Result</div>
                        <div className="text-base font-bold text-white">Concept Gap Detected</div>
                    </div>
                </div>
            </motion.div>

            {/* Benefits List */}
            <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-10 pl-0 lg:pl-8"
            >
                <div className="flex gap-6">
                    <div className="mt-1 bg-emerald-500/20 p-3 h-fit rounded-xl border border-emerald-500/10">
                        <Clock className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Save Hours of Revision</h3>
                        <p className="text-zinc-400 mt-2 text-lg leading-relaxed">Don't study what you already know. We filter out your strong areas so you can focus on the weak ones.</p>
                    </div>
                </div>
                <div className="flex gap-6">
                    <div className="mt-1 bg-emerald-500/20 p-3 h-fit rounded-xl border border-emerald-500/10">
                        <Crosshair className="h-8 w-8 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">Laser-Focused Questions</h3>
                        <p className="text-zinc-400 mt-2 text-lg leading-relaxed">Questions are selected from topics with the highest exam weightage over the last 5 years.</p>
                    </div>
                </div>

                <div className="pt-8">
                
                    <ShinyButton>
                        Start Free Assessment
                    </ShinyButton>

                    <p className="mt-4 text-sm text-zinc-500">
                        No sign-up required for the demo test.
                    </p>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticTest;