import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Shield, Music, Sun, Compass, RefreshCw } from 'lucide-react';
import { REASONS } from '../data';

interface ReasonsWhyProps {
  onContinue: () => void;
}

const getIcon = (name: string) => {
  switch (name) {
    case 'Sparkles': return <Sparkles className="h-8 w-8 text-pink-500" />;
    case 'Heart': return <Heart className="h-8 w-8 text-rose-500 fill-rose-200 dark:fill-rose-950" />;
    case 'Shield': return <Shield className="h-8 w-8 text-amber-500" />;
    case 'Music': return <Music className="h-8 w-8 text-purple-500" />;
    case 'Sun': return <Sun className="h-8 w-8 text-amber-400" />;
    case 'Compass': return <Compass className="h-8 w-8 text-indigo-500" />;
    default: return <Heart className="h-8 w-8 text-pink-500" />;
  }
};

export default function ReasonsWhy({ onContinue }: ReasonsWhyProps) {
  // Store set of flipped custom cards for mobile tap behavior
  const [flippedIds, setFlippedIds] = useState<string[]>([]);

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center py-16 px-4 sm:px-6 bg-gradient-to-br from-[#FFF0F5] via-[#FFF8F0] to-[#E6E6FA] dark:from-[#1A1020] dark:via-[#1F0C24] dark:to-[#120512]">
      
      {/* Structural background circles */}
      <div className="absolute top-[10%] left-[-5%] h-80 w-80 rounded-full bg-pink-400/10 blur-[120px]" />
      <div className="absolute bottom-[10%] right-[-5%] h-80 w-80 rounded-full bg-indigo-400/10 blur-[120px]" />

      <div className="w-full max-w-4xl z-10 flex flex-col items-center">
        
        {/* Header content */}
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 text-xs font-semibold uppercase tracking-wider mb-2">
            The Secrets of My Heart 💕
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 bg-clip-text text-transparent dark:from-rose-400 dark:to-amber-400">
            Reasons Why I Love You
          </h2>
          <p className="font-sans text-sm text-gray-600 dark:text-gray-400 mt-1.5 max-w-lg mx-auto">
            These are just a few little pieces of a beautiful mosaic. Double-tap or click a card to flip it and read the reasons.
          </p>
        </motion.div>

        {/* 3D Flipping Grid, sequentially animated */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {REASONS.map((reason) => {
            const isFlipped = flippedIds.includes(reason.id);
            return (
              <motion.div
                key={reason.id}
                variants={itemVariants}
                className="perspective-1000 w-full h-[220px]"
              >
                <div
                  onClick={() => toggleFlip(reason.id)}
                  className={`relative w-full h-full cursor-pointer transition-transform duration-700 transform-style-3d bg-transparent rounded-2xl ${
                    isFlipped ? 'rotate-y-180' : ''
                  } hover:scale-[1.03] duration-150 shadow-lg`}
                >
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 backface-hidden flex flex-col justify-between p-6 rounded-2xl border border-pink-100 bg-white/80 dark:bg-[#1C0E24]/85 dark:border-pink-950/50 backdrop-blur-sm shadow-sm">
                    <div className="flex flex-col items-start gap-4">
                      {/* Icon Container */}
                      <div className="p-3 bg-pink-50 dark:bg-pink-950/40 rounded-2xl shadow-sm">
                        {getIcon(reason.icon)}
                      </div>
                      
                      <h3 className="font-sans text-lg font-semibold text-slate-800 dark:text-pink-100">
                        {reason.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between text-xs text-pink-500 dark:text-pink-400 font-medium font-sans">
                      <span>Click to flip 🌸</span>
                      <RefreshCw size={13} className="animate-spin" style={{ animationDuration: '6s' }} />
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 flex flex-col justify-center items-center text-center p-6 rounded-2xl border border-pink-200/50 bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-500 dark:from-purple-900 dark:to-pink-800 shadow-inner text-white">
                    <div className="absolute top-3 left-3 text-white/30">
                      <Heart size={16} fill="currentColor" />
                    </div>
                    
                    <h4 className="font-sans font-bold text-sm text-yellow-300 uppercase tracking-widest mb-1.5">
                      {reason.title}
                    </h4>
                    
                    <p className="font-sans text-xs leading-relaxed font-light text-pink-50">
                      {reason.description}
                    </p>

                    <div className="absolute bottom-3 text-[10px] uppercase font-sans text-white/50 tracking-widest font-mono">
                      TAP to return
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Action Button to proceed */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12"
        >
          <button
            id="reasons-continue-btn"
            onClick={onContinue}
            className="cursor-pointer rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-indigo-600 px-10 py-3.5 font-sans text-base font-semibold tracking-wider text-white shadow-lg shadow-pink-500/20 hover:from-pink-600 hover:to-rose-600 hover:shadow-xl hover:scale-[1.02] duration-150 transition-all flex items-center gap-2"
          >
            Read My Love Letter 💌
          </button>
        </motion.div>
      </div>

      <style>{`
        /* CSS 3D flip card utilities */
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
