import React, { useState, useEffect } from 'react';
import UploadSection from './UploadSection';
import { 
    Plus, Save, CheckCircle2, Target, ArrowLeft, Calendar, 
    Youtube, BrainCircuit, Play, AlertCircle, RefreshCw, Layers, Check, X, BookOpen, Video, Circle, Star, BarChart2, ExternalLink, LogOut, VideoOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiLoader } from './ui/ai-loader';
import { GlassToastContainer, useToast } from './ui/glass-toast';
import { ShinyButton } from './ui/shiny-button';
import { CardSpotlight } from './ui/card-spotlight';

const API_URL = import.meta.env.VITE_BACKEND_API ;
const fastTransition = { duration: 0.3, ease: "easeOut" };

export default function Dashboard({ onLogout }) {
    const [view, setView] = useState('list');
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [quizData, setQuizData] = useState(null);
    const [userName, setUserName] = useState("Scholar");
    
    const { toasts, addToast, removeToast } = useToast();

    // Fetch Data on Mount
    useEffect(() => {
        fetchDocuments();
        
        try {
            const userStr = localStorage.getItem('user');
            if (userStr) {
                const user = JSON.parse(userStr);
                if (user.name) setUserName(user.name.split(' ')[0]);
            }
        } catch (e) {
            console.error("Error parsing user data", e);
        }
    }, []);

    const fetchDocuments = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/files/getdocuments`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            
            if (data.documents && Array.isArray(data.documents)) {
                const validDocs = data.documents.filter((d) => 
                    d && 
                    d.jsonFile && 
                    Array.isArray(d.jsonFile.topics)
                ).reverse();
                setDocuments(validDocs);
            } else {
                setDocuments([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            addToast('error', 'Error', 'Failed to load documents. There was an unexpected error. Finish what you were doing.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDocClick = (doc) => {
        setSelectedDoc(doc);
        setView('detail');
    };

    const handleUploadComplete = () => {
        fetchDocuments();
        setView('list');
        addToast('success', 'Success', 'Analysis created successfully.');
    };

    const handleUpdateDocLocal = (updatedDoc) => {
        setSelectedDoc(updatedDoc);
        setDocuments(prev => prev.map(d => d._id === updatedDoc._id ? updatedDoc : d));
    };

    const handleStartQuiz = (data) => {
        setQuizData(data);
        setView('quiz');
        addToast('info', 'Assessment Started', 'Good luck on your diagnostic test!');
    };

    // --- MAIN RENDER CONTAINER ---

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            {/* GLOBAL TOAST CONTAINER */}
            <GlassToastContainer toasts={toasts} removeToast={removeToast} />
            
            {/* Header - Show on List View only */}
            {view === 'list' && (
                 <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={fastTransition}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6"
                >
                    <div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-500">{userName}</span>
                        </h1>
                        <p className="text-zinc-400 mt-2 text-xl">Your academic arsenal.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onLogout}
                            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl font-bold text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
                        >
                            <LogOut className="h-5 w-5" />
                            Log Out
                        </motion.button>
                        <ShinyButton 
                            onClick={() => setView('upload')}
                        >
                            <Plus className="h-6 w-6" /> 
                            New Analysis
                        </ShinyButton>
                    </div>
                </motion.div>
            )}

            {/* CONDITIONAL CONTENT */}
            <div className="w-full">
                {view === 'upload' && (
                    <UploadSection onAnalysisComplete={handleUploadComplete} onBack={() => setView('list')} />
                )}

                {view === 'detail' && selectedDoc && (
                    <DocumentDetailView 
                        doc={selectedDoc} 
                        onBack={() => setView('list')} 
                        onUpdate={handleUpdateDocLocal}
                        onStartQuiz={handleStartQuiz}
                        onRefresh={fetchDocuments}
                        addToast={addToast}
                    />
                )}

                {view === 'quiz' && quizData && (
                    <QuizView 
                        data={quizData} 
                        onBack={() => setView('detail')} 
                    />
                )}

                {view === 'list' && (
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={fastTransition} className="flex justify-center pt-32">
                                <AiLoader text="Loading Docs" />
                            </motion.div>
                        ) : documents.length === 0 ? (
                            <motion.div key="empty" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={fastTransition} className="text-center py-32 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
                                <p className="text-zinc-500 text-xl font-medium">No documents found.</p>
                                <p className="text-zinc-600 mt-2">Upload your first exam paper to get started.</p>
                            </motion.div>
                        ) : (
                            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={fastTransition} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {documents.map((doc, index) => {
                                    const topics = doc.jsonFile?.topics || [];
                                    const totalTopics = topics.length;
                                    const completedTopics = topics.filter(t => t.completed).length;
                                    const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
                                    const sideTopicsCount = topics.reduce((acc, t) => acc + (t.side_topics?.length || 0), 0);
                                    const hasPlaylists = (doc.jsonFile?.subjectPlaylists?.length || 0) > 0 || (doc.jsonFile?.subject_playlists?.length || 0) > 0;

                                    return (
                                        <motion.div
                                            key={doc._id}
                                            initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            transition={{ ...fastTransition, delay: index * 0.05 }}
                                            className="will-change-transform"
                                        >
                                            <CardSpotlight
                                                onClick={() => handleDocClick(doc)}
                                                className="group relative bg-black border border-emerald-500/10 rounded-[2.5rem] p-10 cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] overflow-hidden flex flex-col justify-between h-full min-h-[320px]"
                                                color="rgba(16, 185, 129, 0.1)"
                                            >
                                                <div className="flex justify-between items-center relative z-10 w-full gap-8">
                                                    <div className="flex-1 space-y-6">
                                                         <h3 className="text-3xl md:text-4xl font-extrabold text-white leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2">
                                                            {doc.documentName}
                                                        </h3>
                                                        <div className="flex flex-col items-start gap-3">
                                                            <span className="px-4 py-1.5 rounded-full text-sm font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wide">
                                                                {doc.jsonFile?.subject || "Subject"}
                                                            </span>
                                                            {hasPlaylists ? (
                                                                <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                                                                    <Video className="h-3.5 w-3.5" />
                                                                    <span className="text-xs font-bold uppercase tracking-wide leading-none">Playlist Covered</span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
                                                                    <VideoOff className="h-3.5 w-3.5" />
                                                                    <span className="text-xs font-bold uppercase tracking-wide leading-none">Playlist Not Covered</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="text-base text-zinc-400 font-medium pt-2 flex items-center gap-3">
                                                            <span className="text-white font-bold">{totalTopics}</span> Main Topics
                                                            <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full" />
                                                            <span className="text-white font-bold">{sideTopicsCount}</span> Side Topics
                                                        </div>
                                                        <div className="flex items-center gap-2 text-sm text-zinc-600 font-mono pt-4">
                                                            <Calendar className="h-4 w-4" />
                                                            {new Date(doc.createdAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                    <div className="shrink-0">
                                                        <div className="w-40 h-40 rounded-full bg-zinc-900/80 border border-zinc-800/80 flex items-center justify-center relative p-2 shadow-2xl">
                                                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                                                <circle cx="50" cy="50" r="42" stroke="#18181b" strokeWidth="8" fill="transparent" />
                                                                <motion.circle 
                                                                    initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                                                                    animate={{ strokeDashoffset: (2 * Math.PI * 42) - (percentage / 100) * (2 * Math.PI * 42) }}
                                                                    transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
                                                                    cx="50" cy="50" r="42" stroke="#10b981" strokeWidth="8" fill="transparent" strokeDasharray={2 * Math.PI * 42} strokeLinecap="round" 
                                                                />
                                                            </svg>
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                                <span className="text-3xl font-black text-white">{percentage}%</span>
                                                                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mt-0.5">Covered</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardSpotlight>
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

// --- QUIZ VIEW ---

const QuizView = ({ data, onBack }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showResult, setShowResult] = useState(false);

    const questions = data.quiz;
    const currentQ = questions[currentIndex];
    
    const handleOptionSelect = (index) => {
        if (showResult) return;
        setSelectedAnswers(prev => ({...prev, [currentIndex]: index}));
    };

    const calculateResults = () => {
        const correct = questions.filter((q, i) => selectedAnswers[i] === q.answerIndex).length;
        return {
            score: correct,
            total: questions.length,
            percentage: Math.round((correct / questions.length) * 100)
        };
    };

    const getWeakTopics = () => {
        const weak = questions
            .filter((q, i) => selectedAnswers[i] !== q.answerIndex)
            .map(q => q.topic);
        return Array.from(new Set(weak));
    };

    if (showResult) {
        const results = calculateResults();
        const weakTopics = getWeakTopics();

        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={fastTransition}
                className="max-w-3xl mx-auto py-12 px-4"
            >
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
                    <div className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-6">
                        <Target className="h-10 w-10 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete</h2>
                    <p className="text-zinc-400 mb-8">Performance in {data.subject}</p>
                    <div className="flex justify-center mb-10">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="50%" cy="50%" r="70" stroke="#27272a" strokeWidth="12" fill="transparent" />
                                <motion.circle 
                                    initial={{ strokeDashoffset: 440 }}
                                    animate={{ strokeDashoffset: 440 - (results.percentage / 100) * 440 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    cx="50%" cy="50%" r="70" stroke={results.percentage >= 70 ? "#10b981" : "#ef4444"} strokeWidth="12" fill="transparent" strokeDasharray={440} strokeLinecap="round" 
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-bold text-white">{results.percentage}%</span>
                                <span className="text-xs text-zinc-500 font-bold uppercase">Score</span>
                            </div>
                        </div>
                    </div>
                    {weakTopics.length > 0 ? (
                        <div className="text-left bg-black/40 rounded-2xl p-6 border border-red-500/20 mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <AlertCircle className="h-5 w-5 text-red-500" />
                                <h3 className="font-bold text-white">Weak Topics Detected</h3>
                            </div>
                            <ul className="space-y-2">
                                {weakTopics.map((topic, i) => (
                                    <li key={i} className="text-zinc-400 text-sm flex items-start gap-2">
                                        <span className="text-red-500 mt-1">•</span> {topic}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="text-center p-6 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 mb-8">
                            <h3 className="font-bold text-emerald-400">Excellent Work!</h3>
                            <p className="text-sm text-emerald-200/70">Mastery achieved across analyzed topics.</p>
                        </div>
                    )}
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onBack}
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        Back to Analysis
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fastTransition}
            className="max-w-3xl mx-auto py-12 px-4 min-h-screen flex flex-col"
        >
            <div className="flex items-center justify-between mb-8">
                <button onClick={onBack} className="text-zinc-400 hover:text-white flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" /> Exit
                </button>
                <div className="text-zinc-500 font-mono text-sm">
                    Question {currentIndex + 1} / {questions.length}
                </div>
            </div>
            <div className="flex-1">
                <motion.div 
                    key={currentIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={fastTransition}
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden will-change-transform"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-zinc-800">
                        <motion.div 
                            className="h-full bg-emerald-500" 
                            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} 
                        />
                    </div>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20 uppercase tracking-widest">
                            {currentQ.difficulty}
                        </span>
                        <span className="text-zinc-500 text-xs uppercase font-bold tracking-widest">
                            {currentQ.topic}
                        </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-relaxed">
                        {currentQ.question}
                    </h2>
                    <div className="space-y-3">
                        {currentQ.options.map((option, idx) => {
                            const isSelected = selectedAnswers[currentIndex] === idx;
                            return (
                                <motion.button
                                    key={idx}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleOptionSelect(idx)}
                                    className={`w-full text-left p-5 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                                        isSelected 
                                        ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                                        : 'bg-black border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                    }`}
                                >
                                    <span className="font-medium">{option}</span>
                                    {isSelected && <motion.div layoutId="correct" className="h-3 w-3 bg-emerald-500 rounded-full" />}
                                </motion.button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
            <div className="mt-8 flex justify-end">
                {currentIndex < questions.length - 1 ? (
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCurrentIndex(prev => prev + 1)}
                        disabled={selectedAnswers[currentIndex] === undefined}
                        className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl disabled:opacity-50 hover:bg-emerald-500 transition-colors"
                    >
                        Next Question
                    </motion.button>
                ) : (
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowResult(true)}
                        disabled={selectedAnswers[currentIndex] === undefined}
                        className="bg-white text-black font-bold py-3 px-8 rounded-xl disabled:opacity-50 hover:bg-zinc-200 transition-colors"
                    >
                        Finish Quiz
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

// --- DETAIL VIEW COMPONENT ---

const DocumentDetailView = ({ doc, onBack, onUpdate, onStartQuiz, onRefresh, addToast }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(false);
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

    const topics = doc.jsonFile?.topics || [];
    const completedCount = topics.filter(t => t.completed).length;
    const totalCount = topics.length;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    const playlists = doc.jsonFile?.subjectPlaylists || doc.jsonFile?.subject_playlists || [];
    const hasPlaylists = playlists.length > 0;

    const handleToggleComplete = (index) => {
        if (!doc.jsonFile || !doc.jsonFile.topics) return;
        const updatedTopics = [...doc.jsonFile.topics];
        updatedTopics[index] = {
            ...updatedTopics[index],
            completed: !updatedTopics[index].completed
        };
        const updatedDoc = {
            ...doc,
            jsonFile: {
                ...doc.jsonFile,
                topics: updatedTopics
            }
        };
        onUpdate(updatedDoc);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/files/savedocument`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(doc)
            });
            if (res.ok) addToast('success', 'Progress Saved', 'Your learning milestone has been recorded.');
            else addToast('error', 'Error', 'Failed to save progress. There was an unexpected error. Finish what you were doing.');
        } catch (e) {
            addToast('error', 'Network Error', 'Check your connection. There was an unexpected error. Finish what you were doing.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleGetPlaylists = async () => {
        if (hasPlaylists) return;
        setIsLoadingPlaylists(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/files/getyoutube?documentId=${doc._id}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.status === 429) {
                addToast('error', 'Quota Exceeded', 'Daily YouTube usage limit reached.');
                return;
            }
            const data = await res.json();
            if (res.ok && data.document) {
                onUpdate(data.document);
                addToast('success', 'Resources Loaded', 'Curated playlists are now available below.');
                onRefresh();
            } else {
                addToast('error', 'No Resources', 'Could not find matching study playlists. There was an unexpected error. Finish what you were doing.');
            }
        } catch (e) {
            addToast('error', 'Error', 'Failed to connect to YouTube API. There was an unexpected error. Finish what you were doing.');
        } finally {
            setIsLoadingPlaylists(false);
        }
    };

    const handleTakeTest = async () => {
        setIsLoadingQuiz(true);
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`${API_URL}/files/getquiz?documentId=${doc._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.quiz) onStartQuiz(data);
            else addToast('error', 'Error', 'Could not generate questions. There was an unexpected error. Finish what you were doing.');
        } catch (e) {
            addToast('error', 'Error', 'Quiz generation failed. There was an unexpected error. Finish what you were doing.');
        } finally {
            setIsLoadingQuiz(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={fastTransition}
            className="max-w-4xl mx-auto px-4 py-8 pb-32"
        >
            <div className="flex items-center justify-between mb-12">
                <button onClick={onBack} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </button>
            </div>
            <div className="flex flex-col items-center justify-center text-center mb-16">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                    <Target className="h-3 w-3" /> Analysis Result
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tight">
                    {doc.jsonFile?.subject || "Subject Details"}
                </h1>
                <div className="relative mb-12">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
                    <motion.div whileHover={{ scale: 1.05 }} transition={fastTransition} className="relative w-64 h-64 flex items-center justify-center">
                         <svg className="w-full h-full transform -rotate-90">
                            <circle cx="50%" cy="50%" r="100" stroke="#18181b" strokeWidth="16" fill="transparent" />
                            <motion.circle 
                                initial={{ strokeDashoffset: 628 }}
                                animate={{ strokeDashoffset: 628 - (percentage / 100) * 628 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                cx="50%" cy="50%" r="100" stroke="#10b981" strokeWidth="16" fill="transparent" strokeDasharray={628} strokeLinecap="round" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-6xl font-black text-white tracking-tighter">{percentage}%</span>
                            <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest mt-2">Prepared</span>
                        </div>
                    </motion.div>
                </div>
                <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSave} disabled={isSaving} className="flex-1 min-w-[160px] bg-zinc-900 border border-zinc-800 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2">
                        {isSaving ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} Save Progress
                    </motion.button>
                    <motion.button whileHover={!hasPlaylists ? { scale: 1.02 } : {}} whileTap={!hasPlaylists ? { scale: 0.98 } : {}} onClick={handleGetPlaylists} disabled={isLoadingPlaylists || hasPlaylists} className={`flex-1 min-w-[160px] font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 ${hasPlaylists ? 'bg-zinc-900/50 text-zinc-500 cursor-default' : 'bg-zinc-900 text-white border border-zinc-800'}`}>
                        {isLoadingPlaylists ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Youtube className={`h-5 w-5 ${hasPlaylists ? 'text-zinc-600' : 'text-red-500'}`} />} {hasPlaylists ? 'Playlists Loaded' : 'Get Playlists'}
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleTakeTest} disabled={isLoadingQuiz} className="flex-1 min-w-[160px] bg-emerald-600 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg">
                        {isLoadingQuiz ? <RefreshCw className="h-5 w-5 animate-spin" /> : <BrainCircuit className="h-5 w-5" />} Take Weakness Test
                    </motion.button>
                </div>
            </div>
            {hasPlaylists && (
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Youtube className="h-6 w-6 text-red-500" /> Subject Playlists
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {playlists.map((pl, idx) => (
                            <motion.a key={idx} href={pl.link} target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} transition={fastTransition} className="group block bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-red-500/50 transition-all will-change-transform">
                                <div className="aspect-video relative">
                                    <img src={pl.thumbnail} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/0 transition-colors">
                                        <Play className="h-10 w-10 text-white fill-white" />
                                    </div>
                                </div>
                                <div className="p-4 text-sm font-bold text-white">{pl.playlist_name}</div>
                            </motion.a>
                        ))}
                    </div>
                </div>
            )}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Topics Breakdown</h2>
                {topics.map((t, i) => (
                    <TopicCard key={i} topic={t} onToggle={() => handleToggleComplete(i)} />
                ))}
            </div>
        </motion.div>
    );
};

// --- TOPIC CARD COMPONENT ---

const TopicCard = ({ topic, onToggle }) => {
    const getStatusStyle = (p) => {
        p = p.toLowerCase();
        if (p === 'high' || p === 'easy') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
        if (p === 'medium' || p === 'moderate') return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
        return 'bg-red-500/10 text-red-400 border-red-500/20';
    };

    return (
        <CardSpotlight 
            className={`rounded-2xl border p-8 transition-all duration-300 ${topic.completed ? 'bg-emerald-950/10 border-emerald-500/30' : 'bg-zinc-950 border-zinc-800'}`}
            color="rgba(16, 185, 129, 0.1)"
        >
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                transition={fastTransition}
            >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div className="flex gap-4">
                    <motion.button whileTap={{ scale: 0.9 }} onClick={onToggle} className={`shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors ${topic.completed ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-zinc-700'}`}>
                        {topic.completed && <Check className="h-4 w-4 stroke-[3]" />}
                    </motion.button>
                    <div>
                        <h3 className={`text-2xl font-bold ${topic.completed ? 'text-emerald-400 line-through' : 'text-white'}`}>{topic.main_topic}</h3>
                        <p className="text-white text-sm mt-2 leading-relaxed">
                            {topic.definition}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(topic.topic_query)}`} target="_blank" className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-300 hover:text-white transition-all">
                        <Youtube className="h-4 w-4 text-red-500" /> Watch Lesson
                    </motion.a>
                    <motion.a whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} href={`https://www.youtube.com/results?search_query=${encodeURIComponent(topic.playlist_query)}&sp=EgIQAw%253D%253D`} target="_blank" className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl text-sm font-bold text-zinc-300 hover:text-white transition-all">
                        <Video className="h-4 w-4 text-emerald-500" /> Watch Playlist
                    </motion.a>
                </div>
            </div>
            <div className="flex flex-wrap gap-3 mb-8">
                <div className={`px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-widest ${getStatusStyle(topic.priority)}`}>Priority: {topic.priority}</div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold border uppercase tracking-widest ${getStatusStyle(topic.difficulty)}`}>Difficulty: {topic.difficulty}</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-zinc-900 pt-8">
                <div>
                    <h4 className="text-xs font-bold uppercase text-emerald-500 mb-4 tracking-widest flex items-center gap-2"><Layers className="h-3 w-3" /> Sub-Topics</h4>
                    <div className="flex flex-wrap gap-2">
                        {topic.side_topics?.map((s, j) => (
                            <span 
                                key={j} 
                                className="px-3 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-xs text-emerald-400 font-medium"
                                style={{ boxShadow: '0 0 15px rgba(16, 185, 129, 0.1)' }}
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="text-xs font-bold uppercase text-emerald-500 mb-4 tracking-widest flex items-center gap-2"><BookOpen className="h-3 w-3" /> Sample Patterns</h4>
                    <ul className="space-y-2">
                        {topic.question_types?.map((q, j) => (
                            <li key={j} className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed">
                                <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" style={{ filter: 'drop-shadow(0 0 5px rgba(16, 185, 129, 0.6))' }} /> 
                                <span style={{ textShadow: '0 0 8px rgba(16, 185, 129, 0.2)' }}>{q}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    </CardSpotlight>
    );
};
