import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import Subscription from '../component/subscription';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import axios from 'axios';
import { URL, URLIMAGE } from '../api';
import { Toaster, toast } from 'react-hot-toast';




function Packages() {
  useEffect(() => {
    // Create the script element
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js"; // Replace with your CDN URL
    script.async = true; // Load the script asynchronously
    // Append the script to the document head
    document.head.appendChild(script);
    // Cleanup function to remove the script on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const [open, setOpen] = useState(false);
  const [packages, setPackages] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const [subscription, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const colors = ["red", "green", "blue", "yellow", "purple", "teal"]; // Add your color palette here
  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axios.get(`${URL}/api/my-packages`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        if (response?.data?.data) {
          setSubscriptions(response.data.data);
          // Console.log(response)
        } else {
          setError('No subscription found');
        }
      } catch (err) {
        setError('Error fetching subscription');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`${URL}/api/packages`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        });
        setPackages(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, []);

  const [order_response, setOrder_id] = useState()

  const handleOpen = () => setOpen(!open);

  const handleChoosePlan = async (packageId) => {

    try {
      const response = await axios.post(
        `${URL}/api/subscribe`,
        { packageId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
          }
        }
      );
      if (sessionStorage.getItem('temp_order')) {
        sessionStorage.removeItem('temp_order');
      }
      sessionStorage.setItem('temp_order', response?.data.orderID);


      if (response.data.status) {
        const options = {
          key: 'rzp_test_r85ZJSNHdz2s4Z', // Replace with your Razorpay Key
          amount: response.data.amount * 100, // Amount in paise
          currency: 'INR',
          name: 'Nikah Masnoon',
          description: 'Package Subscription',
          image: `${URLIMAGE}/logo.png`, // Logo image URL

          handler: async (paymentResponse) => {
            // console.log('Payment successful:', paymentResponse);

            // Prepare the verification payload including order_id
            const verificationPayload = {
              paymentId: paymentResponse.razorpay_payment_id,
              orderId: sessionStorage.getItem('temp_order'), // Sending order_id in update-payment
            };
            // console.log('Verification payload:', verificationPayload);
            // Send the payment details to the backend for verification and subscription update
            const verifyResponse = await axios.post(`${URL}/api/update-payment`, verificationPayload, {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`,
              },
            });

            if (verifyResponse.data.status) {
              toast.success('Payment Successful and Subscription Updated', {
                duration: 3000, // Optional: specify the duration
              });
              alert('Payment Successful and Subscription Updated');
            } else {
              toast.error('Payment Verified, but Subscription Update Failed: ' + verifyResponse.data.message, {
                duration: 3000, // Optional: specify the duration
              });
              
            }

          },
          prefill: {
            name: userData.name,
            email: userData.email,
            contact: userData.mobile,

          },
          theme: {
            color: '#3399cc',
          },
          // Auto-capture enabled after successful payment authorization
          payment_capture: 1, // Automatically capture the payment
        };

        // Create Razorpay instance
        const razorpay = new Razorpay(options);
        razorpay.on('payment.failed', (paymentError) => {
          console.error('Payment failed:', paymentError.error);
          alert('Payment failed. Please try again.');
        });
        razorpay.open();
      } else {
        console.error('Failed to initiate subscription:', response.data.message);
        alert('Unable to initiate subscription. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing to package:', error);
      alert('An error occurred while processing your subscription.');
    }
  };

  return (
    <Layout>
      <Toaster position="top-center" />
      <div className='bg-gradient-to-tr from-yellow-50 to-light-blue-50 p-12 mt-20'>
        <h1 className="mb-2 text-3xl text-center sm:text-4xl lg:text-4xl font-bold text-gray-800">
          Package <span className="text-green-600">Details!</span>
        </h1>
        <p className='text-gray-700 mb-16 text-center'>
          Subscribe to one of our exclusive packages to enjoy a range of benefits and features tailored to your needs.
        </p>
        <div className='flex flex-col lg:flex-row justify-center lg:space-x-8 space-y-6 lg:space-y-0 items-center'>
          {packages.map((packageItem, index) => {

            const color = colors[index % colors.length];

            return (
              <div className={`rounded-2xl shadow-lg p-3 bg-${color}-100 border-4 text-gray-600 max-w-xs w-full lg:w-1/3`}
              >
                <div
                  className={`relative flex flex-col items-center p-5 pt-10 bg-${color}-50 rounded-xl`}
                >
                  <span
                    className={`mt-[-12px] absolute top-0 right-0 flex items-center bg-${color}-100 rounded-l-full py-2 px-3 text-xl font-semibold text-${color}-900`}
                  >
                    ${packageItem.package_price}{" "}
                    <small className={`text-xs ml-1 text-${color}-800`}>/ Yearly</small>
                  </span>
                  <p
                    className={`text-xl font-semibold mt-4 text-${color}-800 bg-${color}-100 px-2 py-1 rounded-lg`}
                  >
                    {packageItem.package_title} Package
                  </p>
                  <p className="text-center mt-3">{packageItem.description}</p>
                  <ul className="flex flex-col space-y-3 mt-4">
                    <li className="flex items-center space-x-2">
                      <span className={`flex items-center justify-center  w-6 h-6 bg-${color}-500 text-white rounded-full`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          className="mx-auto"
                        >
                          <path
                            fill="currentColor"
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-800">
                        <strong className="font-semibold text-gray-800">
                          {packageItem.limit_condidate}
                        </strong>{" "}
                        View Profile
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className={`flex items-center justify-center w-6 h-6 bg-${color}-500 text-white rounded-full`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill="currentColor"
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-9h2v5h-2zm0-5h2v2h-2z"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-800">
                        <strong className="font-semibold text-gray-800">
                          {packageItem.validity_days}
                        </strong>{" "}
                        /days Validity
                      </span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className={`flex items-center justify-center font-bold w-6 h-6 bg-${color}-500 text-white rounded-full`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          width="14"
                          height="14"
                        >
                          <path fill="none" d="M0 0h24v24H0z" />
                          <path
                            fill="currentColor"
                            d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                          />
                        </svg>
                      </span>
                      <span className="text-gray-800">
                        <strong className="font-semibold text-gray-800">24x7 </strong>
                        WhatsApp assistance
                      </span>
                    </li>
                  </ul>
                  <div className="w-full flex justify-center mt-6">
                    <Button
                      onClick={() => handleChoosePlan(packageItem.id)}
                      variant="gradient"
                      color={color}
                    >
                      Choose plan
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}

        </div>



      </div>
      <div className="bg-gradient-to-r from-blue-50 via-gray-50 to-green-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 text-center mb-2">
            <span className="text-green-600">View All My Subscribe Package </span> Complaints
          </h2>
          <p className="text-gray-700 text-center mt-2 mb-6">Here you can view all the subscriptions you have registered.</p>

          {loading ? (
            <div className="text-center">Loading Subscribe...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : subscription.length === 0 ? (
            <div className="text-center text-gray-500">No Subscribe found.</div>
          ) : (
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                
                {(subscription && subscription.length > 0) ? (
                    subscription.map((subscribe, index) => {
                      // Ensure the required data exists before proceeding
                      if (!subscribe || !subscribe.end_date || !subscribe.start_date || !subscribe.order_id || !subscribe.from_packages) {
                        return null; // Skip this iteration if data is missing
                      }

                      const daysRemaining = Math.floor((new Date(subscribe.end_date) - new Date()) / (1000 * 60 * 60 * 24));

                      return (
                        <tr key={subscribe.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {subscribe.start_date} to {subscribe.end_date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <strong>#{subscribe.order_id} </strong>-{subscribe.from_packages.package_title}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscribe.price}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscribe.payment_type}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">
                            <span className={`p-2 ${daysRemaining < 0 ? 'bg-gray-500' : 'bg-green-500'} text-white font-bold rounded-sm`}>
                              {daysRemaining < 0 ? 'Expired' : `${daysRemaining} days remaining`}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{subscribe.end_date}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <div className="text-center text-gray-500">No subscriptions found.</div>
                  )}

                
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Packages;
