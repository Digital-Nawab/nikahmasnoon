import { useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { URL, URLIMAGE } from "../api";
import Layout from "../Layout";
import { Input, Button, Card, Typography, IconButton } from "@material-tailwind/react";
import Select from "react-select";
import { Link } from "react-router-dom";
import { FaFireAlt, FaBriefcase, FaMosque } from "react-icons/fa";

const FilterPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({
    gender: queryParams.get("gender") || "",
    maritalStatus: "",
    caste: queryParams.get("caste") || "",
    familyType: "",
    minAge: "",
    maxAge: "",
    minHeight: "",
    maxHeight: "",
    qualification: "",
    occupation: "",
    city: queryParams.get("city") || "",
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  // Fetch profiles based on filters
  const fetchFilteredData = useCallback(async (currentPage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${URL}/api/filter-user`, {
        params: { ...filters, page: currentPage },
        headers: {
          Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
        },
      });

      setResults(response.data.data.data || []);
      setTotalPages(response.data.data.last_page || 1);
    } catch (err) {
      console.error(err);
      setError("Error fetching matches. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // Fetch filter options (only once on page load)
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get(`${URL}/api/filter`, {
          headers: { Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon" },
        });
        setFilterOptions(response?.data?.data || {});
      } catch (err) {
        console.error(err);
        setError("Error fetching filter options.");
      }
    };

    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchFilteredData(page);
  }, [page, fetchFilteredData]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to the first page when filters change
  };

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

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
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
            {error && <ErrorMessage error={error} />}
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
};

export default FilterPage;
