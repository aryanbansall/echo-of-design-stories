
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { playSoundEffect } from "../utils/audioUtils";
import { X } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
  technologies?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  date,
  technologies,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if device is touch-based
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    playSoundEffect('hover');
  };

  const handleClick = () => {
    playSoundEffect('click');
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDetailsOpen(false);
    playSoundEffect('click');
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const transformStyle = isTouchDevice ? {} : {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg) translateZ(10px)`,
  };

  return (
    <>
      <motion.div 
        className="scroll-reveal"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div
          ref={cardRef}
          className="project-card group bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 cursor-pointer"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onClick={handleClick}
          style={transformStyle}
        >
          <div className="project-card-content">
            <div className="relative h-52 md:h-64 overflow-hidden">
              <img
                src={imageUrl || "/placeholder.svg"}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">{date}</span>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                  {category}
                </span>
              </div>
              <h3 className="text-xl font-display font-semibold mb-2 group-hover:text-primary transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isDetailsOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDetailsOpen(false)}
          >
            <motion.div
              className="bg-card rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt={title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <button
                  className="absolute top-4 right-4 bg-black/50 text-white rounded-full p-1 hover:bg-black/70 transition-colors"
                  onClick={handleCloseDetails}
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <span className="text-sm font-medium bg-primary text-white px-3 py-1 rounded-full">
                    {category}
                  </span>
                  <h2 className="text-2xl font-display font-bold mt-2">{title}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-muted-foreground">{date}</span>
                </div>
                
                <h3 className="text-lg font-medium mb-2">Overview</h3>
                <p className="text-muted-foreground mb-4">
                  {description}
                </p>
                
                {technologies && (
                  <>
                    <h3 className="text-lg font-medium mb-2">Technologies</h3>
                    <p className="text-muted-foreground mb-6">
                      {technologies}
                    </p>
                  </>
                )}
                
                <div className="flex justify-end">
                  <button
                    onClick={handleCloseDetails}
                    className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectCard;
