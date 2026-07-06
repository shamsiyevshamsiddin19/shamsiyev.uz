"use strict";
document.addEventListener('DOMContentLoaded', () => {
    // Navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    // Throttle with requestAnimationFrame so the handler runs at most once per frame
    let navTicking = false;
    const updateActiveNav = () => {
        navTicking = false;
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
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
    };
    window.addEventListener('scroll', () => {
        if (!navTicking) {
            navTicking = true;
            requestAnimationFrame(updateActiveNav);
        }
    }, { passive: true });
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
                headers: { 'Accept': 'application/json' },
                body: formData
            })
                .then(response => {
                    if (!response.ok) throw new Error('HTTP ' + response.status);
                    return response.json();
                })
                .then(data => {
                // FormSubmit returns { success: "true", ... } on success
                if (String(data.success) !== 'true') {
                    throw new Error(data.message || 'Submission failed');
                }
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
                btn.textContent = 'ERROR — TRY AGAIN';
                btn.style.background = 'transparent';
                btn.style.color = '#fff';
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
            // We use 3 groups to allow endless scrolling in both directions safely
            content.appendChild(group.cloneNode(true));
            content.appendChild(group);
            content.appendChild(group.cloneNode(true));
            friendsCarousel.appendChild(content);
            setTimeout(() => {
                const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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
                    if (!isHovered && !isTouching && !prefersReduced && !document.hidden) {
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
    // Skill Rotators — single config-driven loop instead of 6 duplicated blocks.
    // Respects prefers-reduced-motion and pauses while the tab is hidden.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
        const rotators = [
            { id: 'sql-skill', items: ['PostgreSQL', 'SQLite', 'MySQL'] },
            { id: 'py-skill', items: ['Django', 'FastAPI', 'Flask'] },
            { id: 'web-skill', items: ['Node.js', 'HTML', 'CSS', 'TypeScript'] },
            { id: 'tools-skill', items: ['Docker', 'Redis', 'Celery'] },
            { id: 'cpp-skill', items: ['OOP', 'Data Structures', 'Algorithms'] },
            { id: 'git-skill', items: ['Version Control', 'CI/CD', 'GitHub Actions'] },
        ];
        rotators.forEach(({ id, items }) => {
            const el = document.getElementById(id);
            if (!el) return;
            let index = 0;
            el.style.transition = 'opacity 0.5s ease-in-out';
            setInterval(() => {
                if (document.hidden) return; // don't animate in a background tab
                el.style.opacity = '0';
                setTimeout(() => {
                    index = (index + 1) % items.length;
                    el.textContent = items[index];
                    el.style.opacity = '1';
                }, 500);
            }, 4000);
        });
    }

    // Side drawers (nav overlay + interests panel) are handled by the
    // consolidated controller further down.
});

// === Typewriter effect ===
(function () {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const words = ['BACKEND DEVELOPER', 'PYTHON ENGINEER', 'API BUILDER', 'DJANGO / FASTAPI'];
    let wi = 0, ci = 0, deleting = false;
    function tick() {
        const word = words[wi];
        if (!deleting) {
            el.textContent = word.slice(0, ci + 1);
            ci++;
            if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
        } else {
            el.textContent = word.slice(0, ci - 1);
            ci--;
            if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(tick, deleting ? 50 : 95);
    }
    tick();
})();

// === Stat counter animation ===
(function () {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const statEls = document.querySelectorAll('.stat h3');
    if (!statEls.length) return;
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
            (function tick(now) {
                const t = Math.min((now - start) / dur, 1);
                const ease = 1 - Math.pow(1 - t, 3);
                el.textContent = Math.floor(ease * num) + suffix;
                if (t < 1) requestAnimationFrame(tick);
            })(start);
        });
        obs.disconnect();
    }, { threshold: 0.6 });
    statEls.forEach(el => obs.observe(el));
})();

// === Scroll-reveal animations (added) ===
document.addEventListener('DOMContentLoaded', () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!('IntersectionObserver' in window)) return;

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

    // Stagger cards within their grids
    document.querySelectorAll('.skills-grid, .project-grid, .blog-grid, .network-grid').forEach(grid => {
        Array.from(grid.children).forEach((child, idx) => {
            if (child.classList.contains('reveal')) child.style.transitionDelay = (idx * 0.09).toFixed(2) + 's';
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            el.classList.add('visible');
            observer.unobserve(el);
            // After the reveal finishes, strip the helper classes so each
            // element returns to its natural CSS (hover transitions intact).
            setTimeout(() => {
                el.classList.remove('reveal', 'visible');
                el.style.transitionDelay = '';
                el.style.willChange = '';
            }, 1500);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    els.forEach(el => observer.observe(el));
});

// === Side drawers: mobile nav overlay + interests side panel ===
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const panel = document.getElementById('sidePanel');
    const logoBtn = document.getElementById('logoBtn');
    const closePanelBtn = document.getElementById('closePanelBtn');
    const overlay = document.getElementById('drawerOverlay');

    const isNavOpen = () => !!(nav && nav.classList.contains('open'));
    const isPanelOpen = () => !!(panel && panel.classList.contains('open'));

    const setNav = (open) => {
        if (!nav || !toggle) return;
        nav.classList.toggle('open', open);
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    const setPanel = (open) => {
        if (!panel) return;
        panel.classList.toggle('open', open);
        panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    };
    const sync = () => {
        // The overlay only backs the partial side panel; the nav is full-screen.
        if (overlay) overlay.classList.toggle('show', isPanelOpen());
        document.body.classList.toggle('drawer-open', isNavOpen() || isPanelOpen());
    };

    // Opening one drawer always closes the other.
    const openNav = () => { setPanel(false); setNav(true); sync(); };
    const openPanel = () => { setNav(false); setPanel(true); sync(); };
    const closeAll = () => { setNav(false); setPanel(false); sync(); };

    // Expose for the swipe handler below.
    window.__drawers = { openNav, openPanel, closeAll, isNavOpen, isPanelOpen };

    if (toggle) toggle.addEventListener('click', () => (isNavOpen() ? closeAll() : openNav()));
    if (logoBtn) logoBtn.addEventListener('click', (e) => { e.preventDefault(); isPanelOpen() ? closeAll() : openPanel(); });
    if (closePanelBtn) closePanelBtn.addEventListener('click', closeAll);
    if (overlay) overlay.addEventListener('click', closeAll);
    if (nav) nav.querySelectorAll('.nav-link').forEach((link) => link.addEventListener('click', closeAll));

    // Escape closes whichever drawer is open.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && (isNavOpen() || isPanelOpen())) closeAll();
    });

    // Back to desktop width: make sure nothing stays stuck open.
    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) closeAll();
    });
});

// === Mobile Swipe Gestures (added) ===
document.addEventListener('DOMContentLoaded', () => {
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 60; // minimum px distance for swipe

    document.addEventListener('touchstart', e => {
        // Prevent capturing horizontal swipe if we are inside a horizontally scrolling container (like carousel or genres)
        if (e.target.closest('.friends-carousel') || e.target.closest('.category-navigator') || e.target.closest('.genres-navigator') || e.target.closest('.pdeck')) {
            return;
        }
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', e => {
        if (e.target.closest('.friends-carousel') || e.target.closest('.category-navigator') || e.target.closest('.genres-navigator') || e.target.closest('.pdeck')) {
            return;
        }
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const diff = Math.abs(touchEndX - touchStartX);
        if (diff < swipeThreshold) return;

        const D = window.__drawers;
        if (!D || window.innerWidth > 800) return;

        // Swipe right: close the side panel if open, else open the nav.
        if (touchEndX > touchStartX) {
            if (D.isPanelOpen()) D.closeAll();
            else if (!D.isNavOpen()) D.openNav();
        }
        // Swipe left: close the nav if open, else open the side panel.
        else if (touchStartX > touchEndX) {
            if (D.isNavOpen()) D.closeAll();
            else if (!D.isPanelOpen()) D.openPanel();
        }
    }
});
