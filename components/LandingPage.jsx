import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Footer from './Footer';
import { AnimeNavBar } from './ui/anime-navbar';
import { Home, Layers, Zap, Crosshair, Loader2 } from 'lucide-react';
import { InfiniteScrollBanner } from './ui/infinite-scroll-banner';

// Lazy load heavy components for faster initial paint
const HowItWorks = lazy(() => import('./HowItWorks'));
const Features = lazy(() => import('./Features'));
const DiagnosticTest = lazy(() => import('./DiagnosticTest'));

const SectionLoader = () => (
    <div className="h-64 w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
    </div>
);

const LandingPage = () => {
  const [activeSection, setActiveSection] = useState("Home");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem('token');
    if (token) {
        navigate('/dashboard');
    } else {
        navigate('/auth');
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const sections = [
      { id: 'hero', name: 'Home' },
      { id: 'how-it-works', name: 'How it Works' },
      { id: 'features', name: 'Features' },
      { id: 'practice-test', name: 'Practice Test' }
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = sections.find(s => s.id === entry.target.id);
            if (section) setActiveSection(section.name);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const navItems = [
    { name: "Home", action: () => scrollToSection('hero'), icon: Home },
    { name: "How it Works", action: () => scrollToSection('how-it-works'), icon: Layers },
    { name: "Features", action: () => scrollToSection('features'), icon: Zap },
    { name: "Practice Test", action: () => scrollToSection('practice-test'), icon: Crosshair },
  ];

  return (
    <>
      <AnimeNavBar 
          items={navItems} 
          defaultActive="Home" 
          activeTab={activeSection}
      />
      
      <div id="hero" className="mb-20 md:mb-32">
        <Hero onGetStarted={handleGetStarted} />
      </div>
      
      <InfiniteScrollBanner />
      
      <Suspense fallback={<SectionLoader />}>
        <div className="space-y-32">
          <HowItWorks />
          <InfiniteScrollBanner />
          <Features />
          <DiagnosticTest id="practice-test" />
        </div>
      </Suspense>
      
      <Footer />
    </>
  );
};

export default LandingPage;
