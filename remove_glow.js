const fs = require('fs');
const files = ['style.css', 'koltuklar.html', 'fırsat.html'];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove glow animations
  content = content.replace(/,\s*glowPulse.*?alternate/g, '');
  content = content.replace(/glowPulse.*?alternate/g, '');
  content = content.replace(/@keyframes glowPulse\s*\{[^}]*\}/g, '');
  
  // Remove all text-shadow
  content = content.replace(/text-shadow:[^;]+;/g, '');
  
  // Filter out neon box-shadows
  let lines = content.split('\n');
  lines = lines.map(line => {
    if (line.includes('box-shadow:')) {
      // Keep the drop shadow for containers which is black (0, 0, 0)
      if (line.includes('rgba(0, 0, 0')) {
        return line;
      }
      // Remove all other box shadows (cyan, orange, etc)
      return '';
    }
    return line;
  });
  
  fs.writeFileSync(file, lines.join('\n'), 'utf8');
  console.log('Removed glow from', file);
}
