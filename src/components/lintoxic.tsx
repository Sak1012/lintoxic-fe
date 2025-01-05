"use client";

import { useState, useEffect } from "react";

export default function Lintoxic() {
  const [type, setType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [textInput, setTextInput] = useState("");
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
    setFile(null);
    setTextInput("");
    setPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      if (type === "text") {
        reader.onloadend = () => {
          setTextInput(reader.result as string);
        };
        reader.readAsText(selectedFile);
      } else {
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        if (type === "image") {
          reader.readAsDataURL(selectedFile);
        } else if (type === "audio" || type === "video") {
          reader.readAsDataURL(selectedFile);
        }
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
  };

  useEffect(() => {
    if (type === "text") {
      setPreview(null);
    }
  }, [type]);

  return (
    <main className="w-full flex-col items-center font-mono justify-center text-left">
      <select
        className="w-1/2 p-2 m-2 border-2 border-gray-300 rounded-lg"
        onChange={handleType}
      >
        <option value="">Select Type</option>
        <option value="text">Text</option>
        <option value="image">Image</option>
        <option value="audio">Audio</option>
        <option value="video">Video</option>
      </select>

      {type === "text" && (
        <section className="flex flex-col m-2 w-1/2">
          <textarea
            value={textInput}
            onChange={handleTextChange}
            className="h-40 p-2 border-2 border-gray-300 rounded-lg"
            placeholder="Enter your text here"
          />
          <label
            htmlFor="files"
            className="bg-black text-white p-4 mt-5 rounded-md"
          >
            Upload File
          </label>
          <input
            id="files"
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            className="hidden"
          />
        </section>
      )}

      {(type === "image" || type === "audio" || type === "video") && (
        <section className="flex flex-col m-2 w-1/2">
          <label
            htmlFor="files"
            className="bg-black text-white p-4 mt-5 rounded-md"
          >
            Upload File
          </label>
          <input
            id="files"
            type="file"
            accept={
              type === "image"
                ? "image/*"
                : type === "audio"
                  ? "audio/*"
                  : "video/*"
            }
            onChange={handleFileChange}
            className="hidden"
          />
        </section>
      )}

      {file && preview && type !== "text" && (
        <section className="w-1/2 m-2">
          {type === "image" && (
            <img
              src={preview as string}
              alt="Preview"
              className="w-full object-cover"
            />
          )}
          {type === "audio" && (
            <audio controls src={preview as string} className="w-full" />
          )}
          {type === "video" && (
            <video controls src={preview as string} className="w-full" />
          )}
        </section>
      )}
      {type && (
        <button className="w-1/2 bg-black text-white p-4 mt-5 ml-2 rounded-md hover:bg-green-400">
          Analyze
        </button>
      )}
    </main>
  );
}