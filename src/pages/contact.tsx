import { motion } from 'framer-motion';
import React from 'react';

interface IContactProps {}

const Contact: React.FC<IContactProps> = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      Contact
    </motion.div>
  );
};

export default Contact;
