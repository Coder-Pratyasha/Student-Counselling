import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedCounsellors = ({consId,speciality}) => {
    const {counsellors} = useContext(AppContext)
    const [relCon,setRelCon]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
        if(counsellors.length>0 && speciality){
            const counsellorsData = counsellors.filter((con)=>con.speciality===speciality && con._id!=consId)
            setRelCon(counsellorsData)
        }
    },[counsellors,speciality,consId])
  return (
   <div className="flex flex-col items-center gap-4 py-16 text-gray-900 md:mx-10">
      <h1 className="text-xl font-medium">Similar Counsellors to Book</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list if trusted counsellors</p>
      <div className='w-full grid [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {relCon.slice(0,5).map((item,index)=>(
            <div onClick={()=>{navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='border border-blue-500 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 '>
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
        ))}
      </div>
      <button onClick={()=>{navigate('/counsellor'); scrollTo(0,0)}} className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10">more</button>
    </div>
  )
}

export default RelatedCounsellors
