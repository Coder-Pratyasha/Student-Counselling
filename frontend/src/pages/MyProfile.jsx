import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { AppContext } from '../context/AppContext'
import axiosInstance from '../utils/axiosInstance.js'
import axios from 'axios'
import { toast } from 'react-toastify'



const MyProfile = () => {
  
  const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)

  const [edit,setEdit]=useState(false)
  const [image,setImage]=useState(false)

  const updateUserProfileData=async()=>{
    try{
      const formData=new FormData()
      formData.append('name',userData.name)
      formData.append('address',userData.address)
      formData.append('gender',userData.gender)
      formData.append('dob',userData.dob)
      formData.append('phone',userData.phone)

      image && formData.append('image',image)

      const {data} =await axios.put(backendUrl+'/api/user/update-profile',formData,{headers:{token}})

      if(data.success)
      {
        toast.success(data.message)
        await loadUserProfileData()
        setEdit(false)
        setImage(false)
      }
      else
      {
        toast.error(data.message)
      }
    }
    catch(error)
    {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return userData && (
    <div className='flex bg-orange-100'>
      <div className='w-1/2' >
      {
        edit ? <label htmlFor="image" >
          <div className='inline-block relative cursor-pointer'>
            <img className='h-full w-full p-3 rounded-xl  opacity-75' src={image ? URL.createObjectURL(image) :userData.image} alt="" />
            <img className='h-full w-full p-3 rounded-xl absolute' src={image ?'' : {logo}} alt="" />
          </div>
          <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden />
        </label>  :  <img src={userData.image} className='h-full w-full p-3 rounded-xl' />
      }
     
      
      </div>
      <div className='w-1/2  p-3 border border-gray-800 rounded-lg m-3'>
        
        {
        edit ? <input type="text" 
        value={userData.name}
        className='bg-gray-100 border-none rounded-lg p-1 mb-1'
        onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))} /> 
        : 
        <p className='text-2xl font-black flex justify-center mb-3'>{userData.name}</p>
         }
        <p className='text-xl font-medium mb-2'>ABOUT USER</p>
      <div className='grid grid-cols-[1fr_3fr]'>
        
        
        <p className='mb-1'>DOB: </p>
        {
          edit ? <input type="date" 
        value={userData.dob}
         className='bg-gray-100 border-none rounded-lg p-1 mb-1'
        onChange={e=>setUserData(prev=>({...prev,dob:e.target.value}))} /> 
        : 
        <p>{userData.dob}</p>
        }
         
        <p className='mb-1'>GENDER: </p>
        {
          edit ?
          <select onChange={(e)=>setUserData(prev=>({...prev,gender:e.target.value}))} value={userData.gender}
           className='bg-gray-100 border-none rounded-lg p-1 mb-1'>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        : 
        <p>{userData.gender}</p>
        }
      </div>
      <p className='text-xl font-medium mb-2 mt-3'>CONTACT</p>
      <div className='grid grid-cols-[1fr_3fr]'>
        
         <p className='mb-1'>phone: </p>
        {
          edit ? <input type="text" 
        value={userData.phone}
         className='bg-gray-100 border-none rounded-lg p-1 mb-1 '
        onChange={e=>setUserData(prev=>({...prev,phone:e.target.value}))} /> 
        : 
        <p className='mb-1'>{userData.phone}</p>
        }
        <p className='mb-1'>EMAIL: </p>
        <p>{userData.email}</p>
        <p className='mb-1'>ADDRESS: </p>
        {
          edit ? <input type="text" 
           className='bg-gray-100 border-none rounded-lg p-1 mb-1'
        value={userData.address}
        onChange={e=>setUserData(prev=>({...prev,address:e.target.value}))} /> 
        : 
        <p>{userData.address}</p>
        }
      </div>
      <div>
        {
          edit? <button onClick={updateUserProfileData} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3  rounded-full mt-6 hover:scale-105 transition-all'>Save Information</button>
          :
          <button onClick={()=>setEdit(true)} className='bg-white text-sm sm:text-base text-gray-600 px-8 py-3  rounded-full mt-6 hover:scale-105 transition-all'>Edit Information</button>
        }
      </div>
    </div>
    </div>
   
  )
}

export default MyProfile
