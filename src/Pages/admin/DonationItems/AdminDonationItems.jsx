import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Eye, Trash2, Loader2 } from "lucide-react";
import UserContext from "../../../../UserContext";
import {
  deleteAdminDonationItems,
  getAllDonationItems,
  updateDonationItem,
} from "../../../apis/services/DonationItemsService";

export default function UserDonationItems() {
  const user = useContext(UserContext);
  const [donationItems, setDonationItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const navigate = useNavigate();

  const STATUS_OPTIONS = ["OPEN", "ACCEPTED", "DECLINED", "ORDER CREATED"];

  useEffect(() => {
    const fetchAllDonations = async () => {
      try {
        setLoading(true);
        const res = await getAllDonationItems({ isAll: true, limit: 0 });
        setDonationItems(res.data.items);
      } catch (err) {
        console.error("Error fetching donation items:", err);
        setError("Failed to load donation items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchAllDonations();
    }
  }, [user]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donation item?")) {
      try {
        await deleteAdminDonationItems([id]);
        setDonationItems((items) => items.filter((item) => item._id !== id));
        alert("Donation item deleted successfully");
      } catch (err) {
        console.error("Error deleting donation item:", err);
        alert("Failed to delete donation item. Please try again.");
      }
    }
  };

  const handleView = (id) => {
    navigate(`/donation-item/${id}`);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      setUpdatingStatus(id);
      await updateDonationItem(id, { status: newStatus });

      // Update the local state with the new status
      setDonationItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );

      alert(`Status updated to ${newStatus} successfully`);
    } catch (err) {
      console.error("Error updating donation status:", err);
      alert("Failed to update donation status. Please try again.");
    } finally {
      setUpdatingStatus(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        <p className="ml-2 text-gray-600">Loading donation items...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {donationItems.length === 0 ? (
        <div className="bg-gray-50 p-8 text-center rounded-md">
          <p className="text-gray-600">
            You haven't created any donation items yet.
          </p>
          <Link
            to="/donations/create"
            className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Create Your First Donation
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {donationItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.donorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.message.length > 25
                      ? `${item.message.slice(0, 25)}...`
                      : item.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.items.length}{" "}
                    {item.items.length === 1 ? "item" : "items"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        item.status === "OPEN"
                          ? "bg-green-100 text-green-800"
                          : item.status === "ACCEPTED"
                          ? "bg-blue-100 text-blue-800"
                          : item.status === "DECLINED"
                          ? "bg-red-100 text-red-800"
                          : item.status === "ORDER CREATED"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(item._id)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                        title="View Details"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete Item"
                      >
                        <Trash2 size={18} />
                      </button>
                      <div className="relative">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusChange(item._id, e.target.value)
                          }
                          disabled={updatingStatus === item._id}
                          className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-2 py-1 rounded-md shadow-sm text-sm leading-5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {STATUS_OPTIONS.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        {updatingStatus === item._id && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <Loader2
                              size={16}
                              className="animate-spin text-blue-500"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
