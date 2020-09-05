import { motion } from 'framer-motion';
import React from 'react';

interface IHomeProps {}

const Wrapper: React.FC = ({ children }) => (
  <motion.div
    className="relative flex items-center bg-black"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
);

const BackgroundImage: React.FC = () => (
  <img
    className="absolute top-0 left-0 w-full h-full object-cover object-center z-0"
    src="carbon.png"
    alt=""
  />
);

const Content: React.FC = () => (
  <div className="relative site-wide mb-32 z-10">
    <div className="flex flex-col items-start justify-start w-auto">
      <h1 className="font-heading text-5xl leading-tight mb-4">
        <span className="bg-white">Richard Shackleton</span>
      </h1>
      <h2 className="font-heading text-2xl leading-tight">
        <span className="bg-white">Full-Stack Web Developer</span>
      </h2>
    </div>
  </div>
);

const Home: React.FC<IHomeProps> = () => {
  return (
    <Wrapper>
      <BackgroundImage />
      <Content />
    </Wrapper>
  );
};

export default Home;
