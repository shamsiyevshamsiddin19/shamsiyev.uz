"use strict";
document.addEventListener('DOMContentLoaded', () => {
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
            // We use 3 groups to allow endless scrolling in both directions safely
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
    // SQL Skill Rotator
    const sqlSkill = document.getElementById('sql-skill');
    if (sqlSkill) {
        const sqlLangs = ['PostgreSQL', 'SQLite', 'MySQL'];
        let sqlIndex = 0;
        sqlSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            sqlSkill.style.opacity = '0';
            setTimeout(() => {
                sqlIndex = (sqlIndex + 1) % sqlLangs.length;
                sqlSkill.textContent = sqlLangs[sqlIndex];
                sqlSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // Python Framework Rotator
    const pySkill = document.getElementById('py-skill');
    if (pySkill) {
        const pyLangs = ['Django', 'FastAPI', 'Flask'];
        let pyIndex = 0;
        pySkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            pySkill.style.opacity = '0';
            setTimeout(() => {
                pyIndex = (pyIndex + 1) % pyLangs.length;
                pySkill.textContent = pyLangs[pyIndex];
                pySkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // Web Skill Rotator
    const webSkill = document.getElementById('web-skill');
    if (webSkill) {
        const webLangs = ['Node.js', 'HTML', 'CSS', 'TypeScript'];
        let webIndex = 0;
        webSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            webSkill.style.opacity = '0';
            setTimeout(() => {
                webIndex = (webIndex + 1) % webLangs.length;
                webSkill.textContent = webLangs[webIndex];
                webSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // Tools Skill Rotator
    const toolsSkill = document.getElementById('tools-skill');
    if (toolsSkill) {
        const toolsLangs = ['Docker', 'Redis', 'Celery'];
        let toolsIndex = 0;
        toolsSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            toolsSkill.style.opacity = '0';
            setTimeout(() => {
                toolsIndex = (toolsIndex + 1) % toolsLangs.length;
                toolsSkill.textContent = toolsLangs[toolsIndex];
                toolsSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // C++ Skill Rotator
    const cppSkill = document.getElementById('cpp-skill');
    if (cppSkill) {
        const cppLangs = ['OOP', 'Data Structures', 'Algorithms'];
        let cppIndex = 0;
        cppSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            cppSkill.style.opacity = '0';
            setTimeout(() => {
                cppIndex = (cppIndex + 1) % cppLangs.length;
                cppSkill.textContent = cppLangs[cppIndex];
                cppSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }
    // Git Skill Rotator
    const gitSkill = document.getElementById('git-skill');
    if (gitSkill) {
        const gitLangs = ['Version Control', 'CI/CD', 'GitHub Actions'];
        let gitIndex = 0;
        gitSkill.style.transition = 'opacity 0.5s ease-in-out';
        setInterval(() => {
            gitSkill.style.opacity = '0';
            setTimeout(() => {
                gitIndex = (gitIndex + 1) % gitLangs.length;
                gitSkill.textContent = gitLangs[gitIndex];
                gitSkill.style.opacity = '1';
            }, 500);
        }, 4000);
    }

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

        // Close on clicking outside
        document.addEventListener('click', (e) => {
            if (sidePanel.classList.contains('open') && !sidePanel.contains(e.target) && !logoBtn.contains(e.target)) {
                sidePanel.classList.remove('open');
            }
        });
    }
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

// === Mobile nav (hamburger) toggle (added) ===
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');
    if (!toggle || !nav) return;

    const setOpen = (open) => {
        nav.classList.toggle('open', open);
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
    nav.querySelectorAll('.nav-link').forEach(link =>
        link.addEventListener('click', () => setOpen(false))
    );
    // Close menu if resized back to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 800) setOpen(false);
    });
});

// === Mobile Swipe Gestures (added) ===
document.addEventListener('DOMContentLoaded', () => {
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 60; // minimum px distance for swipe

    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const sidePanel = document.getElementById('sidePanel');

    document.addEventListener('touchstart', e => {
        // Prevent capturing horizontal swipe if we are inside a horizontally scrolling container (like carousel or genres)
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

        // Swipe Right (Left to Right) -> Open Left Nav Menu
        if (touchEndX > touchStartX) {
            if (sidePanel && sidePanel.classList.contains('open')) {
                sidePanel.classList.remove('open');
            } else if (nav && toggle && window.innerWidth <= 800 && !nav.classList.contains('open')) {
                nav.classList.add('open');
                toggle.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Swipe Left (Right to Left) -> Open Right Side Panel
        if (touchStartX > touchEndX) {
            if (nav && nav.classList.contains('open') && window.innerWidth <= 800) {
                nav.classList.remove('open');
                toggle.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            } else if (sidePanel && !sidePanel.classList.contains('open')) {
                sidePanel.classList.add('open');
            }
        }
    }
});
