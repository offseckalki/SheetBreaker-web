import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("Ready");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an XLSX file");
    setStatus("Uploading and scanning...");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("https://sheetbreaker-api.onrender.com/unprotect", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.download_url) {
        setStatus("Done! Downloading...");
        window.location.href = "https://sheetbreaker-api.onrender.com" + data.download_url;
      } else {
        setStatus("Failed: " + (data.error || "Unknown Error"));
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <>
      <Head>
        <title>SheetBreaker 1.2</title>
        <meta name="description" content="Unprotect .xlsx files instantly - SheetBreaker by offseckalki" />
      </Head>

      <div className="min-h-screen bg-black text-lime-400 flex flex-col justify-center items-center px-4">
        <h1 className="text-4xl font-bold mb-2">SheetBreaker</h1>
        <p className="text-sm mb-6">Made with the help of ChatGPT-4.0 👀</p>
        <p className="text-xs text-gray-400 mb-8">
          by <a href="https://offseckalki.github.io" className="underline hover:text-white">offseckalki</a>
        </p>

        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className="mb-4 p-2 border border-lime-500 bg-black text-white"
        />
        <button
          onClick={handleUpload}
          className="bg-lime-500 text-black px-6 py-2 rounded hover:bg-lime-400 transition"
        >
          Unprotect File
        </button>
        <p className="mt-4 text-sm text-gray-300">{status}</p>
      </div>
    </>
  );
}