import os
import re

html_path = 'index.html'
sections_dir = 'sections'

if not os.path.exists(sections_dir):
    os.makedirs(sections_dir)

with open(html_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define boundaries using regex or string splits
sections = {
    'hero.html': (r'<!-- Hero Section -->\s*<section class="section hero" id="home">.*?</section>', '<!-- Hero Section -->'),
    'about.html': (r'<!-- About Section -->\s*<section class="section about" id="about">.*?</section>', '<!-- About Section -->'),
    'skills.html': (r'<!-- Skills Section -->\s*<section class="section skills" id="skills">.*?</section>', '<!-- Skills Section -->'),
    'portfolio.html': (r'<!-- Portfolio Section -->\s*<section class="section portfolio" id="projects">.*?</section>', '<!-- Portfolio Section -->'),
    'network.html': (r'<!-- Mentors & Friends Section -->\s*<section class="section network" id="network">.*?</section>', '<!-- Mentors & Friends Section -->'),
    'blog.html': (r'<!-- Blog Section -->\s*<section class="section blog" id="blog">.*?</section>', '<!-- Blog Section -->'),
    'contact.html': (r'<!-- Contact Section -->\s*<section class="section contact" id="contact">.*?</section>', '<!-- Contact Section -->'),
    'footer.html': (r'<!-- Footer -->\s*<footer class="footer">.*?</footer>', '<!-- Footer -->'),
    'side-panel.html': (r'<!-- Side Panel -->\s*<div class="side-panel" id="sidePanel">.*?</div>', '<!-- Side Panel -->')
}

new_content = content
for filename, (pattern, comment) in sections.items():
    match = re.search(pattern, new_content, re.DOTALL)
    if match:
        snippet = match.group(0)
        with open(os.path.join(sections_dir, filename), 'w', encoding='utf-8') as sf:
            sf.write(snippet)
        
        # Replace in new_content
        replacement = f'{comment}\n        <div data-include="sections/{filename}"></div>'
        # Special case for side-panel which is outside main
        if filename == 'side-panel.html':
            replacement = f'    {comment}\n    <div data-include="sections/{filename}"></div>'
            
        new_content = new_content.replace(snippet, replacement)

with open(html_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Extraction complete.")
