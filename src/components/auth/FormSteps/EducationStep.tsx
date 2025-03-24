
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Education {
  id: string;
  degree: string;
  institute: string;
  startYear: Date | undefined;
  endYear: Date | undefined;
  currentlyStudying: boolean;
  result: string;
}

interface EducationStepProps {
  educations: Education[];
  onAddEducation: (education: Education) => void;
  onRemoveEducation: (id: string) => void;
  onComplete: () => void;
  onBack: () => void;
}

const DEFAULT_EDUCATION: Education = {
  id: "",
  degree: "",
  institute: "",
  startYear: undefined,
  endYear: undefined,
  currentlyStudying: false,
  result: ""
};

const EducationStep = ({
  educations,
  onAddEducation,
  onRemoveEducation,
  onComplete,
  onBack
}: EducationStepProps) => {
  const [currentEducation, setCurrentEducation] = useState<Education>({
    ...DEFAULT_EDUCATION,
    id: crypto.randomUUID()
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEducation = () => {
    const newErrors: Record<string, string> = {};
    
    if (!currentEducation.degree.trim()) {
      newErrors.degree = "Degree is required";
    }
    
    if (!currentEducation.institute.trim()) {
      newErrors.institute = "Institute name is required";
    }
    
    if (!currentEducation.startYear) {
      newErrors.startYear = "Start year is required";
    }
    
    if (!currentEducation.currentlyStudying && !currentEducation.endYear) {
      newErrors.endYear = "End year is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentEducation(prev => ({ ...prev, [name]: value }));
    
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
    setCurrentEducation(prev => ({ 
      ...prev, 
      currentlyStudying: checked,
      endYear: checked ? undefined : prev.endYear
    }));
    
    // Clear end year error if user checks currently studying
    if (checked && errors.endYear) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.endYear;
        return newErrors;
      });
    }
  };

  const handleAddEducation = () => {
    if (validateEducation()) {
      onAddEducation(currentEducation);
      setCurrentEducation({
        ...DEFAULT_EDUCATION,
        id: crypto.randomUUID()
      });
      setIsAdding(false);
    }
  };

  const handleComplete = () => {
    // If user is currently adding education with some data, validate and add it first
    if (isAdding && (currentEducation.degree.trim() || currentEducation.institute.trim())) {
      if (validateEducation()) {
        onAddEducation(currentEducation);
        submitForm();
      }
    } else {
      submitForm();
    }
  };

  const submitForm = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Registration completed successfully!");
      onComplete();
    }, 1500);
  };

  return (
    <div className="animate-fade-in">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Education History</h3>
      
      {educations.length > 0 && (
        <div className="space-y-4 mb-6">
          {educations.map((edu) => (
            <div 
              key={edu.id} 
              className="bg-white border border-gray-200 rounded-md p-4 relative hover:shadow-md transition-shadow"
            >
              <button
                type="button"
                onClick={() => onRemoveEducation(edu.id)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              
              <h4 className="font-medium text-gray-900">{edu.degree}</h4>
              <p className="text-gray-600">{edu.institute}</p>
              <p className="text-sm text-gray-500">
                {edu.startYear && format(edu.startYear, "yyyy")} - {" "}
                {edu.currentlyStudying ? "Present" : edu.endYear && format(edu.endYear, "yyyy")}
              </p>
              {edu.result && (
                <p className="text-sm text-gray-600 mt-1">Result: {edu.result}</p>
              )}
            </div>
          ))}
        </div>
      )}
      
      {isAdding ? (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6 animate-scale-in">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Qualification</label>
              <Input
                type="text"
                name="degree"
                placeholder="e.g. Bachelor of Science, High School Diploma"
                className={`auth-input ${errors.degree ? "border-red-500" : ""}`}
                value={currentEducation.degree}
                onChange={handleChange}
              />
              {errors.degree && (
                <p className="mt-1 text-sm text-red-500">{errors.degree}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institution Name</label>
              <Input
                type="text"
                name="institute"
                placeholder="Name of school, college or university"
                className={`auth-input ${errors.institute ? "border-red-500" : ""}`}
                value={currentEducation.institute}
                onChange={handleChange}
              />
              {errors.institute && (
                <p className="mt-1 text-sm text-red-500">{errors.institute}</p>
              )}
            </div>
            
            <div className="flex space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border border-gray-300 rounded-md px-4 py-3 h-auto",
                        !currentEducation.startYear && "text-gray-500",
                        errors.startYear && "border-red-500"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentEducation.startYear ? 
                        format(currentEducation.startYear, "yyyy") : 
                        "Select year"
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentEducation.startYear}
                      onSelect={(date) => {
                        setCurrentEducation(prev => ({ ...prev, startYear: date || undefined }));
                        if (errors.startYear) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.startYear;
                            return newErrors;
                          });
                        }
                      }}
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1970}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
                {errors.startYear && (
                  <p className="mt-1 text-sm text-red-500">{errors.startYear}</p>
                )}
              </div>
              
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border border-gray-300 rounded-md px-4 py-3 h-auto",
                        currentEducation.currentlyStudying && "opacity-50",
                        !currentEducation.endYear && !currentEducation.currentlyStudying && "text-gray-500",
                        errors.endYear && "border-red-500"
                      )}
                      disabled={currentEducation.currentlyStudying}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {currentEducation.endYear ? 
                        format(currentEducation.endYear, "yyyy") : 
                        "Select year"
                      }
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={currentEducation.endYear}
                      onSelect={(date) => {
                        setCurrentEducation(prev => ({ ...prev, endYear: date || undefined }));
                        if (errors.endYear) {
                          setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.endYear;
                            return newErrors;
                          });
                        }
                      }}
                      initialFocus
                      captionLayout="dropdown-buttons"
                      fromYear={1970}
                      toYear={2030}
                      disabled={currentEducation.currentlyStudying}
                    />
                  </PopoverContent>
                </Popover>
                {errors.endYear && (
                  <p className="mt-1 text-sm text-red-500">{errors.endYear}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="currentlyStudying"
                checked={currentEducation.currentlyStudying}
                onCheckedChange={handleCheckboxChange}
              />
              <label
                htmlFor="currentlyStudying"
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                I am currently studying here
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Result (Optional)</label>
              <Input
                type="text"
                name="result"
                placeholder="e.g. 3.8 GPA, First Class, 85%"
                className="auth-input"
                value={currentEducation.result}
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
                onClick={handleAddEducation}
              >
                Add Education
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
          Add Education
        </Button>
      )}
      
      <div className="flex space-x-4">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button 
          type="button" 
          className="flex-1 accent-button"
          onClick={handleComplete}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-form-DEFAULT" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Completing...
            </span>
          ) : (
            "Complete Registration"
          )}
        </Button>
      </div>
    </div>
  );
};

export default EducationStep;
