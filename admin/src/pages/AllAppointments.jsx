import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { AppContext } from '../context/AppContext'
import { FaRupeeSign } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"

const AllAppointments = () => {
  const { atoken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    getAllAppointments()
  }, [atoken])

  return (
    <div className="p-6 min-h-screen font-sans">
      <p className="text-2xl font-bold mb-4 text-orange-500">All Appointments</p>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-9 gap-3 bg-gray-200 p-4 font-bold text-gray-700 rounded-md">
          <p>#</p>
          <p>Student</p>
          <p>Doctor</p>
          <p>Payment</p>
          <p>Date and Time</p>
          <p>Fees</p>
          <p>Status</p>
          <p>Action</p>
          <p>Rating</p>
        </div>

        {appointments.slice().reverse().map((item, index) => (
          <div key={index} className="grid grid-cols-9 gap-4 items-center p-4 border-b hover:bg-gray-50 text-sm">
            <p>{index + 1}</p>

            <div className="flex items-center gap-2">
              <img src={item.userData.image} alt="Student" className="w-8 h-8 rounded-full object-cover" />
              <p>{item.userData.name}</p>
            </div>

            <div className="flex items-center gap-2">
              <img src={item.conData.image} alt="Doctor" className="w-8 h-8 rounded-full object-cover" />
              <p>{item.conData.name}</p>
            </div>

            <p className="capitalize">{item.payment ? 'Online' : 'Cash'}</p>

            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

      
            <p className="flex items-center gap-1 text-green-700 font-medium">
              <FaRupeeSign />{item.amount}
            </p>

        
            <p className={`font-medium ${item.cancelled ? 'text-gray-500' : item.isCompleted ? 'text-green-600' : 'text-blue-600'}`}>
              {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Scheduled'}
            </p>

            {
              item.cancelled || item.isCompleted ? (
                <p className="text-gray-400 italic">N/A</p>
              ) : (
                <IoMdClose
                  className="text-red-600 cursor-pointer text-lg hover:scale-110 transition-transform"
                  onClick={() => cancelAppointment(item._id)}
                />
              )
            }
             {
                item.rating? <p className='text-green-600 font-medium'>{item.rating}</p> : <p>Not rated</p>
              }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
