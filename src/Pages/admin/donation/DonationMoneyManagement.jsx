import { useEffect, useState } from "react";

export default function DonationMoneyManagement() {
  const [isNavigated, setIsNavigated] = useState(false);

  useEffect(() => {
    // Open payment dashboard in new tab
    window.open(
      "https://sandbox.vnpayment.vn/merchantv2/Home/Dashboard.htm",
      "_blank"
    );

    // Set navigated state to true to display confirmation message
    setIsNavigated(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 rounded-full p-3">
            <svg
              className="w-8 h-8 text-green-500"
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
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Payment Dashboard Opened
        </h2>

        <p className="text-gray-600 mb-6">
          The payment dashboard has been opened in a new tab. If you need to
          access it again, please refresh this page.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition duration-200"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
}
