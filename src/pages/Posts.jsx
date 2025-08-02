import { useState } from "react";

export default function PostsPage() {
  const [posts] = useState([
    {
      id: 1,
      user: "jane_doe",
      title: "Getting started with Tailwind CSS",
      content:
        "Tailwind makes styling so much faster. Just started using it for our Connectify UI.",
    },
    {
      id: 2,
      user: "rahul_dev",
      title: "React Router Tips",
      content:
        "Remember to wrap your routes in `<BrowserRouter>` and use `Link` instead of `<a>` for navigation.",
    },
    {
      id: 3,
      user: "nisha_ui",
      title: "Dark mode in Tailwind",
      content: "Enable dark mode with class strategy and it's super flexible!",
    },
  ]);

  return (
    <div className="bg-green-50 min-h-screen p-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Posts</h2>

        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-5 rounded-md shadow mb-4 border border-green-100"
          >
            <div className="mb-2">
              <span className="text-sm text-green-700 font-medium">
                @{post.user}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-green-900">{post.title}</h3>
            <p className="text-gray-700 mt-1 text-sm">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
