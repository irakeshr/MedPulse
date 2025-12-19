import React from 'react';

const Header = () => {
    return (
        <div>
            <header className="w-full px-4 sm:px-6 lg:px-8 py-5 flex justify-between items-center max-w-[1440px] mx-auto">
  <div className="flex items-center gap-2">
    <div className="size-8 text-primary">
      <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path clipRule="evenodd" d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" fillRule="evenodd" />
      </svg>
    </div>
    <span className="text-xl font-bold tracking-tight text-med-dark dark:text-white">MedPulse</span>
  </div>
  <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-med-text-secondary dark:text-gray-300">
    <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">About Us</a>
    <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Careers</a>
    <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Contact</a>
    <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Help Center</a>
  </nav>
</header>
        </div>
    );
}

export default Header;
