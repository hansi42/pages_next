// pages/api/csv.js
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export default function handler(req, res) {
  // Construct the full path to the CSV file.
  const csvFilePath = path.join(process.cwd(), 'data', 'sbf_fragen.csv');

  // Read the CSV file synchronously (safe in API routes, or you can use async version).
  fs.readFile(csvFilePath, 'utf8', (err, fileData) => {
    if (err) {
      console.error("Error reading the file:", err);
      res.status(500).json({ error: "Failed to read CSV file." });
      return;
    }

    // Parse the CSV data using PapaParse.
    const results = Papa.parse(fileData, {
      delimiter: ',',      // Adjust if your CSV uses a different delimiter
      quoteChar: '|',      // Use pipe as quote character
      skipEmptyLines: true // Skip empty lines
    });

    // Process each row to ensure it has exactly 9 columns, padding missing values with null.
    const rows = results.data.map(row => {
      const paddedRow = [];
      for (let i = 0; i < 9; i++) {
        paddedRow[i] = i < row.length ? row[i] : null;
      }
      return paddedRow;
    });

    // Return the processed data as JSON.
    res.status(200).json({ data: rows });
  });
}
