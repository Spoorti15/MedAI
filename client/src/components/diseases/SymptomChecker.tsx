import { useState } from "react";

type PredictionResult = {
  benign: number;
  malignant: number;
};

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!symptoms.trim()) {
      setError("Please describe your symptoms first!");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://localhost:8000/bert-predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) throw new Error("Failed to fetch prediction!");

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Symptom Checker</h2>

      <textarea
        placeholder="Describe your symptoms..."
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        rows={5}
        className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-400"
      />

      <button
        onClick={handlePredict}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Analyzing..." : "Analyze Symptoms"}
      </button>

      {error && <p className="text-red-500 font-medium text-center">{error}</p>}

      {result && (
        <div className="mt-6 space-y-2 text-center">
          <h3 className="text-lg font-bold">Prediction Results:</h3>
          <p>
            Benign: <span className="font-semibold">{result.benign}%</span>
          </p>
          <p>
            Malignant:{" "}
            <span className="font-semibold">{result.malignant}%</span>
          </p>
        </div>
      )}

      {!loading && !result && !error && (
        <p className="text-gray-500 text-center">Awaiting input...</p>
      )}
    </div>
  );
}
