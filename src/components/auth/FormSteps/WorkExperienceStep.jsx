
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

const WorkExperienceStep = ({ workExperiences, updateFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState([{}]);

  const validateForm = () => {
    const newErrors = workExperiences.map(exp => {
      const expErrors = {};
      
      if (!exp.organization) {
        expErrors.organization = "Organization name is required";
      }
      
      if (!exp.designation) {
        expErrors.designation = "Designation is required";
      }
      
      if (!exp.from) {
        expErrors.from = "Start date is required";
      }
      
      if (!exp.currentlyWorking && !exp.to) {
        expErrors.to = "End date is required";
      }
      
      return expErrors;
    });
    
    setErrors(newErrors);
    
    // Check if any experience has errors
    return newErrors.every(expError => Object.keys(expError).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      [name]: value
    };
    updateFormData(updatedExperiences);
    
    // Clear error when user types
    if (errors[index] && errors[index][name]) {
      const newErrors = [...errors];
      delete newErrors[index][name];
      setErrors(newErrors);
    }
  };

  const handleCheckboxChange = (index, checked) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index] = {
      ...updatedExperiences[index],
      currentlyWorking: checked,
      to: checked ? "" : updatedExperiences[index].to
    };
    updateFormData(updatedExperiences);
    
    // Clear error when user checks "currently working"
    if (checked && errors[index] && errors[index].to) {
      const newErrors = [...errors];
      delete newErrors[index].to;
      setErrors(newErrors);
    }
  };

  const addExperience = () => {
    updateFormData([
      ...workExperiences,
      {
        organization: "",
        designation: "",
        from: "",
        to: "",
        currentlyWorking: false,
        description: ""
      }
    ]);
    setErrors([...errors, {}]);
  };

  const removeExperience = (index) => {
    if (workExperiences.length > 1) {
      const updatedExperiences = workExperiences.filter((_, i) => i !== index);
      updateFormData(updatedExperiences);
      
      const newErrors = errors.filter((_, i) => i !== index);
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <h3 className="font-medium text-gray-900">Work Experience</h3>
      
      {workExperiences.map((experience, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-md mb-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Experience {index + 1}</h4>
            {workExperiences.length > 1 && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeExperience(index)}
                className="h-8 w-8 p-0 text-red-500"
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
              <Input
                type="text"
                name="organization"
                placeholder="Company/Organization name"
                className={`auth-input ${errors[index]?.organization ? "border-red-500" : ""}`}
                value={experience.organization}
                onChange={(e) => handleChange(index, e)}
              />
              {errors[index]?.organization && (
                <p className="mt-1 text-sm text-red-500">{errors[index].organization}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
              <Input
                type="text"
                name="designation"
                placeholder="Your job title"
                className={`auth-input ${errors[index]?.designation ? "border-red-500" : ""}`}
                value={experience.designation}
                onChange={(e) => handleChange(index, e)}
              />
              {errors[index]?.designation && (
                <p className="mt-1 text-sm text-red-500">{errors[index].designation}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <Input
                  type="date"
                  name="from"
                  className={`auth-input ${errors[index]?.from ? "border-red-500" : ""}`}
                  value={experience.from}
                  onChange={(e) => handleChange(index, e)}
                  max={new Date().toISOString().split("T")[0]}
                />
                {errors[index]?.from && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].from}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <Input
                  type="date"
                  name="to"
                  className={`auth-input ${errors[index]?.to ? "border-red-500" : ""}`}
                  value={experience.to}
                  onChange={(e) => handleChange(index, e)}
                  max={new Date().toISOString().split("T")[0]}
                  disabled={experience.currentlyWorking}
                />
                {errors[index]?.to && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].to}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`currentlyWorking-${index}`}
                checked={experience.currentlyWorking}
                onCheckedChange={(checked) => handleCheckboxChange(index, checked)}
              />
              <label 
                htmlFor={`currentlyWorking-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I am currently working here
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
              <Textarea
                name="description"
                placeholder="Describe your responsibilities and achievements..."
                className="auth-input min-h-[80px]"
                value={experience.description}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={addExperience}
        className="w-full flex items-center justify-center"
      >
        <Plus size={16} className="mr-2" />
        Add Another Experience
      </Button>
      
      <div className="flex space-x-4 pt-4">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="flex-1 accent-button">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default WorkExperienceStep;
