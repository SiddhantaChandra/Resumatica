import '../styles/uploadform.css';
import PdfIcon from '../img/icons/pdf-icon.png';
import UploadIcon from '../img/icons/upload.png';
import { useState } from 'react';
import { OpenAI } from 'openai';

function UploadForm({
  file,
  setFile,
  resultText,
  isLoading,
  setIsLoading,
  setView,
  setResponse,
  view,
  isParsing,
}) {
  const [tempInput, setTempInput] = useState(null);
  const [hide, setHide] = useState(0);
  console.log(isParsing);

  function handleSubmit(e) {
    e.preventDefault();
    setFile(tempInput);
    setHide(1);
  }

  const prompt =
    'Analyze the following resume and return a json with following keys: Name, SuggestedJobPositions(ex. crimal lawyer, frontend developer, accountant), ResumeScore(out of 10), Improvements(changes that can be made in the resume)' +
    resultText;

  const generateText = async () => {
    setIsLoading(true);
    setView(1);
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_KEY,
      dangerouslyAllowBrowser: true,
    });

    const request = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };

    const response = await openai.chat.completions.create(request);
    // console.log(response.choices[0].message.content);

    setResponse(JSON.parse(response.choices[0].message.content));
    setView(2);
  };

  const handleAnalyze = () => {
    generateText();
  };

  return (
    <>
      {!isLoading ? (
        <div>
          <div>
            <h2 className="hero-text-primary">
              Analyze your resume easily with AI
            </h2>
          </div>
          <form
            className="form"
            action=""
            onClick={() => document.querySelector('.form-control').click()}
          >
            {tempInput ? (
              <div className="uploaded">
                <img src={PdfIcon} alt="" className="pdf-icon" />
                <p className="uploaded-text">{tempInput.name}</p>
              </div>
            ) : (
              <div className="upload">
                <img src={UploadIcon} alt="" className="upload-icon" />
                <p className="uploaded-text">Upload a file to get started</p>
              </div>
            )}
            <input
              type="file"
              className="form-control"
              accept=".pdf"
              hidden
              onChange={({ target: { files } }) => setTempInput(files[0])}
            />
          </form>
          {isParsing === 1 ? (
            <button className="btn-analyze " onClick={handleAnalyze}>
              Analyze
            </button>
          ) : (
            <></>
          )}

          {hide === 1 ? (
            <></>
          ) : (
            <button className="btn-upload" onClick={handleSubmit}>
              Upload
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default UploadForm;
