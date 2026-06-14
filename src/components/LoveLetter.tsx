import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, FastForward, Check } from 'lucide-react';

interface LoveLetterProps {
  onComplete: () => void;
}

const FULL_LETTER_CONTENT = `My Dearest,

From the very first moment we laughed together, there was a quiet magic in the air. I had no idea that a simple conversation would completely rewrite my world, turning everyday life into a beautiful, romantic dream.

I love you for the warmth of your smile, the depth of your kindness, and the gentle way you support me. You are my peaceful harbor, my daily anchor, and my greatest dream come true. Thank you for choosing to walk with me and love me so completely.

With you, every single second is an eternal treasure. I am so excited for all the chapters we have yet to write hand-in-hand.

Forever and Always ❤️`;

export default function LoveLetter({ onComplete }: LoveLetterProps) {
  const [typedText, setTypedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const letterEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let index = 0;
    const intervalpeed = 35; // speed in milliseconds per letter

    const timer = setInterval(() => {
      if (index < FULL_LETTER_CONTENT.length) {
        setTypedText(FULL_LETTER_CONTENT.slice(0, index + 1));
        index++;

        // Auto Scroll to bottom of letter box during typing
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      } else {
        setIsFinished(true);
        clearInterval(timer);
      }
    }, intervalpeed);

    return () => clearInterval(timer);
  }, []);

  const handleSkipTyping = () => {
    setTypedText(FULL_LETTER_CONTENT);
    setIsFinished(true);
    // instant scroll to bottom
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, 50);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-16 px-4 bg-gradient-to-tr from-[#FFF8F0] via-[#FFEBEF] to-[#FFF0F5] dark:from-[#110515] dark:via-[#1B0A1F] dark:to-[#130718]">
      
      {/* Rose Petals floating in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -50, x: Math.random() * 300, rotate: 0, opacity: 0 }}
            animate={{
              y: '110vh',
              x: `calc(${Math.random() * 80}vw)`,
              rotate: 360,
              opacity: [0, 0.8, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: i * 2,
              ease: 'linear',
            }}
            className="absolute text-rose-400/40 text-xl"
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="w-full max-w-2xl z-10 flex flex-col items-center">
        
        {/* Lined Envelope Paper Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-2xl border border-[#F5E6D3] bg-[#FCF8F2] p-6 sm:p-10 shadow-2xl dark:border-purple-950/60 dark:bg-purple-950/40 backdrop-blur-md"
        >
          {/* Lined notebook paper styling effect absolute helpers */}
          <div className="absolute top-0 bottom-0 left-8 w-px bg-rose-200/50 dark:bg-purple-900/40" />
          
          <div className="border border-[#F0E0D0] bg-[#FFFBF7] p-6 sm:p-8 rounded-xl min-h-[400px] flex flex-col justify-between shadow-inner dark:border-purple-900/40 dark:bg-[#1C0E24]/60">
            
            {/* Header Ribbon flourish */}
            <div className="flex justify-between items-center border-b border-rose-100 pb-3 mb-4 dark:border-purple-900/40">
              <span className="font-serif text-rose-600 dark:text-pink-400 font-bold tracking-widest text-xs uppercase">
                A Letter For You 💌
              </span>
              <Heart fill="currentColor" className="h-4.5 w-4.5 text-rose-400 animate-pulse" />
            </div>

            {/* Scrolling letter body */}
            <div
              ref={scrollRef}
              className="flex-grow overflow-y-auto max-h-[320px] pr-2 scrollbar-thin scrollbar-thumb-pink-200/50"
            >
              <p className="font-sans text-base leading-relaxed tracking-wide text-slate-800 dark:text-pink-100 font-light whitespace-pre-line select-text">
                {typedText}
                
                {/* Blinking typing typewriter line cursor */}
                {!isFinished && (
                  <span className="inline-block h-4.5 w-1.5 ml-1 bg-rose-500 animate-blink" />
                )}
              </p>
              <div ref={letterEndRef} />
            </div>

            {/* Letter footer seal */}
            <AnimatePresence>
              {isFinished && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center mt-6 pt-4 border-t border-rose-100/60 dark:border-purple-900/40"
                >
                  {/* Wax Seal representation button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onComplete}
                    className="h-14 w-14 rounded-full bg-gradient-to-tr from-red-600 to-rose-700 shadow-lg flex items-center justify-center relative cursor-pointer border-2 border-amber-300/40"
                    title="Tap to break the seal and discover the final surprise"
                  >
                    <span className="absolute text-yellow-300 font-serif text-lg font-bold select-none">
                      Love
                    </span>
                    <span className="absolute inset-0 rounded-full border-2 border-red-500 animate-ping opacity-35" />
                  </motion.button>
                  <span className="text-xs text-rose-600 dark:text-pink-400 font-sans tracking-widest font-semibold mt-2.5">
                    TAP SEAL TO BREAK
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </motion.div>

        {/* Floating controls */}
        {!isFinished && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkipTyping}
            className="cursor-pointer mt-6 flex items-center gap-1.5 rounded-full bg-white/70 px-4 py-2 border border-pink-100 text-xs text-pink-600 font-sans font-medium dark:bg-purple-950/45 dark:border-purple-900/35 dark:text-pink-300 hover:bg-white/95 transition-all"
          >
            <FastForward size={14} /> Skip typing ⏩
          </motion.button>
        )}
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s step-end infinite;
        }
      `}</style>
    </div>
  );
}
