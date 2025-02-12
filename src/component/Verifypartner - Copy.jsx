import React from 'react'
import { Link } from "react-router-dom"
import { FaEye, FaUser, FaBriefcase, FaHeart, FaFireAlt , FaUserGraduate ,FaRegThumbsUp  } from 'react-icons/fa'; // Importing icons
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Avatar,
    Tooltip,
    Button,
} from "@material-tailwind/react";


function Verifypartner() {
    return (
        <div>
            <section className="flex bg-light-green-100 justify-center px-5 py-14">
                <div className="container">
                    <div className="text-center w-full">
                        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-gray-800"><span className="text-green-700">Verified</span> Partner here!</h1>
                        <p className="text-xl sm:text-1xl font-medium text-green-600 mt-1">What are you Looking</p>

                        <div className="py-10">
                            <div className="grid  md:grid-cols-3  gap-10">

                      
                                {[...Array(9)].map((_, index) => (


                                    // <Card key={index} className="mt-6 w-full overflow-hidden justify-between">
                                    //     <CardHeader color="blue-gray" className="relative">
                                    //         <img src="https://nikahmasnoon.com/assets/user//449291634926552.jpg" alt="card-image" />
                                    //     </CardHeader>
                                    //     <CardBody>
                                    //         <Typography variant="h5" color="blue-gray" className="mb-2">
                                    //             UI/UX Review Check
                                    //         </Typography>
                                    //         <Typography>
                                    //             The place is close to Barceloneta Beach and bus stop just 2 min by
                                    //             walk and near to &quot;Naviglio&quot; where you can enjoy the main
                                    //             night life in Barcelona.
                                    //         </Typography>
                                    //     </CardBody>
                                    //     <CardFooter className="pt-0">
                                    //         <Button>Read More</Button>
                                    //     </CardFooter>
                                    // </Card>
                                    
                                <Card key={index} className="mt-6 w-full overflow-hidden flex">
                                    <CardHeader color="blue-gray" className="relative w-1/3">
                                        <img src={`https://nikahmasnoon.com/assets/user//202851710754109.jpeg`} alt="Profile" className="w-full object-cover" />
                                    </CardHeader>
                                    <CardBody className="w-2/3 p-4">
                                        <Typography variant="h5" color="blue-gray" className="mb-2">
                                            {["Aisha", "Muhammad", "Fatima", "Omar", "Zainab", "Ali", "Khadija", "Hassan", "Mariam"][index % 9]} {["Ahmed", "Khan", "Ali", "Hassan", "Malik", "Siddiqui", "Rahman", "Qureshi", "Zaidi"][index % 9]}
                                        </Typography>
                                        <Typography color="gray" className="font-semibold text-xs sm:text-sm">
                                            <FaFireAlt  className="inline text-green-400 mr-1" /> 29y | <strong className=''> Unmarried</strong>
                                        </Typography>
                                        <Typography color="gray" className="text-xs font-semibold sm:text-sm">
                                            <FaBriefcase className="inline text-green-400 mr-1" /> Unemployed
                                        </Typography>
                                        <Typography color="gray" className="font-semibold text-xs sm:text-sm">
                                            <FaUser className="inline text-green-400 mr-1" /> Muslim, Pathan
                                        </Typography>
                                        <Typography color="gray" className="font-normal text-sm mt-2 sm:text-sm hidden md:block">
                                            Seeking a life partner who values faith, kindness, and mutual respect. Let's build a beautiful future together, insha'Allah.
                                        </Typography>
                                    </CardBody>
                                </Card>


                                ))}


                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Verifypartner
