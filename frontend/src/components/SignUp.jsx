import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      let requestData = { ...formData };

      if (file) {
        const filename = encodeURIComponent(file.name);
        const contentType = file.type;
        requestData.profileImageName = filename;  

        const response = await axios.post(`${BASE_URL}user/signup`, requestData);

        const { uploadURL } = response.data;
        if (!uploadURL) {
          setError("Failed to get upload URL");
          return;
        }

        await axios.put(uploadURL, file, {
          headers: { "Content-Type": contentType },
        });
      } else {
        await axios.post(`${BASE_URL}user/signup`, requestData);
      }
      setFormData({
        name: "",
        email: "",
        password: "",
      });
      setSuccess("Signup successful! Please ");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        {success && (
          <h3 className="text-green-700 text-sm font-medium text-center mt-2">
            {success}{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in 
            </a>
          </h3>
        )}
        {error && (
          <h3 className="text-red-500 text-sm font-medium text-center mt-2">
            {error}
          </h3>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="profileImage" className="block text-gray-700 font-medium">
              Profile Picture
            </label>
            <div className="flex flex-col w-full border border-gray-300 rounded-lg">
              <input
                type="file"
                disabled={loading}
                onChange={handleFileChange}
                className="file:bg-gray-200 file:text-black file:py-2 file:px-4 file:rounded-lg file:border-0"
              />
            </div>
          </div>

          <button
            type="submit"
            className={`w-full p-3 ${
              loading ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700 transition-colors"
            } text-white rounded-lg cursor-pointer flex items-center justify-center`}
            disabled={loading}
          >
            {loading && (
              <svg className="mr-3 w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.4" strokeDashoffset="7.85" />
              </svg>
            )}
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
