import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createOrder } from "../../apis/services/OrdersService";
import {
  getAllDonationItems,
  getDonationItemById,
} from "../../apis/services/DonationItemsService";

export default function CreateOrder() {
  const navigate = useNavigate();
  const { donationItemId } = useParams();
  const [loading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [donationItem, setDonationItem] = useState(null);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    donationItem: donationItemId || "",
    order: {
      to_name: "",
      to_phone: "",
      to_address: "",
      to_ward_name: "",
      to_district_name: "",
      to_province_name: "",
      from_name: "",
      from_phone: "",
      from_address: "",
      from_ward_name: "",
      from_district_name: "",
      from_province_name: "",
      service_type_id: 2,
      payment_type_id: 1,
      required_note: "KHONGCHOXEMHANG",
      weight: 500,
      length: 10,
      width: 10,
      height: 10,
      items: [],
    },
  });

  useEffect(() => {
    if (donationItemId) {
      fetchDonationItem(donationItemId);
    }
  }, [donationItemId]);

  const fetchDonationItem = async (id) => {
    setLoading(true);
    try {
      const response = await getDonationItemById(donationItemId);
      if (response && response.data) {
        const item = response.data;
        setDonationItem(item);

        // Pre-populate form with item data
        if (item.items && item.items.length > 0) {
          let totalWeight = 0;
          const formItems = item.items.map((item) => {
            totalWeight += item.weight * 1000; // Convert kg to g
            return {
              name: item.name,
              code: item.code,
              quantity: item.quantity,
              weight: item.weight * 1000, // Convert kg to g
              length: item.length,
              width: item.width,
              height: item.height,
            };
          });

          setFormData((prev) => ({
            ...prev,
            donationItem: id,
            order: {
              ...prev.order,
              weight: totalWeight || 500,
              items: formItems,
            },
          }));
        }
      } else {
        setError("Donation item not found");
      }
    } catch (err) {
      console.error("Failed to fetch donation item:", err);
      setError("Failed to load donation item. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      order: {
        ...formData.order,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      const response = await createOrder(formData);

      if (response.data) {
        alert("Order created successfully!");
        navigate("/orders");
      } else {
        throw new Error("Failed to create order");
      }
    } catch (err) {
      console.error("Error creating order:", err);
      setError("Failed to create order. Please try again.");
    } finally {
      setFormSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !donationItem) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/donate/items")}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Donations
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Shipping Order</h1>
        {donationItem && (
          <p className="text-gray-600 mt-1">
            for Donation:{" "}
            {donationItem.title || `Donation #${donationItem._id}`}
          </p>
        )}
      </div>

      {error && (
        <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <form onSubmit={handleSubmit}>
          {/* Donation Item Information */}
          {donationItem && (
            <div className="p-6 border-b bg-gray-50">
              <h2 className="text-lg font-medium mb-4">Donation Information</h2>
              <p className="mb-2">
                <span className="font-medium">Donor:</span>{" "}
                {donationItem.donorName}
              </p>
              {donationItem.message && (
                <p className="mb-2">
                  <span className="font-medium">Message:</span>{" "}
                  {donationItem.message}
                </p>
              )}
              {donationItem.items && donationItem.items.length > 0 && (
                <div className="mt-3">
                  <p className="font-medium mb-2">Items:</p>
                  <ul className="list-disc pl-5">
                    {donationItem.items.map((item, index) => (
                      <li key={index} className="mb-1">
                        {item.name} (Qty: {item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Recipient Information */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium mb-4">Recipient Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Recipient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="to_name"
                  value={formData.order.to_name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="to_phone"
                  value={formData.order.to_phone}
                  onChange={handleChange}
                  placeholder="e.g., 0987654321"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 mb-2">
                Full Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="to_address"
                value={formData.order.to_address}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Ward/Commune <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="to_ward_name"
                  value={formData.order.to_ward_name}
                  onChange={handleChange}
                  placeholder="e.g., Phường 14"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="to_district_name"
                  value={formData.order.to_district_name}
                  onChange={handleChange}
                  placeholder="e.g., Quận 10"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Province/City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="to_province_name"
                  value={formData.order.to_province_name}
                  onChange={handleChange}
                  placeholder="e.g., Hồ Chí Minh"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Sender Information */}
          <div className="p-6 border-b">
            <h2 className="text-lg font-medium mb-4">Sender Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Sender Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="from_name"
                  value={formData.order.from_name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="from_phone"
                  value={formData.order.from_phone}
                  onChange={handleChange}
                  placeholder="e.g., 0912345678"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 mb-2">
                Full Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="from_address"
                value={formData.order.from_address}
                onChange={handleChange}
                placeholder="Street address"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-gray-700 mb-2">
                  Ward/Commune <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="from_ward_name"
                  value={formData.order.from_ward_name}
                  onChange={handleChange}
                  placeholder="e.g., Phường 14"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="from_district_name"
                  value={formData.order.from_district_name}
                  onChange={handleChange}
                  placeholder="e.g., Quận 10"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">
                  Province/City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="from_province_name"
                  value={formData.order.from_province_name}
                  onChange={handleChange}
                  placeholder="e.g., Hồ Chí Minh"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
            </div>
          </div>

          {/* Package Information */}
          <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Package Information</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Weight (g)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.order.weight}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Length (cm)</label>
                <input
                  type="number"
                  name="length"
                  value={formData.order.length}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Width (cm)</label>
                <input
                  type="number"
                  name="width"
                  value={formData.order.width}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.order.height}
                  onChange={handleChange}
                  min="1"
                  className="w-full p-3 border rounded-md"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-700 mb-2">
                Note (Optional)
              </label>
              <textarea
                name="note"
                value={formData.order.note || ""}
                onChange={handleChange}
                placeholder="Special handling instructions or notes"
                className="w-full p-3 border rounded-md"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 flex justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {formSubmitting ? "Creating Order..." : "Create Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
