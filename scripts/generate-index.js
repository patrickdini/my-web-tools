// scripts/generate-index.js
const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '..', 'tools');
const outputFilePath = path.join(__dirname, '..', 'index.html');

// Read all files in the /tools directory
const toolFiles = fs.readdirSync(toolsDir).filter(file => file.endsWith('.html'));

// Generate an HTML list item for each tool
const links = toolFiles.map(file => {
    // 'my-cool-tool.html' -> 'My Cool Tool'
    const toolName = path.basename(file, '.html')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    return `  <li><a href="tools/${file}">${toolName}</a></li>`;
}).join('\n');

// Create the full HTML content for the homepage
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Collection of Tools</title>
    <style>
        body { font-family: system-ui, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; background-color: #f4f4f9; color: #333; }
        h1 { color: #0056b3; }
        ul { list-style-type: none; padding: 0; }
        li { margin: 12px 0; background-color: #fff; border-radius: 5px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        a { display: block; padding: 15px; text-decoration: none; color: #007BFF; font-size: 1.1em; transition: background-color 0.2s; border-radius: 5px; }
        a:hover { background-color: #e9ecef; }
    </style>
</head>
<body>
    <h1>My Tools 🛠️</h1>
    <ul>
${links}
    </ul>
</body>
</html>
`;

// Write the generated HTML to the index.html file
fs.writeFileSync(outputFilePath, htmlContent);

console.log('✅ index.html has been generated successfully!');
