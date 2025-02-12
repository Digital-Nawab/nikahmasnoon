import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { URL, URLIMAGE } from "../api";
import Layout from "../Layout";
import { Input, Button, Card, Typography } from "@material-tailwind/react";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  FaFireAlt,
  FaBriefcase,
  FaMosque,
  FaUserGraduate,
  FaRegThumbsUp,
} from "react-icons/fa";

const FilterPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [filters, setFilters] = useState({
    gender: new URLSearchParams(window.location.search).get('gender') || '',
    maritalStatus: "",
    caste: new URLSearchParams(window.location.search).get('caste') || '',
    familyType: "",
    minAge: "",
    maxAge: "",
    minHeight: "",
    maxHeight: "",
    qualification: "",
    occupation: "",
    city: new URLSearchParams(window.location.search).get('city') || '',
  
  });

  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const [userId, setUserId] = useState("");

  // Fetch profiles based on filters
  const fetchFilteredData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${URL}/api/filter-user`, {
        params: filters,
        headers: {
          Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
        },
      });
      setResults(response?.data?.data.data || []);
    } catch (err) {
      setError("Error fetching filtered data.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch filter options (only once on page load)
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get(`${URL}/api/filter`, {
          headers: { Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon" },
        });
        setFilterOptions(response?.data?.data || {});
      } catch (err) {
        setError("Error fetching filter options.");
        console.error(err);
      }
    };

    fetchFilterOptions();
  }, []);

  // Update profiles when filters change
  useEffect(() => {
    fetchFilteredData();
  }, [filters]);

  // Calculate age from DOB
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

  // Update filters when a user changes input
  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <Layout>
      <div className="bg-cover bg-gradient-to-tr from-yellow-50 via-indigo-50 to-amber-50 min-h-screen mt-24">
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row justify-center mt-4 gap-6">
            {/* Filter Form */}
            <div className="md:w-4/12 lg:w-4/12 sticky top-20 self-start">
              <Card className="p-6 bg-white shadow-lg">
                <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
                  Filters
                </Typography>
                <form className="space-y-4">
                  <Select
                    placeholder="Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                    onChange={(option) => handleFilterChange("gender", option.value)}
                  />
                  <Select
                    placeholder="Marital Status"
                    options={filterOptions?.MaritalStatus?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(option) =>
                      handleFilterChange("maritalStatus", option.value)
                    }
                  />
                  <Select
                    placeholder="Caste"
                    options={filterOptions?.Caste?.map((item) => ({
                      value: item?.title,
                      label: item?.title,
                    }))}
                    onChange={(option) => handleFilterChange("caste", option.value)}
                  />
                  <Select
                    placeholder="Family Type"
                    options={[
                      { value: "", label: "All Family Type" }, // Add "View All" option
                      ...(filterOptions?.FamilyType?.map((item) => ({
                        value: item?.title,
                        label: item?.title,
                      })) || []),
                    ]}
                    onChange={(option) => handleFilterChange("familyType", option?.value || "")}
                  />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Select
                        placeholder="Min Height"
                        options={[
                          { value: "", label: "View All" }, // Add "View All" option
                          ...(filterOptions?.Height?.map((item) => ({
                            value: item?.height_cm,
                            label: `${item?.height_feet}ft ${item?.height_inches}in - ${item?.height_cm}cm`,
                          })) || []), // Handle undefined or null `success?.Height`
                        ]}
                        onChange={(option) => handleFilterChange("minHeight", option?.value || "")} // Pass an empty string for "View All"
                      />
                      <Select
                        placeholder="Max Height"
                        options={[
                          { value: "", label: "View All" }, // Add "View All" option
                          ...(filterOptions?.Height?.map((item) => ({
                            value: item?.height_cm,
                            label: `${item?.height_feet}ft ${item?.height_inches}in - ${item?.height_cm}cm`,
                          })) || []), // Handle undefined or null `success?.Height`
                        ]}
                        onChange={(option) => handleFilterChange("maxHeight", option?.value || "")} // Pass an empty string for "View All"
                      />
                    </div>



                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      placeholder="Min Age"
                      options={[
                        { value: "", label: " All Min Age" }, // Add "View All" option
                        ...Array.from({ length: 48 }, (_, i) => ({
                          value: 18 + i,
                          label: `${18 + i} years`,
                        })),
                      ]}
                      onChange={(option) => handleFilterChange("minAge", option?.value || "")}
                    />
                    <Select
                      placeholder="Max Age"
                      options={[
                        { value: "", label: " All Max Age" }, // Add "View All" option
                        ...Array.from({ length: 48 }, (_, i) => ({
                          value: 65 - i,
                          label: `${65 - i} years`,
                        })),
                      ]}
                      onChange={(option) => handleFilterChange("maxAge", option?.value || "")}
                    />
                  </div>
                  <Select
                    placeholder="Qualification"
                    options={[
                      { value: "", label: "All Qualification" }, // Add "View All" option
                      ...(filterOptions?.Qualification?.map((item) => ({
                        value: item?.title,
                        label: item?.title,
                      })) || []),
                    ]}
                    onChange={(option) =>
                      handleFilterChange("qualification", option.value)
                    }
                  />

                  <Select
                    placeholder="Select Occupation"
                    options={[
                      { value: "", label: "All Occupation" }, // Add "View All" option
                      ...(filterOptions?.Occupation?.map((item) => ({
                        value: item?.title,
                        label: item?.title,
                      })) || []),
                    ]}
                    onChange={(option) =>
                      handleFilterChange("occupation", option?.value || "")
                    }
                  />

                  <Select
                    placeholder="Select City"
                    options={[
                      { value: "", label: "All City" }, // Add "View All" option
                      ...(filterOptions?.City?.map((item) => ({
                        value: item?.name,
                        label: item?.name,
                      })) || []),
                    ]}
                    onChange={(option) =>
                      handleFilterChange("city", option?.value || "")
                    }
                  />

                </form>
              </Card>
            </div>

            {/* Results Section */}
            <div className="md:w-8/12 lg:w-8/12">
              {isLoading ? (
                <div className="text-center">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.map((profile, index) => (
                    <div
                      key={index}
                      className="flex border border-green-100 bg-gradient-to-r from-green-50 to-red-50 shadow-lg hover:shadow-2xl hover:border-green-500 rounded-lg overflow-hidden transition duration-300"
                    >
                      <div className="relative w-2/5">
                        <img
                          src={`${URLIMAGE}/${profile.image}`}
                          alt={profile.name}
                          className="w-full h-[160px] object-cover"
                        />
                      </div>
                      <div className="w-3/5 text-left p-3">
                        <Typography variant="h6" className="mb-1 capitalize">
                          {profile.name}
                        </Typography>
                        <Typography color="gray" className="font-semibold text-sm">
                          <FaFireAlt className="inline text-green-400 mr-1" />
                          {calculateAge(profile.dob)}y | {profile.marital_status}
                        </Typography>
                        <Typography color="gray" className="font-semibold text-sm">
                          <FaBriefcase className="inline text-green-400 mr-1" />
                          {profile.occupation}
                        </Typography>
                        <Typography color="gray" className="font-semibold text-sm">
                          <FaMosque className="inline text-green-400 mr-1" />
                          {profile.caste}, {profile.sub_caste}
                        </Typography>
                        <div className="flex items-center mt-3">
                          <Link
                            to={`/user-details/${btoa(profile.id)}`}
                            className="rounded-md bg-green-700 text-white text-sm py-1 px-2"
                          >
                            View Profile
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FilterPage;
