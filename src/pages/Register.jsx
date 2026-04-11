import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  // 🔥 Password Strength
  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 5) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[@$!%*?&]/.test(password)) strength++;
    return strength;
  };

  const strength = getPasswordStrength(form.password);

  // VALIDATIONS
  const validateName = (name) => /^[A-Za-z ]+$/.test(name);
  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && !/^[A-Za-z ]*$/.test(value)) return;

    if (name === "email" && /[A-Z]/.test(value)) {
      setError("No capital letters allowed ❌");
      return;
    }

    setError("");
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateName(form.name)) {
      return setError("Only letters allowed in name");
    }

    if (!validateEmail(form.email)) {
      return setError("Invalid email format");
    }

    if (!validatePassword(form.password)) {
      return setError(
        "Password must include uppercase, lowercase, number & special character"
      );
    }

    try {
      await axios.post("http://localhost:5000/api/register", form);

      // 🎉 Show success animation
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed ❌"
      );
    }
  };

  const handleGoogleSignup = () => {
    alert("Google signup coming soon 🚀");
  };

  // 🎉 SUCCESS SCREEN
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="bg-white p-10 rounded-2xl shadow-2xl text-center animate-fadeIn">
          
          <div className="text-green-500 text-5xl mb-4 animate-bounce">
            ✅
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Registration Successful!
          </h2>

          <p className="text-gray-500 mt-2">
            Redirecting to login...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-4">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account 🚀
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Start your journey with us
        </p>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
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

        <form onSubmit={handleRegister} className="space-y-5">

          {/* Name */}
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder=" "
              value={form.password}
              onChange={handleChange}
              className="peer w-full px-4 pt-5 pb-2 border rounded-lg outline-none transition-all duration-300 focus:ring-2 focus:ring-indigo-500"
              required
            />

            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base
              peer-focus:top-2 peer-focus:text-sm peer-focus:text-indigo-600">
              Password
            </label>

            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* 🔥 Password Strength */}
          <div>
            <div className="h-2 w-full bg-gray-200 rounded">
              <div
                className={`h-2 rounded transition-all duration-300 ${
                  strength <= 2
                    ? "bg-red-500 w-1/4"
                    : strength === 3
                    ? "bg-yellow-500 w-2/4"
                    : strength === 4
                    ? "bg-blue-500 w-3/4"
                    : "bg-green-500 w-full"
                }`}
              ></div>
            </div>

            <p className="text-xs mt-1">
              {strength <= 2 && "Weak ❌"}
              {strength === 3 && "Medium ⚠️"}
              {strength >= 4 && "Strong ✅"}
            </p>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm text-center">
              {error}
            </p>
          )}

          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-indigo-600 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;