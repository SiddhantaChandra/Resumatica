import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import * as Switch from '@radix-ui/react-switch';
import '../styles/displayphoto.css';

function DisplayPhoto({ inputFile, setInputFile, setParseData }) {
  const [switchToggle, setSwitchToggle] = useState(0);
  const [radiusProfilePic, setRadiusProfilePic] = useState('45px');

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setInputFile(file);
      setParseData((prev) => {
        const newObj = { ...prev };
        newObj.displayPhoto = file;
        return newObj;
      });
    },
    [setInputFile, setParseData],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png', '.jpeg', '.jpg'],
    },
    multiple: false,
    onDrop,
  });

  const handleSwitchToggle = () => {
    if (switchToggle === 1) setSwitchToggle(0);
    if (switchToggle === 0) setSwitchToggle(1);
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.showPhoto = switchToggle;
      return newObj;
    });
  };

  const handleRadiusSlider = (e) => {
    setRadiusProfilePic(e.target.value);
    setParseData((prev) => {
      const newObj = { ...prev };
      newObj.photoRadius = e.target.value + 'px';
      return newObj;
    });
  };
  return (
    <div className="upload-profile-box">
      <div className="toggle-box">
        <label className="label">Profile Photo</label>
        <Switch.Root
          id="airplane-mode"
          className="SwitchRoot"
          onClick={handleSwitchToggle}
        >
          <Switch.Thumb className="SwitchThumb" />
        </Switch.Root>
      </div>
      {switchToggle === 0 ? (
        <></>
      ) : (
        <div className="image-upload-box">
          <div>
            <div
              {...getRootProps({ className: 'dropzone' })}
              className={inputFile ? 'dropzone' : 'dropzone-expanded'}
            >
              <input {...getInputProps()} />
              {inputFile ? (
                <p>{inputFile.name}</p>
              ) : (
                <p>Click or drop your image here</p>
              )}
            </div>
            {inputFile ? (
              <div className="slider-pic-box">
                <label className="label">Image Border Radius</label>
                <input
                  type="range"
                  min="0"
                  max="45"
                  onChange={handleRadiusSlider}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          {inputFile ? (
            <img
              className="Image"
              src={inputFile ? URL.createObjectURL(inputFile) : <></>}
              alt="Landscape photograph by Tobias Tullius"
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}

export default DisplayPhoto;
