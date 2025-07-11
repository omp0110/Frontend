import React from "react";
import { motion } from "framer-motion";

export default function Preview({ url }) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <iframe
        src={url || "https://localhost:5173"}
        title="Live Preview"
        className="w-full h-full border-0 shadow-xl"
      ></iframe>
    </motion.div>
  );
}
