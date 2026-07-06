"use strict";
/*
 * showcase.js — data-driven Projects & Certificates.
 *
 * TO ADD A PROJECT: copy one { ... } block into the PROJECTS array below.
 *   title  – project name (shown as the card heading)
 *   desc   – one or two sentences
 *   tags   – array of short tech labels
 *   link   – URL opened by "Source Code"
 *   icon   – cover icon: subtitle | cap | robot | desktop | api | database | web | mobile | star
 *   accent – hex colour for the cover glow/icon
 *   image  – (optional) path to a real screenshot; if set it is used instead of the generated cover
 *
 * TO ADD A CERTIFICATE: copy one { ... } block into the CERTIFICATES array.
 *   title  – certificate name
 *   issuer – who issued it
 *   date   – e.g. "2026"
 *   link   – (optional) URL to the credential
 *   image  – (optional) path to the certificate image
 * Leave CERTIFICATES empty to show "Coming soon" placeholders.
 */

const PROJECTS = [
    {
        title: "Subtitr Bot",
        desc: "AI-powered Telegram bot that generates dual-layer subtitles with a floating vocabulary mode. Supports YouTube, tariffs & payments, a background worker queue and a mini-app.",
        tags: ["Python", "aiogram", "PostgreSQL", "AI"],
        link: "https://github.com/shamsiyevshamsiddin19/vibe-coding/tree/main/subtitr-bot",
        icon: "subtitle",
        accent: "#38bdf8",
    },
    {
        title: "Talaba Xizmatlari Bot",
        desc: "Telegram bot for students that generates independent-study work with AI, handles payments and integrates with a web bridge. Backend built on Python with a PostgreSQL database.",
        tags: ["Python", "FastAPI", "PostgreSQL", "AI"],
        link: "https://github.com/shamsiyevshamsiddin19/vibe-coding/tree/main/mustaqilbot",
        icon: "cap",
        accent: "#a78bfa",
    },
    {
        title: "TATU LMS Bots",
        desc: "A suite of Telegram bots built around a shared core, integrating with a university LMS to deliver course data and notifications to students.",
        tags: ["Python", "Telegram", "LMS"],
        link: "https://github.com/shamsiyevshamsiddin19/vibe-coding/tree/main/tatu-bots",
        icon: "robot",
        accent: "#fbbf24",
    },
    {
        title: "Subtitr Desktop",
        desc: "Desktop application that produces dual subtitles offline, paired with a Chrome extension and a packaged Windows installer for one-click setup.",
        tags: ["Python", "FFmpeg", "Desktop", "Chrome Ext"],
        link: "https://github.com/shamsiyevshamsiddin19/vibe-coding/tree/main/subtitr-desktop",
        icon: "desktop",
        accent: "#34d399",
    },
    {
        title: "Quiz Bot",
        desc: "Telegram quiz bot with a PostgreSQL-backed question bank and an admin panel for managing quizzes, questions and users.",
        tags: ["Python", "aiogram", "PostgreSQL"],
        link: "https://github.com/shamsiyevshamsiddin19/vibe-coding",
        icon: "web",
        accent: "#f472b6",
    },
];

const CERTIFICATES = [
    // { title: "Certificate name", issuer: "Issuer", date: "2026", link: "", image: "" },
];

// How many placeholder cards to show while CERTIFICATES is empty.
const CERT_PLACEHOLDERS = 3;

// --- helpers -------------------------------------------------------------
function esc(str) {
    return String(str == null ? "" : str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Cover icons — drawn centred on (0,0), stroked in the accent colour.
const ICONS = {
    subtitle: () => `<rect x="-52" y="-34" width="104" height="68" rx="12"/><path d="M-34 -8 H-12"/><path d="M-2 -8 H34"/><path d="M-34 8 H-4"/><path d="M6 8 H34"/>`,
    cap: (a) => `<path d="M0 -30 L52 -6 L0 18 L-52 -6 Z"/><path d="M-26 2 V22 C-26 22 0 35 26 22 V2"/><path d="M52 -6 V20"/><circle cx="52" cy="24" r="4" fill="${a}" stroke="none"/>`,
    robot: (a) => `<rect x="-40" y="-25" width="80" height="60" rx="14"/><path d="M0 -25 V-39"/><path d="M-16 21 H16"/><path d="M-40 -1 H-50"/><path d="M40 -1 H50"/><circle cx="0" cy="-43" r="4" fill="${a}" stroke="none"/><circle cx="-17" cy="1" r="4.5" fill="${a}" stroke="none"/><circle cx="17" cy="1" r="4.5" fill="${a}" stroke="none"/>`,
    desktop: (a) => `<rect x="-54" y="-36" width="108" height="68" rx="8"/><path d="M-10 32 V44"/><path d="M10 32 V44"/><path d="M-24 46 H24"/><path d="M-34 16 H10"/><path d="M-12 -14 V6 L6 -4 Z" fill="${a}" stroke="none"/>`,
    api: () => `<path d="M-16 -18 L-38 4 L-16 26"/><path d="M16 -18 L38 4 L16 26"/><path d="M6 -22 L-6 28"/>`,
    database: () => `<path d="M-34 -22 C-34 -29 34 -29 34 -22"/><path d="M-34 -22 V22 C-34 29 34 29 34 22 V-22"/><path d="M-34 0 C-34 7 34 7 34 0"/>`,
    web: () => `<circle cx="0" cy="0" r="38"/><path d="M-38 0 H38"/><path d="M0 -38 V38"/><path d="M-30 -20 C-14 -10 14 -10 30 -20"/><path d="M-30 20 C-14 10 14 10 30 20"/><path d="M0 -38 C-20 -20 -20 20 0 38"/><path d="M0 -38 C20 -20 20 20 0 38"/>`,
    mobile: () => `<rect x="-24" y="-40" width="48" height="80" rx="8"/><path d="M-8 -30 H8"/><path d="M-6 28 H6"/>`,
    star: () => `<path d="M0 -34 L10 -10 L36 -8 L16 8 L22 34 L0 20 L-22 34 L-16 8 L-36 -8 L-10 -10 Z"/>`,
};

function coverSVG(p, i) {
    const accent = p.accent || "#38bdf8";
    const label = esc((p.category || (p.tags || []).slice(0, 3).join(" · ")).toUpperCase());
    const draw = (ICONS[p.icon] || ICONS.star)(accent);
    return `<svg class="cover-svg" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(p.title)}">
        <defs>
            <radialGradient id="cg${i}" cx="78%" cy="18%" r="75%">
                <stop offset="0%" stop-color="${accent}" stop-opacity="0.30"/>
                <stop offset="55%" stop-color="${accent}" stop-opacity="0.05"/>
                <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
            </radialGradient>
            <pattern id="cp${i}" width="26" height="26" patternUnits="userSpaceOnUse">
                <path d="M26 0H0V26" fill="none" stroke="#ffffff" stroke-opacity="0.04" stroke-width="1"/>
            </pattern>
        </defs>
        <rect width="400" height="250" fill="#0d0d0d"/>
        <rect width="400" height="250" fill="url(#cp${i})"/>
        <rect width="400" height="250" fill="url(#cg${i})"/>
        <g transform="translate(200,102)" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${draw}</g>
        <text x="200" y="205" text-anchor="middle" font-family="'Outfit',Arial,sans-serif" font-size="12" font-weight="500" fill="#8a8a8a" letter-spacing="3">${label}</text>
    </svg>`;
}

function stackCard(p, i, total) {
    const cover = p.image
        ? `<img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`
        : coverSVG(p, i);
    const tags = (p.tags || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");
    const num = String(i + 1).padStart(2, "0");
    const tot = String(total).padStart(2, "0");
    const accent = p.accent || "#38bdf8";
    return `<article class="pcard" style="--accent:${esc(accent)}">
        <div class="pcard-cover">${cover}</div>
        <div class="pcard-body">
            <div class="pcard-index">${num} / ${tot}</div>
            <h3>${esc(p.title)}</h3>
            <p>${esc(p.desc)}</p>
            <div class="tags">${tags}</div>
            <a href="${esc(p.link)}" target="_blank" rel="noopener" class="project-link"><i class="ri-github-line" aria-hidden="true"></i> Source Code</a>
        </div>
    </article>`;
}

// Wire a two-sided "fan" deck: the front card sits centred & upright, the rest
// fan out symmetrically to the left and right. Arrows, dots, clicking a side
// card and swipe all cycle which card is in front. Reused by projects & certs.
function initFanDeck(deckId, stageId, dotsId, label) {
    const deck = document.getElementById(deckId);
    const stage = document.getElementById(stageId);
    const dotsWrap = document.getElementById(dotsId);
    if (!deck || !stage) return;
    const cards = Array.from(stage.children);
    const n = cards.length;
    if (!n) return;

    let front = 0;

    if (dotsWrap) {
        dotsWrap.innerHTML = cards
            .map((_, i) => `<button class="spot-dot${i === 0 ? " active" : ""}" type="button" aria-label="${esc(label || "Item")} ${i + 1}"></button>`)
            .join("");
    }
    const dots = dotsWrap ? Array.from(dotsWrap.children) : [];

    const render = () => {
        cards.forEach((card, i) => {
            const r = (i - front + n) % n;                 // 0 = front card
            const k = Math.min(r, n - r);                  // depth into the stack
            // side: +1 spreads right, -1 spreads left, 0 stays on the vertical axis.
            // The card exactly opposite the front (r === n - r) sits on the axis,
            // so the layout is always mirror-symmetric about the vertical centre.
            const side = (r === 0 || r === n - r) ? 0 : (r < n - r ? 1 : -1);
            const x = side * k;                            // signed horizontal units
            const y = side === 0 ? -k : k;                 // axis cards peek up; side cards drop down
            // Cards stay upright — no rotation.
            card.style.transform =
                `translateX(calc(var(--fan-x) * ${x})) ` +
                `translateY(calc(var(--fan-y) * ${y})) ` +
                `scale(${(1 - k * 0.055).toFixed(3)})`;
            card.style.zIndex = String(100 - k);
            // Only the front card is crisp. Cards behind it recede into a soft,
            // dimmed, blurred backdrop so their text never competes with the front.
            if (k === 0) {
                card.style.opacity = "1";
                card.style.filter = "none";
                card.style.pointerEvents = "auto";
            } else {
                card.style.opacity = String(Math.max(0.18, 0.5 - (k - 1) * 0.17));
                card.style.filter = `blur(${2 + k * 2.5}px) brightness(${(1 - k * 0.14).toFixed(2)})`;
            }
            card.dataset.front = r === 0 ? "1" : "0";
            card.setAttribute("aria-hidden", r === 0 ? "false" : "true");
        });
        dots.forEach((dot, i) => dot.classList.toggle("active", i === front));
    };
    const go = (step) => { front = (front + step + n) % n; render(); };

    const prev = deck.querySelector(".pdeck-arrow.prev");
    const next = deck.querySelector(".pdeck-arrow.next");
    if (prev) prev.addEventListener("click", () => go(-1));
    if (next) next.addEventListener("click", () => go(1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => { front = i; render(); }));

    // Click behaviour: a card behind the front comes forward; clicking the front
    // card advances to the next one — but a tap on the Source Code link still
    // opens it normally.
    cards.forEach((card, i) => {
        card.addEventListener("click", (e) => {
            if (card.dataset.front === "1") {
                if (e.target.closest("a")) return;
                e.preventDefault();
                go(1);
            } else {
                e.preventDefault();
                front = i;
                render();
            }
        });
    });

    // Touch swipe on the stage
    let sx = null;
    stage.addEventListener("touchstart", (e) => { sx = e.changedTouches[0].screenX; }, { passive: true });
    stage.addEventListener("touchend", (e) => {
        if (sx == null) return;
        const dx = e.changedTouches[0].screenX - sx;
        if (Math.abs(dx) > 45) go(dx < 0 ? 1 : -1);
        sx = null;
    }, { passive: true });

    // Only one card: nothing to navigate
    if (n < 2) {
        const controls = deck.querySelector(".pdeck-controls");
        if (controls) controls.style.display = "none";
    }

    render();
}

function certFanCard(c, i, total) {
    const accent = (c && c.accent) || "#fbbf24";
    const num = String(i + 1).padStart(2, "0");
    const tot = String(total).padStart(2, "0");
    if (!c) {
        const cover = coverSVG({ title: "Certificate", icon: "star", accent, tags: ["Coming soon"] }, "c" + i);
        return `<article class="pcard" style="--accent:${accent}" aria-disabled="true">
            <div class="pcard-cover">${cover}</div>
            <div class="pcard-body">
                <div class="pcard-index">${num} / ${tot}</div>
                <h3>Certificate</h3>
                <p>Professional certificates and achievements will appear here soon.</p>
                <span class="project-link" style="opacity:.65"><i class="ri-time-line" aria-hidden="true"></i> Coming soon</span>
            </div>
        </article>`;
    }
    const cover = c.image
        ? `<img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy">`
        : coverSVG({ title: c.title, icon: c.icon || "star", accent, category: c.issuer }, "c" + i);
    const cta = c.link
        ? `<a class="project-link" href="${esc(c.link)}" target="_blank" rel="noopener"><i class="ri-external-link-line" aria-hidden="true"></i> View credential</a>`
        : `<span class="project-link">${esc(c.issuer || "")}</span>`;
    return `<article class="pcard" style="--accent:${accent}">
        <div class="pcard-cover">${cover}</div>
        <div class="pcard-body">
            <div class="pcard-index">${esc(c.date || "")}${c.issuer ? " · " + esc(c.issuer) : ""}</div>
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.desc || "")}</p>
            ${cta}
        </div>
    </article>`;
}

// --- render (runs immediately, grids already exist above this script) ----
(function render() {
    const projectStage = document.getElementById("projectGrid");
    if (projectStage) {
        projectStage.innerHTML = PROJECTS.map((p, i) => stackCard(p, i, PROJECTS.length)).join("");
        initFanDeck("projectDeck", "projectGrid", "projectDots", "Project");
    }
    const certStage = document.getElementById("certGrid");
    if (certStage) {
        const total = CERTIFICATES.length || CERT_PLACEHOLDERS;
        const items = CERTIFICATES.length
            ? CERTIFICATES.map((c, i) => certFanCard(c, i, total))
            : Array.from({ length: CERT_PLACEHOLDERS }, (_, i) => certFanCard(null, i, total));
        certStage.innerHTML = items.join("");
        initFanDeck("certDeck", "certGrid", "certDots", "Certificate");
    }
})();
