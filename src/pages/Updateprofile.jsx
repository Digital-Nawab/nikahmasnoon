import { useState, useEffect } from "react";
import Layout from '../Layout';
import { motion } from "framer-motion";
// import toast, { Toaster } from 'react-hot-toast';
import BasicInfo from "../component/basicinfo";
import Preference from "../Form/prefrences"; // Fixed casing to match file system
import Galler from "../Form/Galler"; // Fixed casing to match file system
import Professional from "../Form/Professional"; // Fixed casing to match file system

function Updateprofile() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Basic Info', 'Preferences', 'Professional', 'Gallery'];

  useEffect(() => {
    // Get tab from URL hash or localStorage
    const hash = window.location.hash.replace('#', '');
    const savedTab = localStorage.getItem('activeProfileTab');
    const tabIndex = hash ? tabs.findIndex(tab => tab.toLowerCase().replace(' ', '-') === hash) 
                         : savedTab ? parseInt(savedTab) 
                         : 0;
    
    if (tabIndex >= 0) {
      setActiveTab(tabIndex);
    }
  }, []);

  const handleTabChange = (index) => {
    setActiveTab(index);
    // Save tab state
    localStorage.setItem('activeProfileTab', index);
    // Update URL hash
    window.location.hash = tabs[index].toLowerCase().replace(' ', '-');
  };

  return (
    <Layout>
       {/* <Toaster position="top-center" reverseOrder={false} /> */}
      <div className="container mx-auto p-4 shadow-lg  rounded-lg bg-gradient-to-r from-light-green-50 via-blue-50 to-green-50 mt-36 mb-14 ">
        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
        <div className="tabs mb-4">
          {tabs.map((tab, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 m-1  rounded-md ${activeTab === index ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700'}`}
              onClick={() => handleTabChange(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {tab}
            </motion.button>
          ))}
        </div>
       
          {activeTab === 0 && (
            <BasicInfo />
          )}
          {activeTab === 1 && (
           <Preference />
          )}
          {activeTab === 2 && (
           <Professional />
          )}
          {activeTab === 3 && (
           <Galler />
          )}
          
      </div>
    </Layout>
  );
}

export default Updateprofile;
