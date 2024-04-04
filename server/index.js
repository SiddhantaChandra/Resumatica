const express = require('express');
const multer = require('multer');
const fs = require('fs');
const bodyParser = require('body-parser');

require('dotenv').config();

const OpenAI = require('openai');
const openAI = new OpenAI({ apiKey: process.env.OPENAI_KEY });

const convertapi = require('convertapi')(process.env.CONVERTAPI_KEY);
// Google
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMAPI_KEY);

const app = express();
const port = 5000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

let jsonObj;

// const cors = require('cors');

// const allowedOrigins = [
//   'https://resumatica.netlify.app',
//   'http://localhost:3000',
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//   }),
// );

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
    console.log(tempFilePath);

    const result = await convertapi.convert(
      'txt',
      { File: tempFilePath },
      'pdf',
    );

    // Delete temp file
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err}`);
      }
    });

    //     // retrun res
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

    // console.log(completion.choices[0].message.content);

    // console.log(text);
    jsonObj = JSON.parse(completion.choices[0].message.content);
    console.log(jsonObj);

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

// app.post('/convert', upload.single('pdfFile'), async (req, res) => {
//   // const text = fs.readFileSync('./res1.txt', 'utf8');
//   jsonObj = {
//     name: 'Jane Kustler',
//     phone: '+12 34567 89101',
//     email: 'info@jankuester.com',
//     homeaddress: 'Bremen, Germany',
//     summary: null,
//     linkedin: 'mark-zuckerberg-618bba58',
//     education: [
//       {
//         institution: 'University of Bremen',
//         gpa: null,
//         degree: 'M.Sc. Digital Media',
//         dates: '2015 / 07',
//         thesis: 'Semi Automated Scoring in Technology Based Assessment',
//         description:
//           'Developed and evaluated an algorithm for semi automated scoring of spreadsheet data',
//       },
//       {
//         institution: 'University of Bremen',
//         gpa: '8.56/10',
//         degree: 'Master Project - PrIMA',
//         dates: '2012 - 2013',
//         description:
//           'Co-Invented a touch table application for medical support, co-developed software (Java). Formed a scrum team, maintained project dev server (Debian), surveyed target audience',
//       },
//       {
//         institution: 'University of Bremen',
//         gpa: '7.8/10',
//         degree: 'Master Studies Digital Media',
//         dates: '2012 - 2015',
//         description:
//           'Inter-cultural classes in English, covering special topics in computer science and design. Professionalized in research methods, software development and e-assessment',
//       },
//       {
//         institution: 'University of Melbourne',
//         gpa: null,
//         degree: 'Semester Abroad',
//         dates: '2009 - 2010',
//         description:
//           'Mastered six months of study and trans-cultural experience in Melbourne, Australia. Finished machine programming, information visualization, professional essay writing',
//       },
//       {
//         institution: 'University of Bremen',
//         gpa: null,
//         degree: 'Bachelor Studies Digital Media',
//         dates: '2007 - 2012',
//         description:
//           'Fundamentals in Computer Science. Bachelor thesis focused on experimental redesign of the keyboard to support functional illiterates.',
//       },
//     ],
//     workexperience: [
//       {
//         position: 'Fullstack Javascript Engineer',
//         employer: 'University of Bremen',
//         location: null,
//         dates: '2016 / 09',
//         responsibilities: [
//           'Invent a realtime classroom management using Meteor and React',
//           'Design software architecture and leading development',
//         ],
//         technologiesused: ['Meteor', 'Javascript', 'React'],
//       },
//       {
//         position: 'IT Consultant',
//         employer: 'We4IT GmbH Bremen',
//         location: null,
//         dates: '2014 - 2016',
//         responsibilities: [
//           'Realize projects in XPages and We4IT Aveedo, monitor project status, conduct reports',
//           'Integrated Camunda BPMN engine and BPMN.IO modeler in We4IT Aveedo',
//         ],
//         technologiesused: [
//           'XPages',
//           'IBM Notes Domino',
//           'Camunda BPMN',
//           'BPMN.IO',
//         ],
//       },
//       {
//         position: 'Scientific Employee / Software Development',
//         employer: 'University of Bremen',
//         location: null,
//         dates: '2012 - 2014',
//         responsibilities: [
//           'Invented a flexible assessment framework, targeting industrial trainees',
//           'Supervised software development lifecycle, Recruited team members',
//         ],
//         technologiesused: ['Assessment Framework', 'Software Development'],
//       },
//       {
//         position: 'Project Management Simulation Training',
//         employer: 'Getoq Consulting',
//         location: null,
//         dates: '2011 / 11',
//         responsibilities: [
//           'Performed a two-day project simulation from management perspective',
//           'Topics included customer contracts, change management, controlling, operational tasks',
//         ],
//         technologiesused: null,
//       },
//       {
//         position: 'Student Assistant / Programmer',
//         employer: 'otulea.uni-bremen.de',
//         location: null,
//         dates: '2010 - 2011',
//         responsibilities: [
//           'Realized an online diagnosis platform for workforce literacy development (Flex)',
//           'Modeled software design, implemented various prototypes, conducted usability tests',
//         ],
//         technologiesused: ['Flex'],
//       },
//     ],
//     project: [
//       {
//         projectname: 'Sorting Algorithm Visualizer',
//         date: '2019',
//         description:
//           'Implemented an efficient visualiser for popular Algorithms using minimalistic User Interface. Supports effortless integration to client websites on demand.Supports effortless integration to client websites on demand.Supports effortless integration to client websites on demand.Supports effortless integration to client websites on demand.Supports effortless integration to client websites on demand.',
//       },
//       {
//         projectname: 'Stack OverFlow clone',
//         date: null,
//         description:
//           'Implemented the functionalities of the popular communal learning platform for developers, StackOverflow by making a responsive clone out of an efficient stack of tools.',
//       },
//       {
//         projectname: 'Stack OverFlow clone',
//         date: null,
//         description:
//           'Implemented the functionalities of the popular communal learning platform for developers, StackOverflow by making a responsive clone out of an efficient stack of tools.',
//       },
//       {
//         projectname: 'Stack OverFlow clone',
//         date: null,
//         description:
//           'Implemented the functionalities of the popular communal learning platform for developers, StackOverflow by making a responsive clone out of an efficient stack of tools.',
//       },
//     ],
//     certifications: [
//       {
//         certificatename: 'Certification of merit in Python by NPTEL',
//         institutename: 'NPTEL',
//         date: null,
//       },
//       {
//         certificatename:
//           'Certification of completion of Ethical Leadership Through Giving Voice to Values',
//         institutename: null,
//         date: null,
//       },
//       {
//         certificatename:
//           'Certificate of completion of Introduction to Data Science and scikit-learn in Python',
//         institutename: null,
//         date: null,
//       },
//     ],
//     skills:
//       'Project Management, Software Development, Consulting, Meteor, Javascript, Bootstrap, Mongodb, Git, Webstorm, Sourcetree, Terminal, Global Game Jam, Sci-Fi series, Stackoverflow, Fitness and Martial Arts',
//   };
//   // jsonObj = {
//   //   name: null,
//   //   phone: null,
//   //   email: null,
//   //   homeaddress: null,
//   //   summary: null,
//   //   linkedin: null,
//   //   education: null,
//   //   workexperience: null,
//   //   project: null,
//   //   certifications: null,
//   //   skills: null,
//   // };

//   res.send(jsonObj);
// });

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
  // console.log(JSON.parse(completion.choices[0].message.content));
  res.send(JSON.parse(completion.choices[0].message.content));
});

app.use(bodyParser.json());

app.post('/improve-summary', async (req, res) => {
  const prompt =
    'Analyze the following json resume and write the  summary section return as JSON as {answer: "..."} (The summary section is the first part of a resume after the header section. This sums up your skills and experience in up to 3 sentences.):' +
    JSON.stringify(req.body);
  // console.log(prompt);

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
  // console.log(JSON.parse(completion.choices[0].message.content));
  res.send(JSON.parse(completion.choices[0].message.content));
  // res.send(prompt);
});

app.use(bodyParser.json());

app.post('/career-suggestion', async (req, res) => {
  const prompt =
    'I will give you my json resume, analyze and suggest 5 course suggestions that align with my existing skills and experience and ONLY return in JSON format as example:{Course:[{name: "Advanced JavaScript Frameworks (e.g., React, Angular, Vue.js)", rationale: "You already have experience with JavaScript and React. Deepening your knowledge of advanced frameworks will enhance your front-end development skills and employability.", benefits:"Allows you to build complex and interactive web applications, stay current with industry trends, and potentially explore opportunities in front-end development or full-stack development."}, {...}]} and here is my json resume:' +
    JSON.stringify(req.body);
  // console.log(prompt);

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
  // console.log(JSON.parse(completion.choices[0].message.content));
  res.send(JSON.parse(completion.choices[0].message.content));
  // res.send(prompt);
});

// app.use(bodyParser.json());

// app.post('/career-suggestion', async (req, res) => {
//   const prompt =
//     'I will give you my json resume, analyze and suggest 5 course suggestions that align with my existing skills and experience and ONLY return in JSON format as example:{Course:[{name: "Advanced JavaScript Frameworks (e.g., React, Angular, Vue.js)", rationale: "You already have experience with JavaScript and React. Deepening your knowledge of advanced frameworks will enhance your front-end development skills and employability.", benefits:"Allows you to build complex and interactive web applications, stay current with industry trends, and potentially explore opportunities in front-end development or full-stack development."}, {...}]} and here is my json resume:' +
//     JSON.stringify(req.body);

//   const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response;

//   console.log(text);

//   res.send(JSON.stringify(text));
//   // res.send(prompt);
// });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
