import React, { useEffect, useState } from 'react';
import { FaCreativeCommonsBy, FaBriefcase, FaPhoneAlt, FaMapMarkerAlt, FaUser, FaImages, FaUsers, FaEye, FaWhatsapp } from 'react-icons/fa';
import Layout from '../Layout';
import axios from 'axios';

function Myprofile() {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = sessionStorage.getItem('token');
                const response = await axios.get('https://nikahmasnoon.digitalnawab.com/api/my-profile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProfileData(response?.data?.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        fetchProfileData();
    }, []);

    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className=" mt-20">
                <div className="container mx-auto p-4">
                    {/* Profile Header */}
                    <div className="flex flex-col md:flex-row my-5 space-x-3 mt-10">
                        <div className="w-full md:w-3/4 bg-white">
                            <div className="grid gap-6">
                                
                                <div className='shadow-lg rounded-lg bg-gradient-to-r from-light-green-50 via-blue-50 to-green-50 p-4'>
                                    <h3 className="text-xl font-semibold text-green-600 flex items-center">
                                        <FaUser className="text-green-600 text-2xl bg-green-200 rounded-sm mb-1 p-1 mr-2" />
                                        Personal Details
                                    </h3>
                                    <hr className='border-green-100 border-b-2 mt-1 mb-3' />
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                        {[
                                            `Profile: ${profileData.matrimony_for}`,
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
                                        ].filter(detail => detail.split(": ")[1] && detail.split(": ")[1] !== 'null').map((detail, index) => (
                                            <div key={index} className="flex items-center">
                                                <strong className="text-gray-800">{detail.split(":")[0]}:</strong>
                                                <span className="md:ml-2">{detail.split(":")[1]}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {profileData.family_detail && profileData.family_detail !== 'null' && (
                                        <div className="flex flex-auto items-center">
                                            <strong className="text-gray-800">Requirements:</strong>
                                            <span className="md:ml-2">{profileData.Requirements}</span>
                                        </div>
                                    )}
                                    {profileData.family_detail && profileData.family_detail !== 'null' && (
                                        <div className="flex flex-auto items-center">
                                            <strong className="text-gray-800">Family Details:</strong>
                                            <span className="md:ml-2">{profileData.family_detail}</span>
                                        </div>
                                    )}
                                </div>
                                <div className='shadow-lg p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50'>
                                    <h3 className="text-xl font-semibold text-green-600 flex items-center">
                                        <FaBriefcase className="text-green-600 text-2xl bg-green-200 rounded-sm mb-1 p-1 mr-2" />
                                        Professional Details
                                    </h3>
                                    <hr className='border-green-100 border-b-2 mt-1 mb-3' />
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
                                        {[
                                            `Qualification: ${profileData.qualification}`,
                                            `Employed In: ${profileData.employed_in}`,
                                            `Occupation: ${profileData.occupation}`,
                                            `Annual Income: ${profileData.annual_income}`,
                                        ].filter(detail => detail.split(": ")[1] && detail.split(": ")[1] !== 'null').map((detail, index) => (
                                            <div key={index} className="">
                                                <strong className="text-gray-800">{detail.split(":")[0]}: </strong> {detail.split(":")[1]}
                                            </div>
                                        ))}
                                    </div> 
                                    {profileData.family_detail && profileData.family_detail !== 'null' && (
                                        <div className="flex flex-auto items-center">
                                            <strong className="text-gray-800">Other Qualification:</strong>
                                            <span className="md:ml-2">{profileData.other_qualification}</span>
                                        </div>
                                    )}
                                </div>
                                {profileData.gallery_image && profileData.gallery_image.trim() !== "0" && (
                                    <div className="bg-gradient-to-tr from-deep-orange-50 to-cyan-50 rounded-lg p-4">
                                        <h3 className="text-xl font-semibold text-green-600 flex items-center">
                                        <FaImages className="text-green-600 text-2xl bg-green-200 rounded-sm mb-1 p-1 mr-2" />
                                        Gallery
                                        </h3>
                                        <hr className="border-green-100 border-b-2 mt-1 mb-3" />
                                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                                        {profileData.gallery_image
                                            .split(",")
                                            .map((image) => image.trim())
                                            .filter((image) => image && image !== "null")
                                            .map((image, index) => (
                                            <img
                                                key={index}
                                                src={`https://nikahmasnoon.com/${image}`}
                                                alt={`Gallery Image ${index + 1}`}
                                                className="rounded-lg shadow-md"
                                            />
                                            ))}
                                        </div>
                                    </div>
                                    )}

                                
                            </div>
                        </div>

                        <div className="w-full md:w-1/4 bg-gray-200 shadow-lg rounded-lg p-6 mb-4 md:mb-0">
                            <div className="flex flex-col items-center mb-4">
                                <img
                                    src={`https://nikahmasnoon.digitalnawab.com/${profileData.image}`}
                                    alt="Profile"
                                    className="rounded-full w-30 h-16 object-cover mb-4"
                                />
                                <h2 className="text-xl font-semibold text-green-800">{profileData.name}</h2>
                                <p className="text-gray-800">{profileData.email}</p>
                            </div>
                            <nav className="space-y-2">
                                {[
                                    { icon: <FaPhoneAlt />, text: profileData.mobile },
                                    { icon: <FaWhatsapp />, text: profileData.Whatsapp_no },
                                    { icon: <FaMapMarkerAlt />, text: profileData.Correspondence_Address }
                                ].filter(item => item.text && item.text !== 'null').map((item, index) => (
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
                                <hr />
                                {profileData.about && profileData.about !== 'null' && (
                                    <div className="bg-light-green-100 p-4 rounded-lg mb-4">
                                        <h3 className="text-lg font-semibold text-green-600">About Me</h3>
                                        <p className="text-sm text-gray-700">
                                            {profileData.about}
                                        </p>
                                    </div>
                                )}
                                {profileData.family_detail && profileData.family_detail !== 'null' && (
                                    <div className="bg-yellow-100 p-4 rounded-lg shadow-sm mb-4">
                                        <h3 className="text-lg font-semibold text-green-600">Family Details:</h3>
                                        <p>
                                            {profileData.family_detail}
                                        </p>
                                    </div>
                                )}
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Myprofile;
