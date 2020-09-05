import { motion } from 'framer-motion';
import React from 'react';

interface IArticlesProps {}

const Articles: React.FC<IArticlesProps> = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      Articles
    </motion.div>
  );
};

export default Articles;
