import { useState, useRef } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [flippedCards] = useState({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });

  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * projects.length),
      projects.length - 1
    );
    setActiveProject(index);
  });

  const handleProjectSelect = (index) => {
    if (scrollRef.current) {
      const element = scrollRef.current;
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const scrollableHeight = element.scrollHeight - window.innerHeight;
      
      const targetScroll = elementTop + (index / (projects.length - 1)) * scrollableHeight;
      
      if (window.lenis) {
        window.lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({
          top: targetScroll,
          behavior: "smooth"
        });
      }
    }
  };

  const projects = [
    {
      title: "Smart Dashboard for Students & Faculty",
      description: "A comprehensive dashboard for educational institutions with clean UI and responsive design. Streamlines campus job board management and provides intuitive interfaces for both students and faculty members.",
      tech: ["React.js", "MongoDB", "Express.js", "Tailwind CSS"],
      image: "/images/dashboard-preview.png",
      liveLink: "https://github.com/CHANDRUK3/Campus-Job-Board-Management",
      highlights: [
        "Clean and intuitive user interface",
        "Real-time data updates",
        "Responsive design for all devices",
        "Streamlined campus operations"
      ]
    },
    {
      title: "Book Store & Library Management",
      description: "Online system for managing books and user transactions with real-time inventory tracking. Streamlined library operations by 60% with automated book management and user-friendly interface.",
      tech: ["React.js", "MongoDB", "Node.js", "Express.js"],
      image: "/images/bookstore-preview.png",
      liveLink: "https://book-store-app-two-pearl.vercel.app",
      highlights: [
        "Streamlined library operations by 60%",
        "Real-time inventory tracking",
        "Automated transaction management",
        "User-friendly interface"
      ]
    },
    {
      title: "Event Management Platform",
      description: "A comprehensive digital platform designed for planning, organizing, and managing events. Enables seamless registration, scheduling, and tracking for users and organizers.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      image: "/images/institute-preview.png",
      liveLink: "https://github.com/CHANDRUK3/Event-Mangement",
      highlights: [
        "Seamless event registration and ticketing",
        "Interactive event schedules and calendars",
        "Real-time attendee tracking and analytics",
        "Responsive design for all devices"
      ]
    },
    {
      title: "Medical Chatbot",
      description: "AI-powered chatbot for basic medical assistance using machine learning models. Achieved 95% accuracy in symptom detection with intelligent natural language processing.",
      tech: ["React.js", "Flask", "Python", "TensorFlow"],
      image: "/images/chatbot-preview.png",
      liveLink: "https://github.com/CHANDRUK3/Medico",
      highlights: [
        "95% accuracy in symptom detection",
        "AI-powered medical assistance",
        "Natural language processing",
        "Machine learning integration"
      ]
    },
    {
      title: "FreshSip Beverage Ordering Platform",
      description: "A modern beverage ordering platform that enables users to explore products, place orders, and manage purchases through a responsive and engaging digital experience.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      image: "/images/freshsip-preview.png",
      liveLink: "https://github.com/CHANDRUK3/Freshsip",
      highlights: [
        "Product catalog management",
        "User authentication system",
        "Order placement and tracking",
        "Mobile-friendly responsive design"
      ]
    },
    {
      title: "Blogging Platform",
      description: "A full-stack blogging platform that allows users to create, edit, publish, and manage articles while providing readers with a clean and engaging content experience.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB"],
      image: "/images/blogging-preview.png",
      liveLink: "https://github.com/CHANDRUK3/Blogging-Platform",
      highlights: [
        "Blog creation and editing",
        "Authentication and authorization",
        "Content management system",
        "Responsive reading experience"
      ]
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  const detailsChildVariants = {
    hidden: { opacity: 0, y: 15, filter: "blur(2px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  // 3D Flip Card Variants
  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardFaceVariants = {
    front: {
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    back: {
      rotateY: 180,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section id="projects" ref={scrollRef} className="relative h-[500vh] bg-primary">
      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden">
        <div className="container-custom w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12"
        >
          <h4 className="font-mono text-sm text-muted mb-2">PORTFOLIO</h4>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
          {/* Project selector - mobile version */}
          <motion.div 
            className="md:hidden w-full mb-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs text-muted">SELECT PROJECT</p>
              <div className="text-xs text-muted">{activeProject + 1}/{projects.length}</div>
            </div>
            <div className="flex overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="snap-start flex-shrink-0 w-[75%] mr-3 p-4 cursor-pointer relative overflow-hidden bg-secondary bg-opacity-10 border border-muted border-opacity-10"
                  onClick={() => handleProjectSelect(index)}
                  whileTap={{ scale: 0.98 }}
                >
                  {activeProject === index && (
                    <motion.div
                      layoutId="mobileActiveHighlight"
                      className="absolute inset-0 bg-secondary bg-opacity-40 border border-light border-opacity-20 z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10">
                    <h3 className={`font-medium text-sm mb-1 transition-colors duration-300 ${
                      activeProject === index ? "text-light" : "text-muted"
                    }`}>
                      {project.title.split(" - ")[0]}
                    </h3>
                    <p className="text-xs text-muted line-clamp-1">
                      {project.tech.slice(0, 3).join(", ")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Project selector - desktop version */}
          <motion.div 
            className="hidden md:block md:col-span-4" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="border-l border-muted border-opacity-20 p-4 cursor-pointer transition-all duration-300 relative"
                onClick={() => handleProjectSelect(index)}
                whileHover={{
                  backgroundColor: "rgba(26, 26, 26, 0.15)",
                  transition: { duration: 0.2 }
                }}
              >
                {activeProject === index && (
                  <motion.div
                    layoutId="desktopActiveHighlight"
                    className="absolute inset-0 bg-secondary bg-opacity-30 border-l border-light -left-[1px] z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <h3 className={`font-medium text-sm mb-1 transition-colors duration-300 ${
                    activeProject === index ? "text-light" : "text-muted"
                  }`}>
                    {project.title.split(" - ")[0]}
                  </h3>
                  <p className="text-xs text-muted line-clamp-1">
                    {project.tech.slice(0, 3).join(", ")}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Project details with scroll reveal */}
          <motion.div 
            className="col-span-1 md:col-span-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 1000 }}
          >
            <motion.div 
              className="relative w-full h-[400px] md:h-[500px]"
              key={activeProject}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Face - Project Image */}
              <motion.div
                className="absolute inset-0 w-full h-full backface-hidden"
                animate={flippedCards[activeProject] ? "back" : "front"}
                variants={cardFaceVariants}
                style={{
                  backfaceVisibility: "hidden",
                  transformStyle: "preserve-3d"
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="w-full h-full bg-secondary bg-opacity-20 border border-muted border-opacity-10 overflow-hidden relative">
                  {/* Project Image */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-primary">
                    <div className="text-center p-8">
                      <div className="w-24 h-24 mx-auto mb-4 border border-muted border-opacity-30 bg-primary bg-opacity-40 flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-light opacity-60">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                          <circle cx="8.5" cy="8.5" r="1.5"/>
                          <polyline points="21,15 16,10 5,21"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-medium text-light mb-2">{projects[activeProject].title}</h3>
                      <p className="text-sm text-muted opacity-80">Project Preview</p>
                    </div>
                  </div>
                  
                  {/* Subtle loading indicator */}
                  {!flippedCards[activeProject] && (
                    <motion.div
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 3 }}
                    >
                      <div className="flex space-x-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            className="w-1 h-1 bg-light opacity-60"
                            animate={{
                              scale: [1, 1.2, 1],
                              opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.2
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Back Face - Project Details */}
              <motion.div
                className="absolute inset-0 w-full h-full backface-hidden"
                animate={flippedCards[activeProject] ? "front" : "back"}
                variants={cardFaceVariants}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  transformStyle: "preserve-3d"
                }}
              >
                <motion.div 
                  className="w-full h-full bg-secondary bg-opacity-20 p-4 md:p-6 border border-muted border-opacity-10 overflow-y-auto"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.05
                      }
                    }
                  }}
                >
                  <motion.h3 variants={detailsChildVariants} className="text-lg md:text-xl font-semibold mb-3">{projects[activeProject].title}</motion.h3>
                  <motion.p variants={detailsChildVariants} className="text-sm md:text-base text-muted mb-4 md:mb-6 leading-relaxed">
                    {projects[activeProject].description}
                  </motion.p>
                  
                  <motion.div variants={detailsChildVariants} className="mb-4 md:mb-6">
                    <h4 className="text-xs md:text-sm font-mono text-light mb-2 md:mb-3">KEY HIGHLIGHTS</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {projects[activeProject].highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-light opacity-50 mt-1">→</span>
                          <span className="text-xs md:text-sm">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div variants={detailsChildVariants} className="mb-6">
                    <h4 className="text-xs md:text-sm font-mono text-light mb-2 md:mb-3">TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-2">
                      {projects[activeProject].tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className="text-xs py-1 px-2 md:px-3 bg-primary border border-muted border-opacity-20 rounded-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {projects[activeProject].liveLink && (
                    <motion.div variants={detailsChildVariants} className="mt-6 md:mt-8 flex justify-center md:justify-end">
                      <a 
                        href={projects[activeProject].liveLink}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-mono text-xs inline-flex items-center px-5 py-2 md:px-6 md:py-2 border border-light hover:bg-light hover:bg-opacity-5 transition-all duration-300 group"
                      >
                        VIEW PROJECT
                        <svg className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                      </a>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Projects;