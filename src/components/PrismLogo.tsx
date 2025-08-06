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
      <defs>
        {/* Gradients for 3D effect */}
        <linearGradient id="prismFront" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="prismTop" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="prismSide" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      
      {/* 3D Triangular Prism */}
      {/* Front face (triangle) */}
      <path
        d="M16 6 L24 22 L8 22 Z"
        fill="url(#prismFront)"
        stroke="hsl(var(--foreground))"
        strokeWidth="0.3"
      />
      
      {/* Top face (parallelogram) */}
      <path
        d="M16 6 L20 4 L28 20 L24 22 Z"
        fill="url(#prismTop)"
        stroke="hsl(var(--foreground))"
        strokeWidth="0.3"
      />
      
      {/* Right side face (parallelogram) */}
      <path
        d="M24 22 L28 20 L12 20 L8 22 Z"
        fill="url(#prismSide)"
        stroke="hsl(var(--foreground))"
        strokeWidth="0.3"
      />
      
      {/* Single incoming white light ray */}
      <line
        x1="2"
        y1="15"
        x2="8"
        y2="15"
        stroke="hsl(var(--foreground))"
        strokeWidth="2"
        opacity="0.8"
      />
      
      {/* 7 Refracted rays coming out */}
      <line
        x1="28"
        y1="20"
        x2="31"
        y2="16"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="28"
        y1="20"
        x2="31"
        y2="17.5"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="28"
        y1="20"
        x2="31"
        y2="19"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="28"
        y1="20"
        x2="31"
        y2="20"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="28"
        y1="20"
        x2="31"
        y2="21"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="28"
        y1="20"
        x2="31"
        y2="22.5"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        opacity="0.8"
      />
      <line
        x1="28"
        y1="20"
        x2="31"
        y2="24"
        stroke="hsl(var(--foreground))"
        strokeWidth="1.5"
        opacity="0.8"
      />
      
      {/* Inner light reflection for depth */}
      <polygon
        points="16,8 22,20 10,20"
        fill="url(#prismGradient)"
        opacity="0.2"
      />
      
      <linearGradient id="prismGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.3" />
        <stop offset="50%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.6" />
        <stop offset="100%" stopColor="hsl(var(--primary-foreground))" stopOpacity="0.1" />
      </linearGradient>
    </svg>
  );
};