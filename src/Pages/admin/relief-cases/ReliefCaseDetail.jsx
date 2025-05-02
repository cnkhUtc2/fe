import React, { useEffect, useState } from "react";
import {
  getReliefCase,
  updateReliefCase,
} from "../../../apis/services/ReliefCaseService";
import { useParams } from "react-router-dom";
import { getTicketById } from "../../../apis/services/TicketService";
import {
  Save,
  MapPin,
  Mail,
  FileText,
  AlertTriangle,
  Camera,
} from "lucide-react";

const ReliefCaseDetail = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    caseName: "",
    description: "",
    location: "",
    contactEmail: "",
    supportTicket: "",
    attachments: [],
    status: "ACTIVE", // Default status
    priority: "Medium", // Default priority
  });

  const [ticket, setTicket] = useState({
    attachments: [],
  });

  const [isSaving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchReliefCase = async () => {
      try {
        const res = await getReliefCase(id);
        setFormData({
          ...res.data,
          status: res.data.status || "ACTIVE",
          priority: res.data.priority || "MEDIUM",
        });
      } catch (error) {
        console.error("Error fetching relief case:", error);
      }
    };
    fetchReliefCase();
  }, [id]);

  useEffect(() => {
    const fetchTicket = async () => {
      if (!formData.supportTicket?._id) return;

      try {
        const res = await getTicketById(formData.supportTicket._id);
        if (res.data && res.data.attachments) {
          setTicket(res.data);
        } else {
          console.warn("Ticket data is null or missing attachments.");
          setTicket({ attachments: [] });
        }
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicket();
  }, [formData.supportTicket?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const updateData = {
        caseName: formData.caseName,
        description: formData.description,
        location: formData.location,
        contactEmail: formData.contactEmail,
        status: formData.status,
        priority: formData.priority,
      };

      await updateReliefCase(id, updateData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating case:", error);
    } finally {
      setSaving(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-blue-100 text-blue-800";
      case "Resolved":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Relief Case Details
            </h2>
            <div className="flex space-x-3">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(
                  formData.priority
                )}`}
              >
                {formData.priority} Priority
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  formData.status
                )}`}
              >
                {formData.status}
              </span>
            </div>
          </div>
          <p className="text-blue-100 mt-1">Case ID: {id}</p>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Case Name */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Case Name
                </label>
                <input
                  type="text"
                  name="caseName"
                  value={formData.caseName}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MapPin size={16} className="mr-1 text-gray-500" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                />
              </div>

              {/* Contact Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Mail size={16} className="mr-1 text-gray-500" />
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                >
                  <option value="Active">ACTIVE</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <AlertTriangle size={16} className="mr-1 text-gray-500" />
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="EMERGENCY">Emergency</option>
                </select>
              </div>

              {/* Description */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FileText size={16} className="mr-1 text-gray-500" />
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-3"
                ></textarea>
              </div>
            </div>

            {/* Attachments */}
            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                <Camera size={16} className="mr-1 text-gray-500" />
                Attachments ({ticket.attachments.length})
              </label>

              {ticket.attachments.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {ticket.attachments.map((attachment, index) => (
                    <div key={index} className="group relative">
                      <img
                        src={attachment.filePath}
                        alt={`Attachment ${index + 1}`}
                        className="rounded-lg border border-gray-200 shadow-sm object-cover h-32 w-full transition transform hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 rounded-lg">
                        <button
                          type="button"
                          className="bg-white p-2 rounded-full shadow-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                  <p className="text-gray-500">No attachments available</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSaving}
                className={`w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition ${
                  isSaving ? "opacity-75" : ""
                }`}
              >
                <Save size={18} className="mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>

              {saveSuccess && (
                <div className="mt-3 bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-center">
                  Changes saved successfully!
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReliefCaseDetail;
