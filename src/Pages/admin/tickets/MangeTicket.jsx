import { useState, useEffect } from "react";
import {
  Search,
  User,
  ChevronDown,
  Filter,
  MoreHorizontal,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllTickets } from "../../../apis/services/TicketService";
import { StatusBadge } from "./StatusBadge";

export default function ManageTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const response = await getAllTickets({ isAll: true });
        console.log(response.data.items);
        setTickets(response.data.items);
      } catch (err) {
        setError("Failed to fetch tickets");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  // Filter tickets based on status and search term
  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      filterStatus === "ALL" || ticket.status === filterStatus;
    const matchesSearch =
      searchTerm === "" ||
      ticket.createdBy.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2">Loading tickets...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">
          <AlertCircle size={24} className="mx-auto mb-2" />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main content */}
      <main className="px-4 py-6 mx-auto max-w-7xl">
        <div className="bg-white rounded-lg shadow">
          {/* Toolbar */}
          <div className="flex flex-col justify-between p-4 border-b md:flex-row md:items-center">
            <div className="flex mb-4 md:mb-0">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search by username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="ml-2">
                <button className="flex items-center px-3 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Filter size={16} className="mr-1" />
                  Filter
                  <ChevronDown size={16} className="ml-1" />
                </button>
              </div>
            </div>
            <div className="flex space-x-2">
              <select
                className="px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="ALL">All Status</option>
                <option value="OPEN">Open</option>
                <option value="CLOSED">Closed</option>
                <option value="PENDING">Pending</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Created At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                            <User size={16} className="text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {ticket.createdBy.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {ticket.createdBy.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={ticket.status} />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            className="text-blue-600 hover:text-blue-900"
                            onClick={() => navigate(`/tickets/${ticket._id}`)}
                          >
                            View
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-sm text-center text-gray-500"
                    >
                      No tickets found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
            <div className="flex justify-between flex-1 sm:hidden">
              <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to{" "}
                  <span className="font-medium">{filteredTickets.length}</span>{" "}
                  of{" "}
                  <span className="font-medium">{filteredTickets.length}</span>{" "}
                  results
                </p>
              </div>
              <div>
                <nav
                  className="inline-flex -space-x-px rounded-md shadow-sm isolate"
                  aria-label="Pagination"
                >
                  <button className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md bg-white border border-gray-300 hover:bg-gray-50">
                    <span className="sr-only">Previous</span>
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 border border-blue-500 bg-blue-50">
                    1
                  </button>
                  <button className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md bg-white border border-gray-300 hover:bg-gray-50">
                    <span className="sr-only">Next</span>
                    <svg
                      className="w-5 h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
