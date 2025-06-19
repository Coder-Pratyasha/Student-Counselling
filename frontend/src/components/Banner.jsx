import React from 'react'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate=useNavigate()
  return (
    <div className="bg-orange-400 rounded-lg px-6 sm:px-14 lg:px-12 my-20 md:mx-10">
      <div className='py-5 flex flex-col items-center'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>
            <p className='mt-4'>Book Appoinmetnt</p>
        </div>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3  rounded-full mt-6 hover:scale-105 transition-all'>Create Account</button>
      </div>
    </div>
  )
}

export default Banner
