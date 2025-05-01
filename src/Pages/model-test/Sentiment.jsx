import { useState } from "react";

export default function Sentiment() {
  const [text, setText] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(
        "https://sentiment-analysis-2kya.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "API Error");
      setResponse(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl space-y-4">
        <h1 className="text-2xl font-bold text-center text-blue-600">
          Sentiment Predictor
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a sentence..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Sentiment"}
          </button>
        </form>

        {error && <p className="text-red-500 text-sm">Error: {error}</p>}

        {response && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-md mt-4">
            <p>
              <strong>Original Text:</strong> {response.text}
            </p>
            <p>
              <strong>Cleaned Text:</strong> {response.clean_text}
            </p>
            <p>
              <strong>Predicted Sentiment:</strong>{" "}
              {response.predicted_sentiment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
