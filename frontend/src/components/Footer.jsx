import React from 'react'
import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
      <div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        
      
        <div>
          <h3 className="text-lg font-semibold mb-2">StudentCounsel</h3>
          <p className="text-sm">
            Empowering students with the right guidance — academically, emotionally, and professionally.
          </p>
        </div>

       
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
             <NavLink to='/'>
            <li className='py-1'>Home</li>
           
        </NavLink>
        <NavLink to='/counsellor'>
            <li className='py-1'>All Counsellors</li>
           
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>About</li>
           
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            
        </NavLink>
          </ul>
        </div>

     
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p className="text-sm">Email: support@studentcounsel.com</p>
          <p className="text-sm">Phone: +91 98765 43210</p>
          <p className="text-sm">Location: New Delhi, India</p>
        </div>

      
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-xl mt-2">
            <a href="#" className="hover:text-white"><FaFacebookF /></a>
            <a href="#" className="hover:text-white"><FaInstagram /></a>
            <a href="#" className="hover:text-white"><FaLinkedin /></a>
            <a href="#" className="hover:text-white"><FaTwitter /></a>
          </div>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm">
        &copy; {new Date().getFullYear()} StudentCounsel. All rights reserved.
      </div>
   </div>
  )
}

export default Footer
