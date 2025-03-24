
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface AnimatedContainerProps {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
  animationIn?: string;
  animationOut?: string;
  duration?: number;
  onExitComplete?: () => void;
}

const AnimatedContainer = ({
  children,
  isVisible,
  className,
  animationIn = "animate-fade-in",
  animationOut = "animate-fade-out",
  duration = 300,
  onExitComplete
}: AnimatedContainerProps) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [currentAnimation, setCurrentAnimation] = useState(isVisible ? animationIn : "");

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setCurrentAnimation(animationIn);
    } else {
      setCurrentAnimation(animationOut);
      const timer = setTimeout(() => {
        setShouldRender(false);
        onExitComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, animationIn, animationOut, duration, onExitComplete]);

  if (!shouldRender) return null;

  return (
    <div
      className={cn(
        "transition-all",
        currentAnimation,
        className
      )}
      style={{ animationDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedContainer;
