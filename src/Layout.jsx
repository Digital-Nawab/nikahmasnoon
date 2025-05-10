import React from "react";
import Navbar from "./Navbar"
import Footer from "./Footer"
import { Link } from "react-router-dom"

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <div className={`mt-[70px] lg:mt-[${sessionStorage.getItem('token') ? '110' : '90'}px]`}> 
                {children}
            </div>
            <Footer/>
        </>
    )
}


export default Layout