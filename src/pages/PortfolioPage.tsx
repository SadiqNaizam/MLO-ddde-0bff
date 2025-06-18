import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import AdvancedGraphEngine from '@/components/AdvancedGraphEngine';
import PremiumInfoCard from '@/components/PremiumInfoCard';
import GlobalFooter from '@/components/layout/GlobalFooter';

// shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Lucide Icons
import { DollarSign, TrendingUp, Activity, PieChart, Download, Eye } from 'lucide-react';

// Placeholder Data
const sampleHoldings = [
  { id: '1', symbol: 'STK A', name: 'Alpha Corp', quantity: 150, avgPrice: 120.00, currentPrice: 125.50, marketValue: 18825.00, dayChange: 1.50, dayChangePercent: 1.21, totalPL: 825.00, totalPLPercent: 5.50, logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8584cf92b5e1d4d9b8129c/svg/color/btc.svg' },
  { id: '2', symbol: 'STK B', name: 'Beta Industries', quantity: 75, avgPrice: 280.00, currentPrice: 275.20, marketValue: 20640.00, dayChange: -2.10, dayChangePercent: -0.76, totalPL: -360.00, totalPLPercent: -1.71, logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8584cf92b5e1d4d9b8129c/svg/color/eth.svg' },
  { id: '3', symbol: 'STK C', name: 'Gamma Solutions', quantity: 200, avgPrice: 50.00, currentPrice: 55.80, marketValue: 11160.00, dayChange: 0.80, dayChangePercent: 1.45, totalPL: 1160.00, totalPLPercent: 11.60, logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8584cf92b5e1d4d9b8129c/svg/color/ada.svg' },
  { id: '4', symbol: 'STK D', name: 'Delta Ventures', quantity: 30, avgPrice: 800.00, currentPrice: 815.00, marketValue: 24450.00, dayChange: 5.00, dayChangePercent: 0.62, totalPL: 450.00, totalPLPercent: 1.88, logoUrl: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8584cf92b5e1d4d9b8129c/svg/color/sol.svg' },
];

const samplePerformanceData = Array.from({ length: 60 }, (_, i) => ({
  id: `perf-dp-${i}`,
  date: new Date(Date.now() - (60 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  value: 50000 + Math.sin(i / 10) * 15000 + Math.random() * 8000 - 4000, // Simulates portfolio value trend
}));

// Conceptual data for composition - AdvancedGraphEngine will render it based on its available viz types
const sampleCompositionData = [
  { id: 'comp-dp-1', date: 'Technology', value: 40, info: 'High Growth Tech Stocks' },
  { id: 'comp-dp-2', date: 'Healthcare', value: 25, info: 'Stable Pharma and Biotech' },
  { id: 'comp-dp-3', date: 'Financials', value: 20, info: 'Banking and Investment Firms' },
  { id: 'comp-dp-4', date: 'Renewables', value: 10, info: 'Green Energy Sector' },
  { id: 'comp-dp-5', date: 'Other', value: 5, info: 'Diversified Small Caps' },
];


const PortfolioPage = () => {
  console.log('PortfolioPage loaded');

  const totalMarketValue = sampleHoldings.reduce((acc, h) => acc + h.marketValue, 0);
  const totalInvested = sampleHoldings.reduce((acc, h) => acc + (h.quantity * h.avgPrice), 0);
  const overallPL = totalMarketValue - totalInvested;
  const overallPLPercent = totalInvested === 0 ? 0 : (overallPL / totalInvested) * 100;
  const dayChangeValue = sampleHoldings.reduce((acc, h) => acc + (h.dayChange * h.quantity), 0);

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen flex flex-col">
      <GlobalHeader />
      <ScrollArea className="flex-grow pt-16"> {/* pt-16 for fixed header height */}
        <main className="container mx-auto px-4 py-8 md:px-6 md:py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4 sm:mb-0">
              My Investment Portfolio
            </h1>
            <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>

          {/* Top Summary Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <PremiumInfoCard title="Total Portfolio Value" icon={DollarSign}>
              <p className="text-3xl font-bold text-green-400">${totalMarketValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              <p className="text-sm text-gray-400 mt-1">Updated: {new Date().toLocaleTimeString()}</p>
            </PremiumInfoCard>
            <PremiumInfoCard title="Overall Profit/Loss" icon={TrendingUp}>
              <p className={`text-3xl font-bold ${overallPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {overallPL >= 0 ? '+' : ''}${overallPL.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className={`text-sm ${overallPL >= 0 ? 'text-green-500' : 'text-red-500'} mt-1`}>
                ({overallPLPercent.toFixed(2)}%)
              </p>
            </PremiumInfoCard>
            <PremiumInfoCard title="Today's Change" icon={Activity}>
              <p className={`text-3xl font-bold ${dayChangeValue >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                 {dayChangeValue >= 0 ? '+' : ''}${dayChangeValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <p className="text-sm text-gray-400 mt-1">Across all holdings</p>
            </PremiumInfoCard>
          </section>

          {/* Tabs for Holdings, Performance, Analytics */}
          <Tabs defaultValue="holdings" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 bg-slate-800/80 border border-slate-700/70 p-1 rounded-lg mb-6 shadow-md">
              {['holdings', 'performance', 'analytics'].map((tabValue) => (
                <TabsTrigger
                  key={tabValue}
                  value={tabValue}
                  className="capitalize py-2.5 text-sm font-medium text-gray-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-md transition-all duration-150 ease-in-out hover:bg-slate-700/50"
                >
                  {tabValue}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="holdings">
              <PremiumInfoCard 
                title="Current Holdings" 
                className="bg-slate-900/60 backdrop-blur-md"
                footerContent={
                    <div className="flex justify-end">
                        <Button variant="default" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                            Add New Transaction
                        </Button>
                    </div>
                }
              >
                <Table>
                  <TableCaption className="text-gray-500 py-4">A summary of your current investments.</TableCaption>
                  <TableHeader>
                    <TableRow className="border-slate-700 hover:bg-slate-800/30">
                      <TableHead className="text-gray-300">Symbol</TableHead>
                      <TableHead className="text-gray-300 hidden md:table-cell">Name</TableHead>
                      <TableHead className="text-gray-300 text-right">Quantity</TableHead>
                      <TableHead className="text-gray-300 text-right hidden sm:table-cell">Avg. Price</TableHead>
                      <TableHead className="text-gray-300 text-right">Current Price</TableHead>
                      <TableHead className="text-gray-300 text-right hidden lg:table-cell">Market Value</TableHead>
                      <TableHead className="text-gray-300 text-right hidden sm:table-cell">Day's P/L</TableHead>
                      <TableHead className="text-gray-300 text-right">Total P/L</TableHead>
                      <TableHead className="text-gray-300 text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleHoldings.map((holding) => (
                      <TableRow key={holding.id} className="border-slate-800 hover:bg-slate-800/50 transition-colors">
                        <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                                <img src={holding.logoUrl} alt={`${holding.symbol} logo`} className="h-6 w-6 rounded-full bg-gray-700 p-0.5" />
                                <span className="text-cyan-400">{holding.symbol}</span>
                            </div>
                        </TableCell>
                        <TableCell className="text-gray-400 hidden md:table-cell">{holding.name}</TableCell>
                        <TableCell className="text-right">{holding.quantity}</TableCell>
                        <TableCell className="text-right hidden sm:table-cell">${holding.avgPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right font-semibold">${holding.currentPrice.toFixed(2)}</TableCell>
                        <TableCell className="text-right hidden lg:table-cell">${holding.marketValue.toFixed(2)}</TableCell>
                        <TableCell className={`text-right hidden sm:table-cell ${holding.dayChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {holding.dayChange >= 0 ? '+' : ''}{holding.dayChange.toFixed(2)} ({holding.dayChangePercent.toFixed(2)}%)
                        </TableCell>
                        <TableCell className={`text-right font-semibold ${holding.totalPL >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {holding.totalPL >= 0 ? '+' : ''}{holding.totalPL.toFixed(2)} ({holding.totalPLPercent.toFixed(2)}%)
                        </TableCell>
                        <TableCell className="text-center">
                          <Link to={`/stock-detail?symbol=${holding.symbol}`}> {/* Route from App.tsx */}
                            <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-slate-700/70 p-1.5">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </PremiumInfoCard>
            </TabsContent>

            <TabsContent value="performance">
              <PremiumInfoCard title="Portfolio Performance Over Time" icon={TrendingUp} className="bg-slate-900/60 backdrop-blur-md">
                <div className="h-[450px] md:h-[550px]"> {/* Ensure AdvancedGraphEngine has space */}
                  <AdvancedGraphEngine stockSymbol="PORTFOLIO_PERFORMANCE" initialData={samplePerformanceData} />
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PremiumInfoCard title="1-Month Return" className="bg-slate-800/50 hover:border-green-500/70">
                        <p className="text-2xl font-semibold text-green-400">+5.72%</p>
                        <p className="text-xs text-gray-400">Past 30 days performance</p>
                    </PremiumInfoCard>
                    <PremiumInfoCard title="Year-to-Date (YTD) Return" className="bg-slate-800/50 hover:border-yellow-500/70">
                        <p className="text-2xl font-semibold text-yellow-400">+12.34%</p>
                        <p className="text-xs text-gray-400">Since Jan 1st</p>
                    </PremiumInfoCard>
                </div>
              </PremiumInfoCard>
            </TabsContent>

            <TabsContent value="analytics">
              <PremiumInfoCard title="Portfolio Analytics & Composition" icon={PieChart} className="bg-slate-900/60 backdrop-blur-md">
                <div className="h-[450px] md:h-[550px] mb-6"> {/* Ensure AdvancedGraphEngine has space */}
                  {/* Note: AdvancedGraphEngine renders line charts by default.
                      True pie/bar charts for composition would require a different component or AGE modification.
                      This will visualize 'categories' as points on a line chart. */}
                  <AdvancedGraphEngine stockSymbol="PORTFOLIO_COMPOSITION_BY_SECTOR" initialData={sampleCompositionData} />
                </div>
                <p className="text-sm text-gray-400 text-center mb-6">
                  Asset allocation based on current market values. (Visualization is conceptual using current graph engine).
                </p>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <PremiumInfoCard title="Top Sector: Technology" className="bg-slate-800/50">
                        <p className="text-2xl font-semibold text-cyan-400">40%</p>
                        <p className="text-xs text-gray-400">Largest allocation</p>
                    </PremiumInfoCard>
                    <PremiumInfoCard title="Portfolio Diversity Score" className="bg-slate-800/50">
                        <p className="text-2xl font-semibold text-orange-400">6.8 / 10</p>
                        <p className="text-xs text-gray-400">Moderate diversification</p>
                    </PremiumInfoCard>
                </div>
              </PremiumInfoCard>
            </TabsContent>
          </Tabs>
        </main>
        <GlobalFooter />
      </ScrollArea>
    </div>
  );
};

export default PortfolioPage;