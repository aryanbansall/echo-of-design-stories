
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { playSoundEffect } from "@/utils/audioUtils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 20 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={onClose}
          />
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-background z-50 flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="pt-20 px-6 flex flex-col space-y-6 h-full">
              <NavLink to="/" label="Home" onClick={onClose} variants={linkVariants} isActive={location.pathname === "/"} />
              <NavLink to="/projects" label="Projects" onClick={onClose} variants={linkVariants} isActive={location.pathname === "/projects" || location.pathname.startsWith("/projects/")} />
              <NavLink to="/about" label="About" onClick={onClose} variants={linkVariants} isActive={location.pathname === "/about"} />
              <NavLink to="/contact" label="Contact" onClick={onClose} variants={linkVariants} isActive={location.pathname === "/contact"} />
              
              <motion.div 
                className="mt-auto mb-10 text-sm text-muted-foreground"
                variants={linkVariants}
              >
                <p>© 2025 Aryan Bansal</p>
                <p>CSD Student at IIIT Delhi</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const NavLink: React.FC<{ 
  to: string; 
  label: string; 
  onClick: () => void; 
  variants: any;
  isActive: boolean;
}> = ({ to, label, onClick, variants, isActive }) => {
  const handleClick = () => {
    playSoundEffect('click');
    onClick();
  };

  return (
    <motion.div variants={variants}>
      <Link
        to={to}
        className={`block text-2xl font-display font-medium py-2 px-3 rounded-md transition-colors duration-200 ${
          isActive ? "text-primary bg-primary/10" : "hover:text-primary hover:bg-primary/5"
        }`}
        onClick={handleClick}
      >
        {label}
      </Link>
    </motion.div>
  );
};

export default MobileMenu;
