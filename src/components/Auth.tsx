import React, { useState } from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {isLogin ? (
        <Login onToggleForm={toggleForm} />
      ) : (
        <SignUp onToggleForm={toggleForm} />
      )}
    </div>
  );
};
