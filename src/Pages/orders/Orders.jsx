import React, { useState, useEffect, useContext } from "react";
import { getAllOrders } from "../../apis/services/OrdersService";
import { Link } from "react-router-dom";
import UserContext from "../../../UserContext";

export default function Orders() {
  const user = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchOrders();
  }, [page, filter]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 10,
        ...(filter !== "ALL" && { status: filter }),
      };

      const response = await getAllOrders(params);
      if (response) {
        const filteredOrders = response.data.items.filter(
          (order) => order.createdBy?._id === user._id
        );
        setOrders(filteredOrders);
        setTotalPages(Math.ceil(response.total / response.limit));
      }
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again later.");
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
    });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Orders</h1>
        <div className="flex items-center">
          <label htmlFor="statusFilter" className="mr-2">
            Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-md px-3 py-2"
          >
            <option value="ALL">All Orders</option>
            <option value="PENDING">Pending</option>
            <option value="SHIPPING">Shipping</option>
            <option value="DELIVERED">Delivered</option>
            <option value="FAIL">Failed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h3 className="text-xl font-medium mb-4">No Orders Found</h3>
          <p className="text-gray-600 mb-6">
            {filter !== "ALL"
              ? `You don't have any ${filter.toLowerCase()} orders.`
              : "You haven't placed any orders yet."}
          </p>
          <Link
            to="/donate/items"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Donate Items
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Partner
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.orderCode}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.deliveryPartner}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate">
                      {order.fromAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate">
                      {order.toAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/orders/${order._id}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        Details
                      </Link>
                      {order.trackingUrl && (
                        <a
                          href={order.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-900"
                        >
                          Track
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <nav className="flex items-center">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded-l-md bg-white disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Previous
                </button>
                {[...Array(totalPages).keys()].map((i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 border-t border-b ${
                      page === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-3 py-1 border rounded-r-md bg-white disabled:bg-gray-100 disabled:text-gray-400"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
