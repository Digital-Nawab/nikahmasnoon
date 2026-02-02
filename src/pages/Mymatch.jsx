import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { FaBriefcase, FaUserGraduate, FaRegThumbsUp, FaFireAlt, FaMosque } from "react-icons/fa";
import { Typography, Button, IconButton } from "@material-tailwind/react";
import Layout from "../Layout";
import axios from "axios";
import { URL, URLIMAGE } from "../api";
import { Toaster, toast } from "react-hot-toast";
import { sendInterest } from "../masterCode";

const LoadingSkeleton = () => (
  <div className="grid md:grid-cols-3 gap-6">
    {[...Array(9)].map((_, index) => (
      <div
        key={index}
        className="flex w-full bg-white shadow-lg rounded-lg overflow-hidden animate-pulse"
      >
        <div className="relative w-2/5">
          <div className="w-full h-[170px] bg-gray-300" />
        </div>
        <div className="w-3/5 text-left p-3">
          <div className="mb-1 h-4 bg-gray-300 w-3/4"></div>
          <div className="font-semibold capitalize text-xs sm:text-sm mb-2 h-4 bg-gray-300 w-1/2"></div>
          <div className="text-xs capitalize font-semibold sm:text-sm mb-2 h-4 bg-gray-300 w-2/3"></div>
          <div className="font-semibold capitalize text-xs sm:text-sm mb-3 h-4 bg-gray-300 w-1/3"></div>
          <div className="flex items-center mt-3 space-x-3">
            <div className="h-8 w-24 bg-green-300 rounded-md"></div>
            <div className="h-8 w-20 bg-light-green-300 rounded-md"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const ErrorMessage = ({ error }) => (
  <div className="text-center text-red-500">{error}</div>
);

const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

function Mymatch() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchMatches = useCallback(async (page) => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(`${URL}/api/my-match?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      setMatches(response.data.data.data);
      setTotalPages(response.data.data.last_page);
      setError(null);
    } catch (err) {
      setError("Error fetching matches");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches(page);
  }, [page, fetchMatches]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to the top on page change
    }
  };

  return (
    <Layout>
      <Toaster position="top-center" />
      <div className="bg-cover bg-gradient-to-tr hover:bg-gradient-to-l from-yellow-50 via-indigo-50 to-amber-50 mt-10">
        <div className="container mx-auto p-4">
          <div className="text-center w-full">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800">
              <span className="text-green-700">My Match</span> Partner here!
            </h1>
            <div className="py-10">
              {error && <ErrorMessage error={error} />}
              <div className="grid md:grid-cols-3 gap-6">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className="flex border border-green-100 w-full bg-gradient-to-r from-green-50 to-red-50 shadow-lg transition delay-150 duration-300 ease-in-out hover:shadow-2xl hover:border-green-500 rounded-lg overflow-hidden"
                  >
                    <div className="relative w-2/5">
                      <img
                        src={`${URLIMAGE}/${match.image}`}
                        alt="Profile"
                        className="w-full h-[160px] object-top object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                    <div className="w-3/5 text-left p-3">
                      <Typography variant="h6" color="blue-gray" className="mb-1 capitalize flex items-center">
                        <span className="flex truncate items-center capitalize">
                          {match.name.toUpperCase()}
                        </span>
                        {match?.has_subscription && (
                            <span>
                              <svg
                                className="ms-1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="#298f06"
                                version="1.1"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                              >
                                <path d="M434.068 46.758L314.607 9.034a194.624 194.624 0 00-117.214 0L77.932 46.758C52.97 54.641 36 77.796 36 103.973v207.39a120 120 0 0048.816 96.607l117.032 86.234a91.29 91.29 0 00108.304 0l117.032-86.234A120 120 0 00476 311.363v-207.39c0-26.177-16.97-49.332-41.932-57.215zm-86.144 180.958l-98.995 98.995c-11.716 11.716-30.711 11.716-42.426 0l-42.427-42.426c-11.716-11.716-11.716-30.711 0-42.426 11.716-11.716 30.711-11.716 42.426 0l21.213 21.213 77.782-77.782c11.716-11.716 30.711-11.716 42.426 0 11.717 11.715 11.717 30.71.001 42.426z"></path>
                              </svg>
                            </span>
                          )}
                      </Typography>
                      <Typography color="gray" className="font-semibold text-xs sm:text-sm">
                        <FaFireAlt className="inline text-green-400 mr-1" /> {calculateAge(match.dob)}y |{" "}
                        <strong>{match.marital_status}</strong>|{" "}
                        <strong>{match.city}</strong>
                      </Typography>
                      <Typography color="gray" className="text-xs font-semibold sm:text-sm">
                        <FaBriefcase className="inline text-green-400 mr-1" /> {match.occupation}
                      </Typography>
                      <Typography color="gray" className="font-semibold text-xs sm:text-sm">
                        <FaMosque className="inline text-green-400 mr-1" /> {match.caste}, {match.sub_caste}
                      </Typography>
                      <div className="flex items-center mt-3">
                        <Link
                          to={`/user-details/${btoa(match.id)}`}
                          className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 rounded-md bg-green-700 text-white text-xs sm:text-sm me-3 py-1 px-2"
                        >
                          <FaUserGraduate className="inline mr-1" />
                          <span className="hidden md:block">View&nbsp;</span> Profile
                        </Link>
                        <button
                          onClick={() => sendInterest(match.id)}
                          className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 rounded-md bg-light-green-700 text-white text-xs sm:text-sm py-1 px-2"
                        >
                          <FaRegThumbsUp className="inline mr-1" /> Interested
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {loading && <LoadingSkeleton />}
              <div className="flex justify-center mt-6">
                <Button
                  variant="outlined"
                  color="blue-gray"
                  className="mx-1"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;

                  if (
                    pageNumber <= 4 || // Show the first 4 pages
                    pageNumber > totalPages - 2 || // Show the last 2 pages
                    (pageNumber >= page - 1 && pageNumber <= page + 1) // Show pages around the current page
                  ) {
                    return (
                      <IconButton
                        key={index}
                        onClick={() => handlePageChange(pageNumber)}
                        color={page === pageNumber ? "blue" : "blue-gray"}
                        className="mx-1"
                      >
                        {pageNumber}
                      </IconButton>
                    );
                  }

                  // Show ellipsis for skipped pages
                  if (pageNumber === 5 || pageNumber === totalPages - 2) {
                    return (
                      <span key={index} className="mx-1 text-gray-500">
                        ...
                      </span>
                    );
                  }

                  return null; // Do not render for pages outside the range
                })}
                <Button
                  variant="outlined"
                  color="blue-gray"
                  className="mx-1"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Mymatch;
