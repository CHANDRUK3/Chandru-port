import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Avatar from './Avatar'; // Added import

// Magnetic interaction component for action buttons
const Magnetic = ({ children }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 80) {
      const maxMove = 10;
      const ratio = (80 - distance) / 80;
      setPosition({
        x: (distanceX / distance) * maxMove * ratio,
        y: (distanceY / distance) * maxMove * ratio
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      style={{ display: 'inline-block' }}
    >
      {children}
    </motion.div>
  );
};

const DottedText = ({ text }) => {
  const letters = text.split('');

  return (
    <div className="pixelated-text">
      {letters}
    </div>
  );
};

const Hero = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const sections = ['home', 'about', 'projects', 'skills', 'education'];

  const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section id="home" className="min-h-screen h-[120vh] flex items-center relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute left-1/3 top-1/4 w-72 h-72 rounded-full bg-gradient-to-tr from-[#202020] to-transparent opacity-30 blur-xl"
          animate={{
            x: [0, 10, 0],
            y: [0, -10, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/3 w-64 h-64 rounded-full bg-gradient-to-bl from-[#252525] to-transparent opacity-20 blur-xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            scale: [1, 1.03, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Nothing-styled top bar */}
      <div className="absolute top-0 left-0 right-0 bg-primary bg-opacity-50 flex justify-between items-center px-6 py-1 border-b border-muted border-opacity-10">
        <div className="font-mono text-xs text-muted">{formatTime(currentTime)}-{formatDate(currentTime)}</div>
        <div className="font-mono text-xs text-muted">~CHANDRU|PORTFOLIO</div>
      </div>

  <div className="mx-auto max-w-5xl px-0 sm:px-0 lg:px-0"> {/* Main container for hero content - removed horizontal padding to align left */}

        {/* Avatar Element - Added Here */}
  <div className="hidden md:block absolute top-1/2 right-12 lg:right-28 transform -translate-y-1/2 md:-mt-8 lg:-mt-12 z-10">
          <Avatar />
        </div>

        <motion.div
          className="max-w-3xl w-full pr-0 sm:pr-2 md:pr-4 -ml-16 md:-ml-20 lg:-ml-28"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Nothing-inspired headline with dotted/pixel effect */}
          <motion.h1
            variants={childVariants}
            className="text-4xl md:text-6xl font-bold mb-8"
          >
            <div className="mb-2 font-mono text-sm tracking-wider text-muted">HELLO, I'M</div>
            <div className="nothing-headline font-mono tracking-wide">
              <DottedText text="CHANDRU K" />
            </div>
            <div className="mt-3 text-gradient">Aspiring Software Engineer & Full Stack Developer</div>
          </motion.h1>

          <motion.p
            variants={childVariants}
            className="text-muted text-lg md:text-xl mb-10 max-w-xl"
          >
            I build responsive, scalable, and user-friendly applications.
            Currently pursuing Computer Science Engineering at Kongu Engineering College.
          </motion.p>

          {/* Social media and resume section */}
          <motion.div
            variants={childVariants}
            className="flex flex-wrap gap-6 mb-12"
          >
            <a href="https://github.com/CHANDRUK3" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted hover:text-light transition-colors">
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.49C9.34 21.581 9.522 21.276 9.522 21.008C9.522 20.766 9.513 20.011 9.508 19.172C6.726 19.791 6.143 17.898 6.143 17.898C5.699 16.754 5.064 16.451 5.064 16.451C4.187 15.818 5.131 15.829 5.131 15.829C6.104 15.898 6.626 16.868 6.626 16.868C7.498 18.412 8.974 17.945 9.541 17.687C9.63 17.058 9.888 16.592 10.175 16.32C7.956 16.046 5.62 15.233 5.62 11.477C5.62 10.386 6.01 9.491 6.646 8.787C6.546 8.531 6.202 7.57 6.747 6.181C6.747 6.181 7.563 5.908 9.497 7.211C10.29 7.002 11.151 6.898 12.001 6.894C12.849 6.899 13.71 7.002 14.505 7.211C16.437 5.908 17.252 6.181 17.252 6.181C17.798 7.57 17.454 8.531 17.354 8.787C17.991 9.491 18.379 10.386 18.379 11.477C18.379 15.246 16.038 16.044 13.813 16.313C14.172 16.647 14.492 17.308 14.492 18.313C14.492 19.754 14.479 20.674 14.479 21.007C14.479 21.278 14.659 21.586 15.167 21.49C19.137 20.162 22 16.418 22 12C22 6.477 17.523 2 12 2Z" />
              </svg>
              GITHUB
            </a>

            <a href="https://linkedin.com/in/chandru-k-67b2a8329/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted hover:text-light transition-colors">
              <svg className="social-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452z" />
              </svg>
              LINKEDIN
            </a>
          </motion.div>

          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 mt-8 justify-start items-start sm:items-center w-full max-w-full overflow-visible"
          >
            <Magnetic>
              <a 
                href="#projects" 
                className="nothing-btn group flex-shrink-0"
                style={{
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  padding: '16px 32px',
                  minHeight: '50px',
                  minWidth: '160px',
                  maxWidth: '200px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  border: '2px solid rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <span style={{ color: '#ffffff' }}>VIEW MY WORK</span>
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </Magnetic>

            <Magnetic>
              <a 
                href="/Resume1.pdf" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="nothing-btn flex-shrink-0"
                style={{
                  color: '#ffffff',
                  borderColor: 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  padding: '16px 32px',
                  minHeight: '50px',
                  minWidth: '160px',
                  maxWidth: '200px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.05em',
                  border: '2px solid rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <span style={{ color: '#ffffff' }}>RESUME</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>


    </section>
  );
};

export default Hero;