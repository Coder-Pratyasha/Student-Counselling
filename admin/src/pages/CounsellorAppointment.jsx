import React, { useContext, useEffect } from 'react'
import { CounsellorContext } from '../context/CounsellorContext'
import { FaRupeeSign } from "react-icons/fa"
import { TiTick } from "react-icons/ti"
import { IoCloseSharp } from "react-icons/io5"

const CounsellorAppointment = () => {

  const { ctoken, appointments, getAppointments, completeAppointment,cancelAppointment } = useContext(CounsellorContext)

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + "/" + [Number(dateArray[1])] + "/" + dateArray[2]
  }

  useEffect(() => {
    if (ctoken)
      getAppointments()
  }, [ctoken])

  return (
    <div className="p-6 min-h-screen">
      <p className="text-2xl font-bold mb-4 text-orange-500">All Appointments</p>
      <div className="overflow-x-auto">
        <div className="grid grid-cols-7 gap-4 bg-gray-200 p-4 font-bold text-gray-700 rounded-md">
          <p>#</p>
          <p>Student</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date and time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item, index) => (
            <div key={index} className="grid grid-cols-7 gap-4 items-center p-4 border-b hover:bg-gray-100">
              <p>{index + 1}</p>
              <div className="flex items-center gap-2">
                <img src={item.userData.image} alt="" className="w-8 h-8 rounded-full object-cover" />
                <p>{item.userData.name}</p>
              </div>
              <div>
                <p className="capitalize">{item.payment ? 'Online' : 'Cash'}</p>
              </div>
              <p>{item.userData.dob}</p>
              <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p className="flex items-center gap-1"><FaRupeeSign />{item.amount}</p>
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
          ))
        }
      </div>
    </div>
  )
}

export default CounsellorAppointment
