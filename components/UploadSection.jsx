import React, { useState, useRef } from 'react';
import { Upload, FileText, X, ChevronLeft, AlertCircle, FilePlus, Info, CheckCircle, File } from 'lucide-react';
import { analyzeExamPapers, getMockAnalysisData } from '../services/gemini';
import { motion, AnimatePresence } from 'framer-motion';
import SharinganLoader from './ui/sharingan-loader';
import SearchComponent from './ui/animated-glowing-search-bar';
import { Button } from './ui/button';
import { GlassToastContainer, useToast } from './ui/glass-toast';
import { ShinyButton } from './ui/shiny-button';

const fastTransition = { duration: 0.3, ease: "easeOut" };

const UploadSection = ({ onAnalysisComplete, onBack }) => {
  const [analysisName, setAnalysisName] = useState("");
  const [papers, setPapers] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Ref for file inputs
  const papersInputRef = useRef(null);
  const syllabusInputRef = useRef(null);

  const { toasts, addToast, removeToast } = useToast();

  const handleFileChange = (e, type) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const currentFiles = type === 'papers' ? papers : syllabus;
      
      // Limit check
      if (currentFiles.length + newFiles.length > 10) {
        addToast('error', 'Limit Exceeded', 'You can only upload a maximum of 10 files.');
        return;
      }

      // Type check
      const validFiles = [];
      let hasInvalid = false;
      
      newFiles.forEach(f => {
        // Simple client-side validation for types
        const isValidType = f.type.startsWith('image/') || f.type === 'application/pdf' || f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        
        if (!isValidType) {
            hasInvalid = true;
        } else {
            validFiles.push(f);
        }
      });

      if (hasInvalid) {
        addToast('error', 'Invalid File Type', 'Please upload JPG, PNG, PDF (Unscanned), or DOCX only.');
      }

      if (validFiles.length > 0) {
         if (type === 'papers') {
            setPapers(prev => [...prev, ...validFiles]);
            addToast('success', 'Files Added', `${validFiles.length} Question Paper(s) added.`);
         } else {
            setSyllabus(prev => [...prev, ...validFiles]);
            addToast('success', 'Syllabus Added', `${validFiles.length} Syllabus document(s) added.`);
         }
      }
    }
  };

  const removeFile = (index, type) => {
    if (type === 'papers') {
        setPapers(prev => prev.filter((_, i) => i !== index));
    } else {
        setSyllabus(prev => prev.filter((_, i) => i !== index));
    }
    addToast('info', 'File Removed', 'File has been removed from the list.');
  };

  const handleStartAnalysis = async () => {
    if (!analysisName.trim()) {
        addToast('error', 'Missing Name', 'Please give your analysis a name.');
        return;
    }
    if (papers.length === 0) {
        addToast('error', 'Missing Papers', 'Please upload at least one question paper.');
        return;
    }

    setIsAnalyzing(true);
    addToast('info', 'Analysis Started', 'AI is processing your documents...');

    try {
      // Pass both papers and syllabus to the service
      const result = await analyzeExamPapers(papers, syllabus, analysisName);
      addToast('success', 'Analysis Complete', 'Your study roadmap is ready!');
      onAnalysisComplete(result);
    } catch (err) {
      console.error(err);
      addToast('error', 'Analysis Failed', 'There was an unexpected error. Finish what you were doing. Using demo data as fallback.');
      // Fallback
      setTimeout(() => {
        onAnalysisComplete(getMockAnalysisData());
      }, 1500);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative min-h-screen">
        <GlassToastContainer toasts={toasts} removeToast={removeToast} />
        
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={fastTransition}
            className="max-w-4xl mx-auto px-4 py-8 will-change-transform"
        >
        {onBack && !isAnalyzing && (
            <button 
            onClick={onBack}
            className="flex items-center text-zinc-400 hover:text-white mb-6 transition-colors group"
            >
            <ChevronLeft className="h-4 w-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
            </button>
        )}
        
        {isAnalyzing ? (
             <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={fastTransition}
                className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 will-change-transform"
             >
                <div className="bg-zinc-900/50 border border-zinc-800 backdrop-blur-md rounded-2xl shadow-2xl p-16 flex flex-col items-center justify-center">
                    <div style={{ fontSize: '24px' }}>
                        <SharinganLoader />
                    </div>
                    <div className="mt-10 text-center">
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 animate-pulse">
                            Analyzing and identifying imp topics...
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base">
                            This may take up to 3-4 minutes
                        </p>
                    </div>
                </div>
            </motion.div>
        ) : (
            <div className="space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">New Analysis</h2>
                    <p className="text-zinc-400 text-lg">Upload your study materials and let AI build your roadmap.</p>
                </div>

                {/* Instructions Box - Glassmorphism */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={fastTransition}
                    className="bg-zinc-900/40 border border-zinc-700/50 backdrop-blur-md p-6 rounded-2xl relative overflow-hidden will-change-transform"
                >
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Info className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-white font-bold text-lg">Upload Guidelines</h3>
                            <ul className="text-sm text-zinc-400 space-y-1 list-disc list-inside">
                                <li>Supported Formats: <span className="text-emerald-400">JPG, PNG, PDF (Unscanned/Text-based), DOCX</span></li>
                                <li><strong>Scanned PDFs (Images inside PDF) will NOT be read correctly.</strong></li>
                                <li>Maximum <span className="text-white font-bold">10 files</span> per analysis.</li>
                                <li>Ensure images are clear and text is legible.</li>
                            </ul>
                        </div>
                    </div>
                </motion.div>

                {/* Input Name - Glowing Search Bar Style */}
                <div className="flex flex-col items-center gap-2">
                    <label className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Name your Analysis</label>
                    <SearchComponent 
                        placeholder="" 
                        value={analysisName}
                        onChange={(e) => setAnalysisName(e.target.value)}
                        maxLength={50}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Question Papers Upload */}
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={fastTransition}
                        className="space-y-4 will-change-transform"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FileText className="text-emerald-500" /> Question Papers <span className="text-red-500">*</span>
                            </h3>
                            <span className="text-xs text-zinc-500">{papers.length}/10</span>
                        </div>
                        
                        <div 
                            onClick={() => papersInputRef.current?.click()}
                            className="border-2 border-dashed border-zinc-700 bg-zinc-900/30 hover:bg-zinc-800/50 hover:border-emerald-500/50 rounded-xl p-8 transition-all cursor-pointer group flex flex-col items-center justify-center min-h-[200px]"
                        >
                            <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-emerald-500/20">
                                <Upload className="h-8 w-8 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                            </div>
                            <p className="text-zinc-300 font-medium group-hover:text-white">Upload Question Papers</p>
                            <p className="text-zinc-500 text-xs mt-1">Click to browse files</p>
                        </div>
                        <input 
                            type="file" 
                            ref={papersInputRef}
                            onChange={(e) => handleFileChange(e, 'papers')}
                            multiple
                            accept=".pdf,image/*,.docx"
                            className="hidden"
                        />

                        {/* File List */}
                        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                            {papers.map((file, idx) => (
                                <motion.div 
                                    key={`p-${idx}`}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={fastTransition}
                                    className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg group will-change-transform"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <File className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                                        <span className="text-sm text-zinc-300 truncate">{file.name}</span>
                                    </div>
                                    <button onClick={() => removeFile(idx, 'papers')} className="text-zinc-600 hover:text-red-400 transition-colors">
                                        <X className="h-4 w-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Syllabus Upload */}
                    <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={fastTransition}
                        className="space-y-4 will-change-transform"
                    >
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <FilePlus className="text-blue-500" /> Syllabus <span className="text-zinc-600 text-sm font-normal">(Optional)</span>
                            </h3>
                            <span className="text-xs text-zinc-500">{syllabus.length}/10</span>
                        </div>

                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px] relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                            
                            <p className="text-zinc-400 text-center text-sm mb-6 max-w-[200px]">
                                Upload your syllabus to help AI cross-reference topics more accurately.
                            </p>
                            
                            <Button 
                                onClick={() => syllabusInputRef.current?.click()}
                                variant="outline" 
                                className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 transition-all"
                            >
                                <Upload className="mr-2 h-4 w-4" /> Upload Syllabus
                            </Button>
                        </div>
                        <input 
                            type="file" 
                            ref={syllabusInputRef}
                            onChange={(e) => handleFileChange(e, 'syllabus')}
                            multiple
                            accept=".pdf,image/*,.docx"
                            className="hidden"
                        />

                        {/* File List */}
                        <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                            {syllabus.map((file, idx) => (
                                <motion.div 
                                    key={`s-${idx}`}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={fastTransition}
                                    className="flex items-center justify-between p-3 bg-zinc-900 border border-zinc-800 rounded-lg group will-change-transform"
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <File className="h-4 w-4 text-blue-500 flex-shrink-0" />
                                        <span className="text-sm text-zinc-300 truncate">{file.name}</span>
                                    </div>
                                    <button onClick={() => removeFile(idx, 'syllabus')} className="text-zinc-600 hover:text-red-400 transition-colors">
                                        <X className="h-4 w-4" />
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={fastTransition}
                    className="pt-8 border-t border-zinc-800 will-change-transform"
                >
                    <ShinyButton
                        onClick={handleStartAnalysis}
                        className="w-full"
                    >
                        Start Analysis
                    </ShinyButton>
                </motion.div>
            </div>
        )}
        </motion.div>
    </div>
  );
};

export default UploadSection;
