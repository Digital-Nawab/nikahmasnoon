import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  FaUser,
  FaBriefcase,
  FaUserGraduate,
  FaRegThumbsUp,
} from "react-icons/fa";
import axios from "axios";
import { URL, URLIMAGE } from "../api";
import { sendInterest } from "../masterCode";
import Layout from "../Layout";

function Allpartner() {
  const [finder, setFinder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const calculateAge = useCallback((dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }, []);

  useEffect(() => {
    const fetchFinder = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${URL}/api/partner?page=${currentPage}`,
          {
            headers: {
              Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
            },
          }
        );
        console.log(response);
        setFinder(response?.data?.data.data);
        setTotalPages(response?.data?.meta?.last_page);
      } catch (err) {
        console.error("Error fetching Find partners:", err);
        setError("Error fetching Find partners. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFinder();
  }, [currentPage]);

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-green-50 to-blue-50">
        <section className="flex justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center w-full mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800">
                Thousands of Muslims have found their{" "}
                <span className="text-green-600">life partner here!</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-green-600 mt-1">
                What are you interested in?
              </p>
            </div>
            <div className="text-center">
              <div className="grid md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <Card
                    key={index}
                    className="border-green-100 w-full bg-white shadow transition delay-150 duration-300 ease-in-out rounded-lg overflow-hidden"
                  >
                    <CardHeader
                      floated={false}
                      shadow={false}
                      color="transparent"
                      className="relative animate-pulse"
                    >
                      <div className="w-full h-40 lg:h-60 bg-green-100"></div>{" "}
                      {/* Placeholder for the image */}
                    </CardHeader>
                    <CardBody className="p-2 pb-0 sm:p-6 sm:pb-0">
                      <div className="animate-pulse">
                        <div className="h-5 bg-green-200 rounded mb-2 w-3/4"></div>{" "}
                        {/* Placeholder for name */}
                        <div className="h-4 bg-green-100 rounded mb-2 w-1/2"></div>{" "}
                        {/* Placeholder for age and marital status */}
                        <div className="h-4 bg-green-100 rounded mb-2 w-3/5"></div>{" "}
                        {/* Placeholder for occupation */}
                        <div className="h-4 bg-green-100 rounded mb-2 w-3/4"></div>{" "}
                        {/* Placeholder for caste */}
                        <div className="h-3 bg-green-100 rounded mt-2 w-full hidden md:block"></div>{" "}
                        {/* Placeholder for about section */}
                      </div>
                    </CardBody>
                    <CardFooter className="flex items-center justify-between p-2 sm:p-6 animate-pulse">
                      <div className="rounded-md bg-green-200 w-20 h-6 sm:w-24"></div>{" "}
                      {/* Placeholder for "View Profile" button */}
                      <div className="rounded-md bg-cyan-200 w-20 h-6 sm:w-24"></div>{" "}
                      {/* Placeholder for "Interested" button */}
                    </CardFooter>
                  </Card>
                ))}
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
    <Layout>
      <div className="bg-gradient-to-r from-green-50 to-blue-50 mt-10">
        <section className="flex justify-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="text-center w-full mb-12">
              <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800">
                Thousands of Muslims have found their{" "}
                <span className="text-green-600">life partner here!</span>
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-green-600 mt-1">
                What are you interested in?
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {finder.map((finderItem) => (
                <PartnerCard
                  key={finderItem.id}
                  finder={finderItem}
                  calculateAge={calculateAge}
                />
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Previous
              </Button>
              <div className="flex mx-2">
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`mx-1 ${
                      currentPage === index + 1 ? "bg-blue-700" : "bg-blue-500"
                    } hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
                  >
                    {index + 1}
                  </Button>
                ))}
              </div>
              <Button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Next
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

const PartnerCard = React.memo(({ finder, calculateAge }) => (
  <Card className="border-green-100 w-full bg-white hover:bg-gradient-to-t from-green-50 to-green-200 shadow transition delay-150 duration-300 ease-in-out hover:shadow-2xl hover:border-green-500 hover:border-spacing-1 rounded-lg overflow-hidden">
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="relative"
    >
      <img
        src={`${URLIMAGE}/${finder.image}`}
        alt={`${finder.name}'s profile picture`} // Descriptive alt text
        className="w-full h-40 lg:h-60 object-top object-cover"
        onError={(e) => (e.target.src = "placeholder-image-url.jpg")} // Ensure the placeholder image is valid
      />
    </CardHeader>
    <CardBody className="p-2 pb-0 sm:p-6 sm:pb-0">
      <Typography
        variant="h6"
        color="blue-gray"
        className="mb-2 flex truncate items-center capitalize"
      >
        {finder.name}
        {finder.has_subscription && (
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
      <Typography
        color="gray"
        className="font-semibold capitalize text-xs sm:text-sm"
      >
        <FaUserGraduate className="inline text-green-400 mr-1" />{" "}
        {calculateAge(finder.dob)}y |{" "}
        <strong className="capitalize">{finder.marital_status}</strong> |{" "}
        <strong className="capitalize">{finder.city}</strong>
      </Typography>
      <Typography
        color="gray"
        className="text-xs capitalize font-semibold sm:text-sm"
      >
        <FaBriefcase className="inline text-green-400 mr-1" />{" "}
        {finder.occupation}
      </Typography>
      <Typography
        color="gray"
        className="font-semibold capitalize text-xs sm:text-sm"
      >
        <FaUser className="inline text-green-400 mr-1 " /> {finder.caste},{" "}
        {finder.sub_caste}
      </Typography>
      <Typography
        color="gray"
        className="font-normal capitalize text-sm mt-2 sm:text-sm hidden md:block"
      >
        {finder.about && finder.about.trim() !== ""
          ? finder.about.length > 65
            ? `${finder.about.substring(0, 65)}...`
            : finder.about
          : "No description available."}
      </Typography>
    </CardBody>
    <CardFooter className="flex items-center justify-between p-2 sm:p-6">
      <Link
        to={`/user-details/${btoa(finder.id)}`}
        className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 rounded-md bg-green-200 text-green-700 text-xs sm:text-sm py-1 px-2"
      >
        <FaUserGraduate className="inline mr-1" />{" "}
        <span className="hidden md:block">View &nbsp; </span> Profile
      </Link>
      <Link
        onClick={() => sendInterest(finder.id)}
        className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 rounded-md bg-cyan-200 text-cyan-700 text-xs sm:text-sm py-1 px-2"
      >
        <FaRegThumbsUp className="inline mr-1" /> Interested
      </Link>
    </CardFooter>
  </Card>
));

export default Allpartner;
