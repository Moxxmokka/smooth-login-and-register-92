
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serviceCategories, skillLevels, currencies } from "@/lib/constants";

interface SkillsStepProps {
  skillsData: {
    serviceCategory: string;
    skillLevel: string;
    expectedSalary: string;
    salaryCurrency: string;
  };
  onInputChange: (name: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const SkillsStep = ({
  skillsData,
  onInputChange,
  onNext,
  onBack
}: SkillsStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!skillsData.serviceCategory) {
      newErrors.serviceCategory = "Service category is required";
    }
    
    if (!skillsData.skillLevel) {
      newErrors.skillLevel = "Skill level is required";
    }
    
    if (!skillsData.expectedSalary.trim()) {
      newErrors.expectedSalary = "Expected salary is required";
    } else if (isNaN(Number(skillsData.expectedSalary))) {
      newErrors.expectedSalary = "Please enter a valid number";
    }
    
    if (!skillsData.salaryCurrency) {
      newErrors.salaryCurrency = "Currency is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onInputChange(name, value);
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
        <select
          name="serviceCategory"
          className={`auth-input ${errors.serviceCategory ? "border-red-500" : ""}`}
          value={skillsData.serviceCategory}
          onChange={handleChange}
        >
          <option value="">Select Service Category</option>
          {serviceCategories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.serviceCategory && (
          <p className="mt-1 text-sm text-red-500">{errors.serviceCategory}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skill Level</label>
        <select
          name="skillLevel"
          className={`auth-input ${errors.skillLevel ? "border-red-500" : ""}`}
          value={skillsData.skillLevel}
          onChange={handleChange}
        >
          <option value="">Select Skill Level</option>
          {skillLevels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {errors.skillLevel && (
          <p className="mt-1 text-sm text-red-500">{errors.skillLevel}</p>
        )}
      </div>
      
      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary</label>
          <Input
            type="text"
            name="expectedSalary"
            placeholder="e.g. 50000"
            className={`auth-input ${errors.expectedSalary ? "border-red-500" : ""}`}
            value={skillsData.expectedSalary}
            onChange={handleChange}
          />
          {errors.expectedSalary && (
            <p className="mt-1 text-sm text-red-500">{errors.expectedSalary}</p>
          )}
        </div>
        
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select
            name="salaryCurrency"
            className={`auth-input ${errors.salaryCurrency ? "border-red-500" : ""}`}
            value={skillsData.salaryCurrency}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          {errors.salaryCurrency && (
            <p className="mt-1 text-sm text-red-500">{errors.salaryCurrency}</p>
          )}
        </div>
      </div>
      
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

export default SkillsStep;
