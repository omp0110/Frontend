import React, { useState, useEffect } from "react";

import Preview from "../Components/Preview";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./Home";
import Nav from "../Components/Nav";
import Chat from "../Components/Chat";
import Preview from "../Components/Preview";



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

        
        />

    
      

      {/* Right-side Desktop Preview */}
     
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
        </div>
    
    </>
   

 
  );
}
