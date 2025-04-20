
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
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
              <NavLink to="/" label="Home" onClick={onClose} variants={linkVariants} />
              <NavLink to="/projects" label="Projects" onClick={onClose} variants={linkVariants} />
              <NavLink to="/process" label="Process" onClick={onClose} variants={linkVariants} />
              <NavLink to="/about" label="About" onClick={onClose} variants={linkVariants} />
              <NavLink to="/contact" label="Contact" onClick={onClose} variants={linkVariants} />
              
              <motion.div 
                className="mt-auto mb-10 text-sm text-muted-foreground"
                variants={linkVariants}
              >
                <p>© 2025 Design Journal</p>
                <p>An interactive portfolio showcasing design evolution</p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const NavLink: React.FC<{ to: string; label: string; onClick: () => void; variants: any }> = ({ to, label, onClick, variants }) => {
  return (
    <motion.div variants={variants}>
      <Link
        to={to}
        className="block text-2xl font-serif font-medium py-2 hover:text-portfolio-purple transition-colors duration-200"
        onClick={onClick}
      >
        {label}
      </Link>
    </motion.div>
  );
};

export default MobileMenu;
