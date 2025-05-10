import React from "react";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaEnvelopeSquare,
  FaPhoneSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
// Suggested background image online source: Unsplash.com

function Footer() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" text-white py-8 px-4 bg-cover bg-center bg-gray-900 "
    >
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="mb-4">
            <h2 className="text-3xl text-green-400 font-bold">Nikah Masnoon India</h2>
            <p color="green" className="text-light-green-500">
              Find your perfect match with us.
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl text-green-400 mb-3  font-semibold">
              Quick Links
            </h3>
            <ul className="list-disc pl-5">
              <li className="pt-2">
                <Link to="/" className="text-white hover:text-green-900">
                  Home
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/about" className="text-white hover:text-green-800">
                  About Us
                </Link>
              </li>
              <li className="pt-2">
                <Link to="/contact" className="text-white hover:text-green-800">
                  Contact Us
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href="https://nikahmasnoon.blogspot.com/"
                  target="_blank"
                  className="text-white hover:text-green-800"
                >
                  Islamic Blogs
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl text-green-400 mb-3 font-semibold">
              Quick Links
            </h3>
            <ul className="list-disc pl-5">
              <li className="pt-2">
                <a
                  href="https://wa.me/919214205090"
                  target="_blank"
                  className="text-white hover:text-gray-400"
                >
                  24x7 Live help
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/privacy-policy"
                  className="text-white hover:text-gray-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  to="/terms-condition"
                  className="text-white hover:text-gray-400"
                >
                  Terms Condition
                </Link>
              </li>
              <li className="pt-2">
                <a href="#" className="text-white hover:text-gray-400">
                  Pricing Packages
                </a>
              </li>
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-2xl text-green-400  mb-3 font-semibold">
              Follow Us
            </h3>
            <div className="flex space-x-2">
              <a
                href="https://www.facebook.com/nikahmasnoon"
                className="text-blue-500 text-3xl hover:text-green-400"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://www.instagram.com/nikah_masnoon_india/"
                className="text-red-200 text-3xl hover:text-green-400"
              >
                <FaInstagramSquare />
              </a>
              <a
                href="https://www.youtube.com/nikahmasnoon"
                className="text-red-600 text-3xl hover:text-green-400"
              >
                <FaYoutubeSquare />
              </a>
              <a
                href="mailto:info@nikahmasnoon.com"
                className="text-blue-500 text-3xl hover:text-green-400"
              >
                <FaEnvelopeSquare />
              </a>
              <a
                href="tel:+919214205090"
                className="text-green-500 text-3xl hover:text-green-400"
              >
                <FaPhoneSquare />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4 border-t border-white w-full" />
        <p className="text-center">
          Copyright 2023 Nikah Masnoon. All rights reserved.
        </p>
      </div>
    </motion.div>
  );
}

export default Footer;
