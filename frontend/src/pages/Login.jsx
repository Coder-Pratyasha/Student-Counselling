import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {

  const { token,setToken,backendUrl } = useContext(AppContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data}=await axios.post(backendUrl+'/api/user/signin',{email,password})
      if(data.success)
      {
        localStorage.setItem('token',data.token)
        setToken(data.token)
      }
      else
      {
        toast.error(data.message)
      }
    }
    catch(error)
    {
      toast.error(error.message)
    }

  
  }
  useEffect(()=>{
    if(token){
    navigate('/')
    }
  },[token])

  

  return (
    
    <div className="min-h-screen bg-orange-100 flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl mx-auto rounded-lg  overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7653084/pexels-photo-7653084.jpeg')] bg-cover bg-center" />
       
        <div className="relative flex flex-col md:flex-row items-center justify-between px-6 py-10 md:py-0 gap-6 md:gap-0 bg-transparent my-10">
          <div className="md:w-1/2 text-orange-300 md:pl-6 text-center md:text-left">
            <h4 className="text-3xl md:text-4xl font-bold leading-snug ">
             Guidance is just one conversation away.
            </h4>
          </div>
          <div className="w-full md:w-1/2 bg-white/80 p-6 md:p-8 rounded-lg shadow-lg z-10 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <h4 className="text-2xl font-semibold mb-6 text-center md:text-left">
                Login
              </h4>

              
              <input
                type="email"
                placeholder="Email"
                className="p-3 bg-gray-100 rounded-lg mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter your password"
                className="p-3 bg-gray-100 rounded-lg mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            

              <button
                
                className="bg-orange-300 py-2 px-3 mt-3 rounded-lg hover:bg-orange-500 hover:text-white"
               
              >
                Login
              </button>

              <p className="text-xs text-slate-500 text-center my-4">Or</p>

              <button
                
                className="bg-orange-300 py-2 px-3 mb-3 rounded-lg hover:bg-orange-500 hover:text-white"
                onClick={() => navigate('/signup')}
              >
                Create an Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Login;
