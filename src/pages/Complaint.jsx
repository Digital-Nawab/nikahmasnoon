import React, { useState, useEffect } from 'react';
import Layout from '../Layout';
import { Toaster, toast } from "react-hot-toast";
import { Input, Textarea, Button } from "@material-tailwind/react";
import axios from 'axios';

const Complaint = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });
    const [errors, setErrors] = useState({});
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData((prevData) => ({
                ...prevData,
                image: files[0],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};
        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        }
        if (!formData.description.trim()) {
            errors.description = 'Message is required';
        }
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            setTimeout(() => setErrors({}), 3000);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('user_id', formData.user_id);
        formDataToSend.append('title', formData.title);
        formDataToSend.append('description', formData.description);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }

        try {
            const response = await axios.post('https://nikahmasnoon.digitalnawab.com/api/complaint', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },
            });
            if (response.data.success) {
                toast.success(response.data.message);
                setFormData({
                    user_id: '',
                    title: '',
                    description: '',
                    image: null,
                });
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error submitting form');
        }
    };

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const response = await axios.get('https://nikahmasnoon.digitalnawab.com/api/my-complaint', {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                setComplaints(response?.data?.data);
                
            } catch (err) {
                setError('Error fetching complaints');
            } finally {
                setLoading(false);
            }
        };

        fetchComplaints();
    }, []);

    return (
        <Layout>
            <div className="flex items-center bg-gradient-to-t from-white via-blue-50 to-green-50 p-4 mt-24">
                <div className="container mx-auto p-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-4xl mb-3 font-bold text-center text-gray-800">
                        Complaint <span className="text-green-600">Register!</span>
                    </h1>
                    <p className="text-gray-700 mb-16 max-w-3xl m-auto text-center">
                        Please provide detailed information about your complaint below.
                        This will help us address your issue more effectively and promptly.
                        Make sure to upload any relevant screenshots and describe the issue clearly.
                    </p>
                    <div className='flex items-center space-x-3'>
                        <div className='w-full lg:w-3/6'>
                            <img src="assets/complaint.webp" alt="complaint" />
                        </div>
                        <div className='w-full lg:w-3/6 shadow bg-white rounded-xl p-4'>
                            <Toaster position="top-center" />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <Input
                                        size="lg"
                                        name="title"
                                        label="Title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        error={!!errors.title}
                                    />
                                    {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                                </div>
                                <div className='mt-3'>
                                    <Input
                                        type="file"
                                        size="lg"
                                        name="image"
                                        label="Upload Screenshot"
                                        accept="image/*"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <Textarea
                                        size="lg"
                                        name="description"
                                        label="Describe Issue"
                                        rows={6}
                                        value={formData.description}
                                        onChange={handleChange}
                                        error={!!errors.description}
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                                </div>
                                <div className='mt-3'>
                                    <Button type="submit" className="w-full" size="lg" color="green">
                                        Submit Complaint
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 via-gray-50 to-green-50 py-8">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gray-800 text-center mb-4">
                        <span className="text-green-600">View All My Registered</span> Complaints
                    </h2>
                    <p className="text-gray-700 text-center mt-2 mb-6">Here you can view all the complaints you have registered.</p>
                    {loading ? (
                        <div className="text-center">Loading complaints...</div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 bg-white">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Registered</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Describe Issue </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {complaints.map((complaint) => (
                                        <tr key={complaint.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{complaint.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{new Date(complaint.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{complaint.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">{complaint.complaint_status ? complaint.complaint_status : 'Under Reviewing'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Complaint;
