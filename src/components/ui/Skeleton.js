import React from 'react';
import { cn } from './Card';

const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn("animate-pulse rounded-xl bg-gray-200", className)}
      {...props}
    />
  );
};

export { Skeleton };
