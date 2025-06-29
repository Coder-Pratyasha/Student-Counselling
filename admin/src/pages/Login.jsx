import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { CounsellorContext } from '../context/CounsellorContext'

const Login = () => {
   

    const [state,setState] = useState('Admin')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const {setAtoken,backendUrl} = useContext(AdminContext)
    const {setCtoken}=useContext(CounsellorContext)
    const onSubmitHandler = async(event)=>{
        event.preventDefault()
        try{
            if(state==='Admin'){
                const {data} =await axios.post(backendUrl+'/api/admin/login', {email,password})
                if(data.success){
                    localStorage.setItem('atoken',data.token)
                    setAtoken(data.token)
                }
                else
                {
                    toast.error(data.message)
                }
            }
            else{
                const {data} =await axios.post(backendUrl+'/api/counsellor/login',{email,password})
                if(data.success){
                    localStorage.setItem('ctoken',data.token)
                    setCtoken(data.token)
                    console.log(data.token)
                }
                else
                {
                    toast.error(data.message)
                }
            }
        }
        catch(error){
             console.error(error); 
             const message = error.response?.data?.message || "Login failed. Please try again.";
            toast.error(message);
            
        }
    }


  return (
    <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2662086/pexels-photo-2662086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center mx-50 shadow-2xl rounded-2xl">
    <div className="w-full md:w-1/2 bg-white/80 p-6 md:p-8 rounded-lg shadow-lg z-10 max-w-md mx-auto mt-[10%]">
        
    <form className="flex flex-col items-center p-10" onSubmit={onSubmitHandler}>
        <div >
            <p className='flex items-center justify-center mb-5'>
                <span className="text-2xl font-semibold text-center md:text-left ">
                    {state} Login
                </span>
            </p>
            <div className='flex items-center gap-2  mb-3'>
                <p>
                    Email
                </p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" required  className="p-3 bg-gray-100 rounded-lg mb-2"/>
            </div>
            <div className='flex items-center gap-2 mb-3'>
                <p>
                    Password
                </p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" required className="p-3 bg-gray-100 rounded-lg mb-2" />
            </div>
            <button className="bg-orange-300 px-30 py-2 rounded-lg hover:bg-orange-500 hover:text-white mb-5">Login</button>
            {
                state ==='Admin' ?
                <p>Counsellor Login? <span className='underline cursor-pointer text-blue-700' onClick={()=>setState('Counsellor')}>Click here</span></p>:
                <p>Admin Login? <span className='underline cursor-pointer text-blue-700' onClick={()=>setState('Admin')}>Click here</span></p>
            }
        </div>
    </form>
    </div>
    </div>
  )
}

export default Login
