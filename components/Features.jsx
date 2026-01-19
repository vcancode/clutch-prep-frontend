import React from 'react';
import { Target, ListChecks, CheckCircle2, BarChart3, PlayCircle, Lock, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';
import { CardSpotlight } from './ui/card-spotlight';

const fastTransition = { duration: 0.3, ease: "easeOut" };

const HighPriorityCard = () => (
    <CardSpotlight 
        className="w-full h-full min-h-[500px] flex flex-col p-8 relative bg-zinc-950/50 rounded-3xl border border-emerald-500/10 overflow-hidden group transition-all cursor-pointer"
        color="rgba(16, 185, 129, 0.1)"
    >
        <motion.div 
            whileHover={{ 
                y: -8, 
                scale: 1.02,
            }}
            transition={fastTransition}
            className="h-full flex flex-col relative z-10"
        >
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
            
            <div className="flex items-center gap-4 mb-8">
                <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30"
                >
                    <Target className="h-6 w-6 text-emerald-400" />
                </motion.div>
                <div className="text-base font-medium text-emerald-400 uppercase tracking-wider">Analysis Result</div>
            </div>

            <div className="space-y-5 flex-grow">
                {[
                    { topic: "Thermodynamics", weight: 28, trend: "High", color: "bg-emerald-500" },
                    { topic: "Electrostatics", weight: 22, trend: "High", color: "bg-emerald-500" },
                    { topic: "Optics", weight: 15, trend: "Medium", color: "bg-yellow-500" },
                    { topic: "Kinematics", weight: 8, trend: "Low", color: "bg-zinc-600" }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ 
                            scale: 1.02, 
                            x: 5,
                            boxShadow: "0 10px 40px rgba(16, 185, 129, 0.2)",
                            borderColor: "rgba(16, 185, 129, 0.4)"
                        }}
                        transition={{ ...fastTransition, delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-xl flex items-center justify-between shadow-lg hover:bg-zinc-800/50 transition-all cursor-pointer"
                    >
                        <div>
                            <div className="text-zinc-200 font-bold text-lg">{item.topic}</div>
                            <div className="text-sm text-zinc-500 mt-1">Weightage: {item.weight}%</div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <span className={`text-xs px-2 py-1 rounded-md font-bold uppercase ${
                                item.trend === 'High' ? 'bg-emerald-500/20 text-emerald-400' : 
                                item.trend === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-zinc-700/50 text-zinc-400'
                            }`}>
                                {item.trend}
                            </span>
                            <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${item.weight * 3}%` }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className={`h-full ${item.color}`} 
                                />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            
            <div className="mt-8 bg-zinc-900/50 rounded-xl p-4 border border-zinc-800/50 flex items-center gap-4">
                <AlertCircle className="h-5 w-5 text-emerald-500" />
                <span className="text-sm text-zinc-400">Focusing on top 2 topics covers <span className="text-white font-bold">50%</span> of marks.</span>
            </div>
        </motion.div>
    </CardSpotlight>
);

const QuestionTypeCard = () => (
    <CardSpotlight 
        className="w-full h-full min-h-[500px] flex flex-col p-8 relative bg-zinc-950/50 rounded-3xl border border-blue-500/10 overflow-hidden group transition-all cursor-pointer"
        color="rgba(59, 130, 246, 0.1)"
    >
        <motion.div 
            whileHover={{ 
                y: -8, 
                scale: 1.02,
            }}
            transition={fastTransition}
            className="h-full flex flex-col relative z-10"
        >
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

            <div className="flex justify-between items-start mb-10">
                <div>
                    <h4 className="text-white font-bold text-2xl">Question Breakdown</h4>
                    <p className="text-zinc-500 text-sm mt-1">Based on last 5 years</p>
                </div>
                <ListChecks className="h-8 w-8 text-blue-400" />
            </div>

            <div className="grid grid-cols-2 gap-6 flex-grow">
                {[
                    { label: "Numerical", value: "45%" },
                    { label: "Conceptual", value: "30%" },
                    { label: "Derivation", value: "15%" },
                    { label: "Theory", value: "10%" }
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        whileHover={{ 
                            scale: 1.08, 
                            backgroundColor: "rgba(39, 39, 42, 0.9)",
                            boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)",
                            borderColor: "rgba(59, 130, 246, 0.3)"
                        }}
                        className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-all shadow-lg cursor-pointer"
                    >
                        <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                        <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-block px-6 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300"
                >
                    Pattern Detected: High Numerical Frequency
                </motion.div>
            </div>
        </motion.div>
    </CardSpotlight>
);

const ProgressCard = () => (
    <CardSpotlight 
        className="w-full h-full min-h-[500px] flex flex-col p-8 relative bg-zinc-950/50 rounded-3xl border border-emerald-500/10 overflow-hidden items-center justify-center group transition-all cursor-pointer"
        color="rgba(16, 185, 129, 0.1)"
    >
        <motion.div 
            whileHover={{ 
                y: -8, 
                scale: 1.02,
            }}
            transition={fastTransition}
            className="h-full flex flex-col items-center justify-center relative z-10 w-full"
        >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -z-10" />

            <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative w-72 h-72 flex items-center justify-center bg-zinc-900/50 rounded-full border border-zinc-800/80 mb-10 shadow-xl backdrop-blur-sm transition-all duration-500"
            >
                <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 256 256">
                    <circle cx="128" cy="128" r="110" stroke="#27272a" strokeWidth="20" fill="transparent" />
                    <motion.circle 
                        initial={{ strokeDashoffset: 691 }}
                        whileInView={{ strokeDashoffset: 165 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        cx="128" cy="128" r="110" stroke="#10b981" strokeWidth="20" fill="transparent" strokeDasharray="691" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-6xl font-bold text-white tracking-tighter">76%</span>
                    <span className="text-sm text-zinc-500 uppercase tracking-widest mt-2 font-semibold">Readiness</span>
                </div>
            </motion.div>

            <div className="w-full space-y-4 max-w-sm">
                 <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center text-sm font-medium p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 shadow-sm hover:border-emerald-500/20 transition-colors"
                 >
                    <span className="text-zinc-400 flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500" /> Syllabus Covered
                    </span>
                    <span className="text-white font-mono font-bold text-lg">64%</span>
                 </motion.div>
                 <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex justify-between items-center text-sm font-medium p-4 bg-zinc-900/80 rounded-2xl border border-zinc-800 shadow-sm hover:border-emerald-500/20 transition-colors"
                 >
                    <span className="text-zinc-400 flex items-center gap-3">
                        <BarChart3 className="h-5 w-5 text-emerald-500" /> Mock Score
                    </span>
                    <span className="text-white font-mono font-bold text-lg">82/100</span>
                 </motion.div>
            </div>
        </motion.div>
    </CardSpotlight>
);

const VideoCard = () => (
    <CardSpotlight 
        className="w-full h-full min-h-[500px] flex flex-col relative bg-zinc-950/50 rounded-3xl border border-red-500/10 overflow-hidden group transition-all cursor-pointer"
        color="rgba(239, 68, 68, 0.1)"
    >
        <motion.div 
            whileHover={{ 
                y: -8, 
                scale: 1.02,
            }}
            transition={fastTransition}
            className="h-full flex flex-col relative z-10"
        >
            <div className="h-64 bg-zinc-900 relative cursor-pointer overflow-hidden">
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop" 
                    alt="Video Thumbnail" 
                    className="w-full h-full object-cover opacity-60 transition-all duration-500" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                        whileHover={{ scale: 1.2 }}
                        className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform"
                    >
                        <PlayCircle className="h-10 w-10 text-white fill-emerald-600" />
                    </motion.div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 px-3 py-1.5 rounded-md text-sm text-white font-mono">
                    12:45
                </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h4 className="text-white font-bold text-xl leading-tight mb-2">Thermodynamics: Heat Engines & Efficiency</h4>
                        <p className="text-zinc-500 text-sm">Recommended based on your analysis</p>
                    </div>
                </div>

                <div className="space-y-4 mt-auto">
                    <motion.div 
                        whileHover={{ x: 5, backgroundColor: "rgba(39, 39, 42, 1)" }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 transition-colors cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center text-sm text-emerald-400 font-bold">1</div>
                        <div className="text-base text-zinc-300">Carnot Cycle Explained</div>
                        <Lock className="h-4 w-4 text-zinc-600 ml-auto" />
                    </motion.div>
                    <motion.div 
                        whileHover={{ x: 5, backgroundColor: "rgba(39, 39, 42, 1)" }}
                        className="flex items-center gap-4 p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/50 transition-colors cursor-pointer"
                    >
                        <div className="w-8 h-8 rounded-full bg-emerald-900/50 flex items-center justify-center text-sm text-emerald-400 font-bold">2</div>
                        <div className="text-base text-zinc-300">Entropy Calculation</div>
                        <Lock className="h-4 w-4 text-zinc-600 ml-auto" />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    </CardSpotlight>
);

const FeatureRow = ({ 
    title, 
    description, 
    card, 
    index 
}) => {
    const isEven = index % 2 === 0;
    
    return (
        <motion.div 
            initial={{ opacity: 0, x: isEven ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={fastTransition}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24 py-16 lg:py-24 w-full"
        >
            <div className={cn(
                "w-full lg:w-1/2 space-y-8 flex flex-col justify-center",
                isEven ? "lg:order-1 lg:pl-12 xl:pl-20" : "lg:order-2 lg:pr-12 xl:pr-20"
            )}>
                <div className="flex items-center gap-4">
                    <motion.span 
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-lg border border-emerald-500/20"
                    >
                        0{index + 1}
                    </motion.span>
                    <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">{title}</h3>
                </div>
                <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
                    {description}
                </p>
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 96 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="h-1.5 bg-emerald-500/30 rounded-full" 
                />
            </div>
            
            <div className={cn(
                "w-full lg:w-1/2 perspective-1000",
                isEven ? "lg:order-2" : "lg:order-1"
            )}>
                <div className="w-full h-full">
                    {card}
                </div>
            </div>
        </motion.div>
    );
};

const content = [
  {
    title: "High Priority Topics",
    description:
      "Why study 100% of the syllabus when exams focus on 20%? Our algorithms analyze historical data to isolate high-yield topics. We categorize chapters by weightage, frequency, and trend, ensuring you spend your limited time on concepts that actually appear on the test paper.",
    card: <HighPriorityCard />,
  },
  {
    title: "Question Types",
    description:
      "Don't just know what to study, know how to study it. Is the topic usually tested via numericals or derivations? We classify historical questions to reveal the examiner's favorite formats. If 'Electrostatics' is always an MCQ, stop wasting time practicing 5-mark derivations for it.",
    card: <QuestionTypeCard />,
  },
  {
    title: "Progress Tracking",
    description:
      "Visual feedback loops accelerate learning. Watch your 'Exam Readiness Score' climb as you tick off high-priority boxes. Our dashboard provides a real-time heatmap of your preparation, highlighting weak zones that need immediate attention before D-Day.",
    card: <ProgressCard />,
  },
  {
    title: "Video Playlists",
    description:
      "Stop doom-scrolling YouTube for tutorials. We automatically map high-weightage topics to the best educational content available. Get instant access to specific timestamped video lessons that address your exact knowledge gaps, curated from top educators.",
    card: <VideoCard />,
  },
];

const Features = () => {
  return (
    <div id="features" className="py-24 relative z-10 bg-transparent w-full overflow-hidden">
       <div className="w-full px-6 md:px-12 lg:px-24 xl:px-32">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={fastTransition}
                viewport={{ once: true }}
                className="mb-24 text-center max-w-4xl mx-auto"
            >
                <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8">
                    Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">Ace It.</span>
                </h2>
                <p className="text-zinc-400 text-xl">
                    Comprehensive tools designed to replace guesswork with data-driven strategy.
                </p>
            </motion.div>
            
            <div className="flex flex-col w-full">
                {content.map((item, index) => (
                    <FeatureRow 
                        key={index}
                        index={index}
                        title={item.title}
                        description={item.description}
                        card={item.card}
                    />
                ))}
            </div>
       </div>
    </div>
  );
};

export default Features;
