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
    <div className="fixed top-0 left-0 z-50 mt-4 flex w-full justify-center">
      <nav className="w-11/12 rounded-2xl border-[#A7E6FF] border-b bg-white/90 shadow-sm backdrop-blur-sm md:w-9/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div
              className="flex-shrink-0"
              aria-label="Home"
            >
              <Link
                href="/"
                aria-label="Home"
              >
                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-600 to-blue-400 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg sm:h-12 sm:w-12">
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
            <div className="hidden flex-1 items-center justify-center md:flex">
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
            <div className="flex items-center md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500 focus:outline-none"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden rounded-xl border-gray-200 border-t bg-white transition-all duration-400 ease-in-out md:hidden ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            <MobileNavLink href="/home">Home</MobileNavLink>
            <MobileNavLink href="/announcements">Announcements</MobileNavLink>
            <MobileNavLink href="/resources">Resources</MobileNavLink>
            <MobileNavLink href="/team">Team</MobileNavLink>
            <MobileNavLink href="/past-editions">Past Editions</MobileNavLink>
            <div className="mt-4 border-gray-200 border-t pt-4">
              <RegisterButton
                onClick={handleApplyButtonClick}
                className="w-full justify-center"
              />
            </div>
          </div>
        </div>
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
    className="whitespace-nowrap rounded-lg px-2 py-1 font-medium text-gray-700 text-md transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500"
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
    className="block rounded-md px-3 py-2 font-medium text-base text-gray-700 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-500"
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
    className={`${className} whitespace-nowrap rounded-md border-gray-400 bg-gray-800 px-4 py-2 font-medium text-sm text-white shadow-sm transition-colors duration-200 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
    aria-label="Register for AmWOC"
  >
    Register
  </button>
);

export default Navbar;
