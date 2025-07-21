import React, { useContext, useRef } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import Nav from "../components/Nav"; // Assuming Nav is your enhanced header

export default function Home() {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const UserLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      navigate("/");
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
      // Potentially show a user-friendly error message
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const featureCards = [
    {
      icon: "💡",
      title: "AI-Powered Website Generation",
      description:
        "Simply describe your idea, and our intelligent AI will craft a stunning website tailored to your needs, from design to functionality.",
    },
    {
      icon: "✨", // New icon for prompt enhancement
      title: "Intelligent Prompt Enhancement",
      description:
        "Struggling with what to type? Our AI can analyze your initial ideas and suggest improvements, ensuring you get the best possible website design.",
    },
    {
      icon: "🎨",
      title: "Intuitive Design & Layout",
      description:
        "Get modern, responsive designs with intuitive layouts, ensuring your website looks great and performs flawlessly on any device.",
    },
    // {
    //   icon: "⚡",
    //   title: "Effortless Customization",
    //   description:
    //     "While AI builds the core, you retain full control. Easily customize every element to perfectly match your brand and vision.",
    // },
    {
      icon: "🚀",
      title: "Blazing Fast Deployment",
      description:
        "Go from concept to live in minutes. Our streamlined process ensures your professional website is online quickly and efficiently.",
    },
    // {
    //   icon: "✍️", // Another new icon for "By Your Side"
    //   title: "AI Assistant, Always By Your Side",
    //   description:
    //     "From brainstorming to final touches, your AI assistant provides guidance and support, making the website creation process smooth and enjoyable.",
    // },
  ];

  const faqItems = [
    {
      question: "How does the WebGenie generate websites?",
      answer:
        "Our AI uses advanced natural language processing (NLP) to understand your prompts and combines it with a vast library of design patterns and components. It learns from successful websites to create modern, functional designs unique to your description.",
    },
    // {
    //   question: "Can I customize the website after it's generated?",
    //   answer:
    //     "Absolutely! The AI provides a strong foundation, but you have full control. You can easily modify text, images, colors, layouts, and add new sections using our intuitive editor.",
    // },
    {
      question: "Do I need any coding knowledge?",
      answer:
        "No coding is required! Our platform is designed for everyone, from beginners to experienced designers. Just describe your vision, and the AI handles the technical aspects.",
    },
    {
      question: "What kind of websites can I build?",
      answer:
        "You can build a wide range of websites, including personal portfolios, small business sites, e-commerce stores (basic functionality), landing pages, blogs, and more. If you can describe it, our AI can help create it!",
    },
    {
      question: "Is there a free trial or plan available?",
      answer:
        "Currently, our platform is completely free to use! In the future, we may introduce premium plans with advanced features, but for now, enjoy building and launching your websites at no cost.",

      // "Yes, we offer a free tier that allows you to generate and preview websites. To deploy and unlock advanced features, subscription plans are available. Check our pricing page for details!",
    },
    {
      question: "How does the AI enhance my prompts?",
      answer:
        "When you click 'Enhance Prompt', our AI analyzes your current input for clarity, detail, and potential keywords. It then suggests additions or rephrasings to make your prompt more effective, leading to a more precise and desirable website output.",
    },
  ];

  // Ref to scroll to the features section
  const featuresRef = useRef(null);
  const faqRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden font-sans antialiased mt-2">
      {/* 🔵 Dynamic Gradient Background with subtle animation */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 animate-gradient-shift" />

      {/* 🌐 Abstract Floating Shapes for Creative Touch */}
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

      {/* 🔳 Enhanced Glass Header (assuming Nav component is responsive and styled well) */}
      <Nav />

      {/* ⚡ Hero Section with refined animations and elements */}
      <main className="flex-grow flex flex-col items-center pt-40  md:pt-45 px-4 relative z-10">
        <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeOut" }}
  className="text-center max-w-4xl mb-10"
>
  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-700 via-purple-600 to-blue-500 text-transparent bg-clip-text drop-shadow-lg
             min-h-[8rem] md:min-h-[8rem] flex items-center justify-center"> {/* Key change: Added min-h and flex properties */}
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
    className="mt-8 text-sm md:text-lg text-gray-800 bg-white/40 backdrop-blur-lg px-6 py-3 rounded-xl inline-block shadow-sm leading-relaxed"
  >
    Describe your idea and watch our AI bring it to life with modern
    design, intuitive layout, and powerful functionality.
  </motion.p>

  {/* This button already has a good hover effect */}
  <motion.button
    whileHover={{
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.6)",
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    className=" mt-6 md:mt-12 px-8 py-4 text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-400 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75"
    onClick={() => navigate("/chat")}
  >
    🚀 Start Building Your Dream Site
  </motion.button>
</motion.div>

        {/* --- */}
        {/* Value Proposition / How It Works Section (Visually engaging) */}
        <section className="w-full max-w-6xl mt-5 md:mt-15 py-6 md:py-12 px-6 bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl md:text-4xl font-extrabold mb-12 bg-gradient-to-r from-teal-600 to-blue-500 text-transparent bg-clip-text"
          >
            How It Works: Simple Steps to Your Perfect Website
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                num: "1",
                color: "blue-500",
                title: "Describe Your Vision",
                desc: "Tell our AI what kind of website you need. Be as detailed or as brief as you like!",
              },
              {
                num: "2",
                color: "purple-500",
                title: "AI Generates Your Site",
                desc: "Watch as our AI instantly generates a complete, professional website based on your input.",
              },
              {
                num: "3",
                color: "pink-500",
                title: "Refine & Launch",
                desc: "Make any final tweaks, and then publish your stunning new website to the world!",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center p-6 bg-white/70 rounded-2xl shadow-lg border border-white/80
                transform hover:scale-105 hover:bg-white transition-all duration-300 ease-in-out group"
              >
                <div
                  className={`text-5xl md:text-6xl text-${step.color} mb-4 group-hover:text-opacity-80 transition-colors duration-300`}
                >
                  {step.num}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- */}
        {/* What We Offer Section (Now with an ID for navigation) */}
        <section
          id="features"
          ref={featuresRef}
          className="w-full max-w-6xl mt-24 py-12 px-6 bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-purple-700 to-indigo-600 text-transparent bg-clip-text"
          >
            Discover Our Powerful Features
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center text-center shadow-lg border border-white/80
                transform hover:scale-105 hover:bg-white transition-all duration-300 ease-in-out group"
              >
                <div className="text-4xl md:text-5xl mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {card.icon}
                </div>
                <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors duration-300">
                  {card.title}
                </h4>
                <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-sm md:text-base">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- */}
        {/* Testimonials/Social Proof Section */}
        <section className="w-full max-w-6xl mt-24 py-12 px-6 bg-white/40 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-blue-700 to-purple-600 text-transparent bg-clip-text"
          >
            What Our Users Say
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote:
                  "I never thought building a website could be this easy! The WebGenie understood exactly what I wanted and created a beautiful site in minutes. Highly recommend!",
                author: "Jane Doe, Small Business Owner",
                authorColor: "text-blue-700",
              },
              {
                quote:
                  "As a designer, I appreciate the speed and efficiency this tool offers. It's a fantastic starting point for clients, saving hours of initial setup time.",
                author: "John Smith, Web Designer",
                authorColor: "text-purple-700",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/80
                transform hover:scale-[1.02] hover:bg-white transition-all duration-300 ease-in-out"
              >
                <p className="text-md md:text-lg text-gray-800 italic mb-4">
                  "{testimonial.quote}"
                </p>
                <p className={`font-bold ${testimonial.authorColor}`}>
                  {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- */}
        {/* FAQ Section */}
        <section
          id="faq"
          ref={faqRef}
          className="w-full max-w-6xl mt-24 py-12 px-6 bg-white/30 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50"
        >
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-gradient-to-r from-pink-600 to-orange-500 text-transparent bg-clip-text"
          >
            Frequently Asked Questions
          </motion.h3>
          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-md border border-white/80
                transform hover:shadow-xl hover:border-blue-300 transition-all duration-300 ease-in-out"
              >
                <h4 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {item.question}
                </h4>
                <p className="text-gray-700 text-sm">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- */}
        {/* Call to Action Section (Optional, but good for conversion) */}
        {/* This button already has a good hover effect */}
        <section className="w-full max-w-4xl mt-20 py-10 px-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl shadow-2xl text-white text-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-extrabold mb-6"
          >
            Ready to Revolutionize Your Web Presence?
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl mb-8"
          >
            Join countless others who are bringing their digital dreams to life
            with our AI-powered platform.
          </motion.p>
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="px-12 py-4 text-lg font-bold bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 ease-in-out"
            onClick={() => navigate("/chat")}
          >
            Start Your Project Now!
          </motion.button>
        </section>
      </main>

      {/* --- */}
      {/* Footer */}
      <footer className="w-full bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-white py-12 mt-20 relative z-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20 text-center md:text-left">
            {/* Brand/Logo Section */}
            <div className="col-span-full md:col-span-1 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <h4 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 drop-shadow-md">
                WebGenie AI
              </h4>
              <p className="mt-3 text-gray-400 text-base leading-relaxed">
                Empowering creators to build stunning web presences with the
                magic of AI, no code required.
              </p>
              <div className="flex space-x-5 mt-6">
                <a
                  href="https://x.com/Om_patil2705"
                  aria-label="Twitter"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-300 transition-transform duration-300 transform hover:scale-125"
                >
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/om-patil-587a82274/"
                  aria-label="LinkedIn"
                  target="_blank"
                  className="text-gray-400 hover:text-blue-600 transition-transform duration-300 transform hover:scale-125"
                >
                  <i className="fab fa-linkedin-in text-2xl"></i>
                </a>
                <a
                      href="https://github.com/om151"
                      aria-label="GitHub"
                      target="_blank"
                      className="text-gray-400 hover:text-gray-300 transition-transform duration-300 transform hover:scale-125"
                    >
                      <i className="fab fa-github text-2xl"></i>
                    </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:ml-20">
              <h5 className="text-xl font-bold text-gray-200 mb-6">
                Quick Links
              </h5>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/chat"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg"
                  >
                    Start Building
                  </a>
                </li>
                <li>
                  <a
                    href="#features"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(featuresRef);
                    }}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(faqRef);
                    }}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact & Legal */}
            <div>
              <h5 className="text-xl font-bold text-gray-200 mb-6">
                Contact & Legal
              </h5>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-lg"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            {/* Resources */}
            {/* <div>
              <h5 className="text-xl font-bold text-gray-200 mb-6">
                Connect & Support
              </h5>

              
              <div className="flex space-x-4 mt-6 justify-center md:justify-start">
                <a
                  href="https://x.com/Om_patil2705"
                  aria-label="Twitter"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200 transform hover:scale-125"
                >
                  <i className="fab fa-twitter text-2xl"></i>
                </a>
                <a
                  href="https://github.com/om151"
                  aria-label="GitHub"
                  className="text-gray-400 hover:text-gray-300 transition-colors duration-200 transform hover:scale-125"
                >
                  <i className="fab fa-github text-2xl"></i>
                </a>
                <a
                  href="https://www.linkedin.com/in/om-patil-587a82274/"
                  aria-label="LinkedIn"
                  className="text-gray-400 hover:text-blue-600 transition-colors duration-200 transform hover:scale-125"
                >
                  <i className="fab fa-linkedin-in text-2xl"></i>
                </a>
              </div>
            </div> */}
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} WebGenie. All rights reserved.
            <p className="mt-2">Made with 💙 By Om Patil</p>{" "}
            {/* Added location reference */}
          </div>
        </div>
      </footer>

      {/* Custom Keyframe Animations (Add these to your CSS/Tailwind config if not already there) */}
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
