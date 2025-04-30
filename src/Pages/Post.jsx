import { useState } from "react";
import { Calendar, User, Clock, MapPin, MessageCircle } from "lucide-react";

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

const FloodAidPost = ({ post }) => {
  const [imageError, setImageError] = useState(false);

  const handlePostClick = () => {
    window.location.href = `/post/${post._id}`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  // Determine post type styling
  const isUrgent = post.type === "urgent";
  const isSuccess = post.type === "success";
  const isSupport = post.type === "support";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 max-w-md mx-auto">
      {/* Optional ribbon based on post type */}
      {isUrgent && (
        <div className="absolute top-4 right-0 bg-red-600 text-white py-1 px-3 shadow-md z-10 rounded-l-lg font-medium text-sm">
          Urgent Help Needed
        </div>
      )}
      {isSuccess && (
        <div className="absolute top-4 right-0 bg-green-600 text-white py-1 px-3 shadow-md z-10 rounded-l-lg font-medium text-sm">
          Success Story
        </div>
      )}
      {isSupport && (
        <div className="absolute top-4 right-0 bg-blue-600 text-white py-1 px-3 shadow-md z-10 rounded-l-lg font-medium text-sm">
          Support Offering
        </div>
      )}

      <div className="relative">
        {/* Featured Image */}
        <div className="relative h-56 w-full bg-blue-50">
          {!imageError ? (
            <img
              src={post.featuredImage?.filePath}
              alt={post.featuredImage?.alt || post.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-50 text-blue-300">
              <div className="text-center p-4">
                <div className="text-4xl mb-2">🌊</div>
                <p>Flood Aid Community</p>
              </div>
            </div>
          )}

          {/* Optional location indicator */}
          {post.location && (
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white rounded-full py-1 px-3 flex items-center text-sm">
              <MapPin size={14} className="mr-1" />
              <span>{post.location}</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4" onClick={handlePostClick}>
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {post.name}
          </h2>

          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.shortDescription}
          </p>

          <div className="flex items-center text-sm text-gray-500 mb-2">
            <User size={16} className="mr-1" />
            <span className="font-medium text-blue-600">
              {post.createdBy?.name || "Anonymous"}
            </span>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>

            {post.estimatedReadingTime && (
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
                window.location.href = `/post/${post._id}#comments`;
              }}
              className="flex items-center text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle size={18} className="mr-1" />
              <span>{post.commentCount || 5}</span> {/* Default for demo */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example usage component that shows posts in feed format
const FloodAidFeed = () => {
  // This would typically come from an API call
  const posts = [
    {
      _id: "6811eb3e647544cf52b9d094",
      name: "Urgent: Need Assistance in Downtown Area",
      type: "urgent",
      location: "Downtown, City Name",
      featuredImage: {
        filePath: "/api/placeholder/400/320", // Using placeholder in demo
        alt: "Flooded street in downtown area",
      },
      shortDescription:
        "Our family home has been severely flooded and we're in need of immediate assistance with temporary shelter and basic supplies.",
      createdBy: {
        name: "Sarah Johnson",
      },
      estimatedReadingTime: "2",
      createdAt: "2025-04-30T09:19:58.051Z",
      commentCount: 7,
      likeCount: 18,
    },
    {
      _id: "6811eb3e647544cf52b9d095",
      name: "Community Relief Center Established at Central High School",
      type: "support",
      location: "Central District",
      featuredImage: {
        filePath: "/api/placeholder/400/320", // Using placeholder in demo
        alt: "Volunteers at Central High School relief center",
      },
      shortDescription:
        "We've established a community relief center at Central High School gymnasium. Hot meals, clean water, clothing, and medical assistance available daily from 8AM-8PM.",
      createdBy: {
        name: "Flood Aid Volunteer Team",
      },
      estimatedReadingTime: "3",
      createdAt: "2025-04-28T14:30:00.000Z",
      commentCount: 12,
      likeCount: 45,
    },
    {
      _id: "6811eb3e647544cf52b9d096",
      name: "Our Family Is Safe - Thank You Community!",
      type: "success",
      location: "Riverside Community",
      featuredImage: {
        filePath: "/api/placeholder/400/320", // Using placeholder in demo
        alt: "Family together after flood rescue",
      },
      shortDescription:
        "After three days trapped by rising waters, local rescue teams helped us evacuate to safety. We're overwhelmed by the community support and generosity during this difficult time.",
      createdBy: {
        name: "Michael Rodriguez",
      },
      estimatedReadingTime: "4",
      createdAt: "2025-04-26T10:45:00.000Z",
      commentCount: 23,
      likeCount: 89,
    },
  ];

  return (
    <div className="bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800">
            Flood Aid Community
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Share Your Story
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <FloodAidPost key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloodAidFeed;
