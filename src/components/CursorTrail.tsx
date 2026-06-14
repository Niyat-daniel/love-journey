import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  rotation: number;
  color: string;
}

export default function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    let lastTime = 0;
    const colors = ['#FFB6C1', '#FF69B4', '#E6E6FA', '#FFD700', '#FFA07A'];

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Rate limit spawning for smooth performance
      if (now - lastTime < 60) return;
      lastTime = now;

      const size = Math.random() * 14 + 10;
      const id = `${now}-${Math.random()}`;
      const newParticle: Particle = {
        id,
        x: e.clientX,
        y: e.clientY,
        size,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setParticles((prev) => [...prev.slice(-30), newParticle]); // Cap particles at 30
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const now = Date.now();
      if (now - lastTime < 80) return;
      lastTime = now;

      const size = Math.random() * 12 + 8;
      const id = `${now}-${Math.random()}`;
      const newParticle: Particle = {
        id,
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        size,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setParticles((prev) => [...prev.slice(-20), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  // Clean up particles over time
  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) => prev.slice(1));
    }, 150);
    return () => clearInterval(interval);
  }, [particles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.9, scale: 0.6, x: p.x - p.size / 2, y: p.y - p.size / 2 }}
            animate={{
              opacity: 0,
              scale: 0.2,
              y: p.y - p.size / 2 - 50 - Math.random() * 60,
              x: p.x - p.size / 2 + (Math.random() - 0.5) * 40,
              rotate: p.rotation + 90
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: p.size,
              height: p.size,
              color: p.color
            }}
          >
            {/* SVG Heart */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="drop-shadow-[0_2px_4px_rgba(255,105,180,0.3)]"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
