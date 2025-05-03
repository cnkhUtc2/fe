import { useState, useEffect } from "react";
import { Trash2, Edit, RefreshCcw, AlertCircle } from "lucide-react";
import {
  deleteReliefCases,
  getAllReliefCases,
} from "../../../apis/services/ReliefCaseService";
import { useNavigate } from "react-router-dom";

// This is our main component for managing relief cases
export default function ManageReliefCase() {
  // State management
  const [reliefCases, setReliefCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const navigate = useNavigate();

  const fetchReliefCases = async () => {
    setLoading(true);
    try {
      const res = await getAllReliefCases({ isAll: true });
      setReliefCases(res.data.items);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch relief cases. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReliefCases();
  }, []);

  // Handle delete case
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this relief case?")) {
      try {
        const res = await deleteReliefCases([id]);
        setReliefCases(
          reliefCases.filter((reliefCase) => reliefCase._id !== id)
        );
        showNotification("Relief case deleted successfully", "success");
      } catch (err) {
        showNotification("Failed to delete relief case", "error");
      }
    }
  };

  // Navigate to the edit page
  const handleNavigateToEdit = (id) => {
    navigate(`/update/relief-case/${id}`);
  };

  // Show notification message
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Get priority badge styling based on priority level
  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case "LOW":
        return "bg-gray-100 text-gray-800";
      case "MEDIUM":
        return "bg-blue-100 text-blue-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "EMERGENCY":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCcw className="animate-spin h-8 w-8 text-blue-500" />
        <span className="ml-2">Loading relief cases...</span>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="ml-2 text-red-700">{error}</p>
        </div>
        <button
          className="mt-3 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
          onClick={fetchReliefCases}
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Relief Cases
        </h1>
        <p className="text-gray-600">View, update or delete relief cases</p>
      </div>

      {/* Notification */}
      {notification.show && (
        <div
          className={`mb-4 p-3 rounded-md ${
            notification.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {notification.message}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Case Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {reliefCases.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No relief cases found
                </td>
              </tr>
            ) : (
              reliefCases.map((reliefCase) => (
                <tr key={reliefCase._id}>
                  <td className="px-6 py-4">{reliefCase.caseName}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        reliefCase.status === "ACTIVE"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {reliefCase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadgeStyle(
                        reliefCase.priority
                      )}`}
                    >
                      {reliefCase.priority || "NOT SET"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {reliefCase.contactEmail}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleNavigateToEdit(reliefCase._id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(reliefCase._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Refresh button */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={fetchReliefCases}
          className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>
    </div>
  );
}
