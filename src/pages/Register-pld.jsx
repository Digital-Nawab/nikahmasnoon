import { Card, Input, Button, Radio, Typography } from "@material-tailwind/react";
import Layout from "../Layout";
import { useState, useEffect } from "react";
import { URL, URLIMAGE } from '../api';
import axios from 'axios';
import Select from 'react-select';
import { Toaster, toast } from 'react-hot-toast';

export function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(
    {
      "matrimony_for": "",
      "name": "",
      "user_id": "",
      "email": "",
      "mobile": "",
      "Whatsapp_no": "",
      "marital_status": "",
      "caste": "",
      "sub_caste": "",
      "caste_preference": "",
      "gender": "",
      "dob": "",
      "any_disability": "",
      "qualification": "",
      "employed_in": "",
      "occupation": "",
      "annual_income": "",
      "min_salary": "",
      "max_salary": "",
      "height": "",
      "height_cm": "",
      "family_type": "",
      "about": "",
      "body_type": "",
      "complexion": "",
      "Language_spoken": "",
      "Native_Hometown": "",
      "Requirements": "",
      "family_detail": "",
      "Correspondence_Address": "",
      "Current_city": "",
      "password": "",
      "country": "",
      "state": "",
      "city": "",
      "is_active": "1",
      "is_delete": "0",
      "date_time": ""
    }

  )
  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

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
            Authorization: '1|MohDsaLeEmDIgitTalNawab|NikahMasnoon'
          }
        });
        setSuccess(response?.data?.data);
        console.log(success);
      } catch (err) {
        console.error(err);
        setError('Error fetching Success');
      } finally {
        setLoading(false);
      }
    };
    fetchSuccess();
  }, []);

  



  const handleRegister = async (e) => {
    e.preventDefault();
     // Example validation: Ensure required fields are filled
     const requiredFields = [
      "matrimony_for",
      "name",
      "marital_status",
      "mobile",
      "Whatsapp_no",
      "email",
      "gender",
      "dob",
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Field ${field} is required`);
        return;
      }
    }



    try {
      const response = await axios.post('https://admin.nikahmasnoon.com/api/new-registration', formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: '1|MohDsaLeEmDIgitTalNawab|NikahMasnoon'
        }
      });

       // Assuming the response contains user data along with the token
       sessionStorage.setItem('token', response.data.token);
       // Set user data from the response
        // Set user data in session storage
       sessionStorage.setItem('userData', JSON.stringify({
           image: response.data.user.image,
           user_id: response.data.user.user_id,
           name: response.data.user.name,
           gender: response.data.user.gender,
           email: response.data.user.email,
           mobile: response.data.user.mobile
       }));
       toast.success('Registration successful!', {
           duration: 3000, // Optional: specify the duration
       });


    } catch (error) {
      toast.error('Error submitting the form. Please try again.', {
        duration: 3000, // Optional: specify the duration
      });
    }
  };


  return (
    <Layout>
       <Toaster position="top-center" />
      <section className="py-10 w-full flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://nikahmasnoon.com/assets/images/bg/banner/nikah.jpg')" }}>
        <div className="container mx-auto px-4">
          <div className="w-full flex justify-center p-5">
            <Card color="gray-200" shadow={true} className="flex flex-col md:flex-row overflow-hidden w-full">
              <form className="mb-2 w-full" method="post" encType="multipart/form-data" onSubmit={handleRegister}>
                {step === 1 && (
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="md:w-1/2  items-center justify-center hidden md:block  overflow-hidden">
                      <img className="max-w-full max-h-full object-contain" src="https://png.pngtree.com/png-vector/20240422/ourlarge/pngtree-nikah-muslim-groom-and-bridle-islamic-marriage-png-image_12306292.png" alt="Nikah Muslim Groom and Bride" />
                    </div>
                    <div className="md:w-1/2 p-4 md:p-8">
                      <Typography variant="h4" color="blue-gray">
                        Matrimonial Registration
                      </Typography>
                      <Typography color="gray" className="mt-1 font-normal">
                        Welcome! Please fill in your details to register.
                      </Typography>
                      <div className="mb-1 flex flex-col gap-5">
                        <Typography variant="h6" color="blue-gray" className="mb-3">
                          Step 1: Basic Information
                        </Typography>
                        <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
                          <div className="w-full md:w-2/6 mb-4 md:mb-0"> 
                          <label className="block text-sm font-medium text-gray-700">Profile For  <span className="text-red-600">*</span></label>
                            <Select placeholder="Profle For" name="matrimony_for" required options={success?.ProfleFor?.map((item) => ({ value: item?.title, label: item?.title }))} onChange={(option) => handleSelectChange("matrimony_for", option.value)}  />
                                    
                          </div>
                          <div className="w-full md:w-2/4">
                            <label className="block text-sm font-medium text-gray-700">Your Name <span className="text-red-600">*</span></label>
                            <Input name="name" placeholder="Your Name" onChange={handleInputChange} required />
                          </div>
                          <div className="w-full md:w-2/6 mb-4 md:mb-0">
                            <label className="block text-sm font-medium text-gray-700">Marital Status <span className="text-red-600">*</span></label>
                            <Select name="marital_status" options={success?.MaritalStatus?.map((item) => ({ value: item?.title, label: item?.title }))} required  onChange={(option) => handleSelectChange("marital_status", option.value)}   />
                          </div>

                        </div>

                        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                          <div className="w-full md:w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Phone Number <span className="text-red-600">*</span> </label> 
                            <Input name="mobile" maxLength="13" minLength={10}  required placeholder="1234567890" onChange={handleInputChange}  />
                          </div>
                          <div className="w-full md:w-1/2">
                            <label className="block text-sm font-medium text-gray-700">Whatsapp Number <span className="text-red-600">*</span> </label>
                            <Input name="Whatsapp_no"  maxLength="13" minLength={10}  required placeholder="1234567890" onChange={handleInputChange}  />
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4">
                          <div className="w-full md:w-2/6 mb-4 md:mb-0">
                            <label className="block text-sm font-medium text-gray-700">Caste  <span className="text-red-600">*</span></label>
                            <Select name="caste" options={success?.Caste?.map((item) => ({ value: item?.title, label: item?.title }))}  onChange={(option) => handleSelectChange("caste", option.value)} className="w-full capitalize" required  />
                          </div>
                          <div className="w-full md:w-2/6"> 
                            <label className="block text-sm font-medium text-gray-700">Maslaq<span className="text-red-600">*</span></label>
                            <Select name="sub_caste" options={success?.Maslaq?.map((item) => ({ value: item?.title, label: item?.title }))} className="w-full capitalize" onChange={(option) => handleSelectChange("sub_caste", option.value)} required  />
                          </div>
                          <div className="w-full md:w-2/6 mb-4 md:mb-0">
                            <label className="block text-sm font-medium text-gray-700">Caste Preference<span className="text-red-600">*</span></label>
                            <Select name="caste_preference" options={[{ value: "any-caste", label: "Any Caste" }, { value: "same-caste", label: "Same Caste" }, { value: "general-caste", label: "General Caste" }]} className="w-full capitalize" required onChange={(option) => handleSelectChange("caste_preference", option.value)}  />
                          </div> 
                        </div>
                        <div className="flex flex-col">
                          <div className="w-full  md:w-4/7">
                            <label className="block text-sm font-medium text-gray-700">Email <span className="text-red-600">*</span> </label>
                            <Input name="email" placeholder="name@mail.com" required  />
                          </div>
                          <div className="w-full mt-4">
                            <div className="flex items-center  mb-4">
                              <label className="block text-sm font-medium text-gray-700">Gender <span className="text-red-600">*</span> </label>
                              <div className="flex gap-10">
                                <Radio name="gender" label="Male" color="blue"  />
                                <Radio name="gender" label="Female" color="pink"  />
                              </div>
                            </div>
                          </div>
                          <div className='flex ites-center space-x-3' >
                            <div className='w-2/6'>
                              <label className="block text-sm font-medium text-gray-700">Date Of Birth <span className="text-red-600">*</span> </label>
                              <input  name="dob" type="date" required onChange={handleInputChange} className=" block w-full h-10 border  border-gray-300 rounded-md p-2"  />
                            </div>

                            <div className='w-2/6'>
                              <label className="block text-sm font-medium text-gray-700">Height <span className="text-red-600">*</span> </label>
                              <Select name="height"  required  options={success?.Height?.map((item) => ({ value: item?.title, label: ` ${item?.height_feet}ft  ${item?.height_inches}in - ${item?.height_cm}cm ` }))} onChange={(option) => handleSelectChange("height", option.value)} className="w-full capitalize"
                              
                              />
                            </div>
                            <div className='w-2/6'>
                              <label className="block text-sm font-medium text-gray-700">Body Type <span className="text-red-600">* </span> </label>
                              <Select name="body_type" options={success?.BodyType?.map((item) => ({ value: item?.title, label: item?.title }))} className="w-full capitalize"  onChange={(option) => handleSelectChange("body_type", option.value)} required  />
                            </div>
                            <div className='w-2/6'>
                              <label className="block text-sm font-medium text-gray-700">Pincode <span className="text-red-600">* </span> </label>
                              <Input name="pincode" maxLength="6" minLength={6}  required placeholder="123456" className="" onChange={async (e) => {
                                const pincode = e.target.value;
                                if (pincode.length === 6) {
                                  try {
                                    const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
                                    const data = response?.data?.Status;
                                    if (data) {
                                      setFormData(prevState => ({ ...prevState, city: data.PostOffice[0].District, state: data.PostOffice[0].State, country: data.PostOffice[0].Country }));
                                    }
                                  } catch (error) {
                                    console.error(error);
                                  }
                                }
                              }} />
                              <span className="text-green-200"> {`data.PostOffice[0].District,  data.PostOffice[0].State, data.PostOffice[0].Country`}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="md:w-1/2 flex items-center justify-center overflow-hidden">
                      <img className="max-w-full max-h-full object-contain" src="https://png.pngtree.com/png-vector/20240422/ourlarge/pngtree-nikah-muslim-groom-and-bridle-islamic-marriage-png-image_12306292.png" alt="Nikah Muslim Groom and Bride" />
                    </div>
                    <div className="md:w-1/2 p-4 md:p-8">
                      <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-1">
                          Step 2: Preferences Information
                        </Typography>

                        <>
                          <div className="grid grid-cols-1  gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">About Your Self</label>
                              <textarea name="about" className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">What Do You Look For In a Life Partner?</label>
                              <textarea name="Requirements" className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Your Famliy Details ?</label>
                              <textarea name="family_detail" className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Country</label>
                              <Select name="country"  options={success?.Countrie?.map((item) => ({ value: item?.name, label: item?.name }))}  />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">State</label>
                              <Select name="state" options={success?.State?.map((item) => ({ value: item?.name, label: item?.name }))}  />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">City</label>
                              <Select name="city" options={success?.City?.map((item) => ({ value: item?.name, label: item?.name }))}  />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Native/Hometown</label>
                              <input name="Native_Hometown" type="text" className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="Native/Hometown"  />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">Preferred Cities</label>
                              <Select name="preferred_cities" options={success?.City?.map((item) => ({ value: item?.name, label: item?.name }))} isRequired required  />
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="md:w-1/2 flex items-center justify-center overflow-hidden">
                      <img className="max-w-full max-h-full object-contain" src="https://png.pngtree.com/png-vector/20240422/ourlarge/pngtree-nikah-muslim-groom-and-bridle-islamic-marriage-png-image_12306292.png" alt="Nikah Muslim Groom and Bride" />
                    </div>
                    <div className="md:w-1/2 p-4 md:p-8">
                      <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-1">
                          Step 3: Professional Information
                        </Typography>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Family Type</label>
                            <Select name="family_type" options={success?.FamilyType?.map((item) => ({ value: item?.title, label: item?.title }))} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Mother tongue</label>
                            <Select name="language_spoken" options={success?.Language?.map((item) => ({ value: item?.title, label: item?.title }))} />
                          </div>
                          
                          <div className="">
                            <label className="block text-sm font-medium text-gray-700">Any Disability</label>
                            <Select name="any_disability" options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }]} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Highest Qualification</label>
                            <Select name="qualification" options={success?.Qualification?.map((item) => ({ value: item?.title, label: item?.title }))} />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                          <div>
                              <label className="block text-sm font-medium text-gray-700">Your Famliy Details ?</label>
                              <textarea name="family_detail" className="mt-1 block w-full border border-gray-300 rounded-md p-2"></textarea>
                            </div>
                        </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Employed In</label>
                            <Select name="employed_in" options={success?.Employeed?.map((item) => ({ value: item?.title, label: item?.title }))} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Occupation</label>
                            <Select name="occupation" options={success?.Occupation?.map((item) => ({ value: item?.title, label: item?.title }))} /> 
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Annual Income</label>
                            <Select name="annual_income" options={success?.Occupation?.map((item) => ({ value: item?.title, label: item?.title }))} />
                          </div> 
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {step === 4 && (
                  <div className="flex flex-col md:flex-row w-full">
                    <div className="md:w-1/2 flex items-center justify-center overflow-hidden">
                      <img className="max-w-full max-h-full object-contain" src="https://png.pngtree.com/png-vector/20240422/ourlarge/pngtree-nikah-muslim-groom-and-bridle-islamic-marriage-png-image_12306292.png" alt="Nikah Muslim Groom and Bride" />
                    </div>
                    <div className="md:w-1/2 p-4 md:p-8">
                      <div className="mb-6 flex flex-col gap-6">
                        <Typography variant="h6" color="blue-gray" className="-mb-1">
                          Step 4: Upload Profile Image
                        </Typography>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700"> Priofile Image  <span className="text-red-600">*</span> </label>
                        <Input type="file" required className="!border-t-blue-gray-200 focus:!border-t-gray-900 h-12" />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Gallery Image</label>
                        <Input type="file" multiple className="!border-t-blue-gray-200 focus:!border-t-gray-900 h-12" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex flex-col md:flex-row justify-end m-6">
                  {step > 1 && (
                    <Button onClick={prevStep} className="mb-2 w-fit md:mb-0 md:mr-2">
                      Back
                    </Button>
                  )}
                  {step < 4 ? (
                    <Button onClick={nextStep} className="" variant="large">
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" size="lg" color="green">
                      Submit
                    </Button>
                  )}
                </div>
                <Typography color="gray" className="mt-4 text-center font-normal">
                  Already have an account?{" "}
                  <a href="login" className="font-medium text-gray-900">
                    Log In
                  </a>
                </Typography>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Register;