"use client";
import Link from "next/link";
// import { Github } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="mt-6 top-0 left-0 w-11/12 z-50 bg-transparent backdrop-blur-sm border border-[#A7E6FF] shadow-lg rounded-lg">
      <div className="container mx-auto flex items-center justify-between px-2 sm:px-6 py-3">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:scale-105">
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
            className="text-base md:text-lg text-[#FFFFFF] font-semibold hover:text-[#3ABEF9] transition-all duration-300 ease-in-out"
          >
            About AmWOC
          </Link>
        </div>

        <div className="md:flex items-center space-x-6">
          <button
            onClick={() =>
              (window.location.href = "https://forms.office.com/r/xH6GzZZhzC")
            }
            className="px-6 py-2 bg-gray-800 border border-gray-400 text-white font-semibold text-sm sm:text-lg rounded-lg transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#3ABEF9] flex items-center gap-2 shadow-md hover:shadow-xl"
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
