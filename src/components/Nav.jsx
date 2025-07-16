import React, { useContext } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";


export default function Nav () {
    const { user, setUser } = useContext(UserDataContext);
   const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const UserLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/');
      localStorage.removeItem('token');
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
    return(
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-20 py-2.5 backdrop-blur-xl bg-white/30 border-b border-white/40 shadow-lg">
        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 120 }}
          className="text-2xl md:text-3xl font-extrabold text-blue-500 tracking-tight drop-shadow-md"
          onClick={() => navigate("/")}
        >
          WebGenie AI
        </motion.h1>
        {!token && <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 120 }}
          className="space-x-3 md:space-x-6 flex items-center"
        >
          <button className="text-blue-700 font-medium hover:text-blue-900 transition-colors duration-300 relative group"
          onClick={() => navigate("/login")}
          >
            Login
            <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </button>
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
          onClick={() => navigate("/register")}
          >
            Register
          </button>
        </motion.div>}
        {token && <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, type: "spring", stiffness: 120 }}
          className="space-x-3 md:space-x-6 flex items-center"
        >
          
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
           onClick={UserLogout}
          >
            Logout
          </button>
        </motion.div>}
      </header>
    )
}