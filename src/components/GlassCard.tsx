import { ReactNode } from 'react';

export const GlassCard = ({ children, className = "", ...props }: { children: ReactNode, className?: string, [key: string]: any }) => (
  <div className={`glass-card p-6 ${className}`} {...props}>
    {children}
  </div>
);
