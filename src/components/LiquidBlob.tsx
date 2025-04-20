
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LiquidBlobProps {
  className?: string;
}

const LiquidBlob: React.FC<LiquidBlobProps> = ({ className }) => {
  const blobRef = useRef<HTMLDivElement>(null);
  const initialX = useRef(Math.random() * 100);
  const initialY = useRef(Math.random() * 100);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate normalized mouse position (0 to 1)
      const normalizedX = clientX / innerWidth;
      const normalizedY = clientY / innerHeight;
      
      // Calculate position with some offset and scaling
      const moveX = normalizedX * 120 - 60;
      const moveY = normalizedY * 120 - 60;
      
      // Apply the transform with slight delay for smooth effect
      blobRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div 
      ref={blobRef}
      className={`blob ${className}`}
      initial={{ 
        x: initialX.current, 
        y: initialY.current,
        scale: 0.8
      }}
      animate={{ 
        scale: [0.8, 1.0, 0.8],
      }}
      transition={{ 
        scale: {
          repeat: Infinity,
          duration: 12,
          ease: "easeInOut"
        },
        x: { duration: 0.8 },
        y: { duration: 0.8 }
      }}
      style={{
        left: `calc(50% - 250px)`,
        top: `calc(50% - 250px)`,
        background: 'radial-gradient(circle, rgba(74,222,128,0.5) 0%, rgba(22,163,74,0.3) 50%, rgba(16,185,129,0.1) 100%)'
      }}
    />
  );
};

export default LiquidBlob;
