import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Counsellor from './pages/Counsellor'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import MyAppointments from './pages/MyAppointments'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignUp from './pages/SignUp'
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/counsellor' exact element={<Counsellor />} />
        <Route path='/counsellor/:speciality' exact element={<Counsellor />} />
        <Route path='/login' exact element={<Login />} />
        <Route path='/signup' exact element={<SignUp />} />
        <Route path='/about' exact element={<About />} />
        <Route path='/contact' exact element={<Contact />} />
        <Route path='/my-profile' exact element={<MyProfile />} />
        <Route path='/my-appointments' exact element={<MyAppointments />} />
        <Route path='/appointment/:consId' exact element={<Appointment />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
