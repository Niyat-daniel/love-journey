import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import WebApp from "@twa-dev/sdk";

// Subcomponents import
import WelcomeScreen from './components/WelcomeScreen';
import LoveQuestion from './components/LoveQuestion';
import MemoryJourney from './components/MemoryJourney';
import ReasonsWhy from './components/ReasonsWhy';
import LoveLetter from './components/LoveLetter';
import GrandEnding from './components/GrandEnding';
import CursorTrail from './components/CursorTrail';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageReached, setMaxPageReached] = useState(1);

  // 1. Initial Loading Screen Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 300); // Small delay to enjoy 100% loader
          return 100;
        }
        return prev + Math.floor(Math.random() * 15 + 10);
      });
    }, 150);

    return () => clearInterval(timer);
  }, []);

  // Force body to never have dark mode
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
  }, []);
  // Initialize Telegram Mini App
useEffect(() => {
  if (!window.Telegram?.WebApp) return;

  WebApp.ready();
  WebApp.expand();

  console.log("Telegram Mini App initialized");
  console.log(WebApp.platform);
}, []);

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    if (nextPage > maxPageReached) {
      setMaxPageReached(nextPage);
    }
  };

  const handleStartJourney = () => {
    handleNextPage();
  };

  const handlePageJump = (pageIndex: number) => {
    if (pageIndex <= maxPageReached) {
      setCurrentPage(pageIndex);
    }
  };

  const handleReset = () => {
    setCurrentPage(1);
    setMaxPageReached(1);
  };

  // Human readable labels for the progress journey indicator
  const pageSteps = [
    { num: 1, name: "Start" },
    { num: 2, name: "Question" },
    { num: 3, name: "Memories" },
    { num: 4, name: "Reasons" },
    { num: 5, name: "Letter" },
    { num: 6, name: "Surprise" }
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-tr from-[#FFF8F0] via-[#FFE4E1] to-[#FFF0F5] px-6 text-center">
        {/* Pulsing Loading Heart wrapper */}
        <motion.div
          animate={{ scale: [1, 1.25, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-pink-500 mb-6 drop-shadow-[0_4px_10px_rgba(255,105,180,0.4)]"
        >
          <Heart fill="currentColor" size={72} />
        </motion.div>

        <h3 className="font-serif text-3xl font-semibold text-pink-600 tracking-wide mb-1.5 animate-pulse">
          Crafting Your Love Journey...
        </h3>
        
        <p className="font-sans text-xs text-pink-700/60 font-light max-w-sm mb-6 uppercase tracking-widest leading-relaxed">
          Please wait while your magical gift is opening 🌸
        </p>

        {/* Loading Progress Bar */}
        <div className="w-48 h-1.5 bg-pink-100 rounded-full border border-pink-200/50 overflow-hidden shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-rose-500 to-amber-400"
            style={{ width: `${Math.min(loadingProgress, 100)}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative font-sans text-slate-800 transition-colors duration-300 bg-[#FFF8F0]">
      
      {/* Floating Heart Cursor Trail (Interactive Asset) */}
      <CursorTrail />

      {/* TOP HEADER STATUS & NAVIGATION BAR */}
      <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-white/40 backdrop-blur-md border-b border-pink-100/60 shadow-sm">
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 select-none hover:opacity-85 text-pink-600 text-left cursor-pointer"
        >
          <Heart fill="currentColor" size={18} className="animate-pulse" />
          <span className="font-serif font-bold text-lg leading-none tracking-wide sm:text-xl">
            Our Love Story
          </span>
        </button>

        {/* Interactive Progress indicator showing journey completion */}
        <nav className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1">
            {pageSteps.map((step) => {
              const isUnlocked = step.num <= maxPageReached;
              const isActive = step.num === currentPage;
              return (
                <div key={step.num} className="flex items-center">
                  <button
                    onClick={() => handlePageJump(step.num)}
                    disabled={!isUnlocked}
                    className={`flex h-7 items-center justify-center rounded-full px-3 text-xs font-sans font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-sm font-semibold scale-105'
                        : isUnlocked
                        ? 'bg-pink-100/80 text-pink-700 hover:bg-pink-200 cursor-pointer'
                        : 'bg-gray-100/50 text-gray-400/80 cursor-not-allowed'
                    }`}
                  >
                    {step.num}. {step.name}
                  </button>
                  {step.num < pageSteps.length && (
                    <span className="h-0.5 w-3 bg-pink-100 mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* Simplified Progress Indicator for Mobile Screens */}
        <span className="md:hidden font-sans text-xs font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100/55">
          Chapter {currentPage} / 6
        </span>
      </header>

      {/* MAIN SCREEN CARDS ROUTER with Page Transitions */}
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, scale: 0.98, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -15 }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
            className="w-full"
          >
            {currentPage === 1 && (
              <WelcomeScreen onStart={handleStartJourney} />
            )}
            
            {currentPage === 2 && (
              <LoveQuestion onAnswerYes={handleNextPage} />
            )}

            {currentPage === 3 && (
              <MemoryJourney onJourneyComplete={handleNextPage} />
            )}

            {currentPage === 4 && (
              <ReasonsWhy onContinue={handleNextPage} />
            )}

            {currentPage === 5 && (
              <LoveLetter onComplete={handleNextPage} />
            )}

            {currentPage === 6 && (
              <GrandEnding onRestart={handleReset} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
