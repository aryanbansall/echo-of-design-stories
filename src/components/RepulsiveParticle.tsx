
import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface RepulsiveParticleProps {
  className?: string;
}

const RepulsiveParticle: React.FC<RepulsiveParticleProps> = ({ className }) => {
  const particleRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Create spring physics for smooth movement
  const springConfig = { damping: 20, stiffness: 100 };
  const x = useSpring(useMotionValue(Math.random() * window.innerWidth), springConfig);
  const y = useSpring(useMotionValue(Math.random() * window.innerHeight), springConfig);
  
  // Calculate repulsion force based on mouse position
  const repulsionDistance = 300; // Max distance where repulsion is felt
  const repulsionStrength = 100; // Strength of repulsion
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update mouse position
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!particleRef.current) return;
      
      // Get particle position
      const rect = particleRef.current.getBoundingClientRect();
      const particleCenterX = rect.left + rect.width / 2;
      const particleCenterY = rect.top + rect.height / 2;
      
      // Calculate distance between mouse and particle
      const dx = e.clientX - particleCenterX;
      const dy = e.clientY - particleCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Apply repulsion if mouse is close enough
      if (distance < repulsionDistance) {
        // Calculate repulsion force (inverse to distance)
        const force = (repulsionDistance - distance) / repulsionDistance;
        
        // Calculate repulsion direction (away from mouse)
        const angle = Math.atan2(dy, dx);
        const repulsionX = -Math.cos(angle) * force * repulsionStrength;
        const repulsionY = -Math.sin(angle) * force * repulsionStrength;
        
        // Apply repulsion to particle's position
        const newX = particleCenterX + repulsionX;
        const newY = particleCenterY + repulsionY;
        
        // Set new position with boundaries
        x.set(Math.max(50, Math.min(window.innerWidth - 50, newX)));
        y.set(Math.max(50, Math.min(window.innerHeight - 50, newY)));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, x, y]);

  // Use opacity based on distance for a subtle effect
  const opacity = useTransform(
    [x, y, mouseX, mouseY],
    ([latestX, latestY, latestMouseX, latestMouseY]) => {
      const dx = latestX - latestMouseX;
      const dy = latestY - latestMouseY;
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
