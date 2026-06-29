const booksDatabase = [
    {
        title: "Mumu",
        author: "I. Turgenev",
        year: "1854",
        category: "badiiy",
        image: "assets/images/books/mumu.png"
    },
    {
        title: "Dunyoning ishlari",
        author: "O'. Hoshimov",
        year: "1982",
        category: "badiiy",
        image: "assets/images/books/dunyoning_ishlari.png"
    },
    {
        title: "Farhod va Shirin",
        author: "A. Navoiy",
        year: "1484",
        category: "badiiy",
        image: "assets/images/books/farhod_va_shirin.png?v=2"
    },
    {
        title: "Layli va Majnun",
        author: "A. Navoiy",
        year: "1484",
        category: "badiiy",
        image: "assets/images/books/layli_va_majnun.png"
    },
    {
        title: "Besh bolali yigitcha",
        author: "X. To'xtaboyev",
        year: "1990",
        category: "badiiy",
        image: "assets/images/books/besh_bolali_yigitcha.png"
    },
    {
        title: "Mungli ko'zlar",
        author: "X. To'xtaboyev",
        year: "1990",
        category: "badiiy",
        image: "assets/images/books/mungli_kozlar.png"
    },
    {
        title: "O'n besh yoshli millioner",
        author: "X. To'xtaboyev",
        year: "1992",
        category: "badiiy",
        image: "assets/images/books/on_besh_yoshli_millioner.png"
    },
    {
        title: "Atom odatlar",
        author: "J. Klir",
        year: "2018",
        category: "shaxsiy",
        image: "assets/images/books/atom_odatlar.png"
    }
];

let currentCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
    // Parse URL parameters for initial category
    const urlParams = new URLSearchParams(window.location.search);
    const initialCategory = urlParams.get('category');
    
    if (initialCategory) {
        const btn = document.querySelector(`.category-btn[data-category="${initialCategory}"]`);
        if (btn) {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = initialCategory;
        }
    }

    // Add event listeners to category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentCategory = e.target.dataset.category;
            renderBooks();
            
            // Update URL without refreshing
            const newUrl = new URL(window.location);
            newUrl.searchParams.set('category', currentCategory);
            window.history.pushState({}, '', newUrl);
        });
    });

    // Initial render
    renderBooks();
});

function renderBooks() {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = '';
    
    let filtered = booksDatabase;
    if (currentCategory !== 'all') {
        filtered = booksDatabase.filter(b => b.category === currentCategory);
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #888; padding: 50px;">Bu bo'limda hozircha kitoblar yo'q.</div>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    
    filtered.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        
        card.innerHTML = `
            <div class="book-cover">
                <img src="${book.image}" alt="${book.title}" loading="lazy">
            </div>
            <div class="book-info">
                <h3 title="${book.title}">${book.title}</h3>
                <div class="book-meta">
                    <span class="year">${book.year} yil</span>
                    <span class="author">${book.author}</span>
                </div>
            </div>
        `;
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}
