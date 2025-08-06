import React from 'react';

interface PrismLogoProps {
  size?: number;
  className?: string;
}

export const PrismLogo: React.FC<PrismLogoProps> = ({ size = 32, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Prism triangular shape */}
      <path
        d="M16 4 L26 16 L16 28 L6 16 Z"
        fill="hsl(var(--primary))"
        stroke="hsl(var(--primary-foreground))"
        strokeWidth="0.5"
        opacity="0.9"
      />
      
      {/* Single incoming light ray */}
      <line
        x1="2"
        y1="16"
        x2="6"
        y2="16"
        stroke="hsl(var(--foreground))"
        strokeWidth="2"
        opacity="0.8"
      />
      
      {/* Multiple outgoing light rays - spectrum colors */}
      <line
        x1="26"
        y1="16"
        x2="30"
        y2="12"
        stroke="#ff4444"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <line
        x1="26"
        y1="16"
        x2="30"
        y2="14"
        stroke="#ff8844"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="26"
        y1="16"
        x2="30"
        y2="16"
        stroke="#ffff44"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <line
        x1="26"
        y1="16"
        x2="30"
        y2="18"
        stroke="#44ff44"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="26"
        y1="16"
        x2="30"
        y2="20"
        stroke="#4488ff"
        strokeWidth="1.5"
        opacity="0.9"
      />
      
      {/* Inner light reflection */}
      <polygon
        points="16,8 22,16 16,24 10,16"
        fill="url(#prismGradient)"
        opacity="0.3"
      />
      
      <defs>
        <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.2" />
          <stop offset="50%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
};