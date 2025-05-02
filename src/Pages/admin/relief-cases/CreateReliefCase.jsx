import { useEffect, useState } from "react";
import { Mail, MapPin, FileText, Info, AlertTriangle } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  getTicketById,
  updateTicketStatus,
} from "../../../apis/services/TicketService";
import { createReliefCase } from "../../../apis/services/ReliefCaseService";

export default function CreateReliefCase() {
  const { id } = useParams();

  const [ticket, setTicket] = useState({
    purpose: "",
    description: "",
    city: "",
    province: "",
    ward: "",
    address: "",
    isCreatedReliefCase: false,
    attachments: [],
  });

  const [formData, setFormData] = useState({
    caseName: "",
    description: "",
    location: "",
    contactEmail: "",
    contactPhone: "",
    imageUrl: "",
    supportTicket: "",
    priority: "MEDIUM",
  });

  useEffect(() => {
    const fetchTicketById = async () => {
      try {
        const res = await getTicketById(id);
        setTicket(res.data);

        // Set default values from ticket data
        const locationStr = `${res.data.province}, ${res.data.city}, ${res.data.ward}, ${res.data.address}`;

        // Get first image from attachments if available
        let imageUrl = "";
        if (res.data.attachments && res.data.attachments.length > 0) {
          // Find the first image attachment
          const imageAttachment = res.data.attachments.find(
            (att) => att.mime && att.mime.startsWith("image/")
          );
          if (imageAttachment) {
            imageUrl = imageAttachment.filePath;
          }
        }

        setFormData({
          caseName: res.data.purpose || "",
          description: res.data.description || "",
          location: locationStr,
          contactEmail: res.data.createdBy.email,
          supportTicket: id,
          imageUrl: imageUrl,
        });
      } catch (error) {
        console.error("Error fetching ticket:", error);
      }
    };

    fetchTicketById();
  }, [id]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      imageUrl: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createReliefCase(formData);
      await updateTicketStatus(id, { isCreatedReliefCase: true });

      setIsSubmitting(false);
      setSubmitMessage({
        type: "success",
        text: "Relief case created successfully!",
      });

      setFormData({
        caseName: "",
        description: "",
        location: "",
        contactEmail: "",
        contactPhone: "",
        imageUrl: "",
        priority: "MEDIUM",
      });

      setTimeout(() => {
        setSubmitMessage({ type: "", text: "" });
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitMessage({
        type: "error",
        text:
          error.message || "Failed to create relief case. Please try again.",
      });
    }
  };

  // Function to get appropriate color for priority badge
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "LOW":
        return "bg-gray-100 text-gray-800";
      case "MEDIUM":
        return "bg-blue-100 text-blue-800";
      case "HIGH":
        return "bg-orange-100 text-orange-800";
      case "EMERGENCY":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Create Relief Case</h2>
        <p className="text-gray-600 mt-1">
          Fill out the form below to create a new relief case
        </p>
      </div>

      {submitMessage.text && (
        <div
          className={`mb-4 p-4 rounded ${
            submitMessage.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {submitMessage.text}
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-1">
          <label
            htmlFor="caseName"
            className="block text-sm font-medium text-gray-700 flex items-center"
          >
            <FileText className="h-4 w-4 mr-2" />
            Case Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="caseName"
            name="caseName"
            value={formData.caseName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter case name"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 flex items-center"
          >
            <Info className="h-4 w-4 mr-2" />
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Describe the relief case in detail"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 flex items-center"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Priority <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center">
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
              <option value="EMERGENCY">EMERGENCY</option>
            </select>
            <div
              className={`ml-2 px-3 py-1 rounded-full ${getPriorityColor(
                formData.priority
              )}`}
            >
              {formData.priority}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700 flex items-center"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Location <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter location"
            required
          />
        </div>

        <div className="space-y-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>

          {ticket.attachments && ticket.attachments.length > 0 && (
            <div className="mt-2">
              <p className="text-sm text-gray-600 mb-2">Attachments:</p>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {ticket.attachments
                  .filter((att) => att.mime && att.mime.startsWith("image/"))
                  .map((att, idx) => (
                    <div key={idx}>
                      <img
                        src={att.filePath}
                        alt={att.alt || `Image ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-gray-700 flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="contactEmail"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="example@email.com"
              required
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-2 px-4 rounded-md text-white font-medium ${
              isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } transition-colors duration-300 flex justify-center items-center`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Create Relief Case"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
