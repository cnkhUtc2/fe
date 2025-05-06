import { useState, useEffect } from "react";
import { Clock, Calendar, User, Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { getPost } from "../../apis/services/PostService";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const res = await getPost(id);
        setPost(res.data.items[0]);
        setLoading(false);
      } catch (err) {
        setError("Failed to load post details. Please try again.");
        setLoading(false);
      }
    };

    fetchPostDetail();
  }, [id]);

  const handleDonateClick = () => {
    navigate("/donate");
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

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-gray-50 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Post Not Found
          </h2>
          <p className="text-gray-600">
            The post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  // Format date to be more readable
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section with Featured Image - container with better fit */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <div className="relative w-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={post.featuredImage?.filePath || "/api/placeholder/800/400"}
            alt={post.name}
            className="w-full object-contain max-h-80"
          />
          <div className="absolute bottom-0 left-0 right-0 z-20 flex flex-col p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {post.name}
            </h1>
            <p className="text-base text-white/90 mb-3">
              {post.shortDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-sm">
                  {post.createdBy?.name || "Unknown Author"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-sm">{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span className="text-sm">
                  {post.estimatedReadingTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="max-w-none">
              {/* Content Section */}
              <div className="mb-8">
                <p className="text-lg leading-relaxed text-gray-700">
                  {post.longDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Author Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User size={32} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {post.createdBy?.name || "Unknown Author"}
                </h3>
                <p className="text-gray-600">Author</p>
              </div>
            </div>
          </div>

          {/* Donate Button Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
            <h3 className="text-xl font-bold mb-4">Support Our Work</h3>
            <p className="text-gray-600 mb-4">
              If you found this content valuable, consider making a donation to
              support more content like this.
            </p>
            <button
              onClick={handleDonateClick}
              className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition flex items-center justify-center gap-2 mx-auto"
            >
              <Heart size={20} />
              <span className="font-medium">Donate Now</span>
            </button>
          </div>

          {/* Share and Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-3"></div>
            <button className="text-blue-600 hover:underline">
              Back to Community Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
