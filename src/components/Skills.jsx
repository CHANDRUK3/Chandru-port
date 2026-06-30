import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  SiPython,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiExpress,
  SiFlask,
  SiMongodb,
  SiOracle,
  SiGit,
  SiGithub,
  SiMysql,
  SiNodedotjs,
  SiTailwindcss
} from 'react-icons/si';

// Custom Java icon component
const JavaIcon = (props) => (
  <svg 
    {...props}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8.851 18.56s-.708.506.855.962c1.564.456 2.825.456 4.988-.152 0 0 .709.506 1.917.86-.709 1.063-4.582 1.415-7.76.152M5.743 15.11s-1.415 1.063.566 1.567c1.98.505 3.538.606 6.108.152 0 0 .709.506 1.415.86-.85 1.214-4.988 1.416-8.489-.86M13.116 11.797s1.415-1.214-.566-1.819c-1.98-.606-3.537-.606-5.52 0-.456.152-1.133.455-.85.86.283.404.85.607 1.133.607.566.15 1.133.303 1.7.303-1.133-.15-2.55-.303-3.68-.758-1.133-.454-2.266-1.214-1.7-2.124.566-.91 2.55-1.567 4.53-1.819 1.98-.303 3.68-.152 5.377.303 0 0-1.133-.152-1.7.303-.283.303-.566.607-.283.91.283.303.85.455 1.133.455.85.152 1.7.303 2.55.455M19.33 20.664s.85.607-.85 1.214c-2.266.91-8.488.91-11.33.303 0 0 .85.607 2.266.758 2.55.303 7.48.152 10.04-.607 0 0 .566.152.874.303"/>
  </svg>
);

// Custom C++ icon component
const CppIcon = (props) => (
  <svg 
    {...props}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.849 0L2.261 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.849 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.002-.294-.1-.62-.268-.91zM13 19.11c-4.209 0-7.623-3.414-7.623-7.623S8.791 3.864 13 3.864s7.623 3.414 7.623 7.623S17.209 19.11 13 19.11z"/>
  </svg>
);

// Custom MATLAB icon component
const MatlabIcon = (props) => (
  <svg 
    {...props}
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.394 4c0-1.1-.9-2-2-2H3.606c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16.788c1.1 0 2-.9 2-2V4zM7.5 19.5c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm5 0c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5zm5 0c-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5 2.5 1.119 2.5 2.5-1.119 2.5-2.5 2.5z"/>
  </svg>
);

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Skill mapping with icons and colors
  const skillIcons = {
    'React.js': { icon: SiReact, color: 'text-[#61DAFB]' },
    'JavaScript': { icon: SiJavascript, color: 'text-[#F7DF1E]' },
    'HTML': { icon: SiHtml5, color: 'text-[#E34F26]' },
    'CSS': { icon: SiCss3, color: 'text-[#1572B6]' },
    'Tailwind CSS': { icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    'Node.js': { icon: SiNodedotjs, color: 'text-[#339933]' },
    'Express.js': { icon: SiExpress, color: 'text-white' },
    'Python': { icon: SiPython, color: 'text-[#3776AB]' },
    'Flask': { icon: SiFlask, color: 'text-white' },
    'REST APIs': { icon: SiNodedotjs, color: 'text-[#339933]' },
    'MongoDB': { icon: SiMongodb, color: 'text-[#47A248]' },
    'MySQL': { icon: SiMysql, color: 'text-[#4479A1]' },
    'Oracle APEX': { icon: SiOracle, color: 'text-[#F80000]' },
    'Java': { icon: JavaIcon, color: 'text-[#ED8B00]' },
    'C++': { icon: CppIcon, color: 'text-[#00599C]' },
    'MATLAB': { icon: MatlabIcon, color: 'text-[#0076A8]' },
    'Git': { icon: SiGit, color: 'text-[#F05032]' },
    'GitHub': { icon: SiGithub, color: 'text-white' }
  };

  const categories = [
    {
      name: "Frontend",
      skills: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"]
    },
    {
      name: "Backend", 
      skills: ["Node.js", "Express.js", "Python", "Flask", "REST APIs"]
    },
    {
      name: "Database",
      skills: ["MongoDB", "MySQL", "Oracle APEX"]
    },
    {
      name: "Languages & Tools",
      skills: ["Java", "C++", "MATLAB", "Git", "GitHub"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.98,
      filter: 'blur(8px)'
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.04,
        delayChildren: 0.15
      } 
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      y: 12,
      filter: 'blur(3px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <section id="skills" className="section-padding bg-secondary">
      <div className="container-custom" ref={ref}>
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h4 className="font-mono text-sm text-muted mb-2">EXPERTISE</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <div className="w-16 h-[2px] bg-light opacity-50"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {categories.map((category, i) => (
            <motion.div 
              key={i} 
              className="border border-muted border-opacity-20 bg-primary bg-opacity-40 p-6 flex flex-col justify-between"
              variants={cardVariants}
            >
              <div>
                <h3 className="text-light font-medium mb-4 pb-2 border-b border-muted border-opacity-20">
                  {category.name}
                </h3>
                <motion.div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, j) => {
                    const skillData = skillIcons[skill];
                    const IconComponent = skillData?.icon;
                    return (
                      <motion.span 
                        key={j} 
                        className="text-sm bg-secondary px-3 py-1 rounded-sm border border-muted border-opacity-10 text-light cursor-default flex items-center gap-2"
                        variants={skillVariants}
                        whileHover={{ 
                          y: -3, 
                          backgroundColor: "rgba(245, 245, 245, 0.08)", 
                          borderColor: "rgba(245, 245, 245, 0.25)",
                          boxShadow: "0 8px 16px -8px rgba(0,0,0,0.5)"
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 25 
                        }}
                      >
                        {IconComponent && (
                          <IconComponent 
                            className={`w-4 h-4 ${skillData.color}`} 
                          />
                        )}
                        {skill}
                      </motion.span>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 flex flex-col md:flex-row items-center justify-between p-6 border border-muted border-opacity-20 bg-primary bg-opacity-40"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-medium mb-2">Ready to collaborate?</h3>
            <p className="text-muted">Let's discuss how my skills can help your project.</p>
          </div>
          <a href="#contact" className="btn btn-primary whitespace-nowrap">
            Get in Touch
            <span className="ml-2">→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;