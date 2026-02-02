import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  FaBriefcase,
  FaUserGraduate,
  FaRegThumbsUp,
  FaFireAlt,
  FaMosque,
} from "react-icons/fa";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Layout from "../Layout";
import axios from "axios";
import { URL, URLIMAGE } from "../api";
import { useLocation } from "react-router-dom";

function Filter() {
  const location = useLocation();

  const [profiles, setProfiles] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [userId, setUserId] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [gender, setGender] = useState(null);
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [caste, setCaste] = useState(null);
  const [familyType, setFamilyType] = useState(null);
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);
  const [minHeight, setMinHeight] = useState(null);
  const [maxHeight, setMaxHeight] = useState(null);
  const [qualification, setQualification] = useState(null);
  const [occupation, setOccupation] = useState(null);

  useEffect(() => {
    loadProfiles(page);
  }, [page]);

  const minAgeOptions = Array.from({ length: 48 }, (_, i) => ({
    value: 18 + i,
    label: `${18 + i} years`,
  }));

  const maxAgeOptions = Array.from({ length: 48 }, (_, i) => ({
    value: 65 - i,
    label: `${65 - i} years`,
  }));

  const loadProfiles = (pageNumber) => {
    setIsLoading(true);
    axios
      .get(`${URL}/api/partner?page=${pageNumber}`, {
        headers: {
          Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
        },
      })

      // console.log(response)
      .then((response) => {
        setProfiles((prevProfiles) => [
          ...prevProfiles,
          ...response.data.data.data,
        ]);
        setHasMore(response.data.data.data.length > 0); // If data length is 0, no more data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadProfiles(1);
  }, []);

  useEffect(() => {
    // Filter profiles based on userId and gender
    const updatedProfiles = profiles.filter((profile) => {
      const matchesGender = gender
        ? profile.gender.toUpperCase() === gender.toUpperCase()
        : true;
      const matchesUserId = userId
        ? profile.user_id.toUpperCase() === userId.toUpperCase()
        : true;
      const matchesMaritalStatus = maritalStatus
        ? profile.marital_status.toUpperCase() === maritalStatus.toUpperCase()
        : true;
      const matchesCaste = caste
        ? profile.caste.toUpperCase() === caste.toUpperCase()
        : true;
      const matchesFamilyType = familyType
        ? profile.family_type === familyType
        : true;
      const matchesAge =
        (minAge ? calculateAge(profile.dob) >= minAge : true) &&
        (maxAge ? calculateAge(profile.dob) <= maxAge : true);
      const matchesHeight =
        (minHeight ? profile.height_cm >= minHeight : true) &&
        (maxHeight ? profile.height_cm <= maxHeight : true);

      const matchesQualification = qualification
        ? profile.qualification === qualification
        : true;
      const matchesOccupation = occupation
        ? profile.occupation === occupation
        : true;

      return (
        matchesGender &&
        matchesUserId &&
        matchesMaritalStatus &&
        matchesCaste &&
        matchesFamilyType &&
        matchesAge &&
        matchesHeight &&
        matchesQualification &&
        matchesOccupation
      );
    });
    setFilteredProfiles(updatedProfiles);
  }, [
    gender,
    maritalStatus,
    caste,
    familyType,
    minAge,
    maxAge,
    minHeight,
    maxHeight,
    qualification,
    occupation,
    userId,
    profiles,
  ]);

  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchSuccess = async () => {
      try {
        const response = await axios.get(`${URL}/api/filter`, {
          headers: {
            Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
          },
        });
        setSuccess(response?.data?.data);
      } catch (err) {
        console.error(err);
        setError("Error fetching Success");
      } finally {
        setLoading(false);
      }
    };
    fetchSuccess();
  }, []);

  const calculateAge = (dob) => {
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
  };

  //console.log(profiles);

  const handleFilterChange = (selected, action) => {
    setFilterData({ ...filterData, [action.name]: selected });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading, hasMore]);

  return (
    <Layout>
      <div className="bg-cover bg-gradient-to-tr from-yellow-50 via-indigo-50 to-amber-50 min-h-screen mt-24">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row justify-center mt-4 gap-6">
            <div className="md:w-8/12 lg:w-8/12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProfiles.map((profile, index) => (
                  <div
                    key={index}
                    className="flex border border-green-100 bg-gradient-to-r from-green-50 to-red-50 shadow-lg hover:shadow-2xl hover:border-green-500 rounded-lg overflow-hidden transition duration-300"
                  >
                    <div className="relative w-2/5">
                      <img
                        src={`${URLIMAGE}/${profile.image}`}
                        alt={profile.name}
                        className="w-full h-[160px] object-top object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                      />
                    </div>
                    <div className="w-3/5 text-left p-3">
                      <Typography
                        variant="h6"
                        color="blue-gray"
                        className="mb-1 capitalize"
                      >
                        <span className="flex truncate items-center capitalize">
                          {profile.name.length > 20
                            ? `${profile.name
                                .substring(0, 20)
                                .toUpperCase()}...`
                            : profile.name.toUpperCase()}
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
                      </Typography>
                      <Typography
                        color="gray"
                        className="font-semibold capitalize text-xs sm:text-sm"
                      >
                        <FaFireAlt className="inline text-green-400 mr-1" />{" "}
                        {calculateAge(profile.dob)}y |{" "}
                        <strong className="">{profile.marital_status}</strong> |{" "}
                        <strong className="">{profile.city}</strong>
                      </Typography>
                      <Typography
                        color="gray"
                        className="text-xs capitalize font-semibold sm:text-sm"
                      >
                        <FaBriefcase className="inline text-green-400 mr-1" />{" "}
                        {profile.occupation}
                      </Typography>
                      <Typography
                        color="gray"
                        className="font-semibold capitalize text-xs sm:text-sm"
                      >
                        <FaMosque className="inline text-green-400 mr-1" />{" "}
                        {profile.caste}, {profile.sub_caste}
                      </Typography>
                      <div className="flex items-center mt-3">
                        <Link
                          to={`/user-details/${btoa(profile.id)}`}
                          className="flex items-center capitalize transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 rounded-md bg-green-700 text-white text-xs sm:text-sm me-3 py-1 px-2"
                        >
                          <FaUserGraduate className="inline mr-1" />{" "}
                          <span className="hidden md:block">View &nbsp; </span>{" "}
                          Profile
                        </Link>
                        <Link
                          onClick={() => sendInterest(profile.id)}
                          className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100 rounded-md bg-light-green-700 text-white text-xs sm:text-sm py-1 px-2"
                        >
                          <FaRegThumbsUp className="inline mr-1" /> Interested
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading &&
                  [...Array(6)].map((_, index) => (
                    <div
                      key={index}
                      className="flex border border-green-100 bg-gradient-to-r from-green-50 to-red-50 shadow-lg hover:shadow-2xl hover:border-green-500 rounded-lg overflow-hidden transition duration-300 animate-pulse"
                    >
                      <div className="relative w-2/5 bg-gray-300 h-40"></div>
                      <div className="w-3/5 p-4">
                        <div className="h-6 bg-gray-300 mb-2"></div>
                        <div className="h-4 bg-gray-300 mb-2"></div>
                        <div className="h-4 bg-gray-300 mb-2"></div>
                        <div className="h-4 bg-gray-300 mb-2"></div>
                        <div className="flex items-center mt-3">
                          <div className="h-8 bg-gray-300 w-24 mr-3"></div>
                          <div className="h-8 bg-gray-300 w-24"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                {/* {isLoading && <div className="text-center">Loading more profiles...</div>} */}
              </div>
            </div>
            <div className="md:w-4/12 lg:w-4/12 sticky top-20 self-start">
              <Card className="p-6 bg-white shadow-lg">
                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="mb-6 text-center"
                >
                  Search By ID
                </Typography>
                <Input
                  name="userId"
                  label="User ID"
                  type="text"
                  value={userId}
                  className="w-full min-w-[100%]"
                  onChange={(e) => setUserId(e.target.value)}
                />
                <Button
                  type="button"
                  className="w-full mt-4"
                  size="lg"
                  color="green"
                  onClick={() => loadProfiles(1)}
                >
                  Search User
                </Button>

                <Typography
                  variant="h4"
                  color="blue-gray"
                  className="mb-6 mt-6 text-center"
                >
                  Search By Filters
                </Typography>

                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                      placeholder="Gender"
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                      ]}
                      onChange={(selectedOption) =>
                        setGender(selectedOption ? selectedOption.value : null)
                      }
                      isClearable
                    />
                    <Select
                      options={success?.MaritalStatus?.map((item) => ({
                        value: item?.title,
                        label: item?.title,
                      }))}
                      onChange={(selectedOption) =>
                        setMaritalStatus(
                          selectedOption ? selectedOption.value : null
                        )
                      }
                      isClearable
                    />
                  </div>

                  <Select
                    placeholder="Caste"
                    options={success?.Caste?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(selectedOption) =>
                      setCaste(selectedOption ? selectedOption.value : null)
                    }
                    isClearable
                  />

                  <Select
                    options={success?.FamilyType?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(selectedOption) =>
                      setFamilyType(
                        selectedOption ? selectedOption.value : null
                      )
                    }
                    isClearable
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                      placeholder="Min Age"
                      options={minAgeOptions}
                      onChange={(selectedOption) =>
                        setMinAge(selectedOption ? selectedOption.value : null)
                      }
                      isClearable
                    />
                    <Select
                      placeholder="Max Age"
                      options={maxAgeOptions}
                      onChange={(selectedOption) =>
                        setMaxAge(selectedOption ? selectedOption.value : null)
                      }
                      isClearable
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Select
                      placeholder="Min Height"
                      options={success?.Height?.map((item) => ({
                        value: item?.height_cm,
                        label: ` ${item?.height_feet}ft  ${item?.height_inches}in - ${item?.height_cm}cm `,
                      }))}
                      onChange={(selectedOption) =>
                        setMinHeight(
                          selectedOption ? selectedOption.value : null
                        )
                      }
                      isClearable
                    />
                    <Select
                      placeholder="Max Height"
                      options={success?.Height?.map((item) => ({
                        value: item?.height_cm,
                        label: ` ${item?.height_feet}ft  ${item?.height_inches}in - ${item?.height_cm}cm `,
                      }))}
                      onChange={(selectedOption) =>
                        setMaxHeight(
                          selectedOption ? selectedOption.value : null
                        )
                      }
                      isClearable
                    />
                  </div>

                  <Select
                    placeholder="Qualification"
                    options={success?.Qualification?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(selectedOption) =>
                      setQualification(
                        selectedOption ? selectedOption.value : null
                      )
                    }
                    isClearable
                  />

                  <Select
                    placeholder="Occupation"
                    options={success?.Occupation?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(selectedOption) =>
                      setOccupation(
                        selectedOption ? selectedOption.value : null
                      )
                    }
                    isClearable
                  />
                  {/* <Select
                                        placeholder="State"
                                        options={success?.State?.map((item) => ({ value: item?.name, label: item?.name }))}
                                        onChange={(selectedOption) => setCity(selectedOption ? selectedOption.value : null)} 
                                        isClearable
                                    /> 
                                    <Select
                                        placeholder="City"
                                        options={success?.City?.map((item) => ({ value: item?.name, label: item?.name }))}
                                        onChange={(selectedOption) => setCity(selectedOption ? selectedOption.value : null)} 
                                        isClearable
                                    />  */}
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Filter;
