import { motion } from 'framer-motion';

const Education = () => {
  const education = [
    {
      institution: "Kongu Engineering College",
      degree: "B.E. Computer Science and Engineering",
      location: "Tamil Nadu, India",
      period: "2023 – 2027",
      status: "Currently Pursuing",
      highlights: [
        "Specialized in Full Stack Development",
        "Active participant in coding competitions",
        "Member of technical societies"
      ]
    },
    {
      institution: "Kongu Vellalar Matric Hr. Sec. School",
      degree: "HSC in Computer Science & Mathematics",
      location: "Tamil Nadu, India",
      period: "2020 – 2023",
      status: "Completed",
      highlights: [
        "Focused on Computer Science and Mathematics core subjects",
        "Strong foundation in programming concepts",
        "Academic excellence in STEM subjects"
      ]
    }
  ];

  const experiences = [
    {
      title: "Gen AI Consortium Internship",
      organization: "AI Research Institute",
      location: "Tamil Nadu, India",
      period: "Summer 2024",
      tag: "Internship",
      highlights: [
        "Worked on Image Processing & Mathematical Computation projects using AI/ML technologies",
        "Developed image processing algorithms",
        "Implemented mathematical computation models",
        "Collaborated with research team on AI projects"
      ]
    },
    {
      title: "Hackathon Participant",
      organization: "BYTS & SIH",
      location: "Tamil Nadu, India",
      period: "2023 – 2024",
      tag: "Competition",
      highlights: [
        "Built smart student dashboard and innovative solutions for real-world problems",
        "Smart Student Dashboard Development",
        "Team collaboration and leadership",
        "Problem solving under time constraints"
      ]
    }
  ];

  return (
    <section id="education" className="section-padding bg-primary overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col gap-12">
          {/* Title Section */}
          <motion.div 
            className="mb-2"
            initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="font-mono text-sm text-muted mb-2">BACKGROUND</h4>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Education & Experience</h2>
            <div className="w-16 h-[2px] bg-light opacity-50"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Education Column */}
            <div>
              <motion.h3 
                className="text-xl font-medium mb-6 flex items-center"
                initial={{ opacity: 0, x: -15, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-4 h-4 border border-light mr-3"></div>
                Education
              </motion.h3>

              <div className="space-y-8">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    className="border-l-2 border-muted border-opacity-30 pl-6 relative"
                    initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                  >
                    <motion.div 
                      className="absolute w-3 h-3 bg-primary border border-light rounded-full -left-[7px] top-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                    />

                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="text-lg font-medium text-light">
                          {edu.degree}
                        </h4>
                        <p className="text-sm text-accent">
                          {edu.institution}
                        </p>
                      </div>
                      <div className="text-right text-xs text-muted font-mono whitespace-nowrap">
                        <p>{edu.period}</p>
                        <p>{edu.location}</p>
                      </div>
                    </div>

                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {edu.highlights.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                        >
                          <span className="mt-1 text-light opacity-60">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.span
                      className="inline-block mt-4 px-3 py-1 text-[11px] font-mono rounded-full border border-light border-opacity-40 text-muted"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {edu.status}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Column */}
            <div>
              <motion.h3 
                className="text-xl font-medium mb-6 flex items-center"
                initial={{ opacity: 0, x: -15, filter: "blur(2px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-4 h-4 border border-light mr-3"></div>
                Experience
              </motion.h3>

              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    className="border-l-2 border-muted border-opacity-30 pl-6 relative"
                    initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -3 }}
                  >
                    <motion.div 
                      className="absolute w-3 h-3 bg-primary border border-light rounded-full -left-[7px] top-1"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                    />

                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="text-lg font-medium text-light">
                          {exp.title}
                        </h4>
                        <p className="text-sm text-accent">
                          {exp.organization}
                        </p>
                      </div>
                      <div className="text-right text-xs text-muted font-mono whitespace-nowrap">
                        <p>{exp.period}</p>
                        <p>{exp.location}</p>
                      </div>
                    </div>

                    <ul className="mt-2 space-y-1 text-sm text-muted">
                      {exp.highlights.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start gap-2"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
                        >
                          <span className="mt-1 text-light opacity-60">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <motion.span
                      className="inline-block mt-4 px-3 py-1 text-[11px] font-mono rounded-full border border-light border-opacity-40 text-muted"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      {exp.tag}
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Continuous Learning Card */}
            <motion.div
              className="col-span-1 lg:col-span-2 mt-8 p-4 border border-muted border-opacity-20 bg-secondary bg-opacity-30"
              initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              whileHover={{ y: -2 }}
            >
              <h4 className="text-sm font-medium mb-2 text-light">Continuous Learning</h4>
              <p className="text-muted text-sm leading-relaxed">
                Currently pursuing Computer Science Engineering with a focus on Full Stack Development and AI Integration.
                Always exploring new technologies and building innovative solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;