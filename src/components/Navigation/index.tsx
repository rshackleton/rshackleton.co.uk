import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { createPortal } from 'react-dom';

import usePortal from '@/hooks/usePortal';
import IconTimesSolid from '@/icons/IconTimesSolid';

interface INavigationProps {
  onClose: () => void;
}

interface INavigationOverlayProps {
  onClick: () => void;
}

const drawerVariants: Variants = {
  opened: {
    x: 0,
    transition: {
      type: 'spring',
      delay: 0,
      stiffness: 500,
      damping: 60,
      mass: 1,
    },
  },
  closed: {
    x: '100%',
    transition: {
      type: 'spring',
      delay: 0,
      stiffness: 500,
      damping: 60,
      mass: 1,
    },
  },
};

const overlayVariants: Variants = {
  opened: {
    opacity: 0.75,
  },
  closed: {
    opacity: 0,
  },
};

const NavigationOverlay: React.FC<INavigationOverlayProps> = ({ onClick }) => {
  const target = usePortal('navigation-overlay');

  return createPortal(
    <motion.div
      className="fixed top-0 left-0 w-full h-screen z-30 bg-gray-900 opacity-75"
      initial="closed"
      animate="opened"
      exit="closed"
      variants={overlayVariants}
      onClick={onClick}
    />,
    target,
  );
};

const Navigation: React.FC<INavigationProps> = ({ onClose }) => {
  return (
    <motion.nav
      className="fixed top-0 right-0 w-4/5 max-w-xs h-screen px-4 z-40 bg-white font-heading text-lg"
      initial="closed"
      animate="opened"
      exit="closed"
      variants={drawerVariants}
    >
      <header className="flex flex-row h-16 items-center justify-end">
        <button
          className="inline-block p-2"
          onClick={(event) => {
            event.preventDefault();
            onClose();
          }}
        >
          <IconTimesSolid className="w-6 h-6" />
        </button>
      </header>
      <ul className="flex flex-col">
        <li className="mb-4">
          <Link href="/articles">
            <a className="block hover:underline">Articles</a>
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/[slug]" as="/about">
            <a className="block hover:underline">About</a>
          </Link>
        </li>
      </ul>
      <NavigationOverlay onClick={onClose} />
    </motion.nav>
  );
};

export default Navigation;
