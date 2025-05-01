import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { AlertTriangle } from "lucide-react";
import { getAllSentiment } from "../../../apis/services/SentimentService";

export default function SentimentStatistics() {
  const [sentimentData, setSentimentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [averageScores, setAverageScores] = useState({
    overall: { positive: 0, negative: 0, neutral: 0 },
    post: { positive: 0, negative: 0, neutral: 0 },
    comment: { positive: 0, negative: 0, neutral: 0 },
  });

  useEffect(() => {
    const fetchAllSentiments = async () => {
      setLoading(true);
      try {
        const res = await getAllSentiment({ isAll: true });
        const sentiments = res.data.items;
        setSentimentData(sentiments);

        // Calculate averages
        calculateAverages(sentiments);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch sentiments:", error);
        setError("Failed to load sentiment data");
        setLoading(false);
      }
    };

    fetchAllSentiments();
  }, []);

  const calculateAverages = (sentiments) => {
    if (!sentiments || sentiments.length === 0) {
      return;
    }

    const postSentiments = sentiments.filter((s) => s.type === "POST");
    const commentSentiments = sentiments.filter((s) => s.type === "COMMENT");

    const calculateAvg = (items) => {
      if (items.length === 0) return { positive: 0, negative: 0, neutral: 0 };

      return {
        positive:
          items.reduce((sum, item) => sum + item.positive, 0) / items.length,
        negative:
          items.reduce((sum, item) => sum + item.negative, 0) / items.length,
        neutral:
          items.reduce((sum, item) => sum + item.neutral, 0) / items.length,
      };
    };

    setAverageScores({
      overall: calculateAvg(sentiments),
      post: calculateAvg(postSentiments),
      comment: calculateAvg(commentSentiments),
    });
  };

  const getSentimentLevel = (score) => {
    if (score < 0.2) return "Very Low";
    if (score < 0.4) return "Low";
    if (score < 0.6) return "Moderate";
    if (score < 0.8) return "High";
    return "Very High";
  };

  const getSentimentColor = (score) => {
    if (score < 0.2) return "bg-green-50 text-green-700";
    if (score < 0.4) return "bg-yellow-50 text-yellow-700";
    if (score < 0.6) return "bg-orange-50 text-orange-700";
    if (score < 0.8) return "bg-red-50 text-red-700";
    return "bg-red-100 text-red-800";
  };

  const comparisonData = [
    {
      name: "Overall",
      negative: averageScores.overall.negative,
      positive: averageScores.overall.positive,
      neutral: averageScores.overall.neutral,
    },
    {
      name: "Posts",
      negative: averageScores.post.negative,
      positive: averageScores.post.positive,
      neutral: averageScores.post.neutral,
    },
    {
      name: "Comments",
      negative: averageScores.comment.negative,
      positive: averageScores.comment.positive,
      neutral: averageScores.comment.neutral,
    },
  ];

  const pieData = [
    { name: "Negative", value: averageScores.overall.negative },
    { name: "Positive", value: averageScores.overall.positive },
    { name: "Neutral", value: averageScores.overall.neutral },
  ];

  const COLORS = ["#ef4444", "#22c55e", "#3b82f6"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading sentiment data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <div className="flex items-center">
          <AlertTriangle className="text-red-500 mr-2" size={24} />
          <h3 className="text-red-800 font-semibold">
            Error loading sentiment data
          </h3>
        </div>
        <p className="mt-2 text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Website Sentiment Analysis
      </h2>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Average Negative Sentiment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-lg shadow ${getSentimentColor(
              averageScores.overall.negative
            )}`}
          >
            <h4 className="text-lg font-medium">Overall</h4>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">
                {(averageScores.overall.negative * 100).toFixed(1)}%
              </p>
              <p className="text-sm mb-1">
                {getSentimentLevel(averageScores.overall.negative)}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{ width: `${averageScores.overall.negative * 100}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              Based on {sentimentData.length} items
            </p>
          </div>

          <div
            className={`p-4 rounded-lg shadow ${getSentimentColor(
              averageScores.post.negative
            )}`}
          >
            <h4 className="text-lg font-medium">Posts</h4>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">
                {(averageScores.post.negative * 100).toFixed(1)}%
              </p>
              <p className="text-sm mb-1">
                {getSentimentLevel(averageScores.post.negative)}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{ width: `${averageScores.post.negative * 100}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              Based on {sentimentData.filter((s) => s.type === "POST").length}{" "}
              posts
            </p>
          </div>

          <div
            className={`p-4 rounded-lg shadow ${getSentimentColor(
              averageScores.comment.negative
            )}`}
          >
            <h4 className="text-lg font-medium">Comments</h4>
            <div className="flex items-end gap-2">
              <p className="text-3xl font-bold">
                {(averageScores.comment.negative * 100).toFixed(1)}%
              </p>
              <p className="text-sm mb-1">
                {getSentimentLevel(averageScores.comment.negative)}
              </p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-red-600 h-2.5 rounded-full"
                style={{ width: `${averageScores.comment.negative * 100}%` }}
              ></div>
            </div>
            <p className="text-sm mt-2">
              Based on{" "}
              {sentimentData.filter((s) => s.type === "COMMENT").length}{" "}
              comments
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Overall Sentiment Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) =>
                    `${name}: ${(value * 100).toFixed(1)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `${(value * 100).toFixed(1)}%`,
                    "Score",
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Sentiment Comparison
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis
                  tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                />
                <Tooltip
                  formatter={(value) => [
                    `${(value * 100).toFixed(1)}%`,
                    "Score",
                  ]}
                />
                <Legend />
                <Bar dataKey="negative" name="Negative" fill="#ef4444" />
                <Bar dataKey="positive" name="Positive" fill="#22c55e" />
                <Bar dataKey="neutral" name="Neutral" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Negative Score Evaluation
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score Range
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Negativity Level
                </th>
                <th className="px-6 py-3 bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Recommendation
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  0-20%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-700">
                  Very Low
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Great! Content is mostly positive or neutral
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  21-40%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-700">
                  Low
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Good, but monitor for any increasing trends
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  41-60%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-700">
                  Moderate
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Concerning, review content moderation policies
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  61-80%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-700">
                  High
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Urgent attention needed, implement stricter moderation
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  81-100%
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-800">
                  Very High
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Critical issue, immediate intervention required
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
