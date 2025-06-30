import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Counsellor = () => {

  const { speciality }=useParams()
  const {counsellors }= useContext(AppContext)
  const [filterDoc,setFilterDoc]=useState([])
  const navigate=useNavigate()

  const applyFilter=()=>{
    if(speciality)
      setFilterDoc(counsellors.filter(doc => doc.speciality === speciality))
    else
    setFilterDoc(counsellors)
}
  
  useEffect(()=>{
    applyFilter()
  },[counsellors,speciality])


  return (
    <div className='bg-orange-100 p-5'>
      <p className='text-gray-600'>Browse through the counsellors</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <div className='flex flex-col gap-4 text-sm text-gray-600'>
          <p onClick={()=>speciality === 'Academic' ? navigate('/counsellor') : navigate('/counsellor/Academic')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-500 rounded transition-all cursor-pointer ${speciality === "Academic" ? "bg-orange-100 text-black" : ""}`}>Academic</p>

          <p onClick={()=>speciality === 'Career' ? navigate('/counsellor') : navigate('/counsellor/Career')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-500 rounded transition-all cursor-pointer ${speciality === "Career" ? "bg-orange-100 text-black" : ""}`}>Career</p>

          <p onClick={()=>speciality === 'Personal Growth' ? navigate('/counsellor') : navigate('/counsellor/Personal%20Growth')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-500 rounded transition-all cursor-pointer ${speciality === "Personal Growth" ? "bg-orange-100 text-black" : ""}`}>Personal Growth</p>

          <p onClick={()=>speciality === 'Behavioral Support' ? navigate('/counsellor') : navigate('/counsellor/Behavioral%20Support')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-500 rounded transition-all cursor-pointer ${speciality === "Behavioral Support" ? "bg-orange-100 text-black" : ""}`}>Behavioral Support</p>

          <p onClick={()=>speciality === 'Overseas Education' ? navigate('/counsellor') : navigate('/counsellor/Overseas%20Education')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-500 rounded transition-all cursor-pointer ${speciality === "Overseas Education" ? "bg-orange-100 text-black" : ""}`}>Overseas Education</p>

          <p onClick={()=>speciality === 'Learning Difficulties' ? navigate('/counsellor') : navigate('/counsellor/Learning%20Difficulties')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-500 rounded transition-all cursor-pointer ${speciality === "Learning Difficulties" ? "bg-orange-100 text-black" : ""}`}>Learning Difficulties</p>

          <p onClick={()=>speciality === 'Exam Prep' ? navigate('/counsellor') : navigate('/counsellor/Exam%20Prep')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-500 rounded transition-all cursor-pointer ${speciality === "Exam Prep" ? "bg-orange-100 text-black" : ""}`}>Exam Prep</p>

          <p onClick={()=>speciality === 'Mental Health' ? navigate('/counsellor') : navigate('/counsellor/Mental%20Health')} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-blue-500 rounded transition-all cursor-pointer ${speciality === "Mental Health" ? "bg-orange-100 text-black" : ""}`}>Mental Health</p>

        </div>
        <div className="w-full grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6">
          {
            filterDoc.map((item,index)=>(
            <div onClick={()=>navigate(`/appointment/${item._id}`)} className='border border-blue-500 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
                <img src={item.image} alt="" className='' />
                <div className='p-4'>
                    <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-600'}`}>
                    <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500'} rounded-full`}></p>
                    { item.available ? <p>Available</p> : <p>Not Available</p>}
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600  font-medium'>{item.speciality}</p>
                </div>
            </div>
        ))
          }
        </div>
      </div>
    </div>
  )
}

export default Counsellor
