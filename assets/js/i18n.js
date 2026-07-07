"use strict";
/*
 * i18n.js — homepage language switcher (EN / RU / UZ).
 * Elements with data-i18n="key" get their text swapped; data-i18n-ph="key"
 * swaps an input/textarea placeholder. Project & certificate card content
 * (technical) stays in English. Choice is remembered in localStorage.
 */
const I18N = {
    en: {
        nav_about: "ABOUT", nav_skills: "SKILLS", nav_projects: "PROJECTS",
        nav_certs: "CERTIFICATES", nav_contact: "CONTACT",
        hero_iam: "I AM",
        about_h: "ABOUT ME",
        about_p1: "Hi, I'm Shamsiddin — a backend developer from Tashkent. I got into programming in August 2024 and have been hooked ever since, learning the craft under the mentorship of Nurulloh Muhammadov. Most of what I build lives on the server side: Telegram bots, APIs, and the databases and Linux servers behind them.",
        about_p2: "I like shipping things people actually use — like Subtitr Bot, my AI subtitle bot — and I lean on my background in higher mathematics to reason through algorithms. I read English and Russian documentation comfortably, so I rarely stay stuck for long.",
        stat_years: "Years Coding", stat_projects: "Projects", stat_langs: "Languages",
        skills_h: "MY SKILLS",
        projects_h: "FEATURED PROJECTS", projects_sub: "SOME OF MY RECENT BACKEND WORK",
        certs_h: "CERTIFICATES", certs_sub: "LICENSES & ACHIEVEMENTS",
        contact_h: "CONTACT",
        contact_p: "If you're looking for a dedicated Backend Developer to build scalable systems, or you just have a question, feel free to drop a message. Let's build something great together.",
        cform_h: "CONTACT FORM",
        ph_name: "Name Surname", ph_phone: "Your phone", ph_email: "Your e-mail", ph_msg: "Message",
        btn_send: "SEND MESSAGE",
        lbl_addr: "Address", val_addr: "Tashkent, Uzbekistan", lbl_email: "E-mail",
        f_role: "Backend Developer — Python · Django · FastAPI",
        f_explore: "Explore", f_connect: "Connect", f_backtop: "Back to top",
        f_rights: "All rights reserved.",
    },
    ru: {
        nav_about: "ОБО МНЕ", nav_skills: "НАВЫКИ", nav_projects: "ПРОЕКТЫ",
        nav_certs: "СЕРТИФИКАТЫ", nav_contact: "КОНТАКТ",
        hero_iam: "Я",
        about_h: "ОБО МНЕ",
        about_p1: "Привет, я Шамсиддин — backend-разработчик из Ташкента. Я начал программировать в августе 2024 года и с тех пор не могу остановиться; учусь ремеслу под наставничеством Нуруллоха Мухаммадова. Большая часть моей работы — серверная сторона: Telegram-боты, API, базы данных и Linux-серверы, которые всё это держат.",
        about_p2: "Мне нравится делать вещи, которыми реально пользуются — например, Subtitr Bot, мой бот для субтитров с ИИ — и я опираюсь на базу по высшей математике, чтобы разбираться в алгоритмах. Свободно читаю документацию на английском и русском, поэтому надолго редко застреваю.",
        stat_years: "Года в коде", stat_projects: "Проектов", stat_langs: "Языка",
        skills_h: "МОИ НАВЫКИ",
        projects_h: "ИЗБРАННЫЕ ПРОЕКТЫ", projects_sub: "НЕКОТОРЫЕ ИЗ МОИХ BACKEND-РАБОТ",
        certs_h: "СЕРТИФИКАТЫ", certs_sub: "ЛИЦЕНЗИИ И ДОСТИЖЕНИЯ",
        contact_h: "КОНТАКТ",
        contact_p: "Если вам нужен увлечённый Backend-разработчик для масштабируемых систем или просто есть вопрос — пишите. Давайте создадим что-то классное вместе.",
        cform_h: "ФОРМА СВЯЗИ",
        ph_name: "Имя Фамилия", ph_phone: "Ваш телефон", ph_email: "Ваш e-mail", ph_msg: "Сообщение",
        btn_send: "ОТПРАВИТЬ",
        lbl_addr: "Адрес", val_addr: "Ташкент, Узбекистан", lbl_email: "E-mail",
        f_role: "Backend-разработчик — Python · Django · FastAPI",
        f_explore: "Разделы", f_connect: "Связаться", f_backtop: "Наверх",
        f_rights: "Все права защищены.",
    },
    uz: {
        nav_about: "MEN HAQIMDA", nav_skills: "KO‘NIKMALAR", nav_projects: "LOYIHALAR",
        nav_certs: "SERTIFIKATLAR", nav_contact: "ALOQA",
        hero_iam: "MEN",
        about_h: "MEN HAQIMDA",
        about_p1: "Salom, men Shamsiddinman — Toshkentlik backend dasturchi. Dasturlashni 2024-yil avgustda boshlaganman va o‘shandan beri qiziqishim so‘nmagan; hunarni Nurulloh Muhammadov rahbarligida o‘rganib kelaman. Ishimning ko‘p qismi server tomonida: Telegram botlar, API’lar, hamda ularni ishlatib turadigan ma’lumotlar bazasi va Linux serverlar.",
        about_p2: "Odamlar haqiqatan foydalanadigan narsalar yaratishni yaxshi ko‘raman — masalan, Subtitr Bot (AI subtitr boti) — va algoritmlarni tushunishда oliy matematika bilimimga tayanaman. Ingliz va rus tilidagi hujjatlarni bemalol o‘qiganim uchun uzoq qotib qolmayman.",
        stat_years: "Yil kodlash", stat_projects: "Loyiha", stat_langs: "Til",
        skills_h: "KO‘NIKMALARIM",
        projects_h: "TANLANGAN LOYIHALAR", projects_sub: "SO‘NGGI BACKEND ISHLARIMDAN",
        certs_h: "SERTIFIKATLAR", certs_sub: "LITSENZIYA VA YUTUQLAR",
        contact_h: "ALOQA",
        contact_p: "Agar sizga kengaytiriladigan tizimlar quradigan backend dasturchi kerak bo‘lsa yoki shunchaki savolingiz bo‘lsa — yozing. Keling, birga zo‘r narsa yarataylik.",
        cform_h: "ALOQA FORMASI",
        ph_name: "Ism Familiya", ph_phone: "Telefoningiz", ph_email: "E-pochtangiz", ph_msg: "Xabar",
        btn_send: "YUBORISH",
        lbl_addr: "Manzil", val_addr: "Toshkent, O‘zbekiston", lbl_email: "E-pochta",
        f_role: "Backend Dasturchi — Python · Django · FastAPI",
        f_explore: "Bo‘limlar", f_connect: "Bog‘lanish", f_backtop: "Yuqoriga",
        f_rights: "Barcha huquqlar himoyalangan.",
    },
};

(function () {
    const supported = ["en", "ru", "uz"];
    const saved = localStorage.getItem("siteLang");
    const initial = supported.includes(saved) ? saved : "en";

    function apply(lang) {
        const dict = I18N[lang] || I18N.en;
        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const v = dict[el.getAttribute("data-i18n")];
            if (v != null) el.textContent = v;
        });
        document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
            const v = dict[el.getAttribute("data-i18n-ph")];
            if (v != null) el.setAttribute("placeholder", v);
        });
        document.documentElement.setAttribute("lang", lang);
        document.querySelectorAll(".site-lang-btn").forEach((b) =>
            b.classList.toggle("active", b.getAttribute("data-lang") === lang)
        );
        localStorage.setItem("siteLang", lang);
    }

    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".site-lang-btn").forEach((b) =>
            b.addEventListener("click", () => apply(b.getAttribute("data-lang")))
        );
        apply(initial);
    });
})();
