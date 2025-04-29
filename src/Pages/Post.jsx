import React, { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar/Avatar";
import { Button } from "../components/ui/button/Button";

// Social Media Input Component
const Post = () => {
  const [inputText, setInputText] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(112);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    if (!inputText.trim() && !selectedImage) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setInputText("");
    setSelectedImage(null);
    setIsLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Create Post Section */}
      <div className="bg-white shadow-md rounded-xl p-6 transform transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center space-x-4">
          <Avatar className="w-10 h-10 transition-transform duration-300 hover:scale-110">
            <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Bạn viết gì đi..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full py-3 px-5 border border-gray-200 rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>

        {selectedImage && (
          <div className="mt-4 relative group">
            <img
              src={selectedImage}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 group-hover:scale-[1.02]"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            className="flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17 6.1H3" />
              <path d="M21 12.1H3" />
              <path d="M15.1 18H3" />
            </svg>
            <span>Bài viết ẩn danh</span>
          </Button>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center space-x-2 bg-gray-50 hover:bg-gray-100 text-gray-700 py-3 rounded-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <circle cx="9" cy="10" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span>Ảnh/video</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />
        </div>

        <Button
          onClick={handlePost}
          disabled={isLoading || (!inputText.trim() && !selectedImage)}
          className={`w-full mt-4 py-3 rounded-lg transition-all duration-300 ${isLoading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white transform hover:scale-[1.02] active:scale-[0.98]`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Đang đăng...</span>
            </div>
          ) : (
            'Đăng bài'
          )}
        </Button>
      </div>

      {/* Post Display Section */}
      <div className="bg-white shadow-md rounded-xl overflow-hidden transform transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center p-6 space-x-4">
          <Avatar className="w-12 h-12 transition-transform duration-300 hover:scale-110">
            <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
            <AvatarFallback>NT</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-base">Người tham gia ẩn danh</div>
            <div className="text-sm text-gray-500">26 tháng 2 lúc 14:13</div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-20 text-2xl font-bold">
          Trình intern bây giờ sao cao v ạ mà vẫn thất nghiệp
        </div>

        <div className="flex justify-between items-center p-6 text-gray-600 border-b">
          <div className="flex items-center space-x-2">
            <span className="font-medium">{likeCount}</span>
            <span>Thích</span>
          </div>
          <div className="flex space-x-6">
            <span>32 bình luận</span>
            <span>4 lượt chia sẻ</span>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x">
          <Button
            onClick={handleLike}
            className={`py-4 flex items-center justify-center space-x-2 text-gray-700 hover:bg-gray-50 transition-all duration-300 ${isLiked ? 'text-red-500' : ''
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform duration-300 ${isLiked ? 'scale-110' : ''}`}
            >
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            <span>Thích</span>
          </Button>
          <Button className="py-4 flex items-center justify-center space-x-2 text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Bình luận</span>
          </Button>
          <Button className="py-4 flex items-center justify-center space-x-2 text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" x2="12" y1="2" y2="15" />
            </svg>
            <span>Chia sẻ</span>
          </Button>
        </div>

        {/* Comments Section */}
        <div className="p-6 space-y-6">
          <div className="flex items-start space-x-4">
            <Avatar className="w-10 h-10 transition-transform duration-300 hover:scale-110">
              <AvatarFallback>350</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <div className="bg-gray-50 p-4 rounded-2xl transition-all duration-300 hover:bg-gray-100">
                <div className="font-semibold text-sm mb-1">
                  Người tham gia ẩn danh 350
                </div>
                <p className="text-sm text-gray-700">
                  Comment
                </p>
              </div>
              <div className="text-xs text-gray-500 mt-2 flex items-center space-x-3">
                <button className="hover:text-indigo-600 transition-colors duration-300">Thích</button>
                <button className="hover:text-indigo-600 transition-colors duration-300">Phản hồi</button>
                <span>4 ngày</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10 transition-transform duration-300 hover:scale-110">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Viết bình luận công khai..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full py-3 px-5 border border-gray-200 rounded-full bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
