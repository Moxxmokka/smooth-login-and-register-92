
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

const ProfileStep = ({ profileData, onInputChange, onNext, onBack }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!profileData.gender) {
      newErrors.gender = "Gender is required";
    }
    
    if (!profileData.birthdate) {
      newErrors.birthdate = "Birthdate is required";
    }
    
    if (!profileData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onInputChange("profilePicture", file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Overview</label>
        <Textarea
          name="overview"
          placeholder="Tell us about yourself..."
          className="auth-input min-h-[100px]"
          value={profileData.overview}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select
          name="gender"
          className={`auth-input ${errors.gender ? "border-red-500" : ""}`}
          value={profileData.gender}
          onChange={handleChange}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
          <option value="prefer-not-to-say">Prefer not to say</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
        <Input
          type="date"
          name="birthdate"
          className={`auth-input ${errors.birthdate ? "border-red-500" : ""}`}
          value={profileData.birthdate}
          onChange={handleChange}
          max={new Date().toISOString().split("T")[0]} // Prevent future dates
        />
        {errors.birthdate && (
          <p className="mt-1 text-sm text-red-500">{errors.birthdate}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <Input
          type="tel"
          name="phoneNumber"
          placeholder="Enter phone number"
          className={`auth-input ${errors.phoneNumber ? "border-red-500" : ""}`}
          value={profileData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
        <div className="border border-dashed border-gray-300 rounded-md p-4 text-center">
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor="profilePicture" className="cursor-pointer">
            <div className="flex flex-col items-center">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload profile picture</span>
              <span className="text-xs text-gray-500 mt-1">(Optional)</span>
            </div>
          </label>
          {profileData.profilePicture && (
            <div className="mt-2 text-sm text-gray-700">
              Selected: {profileData.profilePicture.name}
            </div>
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

export default ProfileStep;
