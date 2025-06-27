import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.png"
import { IoIosArrowDropdown } from "react-icons/io"
import { BsFilePersonFill } from "react-icons/bs"
import { MdOutlineMenu } from "react-icons/md"
import { IoCloseSharp } from "react-icons/io5"
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate();

  const {token,setToken} =useContext(AppContext)

  const [showMenu,setShowMenu]=useState(false)

  const logout=()=>{
    setToken(false)
    localStorage.removeItem('token')
  }


  return (
    <div className="flex items-center justify-between text-sm py-4 mb-1 border-b border-b-gray-400 bg-orange-200 p-3">
      <div className="flex items-center">
      <img onClick={()=>navigate('/')}  src={logo} alt="" className="w-20 cursor-pointer rounded-full" />
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
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                </div>
              </div>
          </div>:
          <button onClick={()=>navigate('/signup')} className="text-white px-8 py-4 rounded-full text-l hidden md:block"  style={{backgroundColor: "#5f6FFF"}}>Create Account</button>
        }
        <MdOutlineMenu onClick={()=>setShowMenu(true)} className='text-xl md:hidden'/>
          <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-5'>
              <div className='flex items-center justify-center'>
              <img src={logo} alt="" className='w-16 rounded-full cursor-pointer' />
              <p className='text-orange-500 font-medium'>PathPilot</p>
              </div>
              <IoCloseSharp onClick={()=>setShowMenu(false)} />
            </div>
            <ul className='flex flex-col items-center gap-2'>
              <NavLink to='/' onClick={()=>setShowMenu(false)}>Home</NavLink>
              <NavLink to='/counsellor' onClick={()=>setShowMenu(false)}>All Counsellors</NavLink>
              <NavLink to='/about' onClick={()=>setShowMenu(false)}>About</NavLink>
              <NavLink to='/contact' onClick={()=>setShowMenu(false)}>Contact</NavLink>
            </ul>
          </div>
      </div>
    </div>
  )
}

export default Navbar
