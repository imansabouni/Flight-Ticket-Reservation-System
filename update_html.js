const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove <style> blocks
  content = content.replace(/<style>[\s\S]*?<\/style>/gi, '');
  
  // Remove bootstrap links
  content = content.replace(/<link[^>]+bootstrap[^>]+>/gi, '');
  
  // Insert style.css if not there
  if (!content.includes('href="style.css"')) {
    content = content.replace(/<\/head>/i, '  <link rel="stylesheet" href="style.css" />\n</head>');
  }
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
}
