import React from "react";

const SignupSuccess = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-6 rounded shadow text-center max-w-sm">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Signup Request Submitted</h2>
        <p className="text-gray-500 mb-4">
          Your signup request has been sent to our support team. You will be notified once your account is verified.
        </p>
        <a
          href="/"
          className="text-blue-500 hover:underline text-sm"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default SignupSuccess;
