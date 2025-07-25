import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const TopCounsellors = () => {

    const navigate=useNavigate()
    const {counsellors}=useContext(AppContext)

  return (
    <div className='bg-orange-100'>
    <div className="flex flex-col items-center gap-4 p-10  text-gray-900 md:mx-10">
      <h1 className="text-xl font-medium">Top Counsellors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list if trusted counsellors</p>
      <div className='w-full grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {counsellors.slice(0,8).map((item,index)=>(
          
            <div key={item._id} onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-blue-500 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
                <img src={item.image} alt="" className='w-full h-50' />
                <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-600'}`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                    { item.available ? <p>Available</p> : <p>Not Available</p>}
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600  font-medium'>{item.speciality}</p>
                </div>
            </div>
        ))}
      </div>
      <button onClick={()=>{navigate('/counsellor'); scrollTo(0,0)}} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10">more</button>
    </div>
    </div>
  )
}

export default TopCounsellors
