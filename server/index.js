const express = require('express');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');

require('dotenv').config();

const OpenAI = require('openai');
const openAI = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const convertapi = require('convertapi')(process.env.CONVERTAPI_KEY);

const app = express();
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let jsonObj;

const fetchUrl = async (url) => {
  try {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error fetching URL:', error);
    throw error;
  }
};

app.post('/convert', upload.single('pdfFile'), async (req, res) => {
  let tempFilePath;
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded' });
    }

    const pdfBuffer = req.file.buffer;

    tempFilePath = './temp.pdf';
    fs.writeFileSync(tempFilePath, pdfBuffer);

    const result = await convertapi.convert(
      'txt',
      { File: tempFilePath },
      'pdf',
    );

    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });

    const convertedFileUrl = result.response.Files[0].Url;
    const text = await fetchUrl(convertedFileUrl);

    const prompt = `Transform the following structured data into a JSON object. If data not found then return null for the key. {
          "name": "string",
          "phone": "single string, only one phone number",
          "email": "string",
          "homeaddress": "string",
          "summary": "return string or null if no profile summary is found",
          "linkedin": "string",
          "education": [
            {
              "institution": "string",
              "gpa": "string",
              "degree": "string",
              "dates": "string",
            }
          ],
          "workexperience": [
            {
              "position": "string",
              "employer": "string",
              "location": "string",
              "dates": "string",
              "responsibilities": ["array of strings"],
              "technologiesused": "string seperated by commas": example C++, //Java, React, Excel, PowerBi, tally, cms"
            }
          ],
          "project":[
            {
              "projectname":"string",
              "description":"string"
              "technologiesused": "string seperated by commas": example C++, //Java, React, Excel, PowerBi, tally, cms"
            }
          ],
          "certifications":[
            {
              "certificatename":"string",
              "institutename":"string",
              "date":"string"
            }
          ],
          "skills":"string seperated by commas"
        }`;

    // OPENAI Call
    const completion = await openAI.chat.completions.create({
      model: 'gpt-3.5-turbo-0125',
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      temperature: 0,
    });

    jsonObj = JSON.parse(completion.choices[0].message.content);

    res.send(jsonObj);
  } catch (error) {
    if (tempFilePath) {
      fs.unlink(tempFilePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
        }
      });
    }
    console.error('Error converting file:', error);
    res.status(500).json({ message: 'Error converting file' });
  }
});

app.use(express.text());
app.post('/improve-reponsibility', async (req, res) => {
  const prompt =
    'You are an experienced HR, you expertise is helping others improve their resume. With respect to the json:';
  const text =
    jsonObj +
    'Improve this responsibility showing impact keeping the keywords (return json with key answer):' +
    req.body;
  const completion = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: prompt,
      },
      {
        role: 'user',
        content: text,
      },
    ],
    temperature: 0,
  });

  res.send(JSON.parse(completion.choices[0].message.content));
});

app.use(bodyParser.json());

app.post('/improve-summary', async (req, res) => {
  const prompt =
    'Analyze the following json resume and write the  summary section return as JSON as {answer: "..."} (The summary section is the first part of a resume after the header section. This sums up your skills and experience in up to 3 sentences.):' +
    JSON.stringify(req.body);

  const completion = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: prompt,
      },
    ],
    temperature: 0,
  });

  res.send(JSON.parse(completion.choices[0].message.content));
});

app.use(bodyParser.json());

app.post('/career-suggestion', async (req, res) => {
  const prompt =
    'I will give you my json resume, analyze and suggest 5 course suggestions that align with my existing skills and experience and ONLY return in JSON format as example:{Course:[{name: "Advanced JavaScript Frameworks (e.g., React, Angular, Vue.js)", rationale: "You already have experience with JavaScript and React. Deepening your knowledge of advanced frameworks will enhance your front-end development skills and employability.", benefits:"Allows you to build complex and interactive web applications, stay current with industry trends, and potentially explore opportunities in front-end development or full-stack development."}, {...}]} and here is my json resume:' +
    JSON.stringify(req.body);

  const completion = await openAI.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: prompt,
      },
    ],
    temperature: 0,
  });

  res.send(JSON.parse(completion.choices[0].message.content));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
