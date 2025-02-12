import { useState, useEffect } from "react";
import { Card, Input, Button, Radio, Typography } from "@material-tailwind/react";
import { URL, URLIMAGE } from '../api';
import axios from 'axios';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import Layout from '../Layout';
import { motion } from "framer-motion";
import { FaRegFileCode } from "react-icons/fa";

function Preference() {
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
            Authorization: '1|MohDsaLeEmDIgitTalNawab|NikahMasnoon',
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
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
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
          }
        });
        setProfileData(response?.data?.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        // toast.error('Error loading profile data');
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

  const handleUpdatePreferenceprofile = async (e) => {
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
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        }
      });

      if (response.data.success) {
        toast.success('Profile preference updated successfully');
        // Update profileData with changes
        setProfileData(prev => ({
          ...prev,
          ...formChanges
        }));
        // Reset changes
        setFormChanges({});
      } else {
        toast.error('Failed to update profile Preference');
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
    
    <form className="space-y-4" method="post" encType="multipart/form-data" onSubmit={handleUpdatePreferenceprofile}>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="grid grid-cols-2  gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">About Your Self</label>
                  <textarea 
                    name="about" 
                    value={formChanges.about || profileData?.about || ''} 
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">What Do You Look For In a Life Partner?</label>
                  <textarea 
                    name="Requirements" 
                    value={formChanges.Requirements || profileData?.Requirements || ''} 
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Your Family Details ?</label>
                  <textarea 
                    name="family_detail" 
                    value={formChanges.family_detail || profileData?.family_detail || ''} 
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32"
                  />
                </div>
              
                <div>
                  <label className="block text-sm font-medium text-gray-700">Native/Hometown</label>
                  <input 
                    name="Native_Hometown" 
                    value={formChanges.Native_Hometown || profileData?.Native_Hometown || ''} 
                    onChange={handleInputChange}
                    type="text" 
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2" 
                    placeholder="Native/Hometown" 
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">Preferred Cities</label>
                  <Select 
                    name="preferred_cities"
                    value={
                      formChanges.preferred_cities 
                        ? { value: formChanges.preferred_cities, label: formChanges.preferred_cities }
                        : profileData?.preferred_cities 
                          ? { value: profileData.preferred_cities, label: profileData.preferred_cities }
                          : null
                    }
                    options={success?.City?.map((item) => ({ value: item?.name, label: item?.name }))}
                    onChange={(option) => handleSelectChange("preferred_cities", option.value)}
                
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

export default Preference;