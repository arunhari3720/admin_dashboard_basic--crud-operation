import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

function Login({ setIsAuthenticated }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 🔥 Block uppercase in email
    if (name === "email" && /[A-Z]/.test(value)) {
      setError("No capital letters allowed ❌");
      return;
    }

    setError("");
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsAuthenticated(true);
      navigate("/dashboard");

    } catch (err) {
      setError("Invalid credentials ❌");
    }
  };

  const handleGoogleLogin = () => {
    alert("Google login coming soon 🚀");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">

      <div className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-2xl w-full max-w-md p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 border py-2 rounded-lg hover:bg-gray-100 transition mb-4"
        >
          <FcGoogle size={22} />
          <span className="text-sm font-medium">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="text-sm text-gray-400">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">

          {/* Email */}
          <div>
            <label className="text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 transition"
              required
            />
          </div>

          {/* 🔥 Animated Password Field */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              className="peer w-full px-4 pt-5 pb-2 border rounded-lg outline-none transition-all duration-300 
              focus:ring-2 focus:ring-indigo-500 focus:scale-[1.02]"
              required
            />

            {/* Floating Label */}
            <label
              className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
              peer-placeholder-shown:text-gray-400
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600"
            >
              Password
            </label>

            {/* 👁 Show/Hide */}
            <div
              className="absolute right-3 top-3 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm mt-6 text-gray-600">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 font-semibold cursor-pointer"
          >
            Sign up
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;