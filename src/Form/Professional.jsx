import { useState, useEffect } from "react";
import { Card, Input, Button, Radio, Typography } from "@material-tailwind/react";
import { URL, URLIMAGE } from '../api';
import axios from 'axios';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../Layout';
import { motion } from "framer-motion";
import { FaRegFileCode } from "react-icons/fa";

function Professional() {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({});
  const [formChanges, setFormChanges] = useState({});
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchSuccess = async () => {
      try {
        const response = await axios.get(`${URL}/api/register`, {
          headers: {
            Authorization: '1|MohDsaLeEmDIgitTalNawab|NikahMasnoon'
          }
        });
        setSuccess(response?.data?.data);
      } catch (err) {
        console.error(err);
        setError('Error fetching Success');
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
            Authorization: `Bearer ${token}`
          }
        });
        setProfileData(response?.data?.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Error loading profile data');
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormChanges(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormChanges(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfessionalprofile = async (e) => {
    e.preventDefault();

    // Only send changed fields
    if (Object.keys(formChanges).length === 0) {
      toast.info('No changes to update');
      return;
    }

    try {
      const response = await axios.post(`${URL}/api/update-profile`, formChanges, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success('Profile updated successfully');
        // Update profileData with changes
        setProfileData(prev => ({
          ...prev,
          ...formChanges
        }));
        // Reset changes
        setFormChanges({});
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Error updating profile. Please try again.', {
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
    <form className="space-y-4" method="post" encType="multipart/form-data" onSubmit={handleUpdateProfessionalprofile}>
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