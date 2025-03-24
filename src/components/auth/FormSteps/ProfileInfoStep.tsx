
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ProfileInfoStepProps {
  profileData: {
    overview: string;
    gender: string;
    birthdate: Date | undefined;
    phoneNumber: string;
    profilePicture: File | null;
  };
  onInputChange: (name: string, value: string | Date | File | null) => void;
  onNext: () => void;
  onBack: () => void;
}

const ProfileInfoStep = ({
  profileData,
  onInputChange,
  onNext,
  onBack
}: ProfileInfoStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!profileData.overview.trim()) {
      newErrors.overview = "Please provide a brief overview";
    }
    
    if (!profileData.gender.trim()) {
      newErrors.gender = "Gender is required";
    }
    
    if (!profileData.birthdate) {
      newErrors.birthdate = "Birthdate is required";
    }
    
    if (!profileData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onInputChange('profilePicture', file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            {previewUrl ? (
              <div className="w-20 h-20 rounded-full overflow-hidden border border-gray-300">
                <img 
                  src={previewUrl} 
                  alt="Profile Preview" 
                  className="w-full h-full object-cover" 
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                <UploadCloud className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <label className="cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-form-accent focus:ring-opacity-50">
            Upload Photo
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </label>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">About You</label>
        <Textarea
          name="overview"
          placeholder="Write a brief description about yourself..."
          className={`min-h-[100px] w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-form-accent focus:border-transparent transition-all duration-200 ${errors.overview ? "border-red-500" : ""}`}
          value={profileData.overview}
          onChange={handleChange}
        />
        {errors.overview && (
          <p className="mt-1 text-sm text-red-500">{errors.overview}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select
          name="gender"
          className={`auth-input ${errors.gender ? "border-red-500" : ""}`}
          value={profileData.gender}
          onChange={(e) => onInputChange('gender', e.target.value)}
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal border border-gray-300 rounded-md px-4 py-3 h-auto",
                !profileData.birthdate && "text-gray-500",
                errors.birthdate && "border-red-500"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {profileData.birthdate ? format(profileData.birthdate, "PPP") : "Select birthdate"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={profileData.birthdate}
              onSelect={(date) => onInputChange('birthdate', date || undefined)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.birthdate && (
          <p className="mt-1 text-sm text-red-500">{errors.birthdate}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <Input
          type="tel"
          name="phoneNumber"
          placeholder="+1 (123) 456-7890"
          className={`auth-input ${errors.phoneNumber ? "border-red-500" : ""}`}
          value={profileData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
        )}
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

export default ProfileInfoStep;
