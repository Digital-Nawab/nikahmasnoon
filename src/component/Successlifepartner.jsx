import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck, FaMosque } from 'react-icons/fa';
import { URL, URLIMAGE } from '../api';
import { Link } from "react-router-dom";

import {Button,} from "@material-tailwind/react";
function Successlifepartner() {
    const [success, setSuccess] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSuccess = async () => {
            try {
                const response = await axios.get(`${URL}/api/success-partner/8`, {
                    headers: {
                        Authorization: '1|MohDsaLeEmDIgitTalNawab|NikahMasnoon'
                    }
                });
                setSuccess(response.data.data);
            } catch (err) {
                console.error(err);
                setError('Error fetching Success');
            } finally {
                setLoading(false);
            }
        };
        fetchSuccess();
    }, []);

    if (loading) {
        return (
            <div>
                <section className="flex bg-white-200 justify-center px-5 py-14">
                    <div className="container">
                        <div className="text-center w-full">
                            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800">Our Success <span className="text-green-700">Life Partner</span> Match</h1>
                            <p className="text-xl sm:text-2xl font-medium text-green-600 mt-1">Best Wishes </p>

                            <div className="py-10">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={index} className="product-card w-full rounded-md shadow-xl overflow-hidden z-[50] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group animate-pulse">
                                            <div className="absolute -left-[40%] top-0">
                                                <div className="flex gap-1">
                                                    <div className="bg-gray-300 w-[200px] h-[200px] rounded-full" />
                                                </div>
                                            </div>
                                            <div className="absolute rounded-full bg-gray-300 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 transition-all duration-300" />
                                            <div className="para uppercase text-center leading-none z-40">
                                                <div className="bg-gray-300 w-[50px] h-[15px] mb-2" />
                                                <div className="bg-gray-300 w-[100px] h-[20px]" />
                                            </div>
                                            <div className="img bg-gray-100 z-40 rounded-md">
                                                <div className="bg-gray-300 w-[250px] h-[250px]" />
                                            </div>
                                            <div className="btm-_container z-40 flex flex-col items-start gap-1">
                                                <div className="inline-flex gap-3 items-center justify-center">
                                                    <div className="p-1 bg-gray-300 rounded-full h-6 w-6"></div>
                                                    <div className="bg-gray-300 w-[80px] h-[12px]" />
                                                </div>
                                                <div className="inline-flex gap-3 items-center justify-center">
                                                    <div className="p-1 bg-gray-300 rounded-full h-6 w-6"></div>
                                                    <div className="bg-gray-300 w-[100px] h-[12px]" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div>
            <section className="flex bg-white-200 justify-center px-5 py-14">
                <div className="container">
                    <div className="text-center w-full">
                        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800">Our Success <span className="text-green-700">Life Partner</span> Match</h1>
                        <p className="text-xl sm:text-2xl font-medium text-green-600 mt-1">Best Wishes </p>

                        <div className="py-10">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {success.map((success_partner, index) => (
                                    <div key={index} className="product-card w-full rounded-md shadow-xl overflow-hidden z-[50] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
                                        <div className="absolute -left-[40%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150">
                                            <div className="flex gap-1">
                                                <svg strokeLinejoin="round" strokeLinecap="round" strokeWidth={1} fill="none" viewBox="0 0 24 24" className="fill-light-green-200 rotate-[24deg]" height={200} width={200} xmlns="http://www.w3.org/2000/svg">
                                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="absolute rounded-full bg-light-green-300 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[58%] transition-all duration-300" />
                                        <div className="para uppercase text-center leading-none z-40">
                                            <p className="text-black font-semibold text-xs font-serif">Best</p>
                                            <p className="font-bold text-xl tracking-wider text-gray-500">Wishes</p>
                                        </div>
                                        <div className="img bg-gray-100 z-40 rounded-md">
                                            <img className='w-100 h-44 object-top object-cover' src={`${URLIMAGE}/${success_partner.image}`} alt={success_partner.name} />
                                        </div>
                                        <div className="btm-_container z-40 flex flex-col items-start gap-1">
                                            <div className="inline-flex gap-3 items-center justify-center">
                                                <div className="p-1 bg-white flex items-center justify-center rounded-full">
                                                    <FaCheck className="inline text-green-400 mr-1" />
                                                </div>
                                                <p className="font-semibold text-xs capitalize text-gray-800">{success_partner.name}</p>
                                            </div>
                                            <div className="inline-flex gap-3 items-center justify-center">
                                                <div className="p-1 bg-white flex items-center justify-center rounded-full">
                                                    <FaMosque className="inline text-green-400 mr-1" />
                                                </div>
                                                <p className="font-semibold capitalize text-xs text-gray-800">{success_partner.caste}, {success_partner.sub_caste}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                
                            </div>
                            <div className="text-center mt-12">
                                
                                <Link to="/all-success-partner" className="bg-green-600 text-white hover:bg-green-700 p-3 font-medium rounded">
                                  See More Success Life Partner
                              </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Successlifepartner;
