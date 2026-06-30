import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';

const About = () => {
  const ref = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Motion values for mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Transform values for subtle 3D tilt
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

  const handleMouseMove = (event) => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  const profileCardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 } 
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      rotateX: -15, 
      rotateY: 15,
      z: -100,
      filter: "blur(8px) brightness(0.7)"
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateX: 0,
      rotateY: 0,
      z: 0,
      filter: "blur(0px) brightness(1)",
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4
      } 
    }
  };

  const photoGlowVariants = {
    hidden: { 
      opacity: 0,
      boxShadow: "0 0 0 0 rgba(245, 245, 245, 0)"
    },
    visible: { 
      opacity: 1,
      boxShadow: [
        "0 0 0 0 rgba(245, 245, 245, 0)",
        "0 0 20px 2px rgba(245, 245, 245, 0.1)",
        "0 0 30px 4px rgba(245, 245, 245, 0.05)",
        "0 0 25px 3px rgba(245, 245, 245, 0.08)"
      ],
      transition: { 
        duration: 2,
        ease: "easeOut",
        delay: 1.2,
        boxShadow: {
          times: [0, 0.3, 0.7, 1],
          duration: 2
        }
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section id="about" className="section-padding bg-secondary">
      <div className="container-custom" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-muted mb-2">WHO I AM</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PROFILE CARD */}
          <motion.div
            variants={profileCardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-4"
          >
            <div className="border border-muted border-opacity-30 bg-primary bg-opacity-40 p-6 sticky top-24">
              {/* Profile Photo with 3D Animation */}
              <div 
                className="relative mb-6"
                style={{ perspective: 1000 }}
              >
                <motion.div
                  ref={imageRef}
                  variants={photoGlowVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d"
                  }}
                  className="relative w-32 h-32 mx-auto cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                >
                  <motion.div 
                    className="w-full h-full border border-muted border-opacity-40 overflow-hidden bg-secondary"
                    variants={imageVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    style={{
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden"
                    }}
                    whileHover={{
                      borderColor: "rgba(245, 245, 245, 0.6)",
                      boxShadow: "0 0 25px rgba(245, 245, 245, 0.1)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.img 
                      src="/src/assets/profilee.jpg" 
                      alt="Chandru K Profile" 
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                      style={{ transform: "translateZ(20px)" }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-primary bg-opacity-20 hover:bg-opacity-0 transition-all duration-500"
                      style={{ transform: "translateZ(10px)" }}
                    />
                  </motion.div>
                </motion.div>
              </div>

              {/* Availability Badge */}
              <motion.div 
                variants={itemVariants}
                className="flex items-center justify-center gap-2 mb-4"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-muted">Available for Projects</span>
              </motion.div>

              {/* Short Bio */}
              <motion.div variants={itemVariants} className="text-center mb-6">
                <h3 className="text-lg font-medium mb-2">Chandru K</h3>
                <p className="text-sm text-muted leading-relaxed">
                  Computer Science Engineering student passionate about creating digital solutions that make a difference.
                </p>
              </motion.div>

              {/* Social Icons */}
              <motion.div 
                variants={itemVariants}
                className="flex justify-center gap-4 mb-6"
              >
                {/* GitHub */}
                <a href="https://github.com/CHANDRUK3" target="_blank" rel="noopener noreferrer" 
                   className="p-2 border border-muted border-opacity-30 hover:border-light transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.84 21.49C9.34 21.581 9.522 21.276 9.522 21.008C9.522 20.766 9.513 20.011 9.508 19.172C6.726 19.791 6.143 17.898 6.143 17.898C5.699 16.754 5.064 16.451 5.064 16.451C4.187 15.818 5.131 15.829 5.131 15.829C6.104 15.898 6.626 16.868 6.626 16.868C7.498 18.412 8.974 17.945 9.541 17.687C9.63 17.058 9.888 16.592 10.175 16.32C7.956 16.046 5.62 15.233 5.62 11.477C5.62 10.386 6.01 9.491 6.646 8.787C6.546 8.531 6.202 7.57 6.747 6.181C6.747 6.181 7.563 5.908 9.497 7.211C10.29 7.002 11.151 6.898 12.001 6.894C12.849 6.899 13.71 7.002 14.505 7.211C16.437 5.908 17.252 6.181 17.252 6.181C17.798 7.57 17.454 8.531 17.354 8.787C17.991 9.491 18.379 10.386 18.379 11.477C18.379 15.246 16.038 16.044 13.813 16.313C14.172 16.647 14.492 17.308 14.492 18.313C14.492 19.754 14.479 20.674 14.479 21.007C14.479 21.278 14.659 21.586 15.167 21.49C19.137 20.162 22 16.418 22 12C22 6.477 17.523 2 12 2Z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a href="https://linkedin.com/in/chandru-k-67b2a8329/" target="_blank" rel="noopener noreferrer" 
                   className="p-2 border border-muted border-opacity-30 hover:border-light transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452H16.893V14.883C16.893 13.555 16.866 11.846 15.041 11.846C13.217 11.846 12.934 13.291 12.934 14.785V20.452H9.38V9H12.764V10.561H12.813C13.288 9.661 14.448 8.711 16.181 8.711C19.782 8.711 20.448 11.081 20.448 14.166V20.452H20.447ZM5.339 7.433C4.193 7.433 3.274 6.507 3.274 5.368C3.274 4.23 4.194 3.305 5.339 3.305C6.482 3.305 7.404 4.23 7.404 5.368C7.404 6.507 6.483 7.433 5.339 7.433ZM7.119 20.452H3.555V9H7.119V20.452Z" />
                  </svg>
                </a>

                {/* Email */}
                <a href="mailto:chandruk.23cse@kongu.edu" 
                   className="p-2 border border-muted border-opacity-30 hover:border-light transition-all duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" />
                  </svg>
                </a>
              </motion.div>

              {/* CTA Button */}
              <motion.div variants={itemVariants}>
                <button 
                  onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 px-4 border border-light text-light hover:bg-light hover:text-primary transition-all duration-300 font-mono text-sm"
                >
                  Let's Connect
                </button>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT CONTENT */}
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-8 space-y-8"
          >
            {/* About Description */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-medium mb-4">Computer Science Engineering Student</h3>
              
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  I am a Computer Science and Engineering student at Kongu Engineering College (2023–2027) 
                  with hands-on experience in web development, AI integration, and database systems. 
                  I enjoy designing intuitive user interfaces and building scalable applications.
                </p>
                
                <p>
                  My passion lies in creating digital solutions that make a difference. From developing 
                  smart dashboards to building AI-powered chatbots, I love bringing ideas to life through code.
                </p>
              </div>
            </motion.div>

            {/* Education & Experience Info Grid */}
            <motion.div variants={itemVariants}>
              <h4 className="text-lg font-medium mb-4 flex items-center">
                <div className="w-3 h-3 border border-light mr-3"></div>
                Education & Experience
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-muted border-opacity-20 p-4 bg-primary bg-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 border border-light mr-2"></div>
                    <h5 className="text-sm font-medium">Education</h5>
                  </div>
                  <p className="text-xs text-muted mb-1">B.E. Computer Science & Engineering</p>
                  <p className="text-xs text-muted">Kongu Engineering College (2023-2027)</p>
                </div>

                <div className="border border-muted border-opacity-20 p-4 bg-primary bg-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 border border-light mr-2"></div>
                    <h5 className="text-sm font-medium">Focus Areas</h5>
                  </div>
                  <p className="text-xs text-muted mb-1">Full Stack Development</p>
                  <p className="text-xs text-muted">AI Integration & Database Systems</p>
                </div>

                <div className="border border-muted border-opacity-20 p-4 bg-primary bg-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 border border-light mr-2"></div>
                    <h5 className="text-sm font-medium">Experience</h5>
                  </div>
                  <p className="text-xs text-muted mb-1">Gen AI Consortium Internship</p>
                  <p className="text-xs text-muted">Hackathon Participant (BYTS & SIH)</p>
                </div>

                <div className="border border-muted border-opacity-20 p-4 bg-primary bg-opacity-20">
                  <div className="flex items-center mb-2">
                    <div className="w-2 h-2 border border-light mr-2"></div>
                    <h5 className="text-sm font-medium">Location</h5>
                  </div>
                  <p className="text-xs text-muted">Tamil Nadu, India</p>
                  <p className="text-xs text-muted">Available for Remote Work</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
