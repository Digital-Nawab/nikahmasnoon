import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaFireAlt, FaMosque } from 'react-icons/fa';
import { Card, CardBody, Typography, Button, Avatar, Tabs, TabsHeader, TabsBody, Tab, TabPanel } from '@material-tailwind/react';
import Layout from '../Layout';
import axios from 'axios';
import { URL, URLIMAGE } from '../api';
import { Toaster, toast  } from 'react-hot-toast';


function Myintrest() {
  const [interests, setInterests] = useState({
    new: [],
    send: [],
    accept: [],
    reject: [],
    block: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const response = await axios.get(`${URL}/api/my-interest`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
        console.log(response);
        if (response?.data?.data) {
          setInterests(response.data.data);
        } else {
          setError('No interests found.');
        }
      } catch (err) {
        setError('Error fetching interests.');
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, []);

  const InterestStatus = async (matchId, status) => {
    try {
        // Validate input
        if (!matchId || status === undefined) {
            toast.error('Match ID and status are required to update interest status');
            return;
        }

        const token = sessionStorage.getItem('token');

        // Check if token is available
        if (!token) {
            toast.error('You are not authorized. Please log in again.');
            return;
        }

        const response = await axios.post(
            `${URL}/api/update-intrest-status`,
            { matchId, status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        // Show success message
        toast.success(response.data.message || 'Interest status updated successfully');
    } catch (err) {
        // Extract and display the server error message or fallback to a default message
        const errorMessage = err.response?.data?.message || 'Error updating interest status';
        toast.error(errorMessage);

        // Log detailed error for debugging
        console.error('Error updating interest status:', err);
    }
};

  const renderCards = (data) => {
    return data.map((interest, index) => (
      <Card
        key={index}
        className="w-full shadow-lg flex flex-col sm:flex-row items-center p-2 border-2 border-green-100 rounded-lg bg-white hover:bg-gradient-to-t from-green-50 to-green-200 transition-all duration-300 ease-in-out"
      >
        <Avatar
          src={`${URLIMAGE}/${interest.interested_from_user?.image}`}
          alt="user avatar"
          size="xl"
          className="mb-4 sm:mb-0 sm:mr-4"
        />
        <CardBody className="flex-1 p-2">
          <Typography variant="h6" color="blue-gray" className="mb-2">
            {interest.interested_from_user?.name}
          </Typography>
          <Typography color="gray" className="font-semibold text-xs sm:text-sm">
            <FaFireAlt className="inline text-green-400 mr-1" />{' '}
            {interest.interested_from_user?.dob?.split('-')[0]}y |{' '}
            <strong>{interest.interested_from_user?.marital_status}</strong>
          </Typography>
          <Typography color="gray" className="text-xs font-semibold sm:text-sm">
            <FaBriefcase className="inline text-green-400 mr-1" /> {interest.interested_from_user?.occupation}
          </Typography>
          <Typography color="gray" className="font-semibold text-xs sm:text-sm">
            <FaMosque className="inline text-green-400 mr-1" /> {interest.interested_from_user?.caste}, {interest.interested_from_user?.sub_caste}
          </Typography>
        </CardBody>
        <div className="flex flex-col items-end mt-4 me-4 sm:mt-0">
          {interest.is_active === '0' && (
            <>
              <Button
                size="sm"
                color="green"
                onClick={() => InterestStatus(interest.id, 1)}
                className="hover:bg-green-700 w-[80px]"
              >
                Accept
              </Button>
              <br />
              <Button
                size="sm"
                color="red"
                onClick={() => InterestStatus(interest.id, 2)}
                className="hover:bg-red-700 mt-2 w-[80px]"
              >
                Deny
              </Button>
            </>
          )}
          {interest.is_active === '1' && (
            <>
              {/* <a
                href={`https://api.whatsapp.com/send?phone=${interest.interested_to_user?.phone}&text=Hi ${interest.interested_to_user?.name}, ${interest.interested_from_user?.name} is interested in you.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                Chat Now
              </a> */}
              <Button
                size="sm"
                color="red"
                onClick={() => InterestStatus(interest.id, 3)}
                className="hover:bg-red-700"
              >
                Block Now
              </Button>
            </>
          )}
        </div>
      </Card>
    ));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Layout>
      <Toaster position="top-center" />
      <div className="bg-cover bg-gradient-to-tr from-yellow-50 via-indigo-50 to-amber-50 mt-10">
        <div className="container mx-auto p-4">
          <div className="text-center w-full mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Interested <span className="text-green-600">Request!</span>
            </h1>
          </div>
          <Tabs value="new" orientation="vertical" className="flex gap-4">
            <TabsHeader className="w-40 bg-green-200">
              {Object.keys(interests).map((tab) => (
                <Tab key={tab} className="active:bg-green-700" value={tab}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody className="shadow-xl rounded-lg bg-white p-4">
              {Object.keys(interests).map((tab) => (
                <TabPanel key={tab} value={tab}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    {renderCards(interests[tab])}
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}

export default Myintrest;
