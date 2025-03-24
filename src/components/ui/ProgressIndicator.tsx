
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  steps: number;
  currentStep: number;
  className?: string;
}

const ProgressIndicator = ({ 
  steps, 
  currentStep, 
  className 
}: ProgressIndicatorProps) => {
  return (
    <div className={cn("form-step-indicator", className)}>
      {Array.from({ length: steps }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "form-step-dot",
            currentStep === index && "form-step-dot-active"
          )}
        />
      ))}
    </div>
  );
};

export default ProgressIndicator;
