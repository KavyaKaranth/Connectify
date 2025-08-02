import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("Invalid username or password");

      const data = await res.json();
      localStorage.setItem("token", data.token);
      setIsLoggedIn(true);
      navigate("/home");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Green panel */}
      <div className="w-1/2 bg-green-500 text-white flex flex-col justify-center items-center p-12">
        <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
        <p className="text-lg text-center max-w-sm">
          You can sign in to access with your existing account.
        </p>
      </div>

      {/* Right side - Login form */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <form
          onSubmit={handleLogin}
          className="bg-white px-10 py-12 w-full max-w-md shadow-xl rounded-3xl border border-gray-200"
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-6 text-center">
            Sign In
          </h2>

          {error && (
            <p className="mb-4 text-sm text-center text-red-600">{error}</p>
          )}

          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username or email"
              required
              className="w-full px-4 py-3 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-3 border border-green-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <label>
              <input type="checkbox" className="mr-2 cursor-pointer" /> Remember me
            </label>
            <a href="#" className="text-green-600 hover:underline cursor-pointer">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition cursor-pointer"
          >
            Sign In
          </button>

          <p className="mt-6 text-center text-sm text-gray-600">
            New here?{" "}
            <a href="#" className="text-green-600 hover:underline cursor-pointer">
              Create an Account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
