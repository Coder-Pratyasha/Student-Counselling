import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { useEffect } from 'react'

const CounsellorList = () => {
  const { counsellors,atoken,getAllCounsellors,changeAvailibility } = useContext(AdminContext)
  useEffect(()=>{
    if(atoken)
      getAllCounsellors()
  },[atoken])
  return (
    <div>
      <h1 className='font-bold flex text-2xl justify-center text-orange-600 p-5'>Counsellors List</h1>
      <div className='flex flex-wrap gap-6 pl-[4%]'>
        {
          counsellors.map((item,index)=>(
            <div key={index} className='flex gap-10 p-4 border border-blue-800 w-full md:w-[42%] items-center rounded-lg hover:bg-orange-400 hover:text-white'>
              <img src={item.image} className='w-30'/>
              <div>
                <p className='font-medium'>Name: {item.name}</p>
                <p className='font-medium'>Speciality: {item.speciality}</p>
                <p className='font-medium'>Degree: {item.degree}</p>
                <p className='font-medium'>Experience:{item.experience}</p>
                <p className='font-medium'>Fees:{item.fees}</p>
                <div className='flex gap-3'>
                  <input type='checkbox'  checked={item.available} onChange={()=>changeAvailibility(item._id)} />
                  <p className='font-medium'>Available</p>
                  </div>
                </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CounsellorList
