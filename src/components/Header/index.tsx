import { AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';

import Navigation from '@/components/Navigation';
import IconBarsSolid from '@/icons/IconBarsSolid';

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  const [navVisible, setNavVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setNavVisible(false);
  }, [router.route]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-16 z-10 font-heading text-lg bg-white">
        <div className="site-wide flex flex-row h-full items-center justify-between">
          <Link href="/">
            <a className="hover:underline">Richard Shackleton</a>
          </Link>

          <nav className="hidden sm:block">
            <ul className="flex flex-row -mx-4">
              <li className="mx-4">
                <Link href="/articles">
                  <a className="inline-block hover:underline">Articles</a>
                </Link>
              </li>
              <li className="mx-4">
                <Link href="/[slug]" as="/about">
                  <a className="inline-block hover:underline">About</a>
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className="inline-block sm:hidden p-2"
            onClick={(event) => {
              event.preventDefault();
              setNavVisible(true);
            }}
          >
            <IconBarsSolid className="w-6 h-6" />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {navVisible && (
          <Navigation
            onClose={() => {
              setNavVisible(false);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
