
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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onHoverStart={handleHoverStart}
    >
      <Button
        className={cn("transition-transform duration-200", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
};

export default InteractiveButton;
