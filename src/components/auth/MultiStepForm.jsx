
import { useState } from "react";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import AccountStep from "./FormSteps/AccountStep";
import ProfileStep from "./FormSteps/ProfileStep";
import LocationStep from "./FormSteps/LocationStep";
import SkillsStep from "./FormSteps/SkillsStep";
import WorkExperienceStep from "./FormSteps/WorkExperienceStep";
import EducationStep from "./FormSteps/EducationStep";

const MultiStepForm = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    // Account details
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    accountType: "personal",
    
    // Profile details
    overview: "",
    gender: "",
    birthdate: "",
    phoneNumber: "",
    profilePicture: null,
    
    // Location details
    country: "",
    state: "",
    address: "",
    city: "",
    zipCode: "",
    
    // Skills details
    service: "",
    serviceCategory: "",
    skillLevel: "beginner",
    expectedSalary: "",
    currency: "USD",
    
    // Work Experience (array of objects)
    workExperiences: [
      {
        organization: "",
        designation: "",
        from: "",
        to: "",
        currentlyWorking: false,
        description: ""
      }
    ],
    
    // Education (array of objects)
    educations: [
      {
        degree: "",
        institute: "",
        startYear: "",
        endYear: "",
        currentlyStudying: false,
        results: ""
      }
    ]
  });

  const steps = [
    "Account",
    "Profile",
    "Location",
    "Skills",
    "Work Experience",
    "Education"
  ];

  const updateFormData = (stepData, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: stepData
    }));
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setStep(prevStep => prevStep - 1);
  };

  const handleSubmit = () => {
    console.log("Form submitted with data:", formData);
    onComplete();
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <AccountStep
            accountData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
          />
        );
      case 1:
        return (
          <ProfileStep
            profileData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <LocationStep
            locationData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <SkillsStep
            skillsData={formData}
            onInputChange={handleInputChange}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <WorkExperienceStep
            workExperiences={formData.workExperiences}
            updateFormData={updateWorkExperiences => updateFormData(updateWorkExperiences, "workExperiences")}
            onNext={handleNext}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <EducationStep
            educations={formData.educations}
            updateFormData={updateEducations => updateFormData(updateEducations, "educations")}
            onNext={handleSubmit}
            onBack={handleBack}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="auth-form-container animate-scale-in">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
        Create Account
      </h2>
      <p className="text-gray-600 text-center mb-6">
        {steps[step]}
      </p>
      
      <ProgressIndicator steps={steps.length} currentStep={step} className="mb-6" />
      
      {renderStep()}
    </div>
  );
};

export default MultiStepForm;
