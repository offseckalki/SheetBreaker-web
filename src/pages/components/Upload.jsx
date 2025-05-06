import React, { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'

export default function Upload() {
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState('idle')
  const [downloadUrl, setDownloadUrl] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    setDownloadUrl(null)
  }

  const handleSubmit = async () => {
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      setStatus('uploading')
      const response = await axios.post('https://sheetbreaker-api.onrender.com/unprotect', formData, {
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setStatus(`Uploading... ${(progressEvent.loaded / progressEvent.total * 100).toFixed(0)}%`)
        },
      })

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = URL.createObjectURL(blob)
      setDownloadUrl(url)
      setStatus('done')
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  return (
    <div className="w-full max-w-md bg-gray-800 p-6 rounded-2xl shadow-lg">
      <input
        type="file"
        accept=".xlsx,.xlsm"
        onChange={handleFileChange}
        className="w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-500 file:text-white hover:file:bg-green-700"
      />
      <button
        onClick={handleSubmit}
        disabled={!file || status === 'uploading'}
        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl disabled:opacity-50"
      >
        Unprotect Sheet
      </button>

      {status !== 'idle' && (
        <motion.p
          className="mt-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {status === 'done' && downloadUrl ? (
            <a href={downloadUrl} download="unprotected.xlsx" className="text-green-400 underline">Download Unprotected File</a>
          ) : status === 'uploading' ? (
            <span>{status}</span>
          ) : status === 'error' ? (
            <span className="text-red-500">Something went wrong. Try again.</span>
          ) : (
            <span>{status}</span>
          )}
        </motion.p>
      )}
    </div>
  )
}