import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <div className="w-full bg-black border-t border-b border-green-300">
      <div className="container mx-auto">
        <div className="flex justify-between items-center p-4 text-white">
          <Link to="/" className="text-xl font-bold">
            TokenFlowzy
          </Link>
          <nav className="space-x-6">
            <Link
              to="/token-creator"
              className="hover:text-green-300 transition-colors"
            >
              Token Creator
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;