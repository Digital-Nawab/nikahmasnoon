import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './pages/Index'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import Contact from './pages/Contact'
import UserDetails from './pages/UserDetails'
import Myprofile from './pages/Myprofile'
import Mymatch from './pages/Mymatch'
import Updateprofile from './pages/Updateprofile'
import Myintrest from './pages/Myintrest'
import Chating from './pages/Chating'
import Packages from './pages/Packages'
import Complaint from './pages/Complaint'
import Filter from './pages/Filter'
import Allverifypartner from './pages/Allverifypartner'
import AllsuccessPartner from './pages/AllsuccessPartner'
import Allpartner from './pages/Allpartner'
import Termscondition from './pages/Termscondition'
import Privacypolicy from './pages/Privacypolicy'
import FilterPage from './pages/filterPage'




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="contact" element={<Contact/>} />
          <Route path="user-details/:id" element={<UserDetails/>} />
          <Route path="my-profile" element={<Myprofile/>} />
          <Route path="my-match" element={<Mymatch/>} />
          <Route path="my-intrest" element={<Myintrest/>} />
          <Route path="chating" element={<Chating/>} />
          <Route path="update-profile" element={<Updateprofile/>} />
          <Route path="my-package" element={<Packages/>} />
          <Route path="complaint" element={<Complaint/>} />
          <Route path="filter" element={<Filter/>} />
          <Route path="all-verify-partner" element={<Allverifypartner/>} />
          <Route path="all-success-partner" element={<AllsuccessPartner/>} />
          <Route path="all-partner" element={<Allpartner/>} />
          <Route path="terms-condition" element={<Termscondition/>} />
          <Route path="privacy-policy" element={<Privacypolicy/>} />
          <Route path="filter-page" element={<FilterPage/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App

