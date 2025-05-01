import React, { useEffect, useState } from "react";
import { getReliefCase } from "../../../apis/services/ReliefCaseService";
import { useParams } from "react-router-dom";
import { getTicketById } from "../../../apis/services/TicketService";

const ReliefCaseDetail = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    caseName: "",
    description: "",
    location: "",
    contactEmail: "",
    supportTicket: "",
    attachments: [],
  });

  const [ticket, setTicket] = useState({
    attachments: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchReliefCase = async () => {
      const res = await getReliefCase(id);
      setFormData(res.data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log("Updated Case Data:", formData);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Relief Case Detail</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Case Name
          </label>
          <input
            type="text"
            name="caseName"
            value={formData.caseName}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Attachments
          </label>
          <div className="mt-2 grid grid-cols-2 gap-4">
            {ticket.attachments.map((attachment, index) => (
              <img
                key={index}
                src={attachment.filePath}
                alt={`Attachment ${index + 1}`}
                className="rounded-md border shadow-sm object-cover h-32 w-full"
              />
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReliefCaseDetail;
