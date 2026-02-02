import { Card, Input, Button, Typography } from "@material-tailwind/react";
import Layout from "../Layout";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const isUserPremium = ({ data }) => {
    console.log("IsPremium",data)
    const token = sessionStorage.getItem("token");
    if (token) {
      const endDate = new Date(data?.payment_subscriptions[0]?.end_date);
      const currentDate = new Date();
      if (currentDate <= endDate && data?.payment_subscriptions[0]?.payment_status == "Success") {
        return true;
      } else {
        return false;
      }
    }
  };

  const fetchProfileData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        "https://admin.nikahmasnoon.com/api/my-profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile data:", response);

      const ispremium = isUserPremium({ data: response?.data?.data });
      console.log("ispremium", ispremium);
      sessionStorage.setItem("ispremium", ispremium);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://admin.nikahmasnoon.com/api/user-login",
        {
          email,
          password,
        }
      );

      console.log("Login response:", response);

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
      toast.success("Logged in successfully!", {
        duration: 3000, // Optional: specify the duration
      });
      fetchProfileData();
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials", {
        duration: 3000, // Optional: specify the duration
      });
    }
  };

  return (
    <Layout>
      <Toaster position="top-center" /> {/* Toast notification container */}
      <section
        className="py-10 w-full flex items-center justify-center min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://nikahmasnoon.com/assets/images/bg/banner/nikah.jpg')",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="w-full flex justify-center p-5">
            <Card
              color="gray-200"
              shadow={true}
              className="flex flex-col md:flex-row overflow-hidden w-full"
            >
              <div className="w-full md:w-1/2 flex items-center justify-center overflow-hidden">
                <img
                  className="max-w-full max-h-full object-contain"
                  src="assets/nikah.webp"
                  alt="Nikah Muslim Groom and Bride"
                />
              </div>
              <div className="w-full md:w-1/2 p-8">
                <Typography variant="h4" color="blue-gray">
                  Sign In
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Nice to meet you! Enter your details to Login.
                </Typography>
                <form className="mt-8 mb-2 w-full" onSubmit={handleLogin}>
                  <div className="mb-1 flex flex-col gap-6">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your Email / UserId
                    </Typography>
                    <Input
                      size="lg"
                      name="user_id"
                      placeholder="name@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Password
                    </Typography>
                    <Input
                      type="password"
                      size="lg"
                      name="password"
                      placeholder="********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                    />
                  </div>

                  <Typography
                    color="gray"
                    className="mt-4 text-right font-normal"
                  >
                    <a target="_blank" href="https://nikahmasnoon.blogspot.com/2025/07/custumer-care.html" className="font-medium text-gray-800">
                      Forgot Password?
                    </a>
                  </Typography>

                  <Button type="submit" className="mt-6" fullWidth>
                    Sign In
                  </Button>
                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                  >
                    Don't have an account?{" "}
                    <a href="register" className="font-medium text-gray-900">
                      Register Now
                    </a>
                  </Typography>
                </form>
                {userData.name && <p>Welcome, {userData.name}!</p>}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Login;
