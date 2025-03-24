
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";

const EducationStep = ({ educations, updateFormData, onNext, onBack }) => {
  const [errors, setErrors] = useState([{}]);

  const validateForm = () => {
    const newErrors = educations.map(edu => {
      const eduErrors = {};
      
      if (!edu.degree) {
        eduErrors.degree = "Degree is required";
      }
      
      if (!edu.institute) {
        eduErrors.institute = "Institute name is required";
      }
      
      if (!edu.startYear) {
        eduErrors.startYear = "Start year is required";
      }
      
      if (!edu.currentlyStudying && !edu.endYear) {
        eduErrors.endYear = "End year is required";
      }
      
      return eduErrors;
    });
    
    setErrors(newErrors);
    
    // Check if any education entry has errors
    return newErrors.every(eduError => Object.keys(eduError).length === 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onNext();
    }
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      [name]: value
    };
    updateFormData(updatedEducations);
    
    // Clear error when user types
    if (errors[index] && errors[index][name]) {
      const newErrors = [...errors];
      delete newErrors[index][name];
      setErrors(newErrors);
    }
  };

  const handleCheckboxChange = (index, checked) => {
    const updatedEducations = [...educations];
    updatedEducations[index] = {
      ...updatedEducations[index],
      currentlyStudying: checked,
      endYear: checked ? "" : updatedEducations[index].endYear
    };
    updateFormData(updatedEducations);
    
    // Clear error when user checks "currently studying"
    if (checked && errors[index] && errors[index].endYear) {
      const newErrors = [...errors];
      delete newErrors[index].endYear;
      setErrors(newErrors);
    }
  };

  const addEducation = () => {
    updateFormData([
      ...educations,
      {
        degree: "",
        institute: "",
        startYear: "",
        endYear: "",
        currentlyStudying: false,
        results: ""
      }
    ]);
    setErrors([...errors, {}]);
  };

  const removeEducation = (index) => {
    if (educations.length > 1) {
      const updatedEducations = educations.filter((_, i) => i !== index);
      updateFormData(updatedEducations);
      
      const newErrors = errors.filter((_, i) => i !== index);
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
      <h3 className="font-medium text-gray-900">Education</h3>
      
      {educations.map((education, index) => (
        <div key={index} className="p-4 border border-gray-200 rounded-md mb-4">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium">Education {index + 1}</h4>
            {educations.length > 1 && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => removeEducation(index)}
                className="h-8 w-8 p-0 text-red-500"
              >
                <Trash2 size={16} />
              </Button>
            )}
          </div>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree/Qualification</label>
              <Input
                type="text"
                name="degree"
                placeholder="e.g. Bachelor of Science in Computer Science"
                className={`auth-input ${errors[index]?.degree ? "border-red-500" : ""}`}
                value={education.degree}
                onChange={(e) => handleChange(index, e)}
              />
              {errors[index]?.degree && (
                <p className="mt-1 text-sm text-red-500">{errors[index].degree}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Institute Name</label>
              <Input
                type="text"
                name="institute"
                placeholder="School/College/University"
                className={`auth-input ${errors[index]?.institute ? "border-red-500" : ""}`}
                value={education.institute}
                onChange={(e) => handleChange(index, e)}
              />
              {errors[index]?.institute && (
                <p className="mt-1 text-sm text-red-500">{errors[index].institute}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Year</label>
                <Input
                  type="number"
                  name="startYear"
                  placeholder="YYYY"
                  className={`auth-input ${errors[index]?.startYear ? "border-red-500" : ""}`}
                  value={education.startYear}
                  onChange={(e) => handleChange(index, e)}
                  min="1900"
                  max={new Date().getFullYear()}
                />
                {errors[index]?.startYear && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].startYear}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Year</label>
                <Input
                  type="number"
                  name="endYear"
                  placeholder="YYYY"
                  className={`auth-input ${errors[index]?.endYear ? "border-red-500" : ""}`}
                  value={education.endYear}
                  onChange={(e) => handleChange(index, e)}
                  min={education.startYear || "1900"}
                  max={new Date().getFullYear() + 10}
                  disabled={education.currentlyStudying}
                />
                {errors[index]?.endYear && (
                  <p className="mt-1 text-sm text-red-500">{errors[index].endYear}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`currentlyStudying-${index}`}
                checked={education.currentlyStudying}
                onCheckedChange={(checked) => handleCheckboxChange(index, checked)}
              />
              <label 
                htmlFor={`currentlyStudying-${index}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I am currently studying here
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Results (Optional)</label>
              <Input
                type="text"
                name="results"
                placeholder="e.g. CGPA 3.5/4.0, First Class, etc."
                className="auth-input"
                value={education.results}
                onChange={(e) => handleChange(index, e)}
              />
            </div>
          </div>
        </div>
      ))}
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={addEducation}
        className="w-full flex items-center justify-center"
      >
        <Plus size={16} className="mr-2" />
        Add Another Education
      </Button>
      
      <div className="flex space-x-4 pt-4">
        <Button type="button" variant="outline" className="flex-1" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="flex-1 accent-button">
          Complete Registration
        </Button>
      </div>
    </form>
  );
};

export default EducationStep;
