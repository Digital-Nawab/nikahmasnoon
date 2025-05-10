import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Layout from "../Layout";
import Verifypartner from "../component/Verifypartner";
import Findpartner from "../component/Findpartner";
import Successlifepartner from "../component/Successlifepartner";
import Gallery from "../component/Gallery";
import { URL } from "../api";

function Index() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    setTimeout(() => {
      handleOpen();
    }, 5000);
  }, []);

  const [states, setStates] = useState([]);
  const [city, setCity] = useState([]);
  const [castes, setCaste] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(null);
  const [genderValue, setFilterGender] = useState("");
  const [stateValue, setFilterState] = useState("");
  const [casteValue, setFilterCaste] = useState("");
  const [cityValue, setFilterCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFilter = () => {
    const queryParams = new URLSearchParams();
    if (genderValue) queryParams.append("gender", genderValue);
    if (casteValue) queryParams.append("caste", casteValue);
    if (stateValue) queryParams.append("state", stateValue);
    if (cityValue) queryParams.append("city", cityValue);

    navigate(`/filter-page?${queryParams.toString()}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [casteResponse, stateResponse] = await Promise.all([
          axios.get(`${URL}/api/caste`, {
            headers: {
              Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
            },
          }),
          axios.get(`${URL}/api/states/101`, {
            headers: {
              Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
            },
          }),
        ]);

        setCaste(casteResponse.data.data);
        setStates(stateResponse.data.data.state);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedStateId) {
        setLoading(true);
        try {
          const response = await axios.get(
            `${URL}/api/cities/${selectedStateId}`,
            {
              headers: {
                Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
              },
            }
          );
          setCity(response.data.data);
        } catch (err) {
          console.error("Error fetching cities:", err);
          setError("Error fetching city data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCities();
  }, [selectedStateId]);

  const ucFirst = (str) => str?.charAt(0).toUpperCase() + str.slice(1) || "";

  return (
    <Layout>
      <div className="relative">
        <img
          src="assets/nikaah.webp"
          alt="Banner"
          className="w-full h-96 md:h-screen object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="container mx-auto flex flex-col items-center justify-center h-full">
            <div className="md:rounded-full rounded-none p-4 shadow-lg">
              <h2 className="text-center text-2xl font-bold text-white mb-4">
                Find Your Best Match Here!
              </h2>

              <div className="md:rounded-full rounded-none p-2 bg-white/50 w-full sm:w-auto">
                <div className="flex justify-center flex-col sm:flex-row items-center p-3 bg-white gap-2  md:rounded-full rounded-sm">
                  <select
                    value={genderValue}
                    onChange={(e) => setFilterGender(e.target.value)}
                    className="w-full p-3 rounded-full border bg-white  text-gray-700 transition"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  <select
                    value={casteValue}
                    onChange={(e) => setFilterCaste(e.target.value)}
                    className="w-full p-3 rounded-full border bg-white  text-gray-700 transition"
                  >
                    <option value="">Select Caste</option>
                    <option value="0">All Caste</option>
                    {castes.map((item) => (
                      <option key={item.title} value={item.title}>
                        {item.title}
                      </option>
                    ))}
                  </select>

                  <select
                    value={stateValue}
                    onChange={(e) => {
                      setFilterState(e.target.value);
                      setSelectedStateId(e.target.value);
                    }}
                    className="w-full p-3 rounded-full border bg-white text-gray-700 transition"
                  >
                    <option value="">Select State</option>
                    <option value="0">All States</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {ucFirst(state.name)}
                      </option>
                    ))}
                  </select>

                  <select
                    value={cityValue}
                    onChange={(e) => setFilterCity(e.target.value)}
                    className="w-full p-3 rounded-full border bg-white  text-gray-700 transition"
                  >
                    <option value="">Select City</option>
                    <option value="0">All Cities</option>
                    {city.map((c) => (
                      <option key={c.id} value={c.name}>
                        {ucFirst(c.name)}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={handleFilter}
                    className="bg-green-400 whitespace-nowrap text-white font-semibold p-3 mr-2 w-full sm:w-auto rounded-lg  hover:from-green-500 hover:to-blue-500 transition"
                  >
                    Search Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Verifypartner />
      <Findpartner />
      <Successlifepartner />

      <section className="bg-blue-50  py-12 px-4 md:px-8">
        <div className="container mx-auto grid grid-cols-3 lg:gap-12">
          {/* Text Content */}
          <div className="p-8 col-span-3 lg:col-span-2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              Find Your Perfect Life Partner
            </h2>
            <p className="text-lg lg:w-2/3  mb-6">
              The man dreams of a perfect woman and the woman dreams of a
              perfect man and they don't know that Allah created them to perfect
              one another. <br /> Marriage (Nikah) is considered as an act of
              worship (Ibadat). It is a Social as well as a religious activity.
              Islam advocates simplicity in ceremonies and celebrations.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="">
                <img
                  src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-20"
                />
              </a>
              <a href="#" className="">
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                  alt="Get it on Google Play"
                  className="h-20"
                />
              </a>
            </div>
          </div>

          {/* Phone Mockups */}
          <div className="md:w-1/2 col-span-3 lg:col-span-1 flex justify-center gap-4">
            <img
              src="/assets/images/user/mobile.png"
              className="rounded-[20px] lg:h-full h-[200px]"
              alt=""
            />
            <img
              src="/assets/images/user/mobile2.png"
              className="rounded-[20px] lg:h-full h-[200px]"
              alt=""
            />
          </div>
        </div>
      </section>
      <Dialog
        className="rounded-[30px] overflow-hidden p-6"
        size="xs"
        open={open}
        handler={handleOpen}
      >
        <div className="flex flex-col justify-center items-center">
          <div className="w-full  grid grid-cols-2 gap-4">
            <img
              src="/assets/images/user/mobile.png"
              className="rounded-[20px] object-cover"
              alt=""
            />
            <img
              src="/assets/images/user/mobile2.png"
              className="rounded-[20px] object-cover"
              alt=""
            />
          </div>

          <a href="https://play.google.com/store/games?hl=en" target="_blank" className="">
            <img
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              className="h-20"
            />
          </a>
        </div>
      </Dialog>
      <Gallery />
    </Layout>
  );
}

export default Index;
