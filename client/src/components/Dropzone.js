import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import uploadlogo from '../img/icons/upload.png';

function Dropzone({ setParseData, setIsParsing }) {
  const [inputFileName, setInputFileName] = useState(null);
  const [inputFile, setInputFile] = useState(null);

  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setInputFile(file);
    setInputFileName(file.name);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    acceptedFiles: 'application/pdf',
    multiple: false,
    onDrop,
  });

  const sendFileToServer = (inputFile) => {
    if (!inputFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', inputFile);

    setIsParsing(1);
    fetch('/convert', {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log('Success', data);
        setParseData(data);
        setIsParsing(0);
        navigate('/edit-personal-info');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleUploadData = () => {
    sendFileToServer(inputFile);
  };

  return (
    <div className="drop-box-container">
      <div className="drop-box dashed-bordercss" {...getRootProps()}>
        <input className="drop-input" {...getInputProps()} />
        {isDragActive ? (
          <div className="upload-box">
            <img src={uploadlogo} alt="Upload Logo" className="upload-logo" />

            <p>Drop the files here ...</p>
            <p className="upload-text-secondary">
              Drop any <u>.pdf</u> or <u>.csv</u> file
            </p>
          </div>
        ) : !inputFileName ? (
          <div className="upload-box">
            <img src={uploadlogo} alt="Upload Logo" className="upload-logo" />
            <p>Just, drag and drop your resume</p>
            <p className="upload-text-secondary">
              Click or drop any <u>.pdf</u> or <u>.csv</u> file
            </p>
          </div>
        ) : (
          <p>{inputFileName}</p>
        )}
      </div>
      <button onClick={handleUploadData} className="upload-btn">
        Upload
      </button>
    </div>
  );
}

export default Dropzone;
