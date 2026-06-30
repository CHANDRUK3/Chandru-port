import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import profileImg from '../assets/iam.jpeg';

/**
 * ProfileReveal
 * Premium cinematic triangular shards reveal for profile image
 * - Runs once per session (localStorage) by default
 * - Uses SVG + div shards + framer-motion for smooth, optimized animation
 * - Responsive, circular frame, parallax on mouse, subtle floating motion after reveal
 */
const SHARD_COUNT = 7; // number of triangular shards

const shardVariants = {
  hidden: (i) => ({
    opacity: 1,
    rotate: i % 2 === 0 ? -10 : 8,
    scale: 1.05,
    x: 0,
    y: 0,
  }),
  reveal: (i) => ({
    opacity: 0,
    rotate: i % 2 === 0 ? -40 - i * 6 : 40 + i * 6,
    scale: 0.9 + (i % 2) * 0.05,
    x: (i % 2 === 0 ? -1 : 1) * (100 + i * 30),
    y: -40 - i * 10,
    transition: {
      duration: 1 + i * 0.08,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ProfileReveal({ size = 'lg', oncePerSession = true }) {
  const [revealed, setRevealed] = useState(false);
  const containerRef = useRef(null);
  const revealedKey = 'profile_reveal_done_v1';

  // Parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const tx = useTransform(px, (v) => `${v}px`);
  const ty = useTransform(py, (v) => `${v}px`);

  useEffect(() => {
    if (oncePerSession && typeof window !== 'undefined') {
      const done = window.sessionStorage.getItem(revealedKey);
      if (done) setRevealed(true);
    }
  }, []);

  useEffect(() => {
    if (revealed && oncePerSession && typeof window !== 'undefined') {
      window.sessionStorage.setItem(revealedKey, '1');
    }
  }, [revealed]);

  function handlePointerMove(e) {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width; // -0.5..0.5
    const dy = (e.clientY - cy) / rect.height;
    px.set(dx * 12);
    py.set(dy * 10);
  }

  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  const containerSizes = {
    sm: 'w-36 h-36 md:w-44 md:h-44',
    lg: 'w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80',
  };

  return (
    <div className={`relative ${containerSizes[size === 'sm' ? 'sm' : 'lg']} `}>
      {/* background gradient + subtle particles */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#121212] to-[#1b1b1b]" />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg className="w-full h-full opacity-10" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" aria-hidden>
          <defs>
            <radialGradient id="g" cx="50%" cy="30%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="90" fill="url(#g)" />
        </svg>
      </div>

      {/* Circular frame + image + motion */}
      <motion.div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ x: tx, y: ty }}
        className="relative z-20 mx-auto rounded-full overflow-hidden border border-white border-opacity-10 shadow-lg"
      >
        {/* floating after reveal */}
        <AnimatePresence>
          <motion.div
            className="relative rounded-full overflow-hidden bg-black"
            initial={{ y: 0 }}
            animate={revealed ? { y: [-4, 0, -3, 0], transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' } } : {}}
          >
            {/* profile image */}
            <motion.img
              src={profileImg}
              alt="Profile"
              className="w-full h-full object-cover block"
              initial={{ scale: 1.03, opacity: 0 }}
              animate={revealed ? { scale: 1, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } } : {}}
            />
            {/* soft inner vignette */}
            <div className="absolute inset-0 rounded-full bg-black bg-opacity-20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* shards overlay - visible until reveal */}
        {!revealed && (
          <div className="absolute inset-0 z-30 flex items-center justify-center">
            {/* use several triangular shards */}
            <div className="relative w-full h-full">
              {[...Array(SHARD_COUNT)].map((_, i) => {
                const left = 8 + i * 10;
                const top = 6 + (i % 3) * 8;
                const color = 'rgba(12,12,12,0.95)';
                return (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={shardVariants}
                    initial="hidden"
                    animate={revealed ? 'reveal' : 'hidden'}
                    onAnimationComplete={() => {
                      if (i === SHARD_COUNT - 1) setRevealed(true);
                    }}
                    transition={{ delay: 0.15 * i }}
                    style={{ left: `${left}%`, top: `${top}%` }}
                    className={`absolute w-28 h-28 md:w-32 md:h-32 transform-gpu rounded-sm`}
                  >
                    {/* triangle using clip-path */}
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        background: color,
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        willChange: 'transform, opacity',
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reveal button / fallback to allow re-trigger in dev */}
      </motion.div>

      {/* subtle particles - absolutely positioned tiny dots */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-full h-full relative">
          {[...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.25, 0], y: [-2, -8, -2] }}
              transition={{ delay: 0.2 + i * 0.15, duration: 3, repeat: Infinity }}
              className="absolute bg-white bg-opacity-5 rounded-full"
              style={{ width: 4 + i, height: 4 + i, left: `${10 + i * 10}%`, top: `${20 + (i % 3) * 15}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
