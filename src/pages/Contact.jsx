import React, { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";
import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";
import Layout from '../Layout';
import axios from 'axios';

// Background Image URL
const backgroundImageUrl = "assets/green.webp";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'top center',
  backgroundRepeat: 'no-repeat',
};

const Contact = () => {
  // State to hold form data and errors
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form inputs
  const validate = () => {
    const validationErrors = {};
    if (!formData.first_name.trim()) validationErrors.first_name = 'First Name is required';
    if (!formData.last_name.trim()) validationErrors.last_name = 'Last Name is required';
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'Email is invalid';
    }
    if (!formData.mobile.trim()) validationErrors.mobile = 'Phone Number is required';
    if (!formData.message.trim()) validationErrors.message = 'Message is required';
    
    return validationErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validate();
    setErrors(validationErrors);

    // If there are no validation errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/contact', formData);
        
        if (response.data.success) {
          toast.success(response.data.message);
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            mobile: '',
            message: '',
          });
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        // Improved error handling with more detail
        const errorMessage = error.response?.data?.message || 'Error submitting form';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <Layout>
        <div className="w-full flex items-center justify-center min-h-screen" style={backgroundStyle}>
          <div className="container mx-auto px-4 py-16">
            <Card className="max-w-6xl mx-auto p-8 bg-white shadow-lg">
              <Typography variant="h2" color="blue-gray" className="mb-6 text-center">
                Contact Us
              </Typography>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div>
                        <Input
                          size="lg"
                          name="first_name"
                          label="First Name"
                          value={formData.first_name}
                          onChange={handleChange}
                          error={errors.first_name}
                        />
                        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                      </div>
                      <div>
                        <Input
                          size="lg"
                          name="last_name"
                          label="Last Name"
                          value={formData.last_name}
                          onChange={handleChange}
                          error={errors.last_name}
                        />
                        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                      </div>
                    </div>
                    <div>
                      <Input
                        size="lg"
                        name="email"
                        label="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div>
                      <Input
                        size="lg"
                        name="mobile"
                        label="Phone Number"
                        type="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        error={errors.mobile}
                      />
                      {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile}</p>}
                    </div>
                    <div>
                      <Textarea
                        size="lg"
                        name="message"
                        label="Your Message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        error={errors.message}
                      />
                      {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                    </div>
                    <Button type="submit" className="w-full" size="lg" color="green">
                      Send Message
                    </Button>
                  </form>
                </div>
                <div className="md:w-1/2">
                  <div className="h-96 w-full relative overflow-hidden rounded-lg shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57670.33551447476!2d81.8095643!3d25.4358011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399acad00000000%3A0x5d01e9bdb98c94b5!2sPrayagraj%2C%20Uttar%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1686665555555!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    ></iframe>
                    <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-6 transform transition-transform duration-300 hover:translate-y-0 translate-y-1/2">
                      <Typography variant="h5" color="blue-gray" className="mb-4 flex items-center">
                        <i className="fas fa-mosque text-green-500 mr-2 animate-pulse"></i>
                        Our Office
                      </Typography>
                      <div className="space-y-2">
                        <Typography color="gray" className="text-sm flex items-center">
                          <i className="fas fa-map-marker-alt text-red-500 mr-2 animate-bounce"></i>
                          Lucknow, Uttar Pradesh, India
                        </Typography>
                        <Typography color="gray" className="text-sm flex items-center">
                          <i className="fas fa-envelope text-blue-500 mr-2 animate-spin"></i>
                          info@nikahmasnoon.com
                        </Typography>
                        
                        <Typography color="gray" className="text-sm flex items-center">
                          <i className="fas fa-phone text-green-500 mr-2 animate-tada"></i>
                          +91 9511 135 090
                        </Typography>
                        <Typography color="gray" className="text-sm flex items-center">
                          <i className="fas fa-phone text-green-500 mr-2 animate-tada"></i>
                          +91 9555 805 090
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
      <Toaster position="top-center" />
    </>
  );
};

export default Contact;
