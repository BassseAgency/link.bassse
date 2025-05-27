import React from 'react';
import { useDesign } from '../hooks/useDesign';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'medium', className = '' }) => {
  const { primaryColor } = useDesign();
  
  const sizes = {
    small: { width: 120, height: 36, fontSize: 12, textSize: 8 },
    medium: { width: 160, height: 48, fontSize: 16, textSize: 10 },
    large: { width: 200, height: 60, fontSize: 18, textSize: 14 }
  };
  
  const currentSize = sizes[size];
  
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg 
        width={currentSize.width} 
        height={currentSize.height} 
        viewBox="0 0 200 60" 
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        {/* Cadena de eslabones como en la imagen */}
        <g>
          {/* Primer eslabón (izquierda) */}
          <ellipse 
            cx="25" 
            cy="30" 
            rx="18" 
            ry="25" 
            fill={primaryColor}
            transform="rotate(-45 25 30)"
          />
          <ellipse 
            cx="25" 
            cy="30" 
            rx="8" 
            ry="15" 
            fill="white"
            transform="rotate(-45 25 30)"
          />
          
          {/* Segundo eslabón (centro) */}
          <ellipse 
            cx="45" 
            cy="30" 
            rx="18" 
            ry="25" 
            fill={primaryColor}
            transform="rotate(45 45 30)"
          />
          <ellipse 
            cx="45" 
            cy="30" 
            rx="8" 
            ry="15" 
            fill="white"
            transform="rotate(45 45 30)"
          />
          
          {/* Tercer eslabón (derecha) */}
          <ellipse 
            cx="65" 
            cy="30" 
            rx="18" 
            ry="25" 
            fill={primaryColor}
            transform="rotate(-45 65 30)"
          />
          <ellipse 
            cx="65" 
            cy="30" 
            rx="8" 
            ry="15" 
            fill="white"
            transform="rotate(-45 65 30)"
          />
        </g>
        
        {/* Texto LINK.BASSSE */}
        <text 
          x="95" 
          y="25" 
          fontFamily="Arial, sans-serif" 
          fontSize={currentSize.fontSize} 
          fontWeight="bold" 
          fill={primaryColor}
        >
          LINK
        </text>
        <text 
          x="95" 
          y="42" 
          fontFamily="Arial, sans-serif" 
          fontSize={currentSize.textSize} 
          fontWeight="normal" 
          fill="#888"
        >
          BASSSE
        </text>
      </svg>
    </div>
  );
}; 