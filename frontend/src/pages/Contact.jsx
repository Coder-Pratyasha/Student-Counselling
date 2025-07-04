import React from 'react'
import contactimg from '../assets/about.webp'

const Contact = () => {
  return (
    <div className='bg-orange-100'>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p className='font-semibold'>CONTACT US</p>
      </div>
      <div className='py-20 flex flex-col md:flex-row justify-center gap-10  text-sm'>
        <img src={contactimg} alt="" className='w-100 h-100'/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-lg text-gray-800'>Our Office</p>
          <p className='text-gray-600'>Sector 204, <br/> Connought Place,<br/> New Delhi,<br/> India</p>
          <p className='text-gray-600'>Phone: +91 98765 43210 <br/>Email: support@studentcounsel.com</p>
          <p className='font-semibold text-lg text-gray-800'>Careers at PathPilot</p>
          <p className='text-gray-600'>Learn more about aur teams and job openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-300 rounded-lg'>Explore Jobs</button>
        </div>
      </div>
    </div>
  )
}

export default Contact
