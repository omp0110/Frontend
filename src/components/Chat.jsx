import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";


const Chat = ({ setPreviewUrl,setShowMobilePreview , previewUrl,messageBox, currentGeneratedHTML,
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
    

    const userMessage = { role: "user", parts: [{ text: prompt }] };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);
    setPrompt("");

    setMessages((prev) => [
      ...prev,{ role: "model", parts: [{ text: "Generating website code..." }] }
    ])

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) throw new Error("Failed to generate website");

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
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${folder}/${file}`);
            const code = await res.text();

            if(file == "index.html"){
               setCurrentGeneratedHTML(code || currentGeneratedHTML);
            }else if(file == "style.css"){
                setCurrentGeneratedCSS(code || currentGeneratedCSS);
            }else if(file == "script.js"){
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
      ...prev,{ role: "model", parts: [{ text: "Website generated successfully! Check the preview on the right." }] }
    ])
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
          parts: [{ text: "❌ Failed to generate site. Please try again later." }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 flex flex-col bg-white shadow-lg rounded-r-lg m-4 p-3 overflow-hidden">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center"> <span className="text-3xl font-mono">WebGenie</span> : Your website, one prompt away.</h1>

                    {/* Chat Display Area */}
                    <div id="chat-area" ref={chatAreaRef} className="flex-1 overflow-y-auto pr-2 mb-4 chat-area">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex mb-4 ${msg.role === 'user' ? 'justify-end' : 'items-start'}`}>
                                {msg.role === 'model' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm mr-3">AI</div>
                                )}
                                <div className={`${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'} p-3 rounded-lg max-w-[80%] shadow-md`}>
                                    <p>{msg.parts[0].text}</p>
                                </div>
                                {msg.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm ml-3">You</div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Chat Input Area */}
                    <div className="flex items-center border-t pt-4">
                        <input
                            type="text"
                            id="user-input"
                            placeholder="Describe your dream website......"
                            className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            // onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                            disabled={isLoading}
                        />
                        <div className="flex items-center space-x-2">
                          <button
                            id="send-btn"
                            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-r-lg transition duration-200 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleSubmit}
                            disabled={isLoading}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                        { <button
  id="preview-btn"
  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition duration-200 ease-in-out shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
  onClick={() => setShowMobilePreview(true)}
  disabled={!previewUrl || !isMobile}
>
  
  <span className="text-sm font-medium">Show preview</span>
</button>}
                        </div>

                    </div>
                    {messageBox.visible && (
                        <div className={`mt-2 p-2 rounded-md ${messageBox.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {messageBox.text}
                        </div>
                    )}
                </div>
  );
}

export default Chat;
