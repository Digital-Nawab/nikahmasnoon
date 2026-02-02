import React, { useState, useEffect } from "react";
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
  FaRegThumbsUp,
} from "react-icons/fa";
import Layout from "../Layout";
import axios from "axios";
import { URL, URLIMAGE } from "../api";
import { Link, NavLink } from "react-router-dom";
import { sendInterest } from "../masterCode";

function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userGallery, setUserGallery] = useState();
  const [ispremium, setIspremium] = useState(
    sessionStorage.getItem("ispremium")
  );
  const [isUserPremium, setIsUserPremium] = useState(false);

  console.log(ispremium == 'false' , "ispremium");
  console.log(isUserPremium , "isUserPremium");

  useEffect(() => {
    setIspremium(sessionStorage.getItem("ispremium"));
    const fetchUserData = async () => {
      const userId = window.location.pathname.split("/").pop(); // Extracting the user ID from the URL
      try {
        const response = await axios.get(`${URL}/api/view-profile/${userId}`, {
          headers: {
            Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
          },
        });
        console.log(response, "response");
        setUserData(response?.data?.data);
        setIsUserPremium(response?.data?.has_active_subscription);
        setUserGallery(response?.data?.gallery);
      } catch (err) {
        console.error(err);
        setError("Error fetching user data");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);
  // console.log(userGallery, "userData");
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(userData);

  return (
    <Layout>
      <div className="container mx-auto p-4 mt-28">
        {/* Profile Header */}
        <div
          className="flex flex-col md:flex-row items-center p-6 rounded-t-lg shadow-md profile-header text-white text-center"
          style={{
            backgroundImage:
              "url('https://www.nikahmasnoon.com/assets/images/details.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="w-full md:w-2/12 mb-4 md:mb-0">
            <img
              src={
                userData?.image
                  ? `${URLIMAGE}/${userData.image}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile Image"
              className="w-36 opject-top object-cover h-36 rounded-full mx-auto border-4 border-gray-300"
            />
          </div>
          <div className="w-full md:w-8/12 mb-4 md:mb-0">
            <h2 className="text-xl md:text-2xl font-bold">
              {userData?.name
                ? `${userData.name} (${userData.age} Years)`
                : "Name not available"}
            </h2>
            <p className="text-md md:text-lg">
              {userData?.user_id
                ? `My ID - ${userData.user_id}`
                : "ID not available"}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center md:justify-end bg-gray-900 rounded-b-lg shadow-md border border-gray-300">
          <marquee direction="" className="text-white">
            View Content info Only Premium Member{" "}
          </marquee>
        </div>

        <div className="flex flex-col md:flex-row my-5">
          <div className="w-full md:w-1/4 bg-gray-200 shadow-lg rounded-lg p-6 mb-4 md:mb-0">
            <div className="flex flex-col items-center mb-4">
              <img
                src={
                  userData?.image
                    ? `${URLIMAGE}/${userData.image.replace(/\\/g, "/")}`
                    : "https://via.placeholder.com/150"
                }
                alt="Profile"
                className="rounded-full w-20 h-20 object-top object-cover mb-1"
              />
              <p className="text-sm mb-3 text-gray-800">{userData?.user_id}</p>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold text-green-800">
                  {userData?.name ? userData.name : "Name not available"}
                </h2>
                {isUserPremium && (
                  <span>
                    <svg
                      className="ms-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#298f06"
                      version="1.1"
                      viewBox="0 0 512 512"
                      xmlSpace="preserve"
                    >
                      <path d="M434.068 46.758L314.607 9.034a194.624 194.624 0 00-117.214 0L77.932 46.758C52.97 54.641 36 77.796 36 103.973v207.39a120 120 0 0048.816 96.607l117.032 86.234a91.29 91.29 0 00108.304 0l117.032-86.234A120 120 0 00476 311.363v-207.39c0-26.177-16.97-49.332-41.932-57.215zm-86.144 180.958l-98.995 98.995c-11.716 11.716-30.711 11.716-42.426 0l-42.427-42.426c-11.716-11.716-11.716-30.711 0-42.426 11.716-11.716 30.711-11.716 42.426 0l21.213 21.213 77.782-77.782c11.716-11.716 30.711-11.716 42.426 0 11.717 11.715 11.717 30.71.001 42.426z"></path>
                    </svg>
                  </span>
                )}
              </div>
              <p className="text-gray-800">
                {ispremium == 'false'  ? "xxxxxx@gmail.com" : userData?.email}
              </p>
            </div>
            <nav className="space-y-2">
              {sessionStorage.getItem("token") ? (
                <>
                  {[
                    {
                      icon: <FaPhoneAlt />,
                      text:
                        ispremium != "false" ? userData.mobile : "xxxxxxxxxxxx",
                    },
                    {
                      icon: <FaWhatsapp />,
                      text:
                        ispremium != "false"
                          ? userData.Whatsapp_no
                          : "xxxxxxxxxx",
                    },
                    {
                      icon: <FaMapMarkerAlt />,
                      text: userData?.city
                        ? userData.city
                        : "City not available",
                    },
                  ].map((item, index) => (
                    <p key={index} className="flex items-center text-sm">
                      <span className="bg-light-green-200 hover:bg-green-600 hover:text-white rounded-lg p-1.5 me-2">
                        {item.icon}
                      </span>
                      <span className="text-gray-600 capitalize">
                        {ispremium ? item?.text : "xxxxxxxxxx"}
                      </span>
                      <button className="bg-gray-300 hover:bg-green-600 hover:text-white ms-2">
                        <FaEye className="text-gray-700 hover:text-white" />
                      </button>
                    </p>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { icon: <FaPhoneAlt />, text: "+91 XXXXXXXXXX" },
                    { icon: <FaWhatsapp />, text: "+91 XXXXXXXXXX" },
                    { icon: <FaMapMarkerAlt />, text: "XXXXXXX" },
                  ].map((item, index) => (
                    <p key={index} className="flex items-center text-sm">
                      <span className="bg-light-green-200 hover:bg-green-600 hover:text-white rounded-lg p-1.5 me-2">
                        {item.icon}
                      </span>
                      <span className="text-gray-600">{item.text}</span>
                      <button className="bg-gray-300 hover:bg-green-600 hover:text-white ms-2">
                        <FaEye className="text-gray-700 hover:text-white" />
                      </button>
                    </p>
                  ))}
                </>
              )}

              <hr />
              <div className="bg-light-green-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-green-600">
                  Requirement:
                </h3>
                <p className="text-sm text-gray-700">
                  {userData?.Requirements
                    ? userData.Requirements
                    : "Requirements not available"}
                </p>
              </div>
              <div className="bg-cyan-100 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-green-600">
                  Package Details:
                </h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li>Basic Package: Access to profiles and messaging</li>
                  <li>
                    Premium Package: Enhanced visibility and priority messaging
                  </li>
                  <li>
                    Gold Package: All features plus personalized matchmaking
                    services
                  </li>
                </ul>
                <div className="flex justify-center mb-4">
                  <NavLink to="/my-package">
                    <button className="bg-green-600 text-white hover:bg-green-700 transition duration-300 px-6 py-2 mt-3 rounded-lg">
                      Subscribe Now
                    </button>
                  </NavLink>
                </div>
              </div>
              {/* <div className="bg-yellow-100 p-4 rounded-lg shadow-sm mb-4">
                <h3 className="text-lg font-semibold text-green-600">Subscription Details:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700">
                  <li className='font-semibold'>Premium Package</li>
                  <li>Start Date: January 1, 2023</li>
                  <li>Renewal Date: January 1, 2024</li>
                  <li>Status: Active</li>
                </ul>
              </div> */}
            </nav>
          </div>

          <div className="w-full md:w-3/4 bg-white shadow-lg rounded-lg p-6">
            <div className="grid gap-6">
              <div>
                <h3 className="text-xl font-semibold  text-green-600">
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <FaCreativeCommonsBy className="text-green-600  text-2xl bg-green-200 rounded-sm mb-1 p-1 mr-2" />
                      <span className="text-xl font-semibold text-green-600">
                        About Me!
                      </span>
                    </div>
                    <Link
                      onClick={() => sendInterest(userData.id)}
                      className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 rounded-md bg-light-green-700 text-white text-xs sm:text-sm py-1 px-2"
                    >
                      <FaRegThumbsUp className="inline mr-1" /> Interested
                    </Link>
                  </div>
                </h3>
                <hr className="border-green-100 border-b-2  mt-1 mb-3" />
                <p>
                  {userData?.about ? userData.about : "About not available"}
                </p>
              </div>
              {userGallery.length > 0 && (
                <>
                  <div>
                    <h3 className="text-xl font-semibold  text-green-600 flex items-center">
                      <FaImages className="text-green-600  text-2xl bg-green-200 rounded-sm mb-1 p-1 mr-2" />
                      Gallery
                    </h3>
                    <hr className="border-green-100 border-b-2  mt-1 mb-3" />
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                      {userGallery.length > 0
                        ? userGallery.map((image, index) => (
                            <img
                              key={index}
                              src={`https://admin.nikahmasnoon.com/${image?.image_path}`}
                              alt={`Gallery Image ${index + 1}`}
                              className="rounded-lg shadow-md"
                            />
                          ))
                        : "Gallery images not available"}
                    </div>
                  </div>
                </>
              )}

              <div>
                <h3 className="text-xl font-semibold  text-green-600  flex items-center">
                  <FaUser className="text-green-600  text-2xl bg-green-200 rounded-sm mb-1 p-1 mr-2" />
                  Personal Details
                </h3>
                <hr className="border-green-100 border-b-2  mt-1 mb-3" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                  {[
                    `Profile: ${
                      userData?.matrimony_for
                        ? userData.matrimony_for
                        : "Not available"
                    }`,
                    `Caste: ${
                      userData?.caste ? userData.caste : "Not available"
                    }`,
                    `Caste Prefer: ${
                      userData?.caste_preference
                        ? userData.caste_preference
                        : "Not available"
                    }`,
                    `Date Of Birth: ${
                      userData?.dob ? userData.dob : "Not available"
                    }`,
                    `Height: ${
                      userData?.height ? userData.height : "Not available"
                    }`,
                    `Body Type: ${
                      userData?.body_type ? userData.body_type : "Not available"
                    }`,
                    `Complexion: ${
                      userData?.complexion
                        ? userData.complexion
                        : "Not available"
                    }`,
                    `Maslaq: ${
                      userData?.sub_caste ? userData.sub_caste : "Not available"
                    }`,

                    `Marital Status: ${
                      userData?.marital_status
                        ? userData.marital_status
                        : "Not available"
                    }`,
                    `Hometown: ${
                      userData?.Native_Hometown
                        ? userData.Native_Hometown
                        : "Not available"
                    }`,
                    `Country: ${
                      userData?.country ? userData.country : "Not available"
                    }`,
                    `State: ${
                      userData?.state ? userData.state : "Not available"
                    }`,
                    `City: ${userData?.city ? userData.city : "Not available"}`,
                    `Preferred City: ${
                      userData?.Current_city
                        ? userData.Current_city
                        : "Not available"
                    }`,
                    `Language Spoken: ${
                      userData?.Language_spoken
                        ? userData.Language_spoken
                        : "Not available"
                    }`,
                    `Family Type: ${
                      userData?.family_type
                        ? userData.family_type
                        : "Not available"
                    }`,
                    `Any Disability: ${
                      userData?.any_disability
                        ? userData.any_disability
                        : "Not available"
                    }`,
                  ].map((detail, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row md:items-center"
                    >
                      <strong className="text-gray-800">
                        {detail.split(":")[0]}:
                      </strong>
                      <span className="md:ml-2">{detail.split(":")[1]}</span>
                    </div>
                  ))}
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-green-600  flex items-center">
                    <FaUsers className="text-green-600  text-2xl bg-green-200 rounded-sm mb-1 p-1 mr-2" />
                    Family Details
                  </h3>
                  <hr className="border-green-100 border-b-2  mt-1 mb-3" />
                  <div className="w-full flex flex-wrap">
                    {userData?.family_detail
                      ? userData.family_detail
                      : "Family details not available"}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-green-600 flex items-center">
                  <FaBriefcase className="text-green-600  text-2xl bg-green-200 rounded-sm mb-1 p-1 mr-2" />
                  Professional Details
                </h3>
                <hr className="border-green-100 border-b-2  mt-1 mb-3" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                  {[
                    `Qualification: ${
                      userData?.qualification
                        ? userData.qualification
                        : "Not available"
                    }`,
                    `Other Qualification: ${
                      userData?.other_qualification
                        ? userData.other_qualification
                        : "Not available"
                    }`,
                    `Employed In: ${
                      userData?.employed_in
                        ? userData.employed_in
                        : "Not available"
                    }`,
                    `Occupation: ${
                      userData?.occupation
                        ? userData.occupation
                        : "Not available"
                    }`,
                    `Annual Income: ${
                      userData?.annual_income
                        ? userData.annual_income
                        : "Not available"
                    }`,
                  ].map((detail, index) => (
                    <div key={index} className="">
                      <strong className="text-gray-800">
                        {detail.split(":")[0]}:{" "}
                      </strong>{" "}
                      {detail.split(":")[1]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserDetails;
