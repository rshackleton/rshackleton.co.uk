import { AnimatePresence, motion } from 'framer-motion';
import type { AppProps } from 'next/app';
import React from 'react';

import '@/styles/index.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface IMyAppProps extends AppProps {}

const MyApp: React.FC<IMyAppProps> = ({ Component, pageProps, router: { route } }) => {
  return (
    <main className="main-container">
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={route} />
      </AnimatePresence>
      <Footer />
    </main>
  );
};

export default MyApp;
