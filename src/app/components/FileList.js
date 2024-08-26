'use client';
import { useState, useEffect } from 'react';

export default function FileList() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/api/list');
      const data = await response.json();
      console.log('API response:', data);
      setFiles(data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const refreshFiles = () => {
    fetchFiles();
  };

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <div>
      <h2>Uploaded Files</h2>
      <button onClick={refreshFiles}>
        Refresh Files
      </button>
      <ul>
        {files && files.length > 0 ? (
          files.map((file) => (
            <li key={file.public_id}>
              <a href={file.secure_url} target="_blank" rel="noopener noreferrer">
                {file.filename || file.public_id}
              </a>
              <button
                onClick={() => downloadFile(file.secure_url, file.filename || `${file.public_id}.${file.format}`)}
              >
                Download
              </button>
            </li>
          ))
        ) : (
          <li>No files found</li>
        )}
      </ul>
    </div>
  );
}