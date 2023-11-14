import React, { useState, useEffect } from 'react';
import ConvertApi from 'convertapi-js';
import '../styles/hero.css';
import UploadForm from './UploadForm';
import Loader from './Loader';
import Analysis from './Analysis';

function Hero() {
  const [file, setFile] = useState(null);
  const [resultText, setResultText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState(0);
  const [response, setResponse] = useState('');

  useEffect(() => {
    async function convertAndDisplayResult() {
      if (file) {
        try {
          // Initialize ConvertApi with your API key
          let convertApi = ConvertApi.auth('kh0UpOyhPLmI4tX');

          let params = convertApi.createParams();
          params.add('File', file);
          params.add('SoreFile', 'false');

          const result = await convertApi.convert('pdf', 'txt', params);

          const responseUrl = result.dto.Files[0].Url;

          const fetchUrl = await fetch(responseUrl);
          const text = await fetchUrl.text();
          // console.log(text);
          setResultText(text);
        } catch (error) {
          console.error('Error converting file:', error);
          setResultText('Error occurred during conversion');
        }
      }
    }

    convertAndDisplayResult();
  }, [file]);

  return (
    <div>
      <div>
        {view === 0 ? (
          <div className="section-hero">
            <div className="container-hero">
              <UploadForm
                file={file}
                setFile={setFile}
                resultText={resultText}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setView={setView}
                setResponse={setResponse}
                view={view}
              />
            </div>
            <div className="div-res">
              {resultText && view === 0 ? (
                <>
                  <p className="result-Heading">Parsed text:</p>
                  <p className="result-text">{resultText}</p>
                </>
              ) : (
                <></>
              )}
            </div>
            <div>
              {view === 2 ? (
                <div>
                  <h1>View 3</h1>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div>{view === 1 ? <Loader /> : <></>}</div>
      <div>
        {view === 2 ? (
          <Analysis response={response} resultText={resultText} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Hero;

/*  */
