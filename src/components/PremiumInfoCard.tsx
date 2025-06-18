import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
// import { Info } from 'lucide-react'; // Example: Users can pass any lucide icon or custom SVG icon component

interface PremiumInfoCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ElementType; // e.g., a Lucide icon component
  footerContent?: React.ReactNode;
}

const PremiumInfoCard: React.FC<PremiumInfoCardProps> = ({
  title,
  description,
  children,
  className,
  icon: IconComponent,
  footerContent,
}) => {
  console.log('PremiumInfoCard loaded', { title });

  return (
    <Card
      className={cn(
        "bg-slate-900/70 backdrop-blur-lg", // Glassmorphism base: semi-transparent dark background with blur
        "border border-slate-700/80", // Subtle base border
        "text-slate-100", // Default light text for dark theme
        "rounded-xl overflow-hidden", // Rounded corners and content clipping
        "transition-all duration-300 ease-out", // Smooth transitions for hover effects
        "hover:border-cyan-500/90", // Metallic accent: border color changes on hover
        "hover:shadow-xl hover:shadow-cyan-500/30", // Subtle glow effect on hover
        "hover:scale-[1.015]", // Slight zoom effect on hover
        className // Allow consumers to pass additional classes
      )}
    >
      {(title || IconComponent || description) && (
        <CardHeader className={cn(
          "p-4",
          (children || footerContent) && "border-b border-slate-800" // Metallic-like divider if there's content/footer below
        )}>
          <div className="flex items-center space-x-3">
            {IconComponent && <IconComponent className="h-6 w-6 text-cyan-400 flex-shrink-0" />}
            {title && <CardTitle className="text-lg md:text-xl font-semibold text-slate-50 leading-tight">{title}</CardTitle>}
          </div>
          {description && <p className="text-sm text-slate-400 mt-2 leading-relaxed">{description}</p>}
        </CardHeader>
      )}
      
      <CardContent className="p-4 md:p-6">
        {children}
      </CardContent>

      {footerContent && (
        <CardFooter className={cn(
          "p-4",
          "border-t border-slate-800", // Metallic-like divider
          "bg-slate-900/50" // Slightly different background for footer distinction
        )}>
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

export default PremiumInfoCard;