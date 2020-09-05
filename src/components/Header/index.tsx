import React from 'react';
import Link from 'next/link';

interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = () => {
  return (
    <header className="font-heading text-lg bg-white">
      <div className="site-wide flex-row-center justify-between">
        <Link href="/">
          <a className="py-4 hover:underline">rshackleton.co.uk</a>
        </Link>

        <nav>
          <ul className="flex-row-center justify-evenly">
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
