import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { MdCurrencyRupee, MdVerifiedUser } from "react-icons/md";
import { BsExclamationCircle } from 'react-icons/bs';
import RelatedCounsellors from '../components/RelatedCounsellors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const {consId} = useParams()
  const { counsellors,backendUrl,token,getCounsellorsdata }=useContext(AppContext)
  const  daysOfWeek=['SUN','MON','TUE','WED','THU','FRI','SAT']
  const [consInfo,setConsInfo]=useState(null)
  const [conslot,setconSlot]=useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState('')

  const navigate=useNavigate()

  const fetchinfo=async()=>{
    const consInfo = counsellors.find(cons=>cons._id===consId)
    setConsInfo(consInfo)
    console.log(consInfo)
  }

  const getAvailableSlot=async()=>{
   setconSlot([])

   //getting current date

   let today=new Date()

   for(let i=0;i<7;i++)
   {
    let currentDate=new Date(today)
    currentDate.setDate(today.getDate()+i)

    let endTime=new Date()
    endTime.setDate(today.getDate()+i)
    endTime.setHours(21,0,0,0)

    if(today.getDate()===currentDate.getDate()){
      currentDate.setHours(currentDate.getHours()>10? currentDate.getHours()+1: 10)
      currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 : 0)
    }
    else
    {
      currentDate.setHours(10)
      currentDate.setMinutes(0)

    }

    let timeSlots=[]

    while(currentDate<endTime){
      let formattedTime= currentDate.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})
      let day=currentDate.getDate()
      let month=currentDate.getMonth()+1
      let year=currentDate.getFullYear()

      const slotDate=day+"_"+month+"_"+year
      const slotTime=formattedTime
      const isSlotBooked =
  consInfo?.slots_booked?.[slotDate]?.includes(slotTime) ?? false;

if (!isSlotBooked) {
  timeSlots.push({
    datetime: new Date(currentDate),
    time: formattedTime
  });
}
      
      currentDate.setMinutes(currentDate.getMinutes()+30)
    }
    setconSlot(prev=>([...prev,timeSlots]))
   }
  }

  const bookAppointment = async(req,res) =>{
    if(!token){
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try{
      const date=conslot[slotIndex][0].datetime
      let day=date.getDate()
      let month=date.getMonth()+1
      let year=date.getFullYear()

      const slotDate=day+"_"+month+"_"+year
      const {data}=await axios.post(backendUrl+'/api/user/book-appointment',{conId:consId,slotDate,slotTime},{headers:{token}})
      if(data.success)
      {
        toast.success(data.message)
        getCounsellorsdata()
        navigate('/my-appointments')
      }
      else
      {
        toast.error(data.message)
      }
    }catch(error)
    {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
  fetchinfo()
  },[counsellors,consId])

  useEffect(()=>{
   getAvailableSlot()
  },[consInfo])

  useEffect(()=>{
    console.log(conslot)
  },[conslot])

  return consInfo && (
    <div className='bg-orange-100'>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='w-full sm:max-w-72 rounded-lg pl-3 pt-3' src={consInfo.image} alt="" />
        </div>
        
        <div className='flex-1 border bg-orange-100 border-gray-700 rounded-lg p-8 py-7  mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{consInfo.name} 
            <MdVerifiedUser className='text-lg' /> </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-700'>
            <p>{consInfo.degree} - {consInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{consInfo.experience}</button>
          </div>
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-700 mt-3'>
              About 
              <BsExclamationCircle />
            </p>
            <p className='text-sm text-gray-700 max-w-[700px] mt-1'>{consInfo.about}</p>
          </div>
          <div className='flex items-start text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='flex items-center'><MdCurrencyRupee />{consInfo.fees}</span>
          </div>
        </div>
        </div>
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-scrll mt-4'>
          {
            conslot.length && conslot.map((item,index)=>(
              <div onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-orange-400 text-white' : 'border border-gray-400'}`} key={index}>
                <p>{item[0] && daysOfWeek [item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
            ))
          }
          
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll pt-4'>
          {conslot.length && conslot[slotIndex].map((item,index)=>(
            <p onClick={()=>setSlotTime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time===slotTime ? 'bg-orange-400 text-white': 'font-medium text-gray-700 border border-gray-300' }`} key={index}>{item.time.toLowerCase()}</p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-orange-400 text-white text-sm font-light px-14 py-3 rounded-full my-6'> Book an appointment</button>
      </div>
      <RelatedCounsellors consId={consId} speciality={consInfo.speciality} />
    </div>
  )
}

export default Appointment
