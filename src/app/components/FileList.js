'use client';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

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
    <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Uploaded Files</h2>
      <button
        onClick={refreshFiles}
        className="mb-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow hover:from-blue-600 hover:to-blue-800 transition-colors duration-300"
      >
        Refresh Files
      </button>
      <ul className="space-y-4">
        {files && files.length > 0 ? (
          files.map((file) => (
            <li
              key={file.public_id}
              className="p-4 bg-gray-50 rounded-lg flex items-center justify-between shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center">
                <a
                  href={file.secure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 flex items-center mr-4"
                >
                  <FontAwesomeIcon icon={faExternalLinkAlt} className="w-5 h-5 mr-2" />
                  {file.filename || file.public_id}
                </a>
              </div>
              <button
                onClick={() =>
                  downloadFile(
                    file.secure_url,
                    file.filename || `${file.public_id}.${file.format}`
                  )
                }
                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 flex items-center transition-colors duration-300"
              >
                <FontAwesomeIcon icon={faDownload} className="w-5 h-5 mr-2" />
                Download
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No files found</li>
        )}
      </ul>
    </div>
  );
}
