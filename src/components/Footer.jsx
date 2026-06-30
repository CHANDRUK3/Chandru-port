import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary py-12 border-t border-muted border-opacity-20">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <div className="flex items-center mb-2">
              <div className="w-[2px] h-6 bg-light mr-2"></div>
              <span className="font-mono text-lg tracking-wider">CHANDRU K</span>
            </div>
            <p className="text-muted text-sm">
              Aspiring Software Engineer building innovative solutions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex space-x-6"
          >
           
          </motion.div>
        </div>

        <div className="border-t border-muted border-opacity-10 pt-8 flex flex-col md:flex-row items-center justify-between">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm text-muted mb-4 md:mb-0"
          >
            © {currentYear} Chandru K. All rights reserved.
          </motion.p>



        </div>
      </div>
    </footer>
  );
};

export default Footer;