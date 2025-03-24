
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const skillLevelLabels = ["Beginner", "Intermediate", "Advanced", "Expert"];
const currencies = ["USD", "EUR", "GBP", "CAD", "AUD", "JPY", "CNY", "INR"];
const serviceCategories = [
  "IT & Software",
  "Design & Creative",
  "Writing & Translation",
  "Sales & Marketing",
  "Finance & Accounting",
  "Engineering & Architecture",
  "Legal",
  "Admin & Customer Support",
  "Other"
];

const SkillsStep = ({ skillsData, onInputChange, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!skillsData.service) {
      newErrors.service = "Service is required";
    }
    
    if (!skillsData.serviceCategory) {
      newErrors.serviceCategory = "Service category is required";
    }
    
    if (!skillsData.expectedSalary) {
      newErrors.expectedSalary = "Expected salary is required";
    } else if (isNaN(skillsData.expectedSalary) || Number(skillsData.expectedSalary) <= 0) {
      newErrors.expectedSalary = "Please enter a valid amount";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleChange = (e) => {
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

  const handleSliderChange = (value) => {
    onInputChange("skillLevel", skillLevelLabels[value[0]].toLowerCase());
  };

  const getCurrentSkillLevelIndex = () => {
    return skillLevelLabels.findIndex(
      level => level.toLowerCase() === skillsData.skillLevel
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
        <Input
          type="text"
          name="service"
          placeholder="What service do you provide? (e.g. Web Development)"
          className={`auth-input ${errors.service ? "border-red-500" : ""}`}
          value={skillsData.service}
          onChange={handleChange}
        />
        {errors.service && (
          <p className="mt-1 text-sm text-red-500">{errors.service}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Service Category</label>
        <select
          name="serviceCategory"
          className={`auth-input ${errors.serviceCategory ? "border-red-500" : ""}`}
          value={skillsData.serviceCategory}
          onChange={handleChange}
        >
          <option value="">Select Category</option>
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
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Skill Level: {skillsData.skillLevel.charAt(0).toUpperCase() + skillsData.skillLevel.slice(1)}
        </label>
        <Slider
          defaultValue={[getCurrentSkillLevelIndex()]}
          max={skillLevelLabels.length - 1}
          step={1}
          onValueChange={handleSliderChange}
        />
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {skillLevelLabels.map((label, index) => (
            <span key={label} style={{ width: "25%", textAlign: index === 0 ? "left" : index === skillLevelLabels.length - 1 ? "right" : "center" }}>
              {label}
            </span>
          ))}
        </div>
      </div>
      
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Salary</label>
          <Input
            type="number"
            name="expectedSalary"
            placeholder="Amount"
            className={`auth-input ${errors.expectedSalary ? "border-red-500" : ""}`}
            value={skillsData.expectedSalary}
            onChange={handleChange}
            min="0"
          />
          {errors.expectedSalary && (
            <p className="mt-1 text-sm text-red-500">{errors.expectedSalary}</p>
          )}
        </div>
        <div className="w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <select
            name="currency"
            className="auth-input"
            value={skillsData.currency}
            onChange={handleChange}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
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
