const sportItems = [
    {
        title: "Fitnes",
        category: "fitnes",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop",
        desc: "Sog'lom tana va kuchli iroda uchun doimiy mashg'ulotlar.",
        author: "Tana Tarbiyasi"
    },
    {
        title: "Futbol",
        category: "futbol",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1470&auto=format&fit=crop",
        desc: "Jamoaviy ruh, tezlik va taktik fikrlashni rivojlantiruvchi o'yin.",
        author: "To'p bilan Harakat"
    },
    {
        title: "Voleybol",
        category: "voleybol",
        image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1607&auto=format&fit=crop",
        desc: "Chaoloqlik va sakrash qobiliyatini sinovdan o'tkazadigan sport.",
        author: "Zaldagi O'yin"
    },
    {
        title: "Padel",
        category: "padel",
        image: "https://images.unsplash.com/photo-1626243886576-805fc4fb54fc?q=80&w=1470&auto=format&fit=crop",
        desc: "Yangi trend: tennis va skvosh elementlarini o'zida jamlagan qiziqarli sport.",
        author: "Zamonaviy Sport"
    },
    {
        title: "Badminton",
        category: "badminton",
        image: "https://images.unsplash.com/photo-1621570170068-d7486e96996d?q=80&w=1470&auto=format&fit=crop",
        desc: "Tezkorlik va e'tiborni talab qiladigan eng qiziqarli mashg'ulot.",
        author: "Raketka bilan"
    }
];

const sportGrid = document.getElementById('sportGrid');
const categoryBtns = document.querySelectorAll('.category-btn');

function renderSportItems(items) {
    sportGrid.innerHTML = '';
    
    if (items.length === 0) {
        sportGrid.innerHTML = '<div style="color: #666; text-align: center; grid-column: 1 / -1; padding: 50px;">Bu bo\'limda hozircha ma\'lumot yo\'q.</div>';
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
        sportGrid.appendChild(card);
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
        renderSportItems(sportItems);
    } else {
        const filtered = sportItems.filter(item => item.category === category);
        renderSportItems(filtered);
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
    renderSportItems(sportItems);
});

// Event listeners
document.querySelector('.category-navigator').addEventListener('click', handleCategoryFilter);

// Swipe gestures to go back or navigate categories
let touchStartX = 0;
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', e => {
    let touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 100) {
        // Swipe Right to go back to main page
        window.location.href = 'index.html';
    }
}, { passive: true });
