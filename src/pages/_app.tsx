import KontentSmartLink from '@kentico/kontent-smart-link';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import '@kentico/kontent-smart-link/dist/kontent-smart-link.styles.css';
import '@/styles/index.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface IMyAppProps extends AppProps {}

const MyApp: React.FC<IMyAppProps> = ({ Component, pageProps, router: { route } }) => {
  useEffect(() => {
    const kontentSmartLink = KontentSmartLink.initialize();
    return () => {
      kontentSmartLink.destroy();
    };
  });

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
