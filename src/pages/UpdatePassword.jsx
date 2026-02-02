import { useState } from "react";
import {
  Card,
  Input,
  Typography,
} from "@material-tailwind/react";
import { URL } from "../api";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

function UpdatePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem("token");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/api/update-password`,
        {
          current_password: formData.currentPassword,
          password: formData.newPassword,
          password_confirmation: formData.confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Password updated successfully");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(response.data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Update password error:", error);
      toast.error(error.response?.data?.message || "Error updating password");
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="container mx-auto p-4">
        <Card className="p-6 bg-gradient-to-tl to-light-green-200 from-green-200 rounded-lg shadow">
          <Typography variant="h4" className="mb-4 font-semibold">
            Update Password
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                name="currentPassword"
                label="Current Password"
                value={formData.currentPassword}
                onChange={handleChange}
                required
                className="w-full bg-white"
              />
            </div>
            <div>
              <Input
                type="password"
                name="newPassword"
                label="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                required
                className="w-full bg-white"
              />
            </div>
            <div>
              <Input
                type="password"
                name="confirmPassword"
                label="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-white"
              />
            </div>
            {error && (
              <Typography color="red" className="text-sm">
                Error: {error}
              </Typography>
            )}
            <motion.button
              type="submit"
              className={`w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </motion.button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default UpdatePassword;