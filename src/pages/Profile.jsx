import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingAbout, setEditingAbout] = useState(false);
  const [aboutText, setAboutText] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://dummyjson.com/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUser(data);
        setAboutText(`Email: ${data.email} \nPhone: ${data.phone} \nAge: ${data.age}`);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handlePasswordChange = () => {
    setPasswordError("");

    const { oldPassword, newPassword, confirmPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    alert("Password change submitted (demo only).");

    setChangingPassword(false);
    setPasswordData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (loading) return <div className="p-6 text-center">Loading profile...</div>;
  if (!user) return <div className="p-6 text-center text-red-600">User not found.</div>;

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
            <h2 className="text-2xl font-semibold text-green-800">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-gray-600">{user.company?.title}</p>
            <p className="text-sm text-gray-500 mt-1">
              {user.address?.city}, {user.address?.state}
            </p>
          </div>
        </div>

        {/* About Section */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium text-green-700">About</h3>
            <button
              onClick={() => setEditingAbout(!editingAbout)}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-800 cursor-pointer"
            >
              {editingAbout ? "Cancel" : "Edit"}
            </button>
          </div>

          {editingAbout ? (
            <div>
              <textarea
                className="w-full p-2 border border-green-300 rounded text-sm"
                rows={4}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
              />
              <button
                onClick={() => {
                  setEditingAbout(false);
                  alert("About updated ");
                }}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 cursor-pointer"
              >
                Save
              </button>
            </div>
          ) : (
            <pre className="text-gray-700 text-sm whitespace-pre-line">{aboutText}</pre>
          )}
        </div>

        
        

        {/* Activity Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium text-green-700 mb-2">Activity</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Logged in recently</li>
            <li>• Account created at: {user.birthDate}</li>
            <li>
              • From: {user.address?.city}, {user.address?.state}
            </li>
          </ul>
        </div>
        {/* Change Password Section */}
        <div className="mt-6">
          <button
            onClick={() => setChangingPassword(!changingPassword)}
            className="bg-green-600 text-white text-sm px-4 py-1 rounded hover:bg-green-700 cursor-pointer"
          >
            {changingPassword ? "Cancel" : "Change Password"}
          </button>

        
      {/* Password Modal */}
     {changingPassword && (
  <div className="fixed inset-0 flex items-center justify-center z-50">

    {/* light, see-through overlay */}
    <div
      onClick={() => setChangingPassword(false)}
      className="fixed inset-0 bg-black/10"
    />

    {/* modal */}
    <div className="relative bg-white rounded-md shadow-lg p-6 w-full max-w-md z-50">
      <h2 className="text-lg font-semibold text-green-700 mb-4 text-center cursor-pointer">
        Change Password
      </h2>

      <input
        type="password"
        placeholder="Current Password"
        className="w-full mb-3 p-2 border border-green-300 rounded"
        value={passwordData.oldPassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, oldPassword: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="New Password"
        className="w-full mb-3 p-2 border border-green-300 rounded"
        value={passwordData.newPassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, newPassword: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Confirm New Password"
        className="w-full mb-3 p-2 border border-green-300 rounded"
        value={passwordData.confirmPassword}
        onChange={(e) =>
          setPasswordData({ ...passwordData, confirmPassword: e.target.value })
        }
      />

      {passwordError && (
        <p className="text-red-500 text-sm mb-2">{passwordError}</p>
      )}

      <div className="flex justify-end space-x-2">
        <button
          onClick={() => setChangingPassword(false)}
          className="text-sm text-gray-700 hover:underline cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handlePasswordChange}
          className="bg-green-700 text-white text-sm px-4 py-1 rounded hover:bg-green-800 cursor-pointer"
        >
          Save
        </button>
      </div>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}
