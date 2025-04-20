
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface RepulsiveParticleProps {
  className?: string;
}

const RepulsiveParticle: React.FC<RepulsiveParticleProps> = ({ className }) => {
  const particleRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 100 };
  const x = useSpring(useMotionValue(Math.random() * window.innerWidth), springConfig);
  const y = useSpring(useMotionValue(Math.random() * window.innerHeight), springConfig);
  
  const repulsionDistance = 300;
  const repulsionStrength = 100;
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!particleRef.current) return;
      
      const rect = particleRef.current.getBoundingClientRect();
      const particleCenterX = rect.left + rect.width / 2;
      const particleCenterY = rect.top + rect.height / 2;
      
      const dx = Number(e.clientX) - Number(particleCenterX);
      const dy = Number(e.clientY) - Number(particleCenterY);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < repulsionDistance) {
        const force = (repulsionDistance - distance) / repulsionDistance;
        const angle = Math.atan2(dy, dx);
        const repulsionX = -Math.cos(angle) * force * repulsionStrength;
        const repulsionY = -Math.sin(angle) * force * repulsionStrength;
        
        const newX = particleCenterX + repulsionX;
        const newY = particleCenterY + repulsionY;
        
        x.set(Math.max(50, Math.min(window.innerWidth - 50, newX)));
        y.set(Math.max(50, Math.min(window.innerHeight - 50, newY)));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, x, y]);

  const opacity = useTransform(
    [x, y, mouseX, mouseY],
    ([latestX, latestY, latestMouseX, latestMouseY]) => {
      const dx = Number(latestX) - Number(latestMouseX);
      const dy = Number(latestY) - Number(latestMouseY);
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      return Math.min(1, Math.max(0.2, distance / (repulsionDistance * 1.5)));
    }
  );

  return (
    <motion.div 
      ref={particleRef}
      className={`absolute rounded-full bg-primary/40 blur-md ${className}`}
      style={{ 
        x,
        y,
        opacity,
        width: '80px',
        height: '80px',
      }}
      animate={{ 
        scale: [1, 1.1, 0.9, 1],
      }}
      transition={{ 
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

export default RepulsiveParticle;
