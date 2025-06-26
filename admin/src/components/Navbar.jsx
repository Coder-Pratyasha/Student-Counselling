import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import logo from '../assets/logo.png'
import {NavLink, useNavigate} from 'react-router-dom'

const Navbar = () => {

    const {atoken,setAtoken} =useContext(AdminContext)
    const navigate=useNavigate()
    const logout=()=>{
        navigate('/')
        atoken && setAtoken('')
        atoken && localStorage.removeItem('atoken')
    }

  return  (
    <div className='flex items-center justify-between p-2 bg-orange-100'>
        <div className='flex items-center justify-center gap-4'>
            <div className='flex items-center'>
        <img src={logo} alt=" " className='w-16 rounded-full border border-black' />
        <p className='font-medium text-xl'>PathPilot</p>
        </div>
        <p className='border border-blue-900 rounded-full px-5 py-2 bg-white'>{atoken ? 'Admin' : 'Counsellor'}</p>
      </div>
      <div>
        {
          atoken && <ul className='flex items-center gap-6 font-medium'>
            <NavLink to='/admin-dashboard' className={({isActive})=> `flex items-center cursor-pointer ${isActive ? 'underline' :''}` }>
            <li>DashBoard</li>
            </NavLink>
            <NavLink to='/all-appointments' className={({isActive})=> `flex items-center cursor-pointer ${isActive ? 'underline' :''}` }>
            <li>Appointments</li>
            </NavLink>
            <NavLink to='/add-counsellor' className={({isActive})=> `flex items-center cursor-pointer ${isActive ? 'underline' :''}` }>
            <li>Add Counsellor</li>
            </NavLink>
            <NavLink to='/counsellor-list' className={({isActive})=> `flex items-center cursor-pointer ${isActive ? 'underline' :''}` }>
            <li>All Counsellors</li>
            </NavLink>
          </ul>
        }
      </div>
      <button className=" py-2 px-5  rounded-full bg-orange-500 text-white hover:bg-orange-600" onClick={logout}>Logout</button>
      
    </div>
  )
}

export default Navbar
