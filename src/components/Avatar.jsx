import React, { useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import profileImg from '../assets/mee.jpg';

export default function Avatar() {
  const [isEntranceDone, setIsEntranceDone] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 1. Scroll Parallax setup using Framer Motion useScroll
  const { scrollY } = useScroll();
  
  // Maps page scroll to the requested transformations:
  // translateY: 0 -> -40px
  // rotateX: 0 -> -8deg
  // scale: 1 -> 1.05
  const scrollYTrans = useTransform(scrollY, [0, 1000], [0, -40]);
  const scrollRotateXTrans = useTransform(scrollY, [0, 1000], [0, -8]);
  const scrollScaleTrans = useTransform(scrollY, [0, 1000], [1, 1.05]);

  // Spring values for fluid and responsive scroll parallax
  const yParallax = useSpring(scrollYTrans, { stiffness: 90, damping: 25 });
  const rotateXParallax = useSpring(scrollRotateXTrans, { stiffness: 90, damping: 25 });
  const scaleParallax = useSpring(scrollScaleTrans, { stiffness: 90, damping: 25 });

  // Glow scale maps from 1 -> 1.1 on scroll
  const glowScaleRaw = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const glowScale = useSpring(glowScaleRaw, { stiffness: 90, damping: 25 });

  const handleMouseEnter = () => {
    if (isEntranceDone) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div 
      initial={{ y: 80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex items-center justify-center"
      style={{ 
        perspective: '1800px', 
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Refined Red Ambient Glow behind the image - scales on scroll */}
      <motion.div
        className="absolute -inset-20 -z-20 rounded-full opacity-0 blur-[100px]"
        animate={isEntranceDone ? { opacity: [0.9, 1.05, 0.9] } : { opacity: 1 }}
        transition={isEntranceDone ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 3.0 }}
        style={{
          background: 'radial-gradient(circle, rgba(255, 40, 40, 0.18) 0%, rgba(255, 40, 40, 0.08) 35%, transparent 70%)',
          pointerEvents: 'none',
          width: '140%',
          height: '140%',
          left: '-20%',
          top: '-20%',
          scale: glowScale,
        }}
      />

      {/* Layer 1: Parallax Scroll Wrapper */}
      <motion.div
        style={{ 
          y: yParallax, 
          rotateX: rotateXParallax,
          scale: scaleParallax,
          transformStyle: 'preserve-3d' 
        }}
        className="relative"
      >
        {/* Layer 2: 3D Entrance Animation Layer */}
        <motion.div
          initial={{ rotateX: 75, rotateY: -25, rotateZ: 8, scale: 0.75, opacity: 0 }}
          animate={{ rotateX: 0, rotateY: 0, rotateZ: 0, scale: 1, opacity: 1 }}
          transition={{
            duration: 3.0,
            ease: [0.22, 1, 0.36, 1], // exact ease curve
          }}
          onAnimationComplete={() => setIsEntranceDone(true)}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Drop Shadow underneath the image (behind portrait, fades slightly as image lifts on hover) */}
          <motion.div 
            className="absolute bottom-[-20px] left-[10%] w-[80%] h-4 bg-black rounded-full blur-[18px] pointer-events-none -z-10"
            style={{
              transform: 'translateZ(-30px)',
            }}
            animate={{ opacity: isHovered ? 0.45 : 0.7, scale: isHovered ? 0.95 : 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Layer 3: Subtle Hover Elevation Layer (No continuous infinite float) */}
          <motion.div
            animate={{ y: isHovered ? -8 : 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Layer 4: Interactive 3D Cursor Tilt & Borderless Portrait Frame */}
            <motion.div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{
                transformStyle: 'preserve-3d',
                // Webkit reflection underneath the portrait
                WebkitBoxReflect: 'below 16px linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.15) 100%)',
              }}
              animate={{
                rotateX: isHovered ? -2 : 0,
                rotateY: isHovered ? 3 : 0,
                scale: isHovered ? 1.03 : 1, // premium hover scale
              }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="w-[180px] h-[250px] md:w-[240px] md:h-[330px] lg:w-[280px] lg:h-[390px] rounded-[32px] overflow-hidden cursor-pointer shadow-[0_30px_70px_rgba(0,0,0,0.92)] relative"
            >
              {/* Profile Image with subtle vignette and edge softening */}
              <div 
                className="relative w-full h-full rounded-[32px] overflow-hidden"
                style={{ 
                  transform: 'translateZ(20px)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <motion.img
                  src={profileImg}
                  alt="Profile portrait"
                  className="w-full h-full object-cover object-center block will-change-transform rounded-[32px]"
                  style={{
                    filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)',
                    transition: 'filter 700ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  initial={{ scale: 1.15, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.98 }}
                />

                {/* Sliding Reveal Mask Layer with red sweep edge */}
                <motion.div
                  className="absolute inset-0 z-20 pointer-events-none rounded-[32px] overflow-hidden"
                  initial={{ x: '0%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 2.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255, 40, 40, 0.5) 8%, #101010 18%, #101010 100%)',
                    width: '120%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />

                {/* Periodic Subtle Light Sweep Overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-10"
                  animate={{
                    x: ['-130%', '130%'],
                  }}
                  transition={{
                    duration: 3.0,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    repeat: Infinity,
                    repeatDelay: 5.0, // sweeps every ~8 seconds
                  }}
                  style={{
                    background: 'linear-gradient(110deg, transparent 35%, rgba(255, 255, 255, 0.0) 42%, rgba(255, 255, 255, 0.18) 50%, rgba(255, 255, 255, 0.0) 58%, transparent 65%)',
                    width: '200%',
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
                
                {/* Subtle vignette layout */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-35 pointer-events-none rounded-[32px]" />
                
                {/* Inner shadow to soften edges */}
                <div className="absolute inset-0 border border-black border-opacity-35 rounded-[32px] pointer-events-none shadow-[inset_0_0_15px_rgba(0,0,0,0.7)]" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
