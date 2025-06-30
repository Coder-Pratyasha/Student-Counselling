import React from 'react'
import { useContext } from 'react'
import { CounsellorContext } from '../context/CounsellorContext'
import { useEffect } from 'react'
import { FaUserAlt, FaUserTie } from 'react-icons/fa'
import { MdEvent } from "react-icons/md"
import { IoMdClose } from 'react-icons/io'
import { FaRupeeSign } from "react-icons/fa"
import { TiTick } from 'react-icons/ti'
import { IoCloseSharp } from 'react-icons/io5'

const Counsellordashboard = () => {
  const {dashData,setDashData,getDashData,ctoken,completeAppointment,cancelAppointment}=useContext(CounsellorContext)
   const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+"/"+[Number(dateArray[1])]+"/"+dateArray[2]
  }
  useEffect(()=>{
    if(ctoken)
    {
      getDashData()
    }

  },[ctoken])
  return dashData && (   
    <div>
      <div className="p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex flex-1 items-center gap-3 border border-blue-400 p-4  bg-white">
                <FaUserTie className="text-2xl text-blue-800" />
                <div className="flex items-center gap-2">
                  <p className="text-blue-950 font-bold flex items-center"><FaRupeeSign />{dashData.earning}</p>
                  <p className="font-medium">Earnings</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3 border border-blue-400 p-4  bg-white">
                <MdEvent className="text-2xl text-blue-800" />
                <div className="flex items-center gap-2">
                  <p className="text-blue-950 font-bold">{dashData.appointments}</p>
                  <p className="font-medium">Appointments</p>
                </div>
              </div>
              <div className="flex flex-1 items-center gap-3 border border-blue-400 p-4 bg-white">
                <FaUserAlt className="text-2xl text-blue-800" />
                <div className="flex items-center gap-2">
                  <p className="text-blue-950 font-bold">{dashData.students}</p>
                  <p className="font-medium">Students</p>
                </div>
              </div>
            </div>
            <div>
              <div className='flex  justify-center p-5'>
                <p className='font-bold text-2xl text-orange-500'>Latest Bookings</p>
              </div>
              <div>
        {dashData.latestAppointments.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-1 border border-blue-500 ml-[15%] mr-[15%] p-2 mb-3 bg-white rounded-lg"
          >
            <div className="flex items-stretch gap-3 p-2">
              <img src={item.userData.image} alt="" className="w-20 h-20 rounded object-cover" />
              <div className="flex flex-col justify-between flex-grow py-1">
                <p className="font-medium text-blue-900">{item.userData.name}</p>
                <p className="text-sm text-gray-700">{slotDateFormat(item.slotDate)}</p>
              </div>
              <div className="flex items-center">
                {
                                item.cancelled ?
                                <p className='font-medium text-red-600'>Cancelled</p>
                                :
                                item.isCompleted ?
                                <p className='font-medium text-green-600'>Completed</p>
                                :
                                <div className="flex gap-2 text-xl">
                                <TiTick onClick={()=>completeAppointment(item._id)} className="text-green-600 cursor-pointer" />
                                <IoCloseSharp onClick={()=>cancelAppointment(item._id)} className="text-red-600 cursor-pointer" />
                              </div>
                              }
              </div>
            </div>
          </div>
        ))}
      </div>
            </div>
          </div>
    </div>
  )
}

export default Counsellordashboard
