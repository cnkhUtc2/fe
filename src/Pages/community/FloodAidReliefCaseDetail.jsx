import { useState, useEffect } from "react";
import {
  MapPin,
  Calendar,
  User,
  Heart,
  AlertTriangle,
  Clock,
  Mail,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getReliefCase } from "../../apis/services/ReliefCaseService";
import { getTicketById } from "../../apis/services/TicketService";

export default function FloodAidReliefCaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [reliefCase, setReliefCase] = useState(null);
  const [ticket, setTicket] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReliefCaseDetail = async () => {
      try {
        setLoading(true);
        const res = await getReliefCase(id);
        setReliefCase(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load relief case details. Please try again.");
        setLoading(false);
      }
    };

    fetchReliefCaseDetail();
  }, [id]);

  useEffect(() => {
    const fetchTicket = async () => {
      const res = await getTicketById(reliefCase.supportTicket._id);
      setTicket(res.data);
    };
    fetchTicket();
  }, [reliefCase?.supportTicket?._id]);

  const handleDonateClick = () => {
    navigate(`/donate-relief-case/${id}`);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "LOW":
        return "bg-blue-100 text-blue-800";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "EMERGENCY":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    return status === "ACTIVE"
      ? "bg-green-100 text-green-800"
      : "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Error</h2>
          <p className="text-red-600">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!reliefCase) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-gray-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Relief Case Not Found
          </h2>
          <p className="text-gray-600">
            The relief case you're looking for doesn't exist or has been
            removed.
          </p>
        </div>
      </div>
    );
  }

  // Format date to be more readable
  const formattedDate = new Date(reliefCase.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Get the first image from attachments for featured image
  const featuredImage =
    ticket.attachments?.[0]?.filePath || "/api/placeholder/800/400";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Featured Image */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="relative w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={featuredImage}
            alt={reliefCase.caseName}
            className="w-full object-cover h-64 md:h-80"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex flex-wrap gap-2 mb-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  reliefCase.status
                )}`}
              >
                {reliefCase.status}
              </span>
              {reliefCase.priority && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                    reliefCase.priority
                  )}`}
                >
                  {reliefCase.priority}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {reliefCase.caseName}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-sm">
                  {reliefCase.createdBy?.name || "Unknown User"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-sm">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span className="text-sm">{reliefCase.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Case Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="max-w-none">
              {/* Description Section */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Case Description
                </h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  {reliefCase.description}
                </p>
              </div>

              {/* Contact Information */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Contact Information
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail size={16} />
                  <span>{reliefCase.contactEmail}</span>
                </div>
              </div>

              {/* Donation Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Donation Status
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  <Heart size={16} />
                  <span>
                    Total Donations: ${reliefCase.totalDonations.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Photos Gallery */}
          {reliefCase.supportTicket?.attachments?.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Photos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {ticket?.attachments?.map((attachment) => (
                  <div
                    key={attachment._id}
                    className="overflow-hidden rounded-lg"
                  >
                    <img
                      src={attachment.filePath}
                      alt={attachment.alt || "Relief case image"}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Location Information */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Location Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-gray-700">Address</h3>
                <p className="text-gray-600">
                  {reliefCase.supportTicket?.address}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Ward</h3>
                <p className="text-gray-600">
                  {reliefCase.supportTicket?.ward}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">City</h3>
                <p className="text-gray-600">
                  {reliefCase.supportTicket?.city}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Province</h3>
                <p className="text-gray-600">
                  {reliefCase.supportTicket?.province}
                </p>
              </div>
            </div>
          </div>

          {/* User/Admin Details */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={32} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {reliefCase.createdBy?.name || "Unknown User"}
                </h3>
                <p className="text-gray-600">{reliefCase.createdBy?.email}</p>
              </div>
            </div>
          </div>

          {/* Donate Button Section - Show only if status is ACTIVE */}
          {reliefCase.status === "ACTIVE" && (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
              <h3 className="text-xl font-bold mb-4">
                Support This Relief Effort
              </h3>
              <p className="text-gray-600 mb-4">
                Your donation will directly help those affected by this flood
                disaster.
              </p>
              <button
                onClick={handleDonateClick}
                className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center gap-2 mx-auto"
              >
                <Heart size={20} />
                <span className="font-medium">Donate Now</span>
              </button>
            </div>
          )}

          {/* Case Closed Notice - Show only if status is CLOSED */}
          {reliefCase.status === "CLOSED" && (
            <div className="bg-gray-100 rounded-xl shadow-lg p-8 mb-8 text-center">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle size={32} className="text-gray-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">
                This Relief Case is Closed
              </h3>
              <p className="text-gray-600">
                This case is no longer accepting donations. Thank you to
                everyone who contributed.
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3"></div>
            <button
              onClick={() => navigate("/relief-cases")}
              className="text-blue-600 hover:underline"
            >
              Back to Relief Cases
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
