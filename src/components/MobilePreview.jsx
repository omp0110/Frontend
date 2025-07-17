import React, { useState, useRef, useEffect } from "react";

const MobilePreview = ({
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
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState("html");
  const [viewMode, setViewMode] = useState("preview"); // "preview" or "code"
  const codeOutputRef = useRef(null);
  const isResizing = useRef(false);
  const [codeHeight, setCodeHeight] = useState(192);

  const showMessage = (text, type) => {
    setMessageBox({ visible: true, text, type });
    setTimeout(() => {
      setMessageBox({ visible: false, text: "", type: "" });
    }, 3000);
  };

  const copyCodeToClipboard = () => {
    let textToCopy = "";
    if (activeCodeTab === "html") textToCopy = currentGeneratedHTML;
    else if (activeCodeTab === "css") textToCopy = currentGeneratedCSS;
    else if (activeCodeTab === "js") textToCopy = currentGeneratedJS;

    try {
      const textarea = document.createElement("textarea");
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
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
      URL.revokeObjectURL(url);
    };

    if (currentGeneratedHTML.trim() !== "/* No custom HTML yet */") {
      createAndClickLink(new Blob([currentGeneratedHTML], { type: "text/html" }), "index.html");
    }

    if (currentGeneratedCSS.trim() !== "/* No custom CSS yet */") {
      createAndClickLink(new Blob([currentGeneratedCSS], { type: "text/css" }), "style.css");
    }

    if (currentGeneratedJS.trim() !== "/* No custom JavaScript yet */") {
      createAndClickLink(new Blob([currentGeneratedJS], { type: "text/javascript" }), "script.js");
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
  }, [viewMode,activeCodeTab, currentGeneratedHTML, currentGeneratedCSS, currentGeneratedJS]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const previewBottom =
        document.getElementById("preview-loading")?.getBoundingClientRect().top ?? window.innerHeight;
      const newHeight = previewBottom - e.clientY - 16;
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
    <>
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Website Preview & Code</h2>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow"
          onClick={copyCodeToClipboard}
        >
          Copy Code
        </button>
        <button
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
          onClick={downloadProject}
        >
          Download Project
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow ${
            url ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={() => url && window.open(url, "_blank")}
          disabled={!url}
        >
          Open Full Preview
        </button>
      </div>

      {/* View Toggle Above Display */}
      <div className="flex space-x-2 mb-2 ml-1 sm:ml-2">
        <button
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            viewMode === "preview"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setViewMode("preview")}
        >
          Preview
        </button>
        <button
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            viewMode === "code"
              ? "bg-blue-600 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setViewMode("code")}
        >
          Code
        </button>
      </div>

      {/* Main Display Container */}
      <div className="relative border rounded-lg shadow-md overflow-hidden bg-gray-100 mb-6">
        {/* Preview Area */}
        {viewMode === "preview" && (
          <div className="h-96 w-full relative bg-white">
            <iframe
              src={url || "https://localhost:5173"}
              className="w-full h-full border-none"
            ></iframe>
            {isLoading && (
              <div
                id="preview-loading"
                className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center text-blue-600 font-semibold"
              >
                Generating website...
                <div className="ml-3 animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        )}

       {viewMode === "code" && (
  <div
    className="flex flex-col bg-gray-800 text-white p-4 pt-2 overflow-y-auto"
    style={{
      maxHeight: "calc(100dvh - 130px)", // adjusts height on mobile correctly
      minHeight: "300px", // fallback minimum height
    }}
  >
    <div
      onMouseDown={() => (isResizing.current = true)}
      className="h-2 cursor-row-resize bg-gray-600 mb-2 rounded-t"
      title="Drag to resize"
    ></div>

    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">Generated Code:</h3>
      <div className="flex space-x-2">
        {["html", "css", "js"].map((lang) => (
          <button
            key={lang}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              activeCodeTab === lang
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300"
            }`}
            onClick={() => setActiveCodeTab(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>

    <pre className="overflow-auto flex-1">
      <code id="code-output" ref={codeOutputRef} className="text-sm"></code>
    </pre>
  </div>
)}

      </div>
    </>
  );
};

export default MobilePreview;
