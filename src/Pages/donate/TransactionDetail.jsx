import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTransactionById } from "../../apis/services/DonationService";

export default function TransactionDetail() {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setLoading(true);
        const res = await getTransactionById(id);
        setTransaction(res.data);
      } catch (err) {
        setError("Failed to load transaction details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg font-medium text-gray-600">
          Loading transaction details...
        </div>
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="text-red-700 font-medium">
          {error || "Transaction not found"}
        </div>
      </div>
    );
  }

  // Format date from "YYYYMMDDHHmmss" to readable format
  const formatDate = (dateString) => {
    if (!dateString || dateString.length < 14) return "N/A";

    const year = dateString.substring(0, 4);
    const month = dateString.substring(4, 6);
    const day = dateString.substring(6, 8);
    const hour = dateString.substring(8, 10);
    const minute = dateString.substring(10, 12);
    const second = dateString.substring(12, 14);

    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  // Format amount from number to currency
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Map status to badge color
  const getStatusBadge = (status) => {
    const statusMap = {
      success: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      failed: "bg-red-100 text-red-800",
    };

    return statusMap[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Transaction Details
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-500">
              Transaction ID
            </div>
            <div className="mt-1 text-gray-900 font-medium">
              {transaction.txnRef}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500">Amount</div>
            <div className="mt-1 text-gray-900 font-medium">
              {formatAmount(transaction.amount)}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500">Status</div>
            <div className="mt-1">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                  transaction.status
                )}`}
              >
                {transaction.status.toUpperCase()}
              </span>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500">
              Payment Date
            </div>
            <div className="mt-1 text-gray-900">
              {formatDate(transaction.payDate)}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium text-gray-500">
              Payment Method
            </div>
            <div className="mt-1 text-gray-900">
              {transaction.bankCode} - {transaction.cardType}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500">Order Info</div>
            <div className="mt-1 text-gray-900">{transaction.orderInfo}</div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500">User</div>
            <div className="mt-1 text-gray-900">
              {transaction.createdBy?.name || "N/A"}
            </div>
            <div className="text-xs text-gray-500">
              {transaction.createdBy?.email || "N/A"}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500">Created At</div>
            <div className="mt-1 text-gray-900">
              {new Date(transaction.createdAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Technical Details
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Response Code:</span>{" "}
            {transaction.responseCode}
          </div>
          <div>
            <span className="text-gray-500">Transaction No:</span>{" "}
            {transaction.transactionNo}
          </div>
          <div>
            <span className="text-gray-500">Transaction Status:</span>{" "}
            {transaction.transactionStatus}
          </div>
          <div>
            <span className="text-gray-500">Internal ID:</span>{" "}
            <span className="font-mono text-xs">{transaction._id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
