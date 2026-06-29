import glob
import os

html_files = glob.glob('*.html')

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Cache busting for CSS
    content = content.replace('assets/css/books-page.css?v=1', 'assets/css/books-page.css?v=2')
    # Cache busting for JS
    content = content.replace('assets/js/books-page.js?v=1', 'assets/js/books-page.js?v=2')
    content = content.replace('assets/js/movies.js?v=1', 'assets/js/movies.js?v=2')
    content = content.replace('assets/js/sport.js?v=1', 'assets/js/sport.js?v=2')
    content = content.replace('assets/js/travel.js?v=1', 'assets/js/travel.js?v=2')
    content = content.replace('assets/js/ideas.js?v=1', 'assets/js/ideas.js?v=2')
    
    # Also update main.css version just in case
    content = content.replace('assets/css/main.css?v=3', 'assets/css/main.css?v=4')
    content = content.replace('assets/js/script.js?v=3', 'assets/js/script.js?v=4')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Cache busted successfully.")
