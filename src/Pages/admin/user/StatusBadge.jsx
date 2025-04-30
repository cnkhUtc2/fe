export const StatusBadge = ({ status }) => {
  let bgColor = "bg-gray-200";
  let textColor = "text-gray-800";

  if (status === "ACTIVE") {
    bgColor = "bg-green-100";
    textColor = "text-green-800";
  } else if (status === "INACTIVE") {
    bgColor = "bg-red-100";
    textColor = "text-red-800";
  }
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}
    >
      {status}
    </span>
  );
};
