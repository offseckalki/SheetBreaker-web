import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleUpload = async () => {
    if (!file) {
      setStatus('Please select a file first.');
      return;
    }

    setStatus('Uploading...');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        'https://sheetbreaker-api.onrender.com/unprotect',
        formData,
        { responseType: 'blob' }
      );

      const blob = new Blob([res.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const downloadUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(downloadUrl);
      setStatus('✅ Sheet unprotected successfully!');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to unprotect the sheet.');
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".xlsx,.xlsm,.xls"
        onChange={(e) => {
          setFile(e.target.files[0]);
          setStatus('');
          setDownloadUrl('');
        }}
      />
      <button onClick={handleUpload}>Unprotect Sheet</button>
      <p>{status}</p>
      {downloadUrl && (
        <a href={downloadUrl} download="unprotected.xlsx">
          Download Unprotected File
        </a>
      )}
    </div>
  );
}

export default Upload;
