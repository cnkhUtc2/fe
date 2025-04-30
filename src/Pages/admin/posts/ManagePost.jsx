import { useState, useEffect } from "react";
import { Eye, Edit, Trash2, Search, Filter, RefreshCw } from "lucide-react";
import {
  deletePosts,
  getAllPosts,
  updatePost,
} from "../../../apis/services/PostService";
import { PostPagination } from "./PostPagination";
import PostStatusModal from "./PostStatusModal";

export default function ManagePost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 10,
    total: 0,
    lastPage: 0,
  });
  // New state for status modal
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    postId: null,
    currentStatus: null,
  });

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await getAllPosts({ isAll: true });

      setPosts(response.data.items);
      setPagination(response.data.meta);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(pagination.currentPage, searchTerm, statusFilter);
  }, [pagination.currentPage, searchTerm, statusFilter]);

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
    fetchPosts(1, searchTerm, statusFilter);
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

  const getStatusBadge = (status) => {
    const statusStyles = {
      PUBLISHED: "bg-green-100 text-green-800",
      DRAFT: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          statusStyles[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const handleDelete = async (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePosts([postId]);
      setPosts(posts.filter((post) => post._id !== postId));
    }
  };

  // Update this function to open the modal
  const handleEdit = (postId) => {
    const post = posts.find((p) => p._id === postId);
    if (post) {
      setStatusModal({
        isOpen: true,
        postId: postId,
        currentStatus: post.status,
      });
    }
  };

  // New function to handle status updates
  const handleStatusUpdate = async (postId, newStatus) => {
    try {
      console.log(newStatus);
      await updatePost(postId, { status: newStatus });
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId ? { ...post, status: newStatus } : post
        )
      );
      return true;
    } catch (error) {
      console.error("Error updating post status:", error);
      throw error;
    }
  };

  const handleView = (postId) => {
    // Navigate to view page
    console.log("Viewing post with ID:", postId);
    // You would add navigation logic here
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Posts</h1>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0">
        {/* Search */}
        <form onSubmit={handleSearch} className="flex w-full md:w-1/2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-gray-100 border border-gray-300 border-l-0 rounded-r-md hover:bg-gray-200"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Status:</span>
          </div>
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ALL">All</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
          </select>

          <button
            onClick={() =>
              fetchPosts(pagination.currentPage, searchTerm, statusFilter)
            }
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Post
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created At
              </th>

              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-16 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-2"></div>
                    <span>Loading posts...</span>
                  </div>
                </td>
              </tr>
            ) : posts.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-16 text-center text-gray-500"
                >
                  No posts found. Try different search criteria.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={
                            post.featuredImage?.filePath ||
                            "/api/placeholder/40/40"
                          }
                          alt={post.featuredImage?.alt || "Post image"}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {post.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {post.shortDescription}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {post.createdBy.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {post.createdBy.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => handleView(post._id)}
                        className="text-gray-600 hover:text-blue-600"
                        title="View"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="text-gray-600 hover:text-yellow-600"
                        title="Edit Status"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-gray-600 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && posts.length > 0 && (
        <PostPagination setPagination={setPagination} pagination={pagination} />
      )}

      {/* Status Update Modal */}
      <PostStatusModal
        isOpen={statusModal.isOpen}
        onClose={() =>
          setStatusModal({ isOpen: false, postId: null, currentStatus: null })
        }
        postId={statusModal.postId}
        currentStatus={statusModal.currentStatus}
        onUpdate={handleStatusUpdate}
      />
    </div>
  );
}
