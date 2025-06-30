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
    <div className="p-6 font-sans">
      <p className="text-2xl font-semibold mb-6">All Appointments</p>

     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">

        {appointments.map((item, index) => (
          <div
            key={index}
            className={`bg-white p-4 rounded-lg shadow border   ${
              item.cancelled ? 'opacity-60 bg-gray-100' : 'transition-transform duration-300 hover:scale-105'
            }`}
          >
            <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
              <p className="font-semibold">Appointment #{index + 1}</p>
              {item.cancelled ? 
                <p className="italic text-gray-500">Cancelled</p>
               :
                 !item.isCompleted ?
                <IoMdClose
                  className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
                  size={20}
                  onClick={() => cancelAppointment(item._id)}
                />
              
              :
              <div></div>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <img src={item.userData.image} alt="Student" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-gray-800">{item.userData.name}</p>
                  <p className="text-xs text-gray-500">Student</p>
                </div>
              </div>

              <div>
                <p className="text-gray-800 font-medium">{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                <p className="text-xs text-gray-500">Date & Time</p>
              </div>

              <div className="flex items-center gap-3">
                <img src={item.conData.image} alt="Doctor" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-gray-800">{item.conData.name}</p>
                  <p className="text-xs text-gray-500">Doctor</p>
                </div>
              </div>

              <div>
                <p className="flex items-center gap-1 font-semibold text-green-700">
                  <FaRupeeSign />{item.amount}
                </p>
                <p className="text-xs text-gray-500">Fees</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Status</p>
                <p className={`font-medium ${item.cancelled ? 'text-gray-500' : 'text-blue-600'}`}>
                  {item.cancelled ? 'Cancelled' : item.isCompleted ? 'Completed' : 'Scheduled'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
