import React from 'react'
import Upload from './components/Upload'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
      <h1 className="text-4xl font-bold text-green-400 mb-6 font-mono">SheetBreaker</h1>
      <Upload />
      <footer className="mt-10 text-gray-500 text-sm">&copy; 2025 SheetBreaker | All Rights Reserved</footer>
    </div>
  )
}