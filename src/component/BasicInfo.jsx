import { useState, useEffect } from "react";
import {
  Card,
  Input,
  Button,
  Radio,
  Typography,
} from "@material-tailwind/react";
import { URL, URLIMAGE } from "../api";
import axios from "axios";
import Select from "react-select";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../Layout";
import { motion } from "framer-motion";
import { FaRegFileCode } from "react-icons/fa";

function BasicInfo() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [formChanges, setFormChanges] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    const fetchSuccess = async () => {
      try {
        const response = await axios.get(`${URL}/api/register`, {
          headers: {
            Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
          },
        });
        setSuccess(response?.data?.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching Success");
      } finally {
        setLoading(false);
      }
    };
    fetchSuccess();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(`${URL}/api/my-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log(response);
        setProfileData(response?.data?.data || {});
        if (response?.data?.data?.image) {
          setPreviewImage(
            `https://admin.nikahmasnoon.com/${response.data.data.image}`
          );
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Error loading profile data");
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormChanges((prev) => ({
      ...prev,
      [name]: value,
    }));
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfileImage = async () => {
    if (!selectedFile) {
      toast.error("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        `${URL}/api/update-profile-image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Profile image updated successfully");
        setSelectedFile(null);
        const updatedProfile = await axios.get(`${URL}/api/my-profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (updatedProfile?.data?.data?.profile_image) {
          setPreviewImage(
            `${URLIMAGE}/${updatedProfile.data.data.profile_image}`
          );
        }
      } else {
        toast.error("Failed to update profile image");
      }
    } catch (error) {
      console.error("Update image error:", error);
      toast.error("Error updating profile image. Please try again.");
    }
  };

  const handleUpdateBasicprofile = async (e) => {
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
      toast.error("Error updating profile. Please try again.", {
        duration: 3000,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <form
      className="space-y-4"
      method="post"
      encType="multipart/form-data"
      onSubmit={handleUpdateBasicprofile}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="grid grid-cols-10 gap-3">
        <div className="col-span-10 lg:col-span-4 flex justify-center items-center">
          <div className="relative">
            <div
              className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => document.getElementById("imageInput").click()}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500">Select Image</span>
              )}
            </div>
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <motion.button
              type="button"
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleUpdateProfileImage}
            >
              Update Image
            </motion.button>
          </div>
        </div>

        <div className="col-span-10 lg:col-span-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
              <div className="w-full md:w-2/6 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Profile For <span className="text-red-600">*</span>
                </label>
                <Select
                  placeholder="Profile For"
                  name="matrimony_for"
                  required
                  options={success?.ProfleFor?.map((item) => ({
                    value: item?.title,
                    label: item?.title,
                  }))}
                  onChange={(option) =>
                    handleSelectChange("matrimony_for", option.value)
                  }
                  value={
                    profileData?.matrimony_for
                      ? {
                          value: profileData.matrimony_for,
                          label: profileData.matrimony_for,
                        }
                      : null
                  }
                />
              </div>
              <div className="w-full md:w-2/4">
                <label className="block text-sm font-medium text-gray-700">
                  Your Name <span className="text-red-600">*</span>
                </label>
                <Input
                  name="name"
                  placeholder="Your Name"
                  value={profileData?.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full md:w-2/6 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Marital Status <span className="text-red-600">*</span>
                </label>
                <Select
                  name="marital_status"
                  value={
                    profileData?.marital_status
                      ? {
                          value: profileData.marital_status,
                          label: profileData.marital_status,
                        }
                      : null
                  }
                  options={success?.MaritalStatus?.map((item) => ({
                    value: item?.title,
                    label: item?.title,
                  }))}
                  required
                  onChange={(option) =>
                    handleSelectChange("marital_status", option.value)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <Input
                  name="mobile"
                  maxLength="13"
                  minLength={10}
                  value={profileData?.mobile || ""}
                  required
                  placeholder="1234567890"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700">
                  Whatsapp Number <span className="text-red-600">*</span>
                </label>
                <Input
                  name="Whatsapp_no"
                  maxLength="13"
                  minLength={10}
                  value={profileData?.Whatsapp_no || ""}
                  required
                  placeholder="1234567890"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
              <div className="w-full md:w-2/6 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Caste <span className="text-red-600">*</span>
                </label>
                <Select
                  name="caste"
                  value={
                    profileData?.caste
                      ? {
                          value: profileData.caste,
                          label: profileData.caste,
                        }
                      : null
                  }
                  options={success?.Caste?.map((item) => ({
                    value: item?.title,
                    label: item?.title,
                  }))}
                  onChange={(option) =>
                    handleSelectChange("caste", option.value)
                  }
                  className="w-full capitalize"
                  required
                />
              </div>

              <div className="w-full md:w-2/6">
                <label className="block text-sm font-medium text-gray-700">
                  Maslaq <span className="text-red-600">*</span>
                </label>
                <Select
                  name="sub_caste"
                  value={
                    profileData?.sub_caste
                      ? {
                          value: profileData.sub_caste,
                          label: profileData.sub_caste,
                        }
                      : null
                  }
                  options={success?.Maslaq?.map((item) => ({
                    value: item?.title,
                    label: item?.title,
                  }))}
                  className="w-full capitalize"
                  onChange={(option) =>
                    handleSelectChange("sub_caste", option.value)
                  }
                  required
                />
              </div>

              <div className="w-full md:w-2/6 mb-4 md:mb-0">
                <label className="block text-sm font-medium text-gray-700">
                  Caste Preference <span className="text-red-600">*</span>
                </label>
                <Select
                  name="caste_preference"
                  value={
                    profileData?.caste_preference
                      ? {
                          value: profileData.caste_preference,
                          label:
                            profileData.caste_preference === "any-caste"
                              ? "Any Caste"
                              : profileData.caste_preference === "same-caste"
                              ? "Same Caste"
                              : "General Caste",
                        }
                      : null
                  }
                  options={[
                    { value: "any-caste", label: "Any Caste" },
                    { value: "same-caste", label: "Same Caste" },
                    { value: "general-caste", label: "General Caste" },
                  ]}
                  className="w-full capitalize"
                  required
                  onChange={(option) =>
                    handleSelectChange("caste_preference", option.value)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col">
              <div className="w-full md:w-4/7">
                <label className="block text-sm font-medium text-gray-700">
                  Email <span className="text-red-600">*</span>
                </label>
                <Input
                  onChange={handleInputChange}
                  name="email"
                  placeholder="name@mail.com"
                  value={profileData?.email || ""}
                  required
                />
              </div>

              <div className="w-full mt-4">
                <div className="flex items-center mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Gender <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-10">
                    <Radio
                      checked={profileData?.gender === "Male"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleSelectChange("gender", "Male");
                        }
                      }}
                      name="gender"
                      label="Male"
                      color="blue"
                    />
                    <Radio
                      checked={profileData?.gender === "Female"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          handleSelectChange("gender", "Female");
                        }
                      }}
                      name="gender"
                      label="Female"
                      color="pink"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-2/6">
                  <label className="block text-sm font-medium text-gray-700">
                    Date Of Birth <span className="text-red-600">*</span>
                  </label>
                  <input
                    name="dob"
                    type="date"
                    value={profileData?.dob || ""}
                    required
                    onChange={handleInputChange}
                    className="block w-full h-10 border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div className="w-2/6">
                  <label className="block text-sm font-medium text-gray-700">
                    Height <span className="text-red-600">*</span>
                  </label>
                  <Select
                    name="height"
                    value={
                      profileData?.height
                        ? {
                            value: profileData.height,
                            label: success?.Height?.find(
                              (h) => h.title === profileData.height
                            )
                              ? `${
                                  success.Height.find(
                                    (h) => h.title === profileData.height
                                  ).height_feet
                                }ft ${
                                  success.Height.find(
                                    (h) => h.title === profileData.height
                                  ).height_inches
                                }in - ${
                                  success.Height.find(
                                    (h) => h.title === profileData.height
                                  ).height_cm
                                }cm`
                              : profileData.height,
                          }
                        : null
                    }
                    required
                    options={success?.Height?.map((item) => ({
                      value: `${item?.height_feet}' ${item?.height_inches}" - ${item?.height_cm}cm`,
                      label: `${item.height_feet}ft ${item.height_inches}in - ${item.height_cm}cm`,
                    }))}
                    onChange={(option) =>
                      handleSelectChange("height", option.value)
                    }
                    className="w-full capitalize"
                  />
                </div>

                <div className="w-2/6">
                  <label className="block text-sm font-medium text-gray-700">
                    Body Type <span className="text-red-600">*</span>
                  </label>
                  <Select
                    name="body_type"
                    value={
                      profileData?.body_type
                        ? {
                            value: profileData.body_type,
                            label: profileData.body_type,
                          }
                        : null
                    }
                    options={success?.BodyType?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    className="w-full capitalize"
                    onChange={(option) =>
                      handleSelectChange("body_type", option.value)
                    }
                    required
                  />
                </div>
              </div>
              <div className="grid lg:grid-cols-3 gap-4 mt-4">
                <div className="w-full ">
                  <label className="block text-sm font-medium text-gray-700">
                    Country <span className="text-red-600">*</span>
                  </label>
                  <Input
                    name="country"
                    placeholder="Your Country"
                    value={profileData?.country || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full ">
                  <label className="block text-sm font-medium text-gray-700">
                    State <span className="text-red-600">*</span>
                  </label>
                  <Input
                    name="state"
                    placeholder="Your State"
                    value={profileData?.state || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium text-gray-700">
                    City <span className="text-red-600">*</span>
                  </label>
                  <Input
                    name="city"
                    placeholder="Your City"
                    value={profileData?.city || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <motion.button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Update Profile
        </motion.button>
      </div>
    </form>
  );
}

export default BasicInfo;
