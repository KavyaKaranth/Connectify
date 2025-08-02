import { useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // Fetch posts by user
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/posts/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setPosts(data.posts || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId, token]);

  const handleAddPost = async () => {
    setError("");
    if (!newPost.title || !newPost.body) {
      setError("Title and content are required.");
      return;
    }

    console.log("Selected file (not uploaded to API):", file);

    try {
      const res = await fetch("https://dummyjson.com/posts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          userId: parseInt(userId),
        }),
      });

      const data = await res.json();
      setPosts([data, ...posts]);
      setNewPost({ title: "", body: "" });
      setFile(null);
    } catch (err) {
      console.error("Error adding post", err);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await fetch(`https://dummyjson.com/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting post", err);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Your Posts</h2>

        {/* Add New Post Form */}
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h3 className="text-lg font-medium text-green-700 mb-2">Add New Post</h3>

          <input
            type="text"
            placeholder="Post title"
            className="w-full p-2 border border-green-300 rounded mb-2"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />

          <textarea
            rows="3"
            placeholder="Post content"
            className="w-full p-2 border border-green-300 rounded mb-2"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />

          {/* File Upload Input */}
          <div className="mb-3">
            <label className="flex items-center gap-2 text-green-700 cursor-pointer hover:underline">
              <FaFileUpload />
              <span>Attach a file</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {file && <p className="text-sm text-gray-600 mt-1">Selected: {file.name}</p>}
          </div>

          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          <button
            onClick={handleAddPost}
            className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer"
          >
            Post
          </button>
        </div>

        {/* Posts List */}
        {loading ? (
          <p>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-600">No posts found.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-4 rounded-md shadow mb-4 border border-green-100"
            >
              <h3 className="text-lg font-semibold text-green-900">{post.title}</h3>
              <p className="text-gray-700 mt-1 text-sm">{post.body}</p>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="mt-2 text-red-600 text-sm hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
