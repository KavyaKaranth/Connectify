import { useEffect, useState } from "react";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostsWithComments = async () => {
      try {
        // Fetch all posts
        const res = await fetch("https://dummyjson.com/posts");
        const postData = await res.json();

        // For each post, fetch its comments
        const postsWithComments = await Promise.all(
          postData.posts.slice(0, 5).map(async (post) => {
            const commentRes = await fetch(
              `https://dummyjson.com/comments/post/${post.id}`
            );
            const commentData = await commentRes.json();
            return { ...post, comments: commentData.comments };
          })
        );

        setPosts(postsWithComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts or comments", error);
        setLoading(false);
      }
    };

    fetchPostsWithComments();
  }, []);

  return (
    <div className="bg-green-50 min-h-screen p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Main Feed */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Posts</h2>

          {loading ? (
            <p>Loading posts...</p>
          ) : (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-5 rounded-md shadow mb-4 border border-green-100"
              >
                <div className="mb-2">
                  <span className="text-sm text-green-700 font-medium">
                    @{post.user?.username || `user_${post.userId}`}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-green-900">
                  {post.title}
                </h3>
                <p className="text-gray-700 mt-1 text-sm">{post.body}</p>

                {/* Comments */}
                {post.comments && post.comments.length > 0 && (
                  <div className="mt-3 pt-2 border-t text-sm text-gray-700">
                    <p className="text-green-700 font-medium mb-1">Comments:</p>
                    {post.comments.map((cmt) => (
                      <div key={cmt.id} className="mb-1">
                        <span className="font-semibold">@{cmt.user?.username || "user"}</span>:{" "}
                        {cmt.body}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="w-full md:w-64">
          <div className="bg-white p-4 rounded-md shadow">
            <h3 className="text-green-800 font-semibold mb-3">Suggestions</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between items-center">
                <span>user_01</span>
                <button className="text-green-600 hover:underline">Connect</button>
              </li>
              <li className="flex justify-between items-center">
                <span>user_02</span>
                <button className="text-green-600 hover:underline">Connect</button>
              </li>
              <li className="flex justify-between items-center">
                <span>user_03</span>
                <button className="text-green-600 hover:underline">Connect</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
