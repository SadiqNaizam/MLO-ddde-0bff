import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import StockTickerReel from '@/components/StockTickerReel';
import PremiumInfoCard from '@/components/PremiumInfoCard';
import AdvancedGraphEngine from '@/components/AdvancedGraphEngine';
import GlobalFooter from '@/components/layout/GlobalFooter';

// shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';

// Lucide React Icons
import { Briefcase, Activity as ActivityIcon, Eye, BarChartHorizontalBig, ArrowRight } from 'lucide-react';

// Placeholder data for StockTickerReel
const sampleTickerData = [
  { id: '1', symbol: 'AAPL', price: 175.32, change: 2.10, changePercent: 1.21 },
  { id: '2', symbol: 'MSFT', price: 420.70, change: -0.55, changePercent: -0.13 },
  { id: '3', symbol: 'GOOGL', price: 170.15, change: 1.80, changePercent: 1.07 },
  { id: '4', symbol: 'AMZN', price: 185.40, change: -1.10, changePercent: -0.59 },
  { id: '5', symbol: 'TSLA', price: 177.90, change: 3.45, changePercent: 1.98 },
  { id: '6', symbol: 'NVDA', price: 905.60, change: 10.20, changePercent: 1.14 },
];

const DashboardPage = () => {
  console.log('DashboardPage loaded');

  return (
    <div className="min-h-screen flex flex-col bg-black text-slate-100 selection:bg-cyan-500 selection:text-black">
      <GlobalHeader />
      
      <div className="pt-16 flex flex-col flex-1 overflow-hidden"> {/* pt-16 for fixed GlobalHeader (h-16) */}
        <StockTickerReel stocks={sampleTickerData} speed={30} />
        
        <ScrollArea className="flex-1 bg-gradient-to-b from-black via-slate-950 to-slate-900">
          <main className="container mx-auto py-6 sm:py-8 px-4 md:px-6 space-y-6 sm:space-y-10">
            
            {/* Section 1: Key Metrics / Portfolio Summary using PremiumInfoCards */}
            <section aria-labelledby="dashboard-overview-title">
              <h2 id="dashboard-overview-title" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 sm:mb-6 
                bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">
                Market & Portfolio Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <PremiumInfoCard 
                  title="Portfolio Snapshot" 
                  icon={Briefcase} 
                  description="Quick overview of your investments."
                  className="hover:shadow-purple-500/30 hover:border-purple-500/90"
                >
                  <div className="space-y-2 text-sm sm:text-base">
                    <p><strong className="font-medium text-slate-300">Total Value:</strong> $123,456.78</p>
                    <p><strong className="font-medium text-slate-300">Day's Gain:</strong> <span className="text-green-400">+$1,234.56 (+1.01%)</span></p>
                    <p><strong className="font-medium text-slate-300">Top Performer:</strong> NVDA (+5.2%)</p>
                  </div>
                  <Link to="/portfolio" className="block mt-4">
                    <Button variant="outline" className="w-full border-purple-500 text-purple-300 hover:bg-purple-500/10 hover:text-purple-200 focus-visible:ring-purple-500">
                      View Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </PremiumInfoCard>

                <PremiumInfoCard 
                  title="Market Pulse" 
                  icon={ActivityIcon} 
                  description="Current market status & key indices."
                >
                  <div className="space-y-2 text-sm sm:text-base">
                    <p><strong className="font-medium text-slate-300">S&P 500:</strong> 4,500.50 <span className="text-green-400">(+0.5%)</span></p>
                    <p><strong className="font-medium text-slate-300">NASDAQ:</strong> 15,000.20 <span className="text-red-400">(-0.2%)</span></p>
                    <p><strong className="font-medium text-slate-300">Overall Sentiment:</strong> Neutral</p>
                  </div>
                   <Link to="/stock-detail?symbol=SPY" className="block mt-4"> {/* Example link to S&P 500 detail */}
                    <Button variant="outline" className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200 focus-visible:ring-cyan-500">
                      Explore Market <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </PremiumInfoCard>

                <PremiumInfoCard 
                  title="Top Watchlist Movers" 
                  icon={Eye} 
                  description="Highlights from your tracked stocks."
                  className="hover:shadow-lime-500/30 hover:border-lime-500/90"
                >
                  <div className="space-y-2 text-sm sm:text-base">
                    <p><strong className="font-medium text-slate-300">AAPL:</strong> $175.50 <span className="text-green-400">(+1.2%)</span></p>
                    <p><strong className="font-medium text-slate-300">MSFT:</strong> $300.10 <span className="text-green-400">(+0.8%)</span></p>
                    <p><strong className="font-medium text-slate-300">TSLA:</strong> $177.90 <span className="text-red-400">(-0.5%)</span></p>
                  </div>
                  <Link to="/watchlist" className="block mt-4">
                    <Button variant="outline" className="w-full border-lime-500 text-lime-300 hover:bg-lime-500/10 hover:text-lime-200 focus-visible:ring-lime-500">
                      Go to Watchlist <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </PremiumInfoCard>
              </div>
            </section>

            {/* Section 2: Featured 'Crazy' Graph */}
            <section aria-labelledby="featured-analysis-title">
              <h2 id="featured-analysis-title" className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4 sm:mb-6
                 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text">
                Featured Market Analysis
              </h2>
              <AdvancedGraphEngine 
                stockSymbol="OVERALL_MARKET_TRENDS" 
                onInteraction={(type, details) => console.log('Dashboard Graph Interaction:', type, details)} 
              />
            </section>
            
            {/* Section 3: Quick Actions / Other Info */}
            <section className="text-center py-6 sm:py-8">
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-4">Ready to Dive Deeper?</h3>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4">
                    <Link to="/stock-detail?symbol=AAPL"> {/* Example link to AAPL */}
                        <Button 
                            size="lg" 
                            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            Explore AAPL <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                    <Link to="/portfolio">
                        <Button 
                            variant="secondary" 
                            size="lg" 
                            className="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 text-slate-100 font-semibold shadow-md hover:shadow-slate-600/50 transition-all duration-300 transform hover:scale-105"
                        >
                            Manage Your Portfolio
                        </Button>
                    </Link>
                </div>
            </section>

          </main>
        </ScrollArea>
      </div>
      <GlobalFooter />
    </div>
  );
};

export default DashboardPage;