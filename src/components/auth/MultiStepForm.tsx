
import { useState } from "react";
import { formSteps } from "@/lib/constants";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import BasicInfoStep from "./FormSteps/BasicInfoStep";
import ProfileInfoStep from "./FormSteps/ProfileInfoStep";
import LocationStep from "./FormSteps/LocationStep";
import SkillsStep from "./FormSteps/SkillsStep";
import ExperienceStep from "./FormSteps/ExperienceStep";
import EducationStep from "./FormSteps/EducationStep";
import AnimatedContainer from "../shared/AnimatedContainer";

interface Experience {
  id: string;
  organization: string;
  designation: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  currentlyWorking: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  institute: string;
  startYear: Date | undefined;
  endYear: Date | undefined;
  currentlyStudying: boolean;
  result: string;
}

interface MultiStepFormProps {
  onComplete: () => void;
}

const MultiStepForm = ({ onComplete }: MultiStepFormProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  // Form data for each step
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "Candidate" as "Candidate" | "Company"
  });
  
  const [profileData, setProfileData] = useState({
    overview: "",
    gender: "",
    birthdate: undefined as Date | undefined,
    phoneNumber: "",
    profilePicture: null as File | null
  });
  
  const [locationData, setLocationData] = useState({
    country: "",
    state: "",
    address: "",
    city: "",
    zipCode: ""
  });
  
  const [skillsData, setSkillsData] = useState({
    serviceCategory: "",
    skillLevel: "",
    expectedSalary: "",
    salaryCurrency: ""
  });
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);

  const handleBasicInfoChange = (name: string, value: string) => {
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleUserTypeChange = (type: "Candidate" | "Company") => {
    setUserData(prev => ({ ...prev, userType: type }));
  };

  const handleProfileInfoChange = (name: string, value: string | Date | File | null) => {
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleLocationChange = (name: string, value: string) => {
    setLocationData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (name: string, value: string) => {
    setSkillsData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddExperience = (experience: Experience) => {
    setExperiences(prev => [...prev, experience]);
  };

  const handleRemoveExperience = (id: string) => {
    setExperiences(prev => prev.filter(exp => exp.id !== id));
  };

  const handleAddEducation = (education: Education) => {
    setEducations(prev => [...prev, education]);
  };

  const handleRemoveEducation = (id: string) => {
    setEducations(prev => prev.filter(edu => edu.id !== id));
  };

  const nextStep = () => {
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="auth-form-container animate-scale-in">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
        Create Your Account
      </h2>
      
      <h3 className="text-sm text-center text-gray-500 mb-6">
        {formSteps[currentStep].description}
      </h3>
      
      <ProgressIndicator 
        steps={formSteps.length} 
        currentStep={currentStep} 
      />
      
      <div className="mt-6">
        <AnimatedContainer
          isVisible={currentStep === 0}
          animationIn="animate-fade-in"
          animationOut="animate-fade-out"
        >
          {currentStep === 0 && (
            <BasicInfoStep
              userData={userData}
              onInputChange={handleBasicInfoChange}
              onUserTypeChange={handleUserTypeChange}
              onNext={nextStep}
            />
          )}
        </AnimatedContainer>
        
        <AnimatedContainer
          isVisible={currentStep === 1}
          animationIn="animate-fade-in"
          animationOut="animate-fade-out"
        >
          {currentStep === 1 && (
            <ProfileInfoStep
              profileData={profileData}
              onInputChange={handleProfileInfoChange}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
        </AnimatedContainer>
        
        <AnimatedContainer
          isVisible={currentStep === 2}
          animationIn="animate-fade-in"
          animationOut="animate-fade-out"
        >
          {currentStep === 2 && (
            <LocationStep
              locationData={locationData}
              onInputChange={handleLocationChange}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
        </AnimatedContainer>
        
        <AnimatedContainer
          isVisible={currentStep === 3}
          animationIn="animate-fade-in"
          animationOut="animate-fade-out"
        >
          {currentStep === 3 && (
            <SkillsStep
              skillsData={skillsData}
              onInputChange={handleSkillsChange}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
        </AnimatedContainer>
        
        <AnimatedContainer
          isVisible={currentStep === 4}
          animationIn="animate-fade-in"
          animationOut="animate-fade-out"
        >
          {currentStep === 4 && (
            <ExperienceStep
              experiences={experiences}
              onAddExperience={handleAddExperience}
              onRemoveExperience={handleRemoveExperience}
              onNext={nextStep}
              onBack={prevStep}
            />
          )}
        </AnimatedContainer>
        
        <AnimatedContainer
          isVisible={currentStep === 5}
          animationIn="animate-fade-in"
          animationOut="animate-fade-out"
        >
          {currentStep === 5 && (
            <EducationStep
              educations={educations}
              onAddEducation={handleAddEducation}
              onRemoveEducation={handleRemoveEducation}
              onComplete={onComplete}
              onBack={prevStep}
            />
          )}
        </AnimatedContainer>
      </div>
    </div>
  );
};

export default MultiStepForm;
