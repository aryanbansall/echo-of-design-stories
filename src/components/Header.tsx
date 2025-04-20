
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link, useLocation } from "react-router-dom";
import { playSoundEffect } from "@/utils/audioUtils";

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, isMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md shadow-md py-2"
          : "bg-transparent py-4"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <motion.div
            className="h-10 w-10 bg-primary rounded-full flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-display text-white font-bold text-xl">A</span>
          </motion.div>
          <span className="font-display text-xl md:text-2xl font-bold hidden sm:inline-block">
            Aryan<span className="text-primary">Bansal</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" currentPath={location.pathname} />
          <NavLink to="/projects" label="Projects" currentPath={location.pathname} />
          <NavLink to="/about" label="About" currentPath={location.pathname} />
          <NavLink to="/contact" label="Contact" currentPath={location.pathname} />
        </nav>

        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>
    </motion.header>
  );
};

const NavLink: React.FC<{ to: string; label: string; currentPath: string }> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to || (to !== "/" && currentPath.startsWith(to));
  
  const handleHover = () => {
    playSoundEffect('pop');
  };
  
  return (
    <motion.div
      className="relative overflow-hidden"
      onHoverStart={handleHover}
      whileHover={{ scale: 1.05 }}
    >
      <Link
        to={to}
        className={`block px-3 py-2 rounded-md transition-colors duration-200 ${
          isActive 
            ? "text-primary font-medium" 
            : "text-foreground/90 hover:text-foreground"
        }`}
      >
        {label}
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
          initial={{ scaleX: isActive ? 1 : 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  );
};

export default Header;
