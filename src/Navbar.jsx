import React from "react";
import { Link } from "react-router-dom";
import {Collapse,Typography,Button,IconButton,Avatar,Badge,} from "@material-tailwind/react";
import { URL, URLIMAGE } from './api';

const Navbar = () => {
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) setOpenNav(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const userData = JSON.parse(sessionStorage.getItem('userData'));
   
    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography as="li" variant="small" color="blue-gray" className="p-1 text-white text-base hover:text-green-900 font-semibold tracking-wide">
                <Link to="/" className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100">
                    Home
                </Link>
            </Typography>
            <Typography as="li" variant="small" color="blue-gray" className="p-1 text-white text-base hover:text-green-900 font-semibold tracking-wide">
                <Link to="/about" className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100">
                    About
                </Link>
            </Typography>
            <Typography as="li" variant="small" color="blue-gray" className="p-1 text-white hover:text-green-900 text-base font-semibold tracking-wide">
                <Link to="/contact" className="flex items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-100">
                    Contact
                </Link>
            </Typography>
        </ul>
    );

    return (
        <>
            <div className="fixed w-full top-0 left-0 r-0 z-[200]">
                <div className="flex bg-green-200 justify-center">
                    <div className="container w-full bg-green">
                        <div className="sticky top-0 z-10 h-max max-w-full rounded-none px-2 py-1">
                            <div className="flex items-center justify-between text-blue-gray-900">
                                <div className="mr-4 hidden lg:block">{navList}</div>
                                <Typography className="cursor-pointer transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300">
                                    <Link to="/">
                                        <img width={300} src="https://nikahmasnoon.com/assets/images/muslim%20matrimon-01.png" alt="Nikah Masnoon" />
                                    </Link>
                                </Typography>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-x-1 ">
                                        {sessionStorage.getItem('token') ? (
                                            <>
                                                <Badge className="hidden md:block" placement="top-end" overlap="circular" color="green" withBorder>
                                                <Avatar size="sm" className="border hidden md:block border-green-500 p-0.5" src={`${URLIMAGE}/${userData.image}`} alt=" {userData.name}" />
                                                </Badge>
                                                <div className="ml-4 flex-auto hidden md:block">
                                                    <div className="font-medium"> {userData.name}</div>
                                    
                                                    <button className="px-2 py-0 rounded-md text-center text-white bg-red-400 text-[12px] font-light" onClick={() => {
                                                        sessionStorage.removeItem('token');
                                                        window.location.href = '/';
                                                    }}>
                                                        Log Out
                                                    </button>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <Link color="black" size="sm" className="hidden lg:inline-block text-white bg-black  focus:ring-black-300 dark:focus:ring-black shadow-lg shadow-black/50 dark:shadow-lg dark:shadow-black/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" to="/login"  >
                                                    <span>Log In</span>
                                                </Link>
                                                <Link color="green" size="sm" className="button hidden lg:inline-block text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" to="/register">
                                                    <span>Register</span>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                    <IconButton
                                        variant="text"
                                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                                        ripple={false}
                                        onClick={() => setOpenNav(!openNav)}
                                    >
                                        {openNav ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        )}
                                    </IconButton>
                                </div>
                            </div>
                            <Collapse open={openNav}>
                                {navList}
                                <div className="flex items-center gap-x-1">
                                    <Link color="black" size="sm" to = '/login'>
                                        <span>Log In</span>
                                    </Link>
                                    <Link color="green" size="sm" to="/register">
                                        <span>Register</span>
                                    </Link>
                                </div>
                            </Collapse>
                        </div>


                    </div>
                </div>
                {sessionStorage.getItem('token') && (
                    <div className="flex-wrap justify-center hidden md:flex bg-gray-900 shadow-2xl space-x-6">
                        <Link to="/my-profile" className="flex items-center rounded-lg px-3 py-1 text-white transition ease-in-out delay-150 hover:bg-green-700 hover:-translate-y-1 hover:scale-60">
                            My Profile
                        </Link>
                        <Link to="/my-match" className="flex items-center rounded-lg px-3 py-1 text-white transition ease-in-out delay-150 hover:bg-green-700 hover:-translate-y-1 hover:scale-60">
                            My Match
                        </Link>
                        <Link to="/my-intrest" className="flex items-center rounded-lg px-3 py-1 text-white transition ease-in-out delay-150 hover:bg-green-700 hover:-translate-y-1 hover:scale-60">
                            My Interest
                        </Link>
                        {/* <Link to="/chating" className="flex items-center rounded-lg px-3 py-1 text-white transition ease-in-out delay-150 hover:bg-green-700 hover:-translate-y-1 hover:scale-60">
                            Chating
                        </Link> */}
                        <Link to="/update-profile" className="flex items-center rounded-lg px-3 py-1 text-white transition ease-in-out delay-150 hover:bg-green-700 hover:-translate-y-1 hover:scale-60">
                            Update Profile
                        </Link>
                        <Link to="/my-package" className="flex items-center rounded-lg px-3 py-1 text-white transition ease-in-out delay-150 hover:bg-green-700 hover:-translate-y-1 hover:scale-60">
                            My Package
                        </Link>
                        <Link to="/complaint" className="flex items-center rounded-lg px-3 py-1 text-white transition ease-in-out delay-150 hover:bg-green-700 hover:-translate-y-1 hover:scale-60">
                            Complaint
                        </Link>
                    </div>
                )}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-green-100 p-3  flex md:hidden justify-center space-x-6 items-center z-[100]">
                <button className="bg-green-300 p-2 rounded-full text-white" onClick={() => window.location.href = '/'}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <g fill="#298f06">
                            <path
                                d="M10.894 22h2.212c3.447 0 5.17 0 6.345-1.012 1.175-1.012 1.419-2.705 1.906-6.093l.279-1.937c.38-2.637.57-3.956.029-5.083-.54-1.127-1.691-1.813-3.992-3.183l-1.385-.825C14.2 2.622 13.154 2 12 2c-1.154 0-2.199.622-4.288 1.867l-1.385.825c-2.3 1.37-3.451 2.056-3.992 3.183-.54 1.127-.35 2.446.03 5.083l.278 1.937c.487 3.388.731 5.081 1.906 6.093C5.724 22 7.447 22 10.894 22z"
                                opacity="0.5"
                            ></path>
                            <path d="M9.447 15.397a.75.75 0 00-.894 1.205A5.766 5.766 0 0012 17.75a5.766 5.766 0 003.447-1.148.75.75 0 00-.894-1.205A4.266 4.266 0 0112 16.25a4.266 4.266 0 01-2.553-.853z"></path>
                        </g>
                    </svg>
                </button>
                <button className="bg-green-300 p-2 rounded-full text-white" onClick={() => setOpenNav(prev => !prev)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <g fill="#298f06">
                            <circle cx="15" cy="6" r="3" opacity="0.4"></circle>
                            <ellipse cx="16" cy="17" opacity="0.4" rx="5" ry="3"></ellipse>
                            <circle cx="9.001" cy="6" r="4"></circle>
                            <ellipse cx="9.001" cy="17.001" rx="7" ry="4"></ellipse>
                        </g>
                    </svg>
                </button>
                <button className="bg-green-300 p-2 rounded-full text-white" onClick={() => {/* Add functionality here */ }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <g fill="#298f06">
                            <path
                                d="M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22z"
                                opacity="0.5"
                            ></path>
                            <path d="M12 8.25a.75.75 0 01.75.75v2.25H15a.75.75 0 010 1.5h-2.25V15a.75.75 0 01-1.5 0v-2.25H9a.75.75 0 010-1.5h2.25V9a.75.75 0 01.75-.75z"></path>
                        </g>
                    </svg>
                </button>
                <button className="bg-green-300 p-2 rounded-full text-white" onClick={() => {/* Chat functionality here */ }}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <g fill="#298f06">
                            <path d="M7.456 3.09A10 10 0 002 12c0 1.6.376 3.112 1.043 4.453.178.356.237.764.134 1.148l-.595 2.226a1.3 1.3 0 001.591 1.592l2.226-.596a1.633 1.633 0 011.149.134A9.96 9.96 0 0012 22c4.885 0 8.952-3.503 9.826-8.134A9 9 0 017.456 3.09z"></path>
                            <path
                                d="M21.826 13.866C21.94 13.26 22 12.637 22 12c0-5.523-4.477-10-10-10a9.96 9.96 0 00-4.544 1.09 9 9 0 0014.37 10.776z"
                                opacity="0.5"
                            ></path>
                        </g>
                    </svg>
                </button>
                <Badge placement="top-end" overlap="circular" color="green" withBorder>
                    <Avatar size="md" className="border border-green-500 p-0.5" src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" />
                </Badge>
            </div>
        </>
    );
}

export default Navbar;