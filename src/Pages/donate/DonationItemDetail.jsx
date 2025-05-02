import { useEffect, useState } from "react";
import { getDonationItemById } from "../../apis/services/DonationItemsService";
import { useParams } from "react-router-dom";
import { Calendar, Package, User, Clock, Info } from "lucide-react";
import _ from "lodash";

export default function DonationItemDetail() {
  const { id } = useParams();
  const [donationItem, setDonationItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonationItemById = async () => {
      try {
        setLoading(true);
        const res = await getDonationItemById(id);
        setDonationItem(res.data);
      } catch (err) {
        setError("Failed to load donation item details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonationItemById();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error || !donationItem)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            {error || "Unable to load donation item"}
          </span>
        </div>
      </div>
    );

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Map status to appropriate color
  const getStatusColor = (status) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-100 text-blue-800";
      case "ACCEPTED":
        return "bg-green-100 text-green-800";
      case "DECLINED":
        return "bg-red-100 text-red-800";
      case "ORDER CREATED":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      {/* Header with Status */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 sm:mb-0">
          Donation Details
        </h1>
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            donationItem.status
          )}`}
        >
          {donationItem.status}
        </div>
      </div>

      {/* Donor and Created By Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Donor Information
            </h2>
          </div>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Name:</span> {donationItem.donorName}
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <User className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Created By</h2>
          </div>
          {donationItem.createdBy && (
            <>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Name:</span>{" "}
                {donationItem.createdBy.name}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Email:</span>{" "}
                {donationItem.createdBy.email}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Donation Items */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Package className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Donation Items
          </h2>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dimensions (L×W×H)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Weight
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donationItem.items &&
                donationItem.items.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.length} × {item.width} × {item.height}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.weight}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.price || 0}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Date Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">Created</h2>
          </div>
          <p className="text-gray-700">{formatDate(donationItem.createdAt)}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center mb-2">
            <Clock className="h-5 w-5 text-gray-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-800">
              Last Updated
            </h2>
          </div>
          <p className="text-gray-700">{formatDate(donationItem.updatedAt)}</p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Info className="h-5 w-5 text-gray-500 mr-2" />
          <h2 className="text-lg font-semibold text-gray-800">
            Additional Information
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="text-gray-700">
            <span className="font-medium">ID:</span> {donationItem._id}
          </p>
        </div>
      </div>
    </div>
  );
}
