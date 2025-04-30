import { useState } from "react";
import { Camera } from "lucide-react";
import { createUserPost } from "../../apis/services/PostService";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
    status: "PUBLISHED",
    featuredImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevState) => ({
        ...prevState,
        featuredImage: file,
      }));

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const formDataToSend = new FormData();

      // Add text fields
      formDataToSend.append("name", formData.name);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("shortDescription", formData.shortDescription);
      formDataToSend.append("longDescription", formData.longDescription);

      // Add file if it exists
      if (formData.featuredImage) {
        formDataToSend.append("featuredImage", formData.featuredImage);
      }

      await createUserPost(formDataToSend);

      alert("Post created successfully!");

      // Reset form
      setFormData({
        name: "",
        shortDescription: "",
        longDescription: "",
        featuredImage: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Create New Post</h1>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Title
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter post title"
          />
        </div>

        {/* Short Description */}
        <div>
          <label
            htmlFor="shortDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Short Description
          </label>
          <input
            type="text"
            id="shortDescription"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief summary (1-2 sentences)"
          />
        </div>

        {/* Long Description */}
        <div>
          <label
            htmlFor="longDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Main Description
          </label>
          <textarea
            id="longDescription"
            name="longDescription"
            value={formData.longDescription}
            onChange={handleChange}
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Detailed description with rich content"
          />
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Featured Image
          </label>

          <div className="mt-1 flex items-center">
            <div
              className={`flex justify-center items-center w-full h-64 border-2 border-dashed rounded-lg 
                ${
                  imagePreview
                    ? "border-gray-300"
                    : "border-gray-400 hover:border-blue-500"
                } 
                transition-colors cursor-pointer bg-gray-50`}
              onClick={() => document.getElementById("featuredImage").click()}
            >
              {imagePreview ? (
                <div className="w-full h-full relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute top-2 right-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setImagePreview(null);
                        setFormData((prev) => ({
                          ...prev,
                          featuredImage: null,
                        }));
                      }}
                      className="p-1 bg-gray-800 bg-opacity-70 rounded-full text-white hover:bg-opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center p-6">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    Click to upload an image
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              )}

              <input
                id="featuredImage"
                name="featuredImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-6 py-2 text-white font-medium rounded-md 
              ${isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"} 
              transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </button>
        </div>
      </div>
    </div>
  );
}
