import { useState, useEffect } from "react";
import {
  getAdminOrders,
  updateOrder,
} from "../../../apis/services/OrdersService";

export default function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    limit: 10,
  });
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [pagination.currentPage, sortBy, sortDirection, searchQuery]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = {
        limit: pagination.limit,
        page: pagination.currentPage,
        sortBy,
        sortDirection,
        searchType: "and",
        isAll: true,
        locale: "en",
      };

      if (searchQuery) {
        params.search = searchQuery;
      }

      const response = await getAdminOrders(params);

      if (response && response.data) {
        setOrders(response.data.items || []);
        setPagination({
          ...pagination,
          totalItems: response.data.meta?.total || 0,
          totalPages: response.data.meta?.lastPage || 1,
          currentPage: response.data.meta?.currentPage || 1,
        });
      }
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    setStatusUpdating(true);
    try {
      await updateOrder(`update/${id}?locale=en`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      setError("Failed to update order status");
      console.error(err);
    } finally {
      setStatusUpdating(false);
    }
  };

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDirection(sortDirection === 1 ? -1 : 1);
    } else {
      setSortBy(field);
      setSortDirection(-1);
    }
  };

  const handlePageChange = (page) => {
    setPagination({
      ...pagination,
      currentPage: page,
    });
  };

  const getSortIcon = (field) => {
    if (field !== sortBy) return null;
    return sortDirection === 1 ? "↑" : "↓";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading && orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-md mb-4">
        <p className="text-red-700">{error}</p>
        <button
          onClick={fetchOrders}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Orders Management</h1>
        <button
          onClick={() => (window.location.href = "/admin/orders/create")}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          Create New Order
        </button>
      </div>

      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search orders by code or user..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md flex-grow"
          />
          <button
            onClick={fetchOrders}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-md">
          <p className="text-gray-600">No orders found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => handleSort("orderCode")}
                  >
                    Order Code {getSortIcon("orderCode")}
                  </th>
                  <th
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => handleSort("status")}
                  >
                    Status {getSortIcon("status")}
                  </th>
                  <th
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => handleSort("deliveryPartner")}
                  >
                    Delivery Partner {getSortIcon("deliveryPartner")}
                  </th>
                  <th
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => handleSort("weight")}
                  >
                    Weight {getSortIcon("weight")}
                  </th>
                  <th
                    className="py-3 px-4 text-left cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created At {getSortIcon("createdAt")}
                  </th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4">{order.orderCode}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : order.status === "CANCELLED" ||
                              order.status === "FAILED"
                            ? "bg-red-100 text-red-800"
                            : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "PROCESSING"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{order.deliveryPartner}</td>
                    <td className="py-2 px-4">{order.weight} gram</td>
                    <td className="py-2 px-4">{formatDate(order.createdAt)}</td>
                    <td className="py-2 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          View
                        </button>
                        <div className="relative">
                          <button
                            onClick={() => {
                              const dropdown = document.getElementById(
                                `status-dropdown-${order._id}`
                              );
                              if (dropdown) {
                                dropdown.classList.toggle("hidden");
                              }
                            }}
                            disabled={statusUpdating}
                            className="text-yellow-600 hover:text-yellow-800"
                          >
                            Update Status
                          </button>
                          <div
                            id={`status-dropdown-${order._id}`}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden"
                          >
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "PENDING")
                              }
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              PENDING
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "PROCESSING")
                              }
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              PROCESSING
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "COMPLETED")
                              }
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              COMPLETED
                            </button>
                            <button
                              onClick={() =>
                                updateOrderStatus(order._id, "CANCELLED")
                              }
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              CANCELLED
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {orders.length} of {pagination.totalItems} orders
            </div>
            <div className="flex gap-2">
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md ${
                    pagination.currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold text-gray-600">
                  Order Information
                </h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Order Code:</span>{" "}
                    {selectedOrder.orderCode}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    {selectedOrder.status}
                  </p>
                  <p>
                    <span className="font-medium">Created At:</span>{" "}
                    {formatDate(selectedOrder.createdAt)}
                  </p>
                  <p>
                    <span className="font-medium">Weight:</span>{" "}
                    {selectedOrder.weight} gram
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-600">
                  Delivery Information
                </h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="font-medium">Delivery Partner:</span>{" "}
                    {selectedOrder.deliveryPartner}
                  </p>
                  <p>
                    <span className="font-medium">Trans Type:</span>{" "}
                    {selectedOrder.transType}
                  </p>
                  {selectedOrder.trackingUrl && (
                    <p>
                      <span className="font-medium">Tracking URL:</span>{" "}
                      <a
                        href={selectedOrder.trackingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {selectedOrder.trackingUrl}
                      </a>
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-600">Addresses</h3>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">From Address:</p>
                  <p className="text-sm mt-1">{selectedOrder.fromAddress}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="font-medium">To Address:</p>
                  <p className="text-sm mt-1">{selectedOrder.toAddress}</p>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-gray-600">Created By</h3>
              <div className="mt-2 bg-gray-50 p-3 rounded">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {selectedOrder.createdBy?.name || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Email:</span>{" "}
                  {selectedOrder.createdBy?.email || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Role:</span>{" "}
                  {selectedOrder.createdBy?.role || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
