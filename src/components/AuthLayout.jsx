import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
