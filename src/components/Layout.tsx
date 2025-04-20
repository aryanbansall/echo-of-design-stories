
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import AvatarAssistant from "./AvatarAssistant";
import SocialPresence from "./SocialPresence";
import { preloadAudioEffects } from "../utils/audioUtils";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload audio effects
    preloadAudioEffects();
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <motion.div
            className="w-16 h-16 bg-portfolio-purple rounded-full flex items-center justify-center mb-4"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 0, 360],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <span className="font-serif text-white font-bold text-3xl">D</span>
          </motion.div>
          <p className="text-muted-foreground">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        onMenuToggle={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />
      
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main className="flex-1 pt-16">
        {children}
      </main>
      
      <Footer />
      
      <AvatarAssistant />
      <SocialPresence />
    </div>
  );
};

export default Layout;
