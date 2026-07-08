import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  // Array of numbers to generate decorative floating hearts
  const floatingHeartsCount = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-tr from-[#FFF8F0] via-[#FFE4E1] to-[#FFF0F5] px-6 text-center dark:from-[#1A1020] dark:via-[#2D1630] dark:to-[#120B18]">
      
      {/* Slow-glowing background ambient light */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-pink-300/20 blur-[10 \n0px] dark:bg-pink-900/10" />
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-300/20 blur-[100px] dark:bg-purple-900/10" />

      {/* Floating hearts container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {floatingHeartsCount.map((index) => {
          const delay = index * 1.5;
          const leftPosition = `${(index * 7) % 95 + 2}%`;
          const duration = Math.random() * 8 + 8;
          const scale = Math.random() * 0.6 + 0.4;
          return (
            <motion.div
              key={index}
              initial={{ y: '110vh', x: 0, opacity: 0, scale }}
              animate={{
                y: '-10vh',
                x: [0, (index % 2 === 0 ? 30 : -30), 0],
                opacity: [0, 0.7, 0.7, 0],
              }}
              transition={{
                duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut',
              }}
              className="absolute text-pink-400/30 dark:text-pink-600/20"
              style={{ left: leftPosition }}
            >
              <Heart fill="currentColor" className="h-6 w-6" />
            </motion.div>
          );
        })}
      </div>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="z-10 max-w-xl rounded-3xl border border-white/60 bg-white/20 p-8 shadow-2xl backdrop-blur-md dark:border-purple-950/40 dark:bg-purple-950/20"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-pink-100 text-pink-500 shadow-md dark:bg-pink-950/50 dark:text-pink-400"
        >
          <Heart fill="currentColor" className="h-8 w-8" />
        </motion.div>

        {/* Elegant Headline (Great Vibes) */}
        <h1 className="mb-4 font-serif text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 sm:text-6xl dark:from-pink-400 dark:via-rose-400 dark:to-amber-400">
          Welcome የአብስራ ❤️
        </h1>

        {/* Subtitle (Poppins) */}
        <p className="mb-8 font-sans text-lg font-light tracking-wide text-gray-700 dark:text-gray-300">
          I prepared a little journey just for you...
        </p>

        {/* Start Game Button with Hover and pulse accents */}
        <motion.button
          id="start-button"
          whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,105,180,0.6)' }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              '0 0 10px rgba(255,105,180,0.2)',
              '0 0 20px rgba(255,105,180,0.4)',
              '0 0 10px rgba(255,105,180,0.2)'
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={() => {
            // Trigger music start if possible, and trigger the state progress
            onStart();
          }}
          className="relative group overflow-hidden rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 px-8 py-3.5 font-sans text-base font-medium tracking-wider text-white shadow-lg shadow-pink-500/20 hover:from-pink-600 hover:to-rose-600 transition-colors cursor-pointer"
        >
          {/* Heart sparkle background effect */}
          <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:animate-shine" />
          
          <span className="flex items-center justify-center gap-2">
            Start The Journey yabu
            <Heart className="h-4 w-4 fill-white animate-pulse" />
          </span>
        </motion.button>
      </motion.div>

      {/* Shine animation utility for button */}
      <style>{`
        @keyframes shine {
          100% {
            transform: skewX(-12deg) translate(100%);
          }
        }
        .group-hover\\:animate-shine:hover {
          animation: shine 0.75s ease-in-out;
        }
      `}</style>
    </div>
  );
}
