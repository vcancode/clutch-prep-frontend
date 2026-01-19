import React from 'react';
import { Upload, Cpu, Trophy } from 'lucide-react';
import { StepCard } from './ui/step-card';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  return (
    <div id="how-it-works" className="py-24 relative overflow-hidden bg-transparent w-full">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} // Standardized
        viewport={{ once: true, margin: "-100px" }}
        className="w-full px-6 md:px-12 lg:px-24 xl:px-32 relative z-10"
      >
        <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
                From Chaos to Clarity in <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">3 Simple Steps.</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                Stop studying blindly. Our AI analyzes patterns to tell you exactly what matters.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
            <StepCard 
                title="Upload PYQs"
                step="Step 01"
                description="Simply drag and drop your previous year question papers. We support PDFs and images (JPG/PNG). Our intelligent OCR instantly parses handwriting and poor quality scans, digitizing the questions for deep analysis without any manual typing."
                icon={Upload}
                className="h-full"
            />
            <StepCard 
                title="We Analyze"
                step="Step 02"
                description="Our AI engine cross-references your papers against thousands of exam patterns. It identifies recurring themes, classifies questions by type (numerical vs. theory), and calculates the exact mark distribution to map the 'DNA' of your exam."
                icon={Cpu}
                className="h-full"
            />
             <StepCard 
                title="Score High"
                step="Step 03"
                description="Get a strategic report card. We generate a prioritized 3-day revision plan that focuses strictly on high-yield topics. We also curate video links for your weak areas, ensuring every minute you spend studying directly translates to marks."
                icon={Trophy}
                className="h-full"
            />
        </div>
       </motion.div>
    </div>
  );
};

export default HowItWorks;