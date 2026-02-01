import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/Constant";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    gender: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); 

    try {
      const payload = {
        email: formData.email,
        password: formData.password,
        fullname: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        gender: formData.gender,
      };

      const response = await axios.post(
        `${BASE_URL}/api/auth/register`,
        payload,
        { withCredentials: true },
      );

      toast.success(response.data.message || "Registration successful");
      setFormData({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
        gender: "",
      });

      navigate("/");
      setLoading(false);
    } catch (err) {
      const message =
      (err.response && err.response.data && err.response.data.message) || "Something went wrong";
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-300 shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="card-title text-3xl mb-1">Create Account</h1>
            <p className="text-gray-500">Sign up to get started</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">First Name</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="Enter your first name"
                value={formData.firstname}
                onChange={handleChange}
                disabled={loading}
                className="input input-bordered input-primary outline-none w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Last Name</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastname"
                placeholder="Enter your last name"
                value={formData.lastname}
                onChange={handleChange}
                disabled={loading}
                className="input input-bordered input-primary outline-none w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email Address</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                className="input input-bordered input-primary outline-none w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Gender</span>
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={loading}
                  className="select select-bordered select-primary w-full outline-none pr-10"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="form-control w-full relative">
              <label className="label">
                <span className="label-text">Password</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                className="input input-bordered input-primary outline-none w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="btn btn-ghost btn-sm absolute top-7 right-1"
                disabled={loading}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="divider">or</div>

          <p className="text-center text-gray-500">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-primary font-semibold hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>

        <div className="text-center mt-2 text-gray-500 text-sm">
          <p>Protected by secure authentication</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
