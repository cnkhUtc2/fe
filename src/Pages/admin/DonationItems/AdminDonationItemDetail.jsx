import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  getAdminDonationItems,
  updateDonationItem,
} from "../../../apis/services/DonationItemsService";

export default function AdminDonationItemDetail({ id, onBack }) {
  const [donationItem, setDonationItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    fetchDonationItem();
  }, [id]);

  const fetchDonationItem = async () => {
    setLoading(true);
    try {
      // Using the list endpoint with filtering to get a specific item
      const response = await getAdminDonationItems({
        search: JSON.stringify({ _id: id }),
        searchType: "and",
        isAll: true,
      });

      if (
        response &&
        response.data &&
        response.data.items &&
        response.data.items.length > 0
      ) {
        setDonationItem(response.data.items[0]);
      } else {
        setError("Donation item not found");
      }
    } catch (err) {
      setError("Failed to fetch donation item details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    if (!donationItem) return;

    setStatusUpdating(true);
    try {
      await updateDonationItem(id, { status: newStatus });
      setDonationItem({ ...donationItem, status: newStatus });
    } catch (err) {
      setError("Failed to update donation status");
      console.error(err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8">
          <p className="text-gray-600">Loading donation details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 p-4 rounded-md mb-4">
          <p className="text-red-700">{error}</p>
          <button
            onClick={fetchDonationItem}
            className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
        <button onClick={onBack} className="text-blue-600 hover:text-blue-800">
          &larr; Back to Donation Items
        </button>
      </div>
    );
  }

  if (!donationItem) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-600">Donation item not found</p>
        </div>
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          &larr; Back to Donation Items
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-800">
          &larr; Back to Donation Items
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Donation Details</h1>
          <div className="flex gap-2">
            <Link
              to={`/admin/donation-items/${id}/edit`}
              className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
            >
              Edit
            </Link>
            <div className="relative inline-block">
              <button
                className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
                  statusUpdating ? "opacity-75" : ""
                }`}
                disabled={statusUpdating}
                onClick={() =>
                  document
                    .getElementById("status-dropdown")
                    .classList.toggle("hidden")
                }
              >
                Update Status
              </button>
              <div
                id="status-dropdown"
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden"
              >
                <button
                  onClick={() => updateStatus("open")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Mark as Open
                </button>
                <button
                  onClick={() => updateStatus("processing")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Mark as Processing
                </button>
                <button
                  onClick={() => updateStatus("closed")}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Mark as Closed
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Basic Information</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="mb-3">
                <span className="text-gray-600 block">Donation ID:</span>
                <span className="font-medium">{donationItem._id}</span>
              </div>
              <div className="mb-3">
                <span className="text-gray-600 block">Donor Name:</span>
                <span className="font-medium">
                  {donationItem.donorName || "Anonymous"}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-gray-600 block">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    donationItem.status === "open"
                      ? "bg-green-100 text-green-800"
                      : donationItem.status === "closed"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {donationItem.status}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-gray-600 block">Type:</span>
                <span className="font-medium">{donationItem.type}</span>
              </div>
              <div className="mb-3">
                <span className="text-gray-600 block">Created At:</span>
                <span className="font-medium">
                  {formatDate(donationItem.createdAt)}
                </span>
              </div>
              <div className="mb-3">
                <span className="text-gray-600 block">Updated At:</span>
                <span className="font-medium">
                  {formatDate(donationItem.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Message</h2>
            <div className="bg-gray-50 p-4 rounded-md h-full">
              <p className="whitespace-pre-wrap">
                {donationItem.message || "No message provided"}
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">Donated Items</h2>
        {donationItem.items && donationItem.items.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Quantity</th>
                  <th className="py-3 px-4 text-left">Dimensions (L×W×H)</th>
                  <th className="py-3 px-4 text-left">Weight</th>
                  <th className="py-3 px-4 text-left">Category</th>
                </tr>
              </thead>
              <tbody>
                {donationItem.items.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4">{item.name}</td>
                    <td className="py-2 px-4">{item.quantity}</td>
                    <td className="py-2 px-4">{`${item.length}×${item.width}×${item.height} cm`}</td>
                    <td className="py-2 px-4">{`${item.weight} kg`}</td>
                    <td className="py-2 px-4">
                      {item.category?.name || item.categories}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4 bg-gray-50 rounded-md">
            <p className="text-gray-600">No items found in this donation</p>
          </div>
        )}
      </div>
    </div>
  );
}
