const fs = require('fs');
const path = require('path');

const dir = '.';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const newFooter = `  <footer>
    <div class="footer-content">
      <span style="color: #764ba2; font-weight: 800;"><i class="fa-solid fa-plane"></i> ZAKAN BİLET © 2025</span>
      <span class="divider">|</span>
      <a href="giris.html" style="color: #4facfe;"><i class="fa-solid fa-house"></i> Ana Sayfa</a>
      <a href="hakkimizda.html" style="color: #f72585;"><i class="fa-solid fa-circle-info"></i> Hakkımızda</a>
      <a href="iletisim.html" style="color: #f8961e;"><i class="fa-solid fa-envelope"></i> İletişim</a>
    </div>
  </footer>`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const footerRegex = /<footer[\s\S]*?<\/footer>/i;
  
  if (footerRegex.test(content)) {
    content = content.replace(footerRegex, newFooter);
    fs.writeFileSync(file, content);
    console.log(`Updated colorful footer in ${file}`);
  }
}
