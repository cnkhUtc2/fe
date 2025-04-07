import React from "react";

export default function PayFail() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="h-8 w-8 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Donation Failed
          </h2>
          <p className="text-gray-600 mb-6">
            We're sorry, but there was an issue processing your donation.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Possible reasons:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Payment method declined</li>
            <li>• Insufficient funds</li>
            <li>• Network connectivity issues</li>
            <li>• Card expired or invalid</li>
          </ul>
        </div>

        <div className="space-y-4">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors">
            Try Again
          </button>
          <button className="w-full bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 py-2 px-4 rounded-md font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500">
        Need help? Email us at{" "}
        <span className="text-blue-600">support@example.org</span>
      </p>
    </div>
  );
}
