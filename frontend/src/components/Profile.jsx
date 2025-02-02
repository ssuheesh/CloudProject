import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config/api";
import defaultImg from "../assets/default-profile.png";
import Loader from "./Loader";
import { FaEdit, FaSignOutAlt } from "react-icons/fa"; // Importing icons for Edit and Logout

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const fetchProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError("Failed to load profile data");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setError("");
    setLoading(true);

    if (file) {
      try {
        const filename = encodeURIComponent(file.name);
        const contentType = file.type;

        const token = localStorage.getItem("token");
        const response = await axios.put(
          `${BASE_URL}user/updateprofile`,
          {
            ...userData,
            profileImageName: filename,
            contentType,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { uploadURL } = response.data;
        if (!uploadURL) {
          setError("Failed to get upload URL");
          return;
        }

        await axios.put(uploadURL, file, {
          headers: { "Content-Type": file.type },
        });

        fetchProfile();
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-2xl p-8 bg-white shadow-lg rounded-lg relative">
        <button
          onClick={handleLogout}
          className="absolute top-4 right-4 text-red-400 hover:text-red-700 focus:outline-none transition-colors"
        >
          <FaSignOutAlt size={28} />
        </button>

        <h2 className="text-3xl font-semibold text-center text-gray-500 mb-6">
          Profile
        </h2>
        {error && (
          <h3 className="text-red-500 text-sm font-medium text-center mt-2">
            {error}
          </h3>
        )}
        <div className="flex flex-col items-center relative">
          <div className="relative mb-6">
            <img
              src={userData?.profileImage && userData?.profileImage != " " ? userData?.profileImage : defaultImg}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-full"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="absolute top-0 right-0 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200 focus:outline-none transition-colors"
            >
              <FaEdit size={20} color="#4A90E2" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            <div className="text-right text-gray-700">Full Name:</div>
            <div className="text-left font-medium text-gray-900">
              {userData?.name}
            </div>

            <div className="text-right text-gray-700">Email:</div>
            <div className="text-left font-medium text-gray-900">
              {userData?.email}
            </div>

            <div className="text-right text-gray-700">Profile Image:</div>
            <div className="text-left font-medium text-gray-900">
              {userData?.profileImage ? "Image Available" : "No Image"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
