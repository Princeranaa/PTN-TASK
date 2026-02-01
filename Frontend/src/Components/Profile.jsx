import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/Constant";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/auth/profile`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="card bg-base-100 shadow-xl w-full max-w-md p-6 text-center">
        {/* Avatar */}
        <figure className="w-28 h-28 mx-auto rounded-full overflow-hidden border mb-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-400 bg-base-200">
              No Image
            </div>
          )}
        </figure>

        {/* Name */}
        <h2 className="text-2xl font-semibold">
          {user?.fullname?.firstname} {user?.fullname?.lastname}
        </h2>

        {/* Email */}
        <p className="text-gray-500 mt-1">{user?.email}</p>

        <div className="divider my-4"></div>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">First Name:</span>{" "}
            {user?.fullname?.firstname}
          </p>
          <p>
            <span className="font-medium">Last Name:</span>{" "}
            {user?.fullname?.lastname}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user?.email}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
