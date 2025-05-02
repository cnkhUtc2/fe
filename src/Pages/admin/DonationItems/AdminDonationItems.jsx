import React from "react";
import { Link } from "react-router-dom";

export default function AdminDonationItems({ onItemSelect }) {
  // ... existing code

  // Replace the View link with a button that calls onItemSelect
  // Find this code in your table:
  <td className="py-2 px-4">
    <div className="flex gap-2">
      <button
        onClick={() => onItemSelect(item._id)}
        className="text-blue-600 hover:text-blue-800"
      >
        View
      </button>
      <Link
        to={`/admin/donation-items/${item._id}/edit`}
        className="text-yellow-600 hover:text-yellow-800"
      >
        Edit
      </Link>
      <button
        onClick={() => handleDelete(item._id)}
        className="text-red-600 hover:text-red-800"
      >
        Delete
      </button>
    </div>
  </td>;
}
