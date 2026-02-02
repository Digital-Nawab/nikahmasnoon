import {
  Card,
  Input,
  Button,
  Radio,
  Typography,
} from "@material-tailwind/react";
import Layout from "../Layout";
import { useState, useEffect } from "react";
import { URL, URLIMAGE } from "../api";
import axios from "axios";
import Select from "react-select";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Register() {
  const [formData, setFormData] = useState({
    matrimony_for: "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    Whatsapp_no: "",
    marital_status: "",
    caste: "",
    sub_caste: "",
    caste_preference: "",
    gender: "",
    dob: "",
    height: "",
    body_type: "",
    country: "",
    state: "",
    city: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuccess = async () => {
      try {
        const response = await axios.get(`${URL}/api/register`, {
          headers: {
            Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
          },
        });
        setSuccess(response?.data?.data);
        console.log(success);
      } catch (err) {
        console.error(err);
        setError("Error fetching Success");
      } finally {
        setLoading(false);
      }
    };
    fetchSuccess();
  }, []);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://admin.nikahmasnoon.com/api/new-registration",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "1|MohDsaLeEmDIgitTalNawab|NikahMasnoon",
          },
        }
      );

      // Assuming the response contains user data along with the token
      sessionStorage.setItem("token", response.data.token);
      // Set user data from the response
      // Set user data in session storage
      sessionStorage.setItem(
        "userData",
        JSON.stringify({
          image: response.data.user.image,
          user_id: response.data.user.user_id,
          name: response.data.user.name,
          gender: response.data.user.gender,
          email: response.data.user.email,
          mobile: response.data.user.mobile,
        })
      );
      toast.success("Registration successful!", {
        duration: 3000, // Optional: specify the duration
      });
      navigate("/update-profile");
    } catch (error) {
      toast.error("Error submitting the form. Please try again.", {
        duration: 3000, // Optional: specify the duration
      });
    }
  };

  async function pin(e) {
    console.log(formData);
    const pincode = e.target.value;
    if (pincode.length === 6) {
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        console.log(response);
        const data = response?.data[0]?.PostOffice?.[0];
        console.log(data.District);
        if (response?.data?.[0]?.Status === "Success") {
          setFormData((prevState) => ({
            ...prevState,
            city: data.District,
            state: data.State,
            country: data.Country,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    }
    console.log(formData);
  }

  useEffect(() => {
    console.log("Form Data", formData);
  }, [formData]);

  return (
    <Layout>
      <Toaster position="top-center" />
      <section
        className="py-10 w-full flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('assets/nikaah.webp')" }}
      >
        <div className="container mx-auto px-4">
          <div className="w-full flex justify-center p-5">
            <Card
              color="gray-200"
              shadow={true}
              className="flex flex-col md:flex-row overflow-x-hidden w-full"
            >
              <div className="flex flex-col md:flex-row w-full">
                <div className="md:w-1/2  items-center justify-center hidden md:block  overflow-hidden">
                  <img
                    className="max-w-full max-h-full object-contain"
                    src="assets/nikah.webp"
                    alt="Nikah Muslim Groom and Bride"
                  />
                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                  >
                    Already have an account?{" "}
                    <a href="login" className="font-medium text-gray-900">
                      Log In
                    </a>
                  </Typography>
                </div>
                <div className="md:w-1/2 p-4 md:p-8">
                  <Typography variant="h4" color="blue-gray">
                    Matrimonial Registration
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Welcome! Please fill in your details to register.
                  </Typography>
                  <form
                    className="mb-2 w-full"
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleRegister}
                  >
                    <div className="mb-1 flex flex-col gap-5">
                      {/*   <Typography variant="h6" color="blue-gray" className="mb-3">
                            Step 1: Basic Information
                          </Typography> */}
                      <div className="flex flex-col md:flex-row items-center mt-4 justify-center space-x-0 md:space-x-4">
                        <div className="w-full md:w-2/6 mb-4 md:mb-0">
                          <label className="block text-sm font-medium text-gray-700">
                            Profile By <span className="text-red-600">*</span>
                          </label>
                          <Select
                            placeholder="Profile By"
                            name="matrimony_for"
                            required
                            options={success?.ProfleFor?.map((item) => ({
                              value: item?.title,
                              label: item?.title,
                            }))}
                            onChange={(option) =>
                              handleSelectChange("matrimony_for", option.value)
                            }
                          />
                        </div>
                        <div className="w-full md:w-2/4">
                          <label className="block text-sm font-medium text-gray-700">
                            Your Name <span className="text-red-600">*</span>
                          </label>
                          <Input
                            name="name"
                            placeholder="Your Name"
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="w-full md:w-2/6 mb-4 md:mb-0">
                          <label className="block text-sm font-medium text-gray-700">
                            Marital Status{" "}
                            <span className="text-red-600">*</span>
                          </label>
                          <Select
                            name="marital_status"
                            options={success?.MaritalStatus?.map((item) => ({
                              value: item?.title,
                              label: item?.title,
                            }))}
                            required
                            onChange={(option) =>
                              handleSelectChange("marital_status", option.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                          <label className="block text-sm font-medium text-gray-700">
                            Phone Number <span className="text-red-600">*</span>{" "}
                          </label>
                          <Input
                            name="mobile"
                            maxLength="15"
                            minLength={10}
                            required
                            placeholder="1234567890"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full md:w-1/2">
                          <label className="block text-sm font-medium text-gray-700">
                            Whatsapp Number{" "}
                            <span className="text-red-600">*</span>{" "}
                          </label>
                          <Input
                            name="Whatsapp_no"
                            maxLength="15"
                            minLength={10}
                            required
                            placeholder="1234567890"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
                        <div className="w-full md:w-2/6 mb-4 md:mb-0">
                          <label className="block text-sm font-medium text-gray-700">
                            Caste <span className="text-red-600">*</span>
                          </label>
                          <Select
                            name="caste"
                            options={success?.Caste?.map((item) => ({
                              value: item?.title,
                              label: item?.title,
                            }))}
                            onChange={(option) =>
                              handleSelectChange("caste", option.value)
                            }
                            className="w-full capitalize"
                            required
                          />
                        </div>
                        <div className="w-full md:w-3/6">
                          <label className="block text-sm font-medium text-gray-700">
                            Maslaq<span className="text-red-600">*</span>
                          </label>
                          <Select
                            name="sub_caste"
                            options={success?.Maslaq?.map((item) => ({
                              value: item?.title,
                              label: item?.title,
                            }))}
                            className="w-full capitalize"
                            onChange={(option) =>
                              handleSelectChange("sub_caste", option.value)
                            }
                            required
                          />
                        </div>
                        <div className="w-full md:w-2/6 mb-4 md:mb-0">
                          <label className="block text-sm font-medium text-gray-700">
                            Caste Preference
                            <span className="text-red-600">*</span>
                          </label>
                          <Select
                            name="caste_preference"
                            options={[
                              { value: "any-caste", label: "Any Caste" },
                              { value: "same-caste", label: "Same Caste" },
                              {
                                value: "general-caste",
                                label: "General Caste",
                              },
                            ]}
                            className="w-full capitalize"
                            required
                            onChange={(option) =>
                              handleSelectChange(
                                "caste_preference",
                                option.value
                              )
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2">
                          <label className="block text-sm font-medium text-gray-700">
                            Password <span className="text-red-600">*</span>{" "}
                          </label>
                          <Input
                            name="password"
                            type="password"
                            maxLength="13"
                            minLength={6}
                            required
                            placeholder="password@123"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full md:w-1/2">
                          <label className="block text-sm font-medium text-gray-700">
                            Occupation <span className="text-red-600">*</span>{" "}
                          </label>
                          <Select
                            name="occupation"
                            options={success?.Occupation?.map((item) => ({
                              value: item?.title,
                              label: item?.title,
                            }))}
                            required
                            onChange={(option) =>
                              handleSelectChange("occupation", option.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="w-full  md:w-4/7">
                          <label className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-600">*</span>{" "}
                          </label>
                          <Input
                            name="email"
                            placeholder="name@mail.com"
                            required
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="w-full mt-4">
                          <div className="flex items-center  mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                              Gender <span className="text-red-600">*</span>{" "}
                            </label>
                            <div className="flex gap-10">
                              <Radio
                                name="gender"
                                label="Male"
                                color="blue"
                                onChange={() =>
                                  handleSelectChange("gender", "Male")
                                }
                                required
                              />
                              <Radio
                                name="gender"
                                label="Female"
                                color="pink"
                                onChange={() =>
                                  handleSelectChange("gender", "Female")
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex ites-center space-x-3">
                          <div className="w-2/6">
                            <label className="block text-sm font-medium text-gray-700">
                              Date Of Birth{" "}
                              <span className="text-red-600">*</span>{" "}
                            </label>
                            <input
                              name="dob"
                              type="date"
                              required
                              onChange={handleInputChange}
                              className=" block w-full h-10 border  border-gray-300 rounded-md p-2"
                            />
                          </div>

                          <div className="w-2/6">
                            <label className="block text-sm font-medium text-gray-700">
                              Height <span className="text-red-600">*</span>{" "}
                            </label>
                            <Select
                              name="height"
                              required
                              options={success?.Height?.map((item) => ({
                                value: `${item?.height_feet}' ${item?.height_inches}" - ${item?.height_cm}cm`,
                                label: ` ${item?.height_feet}ft  ${item?.height_inches}in - ${item?.height_cm}cm `,
                              }))}
                              onChange={(option) =>
                                handleSelectChange("height", option.value)
                              }
                              className="w-full capitalize"
                            />
                          </div>
                          {/*  <div className='w-2/6'>
                              <label className="block text-sm font-medium text-gray-700">Body Type <span className="text-red-600">* </span> </label>
                              <Select name="body_type" options={success?.BodyType?.map((item) => ({ value: item?.title, label: item?.title }))} className="w-full capitalize"  onChange={(option) => handleSelectChange("body_type", option.value)} required  />
                            </div> */}
                          <div className="w-2/6">
                            <label className="block text-sm font-medium text-gray-700">
                              Pincode <span className="text-red-600">* </span>{" "}
                            </label>
                            <Input
                              name="pincode"
                              maxLength="6"
                              minLength={6}
                              required
                              placeholder="123456"
                              className=""
                              onChange={(e) => pin(e)}
                            />
                          </div>
                        </div>
                        <div className="w-full text-right">
                          <span className="text-green-200">
                            {" "}
                            {`${formData.city}  `}, {`${formData.state}  `},{" "}
                            {`${formData.country}  `}
                          </span>
                        </div>
                        <div className="w-full text-center mt-4">
                          <Button type="submit" size="lg" color="green">
                            {" "}
                            Submit Registration{" "}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Register;
