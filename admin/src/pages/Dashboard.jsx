import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { FaUserAlt, FaUserTie } from 'react-icons/fa'
import { MdEvent } from "react-icons/md"
import { IoMdClose } from 'react-icons/io'

const Dashboard = () => {
  const { dashData, getDashData, atoken } = useContext(AdminContext)
  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+"/"+[Number(dateArray[1])]+"/"+dateArray[2]
  }

  useEffect(() => {
    if (atoken) {
      getDashData()
    }
  }, [atoken])

  return dashData && (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-1 items-center gap-3 border border-blue-400 p-4  bg-white">
          <FaUserTie className="text-2xl text-blue-800" />
          <div className="flex items-center gap-2">
            <p className="text-blue-950 font-bold">{dashData.counsellors}</p>
            <p className="font-medium">Counsellors</p>
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
            <p className="text-blue-950 font-bold">{dashData.users}</p>
            <p className="font-medium">Users</p>
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
        <img src={item.conData.image} alt="" className="w-20 h-20 rounded object-cover" />
        <div className="flex flex-col justify-between flex-grow py-1">
          <p className="font-medium text-blue-900">{item.conData.name}</p>
          <p className="text-sm text-gray-700">{slotDateFormat(item.slotDate)}</p>
        </div>
        <div className="flex items-center">
          {item.cancelled ? (
            <p className="italic text-gray-500">Cancelled</p>
          ) : (
            <IoMdClose
              className="text-red-600 cursor-pointer hover:scale-110 transition-transform"
              size={20}
              onClick={() => cancelAppointment(item._id)}
            />
          )}
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  )
}

export default Dashboard
