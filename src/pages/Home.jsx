export default function HomePage() {
  return (
    <div className="bg-green-50 min-h-screen p-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Main Feed */}
        <div className="flex-1">
          {/* Post Creation Box */}
          <div className="bg-white p-4 rounded-md shadow">
            <input
              type="text"
              placeholder="Start a post..."
              className="w-full border border-green-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <div className="mt-2 text-right">
              <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700">
                Post
              </button>
            </div>
          </div>

          {/* Posts List */}
          <div className="mt-6 space-y-4">
            {[1, 2, 3].map((id) => (
              <div key={id} className="bg-white p-4 rounded-md shadow">
                <div className="font-semibold text-green-800 mb-1">User {id}</div>
                <p className="text-gray-700">
                  This is a sample post content. You can replace this with real data later.
                </p>
              </div>
            ))}
          </div>
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
