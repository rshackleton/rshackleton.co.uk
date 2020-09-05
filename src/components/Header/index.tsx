import React from 'react';
import Link from 'next/link';

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  return (
    <header className="font-heading text-lg bg-white">
      <div className="site-wide flex flex-col justify-center sm:flex-row sm:items-center sm:justify-between">
        <Link href="/">
          <a className="py-4 hover:underline">Richard Shackleton</a>
        </Link>

        <nav className="pb-4 sm:pb-0">
          <ul className="flex flex-row items-center justify-between -mx-4 sm:mx-0">
            <li className="mx-4">
              <Link href="/articles">
                <a className="hover:underline">Articles</a>
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/about">
                <a className="hover:underline">About</a>
              </Link>
            </li>
            <li className="mx-4">
              <Link href="/contact">
                <a className="hover:underline">Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
