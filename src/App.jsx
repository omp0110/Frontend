import React from "react";
import Chat from "./components/Chat";
import Preview from "./components/Preview";

export default function App() {

  const [previewUrl, setPreviewUrl] = React.useState("");
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-r from-purple-400 via-pink-300 to-yellow-200 overflow-hidden">
  <div className="md:w-1/2 w-full h-1/2 md:h-full backdrop-blur-md bg-white/30 shadow-xl">
    <Chat setPreviewUrl={setPreviewUrl} />
  </div>
  <div className="md:w-1/2 w-full h-1/2 md:h-full">
    <Preview url={previewUrl} />
  </div>
</div>

  );
}
