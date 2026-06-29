"use strict";

document.addEventListener('DOMContentLoaded', async () => {
    // Load all HTML components asynchronously
    const includes = document.querySelectorAll('[data-include]');
    const promises = Array.from(includes).map(async el => {
        const url = el.getAttribute('data-include');
        try {
            // cache busting for local dev, or just standard fetch
            const res = await fetch(url);
            if (res.ok) {
                const html = await res.text();
                el.outerHTML = html;
            }
        } catch (e) {
            console.error('Failed to fetch', url, e);
        }
    });

    await Promise.all(promises);
    
    // Initialize all logic AFTER components are loaded
    initScripts();
});

function initScripts() {
    // Navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id') || '';
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Handle form submission via FormSubmit AJAX
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.btn');
            const originalText = btn.textContent || '';
            btn.textContent = 'SENDING...';
            const formData = new FormData(form);
            fetch("https://formsubmit.co/ajax/ad5c1a6b8cec65f29d902ec3c0012c9d", {
                method: "POST",
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                btn.textContent = 'MESSAGE SENT!';
                btn.style.background = '#fff';
                btn.style.color = '#000';
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = 'transparent';
                    btn.style.color = '#fff';
                    form.reset();
                }, 3000);
            })
                .catch(error => {
                btn.textContent = 'ERROR!';
                setTimeout(() => {
                    btn.textContent = originalText;
                }, 3000);
            });
        });
    }

    // Infinite Native Momentum Marquee Setup
    const friendsCarousel = document.querySelector('.friends-carousel');
    if (friendsCarousel) {
        const cards = Array.from(friendsCarousel.children);
        if (cards.length > 0) {
            const group = document.createElement('div');
            group.className = 'marquee-group';
            cards.forEach(card => group.appendChild(card));
            const content = document.createElement('div');
            content.className = 'marquee-content';
            content.appendChild(group.cloneNode(true));
            content.appendChild(group);
            content.appendChild(group.cloneNode(true));
            friendsCarousel.appendChild(content);
            setTimeout(() => {
                const groupWidth = content.children[0].offsetWidth;
                friendsCarousel.scrollLeft = groupWidth;
                let isHovered = false;
                let isTouching = false;
                let autoScrollSpeed = 1;
                let scrollAccumulator = friendsCarousel.scrollLeft;
                friendsCarousel.addEventListener('mouseenter', () => isHovered = true);
                friendsCarousel.addEventListener('mouseleave', () => isHovered = false);
                friendsCarousel.addEventListener('touchstart', () => isTouching = true, { passive: true });
                friendsCarousel.addEventListener('touchend', () => isTouching = false);
                function animate() {
                    if (!isHovered && !isTouching) {
                        scrollAccumulator += autoScrollSpeed;
                        friendsCarousel.scrollLeft = scrollAccumulator;
                    }
                    else {
                        scrollAccumulator = friendsCarousel.scrollLeft;
                    }
                    if (friendsCarousel.scrollLeft >= groupWidth * 2) {
                        friendsCarousel.scrollLeft -= groupWidth;
                        scrollAccumulator -= groupWidth;
                    }
                    else if (friendsCarousel.scrollLeft <= 0) {
                        friendsCarousel.scrollLeft += groupWidth;
                        scrollAccumulator += groupWidth;
                    }
                    requestAnimationFrame(animate);
                }
                requestAnimationFrame(animate);
                friendsCarousel.addEventListener('scroll', () => {
                    if (friendsCarousel.scrollLeft >= groupWidth * 2) {
                        friendsCarousel.scrollLeft -= groupWidth;
                        scrollAccumulator = friendsCarousel.scrollLeft;
                    }
                    else if (friendsCarousel.scrollLeft <= 0) {
                        friendsCarousel.scrollLeft += groupWidth;
                        scrollAccumulator = friendsCarousel.scrollLeft;
                    }
                });
            }, 200);
        }
    }

    // Rotators
    function setupRotator(id, langs) {
        const el = document.getElementById(id);
        if (el) {
            let idx = 0;
            el.style.transition = 'opacity 0.5s ease-in-out';
            setInterval(() => {
                el.style.opacity = '0';
                setTimeout(() => {
                    idx = (idx + 1) % langs.length;
                    el.textContent = langs[idx];
                    el.style.opacity = '1';
                }, 500);
            }, 4000);
        }
    }
    setupRotator('sql-skill', ['PostgreSQL', 'SQLite', 'MySQL']);
    setupRotator('py-skill', ['Django', 'FastAPI', 'Flask']);
    setupRotator('web-skill', ['Node.js', 'HTML', 'CSS', 'TypeScript']);
    setupRotator('tools-skill', ['Docker', 'Redis', 'Celery']);
    setupRotator('cpp-skill', ['OOP', 'Data Structures', 'Algorithms']);
    setupRotator('git-skill', ['Version Control', 'CI/CD', 'GitHub Actions']);

    // Side Panel Toggle Logic
    const logoBtn = document.getElementById('logoBtn');
    const sidePanel = document.getElementById('sidePanel');
    const closePanelBtn = document.getElementById('closePanelBtn');

    if (logoBtn && sidePanel && closePanelBtn) {
        logoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sidePanel.classList.add('open');
        });

        closePanelBtn.addEventListener('click', () => {
            sidePanel.classList.remove('open');
        });

        document.addEventListener('click', (e) => {
            if (sidePanel.classList.contains('open') && !sidePanel.contains(e.target) && !logoBtn.contains(e.target)) {
                sidePanel.classList.remove('open');
            }
        });
    }

    // === Typewriter effect ===
    const typeEl = document.getElementById('typewriter');
    if (typeEl) {
        const words = ['BACKEND DEVELOPER', 'PYTHON ENGINEER', 'API BUILDER', 'DJANGO / FASTAPI'];
        let wi = 0, ci = 0, deleting = false;
        function tick() {
            const word = words[wi];
            if (!deleting) {
                typeEl.textContent = word.slice(0, ci + 1);
                ci++;
                if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
            } else {
                typeEl.textContent = word.slice(0, ci - 1);
                ci--;
                if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
            }
            setTimeout(tick, deleting ? 50 : 95);
        }
        tick();
    }

    // === Stat counter animation ===
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const statEls = document.querySelectorAll('.stat h3');
        if (statEls.length) {
            const parsed = Array.from(statEls).map(el => {
                const raw = el.textContent.trim();
                const num = parseFloat(raw);
                const suffix = raw.replace(/[\d.]/g, '');
                return { el, num, suffix };
            });
            let done = false;
            const obs = new IntersectionObserver(entries => {
                if (done || !entries.some(e => e.isIntersecting)) return;
                done = true;
                parsed.forEach(({ el, num, suffix }) => {
                    const start = performance.now();
                    const dur = 1400;
                    (function statTick(now) {
                        const t = Math.min((now - start) / dur, 1);
                        const ease = 1 - Math.pow(1 - t, 3);
                        el.textContent = Math.floor(ease * num) + suffix;
                        if (t < 1) requestAnimationFrame(statTick);
                    })(start);
                });
                obs.disconnect();
            }, { threshold: 0.6 });
            statEls.forEach(el => obs.observe(el));
        }
    }

    // === Scroll-reveal animations ===
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
        const selectors = [
            '.about-image', '.about-text',
            '.skills-container > h2', '.skill-card',
            '.portfolio-info', '.project-card',
            '.network-grid > .network-card', '.carousel-wrapper',
            '.blog-card',
            '.contact-info', '.contact-form'
        ];

        const els = [];
        selectors.forEach(sel => document.querySelectorAll(sel).forEach(el => {
            if (!el.classList.contains('reveal')) { el.classList.add('reveal'); els.push(el); }
        }));

        document.querySelectorAll('.skills-grid, .project-grid, .blog-grid, .network-grid').forEach(grid => {
            Array.from(grid.children).forEach((child, idx) => {
                if (child.classList.contains('reveal')) child.style.transitionDelay = (idx * 0.09).toFixed(2) + 's';
            });
        });

        const revealObs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                el.classList.add('visible');
                revealObs.unobserve(el);
                setTimeout(() => {
                    el.classList.remove('reveal', 'visible');
                    el.style.transitionDelay = '';
                    el.style.willChange = '';
                }, 1500);
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

        els.forEach(el => revealObs.observe(el));
    }

    // === Mobile nav (hamburger) toggle ===
    const toggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav');
    if (toggle && navMenu) {
        const setOpen = (open) => {
            navMenu.classList.toggle('open', open);
            toggle.classList.toggle('open', open);
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            document.body.style.overflow = open ? 'hidden' : '';
        };

        toggle.addEventListener('click', () => setOpen(!navMenu.classList.contains('open')));
        navMenu.querySelectorAll('.nav-link').forEach(link =>
            link.addEventListener('click', () => setOpen(false))
        );
        window.addEventListener('resize', () => {
            if (window.innerWidth > 800) setOpen(false);
        });
    }

    // === Mobile Swipe Gestures ===
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 60; 

    document.addEventListener('touchstart', e => {
        if (e.target.closest('.friends-carousel') || e.target.closest('.category-navigator') || e.target.closest('.genres-navigator')) {
            return;
        }
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        if (e.target.closest('.friends-carousel') || e.target.closest('.category-navigator') || e.target.closest('.genres-navigator')) {
            return;
        }
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = Math.abs(touchEndX - touchStartX);
        if (diff < swipeThreshold) return;

        if (touchEndX > touchStartX) {
            if (sidePanel && sidePanel.classList.contains('open')) {
                sidePanel.classList.remove('open');
            } else if (navMenu && toggle && window.innerWidth <= 800 && !navMenu.classList.contains('open')) {
                navMenu.classList.add('open');
                toggle.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        }
        
        if (touchStartX > touchEndX) {
            if (navMenu && navMenu.classList.contains('open') && window.innerWidth <= 800) {
                navMenu.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else if (sidePanel && !sidePanel.classList.contains('open')) {
                sidePanel.classList.add('open');
            }
        }
    }
}
