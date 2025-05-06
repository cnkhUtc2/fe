import { useEffect, useState } from "react";
import { getAllPosts } from "../../apis/services/PostService";
import { useNavigate } from "react-router-dom";
import FloodAidPost from "./FloodAidPost";
import { getAllReliefCases } from "../../apis/services/ReliefCaseService";
import FloodAidReliefCase from "./FloodAidReliefCase";

const FloodAidFeed = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [reliefCases, setReliefCases] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all"); // "all", "posts", or "reliefCases"

  useEffect(() => {
    const fetchAllCases = async () => {
      const res = await getAllReliefCases({ isAll: true });
      setReliefCases(res.data.items);
    };
    fetchAllCases();
  }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const res = await getAllPosts({ isAll: true });
      const publishedPosts = res.data.items.filter(
        (post) => post.status === "PUBLISHED"
      );
      setPosts(publishedPosts);
    };
    fetchAllPosts();
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  // Filter content based on active filter
  const renderContent = () => {
    if (activeFilter === "posts") {
      return posts.map((post) => <FloodAidPost key={post._id} post={post} />);
    } else if (activeFilter === "reliefCases") {
      return reliefCases.map((reliefCase) => (
        <FloodAidReliefCase key={reliefCase._id} reliefCase={reliefCase} />
      ));
    } else {
      // Show all content when filter is "all"
      return (
        <>
          {posts.map((post) => (
            <FloodAidPost key={post._id} post={post} />
          ))}
          {reliefCases.map((reliefCase) => (
            <FloodAidReliefCase key={reliefCase._id} reliefCase={reliefCase} />
          ))}
        </>
      );
    }
  };

  return (
    <div className="bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-blue-800">
            Flood Aid Community
          </h1>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            onClick={() => {
              navigate("/create-post");
            }}
          >
            Share Your Story
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex mb-6 bg-white rounded-lg shadow-sm">
          <button
            className={`flex-1 py-3 px-4 rounded-l-lg ${
              activeFilter === "all"
                ? "bg-blue-600 text-white font-medium"
                : "text-blue-800 hover:bg-blue-100"
            }`}
            onClick={() => handleFilterChange("all")}
          >
            All Content
          </button>
          <button
            className={`flex-1 py-3 px-4 ${
              activeFilter === "posts"
                ? "bg-blue-600 text-white font-medium"
                : "text-blue-800 hover:bg-blue-100"
            }`}
            onClick={() => handleFilterChange("posts")}
          >
            Community Posts
          </button>
          <button
            className={`flex-1 py-3 px-4 rounded-r-lg ${
              activeFilter === "reliefCases"
                ? "bg-blue-600 text-white font-medium"
                : "text-blue-800 hover:bg-blue-100"
            }`}
            onClick={() => handleFilterChange("reliefCases")}
          >
            Relief Cases
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default FloodAidFeed;
