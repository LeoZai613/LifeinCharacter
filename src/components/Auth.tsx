import React, { useState } from 'react';
import { Login } from './Login';
import { SignUp } from './SignUp';
import { useDebugCharacterStore } from '../stores/debugCharacterStore';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const debugStore = useDebugCharacterStore();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleDebugMode = () => {
    debugStore.isDebugMode = true;
    debugStore.resetCharacter();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Debug Character Button */}
      <div className="w-full max-w-md mb-8">
        <button
          onClick={handleDebugMode}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-purple-300 group-hover:text-purple-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Start with Debug Character
        </button>
      </div>

      <div className="w-full max-w-md">
        {isLogin ? (
          <Login onToggleForm={toggleForm} />
        ) : (
          <SignUp onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};
