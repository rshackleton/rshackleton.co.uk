import React from 'react';

interface IFooterProps {}

const Footer: React.FC<IFooterProps> = () => {
  return (
    <div className="font-heading bg-white text-sm">
      <div className="site-wide flex-row-center justify-between">
        <span className="py-4">
          &copy; Richard Shackleton{' '}
          {new Date().toLocaleString(undefined, {
            year: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};

export default Footer;
