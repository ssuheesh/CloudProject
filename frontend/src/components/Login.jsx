import { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../config/api';

const Login = () => {
    const navigate = useNavigate(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
        const response = await axios.post(BASE_URL + "user/login", formData);
        const { token } = response.data;
      localStorage.setItem('token', token);
        setLoading(false);
        navigate("/profile");
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError("Something went wrong. Please try again.");
      }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Log In</h2>
        {error && 
          <h3 className="text-red-500 text-sm font-medium text-center mt-2">
            {error}
          </h3>
          }
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
              required
              disabled={loading}
            />
          </div>
          <button
              type="submit"
              className={`w-full p-3 ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700 transition-colors'} text-white rounded-lg cursor-pointer   flex items-center justify-center`}
              disabled={loading}
                        >
              {loading && (
                <svg className="mr-3 w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="31.4" strokeDashoffset="7.85" />
                </svg>
              )}
              Log In 
            </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">Don't have an account? <a href="/" className="text-blue-500 hover:underline">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
