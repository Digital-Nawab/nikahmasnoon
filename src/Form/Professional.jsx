import { useState, useEffect } from "react";
// import { Card, Input, Button, Radio, Typography } from "@material-tailwind/react";
import { URL } from "../api";
import axios from "axios";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

function Professional() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [formChanges, setFormChanges] = useState({});
  const token = sessionStorage.getItem("token");

  // Fetch dropdown options data
  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const response = await axios.get(`${URL}/api/register`, {
          headers: {
            Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
          },
        });
        setSuccess(response?.data?.data);
      } catch (err) {
        console.error("Error fetching dropdown data:", err);
        setError("Error loading form options");
      } finally {
        setLoading(false);
      }
    };
    fetchDropdownData();
  }, []);

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`${URL}/api/my-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfileData(response?.data?.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
      }
    };

    fetchProfileData();
  }, [token]);

  console.log(success);

  // Handle select field changes
  const handleSelectChange = (name, value) => {
    setFormChanges((prev) => ({
      ...prev,
      [name]: value,
    }));
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormChanges((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form changes
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.keys(formChanges).length === 0) {
      toast.info("No changes to update");
      return;
    }

    try {
      const response = await axios.post(
        `${URL}/api/update-profile`,
        formChanges,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile updated successfully");
        setFormChanges({});
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Error updating profile");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Helper function to create Select value object
  const createSelectValue = (value, label = value) => {
    return value ? { value, label } : null;
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Family Type
            </label>
            <Select
              name="family_type"
              value={createSelectValue(profileData?.family_type)}
              options={success?.FamilyType?.map((item) => ({
                value: item.title,
                label: item.title,
              }))}
              onChange={(option) =>
                handleSelectChange("family_type", option.value)
              }
              className="w-full capitalize"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Language Spoken
            </label>
            <Select
              name="language_spoken"
              value={createSelectValue(profileData?.language_spoken)}
              options={success?.Language?.map((item) => ({
                value: item.title,
                label: item.title,
              }))}
              onChange={(option) =>
                handleSelectChange("language_spoken", option.value)
              }
              className="w-full capitalize"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Any Disability
            </label>
            <Select
              name="any_disability"
              value={createSelectValue(
                profileData?.any_disability,
                profileData?.any_disability === "yes" ? "Yes" : "No"
              )}
              options={[
                { value: "no", label: "No" },
                { value: "yes", label: "Yes" },
              ]}
              onChange={(option) =>
                handleSelectChange("any_disability", option.value)
              }
              className="w-full capitalize"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Highest Qualification
            </label>
            <Select
              name="qualification"
              value={createSelectValue(profileData?.qualification)}
              options={success?.Qualification?.map((item) => ({
                value: item.title,
                label: item.title,
              }))}
              onChange={(option) =>
                handleSelectChange("qualification", option.value)
              }
              className="w-full capitalize"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employed In
            </label>
            <Select
              name="employed_in"
              value={createSelectValue(profileData?.employed_in)}
              options={success?.Employeed?.map((item) => ({
                value: item.title,
                label: item.title,
              }))}
              onChange={(option) =>
                handleSelectChange("employed_in", option.value)
              }
              className="w-full capitalize"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Occupation
            </label>
            <Select
              name="occupation"
              value={createSelectValue(profileData?.occupation)}
              options={success?.Occupation?.map((item) => ({
                value: item.title,
                label: item.title,
              }))}
              onChange={(option) =>
                handleSelectChange("occupation", option.value)
              }
              className="w-full capitalize"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Annual Income
            </label>
            <Select
              name="annual_income"
              value={createSelectValue(profileData?.annual_income)}
              options={success?.income?.map((item) => ({
                value: item.title,
                label: item.title,
              }))}
              onChange={(option) =>
                handleSelectChange("annual_income", option.value)
              }
              className="w-full capitalize"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Other Qualification
            </label>
            <input
              name="other_qualification"
              value={
                formChanges.other_qualification ||
                profileData?.other_qualification ||
                ""
              }
              onChange={handleInputChange}
              type="text"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Other Qualification"
            />
          </div>
        </div>
      </div>

      <motion.button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Update Profile
      </motion.button>
    </form>
  );
}

export default Professional;
