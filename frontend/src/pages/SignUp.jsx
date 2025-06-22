import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    

  };

  const validateEmail = (email) =>
    /\S+@\S+\.\S+/.test(email);

  return (
    <div className="min-h-screen bg-orange-100 flex items-center justify-center px-4">
      <div className="relative w-full max-w-4xl mx-auto rounded-lg  overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2662086/pexels-photo-2662086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center" />
        
        <div className="relative flex flex-col md:flex-row items-center justify-between px-6 py-10 md:py-0 gap-6 md:gap-0 bg-transparent my-10">

          <div className="md:w-1/2 text-white md:pl-6 text-center md:text-left">
            <h4 className="text-3xl md:text-4xl font-bold leading-snug">
              Create your<br />Stories
            </h4>
            <p className="text-sm font-medium mt-4 max-w-xs mx-auto md:mx-0">
              Record your travel experiences and memories in your travel journey
            </p>
          </div>
          <div className="w-full md:w-1/2 bg-white/80 p-6 md:p-8 rounded-lg shadow-lg z-10 max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <h4 className="text-2xl font-semibold mb-6 text-center md:text-left">
                Create Your Account
              </h4>

              <input
                type="text"
                placeholder="Enter your name"
                className="p-3 bg-gray-100 rounded-lg mb-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
                onClick={()=>navigate('/')}
              >
                Sign Up
              </button>

              <p className="text-xs text-slate-500 text-center my-4">Or</p>

              <button
               
                className="bg-orange-300 py-2 px-3 mb-3 rounded-lg hover:bg-orange-500 hover:text-white"
                onClick={() => navigate("/login")}
              >
                Already Have An Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
