// utils.js
export async function readCSV(filePath) {
    const response = await fetch(filePath);
    const text = await response.text();
    const rows = text.split('\n').map(row => row.split(','));
    
    // Assuming the first row contains headers
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
        const entry = {};
        row.forEach((cell, index) => {
            entry[headers[index]] = cell.trim();
        });
        return entry;
    });
    
    return data;
}
