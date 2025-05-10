import React, { useEffect, useState } from "react";
import {
  FaCreativeCommonsBy,
  FaBriefcase,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaImages,
  FaUsers,
  FaEye,
  FaWhatsapp,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Layout from "../Layout";
import axios from "axios";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import toast, { Toaster } from "react-hot-toast";

function Myprofile() {
  const [profileData, setProfileData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const isUserPremium = ({ data }) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const endDate = new Date(data?.payment_subscriptions[0]?.end_date);
      const currentDate = new Date();
      if (currentDate <= endDate) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          "https://nikahmasnoon.digitalnawab.com/api/my-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response?.data?.data);
        const ispremium = isUserPremium({ data: response?.data?.data });
        sessionStorage.setItem("ispremium", ispremium);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Failed to load profile data.");
      }
    };

    fetchProfileData();
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const deleteAccount = async () => {
    setIsDeleting(true);
    try {
      const token = sessionStorage.getItem("token");
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://nikahmasnoon.digitalnawab.com/api/delete-account",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: "",
      };

      const response = await axios.request(config);
      if (response.data.status) {
        toast.success("Account deleted successfully!");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("ispremium");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("An error occurred while deleting the account.");
    } finally {
      setIsDeleting(false);
      setOpenDialog(false);
    }
  };

  if (!profileData) {
    return (
      <Layout>
        <div className="mt-20">
          <div className="container mx-auto p-4">
            <Typography variant="h6" color="blue-gray">
              Loading...
            </Typography>
          </div>
        </div>
      </Layout>
    );
  }

  console.log(profileData);

  return (
    <Layout>
      <Toaster position="top-right" />
      <div className="mt-20">
        <div className="container mx-auto p-4">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row my-5 space-x-3 mt-10">
            <div className="w-full md:w-3/4 bg-white">
              <div className="grid gap-6">
                <div className="shadow-lg rounded-lg bg-gradient-to-r from-green-50 via-blue-50 to-green-50 p-4">
                  <div className="flex justify-between items-center">
                    <Typography
                      variant="h3"
                      color="green"
                      className="flex items-center"
                    >
                      <FaUser className="text-green-600 text-2xl bg-green-200 rounded-sm p-1 mr-2" />
                      Personal Details
                    </Typography>
                    <NavLink to="/update-profile">
                      <Button color="green" size="sm">
                        Update Profile
                      </Button>
                    </NavLink>
                  </div>
                  <hr className="border-green-100 border-b-2 mt-1 mb-3" />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {[
                      `UserId: ${profileData.user_id}`,
                      `Profile For: ${profileData.matrimony_for}`,
                      `Caste: ${profileData.caste}`,
                      `Caste Prefer: ${profileData.caste_preference}`,
                      `Date Of Birth: ${profileData.dob}`,
                      `Height: ${profileData.height}`,
                      `Body Type: ${profileData.body_type}`,
                      `Complexion: ${profileData.complexion}`,
                      `Maslaq: ${profileData.sub_caste}`,
                      `Marital Status: ${profileData.marital_status}`,
                      `Native/Hometown: ${profileData.Native_Hometown}`,
                      `Country: ${profileData.country}`,
                      `State: ${profileData.state}`,
                      `City: ${profileData.city}`,
                      `Preferred City: ${profileData.Current_city}`,
                      `Language Spoken: ${profileData.Language_spoken}`,
                      `Family Type: ${profileData.family_type}`,
                      `Any Disability: ${profileData.any_disability}`,
                    ]
                      .filter(
                        (detail) =>
                          detail.split(": ")[1] &&
                          detail.split(": ")[1] !== "null"
                      )
                      .map((detail, index) => (
                        <div key={index} className="flex items-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {detail.split(":")[0]}:
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="ml-2"
                          >
                            {detail.split(":")[1]}
                          </Typography>
                        </div>
                      ))}
                  </div>
                  {profileData.family_detail &&
                    profileData.family_detail !== "null" && (
                      <div className="flex flex-auto items-center mt-2">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          Requirements:
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="ml-2"
                        >
                          {profileData.Requirements}
                        </Typography>
                      </div>
                    )}
                  {profileData.family_detail &&
                    profileData.family_detail !== "null" && (
                      <div className="flex flex-auto items-center mt-2">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          Family Details:
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="ml-2"
                        >
                          {profileData.family_detail}
                        </Typography>
                      </div>
                    )}
                </div>
                <div className="shadow-lg p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                  <Typography
                    variant="h3"
                    color="green"
                    className="flex items-center"
                  >
                    <FaBriefcase className="text-green-600 text-2xl bg-green-200 rounded-sm p-1 mr-2" />
                    Professional Details
                  </Typography>
                  <hr className="border-green-100 border-b-2 mt-1 mb-3" />
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                    {[
                      `Qualification: ${profileData.qualification}`,
                      `Employed In: ${profileData.employed_in}`,
                      `Occupation: ${profileData.occupation}`,
                      `Annual Income: ${profileData.annual_income}`,
                    ]
                      .filter(
                        (detail) =>
                          detail.split(": ")[1] &&
                          detail.split(": ")[1] !== "null"
                      )
                      .map((detail, index) => (
                        <div key={index} className="flex items-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {detail.split(":")[0]}:
                          </Typography>
                          <Typography
                            variant="small"
                            color="gray"
                            className="ml-2"
                          >
                            {detail.split(":")[1]}
                          </Typography>
                        </div>
                      ))}
                  </div>
                  {profileData.other_qualification &&
                    profileData.other_qualification !== "null" && (
                      <div className="flex flex-auto items-center">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold"
                        >
                          Other Qualification:
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="ml-2"
                        >
                          {profileData.other_qualification}
                        </Typography>
                      </div>
                    )}
                </div>
                {profileData?.gallery &&
                  profileData?.gallery?.length !== "0" && (
                    <div className="bg-gradient-to-tr from-orange-50 to-cyan-50 rounded-lg p-4">
                      <Typography
                        variant="h3"
                        color="green"
                        className="flex items-center"
                      >
                        <FaImages className="text-green-600 text-2xl bg-green-200 rounded-sm p-1 mr-2" />
                        Gallery
                      </Typography>
                      <hr className="border-green-100 border-b-2 mt-1 mb-3" />
                      <div className="">
                        <LightGallery
                          speed={500}
                          elementClassNames="grid grid-cols-2 md:grid-cols-6 gap-4"
                          plugins={[lgThumbnail, lgZoom]}
                        >
                          {profileData.gallery?.map((image, index) => {
                            const imageUrl = `https://nikahmasnoon.digitalnawab.com/${image?.image_path}`;
                            return (
                              <a key={index} href={imageUrl}>
                                <img
                                  src={imageUrl}
                                  alt={`Gallery Image ${index + 1}`}
                                  className="rounded-lg shadow-md h-[200px] w-full object-cover"
                                />
                              </a>
                            );
                          })}
                        </LightGallery>
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <div className="w-full md:w-1/4 bg-gray-100 shadow-lg rounded-lg p-6 mb-4 md:mb-0">
              <div className="flex flex-col items-center mb-4">
                <img
                  src={`https://nikahmasnoon.digitalnawab.com/${profileData.image}`}
                  alt="Profile"
                  className="rounded-full w-24 h-24 object-cover mb-4"
                />
                <Typography variant="h4" color="green">
                  {profileData.name}
                </Typography>
                <Typography variant="small" color="gray">
                  {profileData.user_id}
                </Typography>
              </div>
              <nav className="space-y-2">
                {[
                  { icon: <FaPhoneAlt />, text: profileData.mobile },
                  { icon: <FaWhatsapp />, text: profileData.Whatsapp_no },
                  { icon: <IoMdMail />, text: profileData.email },
                  {
                    icon: <FaMapMarkerAlt />,
                    text: profileData.Correspondence_Address,
                  },
                ]
                  .filter((item) => item.text && item.text !== "null")
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center">
                        <span className="bg-green-200 hover:bg-green-600 hover:text-white rounded-lg p-1.5 mr-2">
                          {item.icon}
                        </span>
                        <Typography variant="small" color="gray">
                          {item.text}
                        </Typography>
                      </div>
                      <Button
                        size="sm"
                        variant="text"
                        className="p-1"
                        color="gray"
                      >
                        <FaEye />
                      </Button>
                    </div>
                  ))}
                <hr className="my-4" />
                {profileData.about && profileData.about !== "null" && (
                  <div className="bg-green-50 p-4 rounded-lg mb-4">
                    <Typography variant="h5" color="green" className="mb-2">
                      About Me
                    </Typography>
                    <Typography variant="small" color="gray">
                      {profileData.about}
                    </Typography>
                  </div>
                )}
                {profileData.family_detail &&
                  profileData.family_detail !== "null" && (
                    <div className="bg-yellow-50 p-4 rounded-lg shadow-sm mb-4">
                      <Typography variant="h5" color="green" className="mb-2">
                        Family Details
                      </Typography>
                      <Typography variant="small" color="gray">
                        {profileData.family_detail}
                      </Typography>
                    </div>
                  )}
              </nav>
              <div className="flex justify-center w-full mt-4">
                <Button
                  color="red"
                  onClick={handleOpenDialog}
                  disabled={isDeleting}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} handler={handleCloseDialog}>
        <DialogHeader>Confirm Account Deletion</DialogHeader>
        <DialogBody>
          <Typography color="blue-gray">
            Are you sure you want to delete your account? This action cannot be
            undone, and all your data will be permanently removed.
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={handleCloseDialog}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={deleteAccount}
            disabled={isDeleting}
            className="flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <Spinner className="h-4 w-4" /> Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </Layout>
  );
}

export default Myprofile;
