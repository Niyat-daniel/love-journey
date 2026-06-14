import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrandEndingProps {
  onRestart: () => void;
}

export default function GrandEnding({ onRestart }: GrandEndingProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullyComplete, setIsFullyComplete] = useState(false);

  const startGrandCelebration = () => {
    setIsModalOpen(false);
    setIsFullyComplete(true);

    // Continuous rich fireworks celebration for 6 seconds
    const duration = 6 * 1000;
    const end = Date.now() + duration;

    // First, shoot a quick massive blast
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFB6C1', '#FF69B4', '#FFD700', '#E6E6FA', '#FFF']
    });

    // Firework continuous sequence ticker
    const frame = () => {
      // Launch left and right confetti
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF69B4', '#FFD700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF69B4', '#FFD700']
      });

      // Launch random star cluster from bottom
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    // Launch sequence
    setTimeout(frame, 300);

    // Also trigger heart rain interval
    let heartTimer = setInterval(() => {
      confetti({
        particleCount: 10,
        angle: 270,
        spread: 360,
        startVelocity: 15,
        origin: { x: Math.random(), y: 0 },
        colors: ['#FFB6C1', '#FF69B4', '#E6E6FA']
      });
    }, 400);

    // Stop heart rain after 6 seconds
    setTimeout(() => {
      clearInterval(heartTimer);
    }, duration);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-tr from-[#FFB6C1]/20 via-[#FFF8F0] to-[#E6E6FA]/40 dark:from-[#21092F] dark:via-[#130718] dark:to-[#190F2C]">
      
      {/* Heavy beautiful particle background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 25 }).map((_, i) => {
          const delay = i * 0.4;
          const size = Math.random() * 16 + 8;
          return (
            <motion.div
              key={i}
              initial={{ y: '110vh', x: `${Math.random() * 100}vw`, opacity: 0 }}
              animate={{
                y: '-20vh',
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration: Math.random() * 6 + 6,
                repeat: Infinity,
                delay,
                ease: 'easeInOut'
              }}
              style={{ width: size, height: size }}
              className="absolute text-pink-400/35 dark:text-pink-600/20"
            >
              <Heart fill="currentColor" className="w-full h-full" />
            </motion.div>
          );
        })}
      </div>

      <div className="z-10 w-full max-w-xl rounded-3xl border border-white bg-white/45 p-8 shadow-2xl backdrop-blur-md dark:border-purple-950/40 dark:bg-purple-950/35 flex flex-col items-center">
        
        {/* Pulsing Core Grand Logo */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 4, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 via-rose-500 to-amber-500 text-white shadow-xl shadow-pink-500/30"
        >
          <Heart fill="currentColor" className="h-12 w-12 filter drop-shadow animate-ping" style={{ animationDuration: '2s' }} />
        </motion.div>

        {!isFullyComplete ? (
          <AnimatePresence mode="wait">
            <motion.div
              key="main-ending"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-pink-600 dark:text-pink-400 mb-4 leading-tight">
                You Are The Best Thing That Ever Happened To Me ❤️
              </h1>

              <p className="font-sans text-lg text-slate-700 dark:text-pink-200/95 font-light tracking-wide mb-8">
                I Love You More Every Day
              </p>

              {/* One More Surprise button */}
              <motion.button
                id="one-more-surprise-btn"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,105,180,0.6)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="cursor-pointer rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 px-8 py-4 font-sans text-base font-semibold tracking-wide text-white shadow-lg shadow-pink-500/20 hover:from-pink-600"
              >
                One More Surprise ✨
              </motion.button>
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Celebratory screen layout */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center"
          >
            {/* Crown Ribbon indicator */}
            <div className="flex items-center gap-1 text-xs text-amber-500 font-sans tracking-widest font-bold uppercase mb-2">
              <Sparkles className="h-4 w-4 animate-spin" style={{ animationDuration: '4s' }} />
              <span>FOREVER LOCK ACQUIRED</span>
            </div>

            <h1 className="font-serif text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 bg-clip-text text-transparent mb-6 filter drop-shadow">
              Thank You For Being My Favorite Person ❤️
            </h1>

            <p className="font-sans text-sm text-slate-600 dark:text-gray-300 leading-relaxed font-light mb-8 max-w-sm">
              My heart is completely safe and happy in yours. This digital gift was made with complete love, to remind you everyday how perfect you are to me. 💍
            </p>

            <div className="flex flex-col gap-3 w-full sm:w-auto">
              {/* Trigger firework retry */}
              <button
                onClick={startGrandCelebration}
                className="cursor-pointer rounded-full bg-pink-100 text-pink-600 border border-pink-200 px-6 py-2.5 font-sans text-xs font-semibold hover:bg-pink-200/60 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-900 transition-colors"
              >
                Shoot Fireworks Again 🎆
              </button>

              <button
                onClick={onRestart}
                className="cursor-pointer font-sans text-[11px] text-slate-600 hover:text-slate-900 uppercase tracking-widest dark:text-pink-300/60 dark:hover:text-pink-300 mt-2"
              >
                ← REPLAY ENTIRE JOURNEY
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* GRAND PROPOSAL MODAL COMPONENT */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-sm rounded-3xl border border-pink-200 bg-white p-8 shadow-2xl dark:border-pink-950/50 dark:bg-[#1C0E24]"
            >
              <div className="absolute top-4 right-4 text-pink-200">
                <Heart fill="currentColor" size={24} />
              </div>

              <div className="text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-pink-500 dark:bg-pink-950/50">
                  <Heart className="h-6 w-6 animate-pulse" />
                </div>

                <h3 className="font-serif text-2xl font-bold text-pink-600 dark:text-pink-400 mb-3 leading-snug">
                  Will You Keep Loving Me Forever? ❤️
                </h3>

                <p className="font-sans text-xs text-slate-500 dark:text-gray-400/80 mb-6">
                  There are zero expiration dates, and infinite moments waiting.
                </p>

                {/* Yes Forever Button */}
                <motion.button
                  id="yes-forever-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGrandCelebration}
                  className="cursor-pointer w-full rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 py-3 font-sans text-sm font-semibold tracking-wide text-white shadow-md shadow-pink-500/20 hover:from-pink-600"
                >
                  Yes, Forever 💍
                </motion.button>
                
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-3 font-sans text-[11px] font-semibold text-slate-400 hover:text-slate-600 relative uppercase tracking-wider dark:text-gray-500 dark:hover:text-gray-400"
                >
                  Let me think about it... (Tapping this is a trap! 😉)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
