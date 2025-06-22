import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppointments = () => {
  const { counsellors } = useContext(AppContext)

  return (
    <div className="px-4 py-6 sm:px-6 bg-orange-100 min-h-screen">
      <p className="text-xl sm:text-2xl font-semibold mb-6 text-gray-700 text-center sm:text-left">
        My Appointments
      </p>

      <div className="space-y-6">
        {counsellors.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row rounded-xl border border-gray-700 bg-orange-100 overflow-hidden"
          >
            
            <div className="md:w-1/3 w-full h-64 md:h-auto">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover "
              />
            </div>

            
            <div className="md:w-2/3 w-full p-4 sm:p-6 flex flex-col justify-between">
              <div>
                <p className="text-lg sm:text-xl font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-gray-600 mb-2">{item.speciality}</p>
                <p className="text-sm text-gray-500">Address:</p>
                <p className="text-sm text-gray-700">{item.address_line1}</p>
                <p className="text-sm text-gray-700 mb-4">{item.address_line2}</p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium text-gray-700">
                    Date and Time:
                  </span>{' '}
                  25 July, 2025 | 9:30 AM
                </p>
              </div>

             
              <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm sm:text-base">
                  Pay Online
                </button>
                <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition text-sm sm:text-base">
                  Cancel Appointment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
