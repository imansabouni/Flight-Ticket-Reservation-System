import os
import glob
import re

for file in glob.glob('*.html'):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Remove style block
        content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
        
        # Remove bootstrap links
        content = re.sub(r'<link[^>]+bootstrap[^>]+>', '', content)
        
        # Insert style.css
        if 'href="style.css"' not in content:
            content = content.replace('</head>', '<link rel="stylesheet" href="style.css" />\n</head>')
            
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"Updated {file}")
    except Exception as e:
        print(f"Error processing {file}: {e}")
