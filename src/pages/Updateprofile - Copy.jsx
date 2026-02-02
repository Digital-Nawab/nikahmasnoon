import { useState, useEffect } from "react";
import { Card, Input, Button, Radio, Typography } from "@material-tailwind/react";
import { URL, URLIMAGE } from '../api';
import axios from 'axios';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../Layout';
import { motion } from "framer-motion";

function Updateprofile() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Basic Info', 'Preferences', 'Professional', 'Gallery'];

  const [formData, setFormData] = useState(
    {
      "matrimony_for": "",
      "name": "",
      "user_id": "",
      "email": "",
      "mobile": "",
      "Whatsapp_no": "",
      "marital_status": "",
      "caste": "",
      "sub_caste": "",
      "caste_preference": "",
      "gender": "",
      "dob": "",
      "any_disability": "",
      "qualification": "",
      "employed_in": "",
      "occupation": "",
      "annual_income": "",
      "min_salary": "",
      "max_salary": "",
      "height": "",
      "height_cm": "",
      "family_type": "",
      "about": "",
      "body_type": "",
      "complexion": "",
      "Language_spoken": "",
      "Native_Hometown": "",
      "Requirements": "",
      "family_detail": "",
      "Correspondence_Address": "",
      "Current_city": "",
      "password": "",
      "country": "",
      "state": "",
      "city": "",
    }

  )


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setProfileData({ ...profileData, [name]: value });
  };
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchSuccess = async () => {
      try {
        const response = await axios.get(`${URL}/api/register`, {
          headers: {
            Authorization: '1|MohDsaLeEmDIgitTalNawab|NikahMasnoon'
          }
        });
        setSuccess(response?.data?.data);
        console.log(success);
      } catch (err) {
        console.error(err);
        setError('Error fetching Success');
      } finally {
        setLoading(false);
      }
    };
    fetchSuccess();
  }, []);

  const datat = {
    matrimony_for: null,         // "Profile For"
    name: "",                   // "Your Name"
    marital_status: null,       // "Marital Status"
    mobile: "",                 // "Phone Number"
    Whatsapp_no: "",            // "Whatsapp Number"
    caste: null,                // "Caste"
    sub_caste: null,            // "Maslaq"
    caste_preference: null,     // "Caste Preference"
    email: "",                  // "Email"
    gender: null,               // "Gender"
    dob: "",                    // "Date Of Birth"
    height: null,               // "Height"
    body_type: null,            // "Body Type"
    about: "",                  // "About Your Self"
    Requirements: "",           // "What Do You Look For In a Life Partner?"
    family_detail: "",          // "Your Family Details"
    Native_Hometown: "",        // "Native/Hometown"
    preferred_cities: null,             // For "Body Type" select dropdown
    family_type: null,         // "Family Type"
    language_spoken: null,     // "Mother Tongue"
    any_disability: null,      // "Any Disability"
    qualification: null,       // "Highest Qualification"
    family_detail: "",         // "Your Family Details"
    employed_in: null,         // "Employed In"
    occupation: null,          // "Occupation"
    annual_income: null,
  }

  const [profileData, setProfileData] = useState({
    "id": null,
    "matrimony_for": null,
    "name": null,
    "user_id": null,
    "gender": null,
    "caste_preference": null,
    "dob": null,
    "age": null,
    "caste": null,
    "mobile": null,
    "email": null,
    "about": null,
    "image": null,
    "sub_caste": null,
    "marital_status": null,
    "country": null,
    "state": null,
    "city": null,
    "height": null,
    "height_cm": null,
    "family_type": null,
    "any_disability": null,
    "qualification": null,
    "employed_in": null,
    "occupation": null,
    "annual_income": null,
    "min_salary": null,
    "max_salary": null,
    "is_adhar_varified": null,
    "membership_type": null,
    "matching_code": null,
    "Correspondence_Address": null,
    "gallery_image": null,
    "body_type": null,
    "complexion": null,
    "Language_spoken": null,
    "Native_Hometown": null,
    "Whatsapp_no": null,
    "Requirements": null,
    "family_detail": null,
    "other_qualification": null,
    "Current_city": null,
    "is_approved": null,
    "is_candidate_varified": null,
    "is_active": null,
    "end_date": null,
    "package_id": null,
    "paid": null,
    "is_delete": null,
    "is_marriage": null,
    "date_time": null,
    "Id_proof_name": null,
    "Id_proof_number": null,
    "Id_proof_image": null,
    "address_proof_name": null,
    "address_proof_number": null,
    "address_proof_image": null,
    "created_at": null,
    "updated_at": null,
    "gallery": []
  }
  );

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const response = await axios.get('https://admin.nikahmasnoon.com/api/my-profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response?.data?.data)
        setProfileData(response?.data?.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);


  const handleUpdateprofile = async (e) => {
    console.log(profileData)
    e.preventDefault();
    try {
      const response = await axios.post('https://admin.nikahmasnoon.com/api/update-profile', profileData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      console.log(response);
    } catch (error) {
      toast.error('Error submitting the form. Please try again.', {
        duration: 3000, // Optional: specify the duration
      });
    }
  };

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setStates([]); // Reset states
    setSelectedState(null); // Reset selected state
    setCities([]); // Reset cities
    setSelectedCity(null); // Reset selected city

    axios
      .get(`https://admin.nikahmasnoon.com/api/states?country_id=${selectedOption.value}`) // Replace with your endpoint
      .then((response) => {
        setStates(
          response.data.map((item) => ({
            value: item.id,
            label: item.name,
          }))
        );
      })
      .catch((error) => console.error("Error fetching states:", error));
  };

  // Fetch Cities when State changes
  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setCities([]); // Reset cities
    setSelectedCity(null); // Reset selected city

    axios
      .get(`https://admin.nikahmasnoon.com/api/cities?state_id=${selectedOption.value}`) // Replace with your endpoint
      .then((response) => {
        setCities(
          response.data.map((item) => ({
            value: item.id,
            label: item.name,
          }))
        );
      })
      .catch((error) => console.error("Error fetching cities:", error));
  };



  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const [files, setFiles] = useState([]);
  const [singleImage, setSingleImage] = useState(null);

  // Handle multi-file upload
  const handleMultiUpload = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  // Handle single image upload
  const handleSingleUpload = (e) => {
    const file = e.target.files[0];
    setSingleImage(file);
  };

  // Remove file from list
  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Layout>
      <div className="container mx-auto p-4 shadow-lg  rounded-lg bg-gradient-to-r from-light-green-50 via-blue-50 to-green-50 mt-36 mb-14 ">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <div className="tabs mb-4">
          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 m-1 rounded-md ${activeTab === index ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => handleTabChange(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
        <form className="space-y-4" method="post" encType="multipart/form-data" onSubmit={handleUpdateprofile}>
          {activeTab === 0 && (
            <div className="grid grid-cols-10 gap-3">
              <div className="col-span-4 flex justify-center items-center">
                <img src="assets/wedding.webp" alt="" />
              </div>

              <div className="col-span-6">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                  <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
                    <div className="w-full md:w-2/6 mb-4 md:mb-0">
                      <label className="block text-sm font-medium text-gray-700">Profile For  <span className="text-red-600">*</span></label>
                      <Select
                        placeholder="Profile For"
                        name="matrimony_for"
                        required
                        options={success?.ProfleFor?.map((item) => ({
                          value: item?.title,
                          label: item?.title,
                        }))}
                        onChange={(option) => handleSelectChange("matrimony_for", option.value)}
                        value={
                          success?.ProfleFor?.find((item) => item?.title === profileData?.matrimony_for)
                            ? {
                              value: profileData?.matrimony_for,
                              label: profileData?.matrimony_for,
                            }
                            : null
                        }
                      />
                    </div>
                    <div className="w-full md:w-2/4">
                      <label className="block text-sm font-medium text-gray-700">Your Name <span className="text-red-600">*</span></label>
                      <Input name="name" placeholder="Your Name" Value={profileData?.name} onChange={handleInputChange} required />
                    </div>
                    <div className="w-full md:w-2/6 mb-4 md:mb-0">
                      <label className="block text-sm font-medium text-gray-700">Marital Status <span className="text-red-600">*</span></label>
                      <Select
                        name="marital_status"
                        value={
                          success?.MaritalStatus?.find(
                            (item) => item?.title === profileData?.marital_status
                          )
                            ? {
                              value: profileData?.marital_status,
                              label: profileData?.marital_status,
                            }
                            : null
                        }
                        options={success?.MaritalStatus?.map((item) => ({
                          value: item?.title,
                          label: item?.title,
                        }))}
                        required
                        onChange={(option) => handleSelectChange("marital_status", option.value)}
                      />
                    </div>

                  </div>

                  <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-600">*</span> </label>
                      <Input name="mobile" maxLength="13" minLength={10} value={profileData?.mobile} required placeholder="1234567890" onChange={handleInputChange} />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium text-gray-700">Whatsapp Number <span className="text-red-600">*</span> </label>
                      <Input name="Whatsapp_no" maxLength="13" minLength={10} value={profileData?.Whatsapp_no} required placeholder="1234567890" onChange={handleInputChange} />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
                    <div className="w-full md:w-2/6 mb-4 md:mb-0">
                      <label className="block text-sm font-medium text-gray-700">Caste  <span className="text-red-600">*</span></label>
                      <Select
                        name="caste"
                        value={
                          success?.Caste?.find((item) => item?.title.toLowerCase() === profileData?.caste.toLowerCase())
                            ? { value: profileData?.caste, label: profileData?.caste }
                            : null
                        }
                        options={success?.Caste?.map((item) => ({
                          value: item?.title,
                          label: item?.title,
                        }))}
                        onChange={(option) => handleSelectChange("caste", option.value)}
                        className="w-full capitalize"
                        required
                      />

                    </div>
                    <div className="w-full md:w-2/6">
                      <label className="block text-sm font-medium text-gray-700">Maslaq<span className="text-red-600">*</span></label>
                      <Select
                        name="sub_caste"
                        value={
                          success?.Maslaq?.find((item) => item?.title.toLowerCase() === profileData?.sub_caste.toLowerCase())
                            ? { value: profileData?.sub_caste, label: profileData?.sub_caste }
                            : null
                        }
                        options={success?.Maslaq?.map((item) => ({
                          value: item?.title,
                          label: item?.title,
                        }))}
                        className="w-full capitalize"
                        onChange={(option) => handleSelectChange("sub_caste", option.value)}
                        required
                      />

                    </div>
                    <div className="w-full md:w-2/6 mb-4 md:mb-0">
                      <label className="block text-sm font-medium text-gray-700">Caste Preference<span className="text-red-600">*</span></label>
                      <Select
                        name="caste_preference"
                        value={
                          [
                            { value: "any-caste", label: "Any Caste" },
                            { value: "same-caste", label: "Same Caste" },
                            { value: "general-caste", label: "General Caste" },
                          ].find((item) => item.value === profileData?.caste_preference) || null
                        }
                        options={[
                          { value: "any-caste", label: "Any Caste" },
                          { value: "same-caste", label: "Same Caste" },
                          { value: "general-caste", label: "General Caste" },
                        ]}
                        className="w-full capitalize"
                        required
                        onChange={(option) => handleSelectChange("caste_preference", option.value)}
                      />

                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="w-full  md:w-4/7">
                      <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-600">*</span> </label>
                      <Input onChange={handleInputChange} name="email" placeholder="name@mail.com" value={profileData?.email} required />
                    </div>
                    <div className="w-full mt-4">
                      <div className="flex items-center  mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gender <span className="text-red-600">*</span> </label>
                        <div className="flex gap-10">
                          <Radio onChange={() => handleInputChange("gender", "Male")} name="gender" label="Male" color="blue" />
                          <Radio onChange={() => handleInputChange("gender", "Female")} name="gender" label="Female" color="pink" />
                        </div>
                      </div>
                    </div>
                    <div className='flex ites-center space-x-3' >
                      <div className='w-2/6'>
                        <label className="block text-sm font-medium text-gray-700">Date Of Birth <span className="text-red-600">*</span> </label>
                        <input name="dob" type="date" value={profileData?.dob} required onChange={handleInputChange} className=" block w-full h-10 border  border-gray-300 rounded-md p-2" />
                      </div>

                      <div className='w-2/6'>
                        <label className="block text-sm font-medium text-gray-700">Height <span className="text-red-600">*</span> </label>

                        <Select
                          name="height"
                          value={
                            success?.Height?.find((item) => item?.title === profileData?.height)
                              ? {
                                value: profileData?.height,
                                label: success?.Height?.find((item) => item?.title === profileData?.height)?.height_feet +
                                  `ft ` +
                                  success?.Height?.find((item) => item?.title === profileData?.height)?.height_inches +
                                  `in - ` +
                                  success?.Height?.find((item) => item?.title === profileData?.height)?.height_cm +
                                  `cm`,
                              }
                              : null
                          }
                          required
                          options={success?.Height?.map((item) => ({
                            value: item?.title,
                            label: `${item?.height_feet}ft ${item?.height_inches}in - ${item?.height_cm}cm`,
                          }))}
                          onChange={(option) => handleSelectChange("height", option.value)}
                          className="w-full capitalize"
                        />

                      </div>
                      <div className='w-2/6'>
                        <label className="block text-sm font-medium text-gray-700">Body Type <span className="text-red-600">* </span> </label>
                        <Select
                          name="body_type"
                          value={
                            success?.BodyType?.find((item) => item?.title === profileData?.body_type)
                              ? { value: profileData?.body_type, label: profileData?.body_type }
                              : null
                          }
                          options={success?.BodyType?.map((item) => ({
                            value: item?.title,
                            label: item?.title,
                          }))}
                          className="w-full capitalize"
                          onChange={(option) => handleSelectChange("body_type", option.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-1  gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">About Your Self</label>
                  <textarea name="about" value={profileData?.about} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">What Do You Look For In a Life Partner?</label>
                  <textarea name="Requirements" value={profileData?.Requirements} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Famliy Details ?</label>
                  <textarea name="family_detail" value={profileData?.family_detail} className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                </div>
              </div>
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Country</label>
                              <Select
                                name="country"
                                
                                options={success?.Countrie?.map((item) => ({ value: item?.name, label: item?.name }))}
                                onChange={handleCountryChange}
                                className="w-full capitalize"
                              />
                            </div>

                          
                            <div>
                              <label className="block text-sm font-medium text-gray-700">State</label>
                              <Select
                                name="state"
                                value={selectedState}
                                options={states}
                                onChange={handleStateChange}
                                className="w-full capitalize"
                                isDisabled={!selectedCountry} // Disable until country is selected
                              />
                            </div>

                           
                            <div>
                              <label className="block text-sm font-medium text-gray-700">City</label>
                              <Select
                                name="city"
                                value={selectedCity}
                                options={cities}
                                onChange={(option) => setSelectedCity(option)}
                                className="w-full capitalize"
                                isDisabled={!selectedState} // Disable until state is selected
                              />
                            </div>
                          </div> */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Native/Hometown</label>
                  <input name="Native_Hometown" value={profileData?.Native_Hometown} type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Native/Hometown" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Cities</label>
                  <Select name="preferred_cities" value={profileData?.Native_Hometown} options={success?.City?.map((item) => ({ value: item?.name, label: item?.name }))} isRequired required />
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Family Type</label>
                  <Select
                    name="family_type"
                    value={
                      success?.FamilyType?.find((item) => item?.title === profileData?.family_type)
                        ? { value: profileData?.family_type, label: profileData?.family_type }
                        : null
                    }
                    options={success?.FamilyType?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(option) => handleSelectChange("family_type", option.value)}
                    className="w-full capitalize"
                    required
                  />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mother tongue</label>
                  <Select
                    name="language_spoken"
                    value={
                      success?.Language?.find((item) => item?.title === profileData?.language_spoken)
                        ? { value: profileData?.language_spoken, label: profileData?.language_spoken }
                        : null
                    }
                    options={success?.Language?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(option) => handleSelectChange("language_spoken", option.value)}
                    className="w-full capitalize"
                    required
                  />

                </div>

                <div className="">
                  <label className="block text-sm font-medium text-gray-700">Any Disability</label>
                  <Select
                    name="any_disability"
                    value={
                      profileData?.any_disability
                        ? {
                          value: profileData?.any_disability,
                          label: profileData?.any_disability === 'yes' ? 'Yes' : 'No',
                        }
                        : null
                    }
                    options={[
                      { value: 'no', label: 'No' },
                      { value: 'yes', label: 'Yes' },
                    ]}
                    onChange={(option) => handleSelectChange("any_disability", option.value)}
                    className="w-full capitalize"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                  <Select
                    name="qualification"
                    value={
                      profileData?.qualification
                        ? { value: profileData?.qualification, label: profileData?.qualification }
                        : null
                    }
                    options={success?.Qualification?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(option) => handleSelectChange("qualification", option.value)}
                    className="w-full capitalize"
                    required
                  />
                </div>

              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Famliy Details ?</label>
                  <textarea name="family_detail" className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employed In</label>
                  <Select
                    name="employed_in"
                    value={
                      success?.Employeed?.find((item) => item?.title === profileData?.employed_in)
                        ? { value: profileData?.employed_in, label: profileData?.employed_in }
                        : null
                    }
                    options={success?.Employeed?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(option) => handleSelectChange("employed_in", option.value)}
                    className="w-full capitalize"
                    required
                  />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Occupation</label>
                  <Select
                    name="occupation"
                    value={
                      success?.Occupation?.find((item) => item?.title === profileData?.occupation)
                        ? { value: profileData?.occupation, label: profileData?.occupation }
                        : null
                    }
                    options={success?.Occupation?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(option) => handleSelectChange("occupation", option.value)}
                    className="w-full capitalize"
                    required
                  />

                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Annual Income</label>
                  <Select name="annual_income" options={success?.Occupation?.map((item) => ({ value: item?.title, label: item?.title }))} />
                </div>
              </div>

            </div>
          )}

          {activeTab === 3 && (
            <div className="grid grid-cols-10 gap-4 p-4">
              
              {/* Single Image Uploader - 40% width */}
              <div className="col-span-12 border p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Upload Single Image</h3>
                <input type="file" accept="image/*" onChange={handleSingleUpload} />
                {singleImage && (
                  <div className="mt-2">
                    <img src={URL.createObjectURL(singleImage)} alt="preview" className="w-full h-40 object-cover rounded-lg" />
                  </div>
                )}
              </div>
              {/* Multi-image & video uploader - 80% width */}
              <div className="col-span-12 border p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">Gallery Images</h3>
               
                <div className="grid grid-cols-6 gap-4">
                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`preview ${index}`}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  ) : (
                    // Dummy images when no files uploaded
                    <>
                      <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Image 1</span>
                      </div>
                      <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Image 2</span>
                      </div>
                      <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Image 3</span>
                      </div>
                      <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Image 4</span>
                      </div>
                      <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Image 5</span>
                      </div>
                      <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Image 6</span>
                      </div>
                      <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Image 7</span>
                      </div>
                      
                      <div className="bg-gray-200 w-full h-40 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Image 6</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
        
            
            </div>
          )}
          <motion.button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>Update Profile</motion.button>
        </form>
      </div>
    </Layout>
  );
}

export default Updateprofile;
