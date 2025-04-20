
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { playSoundEffect } from "../utils/audioUtils";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  date: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  category,
  date,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const transformStyle = isTouchDevice ? {} : {
    transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg) translateZ(10px)`,
  };

  return (
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
        style={transformStyle}
      >
        <Link to={`/projects/${id}`} onClick={handleClick}>
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
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-portfolio-purple/10 text-portfolio-purple">
                  {category}
                </span>
              </div>
              <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-portfolio-purple transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground text-sm line-clamp-3">
                {description}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
