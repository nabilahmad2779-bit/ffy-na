
import React, { useRef, useState, useEffect } from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
}

const SmartImage: React.FC<SmartImageProps> = ({ src, alt, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [grayscale, setGrayscale] = useState(100);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate the vertical center of the element
      const elementCenter = rect.top + rect.height / 2;
      // Calculate the vertical center of the viewport
      const viewportCenter = windowHeight / 2;
      
      // Distance from center (absolute)
      const distanceFromCenter = Math.abs(viewportCenter - elementCenter);
      
      // Define a "safe zone" in the middle of the screen where image is 100% color
      // Expanded safe zone for better mobile experience
      const safeZone = windowHeight * 0.4; 
      
      let newGrayscale = 100;

      if (distanceFromCenter < safeZone) {
        // Inside safe zone -> Full Color
        newGrayscale = 0;
      } else {
        // Outside safe zone -> Fade to grayscale based on distance
        const fadeZone = windowHeight * 0.2;
        const distanceOutsideSafe = distanceFromCenter - safeZone;
        const ratio = Math.min(distanceOutsideSafe / fadeZone, 1);
        newGrayscale = ratio * 100;
      }
      
      setGrayscale(newGrayscale);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          filter: `grayscale(${grayscale}%)`,
          transform: `scale(${1 + (100 - grayscale) * 0.0002})`, 
          // Slowed down transition significantly as requested
          transition: 'filter 1.5s ease-out, transform 1.5s ease-out' 
        }}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default SmartImage;
