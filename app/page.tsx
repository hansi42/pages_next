import Image from "next/image";
import fs from 'fs';
import Papa from 'papaparse';


export default function Page() {

fs.readFile("data/sbf_fragen.csv", "utf8", (err, fileData) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  // Parse the CSV data using PapaParse.
  const results = Papa.parse(fileData, {
    delimiter: ',',         // Adjust if your CSV uses a different delimiter
    quoteChar: '|',         // Set the quote character to |
    skipEmptyLines: true,   // Skip empty lines if needed
    // Since header is not set to true, results.data will be an array of arrays.
  });

  // PapaParse doesn't provide strong type guarantees, so we cast results.data to string[][].
  const data = results.data as string[][];

  // Process each row to ensure it has exactly 9 columns.
  const rows: (string | null)[][] = data.map((row: string[]) => {
    // Create a new array with 9 columns.
    const paddedRow: (string | null)[] = [];
    for (let i = 0; i < 9; i++) {
      paddedRow[i] = (i < row.length) ? row[i] : null;
    }
    return paddedRow;
  });

  // Now 'rows' is analogous to the NumPy array returned by to_numpy()
  console.log(rows);
});
}

