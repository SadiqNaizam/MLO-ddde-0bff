import React from 'react';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils'; // Assuming utils.ts exists for cn

interface InteractiveDataPointProps {
  x: number; // Percentage or pixel value for horizontal position
  y: number; // Percentage or pixel value for vertical position
  value: string | number;
  label?: string; // Optional label for the data (e.g., "Price", "Volume")
  timestamp?: string; // Optional timestamp (e.g., "2024-07-26 10:30 AM")
  isAnomaly?: boolean;
  isSignificantEvent?: boolean;
  color?: string; // Custom base color for the point
  size?: number; // Base size (diameter) in pixels
  animationDelay?: number; // Delay for entry animation in seconds
  className?: string; // Allow additional classes
}

const InteractiveDataPoint: React.FC<InteractiveDataPointProps> = ({
  x,
  y,
  value,
  label,
  timestamp,
  isAnomaly = false,
  isSignificantEvent = false,
  color = 'bg-cyan-400', // Default to a neon-like blue/green
  size = 8, // Default size 8px
  animationDelay = 0,
  className,
}) => {
  console.log('InteractiveDataPoint loaded for value:', value);

  const pointSize = isSignificantEvent ? size * 1.5 : size;
  
  let pointColor = color;
  if (isAnomaly) {
    pointColor = 'bg-red-500'; // Anomaly color
  } else if (isSignificantEvent && color === 'bg-cyan-400') {
    // Default significant event color if not anomaly and base color is default
    pointColor = 'bg-yellow-400';
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          className={cn(
            'absolute rounded-full cursor-pointer shadow-md hover:shadow-lg transition-all duration-150',
            pointColor,
            className
          )}
          style={{
            width: `${pointSize}px`,
            height: `${pointSize}px`,
            top: `${y}%`, // Assuming y is a percentage
            left: `${x}%`, // Assuming x is a percentage
            transform: 'translate(-50%, -50%)', // Center the point
            borderColor: isSignificantEvent ? (isAnomaly ? 'rgba(255,0,0,0.5)' : 'rgba(255,255,0,0.5)') : 'transparent',
            borderWidth: isSignificantEvent ? Math.max(2, pointSize / 5) : 0, // Add a border for significant events
            boxShadow: isSignificantEvent ? `0 0 ${pointSize/2}px ${isAnomaly ? 'rgba(255,0,0,0.7)' : 'rgba(255,255,0,0.7)'}` : undefined,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: animationDelay, ease: "easeOut" }}
          whileHover={{ scale: 1.3, boxShadow: `0 0 ${pointSize}px ${isAnomaly ? 'rgba(255,0,0,0.9)' : pointColor.includes('cyan') ? 'rgba(0,255,255,0.7)' : 'rgba(255,255,0,0.7)'}` }}
        />
      </TooltipTrigger>
      <TooltipContent
        side="top"
        className="bg-gray-900 text-white border-gray-700 shadow-xl rounded-md p-3 dark" // Ensure dark theme for tooltip
      >
        {label && <p className="font-semibold text-sm text-gray-300">{label}</p>}
        <p className="text-base font-bold">Value: {value}</p>
        {timestamp && <p className="text-xs text-gray-400">{timestamp}</p>}
        {isAnomaly && (
          <p className="text-xs text-red-400 font-bold mt-1">
            Anomaly Detected
          </p>
        )}
        {isSignificantEvent && !isAnomaly && ( // Don't show if already marked as anomaly
          <p className="text-xs text-yellow-400 font-bold mt-1">
            Significant Event
          </p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export default InteractiveDataPoint;