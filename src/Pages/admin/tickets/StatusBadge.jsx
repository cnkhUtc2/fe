import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export const StatusBadge = ({ status }) => {
  let badgeClass = "";
  let icon = null;

  switch (status) {
    case "OPEN":
      badgeClass = "bg-blue-100 text-blue-800";
      icon = <Clock size={16} className="mr-1" />;
      break;
    case "CLOSED":
      badgeClass = "bg-green-100 text-green-800";
      icon = <CheckCircle size={16} className="mr-1" />;
      break;
    case "PENDING":
      badgeClass = "bg-yellow-100 text-yellow-800";
      icon = <AlertCircle size={16} className="mr-1" />;
      break;
    default:
      badgeClass = "bg-gray-100 text-gray-800";
      icon = <Clock size={16} className="mr-1" />;
  }

  return (
    <span
      className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${badgeClass}`}
    >
      {icon}
      {status}
    </span>
  );
};
