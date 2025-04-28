import React, { useState } from "react";
import { createDonationItem } from "../../apis/services/DonationItemsService";
import { useNavigate } from "react-router-dom";

export default function DonateItems() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "CASE",
    donorName: "",
    items: [
      {
        name: "",
        code: "",
        quantity: 1,
        price: 0,
        length: 10,
        width: 10,
        height: 10,
        weight: 10,
        categories: [],
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleItemChange = (index, e) => {
    const { name, value } = e.target;
    const newItems = [...formData.items];

    if (
      name === "quantity" ||
      name === "price" ||
      name === "length" ||
      name === "width" ||
      name === "height" ||
      name === "weight"
    ) {
      newItems[index][name] = Number(value);
    } else {
      newItems[index][name] = value;
    }

    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [
        ...formData.items,
        {
          name: "",
          code: "",
          quantity: 1,
          price: 0,
          length: 10,
          width: 10,
          height: 10,
          weight: 10,
          categories: [],
        },
      ],
    });
  };

  const removeItem = (index) => {
    const newItems = [...formData.items];
    newItems.splice(index, 1);
    setFormData({
      ...formData,
      items: newItems,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Set default category if not provided
      const itemsWithCategories = formData.items.map((item) => {
        if (!item.categories || item.categories.length === 0) {
          return {
            ...item,
            categories: ["60f3b3b3b3b3b3b3b3b3b3"], // Default category ID
          };
        }
        return item;
      });

      const data = {
        ...formData,
        items: itemsWithCategories,
      };

      const response = await createDonationItem(data);

      if (response && response._id) {
        alert("Thank you for your donation!");
        navigate(`/donate/success?id=${response._id}`);
      } else {
        throw new Error("Failed to create donation");
      }
    } catch (error) {
      console.error("Donation error:", error);
      alert("There was an error processing your donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Donate Items</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Donation Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title of your donation"
            className="w-full p-3 border rounded-md"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Add a message about your donation"
            className="w-full p-3 border rounded-md"
            rows="3"
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Donor Name</label>
          <input
            type="text"
            name="donorName"
            value={formData.donorName}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full p-3 border rounded-md"
            required
          />
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Items to Donate</h2>

          {formData.items.map((item, index) => (
            <div key={index} className="p-4 border rounded-md mb-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Item #{index + 1}</h3>
                {formData.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Item name"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Item Code</label>
                  <input
                    type="text"
                    name="code"
                    value={item.code}
                    onChange={(e) => handleItemChange(index, e)}
                    placeholder="Item code/SKU"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, e)}
                    min="1"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Estimated Value ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, e)}
                    min="0"
                    step="0.01"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Dimensions (cm)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="length"
                      value={item.length}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="L"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                    <input
                      type="number"
                      name="width"
                      value={item.width}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="W"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                    <input
                      type="number"
                      name="height"
                      value={item.height}
                      onChange={(e) => handleItemChange(index, e)}
                      placeholder="H"
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={item.weight}
                    onChange={(e) => handleItemChange(index, e)}
                    min="0"
                    step="0.01"
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            + Add Another Item
          </button>
        </div>

        <div className="mb-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Processing..." : "Submit Donation"}
          </button>
        </div>
      </form>

      <p className="text-sm text-gray-500 text-center">
        Thank you for your generous donation. We'll contact you shortly to
        arrange pickup of your items.
      </p>
    </div>
  );
}
