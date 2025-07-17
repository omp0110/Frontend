import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./Home";

import Chat from "../components/Chat";
import Preview from "../components/Preview";
import Nav from "../components/Nav";


export default function Bot() {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

   const [currentGeneratedHTML, setCurrentGeneratedHTML] = useState(`/* No custom HTML yet */`);
         const [currentGeneratedCSS, setCurrentGeneratedCSS] = useState(`/* No custom CSS yet */`);
         const [currentGeneratedJS, setCurrentGeneratedJS] = useState(`/* No custom JavaScript yet */`);

   const [messageBox, setMessageBox] = useState({ visible: false, text: '', type: '' });

  useEffect(() => {
    if (previewUrl && window.innerWidth < 768) {
      setShowMobilePreview(true);
    }
  }, [previewUrl]);

  return (
    <>
    <Nav/>
    
    <div className="font-sans antialiased bg-gray-100 h-screen flex flex-col pt-15">

            <div className="flex flex-1 overflow-hidden">
      {/* Left Chat */}
     
        <Chat  setPreviewUrl={setPreviewUrl}
          setShowMobilePreview={setShowMobilePreview}
          previewUrl={previewUrl}
          messageBox={messageBox}
          currentGeneratedHTML={currentGeneratedHTML}
          setCurrentGeneratedHTML={setCurrentGeneratedHTML}
          currentGeneratedCSS={currentGeneratedCSS}
          setCurrentGeneratedCSS={setCurrentGeneratedCSS}
          currentGeneratedJS={currentGeneratedJS}
          setCurrentGeneratedJS={setCurrentGeneratedJS}
          isLoading={isLoading} // Pass isLoading state
          setIsLoading={setIsLoading} // Pass setIsLoading function
          showMobilePreview={showMobilePreview} // Pass showMobilePreview state
        />

    
      

      {/* Right-side Desktop Preview */}
     
        
         <div className={`flex-1 flex flex-col bg-white shadow-lg rounded-l-lg m-4 p-4 overflow-hidden hidden md:flex`}>
           <Preview   url={previewUrl}
          setMessageBox={setMessageBox}
          currentGeneratedHTML={currentGeneratedHTML}
          setCurrentGeneratedHTML={setCurrentGeneratedHTML}
          currentGeneratedCSS={currentGeneratedCSS}
          setCurrentGeneratedCSS={setCurrentGeneratedCSS}
          currentGeneratedJS={currentGeneratedJS}
          setCurrentGeneratedJS={setCurrentGeneratedJS}
          isLoading={isLoading} // Pass isLoading state
          setIsLoading={setIsLoading} // Pass setIsLoading function


        />
         </div>

         <AnimatePresence>
            {showMobilePreview && (
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 120 }}
                className="fixed inset-0 bg-white z-50 p-4 overflow-y-auto md:hidden"
              >
                {/* Close Button */}
                <div className="flex justify-end">
                  <button
                    className="text-red-600 text-2xl font-bold"
                    onClick={() => setShowMobilePreview(false)}
                  >
                    ✕
                  </button>
                </div>

                {/* Preview Content */}
                <Preview
                  url={previewUrl}
                  setMessageBox={setMessageBox}
                  currentGeneratedHTML={currentGeneratedHTML}
                  setCurrentGeneratedHTML={setCurrentGeneratedHTML}
                  currentGeneratedCSS={currentGeneratedCSS}
                  setCurrentGeneratedCSS={setCurrentGeneratedCSS}
                  currentGeneratedJS={currentGeneratedJS}
                  setCurrentGeneratedJS={setCurrentGeneratedJS}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>

         
        

    
    </div>
        </div>
    
    </>
   

 
  );
}
