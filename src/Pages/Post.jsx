import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar/Avatar";
import { Button } from "../components/ui/button/Button";

// Social Media Input Component
const Post = () => {
  const [inputText, setInputText] = useState("");
  const [commentText, setCommentText] = useState("");

  return (
    <div>
      <div className="bg-white shadow-sm rounded-lg p-4 max-w-2xl mx-auto">
        <div className="flex items-center space-x-4">
          {/* Avatar */}
          <Avatar>
            <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          {/* Input Field */}
          <div className="flex-grow relative">
            <input
              type="text"
              placeholder="Bạn viết gì đi..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full py-2 px-4 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 mt-4 border-t pt-4">
          {/* Bài viết ẩn danh */}
          <Button className="flex items-center justify-center space-x-2">
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

          {/* Ảnh/video */}
          <Button className="flex items-center justify-center space-x-2">
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
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-lg mt-5">
        {/* Post Header */}
        <div className="flex items-center p-4 space-x-3">
          <Avatar>
            <AvatarImage src="/api/placeholder/40/40" alt="Profile" />
            <AvatarFallback>NT</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-semibold text-sm">Người tham gia ẩn danh</div>
            <div className="text-xs text-gray-500">26 tháng 2 lúc 14:13</div>
          </div>
        </div>

        {/* Post Content */}
        <div className="bg-purple-600 text-white text-center py-16 text-2xl font-bold">
          Trình intern bây giờ sao cao v ạ mà vẫn thất nghiệp
        </div>

        {/* Post Interactions */}
        <div className="flex justify-between items-center p-4 text-gray-600">
          <div className="flex items-center space-x-2">
            <span>112</span>
            <span>Thích</span>
          </div>
          <div className="flex space-x-4">
            <span>32 bình luận</span>
            <span>4 lượt chia sẻ</span>
          </div>
        </div>

        {/* Interaction Buttons */}
        <div className="grid grid-cols-3 border-t">
          <Button className="py-3 flex items-center justify-center space-x-2">
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
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            <span>Thích</span>
          </Button>
          <Button className="py-3 flex items-center justify-center space-x-2">
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
          <Button className="py-3 flex items-center justify-center space-x-2">
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
        <div className="p-4 border-t">
          {/* Sample Comments */}
          <div className="mb-4">
            <div className="flex items-start space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>350</AvatarFallback>
              </Avatar>
              <div>
                <div className="bg-gray-100 p-2 rounded-lg">
                  <div className="font-semibold text-sm">
                    Người tham gia ẩn danh 350
                  </div>
                  <p className="text-sm">
                    Comment
                  </p>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  <span>Thích</span> · <span>Phản hồi</span> · 4 ngày
                </div>
              </div>
            </div>
          </div>


          {/* Comment Input */}
          <div className="flex items-center space-x-3 mt-4">
            <Avatar className="w-8 h-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Viết bình luận công khai..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full py-2 px-4 border rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
