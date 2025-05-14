import { Logo } from "@/assets/images";
import { CustomWalletMultiButton } from "@/solactions/WalletConnect";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="w-full bg-black/90 backdrop-blur-sm fixed top-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 text-white">
          <Link to="/" className="flex-shrink-0">
            <img src={Logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center mr-2 sm:mr-4 lg:mr-6"> 
            <div className="flex-shrink-0">
              <CustomWalletMultiButton />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden border-t border-green-300/10 overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4 py-4">
            <div className="flex justify-center px-4"> {/* Added px-4 for horizontal padding */}
              <div className="flex-shrink-0">
                <CustomWalletMultiButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
