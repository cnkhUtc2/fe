import { useState } from "react";
import {
  Calendar,
  User,
  Clock,
  MapPin,
  MessageCircle,
  Shield,
} from "lucide-react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const estimateReadingTime = (time) => {
  return `${time} min read`;
};

export default function FloodAidPost({ post }) {
  const [imageError, setImageError] = useState(false);
  const isAdmin = post?.createdBy?.role === "667940bbf2b6c4781339f664";

  const handlePostClick = () => {
    window.location.href = `/post/${post._id}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col ${
        isAdmin ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="relative h-56 bg-blue-50">
        {/* Admin Badge */}
        {isAdmin && (
          <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white rounded-full py-1 px-3 flex items-center text-sm font-medium shadow-md">
            <Shield size={14} className="mr-1" />
            <span>Official</span>
          </div>
        )}

        {/* Featured Image */}
        {!imageError ? (
          <img
            src={post?.featuredImage?.filePath}
            alt={post?.featuredImage?.alt || post?.name}
            className="w-full h-56 object-contain bg-white p-2"
            onError={handleImageError}
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center bg-blue-50 ${
              isAdmin ? "text-blue-500" : "text-blue-300"
            }`}
          >
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🌊</div>
              <p>Flood Aid Community</p>
            </div>
          </div>
        )}

        {/* Optional location indicator */}
        {post?.location && (
          <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white rounded-full py-1 px-3 flex items-center text-sm">
            <MapPin size={14} className="mr-1" />
            <span className="truncate max-w-xs">{post.location}</span>
          </div>
        )}
      </div>

      {/* Content Section - Flexible heights with ellipsis */}
      <div
        className={`p-4 flex-grow flex flex-col ${isAdmin ? "bg-blue-50" : ""}`}
        onClick={handlePostClick}
      >
        {/* Title with ellipsis */}
        <div className="mb-2">
          <h2
            className={`text-xl font-bold line-clamp-2 ${
              isAdmin ? "text-blue-800" : "text-gray-800"
            }`}
          >
            {post?.name}
          </h2>
        </div>

        {/* Description with ellipsis */}
        <div className="mb-4">
          <p className="text-gray-600 line-clamp-2">{post?.shortDescription}</p>
        </div>

        <div className="mt-auto">
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <User size={16} className="mr-1" />
            <span
              className={`font-medium truncate ${
                isAdmin ? "text-blue-700" : "text-blue-600"
              }`}
            >
              {post?.createdBy?.name || "Anonymous"}
              {isAdmin && " (Admin)"}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(post?.createdAt)}</span>
            </div>

            {post?.estimatedReadingTime && (
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{estimateReadingTime(post.estimatedReadingTime)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `/post/${post?._id}#comments`;
              }}
              className={`flex items-center transition-colors ${
                isAdmin
                  ? "text-blue-600 hover:text-blue-700"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              <MessageCircle size={18} className="mr-1" />
              <span>{post?.commentCount || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
