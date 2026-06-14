import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, Lock, BookOpen, Calendar } from 'lucide-react';
import { MEMORIES } from '../data';

interface MemoryJourneyProps {
  onJourneyComplete: () => void;
}

export default function MemoryJourney({ onJourneyComplete }: MemoryJourneyProps) {
  // Discover progress tracking
  const [unlockedCount, setUnlockedCount] = useState<number>(1);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleNext = () => {
    if (activeIndex < unlockedCount - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const handleUnfoldNext = () => {
    if (unlockedCount < MEMORIES.length) {
      const nextIdx = unlockedCount;
      setUnlockedCount(nextIdx + 1);
      setActiveIndex(nextIdx);
    }
  };

  const handleProceed = () => {
    onJourneyComplete();
  };

  const activeMemory = MEMORIES[activeIndex];
  const isLastFullyDiscovered = unlockedCount === MEMORIES.length;
  const isViewingLastDiscovered = activeIndex === unlockedCount - 1;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-tr from-[#FFF8F0] via-[#FFEAEF] to-[#E6E6FA] dark:from-[#150A20] dark:via-[#1D0C1D] dark:to-[#120B18]">
      
      {/* Dynamic Progress indicator */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center w-full max-w-xs px-4">
        <div className="flex justify-between w-full text-xs font-semibold text-pink-600/80 dark:text-pink-400 font-sans tracking-widest mb-1.5">
          <span>OUR LOVE CHAPTERS</span>
          <span>{unlockedCount} / {MEMORIES.length}</span>
        </div>
        <div className="h-1.5 w-full bg-pink-100 rounded-full overflow-hidden dark:bg-purple-950/50">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-rose-500"
            initial={{ width: '25%' }}
            animate={{ width: `${(unlockedCount / MEMORIES.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="w-full max-w-2xl mt-14 mb-6 z-10 flex flex-col items-center">
        
        {/* Title layout */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-5"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-950/50 text-pink-700 dark:text-pink-300 text-xs font-semibold uppercase tracking-wider mb-2">
            Timeline of us ❤️
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-pink-600 to-indigo-600 bg-clip-text text-transparent dark:from-pink-400 dark:to-indigo-400">
            Our Interactive Memory Book
          </h2>
          <p className="font-sans text-sm text-gray-600 dark:text-gray-400 mt-1">
            Flip through the golden pages of our joint history...
          </p>
        </motion.div>

        {/* Story Book Outer Frame */}
        <div className="relative w-full md:aspect-[16/11] min-h-[430px] sm:min-h-[400px] md:min-h-[330px] rounded-2xl border border-pink-100/60 bg-white/60 p-4 sm:p-5 shadow-xl backdrop-blur-md dark:border-purple-950/40 dark:bg-[#1E1128]/70 flex flex-col justify-between">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMemory.id}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-full items-center"
            >
              {/* Left Column: Image with glow border */}
              <div className="relative h-40 sm:h-44 md:h-full rounded-2xl overflow-hidden shadow-md group border-2 border-pink-200/40 dark:border-pink-900/30">
                <img
                  src={activeMemory.image}
                  alt={activeMemory.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Float heart accent inside image */}
                <div className="absolute top-3 right-3 bg-white/85 p-1.5 rounded-full text-pink-500 shadow-md backdrop-blur-sm dark:bg-purple-950/80">
                  <Heart fill="currentColor" className="h-4 w-4 animate-pulse" />
                </div>
              </div>

              {/* Right Column: Narrative with custom styling */}
              <div className="flex flex-col justify-center h-full">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-600 dark:text-pink-400 mb-1.5 font-sans">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{activeMemory.date}</span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold text-slate-800 dark:text-pink-100 mb-2 tracking-wide">
                  {activeMemory.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-gray-700 leading-relaxed dark:text-gray-300 font-light max-h-[100px] md:max-h-[160px] overflow-y-auto pr-1">
                  {activeMemory.description}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Book Bottom Controls */}
          <div className="border-t border-pink-100/50 pt-4 mt-4 flex items-center justify-between dark:border-purple-900/30">
            {/* Pager back button */}
            <button
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`rounded-full p-2 border transition-all ${
                activeIndex === 0
                  ? 'border-transparent text-gray-300'
                  : 'border-pink-200 text-pink-600 hover:bg-pink-50 hover:scale-105 dark:border-purple-800 dark:text-pink-400 dark:hover:bg-purple-950/40'
              }`}
              aria-label="Previous Memory"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Quick-dot jumps */}
            <div className="flex gap-2">
              {MEMORIES.map((m, index) => {
                const isUnlocked = index < unlockedCount;
                return (
                  <button
                    key={m.id}
                    onClick={() => isUnlocked && setActiveIndex(index)}
                    disabled={!isUnlocked}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? 'w-6 bg-pink-500 dark:bg-pink-400'
                        : isUnlocked
                        ? 'w-2.5 bg-pink-300 dark:bg-pink-800 hover:bg-pink-400'
                        : 'w-2.5 bg-gray-200 dark:bg-purple-950/80 cursor-not-allowed'
                    }`}
                    aria-label={`Go to memory ${index + 1}`}
                  />
                );
              })}
            </div>

            {/* Pager next button */}
            <button
              onClick={handleNext}
              disabled={activeIndex >= unlockedCount - 1}
              className={`rounded-full p-2 border transition-all ${
                activeIndex >= unlockedCount - 1
                  ? 'border-transparent text-gray-300'
                  : 'border-pink-200 text-pink-600 hover:bg-pink-50 hover:scale-105 dark:border-purple-800 dark:text-pink-400 dark:hover:bg-purple-950/40'
              }`}
              aria-label="Next Memory"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Action Under Card (Unfolding story workflow) */}
        <div className="mt-8 flex flex-col items-center gap-3 w-full">
          {!isLastFullyDiscovered ? (
            isViewingLastDiscovered && (
              <motion.button
                id="unfold-next-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-3 font-sans text-sm font-semibold tracking-wide text-white shadow-lg shadow-pink-500/20 hover:from-pink-600 duration-150 flex items-center gap-2"
                onClick={handleUnfoldNext}
              >
                <BookOpen className="h-4.5 w-4.5 animate-pulse" />
                Unfold Our Next Memory 🌸
              </motion.button>
            )
          ) : (
            isViewingLastDiscovered && (
              <motion.button
                id="journey-continue-btn"
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(236,72,153,0.5)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleProceed}
                className="cursor-pointer rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 px-8 py-3.5 font-sans text-base font-semibold tracking-wide text-white shadow-lg hover:shadow-xl"
              >
                Proceed To Why I Love You 💖
              </motion.button>
            )
          )}

          {/* Locked feedback prompt if they are looking back and haven't fully finished */}
          {!isLastFullyDiscovered && !isViewingLastDiscovered && (
            <span className="text-xs font-sans text-slate-500/80 italic flex items-center gap-1 pointer-events-none">
              <Lock className="h-3 w-3" /> View active card ({unlockedCount}/{MEMORIES.length}) to unfold more!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
