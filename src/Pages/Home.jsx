import React, { useContext } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import Nav from "../Components/Nav";

export default function Home() {
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

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-sans antialiased">
      {/* 🔵 Dynamic Gradient Background with subtle animation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-gradient-shift" />

      {/* 🌐 Abstract Floating Shapes for Creative Touch */}
      {/* Increased blur and adjusted opacity for a softer, more atmospheric feel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "mirror" }}
        className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-float-one"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{
          duration: 6,
          delay: 1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute bottom-[-100px] right-[-100px] w-[350px] h-[350px] bg-purple-400 rounded-full filter blur-2xl opacity-20 animate-float-two"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.2, scale: 1 }}
        transition={{
          duration: 7,
          delay: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute top-[20%] right-[10%] w-[200px] h-[200px] bg-indigo-200 rounded-full filter blur-xl opacity-15 animate-float-three"
      />

      {/* 🔳 Enhanced Glass Header */}
      <Nav/>

      {/* ⚡ Hero Section with refined animations and elements */}
      <main className="flex-grow flex items-center justify-center pt-24 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center max-w-4xl"
        >
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
            <Typewriter
              options={{
                strings: [
                  "Build Stunning Websites with AI",
                  "Your Vision, Our AI, Infinite Possibilities.",
                  "Create Professional Websites. No Code Needed.",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
                deleteSpeed: 30,
              }}
            />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="mt-8 text-lg md:text-2xl text-gray-800 bg-white/40 backdrop-blur-lg px-6 py-3 rounded-xl inline-block shadow-sm leading-relaxed"
          >
            Describe your idea and watch our AI bring it to life with modern
            design, intuitive layout, and powerful functionality.
          </motion.p>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="mt-12 px-10 py-4 text-md font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-400 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
         onClick={() => navigate("/chat")}
          >
            🚀 Start Building Your Dream Site
          </motion.button>
        </motion.div>
      </main>

      {/* Custom Keyframe Animations (Add these to your CSS/Tailwind config) */}
      <style jsx>{`
        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float-one {
          0% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(20px, 30px) scale(1.05);
          }
          66% {
            transform: translate(-10px, -20px) scale(0.98);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes float-two {
          0% {
            transform: translate(0, 0) scale(1);
          }
          40% {
            transform: translate(-30px, -20px) scale(0.95);
          }
          70% {
            transform: translate(15px, 25px) scale(1.02);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        @keyframes float-three {
          0% {
            transform: translate(0, 0) scale(1);
          }
          30% {
            transform: translate(10px, -15px) scale(1.03);
          }
          60% {
            transform: translate(-20px, 5px) scale(0.97);
          }
          100% {
            transform: translate(0, 0) scale(1);
          }
        }

        .animate-gradient-shift {
          background-size: 400% 400%;
          animation: gradient-shift 20s ease infinite;
        }

        .animate-float-one {
          animation: float-one 8s ease-in-out infinite;
        }
        .animate-float-two {
          animation: float-two 9s ease-in-out infinite;
        }
        .animate-float-three {
          animation: float-three 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
