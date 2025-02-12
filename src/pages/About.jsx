import React from 'react';
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import Layout from "../Layout"

const backgroundImageUrl = "assets/islamic-background.webp";

const backgroundStyle = {
  backgroundImage: `url(${backgroundImageUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
};

function About() {
  return (
    <>
      <Layout>
        <div className="w-full flex items-center justify-center min-h-screen" style={backgroundStyle}>
          <div className=" w-full container mx-auto px-4 py-16">
            <Card className="w-full mx-auto p-8 bg-white shadow-lg">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 pr-4">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/your_video_id"
                    title="About Nikah Masnoon"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="md:w-1/2 pl-4">
                  <Typography variant="h2" color="blue-gray" className="mb-6">
                    About Us
                  </Typography>
                  <Typography color="gray" className="mb-4 font-bold italic text-lg">
                    "The man dreams of a perfect woman and the woman dreams of a perfect man and they don't know that Allah created them to perfect one another."
                  </Typography>
                  <Typography color="gray" className="mb-4">
                    Marriage (Nikah) is considered as an act of worship (Ibadat). It is a Social as well as a religious activity. Islam advocates simplicity in ceremonies and celebrations.
                  </Typography>
                  <Typography color="gray" className="mb-4">
                    Prophet Muhammad considered 'Simple Wedding' as the best 'Wedding'
                  </Typography>
                  <Typography color="gray" className="mb-4 font-bold text-lg bg-green-100 p-4 rounded-lg">
                    نْكِحُوا الْأَيَامَىٰ مِنْكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِنْ يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِنْ فَضْلِهِ ۗ وَاللَّهُ وَاسِعٌ عَلِيمٌ
                  </Typography>
                  <Typography color="black" className="mb-4 font-bold text-lg bg-green-100 p-4 rounded-lg">
                    "The best Wedding is that upon which the least 'trouble' and expense is bestowed".
                  </Typography>
                  <Typography color="gray">
                    Nikah Masnoon is working on the new revolutionary concept which will Save your time, decrease your expenses and minimize your trouble.
                  </Typography>
                  <Typography color="gray">
                    Nikah masnoon has a authorized pan card issued by government of india.
                  </Typography>
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-r from-green-100 to-blue-100 p-6 rounded-lg shadow-md my-6">
              <Typography variant="h3" color="blue-gray" className="text-center">
                How Does It Work
              </Typography>
              <div className="mb-5">
                <Typography color="green" className="text-center mb-3">
                  Indian Muslims typically search profiles based on:
                </Typography>
                <div className="grid grid-cols-4 gap-4">
                  <div className="flex items-center">
                    <div className="bg-green-500 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-lg font-semibold">Caste</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-blue-500 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <span className="text-lg font-semibold">City</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-yellow-500 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-lg font-semibold">Maslak</span>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-red-500 rounded-full p-2 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-lg font-semibold">Profession</span>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center bg-blue-50 p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                    Create Your Profile
                  </Typography>
                  <Typography color="gray" className="text-center">
                    Sign up and create a detailed profile highlighting your background, interests, and preferences.
                  </Typography>
                </div>
                <div className="flex flex-col items-center bg-green-50 p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                    Discover Matches
                  </Typography>
                  <Typography color="gray" className="text-center">
                    Our advanced algorithm suggests compatible matches based on your criteria and preferences.
                  </Typography>
                </div>
                <div className="flex flex-col items-center bg-yellow-50 p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                    Connect Safely
                  </Typography>
                  <Typography color="gray" className="text-center">
                    Communicate with potential matches through our secure messaging system, adhering to Islamic guidelines.
                  </Typography>
                </div>
                <div className="flex flex-col items-center bg-red-50 p-6 rounded-lg shadow-md">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
                    Find Your Match
                  </Typography>
                  <Typography color="gray" className="text-center">
                    Take the next step towards a blessed union with the support of our community and resources.
                  </Typography>
                </div>
              </div>

              <div className="mt-12">
                <Typography variant="h4" color="blue-gray" className="mb-6 text-center">
                  Our Unique Services
                </Typography>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                    <img
                      src="assets/online.webp"
                      alt="Online Services"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Online Services
                    </Typography>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Comprehensive website for profile registration and searching</li>
                      <li>Dedicated helpdesks for assistance with profile management</li>
                      <li>WhatsApp service for convenient communication</li>
                    </ul>
                  </div>
                  <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
                    <img
                      src="assets/business.webp"
                      alt="Offline Services"
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Offline Services
                    </Typography>
                    <ul className="list-disc list-inside text-gray-700">
                      <li>Personal consultants for face-to-face or phone assistance</li>
                      <li>Tailored profile searching support</li>
                      <li>Ideal for those less familiar with social media</li>
                    </ul>
                  </div>
                </div>
                <Typography variant="h6" color="green" className="mt-6 text-center">
                  Nikah Masnoon fulfills all your requirements and provides an efficient system through our website, offline centres, helpdesks, and dedicated consultants.
                </Typography>
              </div>
            </Card>


          </div>
        </div>
      </Layout>
    </>
  );
}

export default About;