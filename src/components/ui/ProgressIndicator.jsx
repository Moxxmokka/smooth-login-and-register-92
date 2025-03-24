
import { cn } from "@/lib/utils";

const ProgressIndicator = ({ steps, currentStep, className }) => {
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
