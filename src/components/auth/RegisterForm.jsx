
import { useState } from "react";
import MultiStepForm from "./MultiStepForm";

const RegisterForm = ({ onLoginClick }) => {
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleComplete = () => {
    setRegistrationComplete(true);
    
    // Redirect to login after registration
    setTimeout(() => {
      onLoginClick();
    }, 2000);
  };

  if (registrationComplete) {
    return (
      <div className="auth-form-container animate-scale-in text-center py-12">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg 
            className="w-10 h-10 text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Registration Complete!
        </h2>
        
        <p className="text-gray-600 mb-8">
          Your account has been successfully created. Redirecting you to login...
        </p>
        
        <div className="w-12 h-12 border-t-4 border-[#234034] border-solid rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return <MultiStepForm onComplete={handleComplete} />;
};

export default RegisterForm;
