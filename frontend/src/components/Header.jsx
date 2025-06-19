import React from 'react'
import headerpic from "../assets/headerpic.jpg"
import { FaArrowAltCircleRight } from "react-icons/fa"
const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap rounded-lg  bg-amber-600 overflow-hidden'>
       
       <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[30px] px-6 md:px-10 lg:px-20'>
        <p className='text-2xl md:text-2xl lg:text-3xl font-semibold leading-tight md:leading-tight lg:leading-tight text-white'>
            Guiding students through challenges <br/> — academic, emotional, and beyond
        </p>
        <p className='text-xl md:text-xl lg:text-2xl font-semibold leading-tight md:leading-tight lg:leading-tight text-white'>
         Schedule an appointment with verified, trusted counsellors.</p>
        <div> 
        </div>
        <a href=" #speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
            Book Appointment <FaArrowAltCircleRight className='text-xl'/>
        </a>
        
       </div>

       <div className='md:w-1/2 flex items-end justify-end relative'>
          <img src={headerpic} alt="" className='absolute bottom-0 right-0 w-full h-full object-cover'/>
       </div>

    </div>
  )
}

export default Header
