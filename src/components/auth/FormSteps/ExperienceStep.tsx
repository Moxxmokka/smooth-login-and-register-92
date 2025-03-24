
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface Experience {
  id: string;
  organization: string;
  designation: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  currentlyWorking: boolean;
  description: string;
}

interface ExperienceStepProps {
  experiences: Experience[];
  onAddExperience: (experience: Experience) => void;
  onRemoveExperience: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const DEFAULT_EXPERIENCE: Experience = {
  id: "",
  organization: "",
  designation: "",
  startDate: undefined,
  endDate: undefined,
  currentlyWorking: false,
  description: ""
};

const ExperienceStep = ({
  experiences,
  onAddExperience,
  onRemoveExperience,
  onNext,
  onBack
}: ExperienceStepProps) => {
  const [currentExperience, setCurrentExperience] = useState<Experience>({
    ...DEFAULT_EXPERIENCE,
    id: crypto.randomUUID()
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);

  const validateExperience = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentExperience.organization.trim()) {
      newErrors.organization = "Organization name is required";
    }
    
    if (!currentExperience.designation.trim()) {
      newErrors.designation = "Designation is required";
    }
    
    if (!currentExperience.startDate) {
      newErrors.startDate = "Start date is required";
    }
    
    if (!currentExperience.currentlyWorking && !currentExperience.endDate) {
      newErrors.endDate = "End date is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentExperience(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCurrentExperience(prev => ({ 
      ...prev, 
      currentlyWorking: checked,
      endDate: checked ? undefined : prev.endDate
    }));
    
    // Clear end date error if user checks currently working
    if (checked && errors.endDate) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.endDate;
        return newErrors;
      });
    }
  };

  const handleAddExperience = () => {
    if (validateExperience()) {
      onAddExperience(currentExperience);
      setCurrentExperience({
        ...DEFAULT_EXPERIENCE,
        id: crypto.randomUUID()
      });
      setIsAdding(false);
    }
  };

  const handleNext = () => {
    // If user is currently adding an experience, validate and add it first
    if (isAdding && currentExperience.organization.trim()) {
      if (validateExperience()) {
        onAddExperience(currentExperience);
        onNext();
      }
    } else {
      onNext();
    }
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Work Experience</h3>
      
      {experiences.length > 0 && (
        <div className="space-y-4 mb-6">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="bg-white border border-gray-200 rounded-md p-4 relative hover:shadow-md transition-shadow"
            >
              <button
                type="button"
                onClick={() => onRemoveExperience(exp.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              
              <h4 className="font-medium text-gray-900">{exp.designation}</h4>
              <p className="text-gray-600">{exp.organization}</p>
              <p className="text-sm text-gray-500">
                {exp.startDate && format(exp.startDate, "MMM yyyy")} - {" "}
                {exp.currentlyWorking ? "Present" : exp.endDate && format(exp.endDate, "MMM yyyy")}
              </p>
              {exp.description && (
                <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {isAdding ? (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6 animate-scale-in">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <Input
                type="text"
                name="organization"
                placeholder="Company or organization name"
                className={`auth-input ${errors.organization ? "border-red-500" : ""}`}
                value={currentExperience.organization}
                onChange={handleChange}
              />
              {errors.organization && (
                <p className="mt-1 text-sm text-red-500">{errors.organization}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <Input
                type="text"
                name="designation"
                placeholder="Your job title"
                className={`auth-input ${errors.designation ? "border-red-500" : ""}`}
                value={currentExperience.designation}
                onChange={handleChange}
              />
              {errors.designation && (
                <p className="mt-1 text-sm text-red-500">{errors.designation}</p>
              )}
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border border-gray-300 rounded-md px-4 py-3 h-auto",
                        !currentExperience.startDate && "text-gray-500",
                        errors.startDate && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentExperience.startDate ? 
                        format(currentExperience.startDate, "MMM yyyy") : 
                        "Select date"
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentExperience.startDate}
                      onSelect={(date) => {
                        setCurrentExperience(prev => ({ ...prev, startDate: date || undefined }));
                        if (errors.startDate) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.startDate;
                            return newErrors;
                          });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
                )}
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border border-gray-300 rounded-md px-4 py-3 h-auto",
                        currentExperience.currentlyWorking && "opacity-50",
                        !currentExperience.endDate && !currentExperience.currentlyWorking && "text-gray-500",
                        errors.endDate && "border-red-500"
                      )}
                      disabled={currentExperience.currentlyWorking}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentExperience.endDate ? 
                        format(currentExperience.endDate, "MMM yyyy") : 
                        "Select date"
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentExperience.endDate}
                      onSelect={(date) => {
                        setCurrentExperience(prev => ({ ...prev, endDate: date || undefined }));
                        if (errors.endDate) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.endDate;
                            return newErrors;
                          });
                        }
                      }}
                      initialFocus
                      disabled={currentExperience.currentlyWorking}
                    />
                  </PopoverContent>
                </Popover>
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="currentlyWorking"
                checked={currentExperience.currentlyWorking}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="currentlyWorking"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                I am currently working here
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <Textarea
                name="description"
                placeholder="Briefly describe your responsibilities and achievements..."
                className="min-h-[80px] w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-form-accent focus:border-transparent transition-all duration-200"
                value={currentExperience.description}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsAdding(false)}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                className="flex-1 auth-button"
                onClick={handleAddExperience}
              >
                Add Experience
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full mb-6 border-dashed flex items-center justify-center py-3"
          onClick={() => setIsAdding(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Work Experience
        </Button>
      )}
      
      <div className="flex space-x-4">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          className="flex-1 accent-button"
          onClick={handleNext}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ExperienceStep;
