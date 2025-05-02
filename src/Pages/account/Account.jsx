import { useContext, useEffect, useState } from "react";
import {
  Save,
  User,
  Mail,
  Lock,
  Check,
  X,
  Edit,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  checkPassword,
  getById,
  updateUserAccount,
} from "../../apis/services/UserService";
import UserContext from "../../../UserContext";

function Account() {
  const user = useContext(UserContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [editField, setEditField] = useState(null);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fieldToUpdate, setFieldToUpdate] = useState(null);

  useEffect(() => {
    const fetchUserById = async () => {
      try {
        setLoading(true);
        const res = await getById(user?._id);
        setUserInfo({
          name: res.data.name,
          email: res.data.email,
        });
        setError(null);
      } catch (err) {
        setError("Failed to load account information");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserById();
  }, [user?._id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
    } else {
      setUserInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const verifyPassword = async () => {
    try {
      setLoading(true);
      const res = await checkPassword({
        id: user?._id,
        password: currentPassword,
      });

      if (res.data) {
        // Only update the specific field that was edited
        const dataToUpdate = {};

        if (fieldToUpdate === "password") {
          dataToUpdate.password = newPassword;
        } else if (fieldToUpdate) {
          dataToUpdate[fieldToUpdate] = userInfo[fieldToUpdate];
        }

        await updateUserAccount(user?._id, dataToUpdate);
        setSuccess(true);
        setError(null);
        setShowPasswordConfirm(false);
        setCurrentPassword("");
        setEditField(null);
      } else {
        setPasswordError("Incorrect password. Please try again.");
      }
    } catch (err) {
      setPasswordError("Failed to verify password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (field) => {
    setEditField(field);
    if (field === "password") {
      setNewPassword("");
    }
  };

  const handleSaveField = (field) => {
    setFieldToUpdate(field);
    setShowPasswordConfirm(true);
    setSuccess(false);
    setError(null);
    setPasswordError(null);
  };

  const handleCancelEdit = () => {
    setEditField(null);
    // Reset to original values
    if (editField === "password") {
      setNewPassword("");
    }
  };

  const handleCancel = () => {
    setShowPasswordConfirm(false);
    setCurrentPassword("");
    setPasswordError(null);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (loading && !userInfo.name) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Account Settings</h1>
        <p className="text-gray-600">Update your personal information</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md flex items-center">
          <Check size={20} className="mr-2" />
          Account information updated successfully!
        </div>
      )}

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>

            {editField === "name" ? (
              <div className="flex">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo.name}
                  onChange={handleChange}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your full name"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveField("name")}
                  className="px-3 bg-green-500 text-white rounded-r-md hover:bg-green-600"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 ml-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="flex">
                <div className="pl-10 w-full p-3 border border-gray-300 rounded-l-md bg-gray-50">
                  {userInfo.name}
                </div>
                <button
                  onClick={() => handleEdit("name")}
                  className="px-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                >
                  <Edit size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-2"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>

            {editField === "email" ? (
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your email address"
                  autoFocus
                />
                <button
                  onClick={() => handleSaveField("email")}
                  className="px-3 bg-green-500 text-white rounded-r-md hover:bg-green-600"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 ml-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="flex">
                <div className="pl-10 w-full p-3 border border-gray-300 rounded-l-md bg-gray-50">
                  {userInfo.email}
                </div>
                <button
                  onClick={() => handleEdit("email")}
                  className="px-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                >
                  <Edit size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-2"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>

            {editField === "password" ? (
              <div className="flex">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                    className="pl-10 w-full p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter new password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <button
                  onClick={() => handleSaveField("password")}
                  className="px-3 bg-green-500 text-white rounded-r-md hover:bg-green-600"
                >
                  <Save size={18} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-3 ml-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  <X size={18} />
                </button>
              </div>
            ) : (
              <div className="flex">
                <div className="pl-10 w-full p-3 border border-gray-300 rounded-l-md bg-gray-50">
                  ••••••••••
                </div>
                <button
                  onClick={() => handleEdit("password")}
                  className="px-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
                >
                  <Edit size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Confirmation Modal */}
      {showPasswordConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Confirm Changes</h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {passwordError && (
              <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
                {passwordError}
              </div>
            )}

            <p className="mb-4 text-gray-600">
              Please enter your current password to confirm these changes
            </p>

            <div className="mb-4">
              <label
                htmlFor="currentPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Current Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="pl-10 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your current password"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={verifyPassword}
                disabled={loading || !currentPassword}
                className={`flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading || !currentPassword
                    ? "opacity-70 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Verifying...
                  </>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
