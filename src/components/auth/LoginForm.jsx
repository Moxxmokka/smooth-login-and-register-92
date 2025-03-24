
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import GoogleButton from "@/components/shared/GoogleButton";

const LoginForm = ({ onRegisterClick }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Google login clicked");
    }, 1500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login with:", loginData);
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="auth-form-container animate-scale-in">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Welcome Back
      </h2>
      
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="auth-input"
            value={loginData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="relative">
          <Input
            type={isPasswordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="auth-input pr-10"
            value={loginData.password}
            onChange={handleInputChange}
            required
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
        </div>
        
        <div className="flex justify-end">
          <a href="#" className="text-sm text-[#234034] hover:underline">
            Forgot password?
          </a>
        </div>
        
        <Button
          type="submit"
          className="auth-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>
          ) : (
            "Log In"
          )}
        </Button>
      </form>
      
      <div className="relative flex py-5 items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      
      <GoogleButton onClick={handleGoogleLogin} />
      
      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          className="text-[#234034] hover:underline font-medium"
          onClick={onRegisterClick}
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
