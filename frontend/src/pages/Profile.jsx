import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const token = localStorage.getItem("token"); // JWT token

  // ✅ Fetch user profile
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Assuming backend returns { success: true, user: { name, email } }
      setProfile(res.data.user);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to fetch profile");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-3xl font-bold mb-6 text-center">Profile</h2>

      <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
        <p className="mb-2">
          <b>Name:</b> {profile.name || "Loading..."}
        </p>
        <p>
          <b>Email:</b> {profile.email || "Loading..."}
        </p>
      </div>
    </div>
  );
};

export default Profile;
