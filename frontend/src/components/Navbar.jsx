import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { IoIosArrowDropdown } from "react-icons/io"
import { BsFilePersonFill } from "react-icons/bs"

const Navbar = () => {

  const navigate = useNavigate();

  const [showMenu,setShowMenu]=useState(false)
  const [token,setToken]=useState(true)

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <div className="flex items-center">
      <img onClick={()=>navigate('/')}  src={logo} alt="" className="w-20 cursor-pointer" />
      <h3 className="text-xl font-extrabold text-orange-500 my-auto">PathPilot</h3>
      </div>
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className="border-none outline-none h-0.5  w-3/5 m-auto hidden" style={{backgroundColor: "#5f6FFF"}} />
        </NavLink>
        <NavLink to='/counsellor'>
            <li className='py-1'>All Counsellors</li>
            <hr className="border-none outline-none h-0.5 w-3/5 m-auto hidden"  style={{backgroundColor: "#5f6FFF"}} />
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className="border-none outline-none h-0.5  w-3/5 m-auto hidden"  style={{backgroundColor: "#5f6FFF"}} />
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr className="border-none outline-none h-0.5  w-3/5 m-auto hidden"  style={{backgroundColor: "#5f6FFF"}} />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {
          token ?
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <BsFilePersonFill className='text-5xl rounded-full' />
            <IoIosArrowDropdown className='text-xl'/>
            <div className='absolute top-1 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={()=>navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={()=>navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={()=>setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
          </div>:
          <button onClick={()=>navigate('/login')} className="text-white px-8 py-4 rounded-full text-l hidden md:block"  style={{backgroundColor: "#5f6FFF"}}>Create Account</button>
        }
      </div>
    </div>
  )
}

export default Navbar
