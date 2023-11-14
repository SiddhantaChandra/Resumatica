# Resumtica

Resumtica is an application that leverages GPT-4 to analyze resumes, providing a score, suggested improvements, and potential career paths. Additionally, Resumtica can generate an Excel file containing the user's name and suggested improvements.

## Features

- **Resume Analysis**: Resumtica uses GPT-4 to analyze resumes and provide valuable insights.
- **Score Calculation**: Users receive a score out of 10 based on the analysis of their resume.
- **Career Path Suggestions**: Resumtica suggests potential career paths based on the content of the resume.
- **Improvement Recommendations**: The application offers suggestions for improving the resume to enhance its overall quality.
- **Excel Generation**: Resumtica generates an Excel file containing the user's name and suggested improvements.

## Technologies Used

- **React**: The frontend is built using React, providing a dynamic and responsive user interface.
- **ConvertApi**: The application utilizes the ConvertApi library to convert PDF resumes to text format.
- **OpenAI GPT-4**: GPT-4 is employed for natural language processing and understanding in resume analysis.
- **react-simple-pie-chart**: This library is used to display the score as a pie chart in the analysis results.
- **xlsx**: The xlsx library is employed for reading and writing Excel files.

## Usage

1. Upload your resume in PDF format.
2. The application will convert the PDF to text and analyze its content.
3. Receive a score, career path suggestions, and improvement recommendations.
4. Optionally, generate an Excel file with your name and suggested improvements.

## Getting Started

To run Resumtica locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/Resumtica.git`
2. Navigate to the project directory: `cd Resumtica`
3. Install dependencies: `npm install`
4. Set up your API keys for ConvertApi and OpenAI in the appropriate components.
5. Start the development server: `npm start`

## Components

### `Hero.js`

The main component managing the file upload, conversion, and rendering of analysis results.

### `UploadForm.js`

Responsible for rendering the file upload form, handling file input, and initiating the analysis.

### `Analysis.js`

Displays the analysis results, including the score, career paths, and improvement recommendations. Also provides an option to generate an Excel file.

### `Excel.js`

Generates an Excel file based on the user's name and suggested improvements.

## Contributors

- [Siddhanta Chandra](https://github.com/SiddhantaChandra)

Feel free to contribute to Resumtica by opening issues or submitting pull requests!
