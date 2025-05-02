'use client';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
// import { Github } from "lucide-react";
import { useState } from 'react';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleApplyButtonClick = () => {
    window.open('https://forms.office.com/r/xH6GzZZhzC', '_blank');
  };

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center mt-4 z-50">
      <nav className="w-11/12 md:w-9/10 bg-white/90 backdrop-blur-sm border-b border-[#A7E6FF] shadow-sm rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0" aria-label="Home">
              <Link href="/" aria-label="Home">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 overflow-hidden flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
                  <Image
                    src="/acmlogonew.webp"
                    alt="ACM Logo"
                    width={48}
                    height={48}
                    className="object-contain p-1"
                    priority
                  />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-6">
                <NavLink href="/home">Home</NavLink>
                <NavLink href="/announcements">Announcements</NavLink>
                <NavLink href="/resources">Resources</NavLink>
                <NavLink href="/team">Team</NavLink>
                <NavLink href="/past-editions">Past Editions</NavLink>
              </div>
            </div>

            {/* Register Button - Desktop */}
            <div className="hidden md:block">
              <RegisterButton onClick={handleApplyButtonClick} />
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-500 hover:bg-blue-50 focus:outline-none transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavLink href="/home">Home</MobileNavLink>
              <MobileNavLink href="/announcements">Announcements</MobileNavLink>
              <MobileNavLink href="/resources">Resources</MobileNavLink>
              <MobileNavLink href="/team">Team</MobileNavLink>
              <MobileNavLink href="/past-editions">Past Editions</MobileNavLink>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <RegisterButton
                  onClick={handleApplyButtonClick}
                  className="w-full justify-center"
                />
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

// Reusable NavLink component
const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="px-2 py-1 text-sm font-medium text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap"
  >
    {children}
  </Link>
);

// Reusable MobileNavLink component
const MobileNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-colors duration-200"
  >
    {children}
  </Link>
);

// Reusable RegisterButton component
const RegisterButton = ({
  onClick,
  className = '',
}: {
  onClick: () => void;
  className?: string;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`${className} px-4 py-2 bg-gray-800 border-gray-400 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm hover:shadow-md whitespace-nowrap`}
    aria-label="Register for AmWOC"
  >
    Register
  </button>
);

export default Navbar;
