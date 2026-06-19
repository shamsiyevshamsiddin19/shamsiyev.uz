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
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
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
            const originalText = btn.textContent;
            btn.textContent = 'SENDING...';
            
            const formData = new FormData(form);
            
            fetch("https://formsubmit.co/ajax/shamsiyevshamsiddin19@gmail.com", {
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

    // SQL Skill Rotator
    const sqlSkill = document.getElementById('sql-skill');
    if (sqlSkill) {
        const sqlLangs = ['PostgreSQL', 'SQLite', 'MySQL'];
        let sqlIndex = 0;
        sqlSkill.style.transition = 'opacity 0.5s ease-in-out';
        
        setInterval(() => {
            sqlSkill.style.opacity = 0;
            setTimeout(() => {
                sqlIndex = (sqlIndex + 1) % sqlLangs.length;
                sqlSkill.textContent = sqlLangs[sqlIndex];
                sqlSkill.style.opacity = 1;
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
            pySkill.style.opacity = 0;
            setTimeout(() => {
                pyIndex = (pyIndex + 1) % pyLangs.length;
                pySkill.textContent = pyLangs[pyIndex];
                pySkill.style.opacity = 1;
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
            webSkill.style.opacity = 0;
            setTimeout(() => {
                webIndex = (webIndex + 1) % webLangs.length;
                webSkill.textContent = webLangs[webIndex];
                webSkill.style.opacity = 1;
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
            toolsSkill.style.opacity = 0;
            setTimeout(() => {
                toolsIndex = (toolsIndex + 1) % toolsLangs.length;
                toolsSkill.textContent = toolsLangs[toolsIndex];
                toolsSkill.style.opacity = 1;
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
            cppSkill.style.opacity = 0;
            setTimeout(() => {
                cppIndex = (cppIndex + 1) % cppLangs.length;
                cppSkill.textContent = cppLangs[cppIndex];
                cppSkill.style.opacity = 1;
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
            gitSkill.style.opacity = 0;
            setTimeout(() => {
                gitIndex = (gitIndex + 1) % gitLangs.length;
                gitSkill.textContent = gitLangs[gitIndex];
                gitSkill.style.opacity = 1;
            }, 500);
        }, 4000);
    }
    // CV/Resume Rotator
    const cvText = document.getElementById('cv-text');
    if (cvText) {
        const cvTexts = ['DOWNLOAD CV', 'DOWNLOAD RESUME'];
        let cvIndex = 0;
        cvText.style.transition = 'opacity 0.5s ease-in-out';
        
        setInterval(() => {
            cvText.style.opacity = 0;
            setTimeout(() => {
                cvIndex = (cvIndex + 1) % cvTexts.length;
                cvText.textContent = cvTexts[cvIndex];
                cvText.style.opacity = 1;
            }, 500);
        }, 4000);
    }
});
