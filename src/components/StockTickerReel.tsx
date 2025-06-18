import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StockTickData {
  id: string; // Unique identifier for React key
  symbol: string;
  price: number;
  change: number; // Absolute change value
  changePercent: number; // Percentage change
}

interface StockTickerReelProps {
  stocks: StockTickData[];
  /** Speed of the marquee scroll in seconds for one full pass of the original list. Default is 40. */
  speed?: number;
}

const StockTickerReel: React.FC<StockTickerReelProps> = ({ stocks, speed = 40 }) => {
  console.log('StockTickerReel loaded');

  if (!stocks || stocks.length === 0) {
    return (
      <div className="bg-neutral-950 text-neutral-500 py-3 px-4 text-center border-y border-neutral-700">
        No stock data to display in ticker.
      </div>
    );
  }

  // Duplicate stocks for a seamless animation loop with framer-motion
  // The animation moves by -50% of the duplicated_stocks width, which equals 100% of original_stocks width.
  const duplicatedStocks = [...stocks, ...stocks];

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 text-neutral-200 py-2.5
                   border-t border-neutral-700 border-b-2 border-b-neutral-800 
                   shadow-[0_2px_10px_rgba(0,0,0,0.3),0_0_3px_rgba(120,120,120,0.2)_inset]">
      <motion.div
        className="flex whitespace-nowrap"
        initial={{ x: '0%' }}
        animate={{ x: '-50%' }}
        transition={{
          ease: 'linear',
          duration: speed, // Duration for the content to scroll by its own width
          repeat: Infinity,
        }}
      >
        {duplicatedStocks.map((stock, index) => (
          <div
            key={`${stock.id}-${index}`} // Unique key for each item, including duplicates
            className="group mx-3 sm:mx-4 px-3 py-1 flex items-baseline space-x-2 sm:space-x-3 cursor-default
                       border border-transparent 
                       hover:bg-neutral-800/30
                       hover:shadow-[0_0_12px_rgba(6,182,212,0.4)] /* Cyan glow */
                       hover:border-cyan-700/60
                       transition-all duration-200 rounded-lg"
          >
            <span className="font-semibold text-sm sm:text-base text-neutral-100 group-hover:text-cyan-300 transition-colors duration-200">
              {stock.symbol}
            </span>
            <span className="text-sm sm:text-base font-medium text-neutral-300">${stock.price.toFixed(2)}</span>
            <div
              className={cn(
                "flex items-center text-xs sm:text-sm font-medium",
                stock.change >= 0 ? "text-green-400 group-hover:text-green-300" : "text-red-400 group-hover:text-red-300",
                "transition-colors duration-200"
              )}
            >
              {stock.change >= 0 ? (
                <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-0.5" strokeWidth={2.5} />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-0.5" strokeWidth={2.5} />
              )}
              <span>{stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}</span>
              <span className="ml-1.5 sm:ml-2">({stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Fading overlay at the edges for a smoother visual appearance */}
      <div className="absolute top-0 left-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-neutral-950 via-neutral-950/90 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default StockTickerReel;