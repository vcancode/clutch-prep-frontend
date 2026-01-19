import React from 'react';
import { Github, Twitter, Linkedin, Youtube, Instagram, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/50 border-t border-zinc-800/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div className="col-span-1 md:col-span-1">
                <div className="flex items-center mb-4">
                    <BookOpen className="h-6 w-6 text-emerald-500" />
                    <span className="ml-2 text-xl font-bold text-white tracking-tight">ClutchPrep</span>
                </div>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                    We help students study smarter, not harder. Using AI to analyze past exams and identify the patterns that matter.
                </p>
                <div className="flex space-x-4">
                    <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors"><Twitter className="h-5 w-5" /></a>
                    <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors"><Github className="h-5 w-5" /></a>
                    <a href="#" className="text-zinc-500 hover:text-emerald-400 transition-colors"><Linkedin className="h-5 w-5" /></a>
                </div>
            </div>
            
            <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-3 text-sm text-zinc-500">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Analysis Engine</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Diagnostic Test</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Study Planner</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Video Curation</a></li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-3 text-sm text-zinc-500">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Exam Tips</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Student Stories</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
                </ul>
            </div>
            
            <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-3 text-sm text-zinc-500">
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
                </ul>
            </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-600 text-sm">
                &copy; 2026 ClutchPrep. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-zinc-600 hover:text-zinc-400 text-sm">Privacy</a>
                <a href="#" className="text-zinc-600 hover:text-zinc-400 text-sm">Terms</a>
                <a href="#" className="text-zinc-600 hover:text-zinc-400 text-sm">Cookies</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;