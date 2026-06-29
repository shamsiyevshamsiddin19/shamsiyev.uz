const travelItems = [
    {
        title: "Tog'lar uzra sayohat",
        category: "toglar",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1470&auto=format&fit=crop",
        desc: "Baland cho'qqilar, musaffo havo va ajoyib tabiat manzaralari.",
        author: "Tog'lar"
    },
    {
        title: "Oken va Dengizlar",
        category: "dengizlar",
        image: "https://images.unsplash.com/photo-1498623116890-37e912163d5d?q=80&w=1470&auto=format&fit=crop",
        desc: "Cheksiz suvlik va to'lqinlar sasi. Yozgi ta'til uchun ajoyib joy.",
        author: "Sohillar"
    },
    {
        title: "Qadimiy Obidalar",
        category: "tarixiy",
        image: "https://images.unsplash.com/photo-1541358988647-385011f0a2ba?q=80&w=1470&auto=format&fit=crop",
        desc: "O'tmishdan so'zlovchi tarixiy qadamjolar va qadimiy shaharlar.",
        author: "Tarixiy joylar"
    },
    {
        title: "Zamonaviy Shaharlar",
        category: "shaharlar",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1544&auto=format&fit=crop",
        desc: "Osmono'par binolar, tungi chiroqlar va shahar hayoti.",
        author: "Metropolis"
    }
];

const travelGrid = document.getElementById('travelGrid');
const categoryBtns = document.querySelectorAll('.category-btn');

function renderTravelItems(items) {
    travelGrid.innerHTML = '';
    
    if (items.length === 0) {
        travelGrid.innerHTML = '<div style="color: #666; text-align: center; grid-column: 1 / -1; padding: 50px;">Bu bo\'limda hozircha ma\'lumot yo\'q.</div>';
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
        travelGrid.appendChild(card);
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
        renderTravelItems(travelItems);
    } else {
        const filtered = travelItems.filter(item => item.category === category);
        renderTravelItems(filtered);
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
    renderTravelItems(travelItems);
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
