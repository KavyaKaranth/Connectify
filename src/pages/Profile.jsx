export default function ProfilePage() {
  const user = {
    name: "Jane Doe",
    headline: "Frontend Developer @ Connectify",
    location: "Bengaluru, India",
    about:
      "Passionate about building accessible web apps. Loves React, Tailwind, and chai.",
    image:
      "https://randomuser.me/api/portraits/women/68.jpg", // Placeholder profile image
  };

  return (
    <div className="bg-green-50 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user.image}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-200"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold text-green-800">{user.name}</h2>
            <p className="text-sm text-gray-600">{user.headline}</p>
            <p className="text-sm text-gray-500 mt-1">{user.location}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-green-700 mb-2">About</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{user.about}</p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium text-green-700 mb-2">Activity</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Posted about “Building UI with Tailwind”</li>
            <li>• Commented on a post by @john_dev</li>
            <li>• Updated headline</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
