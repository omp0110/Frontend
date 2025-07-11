import React from "react";
import { motion } from "framer-motion";

export default function Preview({ url }) {
  return (
    <motion.div
      className="h-full w-full px-1 sm:px-0"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <iframe
        src={url || "https://localhost:5173"}
        title="Live Preview"
        className="w-full h-full min-h-[300px] sm:min-h-full rounded-xl sm:rounded-none border-0 shadow-xl"
      ></iframe>
    </motion.div>
  );
}
