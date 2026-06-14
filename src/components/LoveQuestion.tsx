import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Laugh } from 'lucide-react';
import confetti from 'canvas-confetti';
import { NO_RESPONSES } from '../data';

interface LoveQuestionProps {
  onAnswerYes: () => void;
}

const SURE_NO_RESPONSES = [
  "Are you absolutely, 100% positive? 😳",
  "No is still not an option! 😜",
  "Think of our sweet memories! 🌸",
  "But I'm 1000% sure about you! 🥺",
  "Please click YES! 💕",
  "Still trying to click No? How cute! 😂",
  "Okay, now you're just teasing me! 😘",
  "My heart is melting, don't say no! 🩹"
];

export default function LoveQuestion({ onAnswerYes }: LoveQuestionProps) {
  const [stage, setStage] = useState<'love' | 'sure'>('love');
  const [yesScale, setYesScale] = useState(1);
  const [noAttempts, setNoAttempts] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("Wait, don't press that! 🧐");
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [isAgreed, setIsAgreed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerSmallHearts = () => {
    // Shoot some cute pink confetti shapes
    confetti({
      particleCount: 15,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: ['#FFB6C1', '#FF69B4', '#FFF8F0']
    });
    confetti({
      particleCount: 15,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: ['#FFB6C1', '#FF69B4', '#FFF8F0']
    });
  };

  const handleNoInteraction = () => {
    // Increment attempts
    const newAttemptsCount = noAttempts + 1;
    setNoAttempts(newAttemptsCount);

    // Pick speech bubble response based on current stage
    if (stage === 'love') {
      const msgIndex = (newAttemptsCount - 1) % NO_RESPONSES.length;
      setCurrentMessage(NO_RESPONSES[msgIndex]);
    } else {
      const msgIndex = (newAttemptsCount - 1) % SURE_NO_RESPONSES.length;
      setCurrentMessage(SURE_NO_RESPONSES[msgIndex]);
    }

    // Grow the YES button scale
    setYesScale((prev) => Math.min(prev + 0.35, 4.0)); // Caps at 4x original size

    // Playfully move the NO button to random coordinates inside our container
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 60;
      // Calculate random translation bounds
      const maxX = (rect.width / 2) - padding;
      const maxY = (rect.height / 2) - padding;

      const randomX = (Math.random() * 2 - 1) * maxX;
      const randomY = (Math.random() * 2 - 1) * maxY;

      setNoPosition({ x: randomX, y: randomY });
    }

    triggerSmallHearts();
  };

  const handleYes = () => {
    if (stage === 'love') {
      triggerSmallHearts();
      setStage('sure');
      setYesScale(1);
      setNoAttempts(0);
      setNoPosition({ x: 0, y: 0 });
      setCurrentMessage("Are you absolutely, completely sure? 🥺");
      return;
    }

    setIsAgreed(true);

    // Magical grand fireworks explosion
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = window.setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti shoots from left, right, and top
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    // Short delay to let user celebrate, then proceed
    setTimeout(() => {
      onAnswerYes();
    }, 2800);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-[#FFF0F5] via-[#FFE4E1] to-[#FFF8F0] dark:from-[#180A18] dark:via-[#25102A] dark:to-[#120512]">
      
      {/* Decorative Hearts floating subtle in background */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-10 left-10 text-pink-300 animate-pulse"><Heart fill="currentColor" size={24} /></div>
        <div className="absolute bottom-20 right-10 text-rose-300 animate-pulse"><Heart fill="currentColor" size={32} /></div>
        <div className="absolute top-1/3 right-1/4 text-purple-300 animate-pulse"><Heart fill="currentColor" size={16} /></div>
      </div>

      <AnimatePresence mode="wait">
        {!isAgreed ? (
          <motion.div
            key="question-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="relative w-full max-w-lg rounded-3xl border border-pink-200 bg-white/70 p-8 shadow-2xl backdrop-blur-md text-center dark:border-pink-900/40 dark:bg-[#1E0E22]/90"
            ref={containerRef}
          >
            {/* Crown Header layout */}
            <div className="mx-auto -mt-16 mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-pink-400 to-rose-500 text-white shadow-lg shadow-pink-500/20">
              <Heart fill="currentColor" className="h-10 w-10 animate-bounce" />
            </div>

            <h2 className="mb-2 font-serif text-4xl font-bold text-pink-600 dark:text-pink-400">
              {stage === 'love' ? 'Do you love me? ❤️' : 'Are you sure? 🥺'}
            </h2>

            {/* Teasing message bubble display */}
            <div className="min-h-[50px] mb-8 flex items-center justify-center">
              <motion.div
                key={currentMessage}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-sans font-medium shadow-sm dark:bg-pink-950/40 dark:text-pink-300 border border-pink-200/50"
              >
                {currentMessage}
              </motion.div>
            </div>

            {/* Both Choice Button Holders */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[180px] w-full">
              
              {/* YES BUTTON (Can scale massive!) */}
              <motion.button
                id="answer-yes-btn"
                onClick={handleYes}
                style={{ scale: yesScale }}
                className="z-20 cursor-pointer rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-400 px-8 py-3.5 font-sans text-base font-semibold tracking-wide text-white shadow-lg hover:shadow-xl hover:from-pink-600 transition-colors"
                layout
              >
                YES 💖
              </motion.button>

              {/* NO BUTTON (Teleports around playfully on hover or click) */}
              <motion.button
                id="answer-no-btn"
                onMouseEnter={handleNoInteraction}
                onClick={handleNoInteraction}
                animate={{ x: noPosition.x, y: noPosition.y }}
                transition={{ type: 'spring', damping: 15, stiffness: 120 }}
                className="z-10 cursor-pointer rounded-full bg-gray-200/80 px-6 py-2.5 font-sans text-sm font-medium text-gray-700 shadow border border-gray-300/50 hover:bg-gray-300 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-800/40"
              >
                NO 🙈
              </motion.button>
            </div>
            
            <p className="mt-6 text-xs text-pink-500/60 dark:text-pink-400/50 font-sans tracking-wide">
              {noAttempts > 0 ? `Rejected ${noAttempts} time${noAttempts > 1 ? 's' : ''}! Come on...` : "Select an option honestly 😘"}
            </p>
          </motion.div>
        ) : (
          /* Agreement Celebration Layout */
          <motion.div
            key="yes-congrats"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center p-8 z-10"
          >
            <motion.div
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 10, -10, 0]
              }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-8xl mb-6 text-pink-500 select-none filter drop-shadow-[0_10px_20px_rgba(255,105,180,0.5)]"
            >
              ❤️
            </motion.div>
            
            <h2 className="font-serif text-5xl font-bold bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 bg-clip-text text-transparent mb-4">
              I knew it ❤️
            </h2>
            
            <p className="font-sans text-lg text-pink-700 dark:text-pink-300 font-light">
              You make my heartbeat race. Let's explore our love stories now...
            </p>

            <div className="mt-8 flex items-center gap-1.5 text-pink-400">
              <span className="h-2 w-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-sm font-sans tracking-widest font-mono">LOADING TIMELINE...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
