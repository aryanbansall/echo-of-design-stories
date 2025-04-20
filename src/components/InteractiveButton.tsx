
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { playSoundEffect } from "@/utils/audioUtils";
import { Button, ButtonProps } from "@/components/ui/button";

interface InteractiveButtonProps extends ButtonProps {
  variant?: ButtonProps["variant"];
}

const InteractiveButton = ({ className, children, ...props }: InteractiveButtonProps) => {
  const handleHoverStart = () => {
    playSoundEffect('pop');
  };

  const handleClick = () => {
    playSoundEffect('click');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -3 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={handleHoverStart}
      className="relative"
    >
      <motion.span 
        className="absolute -inset-1 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 opacity-0 blur"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      <Button
        className={cn("transition-all duration-200 relative", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default InteractiveButton;
