import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl('');
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('https://your-render-url/unprotect', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      if (data.download_url) {
        setDownloadUrl(`https://your-render-url${data.download_url}`);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>🛡️ SheetBreaker Web</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Processing...' : 'Unprotect File'}
      </button>
      {downloadUrl && (
        <p>
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            Download Unprotected File
          </a>
        </p>
      )}
    </div>
  );
}

export default App;
