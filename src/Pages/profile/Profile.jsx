import { useState, useEffect } from "react";
import { User, Phone, Home, Save } from "lucide-react";
import { updateUserProfile } from "../../apis/services/ProfileService";

const getProfile = async (id) => {
  return {
    data: {
      firstName: "John",
      lastName: "Doe",
      phone: "555-123-4567",
      address: "123 React Street, Component City",
      avatar: "/api/placeholder/128/128",
    },
  };
};

const updateProfile = async (id, formData) => {
  console.log("Updating profile with data:");
  // Display FormData entries properly
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value instanceof File ? value.name : value}`);
  }
  return { data: { ...JSON.parse(JSON.stringify(formData)), id } };
};

function Profile() {
  const id = "123"; // Mock ID for demo
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formDataDebug, setFormDataDebug] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const res = await getProfile(id);
        setProfile(res.data);
        if (res.data) {
          setFormData({
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
            avatar: res.data.avatar || "",
          });

          // Reset avatar preview
          setAvatarPreview(null);
          setAvatarFile(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // Create a FormData object for file upload
      const formDataToSend = new FormData();

      // Add all form fields to FormData
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("address", formData.address);

      // Handle avatar - either use file or URL
      if (avatarFile) {
        formDataToSend.append("avatar", avatarFile);
      } else if (formData.avatar) {
        formDataToSend.append("avatarUrl", formData.avatar);
      }

      // Create debug info for display
      const debugInfo = [];
      for (let [key, value] of formDataToSend.entries()) {
        debugInfo.push(
          `${key}: ${value instanceof File ? value.name + " (File)" : value}`
        );
      }
      setFormDataDebug(debugInfo);

      // Send FormData to the server
      const updatedProfile = await updateUserProfile(id, formDataToSend);

      // Update local state with the response from server
      if (updatedProfile && updatedProfile.data) {
        setProfile(updatedProfile.data);
      }

      setIsEditing(false);
      setAvatarFile(null);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2" htmlFor="firstName">
                First Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2" htmlFor="lastName">
                Last Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-gray-400">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <Phone size={18} />
              </span>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-400">
                <Home size={18} />
              </span>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Avatar</label>
            <div className="space-y-3">
              {/* Avatar preview */}
              <div className="flex justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-32 h-32 rounded-full object-cover border-2 border-blue-300"
                  />
                ) : profile?.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="Current avatar"
                    className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/api/placeholder/128/128";
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
              </div>

              {/* File input */}
              <div className="flex flex-col items-center">
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center"
                >
                  <User size={18} className="mr-2" />
                  Select Image File
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <p className="text-sm text-gray-500 mt-1">
                  {avatarFile
                    ? `Selected: ${avatarFile.name}`
                    : "No file selected"}
                </p>
              </div>

              {/* Keep URL option as alternative */}
              <div>
                <label className="block text-gray-700 text-sm" htmlFor="avatar">
                  Or enter image URL:
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleInputChange}
                  placeholder="https://example.com/avatar.jpg"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center"
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-center mb-6">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/api/placeholder/128/128";
                }}
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={48} className="text-gray-400" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-sm font-medium text-gray-500">First Name</h3>
              <p className="text-lg">{profile?.firstName || "Not provided"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded">
              <h3 className="text-sm font-medium text-gray-500">Last Name</h3>
              <p className="text-lg">{profile?.lastName || "Not provided"}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded flex items-start">
              <Phone size={18} className="text-gray-400 mt-1 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Phone Number
                </h3>
                <p className="text-lg">{profile?.phone || "Not provided"}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded flex items-start">
              <Home size={18} className="text-gray-400 mt-1 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="text-lg">{profile?.address || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Debug section for FormData contents */}
          {formDataDebug.length > 0 && (
            <div className="mt-8 p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium text-gray-700 mb-2">
                Last FormData Submission:
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {formDataDebug.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
