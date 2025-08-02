import { useEffect, useState } from "react";

export default function NetworkPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = parseInt(localStorage.getItem("userId"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://dummyjson.com/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        // Exclude logged-in user
        const filtered = data.users.filter((u) => u.id !== currentUserId);
        setUsers(filtered);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUserId, token]);

  if (loading) {
    return <div className="p-6 text-center">Loading suggestions...</div>;
  }

  return (
    <div className="bg-green-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow">
        <h2 className="text-2xl font-semibold text-green-800 mb-4">Suggested Connections</h2>
        {users.length === 0 ? (
          <p className="text-gray-600">No other users found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="border border-green-200 p-4 rounded shadow-sm bg-white"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.image}
                    alt="User"
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <p className="text-green-800 font-semibold">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user.company?.title}</p>
                  </div>
                </div>
                <button className="mt-3 w-full bg-green-600 text-white text-sm py-1 rounded hover:bg-green-700">
                  Connect
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
