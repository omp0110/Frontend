import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Preview = ({
  url,
  setMessageBox,
  currentGeneratedHTML,
  setCurrentGeneratedHTML,
  currentGeneratedCSS,
  setCurrentGeneratedCSS,
  currentGeneratedJS,
  setCurrentGeneratedJS,
  isLoading,
  setIsLoading,
}) {
  const [activeCodeTab, setActiveCodeTab] = useState("html"); // 'html', 'css', 'js'

  const websitePreviewRef = useRef(null);
  const codeOutputRef = useRef(null);

  const showMessage = (text, type) => {
    setMessageBox({ visible: true, text, type });
    setTimeout(() => {
      setMessageBox({ visible: false, text: "", type: "" });
    }, 3000); // Hide after 3 seconds
  };

 

  const copyCodeToClipboard = () => {
    let textToCopy = "";
    if (activeCodeTab === "html") {
      textToCopy = currentGeneratedHTML;
    } else if (activeCodeTab === "css") {
      textToCopy = currentGeneratedCSS;
    } else if (activeCodeTab === "js") {
      textToCopy = currentGeneratedJS;
    }

    try {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy"); // Fallback for navigator.clipboard.writeText
      document.body.removeChild(textarea);
      showMessage(`${activeCodeTab.toUpperCase()} File Code copied to clipboard!`, `success`);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      showMessage("Failed to copy code.", "error");
    }
  };

  const downloadProject = () => {
    const createAndClickLink = (blob, filename) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url); // Clean up
    };

   

    if (currentGeneratedHTML.trim() !== "/* No custom HTML yet */") {
       createAndClickLink(
      new Blob([currentGeneratedHTML], { type: "text/html" }),
      "index.html"
    );
    }

    if (currentGeneratedCSS.trim() !== "/* No custom CSS yet */") {
      createAndClickLink(
        new Blob([currentGeneratedCSS], { type: "text/css" }),
        "style.css"
      );
    }

    if (currentGeneratedJS.trim() !== "/* No custom JavaScript yet */") {
      createAndClickLink(
        new Blob([currentGeneratedJS], { type: "text/javascript" }),
        "script.js"
      );
    }

    showMessage("Project files downloaded!", "success");
  };

  useEffect(() => {
    if (codeOutputRef.current) {
      let codeContent = "";
      let languageClass = "";
      if (activeCodeTab === "html") {
        codeContent = currentGeneratedHTML;
        languageClass = "language-html";
      } else if (activeCodeTab === "css") {
        codeContent = currentGeneratedCSS;
        languageClass = "language-css";
      } else if (activeCodeTab === "js") {
        codeContent = currentGeneratedJS;
        languageClass = "language-javascript";
      }
      codeOutputRef.current.textContent = codeContent;
      codeOutputRef.current.className = `${languageClass} text-sm`;
    }
  }, [
    activeCodeTab,
    currentGeneratedHTML,
    currentGeneratedCSS,
    currentGeneratedJS,
  ]);

  const [codeHeight, setCodeHeight] = useState(192); // default ~48 * 4 (h-48)
const isResizing = useRef(false);


useEffect(() => {
  const handleMouseMove = (e) => {
    if (!isResizing.current) return;
    const previewBottom = document
      .getElementById("preview-loading")?.getBoundingClientRect().top ?? window.innerHeight;
    const newHeight = previewBottom - e.clientY - 16; // padding offset
    if (newHeight > 100 && newHeight < 600) {
      setCodeHeight(newHeight);
    }
  };

  const handleMouseUp = () => {
    isResizing.current = false;
  };

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
}, []);


  

  return (
    <div className="flex-1 flex flex-col bg-white shadow-lg rounded-l-lg m-4 p-4 overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Website Preview & Code
      </h2>

      {/* Preview Controls */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          id="copy-code-btn"
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg transition duration-200 ease-in-out shadow-md"
          onClick={copyCodeToClipboard}
        >
          Copy Code
        </button>
        <button
          id="download-project-btn"
          className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-lg transition duration-200 ease-in-out shadow-md"
          onClick={downloadProject}
        >
          Download Project
        </button>
        <button
  id="full-preview-btn"
  className={`px-5 py-2 rounded-lg transition duration-200 ease-in-out shadow-md 
    ${url ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
  onClick={() => url && window.open(url, '_blank')}
  disabled={!url}
>
  Open Full Preview
</button>

      </div>

      {/* Website Preview Area */}
      <div className="flex-1 border border-gray-300 rounded-lg overflow-hidden mb-4 shadow-inner flex items-center justify-center bg-gray-50 relative">
        <iframe
          src={url || "https://localhost:5173"}
          className="w-full h-full border-none preview-iframe bg-white"
        ></iframe>
        {isLoading && (
          <div
            id="preview-loading"
            className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center text-blue-600 text-lg font-semibold"
          >
            Generating website...
            <div className="ml-3 animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>

      {/* Code Display Area */}
    {/* Code Display Area */}
{/* Code Display Area */}
<div
  className="bg-gray-800 text-white p-4 pt-2 rounded-lg shadow-md code-display overflow-y-auto"
  style={{ height: `${codeHeight}px` }}
>
  {/* Resize Handle - Now at Top */}
  <div
    onMouseDown={() => (isResizing.current = true)}
    className="h-2 cursor-row-resize bg-gray-600 mb-2 rounded-t"
    title="Drag to resize"
  ></div>

  <div className="flex justify-between items-center mb-2">
    <h3 className="text-lg font-semibold">Generated Code:</h3>
    <div className="flex space-x-2">
      <button
        id="html-tab"
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          activeCodeTab === "html"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
        }`}
        onClick={() => setActiveCodeTab("html")}
      >
        HTML
      </button>
      <button
        id="css-tab"
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          activeCodeTab === "css"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
        }`}
        onClick={() => setActiveCodeTab("css")}
      >
        CSS
      </button>
      <button
        id="js-tab"
        className={`px-3 py-1 rounded-md text-sm font-medium ${
          activeCodeTab === "js"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
        }`}
        onClick={() => setActiveCodeTab("js")}
      >
        JS
      </button>
    </div>
  </div>
  <pre>
    <code id="code-output" ref={codeOutputRef} className="text-sm"></code>
  </pre>
</div>


    </div>
  );
}

export default Preview;
