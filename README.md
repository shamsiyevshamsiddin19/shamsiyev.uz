# shamsiyev.uz

Personal portfolio website of **Shamsiddin Shamsiyev** — Backend Developer (Python / Django / FastAPI / PostgreSQL / Docker).

Live: https://shamsiyev.uz

## Stack

- Static **HTML / CSS / vanilla JavaScript** (no framework, no build step).
- Fonts via Google Fonts, icons via RemixIcon (CDN).
- Movies page pulls data from the TMDB API.
- Contact form is handled by [FormSubmit](https://formsubmit.co).

## Structure

```
index.html            Home (hero, about, skills, projects, blog, contact)
cv.html / resume.html CV and resume pages
books/movies/sport/travel/ideas.html  Interest pages
assets/css/           Stylesheets
assets/js/            Page scripts (source of truth — edit these directly)
assets/images/        Images
```

## Run locally

```bash
npm start        # serves the folder with `npx serve`
# or simply open index.html in a browser
```

## Deploy

The site is hosted on **Cloudflare Pages**. Pushing to GitHub does **not** update the
live site by itself — a Cloudflare Pages deploy must run.
