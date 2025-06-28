import React, { useContext } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'

const MyAppointments = () => {
  const { backendUrl, token, getCounsellorsdata } = useContext(AppContext)
  const [appointments, setAppointments] = useState([])

  const slotDateFormat=(slotDate)=>{
    const dateArray=slotDate.split('_')
    return dateArray[0]+"/"+[Number(dateArray[1])]+"/"+dateArray[2]
  }

  const getMyAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/my-appointments`, {
        headers: { token }
      })
      if (data.success) {
        setAppointments(data.appointments)
      } else {
        toast.error(data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error("Failed to fetch appointments")
    }
  }

  const cancelAppointment=async(appointmentId)=>{
    try{
      const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
      if(data.success)
      {
        toast.success(data.message)
        getMyAppointments()
        getCounsellorsdata()
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
    getMyAppointments()
  }, [])

  
    return (
    <div className="px-4 py-6 sm:px-6 bg-orange-100 min-h-screen">
      <p className="text-xl sm:text-2xl font-semibold mb-6 text-gray-700 text-center sm:text-left">
        My Appointments
      </p>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-600">No appointments booked yet.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row rounded-xl border border-gray-700 bg-orange-100 overflow-hidden"
            >
              <div className="md:w-1/3 w-full h-64 md:h-auto">
                <img
                  src={item.conData.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:w-2/3 w-full p-4 sm:p-6 flex flex-col justify-between">
                <div>
                  <p className="text-lg sm:text-xl font-semibold text-gray-800">
                    {item.conData.name}
                  </p>
                  <p className="text-gray-600 mb-2">{item.conData.speciality}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Date and Time:</span>{' '}
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                  {
                    !item.cancelled &&  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm sm:text-base">
                    Pay Online
                  </button>
                  }
                 
                  {
                    !item.cancelled && <button onClick={()=>cancelAppointment(item._id)} className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm sm:text-base">
                    Cancel Appointment
                  </button>
                  }
                  {
                    item.cancelled && <button className='px-4 py-2 bg-red-600 text-white rounded  text-sm sm:text-base'>Appointment cancelled</button>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default MyAppointments