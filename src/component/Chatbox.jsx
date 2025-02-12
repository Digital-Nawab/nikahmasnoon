import React from 'react';
import { Card, CardBody, Typography, Input, Button } from "@material-tailwind/react";
import { FaUserCircle } from 'react-icons/fa';
import {URL, URLIMAGE} from '../api';

function Chatbox() {
    return (
        <div className="min-h-screen  flex justify-center items-center bg-gradient-to-r from-white to-gray-50">
            <div className="flex gap-8">
                {/* Left Side: Chat List */}
                <div className="w-full bg-gradient-to-tr from-green-50 to-green-100  rounded-2xl shadow-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                            {/* User Profile Image */}
                            <img
                                src="https://via.placeholder.com/40"
                                alt="Profile"
                                className="w-10 h-10 rounded-full"
                            />
                            <h1 className="text-lg font-bold">Hello, Johan</h1>
                        </div>
                    </div>
                    {/* Chat Tabs */}
                    <hr className='flex items-center border-spacing-2 border-green-200 border-b-2 mb-4' />
                    {/* Chat List Items */}
                    <div className="space-y-2">
                        {/* Chat Item */}
                        <div className="flex items-center bg-green-50 rounded-md py-1 px-2  justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h2 className="font-semibold text-light-green-700">Larry Machigo</h2>
                                    <p className="text-sm text-gray-400">Ok, Let me check</p>
                                </div>
                            </div>
                            <span className="text-sm text-green-500">09:38 AM</span>
                        </div>
                        <div className="flex items-center bg-green-50 rounded-md p-1 justify-between">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="https://via.placeholder.com/40"
                                    alt="User"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h2 className="font-semibold text-light-green-700">Larry Machigo</h2>
                                    <p className="text-sm text-gray-400">Ok, Let me check</p>
                                </div>
                            </div>
                            <span className="text-sm text-green-500">09:38 AM</span>
                        </div>

                        {/* Repeat the above block for each chat item */}

                    </div>

                </div>
                {/* Right Side: Chat Details */}
                <div className="w-full bg-green-200 rounded-2xl shadow-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="w-10 h-10 rounded-full"
                            />
                            <div>
                                <h2 className="font-semibold">Larry Machigo</h2>
                                <p className="text-sm text-green-900">Online</p>
                            </div>

                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 bg-green-500 rounded-full">
                                {/* Call Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6.62 10.79a15.05 15.05 0 006.7 6.7l2.09-2.09a1.992 1.992 0 012.41-.44l3.79 1.89a2 2 0 01.59 3.03l-1.36 1.36a4.992 4.992 0 01-4.32 1.3 19.939 19.939 0 01-8.38-3.73 19.939 19.939 0 01-3.73-8.38 4.992 4.992 0 011.3-4.32l1.36-1.36a2 2 0 013.03.59l1.89 3.79c.34.68.1 1.52-.44 2.41l-2.09 2.09z"
                                    />
                                </svg>
                            </button>
                            <button className="p-2 bg-green-500 rounded-full">
                                {/* Video Icon */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 10l4.35 4.35c.95.95.14 2.61-1.06 2.61H5.71C4.3 17 3 15.7 3 14.29V9.71C3 8.3 4.3 7 5.71 7H18a1.5 1.5 0 011.06 2.56L15 10z"
                                    />
                                </svg>
                            </button>
                        </div>


                    </div>
                    <hr className='rborder-spacing-2 border-green-300 border-b-2 mb-4' />
                    {/* Chat Messages */}
                    <div className="space-y-4 mb-6">
                        {/* Received Message */}
                        <div className="flex items-start">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div className="bg-green-500 p-3 rounded-lg">
                                <p className="text-sm">Hey 👋</p>
                                <p className="text-sm">Are you available for a New UI Project</p>
                            </div>
                        </div>
                        {/* Sent Message */}
                        <div className="flex items-start justify-end">
                            <div className="bg-green-700 p-3 rounded-lg mr-3">
                                <p className="text-sm">Hello!</p>
                                <p className="text-sm">Yes, have some space for the new task</p>
                            </div>
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                        {/* Received Message */}
                        <div className="flex items-start">
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div className="bg-green-500 p-3 rounded-lg">
                                <p className="text-sm">Cool, should I share the details now?</p>
                            </div>
                        </div>
                        {/* Sent Message */}
                        <div className="flex items-start justify-end">
                            <div className="bg-green-700 p-3 rounded-lg mr-3">
                                <p className="text-sm">Yes Sure, please</p>
                            </div>
                            <img
                                src="https://via.placeholder.com/40"
                                alt="User"
                                className="w-10 h-10 rounded-full"
                            />
                        </div>
                    </div>
                    {/* File Attachment */}
                    <div className="bg-green-500 p-3 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v16c0 1.105.895 2 2 2h12c1.105 0 2-.895 2-2V8a1 1 0 00-.293-.707l-4-4A1 1 0 0015 3H6c-1.105 0-2 .895-2 2z"
                                />
                            </svg>
                            <div>
                                <p className="text-sm">UI Brief.docx</p>
                                <p className="text-xs text-green-300">269.18 KB</p>
                            </div>
                        </div>
                        <button className="p-2 bg-green-700 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v8m-4-4h8"
                                />
                            </svg>
                        </button>
                    </div>
                    {/* Message Input */}
                    <div className="mt-6 flex items-center space-x-4">
                        <input
                            type="text"
                            className="w-full bg-green-500 p-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                            placeholder="Type a message..."
                        />
                        <button className="p-3 bg-green-700 rounded-full">
                            {/* Send Icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16V8l10 4-10 4z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Chatbox;
