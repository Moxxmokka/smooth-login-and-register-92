
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

interface BasicInfoStepProps {
  userData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: "Candidate" | "Company";
  };
  onInputChange: (name: string, value: string) => void;
  onUserTypeChange: (type: "Candidate" | "Company") => void;
  onNext: () => void;
}

const BasicInfoStep = ({ 
  userData, 
  onInputChange, 
  onUserTypeChange, 
  onNext 
}: BasicInfoStepProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!userData.fullName.trim()) {
      newErrors.fullName = "Name is required";
    }
    
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!userData.password) {
      newErrors.password = "Password is required";
    } else if (userData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="toggle-container">
        <button
          type="button"
          className={`toggle-button ${userData.userType === "Candidate" ? "toggle-button-active" : ""}`}
          onClick={() => onUserTypeChange("Candidate")}
        >
          Candidate
        </button>
        <button
          type="button"
          className={`toggle-button ${userData.userType === "Company" ? "toggle-button-active" : ""}`}
          onClick={() => onUserTypeChange("Company")}
        >
          Company
        </button>
      </div>
      
      <div>
        <Input
          type="text"
          name="fullName"
          placeholder={userData.userType === "Candidate" ? "Full Name" : "Company Name"}
          className={`auth-input ${errors.fullName ? "border-red-500" : ""}`}
          value={userData.fullName}
          onChange={handleChange}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>
      
      <div>
        <Input
          type="email"
          name="email"
          placeholder="Email Address"
          className={`auth-input ${errors.email ? "border-red-500" : ""}`}
          value={userData.email}
          onChange={handleChange}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>
      
      <div className="relative">
        <Input
          type={isPasswordVisible ? "text" : "password"}
          name="password"
          placeholder="Password"
          className={`auth-input pr-10 ${errors.password ? "border-red-500" : ""}`}
          value={userData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password}</p>
        )}
      </div>
      
      <div className="relative">
        <Input
          type={isPasswordVisible ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm Password"
          className={`auth-input pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
          value={userData.confirmPassword}
          onChange={handleChange}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={togglePasswordVisibility}
        >
          {isPasswordVisible ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
        )}
      </div>
      
      <Button type="submit" className="accent-button mt-6">
        Continue
      </Button>
    </form>
  );
};

export default BasicInfoStep;
