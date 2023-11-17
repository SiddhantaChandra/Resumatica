import React, { useState } from 'react';
import OpenAI from 'openai';
import '../styles/dashbord.css';
import Careers from './Careers';
import Improvements from './Improvements';
import Roadmap from './Roadmap';

function Dashboard1({ response }) {
  const [detailedPath, setDetailedPath] = useState('');
  const [selectedPath, setSelectedPath] = useState('');

  const generateDetailedPath = async (el) => {
    setSelectedPath(el);
    const prompt =
      'Generate a jsonfile with a single key being job1 and value being an array of  string being the study roadmap for' +
      el;
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_KEY,
      dangerouslyAllowBrowser: true,
    });

    const request = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    };

    const response = await openai.chat.completions.create(request);
    console.log(response.choices[0].message.content);

    setDetailedPath(JSON.parse(response.choices[0].message.content));
  };

  const handlePath = (el) => {
    generateDetailedPath(el);
  };

  return (
    <div className="d-dashboard">
      <Improvements response={response} />
      <Careers
        response={response}
        handlePath={handlePath}
        selectedpath={selectedPath}
      />
      {detailedPath !== '' ? (
        <Roadmap detailedPath={detailedPath} selectedPath={selectedPath} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default Dashboard1;
