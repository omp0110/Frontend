import React, { useState, useEffect } from "react";
import Chat from "./components/Chat";
import Preview from "./components/Preview";
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [previewUrl, setPreviewUrl] = useState("");
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  useEffect(() => {
    if (previewUrl && window.innerWidth < 768) {
      setShowMobilePreview(true);
    }
  }, [previewUrl]);

  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-200 overflow-hidden">

      {/* Left Chat */}
      <div className="md:w-1/2 w-full h-full backdrop-blur-md bg-white/30 shadow-xl z-0">
        <Chat setPreviewUrl={setPreviewUrl} setShowMobilePreview={setShowMobilePreview} previewUrl={previewUrl} />
      </div>

      {/* Right-side Desktop Preview */}
      <div className="md:w-1/2 w-full h-full hidden md:block">
        <Preview url={previewUrl} />
      </div>

      {/* Mobile Fullscreen Preview */}
      <AnimatePresence>
        {showMobilePreview && previewUrl && (
          <motion.div
            key="mobile-preview"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.35 }}
            className="md:hidden fixed inset-0 z-50 bg-white shadow-2xl flex flex-col rounded-t-xl"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold text-lg">
              <span>📱 Live Preview</span>
              <button
                onClick={() => setShowMobilePreview(false)}
                className="text-white text-xl font-bold px-2 rounded hover:bg-white/20"
              >
                ✖
              </button>
            </div>

            {/* Iframe Preview */}
            <div className="flex-1 overflow-hidden">
              <Preview url={previewUrl} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
