import { useState } from "react";
import { Toaster } from "react-hot-toast";
import CommentList from "./components/CommentList.jsx";
import CommentForm from "./components/CommentForm.jsx";

function App() {
  // This key will be updated to trigger a refresh in the CommentList
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans p-4 sm:p-8">
      <Toaster position="top-center" />
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Sentiment Showcase
        </h1>
        <CommentForm onCommentSubmit={() => setRefreshKey((prevKey) => prevKey + 1)} />
        <CommentList refreshKey={refreshKey} />
      </main>
    </div>
  );
}

export default App;
