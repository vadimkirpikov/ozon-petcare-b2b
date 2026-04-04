import React from 'react';
import { cn } from './Card'; // reuse utils
import { ShieldCheck, Sparkles } from 'lucide-react';

const badgeVariants = {
  default: "bg-gray-100 text-gray-800",
  primary: "bg-brand-50 text-brand-700",
  success: "bg-green-50 text-green-700 border-green-100",
  warning: "bg-orange-50 text-orange-700 border-orange-100",
  destructive: "bg-red-50 text-red-700 border-red-100",
  ozon: "bg-ozon-50 text-ozon-600 border-ozon-100",
  outline: "text-gray-800 border border-gray-200"
};

const Badge = ({ children, variant = 'default', className, icon, ...props }) => {
  return (
    <div 
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border border-transparent transition-colors",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {icon === 'ozon' && <ShieldCheck size={14} className="mr-1.5 text-brand-600" />}
      {icon === 'premium' && <Sparkles size={14} className="mr-1.5 text-ozon-500" />}
      {children}
    </div>
  );
};

export { Badge };
