const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjEwYTY5ZDM3N2RlOGIyMjg5MWM4ZmVlN2QwM2VkNiIsIm5iZiI6MTc2OTI0ODQwMC40NDQsInN1YiI6IjY5NzQ5NjkwOTJhZmM0MTY2ZmEzNzk2NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VTX3NUdSG_bPk_Fjh4ml-NUYijU2TY8gIz_VqSgB76c';
const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${TMDB_TOKEN}`
    }
};

let allMovies = [];
let genresMap = {};
let currentGenre = 'all';

document.addEventListener('DOMContentLoaded', async () => {
    const grid = document.getElementById('moviesGrid');
    const dynamicGenres = document.getElementById('dynamic-genres');
    
    // Parse URL parameters for initial genre
    const urlParams = new URLSearchParams(window.location.search);
    const initialGenre = urlParams.get('genre');
    if (initialGenre) {
        currentGenre = initialGenre;
    }
    
    try {
        // Fetch genres
        const genresRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en-US', API_OPTIONS);
        const genresData = await genresRes.json();
        
        genresData.genres.forEach(g => {
            genresMap[g.id] = g.name;
            const btn = document.createElement('button');
            btn.className = 'genre-btn';
            btn.dataset.genre = g.id;
            btn.textContent = g.name;
            if (g.id.toString() === currentGenre) {
                btn.classList.add('active');
                document.querySelector('.genre-btn[data-genre="all"]').classList.remove('active');
            }
            dynamicGenres.appendChild(btn);
        });

        // Add event listeners to genre buttons
        document.querySelectorAll('.genre-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                currentGenre = e.target.dataset.genre;
                renderMovies();
                
                // Update URL without refreshing
                const newUrl = new URL(window.location);
                newUrl.searchParams.set('genre', currentGenre);
                window.history.pushState({}, '', newUrl);
            });
        });

        // Fetch movies (500 movies = 25 pages)
        const fetchPromises = [];
        for (let i = 1; i <= 25; i++) {
            fetchPromises.push(
                fetch(`https://api.themoviedb.org/3/movie/popular?language=en-US&page=${i}`, API_OPTIONS)
                .then(res => res.json())
            );
        }

        const pages = await Promise.all(fetchPromises);
        pages.forEach(page => {
            if (page.results) {
                allMovies = allMovies.concat(page.results);
            }
        });

        // Initial render
        renderMovies();

    } catch (error) {
        console.error('Error fetching data from TMDB:', error);
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: red;">Failed to load movies. API Error.</div>`;
    }
});

function renderMovies() {
    const grid = document.getElementById('moviesGrid');
    grid.innerHTML = '';
    
    let filtered = allMovies;
    if (currentGenre !== 'all') {
        filtered = allMovies.filter(m => m.genre_ids.includes(parseInt(currentGenre)));
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #888;">No movies found for this genre.</div>`;
        return;
    }

    const fragment = document.createDocumentFragment();
    
    // Render up to 500, but let's just render all filtered since we don't have images for 1000s
    filtered.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';
        
        const posterUrl = movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750/111/555?text=No+Poster';
            
        const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
        const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
        
        card.innerHTML = `
            <div class="movie-poster">
                <img src="${posterUrl}" alt="${movie.title}" loading="lazy">
                <div class="movie-rating"><i class="ri-star-fill"></i> ${rating}</div>
            </div>
            <div class="movie-info">
                <h3 title="${movie.title}">${movie.title}</h3>
                <div class="movie-meta">
                    <span>${year}</span>
                </div>
            </div>
        `;
        fragment.appendChild(card);
    });

    grid.appendChild(fragment);
}
