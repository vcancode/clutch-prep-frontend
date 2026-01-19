import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Info } from 'lucide-react';

const GlassToast = ({ toast, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000); // Changed to 2 seconds
        return () => clearTimeout(timer);
    }, [onClose]);

    const icons = {
        success: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
        error: <XCircle className="h-5 w-5 text-red-400" />,
        info: <Info className="h-5 w-5 text-blue-400" />
    };

    const borders = {
        success: "border-emerald-500/30",
        error: "border-red-500/30",
        info: "border-blue-500/30"
    };

    const backgrounds = {
        success: "bg-emerald-950/40",
        error: "bg-red-950/40",
        info: "bg-blue-950/40"
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={`pointer-events-auto w-80 p-4 rounded-xl border backdrop-blur-md shadow-xl flex items-start gap-3 ${borders[toast.type]} ${backgrounds[toast.type]}`}
        >
            <div className="mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1">
                <h4 className="text-sm font-bold text-white leading-none mb-1">{toast.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">{toast.message}</p>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                <XCircle className="h-4 w-4" />
            </button>
        </motion.div>
    );
};

export const GlassToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map((toast) => (
                    <GlassToast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                ))}
            </AnimatePresence>
        </div>
    );
};

// Simple Hook for creating toasts (to be used in parent)
export const useToast = () => {
    const [toasts, setToasts] = useState([]);

    const addToast = (type, title, message) => {
        const id = Math.random().toString(36).substring(7);
        setToasts(prev => [...prev, { id, type, title, message }]);
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    return { toasts, addToast, removeToast };
};
