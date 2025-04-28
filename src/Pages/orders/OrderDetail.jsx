import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAllOrders } from "../../apis/services/OrdersService";

export default function OrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    setLoading(true);
    try {
      const response = await getAllOrders({ id });
      if (response && response.data && response.data.length > 0) {
        setOrder(response.data[0]);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      console.error("Failed to fetch order details:", err);
      setError("Failed to load order details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "SHIPPING":
        return "bg-blue-100 text-blue-800";
      case "DELIVERED":
        return "bg-green-100 text-green-800";
      case "FAIL":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <div className="mt-4">
            <button
              onClick={() => navigate("/orders")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 mr-2"
            >
              Back to Orders
            </button>
            <button
              onClick={fetchOrderDetails}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>Order not found</p>
          <button
            onClick={() => navigate("/orders")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <button
          onClick={() => navigate("/orders")}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Back to Orders
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Order #{order.orderCode}
              </h2>
              <p className="text-gray-600">
                Created: {formatDate(order.createdAt)}
              </p>
            </div>
            <span
              className={`px-3 py-1 inline-flex text-sm font-semibold rounded-full ${getStatusBadgeClass(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          {order.expectDeliveryTime && (
            <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md">
              <p className="font-medium">
                Expected Delivery: {order.expectDeliveryTime}
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 border-b">
          <div>
            <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
            <p className="text-gray-700 mb-1">
              <span className="font-medium">Delivery Partner:</span>{" "}
              {order.deliveryPartner}
            </p>
            {order.weight && (
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Package Weight:</span>{" "}
                {order.weight}g
              </p>
            )}
            {order.totalFee && (
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Shipping Fee:</span> $
                {order.totalFee.toFixed(2)}
              </p>
            )}
            {order.transType && (
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Transport Type:</span>{" "}
                {order.transType}
              </p>
            )}
            {order.trackingUrl && (
              <a
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Track Package
              </a>
            )}
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Address Information</h3>
            <div className="mb-3">
              <p className="font-medium text-gray-700">From:</p>
              <p className="text-gray-600">{order.fromAddress}</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">To:</p>
              <p className="text-gray-600">{order.toAddress}</p>
            </div>
          </div>
        </div>

        {order.donationItem && (
          <div className="p-6">
            <h3 className="text-lg font-medium mb-3">Donation Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="font-medium text-gray-800 mb-2">
                {order.donationItem.title || "Donation Items"}
              </p>
              {order.donationItem.message && (
                <p className="text-gray-600 mb-3">
                  {order.donationItem.message}
                </p>
              )}
              <p className="text-gray-700 mb-3">
                <span className="font-medium">Donor:</span>{" "}
                {order.donationItem.donorName}
              </p>

              {order.donationItem.items &&
                order.donationItem.items.length > 0 && (
                  <>
                    <h4 className="font-medium text-gray-700 mb-2">Items:</h4>
                    <ul className="border rounded-md divide-y">
                      {order.donationItem.items.map((item, index) => (
                        <li key={index} className="p-3">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span>
                              {item.quantity} x ${item.price?.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Code: {item.code}
                          </p>
                          <p className="text-sm text-gray-600">
                            Dimensions: {item.length}cm x {item.width}cm x{" "}
                            {item.height}cm | Weight: {item.weight}kg
                          </p>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
