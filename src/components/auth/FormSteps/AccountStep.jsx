
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const AccountStep = ({ accountData, onInputChange, onNext }) => {
  const [errors, setErrors] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!accountData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(accountData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!accountData.fullName) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!accountData.password) {
      newErrors.password = "Password is required";
    } else if (accountData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!accountData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (accountData.password !== accountData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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

  const handleAccountTypeChange = (type) => {
    onInputChange("accountType", type);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div className="toggle-container">
        <button 
          type="button"
          className={`toggle-button ${accountData.accountType === "personal" ? "toggle-button-active" : ""}`}
          onClick={() => handleAccountTypeChange("personal")}
        >
          Personal
        </button>
        <button 
          type="button"
          className={`toggle-button ${accountData.accountType === "company" ? "toggle-button-active" : ""}`}
          onClick={() => handleAccountTypeChange("company")}
        >
          Company
        </button>
      </div>
      
      <div>
        <Input
          type="text"
          name="fullName"
          placeholder={accountData.accountType === "personal" ? "Full Name" : "Company Name"}
          className={`auth-input ${errors.fullName ? "border-red-500" : ""}`}
          value={accountData.fullName}
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
          placeholder="Email"
          className={`auth-input ${errors.email ? "border-red-500" : ""}`}
          value={accountData.email}
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
          value={accountData.password}
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
          value={accountData.confirmPassword}
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
      
      <Button type="submit" className="accent-button mt-4">
        Continue
      </Button>
    </form>
  );
};

export default AccountStep;
