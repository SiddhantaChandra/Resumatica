import React, { useState } from 'react';
import '../styles/excel.css';
import * as XLSX from 'xlsx';

const Excel = ({ response }) => {
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: ['Name', 'Improvements'],
        raw: false,
      });

      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const handleResponseChange = (e) => {
    const { name, value } = e.target;
  };

  const exportToExcel = () => {
    // Create rows for each element in the Improvements array
    const rows = response.Improvements.map((improvement) => ({
      Name: response.Name,
      Improvements: improvement,
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, `${response.Name}.xlsx`);
  };

  return (
    <div>
      <div className="e-row ">
        <p className="e-p t br ">Name:</p>
        <input
          type="text"
          name="Name"
          value={response.Name}
          onChange={handleResponseChange}
          className="e-p input  "
          disabled
        />
      </div>
      <div className="e-row">
        <p className="e-p t  br bt ">Improvements:</p>
        <div className="e-col bt">
          {response.Improvements.map((improvement, index) => (
            <input
              className="e-p input"
              type="text"
              value={improvement}
              onChange={(e) =>
                handleResponseChange({
                  name: 'Improvements',
                  value: e.target.value,
                  index,
                })
              }
              disabled
            />
          ))}
        </div>
      </div>

      <input type="file" onChange={handleFileChange} hidden />

      {/* Display the Excel data */}
      <pre>{JSON.stringify(excelData, null, 2)}</pre>

      {/* Button to export data to Excel */}
      <button onClick={exportToExcel} className="download">
        Download Excel File
      </button>
    </div>
  );
};

export default Excel;
