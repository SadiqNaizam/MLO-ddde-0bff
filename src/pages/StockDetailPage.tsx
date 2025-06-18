import React from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import GlobalHeader from '@/components/layout/GlobalHeader';
import GlobalFooter from '@/components/layout/GlobalFooter';
import AdvancedGraphEngine from '@/components/AdvancedGraphEngine';
import PremiumInfoCard from '@/components/PremiumInfoCard';

// shadcn/ui Components
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast as sonnerToast } from "sonner"; // For "Add to Watchlist" confirmation, as per user journey and App.tsx setup

// Lucide Icons
import { BookmarkPlus, Home, BarChart2, Newspaper, Building2, Activity, TrendingUp } from 'lucide-react';

// Placeholder data
// In a real app, this might come from route params (e.g., useParams) or global state after search/selection.
const stockSymbol = "AAPL"; 

const financialData = [
  { metric: 'Market Cap', value: '$2.75T', period: 'Current' },
  { metric: 'P/E Ratio', value: '28.50', period: 'TTM' },
  { metric: 'EPS', value: '$6.15', period: 'TTM' },
  { metric: 'Dividend Yield', value: '0.55%', period: 'Annual' },
  { metric: 'Beta', value: '1.20', period: '5Y Monthly' },
  { metric: '52 Week High', value: '$199.62', period: '' },
  { metric: '52 Week Low', value: '$164.08', period: '' },
];

const newsItems = [
  { id: 'n1', title: 'Apple Unveils New Vision Pro Features', source: 'Tech Chronicle', date: '2024-07-28', summary: 'Future updates promise enhanced mixed reality experiences for the groundbreaking headset.' },
  { id: 'n2', title: 'Analysts Upbeat on AAPL Q3 Earnings', source: 'MarketWatch', date: '2024-07-27', summary: 'Strong iPhone sales and continued services growth are expected to drive positive results.' },
  { id: 'n3', title: 'Apple Expands into AI with New Chipset', source: 'Bloomberg', date: '2024-07-26', summary: 'The M4 chip successor is rumored to have significantly advanced AI capabilities, positioning Apple strongly in the AI race.' },
];

const companyProfile = {
  name: 'Apple Inc.',
  sector: 'Technology',
  industry: 'Consumer Electronics',
  ceo: 'Timothy D. Cook',
  founded: '1976',
  headquarters: 'Cupertino, California, USA',
  employees: '160,000+',
  description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services. The company is known for its innovative hardware, software, and services, creating a unique ecosystem that has garnered a loyal customer base and drives significant brand value.',
};


const StockDetailPage: React.FC = () => {
  console.log('StockDetailPage loaded');

  const handleAddToWatchlist = () => {
    sonnerToast.success(`${stockSymbol} added to watchlist!`, {
      description: `You'll now receive updates for ${stockSymbol}.`,
      action: {
        label: 'View Watchlist',
        onClick: () => {
          console.log('Navigate to watchlist page programmatically');
          // This would typically use react-router's navigate function
          // navigate('/watchlist');
        },
      },
      // Custom styling for Sonner toasts can be done globally or per toast if needed
      // to match the "neon accent" feel.
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100 selection:bg-cyan-500 selection:text-white">
      <GlobalHeader /> {/* Fixed header, height is h-16 (64px) */}
      
      <div className="flex flex-col flex-1 mt-16 overflow-hidden"> 
        <ScrollArea className="flex-1 bg-gray-950"> {/* ScrollArea takes up available space */}
          <main className="container mx-auto py-6 md:py-8 px-4 md:px-6">
            <section id="breadcrumb-section" aria-label="Breadcrumbs" className="mb-6 md:mb-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/" className="flex items-center gap-1.5 text-gray-400 hover:text-cyan-400 transition-colors">
                        <Home className="h-4 w-4" /> Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {/* Path based on App.tsx. '/stock-detail' is the page itself. */}
                    {/* We can consider a conceptual "Stocks" landing/search page if one existed */}
                    <span className="text-gray-400 flex items-center gap-1.5">
                       <TrendingUp className="h-4 w-4" /> Stocks
                    </span>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="font-semibold text-cyan-300">{stockSymbol.toUpperCase()}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </section>

            <section id="graph-engine-section" aria-labelledby="graph-engine-title" className="mb-8 md:mb-10">
              <AdvancedGraphEngine 
                stockSymbol={stockSymbol} 
                initialData={[]} // Example: pass empty or fetched initial data
                onInteraction={(type, details) => console.log('AdvancedGraphEngine interaction:', type, details)}
              />
            </section>

            <section id="stock-details-tabs-section" aria-label="Detailed stock information" className="mb-8 md:mb-10">
              <Tabs defaultValue="financials" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-800/60 backdrop-blur-sm p-1.5 rounded-lg mb-6 border border-slate-700/70 shadow-md">
                  {[{value: "financials", label: "Financials", icon: BarChart2},
                   {value: "news", label: "News", icon: Newspaper},
                   {value: "profile", label: "Company Info", icon: Building2}].map(tab => (
                    <TabsTrigger 
                      key={tab.value} 
                      value={tab.value} 
                      className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-slate-700/80 transition-all py-2.5 text-sm font-medium text-gray-300 rounded-md flex items-center justify-center gap-2"
                    >
                      <tab.icon className="h-4 w-4 opacity-80" />{tab.label}
                    </TabsTrigger>
                   ))}
                </TabsList>

                <TabsContent value="financials">
                  <PremiumInfoCard title="Key Financials" icon={BarChart2} className="bg-slate-900/70 border-slate-700/80">
                    <div className="overflow-x-auto">
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow className="border-b-slate-700">
                            <TableHead className="text-slate-300 font-semibold px-4 py-3">Metric</TableHead>
                            <TableHead className="text-slate-300 font-semibold px-4 py-3">Value</TableHead>
                            <TableHead className="text-slate-300 font-semibold px-4 py-3 text-right">Period/Note</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {financialData.map((item) => (
                            <TableRow key={item.metric} className="border-b-slate-800 hover:bg-slate-800/40 transition-colors duration-150">
                              <TableCell className="font-medium text-slate-100 px-4 py-3.5">{item.metric}</TableCell>
                              <TableCell className="text-slate-200 px-4 py-3.5">{item.value}</TableCell>
                              <TableCell className="text-slate-400 text-xs px-4 py-3.5 text-right">{item.period}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </PremiumInfoCard>
                </TabsContent>

                <TabsContent value="news">
                  <PremiumInfoCard title={`Recent News - ${stockSymbol}`} icon={Newspaper} className="bg-slate-900/70 border-slate-700/80">
                    <div className="space-y-5">
                      {newsItems.map((news) => (
                        <article key={news.id} className="p-4 bg-slate-800/60 rounded-lg border border-slate-700/70 hover:border-cyan-500/70 transition-all duration-200 shadow-sm hover:shadow-md">
                          <h3 className="text-md font-semibold text-cyan-400 mb-1.5">{news.title}</h3>
                          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                            <span>{news.source}</span>
                            <time dateTime={news.date}>{new Date(news.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                          </div>
                          <p className="text-sm text-slate-300 leading-relaxed">{news.summary}</p>
                        </article>
                      ))}
                      {newsItems.length === 0 && <p className="text-slate-400 text-center py-4">No recent news available for {stockSymbol}.</p>}
                    </div>
                  </PremiumInfoCard>
                </TabsContent>

                <TabsContent value="profile">
                  <PremiumInfoCard title={`Profile: ${companyProfile.name}`} icon={Building2} className="bg-slate-900/70 border-slate-700/80">
                    <div className="space-y-3 text-sm text-slate-200 leading-relaxed">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                        <p><strong className="text-slate-400 font-medium">Sector:</strong> {companyProfile.sector}</p>
                        <p><strong className="text-slate-400 font-medium">Industry:</strong> {companyProfile.industry}</p>
                        <p><strong className="text-slate-400 font-medium">CEO:</strong> {companyProfile.ceo}</p>
                        <p><strong className="text-slate-400 font-medium">Founded:</strong> {companyProfile.founded}</p>
                        <p><strong className="text-slate-400 font-medium">Headquarters:</strong> {companyProfile.headquarters}</p>
                        <p><strong className="text-slate-400 font-medium">Employees:</strong> {companyProfile.employees}</p>
                      </div>
                      <p className="mt-4 pt-4 border-t border-slate-700/70 text-slate-300">{companyProfile.description}</p>
                    </div>
                  </PremiumInfoCard>
                </TabsContent>
              </Tabs>
            </section>
            
            <section id="actions-section" aria-label="Stock actions" className="my-8 md:my-12 flex justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-600 hover:via-sky-600 hover:to-blue-700 text-white font-semibold shadow-xl hover:shadow-cyan-500/50 focus:ring-4 focus:ring-cyan-400/50 transition-all duration-300 ease-in-out transform hover:scale-105 px-10 py-3.5 text-base rounded-lg"
                onClick={handleAddToWatchlist}
              >
                <BookmarkPlus className="mr-2.5 h-5 w-5" /> Add {stockSymbol} to Watchlist
              </Button>
            </section>

            <section id="additional-info-section" aria-label="Additional stock information" className="mb-8 md:mb-10">
              <PremiumInfoCard title="Analyst Consensus" icon={Activity} className="bg-slate-900/70 border-slate-700/80">
                  <div className="text-center py-2">
                    <p className="text-5xl font-bold text-green-400 mb-2 tracking-tight">BUY</p>
                    <p className="text-sm text-slate-400 mb-4">(Based on 25 analyst ratings for {stockSymbol})</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-300">
                        <div className="p-2 bg-slate-800/50 rounded-md"><span className="font-semibold text-green-400">Strong Buy:</span> 15</div>
                        <div className="p-2 bg-slate-800/50 rounded-md"><span className="font-semibold text-green-500">Buy:</span> 5</div>
                        <div className="p-2 bg-slate-800/50 rounded-md"><span className="font-semibold text-yellow-500">Hold:</span> 5</div>
                        <div className="p-2 bg-slate-800/50 rounded-md"><span className="font-semibold text-red-500">Sell:</span> 0</div>
                    </div>
                  </div>
              </PremiumInfoCard>
            </section>

          </main>
        </ScrollArea>
        <GlobalFooter /> {/* Footer is outside ScrollArea, at the bottom */}
      </div>
    </div>
  );
};

export default StockDetailPage;