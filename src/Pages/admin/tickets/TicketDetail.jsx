import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getTicketById,
  updateTicketStatus,
} from "../../../apis/services/TicketService";
import {
  ArrowLeft,
  MapPin,
  FileText,
  Calendar,
  Tag,
  AlertCircle,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Package,
} from "lucide-react";
import { StatusBadge } from "./StatusBadge";

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        setLoading(true);
        const response = await getTicketById(id);
        setTicket(response.data);
      } catch (err) {
        setError("Failed to fetch ticket details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTicketDetail();
    }
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleImageClick = (attachment) => {
    setSelectedImage(attachment);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdating(true);
      setUpdateMessage({ type: "", text: "" });

      await updateTicketStatus(id, { status: newStatus });

      const response = await getTicketById(id);
      setTicket(response.data);

      setUpdateMessage({
        type: "success",
        text: `Ticket status successfully updated to ${newStatus}`,
      });
    } catch (err) {
      console.error("Error updating status:", err);
      setUpdateMessage({
        type: "error",
        text: "Failed to update ticket status",
      });
    } finally {
      setUpdating(false);

      setTimeout(() => {
        setUpdateMessage({ type: "", text: "" });
      }, 3000);
    }
  };

  const handleCreateReliefCase = () => {
    navigate(`/create-relief-case/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading ticket details...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          <AlertCircle size={24} className="mx-auto mb-2" />
          {error}
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Ticket not found</div>
      </div>
    );
  }

  // Define status options based on current status
  const getStatusButtons = () => {
    const allStatuses = ["OPEN", "ACCEPTED", "DECLINED"];
    return allStatuses.filter((status) => status !== ticket.status);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="px-4 py-6 mx-auto max-w-4xl">
        {/* Back button */}
        <button
          onClick={handleBackClick}
          className="flex items-center mb-4 text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Tickets
        </button>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {ticket.purpose}
                </h1>
                <div className="mt-2 flex items-center">
                  <div className="flex items-center mr-4">
                    <User size={16} className="mr-1 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {ticket.createdBy.name}
                    </span>
                  </div>
                  <div className="flex items-center mr-4">
                    <Calendar size={16} className="mr-1 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <StatusBadge status={ticket.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Status Update Section */}
          <div className="p-6 border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">
                Update Status
              </h2>

              {/* Create Relief Case Button - Only show for ACCEPTED tickets */}
              {ticket.status === "ACCEPTED" && (
                <button
                  onClick={handleCreateReliefCase}
                  className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-md font-medium"
                >
                  <Package size={16} className="mr-2" />
                  Create Relief Case
                </button>
              )}
            </div>

            {/* Status update message */}
            {updateMessage.text && (
              <div
                className={`mb-4 p-3 rounded-md ${
                  updateMessage.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {updateMessage.type === "success" ? (
                  <CheckCircle size={16} className="inline mr-2" />
                ) : (
                  <XCircle size={16} className="inline mr-2" />
                )}
                {updateMessage.text}
              </div>
            )}

            {/* Status update buttons */}
            <div className="flex flex-wrap gap-3">
              {getStatusButtons().map((status) => {
                // Set button colors based on status
                let buttonClass =
                  "flex items-center px-4 py-2 rounded-md font-medium";
                let icon = null;

                switch (status) {
                  case "OPEN":
                    buttonClass +=
                      " bg-blue-100 text-blue-700 hover:bg-blue-200";
                    icon = <Clock size={16} className="mr-2" />;
                    break;
                  case "ACCEPTED":
                    buttonClass +=
                      " bg-green-100 text-green-700 hover:bg-green-200";
                    icon = <CheckCircle size={16} className="mr-2" />;
                    break;
                  case "DECLINED":
                    buttonClass += " bg-red-100 text-red-700 hover:bg-red-200";
                    icon = <XCircle size={16} className="mr-2" />;
                    break;
                  default:
                    buttonClass +=
                      " bg-gray-100 text-gray-700 hover:bg-gray-200";
                }

                return (
                  <button
                    key={status}
                    onClick={() => handleStatusUpdate(status)}
                    disabled={updating}
                    className={
                      buttonClass +
                      (updating ? " opacity-50 cursor-not-allowed" : "")
                    }
                  >
                    {icon}
                    {status.replace("_", " ")}
                    {updating && (
                      <span className="ml-2 animate-pulse">...</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                <FileText size={18} className="mr-2 text-gray-500" />
                Description
              </h2>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">
                {ticket.description || "No description provided"}
              </p>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                <MapPin size={18} className="mr-2 text-gray-500" />
                Location
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">City</p>
                    <p className="text-gray-700">{ticket.city || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Province</p>
                    <p className="text-gray-700">{ticket.province || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Ward</p>
                    <p className="text-gray-700">{ticket.ward || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Address</p>
                    <p className="text-gray-700">{ticket.address || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-medium text-gray-900 mb-2 flex items-center">
                  <Tag size={18} className="mr-2 text-gray-500" />
                  Attachments
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {ticket.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="relative cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => handleImageClick(attachment)}
                    >
                      <img
                        src={attachment.filePath}
                        alt={attachment.alt}
                        className="w-full h-40 object-cover rounded-lg shadow-sm"
                      />
                      <div className="text-xs text-gray-500 mt-1 truncate">
                        {attachment.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Image modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeImageModal}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-medium text-gray-900 truncate">
                {selectedImage.name}
              </h3>
              <button
                onClick={closeImageModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <img
                src={selectedImage.filePath}
                alt={selectedImage.alt}
                className="max-w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right">
              <a
                href={selectedImage.filePath}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Open Original
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
