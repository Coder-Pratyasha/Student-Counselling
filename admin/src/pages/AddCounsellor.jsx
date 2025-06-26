import React, { useContext, useState } from 'react'
import photo from '../assets/profileimage.webp'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddCounsellor = () => {
  const [conImg,setConimg]=useState(false)
  const [name,setname]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [experience,setExperience]=useState('')
  const [fees,setFees]=useState('')
  const [degree,setDegree]=useState('')
  const [speciality,setSpeciality]=useState('Academic')
  const [about,setAbout]=useState('')
  const [address1,setAddress1]=useState('')
  const [address2,setAddress2]=useState('')
  const [education,setEducation]=useState('')

  const {backendUrl,atoken} =useContext(AdminContext)

  const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try{
      if(!conImg)
      {
        return toast.error("Image not selected")
      }
      const formdata=new FormData()
      formdata.append('image',conImg)
      formdata.append('name',name)
      formdata.append('email',email)
      formdata.append('password',password)
      formdata.append('experience',experience)
      formdata.append('degree',degree)
      formdata.append('speciality',speciality)
      formdata.append('fees',Number(fees))
      formdata.append('about',about)
      formdata.append('address_line1',address1)
      formdata.append('address_line2',address2)

      const {data}=await axios.post(backendUrl+'/api/admin/add-counsellor',formdata,{
        headers:{atoken}
      })
      if(data.success)
      {
        toast.success(data.message)
        setConimg(false)
        setname('')
        setAbout('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setEducation('')
        setEmail('')
        setExperience('')
        setFees('')
        setPassword('')
        setSpeciality('Academic')
      }
      else
      {
        toast.error(data.message)
      }

    }
    catch (error) {
  console.error("Error in form submission:", error);
  toast.error(error?.response?.data?.message || "Submission failed");
     }  
  }

  return (
    <form className='max-w-4xl mx-auto my-10 bg-white p-6 rounded-lg' onSubmit={onSubmitHandler}>
      <p className='text-2xl font-semibold mb-6 text-center'>Add Counsellor</p>

      <div className='px-4'>
        <div className=' p-4 flex flex-col items-center rounded-md mb-6'>
          <label htmlFor='con-img' className='cursor-pointer hover:opacity-80'>
            <img src={conImg ? URL.createObjectURL(conImg):photo} alt="" className='w-32 h-32 rounded-full object-cover' />
          </label>
          <input type='file' id='con-img' onChange={(e)=>setConimg(e.target.files[0])} hidden />
          <p className='text-sm text-gray-600 mt-2'>Upload Counsellor picture</p>
        </div>

        <div className='bg-gray-100 flex flex-col items-start px-6 py-4 gap-5 rounded-md'>

          <div className='flex  w-full'>
            <label className='mb-1'>Counsellor Name</label>
            <input type='text' placeholder='Name' className='bg-gray-50 p-2 rounded w-full' onChange={(e)=>setname(e.target.value)} value={name} required />
          </div>

          <div className='flex  w-full'>
            <label className='mb-1'>Counsellor Email</label>
            <input type='email' placeholder='Email' className='bg-gray-50 p-2 rounded w-full' onChange={(e)=>setEmail(e.target.value)} value={email} required />
          </div>

          <div className='flex  w-full'>
            <label className='mb-1'>Counsellor Password</label>
            <input type='password' placeholder='Password' className='bg-gray-50 p-2 rounded w-full' onChange={(e)=>setPassword(e.target.value)} value={password} required />
          </div>

          <div className='flex  w-full'>
            <label className='mb-1'>Counsellor Experience</label>
            <input type='text' placeholder='Experience' className='bg-gray-50 p-2 rounded w-full'  onChange={(e)=>setExperience(e.target.value)} value={experience} required />
          </div>

          <div className='flex w-full'>
            <label className='mb-1'>Counsellor Degree</label>
            <input type='text' placeholder='Degree' className='bg-gray-50 p-2 rounded w-full'  onChange={(e)=>setDegree(e.target.value)} value={degree} required />
          </div>

          <div className='flex  w-full'>
            <label className='mb-1'>Counsellor Speciality</label>
            <select className='bg-gray-50 p-2 rounded w-full'  onChange={(e)=>setSpeciality(e.target.value)} value={speciality}>
              <option value="Academic">Academic</option>
              <option value="Career">Career</option>
              <option value="Personal Growth">Personal Growth</option>
              <option value="Behavioral Support">Behavioral Support</option>
              <option value="Overseas Education">Overseas Education</option>
              <option value="Learning Difficulties">Learning Difficulties</option>
              <option value="Exam Prep">Exam Prep</option>
              <option value="Mental Health">Mental Health</option>
            </select>
          </div>

          <div className='flex  w-full'>
            <label className='mb-1'>Counsellor Education</label>
            <input type='text' placeholder='Education' className='bg-gray-50 p-2 rounded w-full'  onChange={(e)=>setEducation(e.target.value)} value={education} required />
          </div>

          <div className='flex w-full'>
            <label className='mb-1'>Counsellor About</label>
            <textarea placeholder='About' rows={6} className='bg-gray-50 p-2 rounded w-full'  onChange={(e)=>setAbout(e.target.value)} value={about} required />
          </div>

          <div className='flex w-full'>
            <label className='mb-1'>Counsellor Fees</label>
            <input type='number' placeholder='Fees' className='bg-gray-50 p-2 rounded w-full'  onChange={(e)=>setFees(e.target.value)} value={fees} required />
          </div>

          <div className='flex w-full'>
            <label className='mb-1'>Counsellor Address Line1</label>
            <input type='text' placeholder='Address Line1' className='bg-gray-50 p-2 rounded w-full'  onChange={(e)=>setAddress1(e.target.value)} value={address1} required />
          </div>

          <div className='flex  w-full'>
            <label className='mb-1'>Counsellor Address Line2</label>
            <input type='text' placeholder='Address Line2' className='bg-gray-50 p-2 rounded w-full'  onChange={(e)=>setAddress2(e.target.value)} value={address2} required />
          </div>
        </div>

        <div className='flex justify-center mt-6'>
          <button type='submit' className="py-2 px-8 rounded-full bg-orange-500 text-white hover:bg-orange-600">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddCounsellor
