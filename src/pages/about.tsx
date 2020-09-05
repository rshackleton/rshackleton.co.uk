import { motion } from 'framer-motion';
import React from 'react';

interface IAboutProps {}

const About: React.FC<IAboutProps> = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      About
    </motion.div>
  );
};

export default About;
