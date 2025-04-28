import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DonateItemsSuccess() {
  const location = useLocation();
  const [donationItemId, setDonationItemId] = useState(null);

  useEffect(() => {
    // Check if we have a donation item ID in the query params
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    if (id) {
      setDonationItemId(id);
    }
  }, [location]);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg text-center">
      <div className="mb-6">
        <svg
          className="mx-auto h-16 w-16 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h1 className="text-3xl font-bold mb-4">Thank You for Your Donation!</h1>

      <div className="mb-6 text-gray-600">
        <p className="mb-3">
          Your item donation has been successfully submitted. Our team will
          review your donation and contact you soon to arrange the pickup of
          your items.
        </p>
        <p>
          Your generosity makes a real difference in our community and helps
          those in need.
        </p>
      </div>

      {donationItemId && (
        <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-md">
          <h2 className="font-semibold text-green-800 mb-2">
            Create Shipping Order
          </h2>
          <p className="text-green-700 mb-4">
            Would you like to arrange shipping for your donated items now?
          </p>
          <Link
            to={`/orders/create/${donationItemId}`}
            className="inline-block px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Create Shipping Order
          </Link>
        </div>
      )}

      <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-md">
        <h2 className="font-semibold text-blue-800 mb-2">What happens next?</h2>
        <ul className="text-left text-blue-700 pl-5 list-disc">
          <li className="mb-1">
            Our team will review your donation submission
          </li>
          <li className="mb-1">
            We'll contact you to confirm details and arrange pickup
          </li>
          <li className="mb-1">
            Your donated items will be processed and distributed to those in
            need
          </li>
          <li>
            You'll receive a confirmation once your donation has been processed
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          to="/"
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Return to Home
        </Link>
        <Link
          to="/donate"
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Make Another Donation
        </Link>
      </div>
    </div>
  );
}
