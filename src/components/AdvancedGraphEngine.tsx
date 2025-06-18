import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, LineChart as LineChartIcon, BarChartBig, Grid3x3, AreaChart as AreaChartIcon } from 'lucide-react';
import InteractiveDataPoint from '@/components/InteractiveDataPoint'; // Assuming this custom component exists

// Define a type for stock data points
interface StockDataPoint {
  id: string | number;
  date: string; // Or Date object
  value: number;
  volume?: number;
  [key: string]: any; 
}

interface AdvancedGraphEngineProps {
  stockSymbol: string;
  initialData?: StockDataPoint[];
  onInteraction?: (type: string, details: any) => void; // Callback for parent component interactions
}

type VisualizationType = 'line' | 'heatmap' | '3dbar' | 'surface';

const AdvancedGraphEngine: React.FC<AdvancedGraphEngineProps> = ({
  stockSymbol,
  initialData = [],
  onInteraction,
}) => {
  console.log(`AdvancedGraphEngine loaded for symbol: ${stockSymbol}`);

  const [activeViz, setActiveViz] = useState<VisualizationType>('line');
  const [graphData, setGraphData] = useState<StockDataPoint[]>(initialData);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [timeframe, setTimeframe] = useState<string>('1Y');

  // Simulate data fetching or updates
  useEffect(() => {
    console.log(`AdvancedGraphEngine: Updating data for ${stockSymbol}, timeframe: ${timeframe}, viz: ${activeViz}`);
    // Placeholder: In a real app, fetch/process data based on props
    const mockData: StockDataPoint[] = Array.from({ length: Math.floor(Math.random() * 10) + 5 }, (_, i) => ({
      id: `dp-${i}`,
      date: new Date(Date.now() - (i * 24*60*60*1000)).toISOString().split('T')[0],
      value: 100 + Math.random() * 20 - 10,
      volume: 100000 + Math.random() * 50000,
    }));
    setGraphData(mockData);
    onInteraction?.('dataUpdate', { symbol: stockSymbol, timeframe, viz: activeViz, count: mockData.length });
  }, [stockSymbol, timeframe, activeViz, onInteraction]);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    const newZoomLevel = direction === 'in' ? zoomLevel * 1.2 : zoomLevel / 1.2;
    setZoomLevel(newZoomLevel);
    onInteraction?.('zoom', { direction, newLevel: newZoomLevel });
  }, [zoomLevel, onInteraction]);

  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
  };

  const renderVisualizationContent = () => {
    const vizBaseStyle = "h-[350px] md:h-[450px] rounded-lg p-4 md:p-6 flex flex-col items-center justify-center text-center bg-gray-800/40 dark:bg-black/30 border border-gray-700/60 dark:border-gray-800/50 shadow-inner relative overflow-hidden";
    const titleStyle = "text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500";
    const descriptionStyle = "text-xs md:text-sm text-gray-400 dark:text-gray-500 mt-2 max-w-md";

    // Conceptual placeholder for InteractiveDataPoints
    const interactivePointsDisplay = graphData.length > 0 ? (
      <div className="absolute bottom-4 left-4 flex gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
        {graphData.slice(0, 2).map(dp => (
          <InteractiveDataPoint
            key={dp.id}
            data={dp}
            className="p-1 bg-gray-700/50 dark:bg-black/50 rounded text-[10px] text-gray-300 dark:text-gray-400"
            // In a real scenario, InteractiveDataPoint would be positioned based on graph coordinates
            // This is a simplified representation.
          >
            {dp.id}
          </InteractiveDataPoint>
        ))}
      </div>
    ) : null;

    switch (activeViz) {
      case 'line':
        return (
          <div className={`${vizBaseStyle} group`}>
            <LineChartIcon size={40} className="text-blue-500 mb-3 opacity-60" />
            <h3 className={titleStyle}>Animated Trend Lines & Price Plot</h3>
            <p className={descriptionStyle}>
              Visualizing price for {stockSymbol}. Trend lines draw with motion. Data points are interactive. (Conceptual)
            </p>
            {interactivePointsDisplay}
          </div>
        );
      case 'heatmap':
        return (
          <div className={vizBaseStyle}>
            <Grid3x3 size={40} className="text-green-500 mb-3 opacity-60" />
            <h3 className={titleStyle}>Dynamic Financial Heatmap</h3>
            <p className={descriptionStyle}>
              Intensity of financial metrics (e.g., volatility, volume) across periods. (Conceptual)
            </p>
          </div>
        );
      case '3dbar':
        return (
          <div className={vizBaseStyle}>
            <BarChartBig size={40} className="text-purple-500 mb-3 opacity-60" />
            <h3 className={titleStyle}>Animated 3D Bar Chart</h3>
            <p className={descriptionStyle}>
              Data like volume or sector performance in 3D with smooth transitions. (Conceptual)
            </p>
          </div>
        );
      case 'surface':
        return (
          <div className={vizBaseStyle}>
            <AreaChartIcon size={40} className="text-yellow-500 mb-3 opacity-60" />
            <h3 className={titleStyle}>Fluid Surface Plot</h3>
            <p className={descriptionStyle}>
              Exploring multi-variable relationships, e.g., options pricing surfaces. (Conceptual)
            </p>
          </div>
        );
      default:
        return <p className="text-red-500">Error: Unknown visualization type.</p>;
    }
  };

  const timeframes = ['1D', '5D', '1M', '6M', '1Y', 'MAX'];
  const vizTypes: { id: VisualizationType; label: string; icon: React.ElementType }[] = [
    { id: 'line', label: 'Trend Plot', icon: LineChartIcon },
    { id: 'heatmap', label: 'Heatmap', icon: Grid3x3 },
    { id: '3dbar', label: '3D Volume', icon: BarChartBig },
    { id: 'surface', label: 'Surface Plot', icon: AreaChartIcon },
  ];

  return (
    <Card className="bg-gray-900/70 dark:bg-black/70 backdrop-blur-xl border border-gray-700/50 dark:border-gray-800/50 shadow-2xl text-gray-200 dark:text-gray-300 w-full overflow-hidden">
      <CardHeader className="pb-3 pt-4 px-3 md:px-4 border-b border-gray-700/50 dark:border-gray-800/50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400">
            Analysis Engine: {stockSymbol.toUpperCase()}
          </CardTitle>
          <div className="flex gap-1 flex-wrap">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? "default" : "outline"}
                size="sm"
                onClick={() => handleTimeframeChange(tf)}
                className={`
                  text-xs px-1.5 md:px-2 py-0.5 h-auto rounded-md
                  ${timeframe === tf 
                    ? 'bg-sky-600 hover:bg-sky-500 text-white border-sky-600' 
                    : 'text-gray-300 dark:text-gray-400 border-gray-600 dark:border-gray-700 hover:bg-gray-700/50 hover:text-white dark:hover:bg-gray-800/50'}
                `}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-2 md:p-4">
        <Tabs value={activeViz} onValueChange={(value) => setActiveViz(value as VisualizationType)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 bg-transparent p-0 mb-3 md:mb-4">
            {vizTypes.map(vt => (
              <TabsTrigger
                key={vt.id}
                value={vt.id}
                className="flex-1 py-1.5 md:py-2 px-1 text-[11px] sm:text-xs md:text-sm data-[state=active]:bg-sky-700/70 dark:data-[state=active]:bg-sky-600/70 data-[state=active]:text-white data-[state=active]:shadow-lg hover:bg-gray-700/40 dark:hover:bg-gray-800/40 text-gray-300 dark:text-gray-400 border border-gray-700/50 dark:border-gray-800/50 rounded-md transition-all duration-150"
              >
                <vt.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 mr-1 md:mr-1.5 opacity-70" /> {vt.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeViz} // Key change triggers animation
              initial={{ opacity: 0.6, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="min-h-[370px] md:min-h-[470px]" // Maintain height during transitions
            >
              {renderVisualizationContent()}
            </motion.div>
          </AnimatePresence>
        </Tabs>

        <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-gray-700/50 dark:border-gray-800/50 flex flex-wrap gap-2 justify-start items-center px-1">
          <Button variant="outline" size="sm" onClick={() => handleZoom('in')} className="text-gray-300 dark:text-gray-400 border-gray-600 dark:border-gray-700 hover:bg-gray-700/50 dark:hover:bg-gray-800/50 text-xs">
            <ZoomIn className="mr-1.5 h-3.5 w-3.5" /> Zoom In
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleZoom('out')} className="text-gray-300 dark:text-gray-400 border-gray-600 dark:border-gray-700 hover:bg-gray-700/50 dark:hover:bg-gray-800/50 text-xs">
            <ZoomOut className="mr-1.5 h-3.5 w-3.5" /> Zoom Out
          </Button>
          <span className="text-xs text-gray-400 dark:text-gray-500 ml-2">Zoom: {zoomLevel.toFixed(1)}x</span>
        </div>

        <p className="mt-3 md:mt-4 text-[10px] md:text-xs text-gray-500 dark:text-gray-600 text-center">
          Note: Graph visualizations are conceptual placeholders. Actual rendering requires specialized logic.
          <br />Active: {activeViz} | Data Points (mock): {graphData.length}
        </p>
      </CardContent>
    </Card>
  );
};

export default AdvancedGraphEngine;