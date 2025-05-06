import { useEffect, useState } from "react";
import {
  Calendar,
  User,
  MapPin,
  Mail,
  HelpCircle,
  DollarSign,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { getTicketById } from "../../apis/services/TicketService";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const formatLocation = (location) => {
  return location
    .split(",")
    .map((part) => part.trim())
    .join(", ");
};

export default function FloodAidReliefCase({ reliefCase }) {
  const [imageError, setImageError] = useState(false);
  const [ticket, setTicket] = useState({
    attachments: [],
  });
  const isAdmin = reliefCase?.createdBy?.role === "667940bbf2b6c4781339f664";
  const isEmergency = reliefCase?.priority === "EMERGENCY";

  const handleCaseClick = () => {
    window.location.href = `/flood-aid-relief-case/${reliefCase._id}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  useEffect(() => {
    const fetchTicket = async () => {
      const res = await getTicketById(reliefCase.supportTicket._id);
      console.log(res);
      setTicket(res.data);
    };
    fetchTicket();
  }, [reliefCase._id]);

  const featuredImage = ticket?.attachments[0]?.filePath;

  const getPriorityBadge = () => {
    if (!reliefCase.priority) return null;

    const priorityColors = {
      LOW: "bg-green-100 text-green-800",
      MEDIUM: "bg-yellow-100 text-yellow-800",
      HIGH: "bg-red-100 text-red-800",
      EMERGENCY: "bg-red-600 text-white animate-pulse",
    };

    const color =
      priorityColors[reliefCase.priority] || "bg-gray-100 text-gray-800";

    return (
      <div
        className={`text-xs font-medium px-2 py-1 rounded-full ${color} flex items-center`}
      >
        {reliefCase.priority === "EMERGENCY" && (
          <AlertTriangle size={12} className="mr-1" />
        )}
        {reliefCase.priority}
      </div>
    );
  };

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden transition-all duration-300 h-full flex flex-col transform hover:scale-105 hover:z-10 ${
        isEmergency
          ? "shadow-lg shadow-red-200 ring-2 ring-red-500"
          : isAdmin
          ? "shadow-md shadow-blue-100 ring-2 ring-blue-500"
          : "shadow-md hover:shadow-xl"
      }`}
    >
      <div className="relative h-56 bg-blue-50">
        {/* Relief Case Label */}
        <div className="absolute -right-8 top-6 z-10 bg-blue-700 text-white py-1 px-4 transform rotate-45 shadow-md w-32 text-center">
          Relief Case
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">
          <div
            className={`rounded-full py-1 px-3 text-xs font-medium shadow-md ${
              reliefCase.status === "ACTIVE"
                ? "bg-blue-600 text-white"
                : "bg-gray-600 text-white"
            }`}
          >
            {reliefCase.status}
          </div>
        </div>

        {/* Featured Image */}
        {!imageError && featuredImage ? (
          <img
            src={featuredImage}
            alt={`Relief case: ${reliefCase?.caseName}`}
            className="w-full h-56 object-cover"
            onError={handleImageError}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${
              isEmergency
                ? "bg-red-50 text-red-500"
                : isAdmin
                ? "bg-blue-50 text-blue-500"
                : "bg-blue-50 text-blue-300"
            }`}
          >
            <div className="text-center p-4">
              <div className="text-5xl mb-2">🆘</div>
              <p className="font-medium">Relief Aid Needed</p>
            </div>
          </div>
        )}

        {/* Location indicator */}
        {reliefCase?.location && (
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white rounded-full py-1 px-3 flex items-center text-sm">
            <MapPin size={14} className="mr-1" />
            <span className="truncate max-w-xs">
              {formatLocation(reliefCase.location)}
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div
        className={`p-4 flex-grow flex flex-col ${
          isEmergency ? "bg-red-50" : isAdmin ? "bg-blue-50" : ""
        }`}
        onClick={handleCaseClick}
      >
        <div className="flex justify-between items-start mb-2">
          {/* Title with ellipsis */}
          <h2
            className={`text-xl font-bold line-clamp-2 ${
              isEmergency
                ? "text-red-800"
                : isAdmin
                ? "text-blue-800"
                : "text-gray-800"
            }`}
          >
            {reliefCase?.caseName}
          </h2>

          {/* Priority Badge */}
          {getPriorityBadge()}
        </div>

        {/* Description with ellipsis */}
        <div className="mb-4">
          <p className="text-gray-600 line-clamp-2">
            {reliefCase?.description}
          </p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <User size={16} className="mr-1" />
            <span
              className={`font-medium truncate ${
                isEmergency
                  ? "text-red-700"
                  : isAdmin
                  ? "text-blue-700"
                  : "text-blue-600"
              }`}
            >
              {reliefCase?.createdBy?.name || "Anonymous"}
              {isAdmin && " (Admin)"}
            </span>
          </div>

          <div className="flex flex-col space-y-2 text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(reliefCase?.createdAt)}</span>
            </div>

            <div className="flex items-center">
              <Mail size={16} className="mr-1" />
              <span className="truncate">{reliefCase?.contactEmail}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <DollarSign size={18} className="mr-1 text-green-600" />
              <span className="font-medium">
                {reliefCase?.totalDonations || 0} donations
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/flood-aid-relief-case/${reliefCase?._id}`;
              }}
              className={`flex items-center px-3 py-1 rounded-full ${
                isEmergency
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : isAdmin
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              } transition-colors`}
            >
              <HelpCircle size={16} className="mr-1" />
              <span>Help Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
