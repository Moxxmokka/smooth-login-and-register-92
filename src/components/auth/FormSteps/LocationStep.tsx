
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { countries } from "@/lib/constants";

interface LocationStepProps {
  locationData: {
    country: string;
    state: string;
    address: string;
    city: string;
    zipCode: string;
  };
  onInputChange: (name: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const LocationStep = ({
  locationData,
  onInputChange,
  onNext,
  onBack
}: LocationStepProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!locationData.country) {
      newErrors.country = "Country is required";
    }
    
    if (!locationData.state.trim()) {
      newErrors.state = "State is required";
    }
    
    if (!locationData.city.trim()) {
      newErrors.city = "City is required";
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
        <select
          name="country"
          className={`auth-input ${errors.country ? "border-red-500" : ""}`}
          value={locationData.country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="mt-1 text-sm text-red-500">{errors.country}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">State/Province</label>
        <Input
          type="text"
          name="state"
          placeholder="State or Province"
          className={`auth-input ${errors.state ? "border-red-500" : ""}`}
          value={locationData.state}
          onChange={handleChange}
        />
        {errors.state && (
          <p className="mt-1 text-sm text-red-500">{errors.state}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
        <Input
          type="text"
          name="city"
          placeholder="City"
          className={`auth-input ${errors.city ? "border-red-500" : ""}`}
          value={locationData.city}
          onChange={handleChange}
        />
        {errors.city && (
          <p className="mt-1 text-sm text-red-500">{errors.city}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
        <Input
          type="text"
          name="address"
          placeholder="Street address"
          className="auth-input"
          value={locationData.address}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">ZIP/Postal Code</label>
        <Input
          type="text"
          name="zipCode"
          placeholder="ZIP or Postal code"
          className="auth-input"
          value={locationData.zipCode}
          onChange={handleChange}
        />
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

export default LocationStep;
