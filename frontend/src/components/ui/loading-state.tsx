import React from 'react';

const LoadingComp: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div 
          className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"
        />
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-gray-500 mt-2">Please wait while we prepare your content</p>
      </div>
    </div>
  );
};

export default LoadingComp;