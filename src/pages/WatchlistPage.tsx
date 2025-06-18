import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import GlobalHeader from '@/components/layout/GlobalHeader';
import GlobalFooter from '@/components/layout/GlobalFooter';
import PremiumInfoCard from '@/components/PremiumInfoCard';
import InteractiveDataPoint from '@/components/InteractiveDataPoint'; // Included in layout_info
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast'; // For notifications
import { BarChartBig, Trash2, ExternalLink, PlusSquare, TrendingUp, Activity } from 'lucide-react';

interface WatchlistItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
}

const initialWatchlistItems: WatchlistItem[] = [
  { id: '1', symbol: 'AAPL', name: 'Apple Inc.', price: 170.34, change: 1.50, changePercent: 0.88, marketCap: "2.8T" },
  { id: '2', symbol: 'MSFT', name: 'Microsoft Corp.', price: 450.79, change: -2.10, changePercent: -0.46, marketCap: "3.1T" },
  { id: '3', symbol: 'GOOGL', name: 'Alphabet Inc.', price: 180.15, change: 0.75, changePercent: 0.42, marketCap: "2.2T" },
  { id: '4', symbol: 'AMZN', name: 'Amazon.com Inc.', price: 185.57, change: 3.20, changePercent: 1.75, marketCap: "1.9T" },
  { id: '5', symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.22, change: -5.50, changePercent: -3.04, marketCap: "560B" },
];

const WatchlistPage = () => {
  console.log('WatchlistPage loaded');
  const navigate = useNavigate();
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>(initialWatchlistItems);
  const [newStockSymbol, setNewStockSymbol] = useState('');

  useEffect(() => {
    // In a real app, you might fetch watchlist from a backend here
  }, []);

  const handleAddNewStock = () => {
    if (!newStockSymbol.trim()) {
      toast({
        title: "Error",
        description: "Please enter a stock symbol.",
        variant: "destructive",
      });
      return;
    }
    // Simulate adding a new stock (in a real app, fetch data for this symbol)
    const mockNewStock: WatchlistItem = {
      id: (watchlistItems.length + 1).toString(),
      symbol: newStockSymbol.toUpperCase(),
      name: `${newStockSymbol.toUpperCase()} Company`, // Placeholder name
      price: Math.random() * 500,
      change: (Math.random() * 10) - 5,
      changePercent: (Math.random() * 5) - 2.5,
      marketCap: `${Math.floor(Math.random() * 1000)}B`,
    };
    setWatchlistItems(prevItems => [...prevItems, mockNewStock]);
    setNewStockSymbol('');
    toast({
      title: "Success",
      description: `${mockNewStock.symbol} added to watchlist.`,
      className: "bg-slate-800 text-slate-50 border-slate-700",
    });
  };

  const handleRemoveStock = (id: string) => {
    const stockToRemove = watchlistItems.find(item => item.id === id);
    setWatchlistItems(prevItems => prevItems.filter(item => item.id !== id));
    if (stockToRemove) {
        toast({
            title: "Removed",
            description: `${stockToRemove.symbol} removed from watchlist.`,
            className: "bg-slate-800 text-slate-50 border-slate-700",
        });
    }
  };

  const totalMarketCap = watchlistItems.reduce((sum, item) => {
    // Naive sum, real calculation would need consistent units (B, T)
    const value = parseFloat(item.marketCap.replace(/[BT]$/, ''));
    const multiplier = item.marketCap.endsWith('T') ? 1000 : item.marketCap.endsWith('B') ? 1 : 0;
    return sum + (value * multiplier);
  }, 0);


  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">
      <GlobalHeader />
      <main className="flex-grow pt-16"> {/* pt-16 for fixed GlobalHeader height */}
        <div className="container mx-auto py-8 px-4 md:px-6">
          <section id="watchlist-title-add" className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">
              My Stock Watchlist
            </h1>
            <div className="flex flex-col sm:flex-row gap-2 items-end p-4 bg-slate-900/80 border border-slate-800 rounded-lg shadow-md">
              <div className="flex-grow">
                <label htmlFor="stockSymbolInput" className="block text-sm font-medium text-slate-400 mb-1">Add New Stock</label>
                <Input
                  id="stockSymbolInput"
                  type="text"
                  value={newStockSymbol}
                  onChange={(e) => setNewStockSymbol(e.target.value)}
                  placeholder="Enter stock symbol (e.g., NVDA)"
                  className="h-10 bg-slate-800 border-slate-700 text-slate-100 placeholder-slate-500 focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>
              <Button 
                onClick={handleAddNewStock} 
                className="h-10 bg-cyan-600 hover:bg-cyan-500 text-white w-full sm:w-auto"
              >
                <PlusSquare className="mr-2 h-5 w-5" /> Add to Watchlist
              </Button>
            </div>
          </section>

          <section id="watchlist-summary" className="mb-8">
            <PremiumInfoCard
              title="Watchlist Pulse"
              description="Overview of your currently tracked stocks."
              icon={Activity}
              footerContent={<p className="text-xs text-slate-500">Data updated periodically.</p>}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                <div>
                  <p className="text-sm text-slate-400">Total Stocks Tracked:</p>
                  <p className="text-xl font-semibold text-cyan-400">{watchlistItems.length}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Est. Total Market Cap:</p>
                  <p className="text-xl font-semibold text-cyan-400">${totalMarketCap.toFixed(0)}B (Simplified)</p>
                </div>
              </div>
              <div className="mt-4 h-12 relative bg-slate-800/70 rounded-md flex items-center justify-center p-2 border border-slate-700/50">
                <span className="text-xs text-slate-400 mr-4">Overall Watchlist Activity Level:</span>
                {/* Conceptual use of InteractiveDataPoint */}
                <div className="relative w-1/2 h-full flex items-center">
                   <InteractiveDataPoint
                    x={watchlistItems.length > 0 ? (watchlistItems.filter(s => s.change > 0).length / watchlistItems.length) * 100 : 50} // Position based on positive changes
                    y={50}
                    value={`${((watchlistItems.filter(s => s.change > 0).length / watchlistItems.length) * 100 || 0).toFixed(0)}% Up`}
                    label="Positive Movers"
                    size={10}
                    color={watchlistItems.filter(s => s.change > 0).length > watchlistItems.filter(s => s.change < 0).length ? "bg-green-500" : "bg-red-500"}
                    isSignificantEvent={Math.abs(watchlistItems.reduce((acc, s) => acc + s.changePercent, 0)) > 1} // Example significance
                    className="opacity-90"
                  />
                </div>
              </div>
            </PremiumInfoCard>
          </section>

          <section id="watchlist-table">
            <ScrollArea className="h-[calc(100vh-480px)] md:h-[calc(100vh-420px)] border border-slate-800 rounded-lg shadow-lg bg-slate-900/80"> {/* Adjust height dynamically or set fixed */}
              <Table className="min-w-full">
                <TableHeader className="sticky top-0 bg-slate-850/90 backdrop-blur-sm z-10">
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Symbol</TableHead>
                    <TableHead className="text-slate-300 hidden sm:table-cell">Name</TableHead>
                    <TableHead className="text-slate-300 text-right">Price</TableHead>
                    <TableHead className="text-slate-300 text-right hidden md:table-cell">Change</TableHead>
                    <TableHead className="text-slate-300 text-right">% Change</TableHead>
                    <TableHead className="text-slate-300 text-right hidden lg:table-cell">Market Cap</TableHead>
                    <TableHead className="text-slate-300 text-center hidden sm:table-cell">Mini Chart</TableHead>
                    <TableHead className="text-slate-300 text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {watchlistItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-slate-500 py-10 border-slate-800">
                        Your watchlist is empty. Add stocks using the form above.
                      </TableCell>
                    </TableRow>
                  ) : (
                    watchlistItems.map((stock) => (
                      <TableRow key={stock.id} className="border-slate-800 hover:bg-slate-800/70 transition-colors">
                        <TableCell className="font-medium text-cyan-400">{stock.symbol}</TableCell>
                        <TableCell className="text-slate-400 hidden sm:table-cell">{stock.name}</TableCell>
                        <TableCell className="text-right text-slate-200">${stock.price.toFixed(2)}</TableCell>
                        <TableCell 
                            className={`text-right hidden md:table-cell ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}
                        </TableCell>
                        <TableCell 
                            className={`text-right font-semibold ${stock.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}
                        >
                            {stock.changePercent >= 0 ? <TrendingUp className="inline h-4 w-4 mr-1" /> : <TrendingDown className="inline h-4 w-4 mr-1" /> }
                            {stock.changePercent.toFixed(2)}%
                        </TableCell>
                        <TableCell className="text-right text-slate-400 hidden lg:table-cell">{stock.marketCap}</TableCell>
                        <TableCell className="text-center hidden sm:table-cell">
                          <BarChartBig className="h-6 w-6 mx-auto text-slate-600 hover:text-cyan-500 transition-colors" />
                        </TableCell>
                        <TableCell className="text-center space-x-1">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => navigate(`/stock-detail?symbol=${stock.symbol}`)} // Path from App.tsx
                            className="border-cyan-700 text-cyan-400 hover:bg-cyan-700/30 hover:text-cyan-300 px-2 py-1 h-auto"
                            title="View Details"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            onClick={() => handleRemoveStock(stock.id)}
                            className="bg-red-700/80 hover:bg-red-600/80 text-red-100 px-2 py-1 h-auto"
                            title="Remove from Watchlist"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </section>
        </div>
      </main>
      <GlobalFooter />
    </div>
  );
};

export default WatchlistPage;