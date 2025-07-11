import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";


export default function Chat({ setPreviewUrl }) {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

    const userMessage = { role: "user", parts: [{ text: prompt }] };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setLoading(true);
    setPrompt("");

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
      if (folder) {
        // console.log("📂 Folder created:", folder);
        const files = ["index.html", "style.css", "script.js"];
        const newMessages = [];

        for (const file of files) {
          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}${folder}/${file}`);
            const code = await res.text();

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

        setMessages((prev) => [...prev, ...newMessages]);
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
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-red-400">
      <h2 className="text-3xl font-bold mb-4 text-white drop-shadow-lg">🧠 Website Maker Bot</h2>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`p-3 max-w-[80%] rounded-xl shadow ${
              msg.role === "user" ? "ml-auto bg-blue-500 text-white" : "mr-auto bg-white text-gray-800"
            }`}
          >
            <strong>{msg.role === "user" ? "You" : "AI"}:</strong>{" "}
            <ReactMarkdown
  components={{
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    code: ({ node, inline, className, children, ...props }) =>
      inline ? (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-pink-600">{children}</code>
      ) : (
        <pre className="bg-gray-900 text-white p-3 rounded-md overflow-x-auto text-sm my-2">
          <code className="whitespace-pre-wrap">{children}</code>
        </pre>
      ),
    p: ({ children }) => <p className="my-2">{children}</p>,
  }}
>
  {msg.parts[0].text}
</ReactMarkdown>


          </motion.div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2 items-center">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-full bg-white/70 backdrop-blur-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your dream website..."
          disabled={loading}
        />
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={loading}
          className={`px-5 py-2 rounded-full font-semibold shadow transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-500 hover:bg-pink-600 text-white"
          }`}
        >
          {loading ? "Thinking..." : "Send"}
        </motion.button>
      </form>
    </div>
  );
}
