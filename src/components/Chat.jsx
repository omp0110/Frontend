import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const Chat = ({
  setPreviewUrl,
  setShowMobilePreview,
  previewUrl,
  messageBox,
  currentGeneratedHTML,
  setCurrentGeneratedHTML,
  currentGeneratedCSS,
  setCurrentGeneratedCSS,
  currentGeneratedJS,
  setCurrentGeneratedJS,
  isLoading,
  setIsLoading,
  showMobilePreview,
}) => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const chatAreaRef = useRef(null);
  const [selectedModel, setSelectedModel] = useState("gemini");
  const [isEnhancing, setIsEnhancing] = useState(false);



  const[htmlGenerated, setHtmlGenerated] = useState(false);
  const[cssGenerated, setCssGenerated] = useState(false);

  const handleEnhancedPrompt = async () => {

    if (!prompt.trim()) return;
    setIsEnhancing(true);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/enhance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt }),
    });
     setIsEnhancing(false);

    const data = await response.json();
    setPrompt(data.enhancedPrompt);
  }



useEffect(() => {
  if (messages.some(msg => msg.parts[0].text === "files")) {
    const htmlTimer = setTimeout(() => setHtmlGenerated(true), 5000);
    const cssTimer = setTimeout(() => setCssGenerated(true), 8000);
 
    return () => {
      clearTimeout(htmlTimer);
      clearTimeout(cssTimer);
    };
  }
}, [messages]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getLang = (filename) => {
    const ext = filename.split(".").pop();
    if (ext === "js") return "javascript";
    if (ext === "css") return "css";
    return "html";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setMessages(null);

    const userMessage = { role: "user", parts: [{ text: prompt }] };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);
    setPrompt("");
    setCurrentGeneratedHTML("");
    setCurrentGeneratedCSS("");
    setCurrentGeneratedJS("");


    setMessages((prev) => [
      ...prev,
      { role: "model", parts: [{ text: "Generating website code..." }] },
      { role: "model", parts: [{ text: "files" }] },
    ]);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          model: selectedModel,
        }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status} ${res.statusText}`);

      const data = await res.json();
      setPreviewUrl(`${import.meta.env.VITE_BACKEND_URL}${data.previewUrl}`);

      const folder = data.folderPath;

      // setCurrentGeneratedHTML(parsedJson.html || currentGeneratedHTML);
      // setCurrentGeneratedCSS(parsedJson.css || currentGeneratedCSS);
      // setCurrentGeneratedJS(parsedJson.js || currentGeneratedJS);

      if (folder) {
        // console.log("📂 Folder created:", folder);
        const files = ["index.html", "style.css", "script.js"];
        const newMessages = [];

        for (const file of files) {
          try {
            const res = await fetch(
              `${import.meta.env.VITE_BACKEND_URL}${folder}/${file}`
            );
            const code = await res.text();
            

            if (file == "index.html") {
              setCurrentGeneratedHTML(code || currentGeneratedHTML);
            } else if (file == "style.css") {
              setCurrentGeneratedCSS(code || currentGeneratedCSS);
            } else if (file == "script.js") {
              setCurrentGeneratedJS(code || currentGeneratedJS);
            }

            // console.log(`📄 Loaded ${file} content:`, code);

            newMessages.push({
              role: "model",
              parts: [
                {
                  text: `**${file}**\n\`\`\`${getLang(file)}\n${code}\n\`\`\``,
                },
              ],
            });
          } catch (err) {
            newMessages.push({
              role: "model",
              parts: [
                {
                  text: `⚠️ Could not load ${file}.`,
                },
              ],
            });
          }
        }

        // setMessages((prev) => [...prev, ...newMessages]);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [
              {
                text: "Website generated successfully! Check the preview on the right.",
              },
            ],
          },
        ]);
      }

      //   if (data.messages) {
      //     setMessages((prev) => [...prev, ...data.messages.slice(updatedMessages.length)]);
      //   }
    } catch (error) {
      console.error("❌ Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          parts: [{ text: error.message }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`w-full md:w-1/2 lg:w-2/5 xl:w-1/3 flex flex-col bg-white shadow-lg rounded-r-lg sm:m-1 md:m-4 lg:m-4  p-3 overflow-hidden `}
    >
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {" "}
        <span className="text-3xl font-mono">WebGenie</span> : Your website, one
        prompt away.
      </h1>

      {/* Chat Display Area */}
      <div
        id="chat-area"
        ref={chatAreaRef}
        className="flex-1 overflow-y-auto pr-2 mb-4 chat-area"
      >
       



        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-4 ${
              msg.role === "user" ? "justify-end" : "items-start"
            }`}
          >
            {msg.role === "model" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3">
                AI
              </div>
            )}
            <div
              className={`${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              } p-3 rounded-lg max-w-[80%] shadow-md`}
            >

              {msg.parts[0].text == "files" ? (<>
                <p className="font-semibold text-gray-900 text-base mb-3">
      🚀 Files Generation Status
    </p>

    <div className="space-y-2 text-sm">
      
        <div
         
          className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
        >
          <span className="font-medium text-gray-700">Html</span>
          {!htmlGenerated
           ? (
            <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <span className="text-green-500 text-lg font-semibold">✔</span>
          )}
        </div>
        <div
         
          className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
        >
          <span className="font-medium text-gray-700">Css</span>
          {!cssGenerated ? (
            <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <span className="text-green-500 text-lg font-semibold">✔</span>
          )}
        </div>
        <div
         
          className="flex items-center justify-between px-4 py-2 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition"
        >
          <span className="font-medium text-gray-700">JS</span>
          {!currentGeneratedHTML ? (
            <span className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <span className="text-green-500 text-lg font-semibold">✔</span>
          )}
        </div>
     
    </div></>
              ) : (<p>{msg.parts[0].text}</p>)

              }
              
            </div>
            {msg.role === "user" && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm ml-3">
                You
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input Area */}
      {/* Main Wrapper */}
<div className="mb-2 relative bg-white rounded-xl shadow-sm   p-3">

  {/* Enhanced Prompt Button (Top Right) */}
 <div className="relative w-full max-w-2xl mx-auto bg-white rounded-lg shadow-sm border border-gray-300 focus-within:ring-2 focus-within:ring-blue-500">
  

  <textarea
    id="user-input"
    rows={4}
    placeholder="Describe your dream website......"
    className="w-full px-4 pr-24 pb-4 pt-2 text-gray-800 focus:outline-none bg-transparent resize-none"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    disabled={isLoading}
  />

  <button
    className="absolute bottom-4 right-4 bg-blue-50 text-blue-600 border border-blue-500 hover:bg-blue-100 px-3 py-1.5 text-sm rounded-md font-medium shadow-sm transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    onClick={handleEnhancedPrompt}
    disabled={isLoading}
  >
    ✨ Enhance
  </button>

  {isEnhancing && (
          <div
            id="enhance-loading"
            className="absolute inset-0 bg-transparent backdrop-blur-xs flex items-center justify-center text-blue-600 text-lg font-semibold"
          >
            Enhancing...
            <div className="ml-3 animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          </div>
        )}
</div>


  {/* Bottom Controls */}
  <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
    
    {/* Model Selector */}
    <div className="w-full sm:w-auto">
     
      <select
        id="model-select"
        className="w-full sm:w-40 bg-white border border-gray-300 text-gray-800 text-xs font-normal rounded-lg px-3 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
        value={selectedModel}
        onChange={(e) => setSelectedModel(e.target.value)}
        disabled={isLoading}
      >
        <option value="gemini">Gemini Flash-2.5</option>
        <option value="gpt" disabled className="text-gray-400">
          GPT-4 (Coming Soon)
        </option>
        <option value="custom" disabled className="text-gray-400">
          Claude 3 (Coming Soon)
        </option>
      </select>
    </div>

    {/* Action Buttons */}
    <div className="flex items-center space-x-2">
       {/* Preview */}
      {isMobile && (
        <button
          id="preview-btn"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition duration-200 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          onClick={() => setShowMobilePreview(true)}
          disabled={!previewUrl || !isMobile}
        >
          <span className="text-md">Show Preview</span>
        </button>
      )}
      {/* Send */}
      <button
        id="send-btn"
        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 font-medium rounded-lg transition duration-200 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 font-medium"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
        <span className="text-md font-medium">Send</span>
      </button>

     
    </div>
  </div>
</div>

      {messageBox.visible && (
        <div
          className={`mt-2 p-2 rounded-md ${
            messageBox.type === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {messageBox.text}
        </div>
      )}
    </div>
  );
};

export default Chat;
