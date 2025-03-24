
import { useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import AnimatedContainer from "@/components/shared/AnimatedContainer";

const Index = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Gradient Circles */}
      <div className="absolute -z-10 top-0 left-0 right-0 bottom-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-100 blur-3xl opacity-20 -top-20 -left-20"></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-green-100 blur-3xl opacity-20 -bottom-20 -right-20"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-[#d8f44c] blur-3xl opacity-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#234034] to-[#234034]">
            Elegant
          </span> Auth
        </h1>
        <p className="text-gray-600 max-w-md">
          A beautiful authentication experience with seamless multi-step registration
        </p>
      </div>
      
      <div className="w-full max-w-md">
        <AnimatedContainer
          isVisible={isLogin}
          animationIn="animate-scale-in"
          animationOut="animate-scale-out"
          duration={400}
        >
          {isLogin && <LoginForm onRegisterClick={handleToggle} />}
        </AnimatedContainer>
        
        <AnimatedContainer
          isVisible={!isLogin}
          animationIn="animate-scale-in"
          animationOut="animate-scale-out"
          duration={400}
        >
          {!isLogin && <RegisterForm onLoginClick={handleToggle} />}
        </AnimatedContainer>
      </div>
      
      <div className="mt-14 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Elegant Auth. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Index;
