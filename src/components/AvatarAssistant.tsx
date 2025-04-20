
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, User, HelpCircle, Info } from "lucide-react";
import { Button } from "./ui/button";
import { playSoundEffect } from "../utils/audioUtils";

interface AvatarAssistantProps {
  userName?: string;
}

const AvatarAssistant: React.FC<AvatarAssistantProps> = ({ 
  userName = "Designer"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isWaving, setIsWaving] = useState(false);
  const [currentMood, setCurrentMood] = useState<'happy' | 'neutral' | 'curious'>('neutral');
  const avatarRef = useRef<HTMLDivElement>(null);
  const messageQueue = useRef<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const greetingMessage = `${getGreeting()}, ${userName}! I'm your design assistant. Click on me if you need help navigating the portfolio or want to learn more about the design process.`;

  // Initial message when assistant appears
  useEffect(() => {
    const timer = setTimeout(() => {
      showMessage(greetingMessage);
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Set mood based on time of day and activity
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 7 || hour > 22) {
      setCurrentMood('neutral');
    } else if (hour > 9 && hour < 17) {
      setCurrentMood('happy');
    } else {
      setCurrentMood('curious');
    }
  }, []);

  const getRandomTip = () => {
    const tips = [
      "Try exploring the projects section to see my design evolution.",
      "The portfolio adapts to your device and time of day.",
      "Notice how the interface provides visual feedback as you interact with it.",
      "Each project card features 3D transformations on hover.",
      "You can scan QR codes to connect digital content with physical projects.",
      "The site uses multiple interaction modalities: visual, audio, and gesture.",
    ];
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const showMessage = (message: string) => {
    if (currentMessage) {
      // Queue the message if another is currently showing
      messageQueue.current.push(message);
      return;
    }

    setCurrentMessage(message);
    playSoundEffect('notification');
    
    // Clear the message after a duration based on message length
    const duration = Math.max(3000, message.length * 50);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setCurrentMessage("");
      timeoutRef.current = null;
      
      // Process next message in queue
      if (messageQueue.current.length > 0) {
        const nextMessage = messageQueue.current.shift();
        if (nextMessage) showMessage(nextMessage);
      }
    }, duration);
  };

  const handleToggle = () => {
    if (!isOpen) {
      playSoundEffect('open');
      showMessage(getRandomTip());
    } else {
      playSoundEffect('close');
    }
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
    playSoundEffect('minimize');
  };

  const handleAvatarClick = () => {
    if (isMinimized) {
      setIsMinimized(false);
      playSoundEffect('open');
    } else if (!isOpen) {
      handleToggle();
    }
  };

  const handleHelpClick = () => {
    showMessage("Navigate through the sections using the menu. Hover over project cards to see the 3D effect. Try scanning QR codes for additional content.");
  };

  const handleInfoClick = () => {
    showMessage("This portfolio showcases my design process and evolution. It features multiple interaction modalities and integrates context-aware design principles.");
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end">
      {/* Message bubble */}
      <AnimatePresence>
        {currentMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-xs"
          >
            <p className="text-sm">{currentMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar assistant */}
      <div className="relative">
        {/* Avatar circle */}
        <motion.div
          ref={avatarRef}
          className="w-12 h-12 rounded-full bg-portfolio-purple flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAvatarClick}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.div
            animate={isWaving ? { rotateZ: [0, 14, -8, 14, -4, 10, 0] } : {}}
            transition={{ duration: 1.5 }}
          >
            {currentMood === 'happy' && "😊"}
            {currentMood === 'neutral' && "😌"}
            {currentMood === 'curious' && "🤔"}
          </motion.div>
        </motion.div>

        {/* Assistant panel */}
        <AnimatePresence>
          {isOpen && !isMinimized && (
            <motion.div
              className="absolute bottom-14 right-0 w-64 bg-card rounded-lg shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
            >
              <div className="p-3 bg-portfolio-purple text-white flex justify-between items-center">
                <h3 className="text-sm font-medium">Design Assistant</h3>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={handleMinimize}
                  >
                    <span className="sr-only">Minimize</span>
                    <span className="-mt-3 text-lg">_</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-white hover:bg-white/20"
                    onClick={handleToggle}
                  >
                    <span className="sr-only">Close</span>
                    <X size={14} />
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={handleHelpClick}
                  >
                    <HelpCircle size={16} className="mr-2" />
                    How to navigate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={handleInfoClick}
                  >
                    <Info size={16} className="mr-2" />
                    About this portfolio
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-start"
                    onClick={() => showMessage(getRandomTip())}
                  >
                    <MessageSquare size={16} className="mr-2" />
                    Get a random tip
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AvatarAssistant;
