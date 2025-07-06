import React, { useContext, useEffect } from 'react'
import { CounsellorContext } from '../context/CounsellorContext'
import { AppContext } from '../context/AppContext'
import { FaRupeeSign } from "react-icons/fa"
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const Counsellorprofile = () => {
  const { profileData, setProfileData, getProfileData, ctoken, backendUrl } = useContext(CounsellorContext)
  
  const [isEdit,setIsEdit]=useState(false)

  const updateProfile=async()=>{
    try{
      const updateData={
        address_line1:profileData.address_line1,
        address_line2:profileData.address_line2,
        available:profileData.available,
        experience:profileData.experience,
        fees:profileData.fees
      }
      const {data}=await axios.put(backendUrl+'/api/counsellor/update-profile',updateData,{headers:{ctoken}})
    if(data.success)
          {
            toast.success(data.message)
            setIsEdit(false)
            getProfileData()
          }
          else
          {
            toast.error(data.message)
          }
        }
        catch(error)
        {
          console.log(error)
          toast.error(error.message)
        }
  }

  useEffect(() => {
    if (ctoken) getProfileData()
  }, [ctoken])

  return profileData && (
    <div className='flex flex-col lg:flex-row bg-orange-50 min-h-[500px]'>
      <div className='w-full lg:w-1/2 flex items-center justify-center mb-4 lg:mb-0'>
        <img
          src={profileData.image}
          alt="Counsellor"
          className='h-[500px] w-auto object-cover rounded-xl'
        />
      </div>
      <div className='w-full lg:w-1/2 p-3 border border-gray-800 rounded-lg m-3'>
        <p className='text-2xl font-black flex justify-center mb-3'>{profileData.name}</p>
        <p className='text-lg font-semibold mb-2'>{profileData.degree} - {profileData.speciality}</p>

        <div className='mb-4'>
          <p className='text-xl font-medium mb-1'>Experience</p>
          {
            isEdit ? 
            <input className='bg-gray-100' type="text" onChange={(e)=>setProfileData(prev=>({...prev,experience:e.target.value}))}  value={profileData.experience}/>
            :
            <p>{profileData.experience}</p>
          }
        </div>

        <div className='mb-4'>
          <p className='text-xl font-medium mb-1'>About</p>
          {
            isEdit ? 
            <input className='bg-gray-100' type="text" onChange={(e)=>setProfileData(prev=>({...prev,about:e.target.value}))}  value={profileData.about}/>
            :
            <p>{profileData.about}</p>
          }
        </div>

       <p className='text-xl font-medium mb-1 flex'>
                Appointment Fee:
                <span className='flex items-center text-lg font-normal ml-2'>
                  <FaRupeeSign />
                  {
                    isEdit ? (
                      <input
                        type="number"
                        className="bg-gray-100"
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          fees: e.target.value
                        }))}
                        value={profileData.fees}
                        
                      />
                    ) : (
                      <span className="ml-1">{profileData.fees}</span>
                    )
                  }
                </span>
              </p>


        <p className='text-xl font-medium mt-4 mb-2'>Address</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-1'>
          <p>Address Line 1:</p>
          {
            isEdit ? 
            <input className='bg-gray-100' type="text" onChange={(e)=>setProfileData(prev=>({...prev,address_line1:e.target.value}))}  value={profileData.address_line1}/>
            :
            <p>{profileData.address_line1}</p>
          }
          <p>Address Line 2:</p>
          {
            isEdit ? 
            <input className='bg-gray-100' type="text" onChange={(e)=>setProfileData(prev=>({...prev,address_line2:e.target.value}))}  value={profileData.address_line2}/>
            :
            <p>{profileData.address_line2}</p>
          }
          
          
        </div>

        <div className='flex items-center mt-4 gap-2'>
          <input onChange={()=>isEdit && setProfileData(prev=>({...prev, available: !prev.available}))} type="checkbox" id="available" checked={profileData.available}  />
          <label htmlFor='available' className='text-base'>Available</label>
        </div>

        {
          isEdit ? 
          <button onClick={updateProfile} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>
          Save Information
        </button>
        :
        <button onClick={()=>setIsEdit(true)} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all'>
          Edit Information
        </button>
        }

        
        
      </div>
    </div>
  )
}

export default Counsellorprofile
