const ideasItems = [
    {
        title: "AI Bilan Ishlash",
        category: "startap",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1565&auto=format&fit=crop",
        desc: "Sun'iy intellekt orqali muammolarni hal qilish va jarayonlarni avtomatlashtirish.",
        author: "Tech Startap"
    },
    {
        title: "Web va Mobil Ilovalar",
        category: "it",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
        desc: "Foydalanuvchilar hayotini yengillashtiruvchi zamonaviy dasturlar yaratish.",
        author: "Dasturlash"
    },
    {
        title: "Kreativ Dizayn",
        category: "dizayn",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1400&auto=format&fit=crop",
        desc: "Brending va UX/UI dizayn orqali loyihalarga joziba bag'ishlash.",
        author: "San'at"
    },
    {
        title: "E-Commerce",
        category: "biznes",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1470&auto=format&fit=crop",
        desc: "Internet magazinlar va online savdo platformalarini rivojlantirish.",
        author: "Moliya"
    }
];

const ideasGrid = document.getElementById('ideasGrid');
const categoryBtns = document.querySelectorAll('.category-btn');

function renderIdeasItems(items) {
    ideasGrid.innerHTML = '';
    
    if (items.length === 0) {
        ideasGrid.innerHTML = '<div style="color: #666; text-align: center; grid-column: 1 / -1; padding: 50px;">Bu bo\'limda hozircha ma\'lumot yo\'q.</div>';
        return;
    }
    
    items.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.style.animationDelay = `${index * 0.05}s`;
        
        card.innerHTML = `
            <div class="book-cover">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="book-overlay">
                    <button class="read-btn">Batafsil</button>
                </div>
            </div>
            <div class="book-info">
                <h3>${item.title}</h3>
                <p class="book-author">${item.author}</p>
                <span class="book-genre">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</span>
                <p class="book-desc">${item.desc}</p>
            </div>
        `;
        ideasGrid.appendChild(card);
    });
}

function handleCategoryFilter(e) {
    const btn = e.target;
    if (!btn.classList.contains('category-btn')) return;
    
    // Update active state
    categoryBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Filter items
    const category = btn.getAttribute('data-category');
    if (category === 'all') {
        renderIdeasItems(ideasItems);
    } else {
        const filtered = ideasItems.filter(item => item.category === category);
        renderIdeasItems(filtered);
    }
    
    // Center the active button in the scrollable view
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if category is passed in URL
    const urlCategory = getQueryParam('category');
    
    if (urlCategory) {
        const targetBtn = document.querySelector(`.category-btn[data-category="${urlCategory}"]`);
        if (targetBtn) {
            // Simulate click on the target button
            targetBtn.click();
            return;
        }
    }
    
    // Default render
    renderIdeasItems(ideasItems);
});

// Event listeners
document.querySelector('.category-navigator').addEventListener('click', handleCategoryFilter);

// Swipe gestures
let touchStartX = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
    let touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 100) {
        window.location.href = 'index.html';
    }
}, { passive: true });
