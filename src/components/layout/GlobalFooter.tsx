import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

const GlobalFooter: React.FC = () => {
  console.log('GlobalFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 border-t border-slate-800 text-gray-400">
      <div className="container mx-auto py-8 px-4 md:px-6 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-cyan-600" />
          <span className="text-sm font-semibold text-gray-300">StockDash</span>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          <Link to="/#terms" className="hover:text-cyan-400 transition-colors">Terms of Service</Link>
          <Link to="/#privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link>
          <span className="text-gray-500">Data Source: Fictional Exchange</span>
        </nav>

        <div className="text-center md:text-right">
          <p className="text-sm">
            &copy; {currentYear} StockDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;