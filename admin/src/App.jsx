import React, { useContext } from 'react'
import Login from './pages/Login'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppContext } from './context/AppContext'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import AllAppointments from './pages/AllAppointments'
import CounsellorList from './pages/CounsellorList'
import AddCounsellor from './pages/AddCounsellor'
import Dashboard from './pages/Dashboard'
import { CounsellorContext } from './context/CounsellorContext'
import Counsellordashboard from './pages/Counsellordashboard'
import CounsellorAppointment from './pages/CounsellorAppointment'
import Counsellorprofile from './pages/Counsellorprofile'


const App = () => {
  const {atoken} =useContext(AdminContext)
  const {ctoken}=useContext(CounsellorContext)
  return atoken || ctoken? (
    <div className='bg-orange-50 min-h-screen'>
      
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' exact element={<></>} />
        <Route path='/admin-dashboard' exact element={<Dashboard />} />
        <Route path='/all-appointments' exact element={<AllAppointments />} />
        <Route path='/add-counsellor' exact element={<AddCounsellor />} />
        <Route path='/counsellor-list' exact element={<CounsellorList />} />

        
        <Route path='/counsellor-dashboard' exact element={<Counsellordashboard />} />
        <Route path='/counsellor-appointments' exact element={<CounsellorAppointment />} />
        <Route path='/counsellor-profile' exact element={<Counsellorprofile />} />
      </Routes>
    </div>
  ):(
    <>
    <Login />
    <ToastContainer /></>
  )
}

export default App
