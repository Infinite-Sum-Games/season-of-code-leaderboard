'use client';
// import { Github } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const handleApplyButtonClick = () => {
    window.location.href = 'https://forms.office.com/r/xH6GzZZhzC';
  };
  return (
    <nav className="absolute top-0 left-0 z-50 mx-4 mt-4 w-11/12 rounded-lg border border-[#A7E6FF] bg-transparent shadow-lg backdrop-blur-sm md:w-1/2">
      <div className="container mx-auto flex items-center justify-between px-2 py-3 sm:px-6">
        <div className="flex items-center space-x-6">
          <Link
            href="/"
            className="flex items-center space-x-2"
          >
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
              <Image
                src="/acmlogonew.webp"
                alt="Logo"
                width={50}
                height={50}
                className="object-contain"
              />
            </div>
          </Link>

          <Link
            href="https://github.com/CSE-25/winter-of-code-s1"
            className="font-semibold text-[#FFFFFF] text-base transition-all duration-300 ease-in-out hover:text-[#3ABEF9] md:text-lg"
          >
            About AmWOC
          </Link>
        </div>

        <div className="items-center space-x-6 md:flex">
          <button
            type="button"
            onClick={handleApplyButtonClick}
            className="flex items-center gap-2 rounded-lg border border-gray-400 bg-gray-800 px-6 py-2 font-semibold text-sm text-white shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] sm:text-lg"
          >
            {/* <Github size={20} /> */}
            Register
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
