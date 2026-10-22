# Yunus Mohammed — Full Stack Developer Portfolio

A premium, dark-themed, responsive portfolio built with **React + Vite** for an active job search.

## Run the project

```bash
npm install     # install dependencies
npm run dev     # start dev server → http://localhost:5173
npm run build   # production build
npm run preview # preview the production build
npm run lint    # lint the code
```

## Tech stack

- React 19 + Vite
- Plain CSS3 (no CSS framework)
- `lucide-react` for icons (GitHub/LinkedIn use inline SVG in `BrandIcons.jsx`)
- GitHub API for live repository cards (with a graceful fallback if offline)

## Project structure

```
index.html                 # SEO meta + Open Graph tags (update deployed URL/image)
public/resume.pdf          # ← put your real resume here
src/
  main.jsx                 # entry point
  App.jsx                  # assembles all sections
  index.css                # design tokens, typography, buttons, background
  styles/shared.css        # shared primitives (tags, checklists)
  data/siteData.js         # ALL content lives here
  components/
    Navbar / Footer
    Section.jsx            # reusable section wrapper + heading
    Reveal.jsx             # scroll fade-in
    BrandIcons.jsx         # GitHub / LinkedIn SVG icons
    ProjectCard.jsx        # reusable project card (renders one array item)
    ProjectCard.css        # project card styles
  sections/
    Hero        QuickScan   About      Skills
    Projects    Experience  Education  GithubSection
    Opportunity Contact
```

## Where to edit content

Everything lives in **`src/data/siteData.js`**:

| What | Export |
| --- | --- |
| Name, logo, resume path | `profile` |
| GitHub / LinkedIn / email / phone | `links` |
| Navbar links | `navLinks` |
| Hero text + code window | `hero` |
| Quick-scan strip below hero | `quickScan` |
| About paragraphs + summary card | `about` |
| Skills | `skillCategories` |
| Projects | `projects` |
| Experience timeline | `experience` |
| Education | `education` |
| GitHub section + username | `githubSection` |
| "Open to work" CTA | `opportunity` |
| Contact channels | `contact` |

## Add a new project

Every project on the site comes from the `projects` array in **`src/data/siteData.js`**.
To add one:

1. Copy an existing object in the array and paste it in.
2. Give it a **unique `id`** (short slug, e.g. `"my-new-app"`) — it is used as the React key.
3. Fill in `title`, `category`, `description`, `technologies` and `features`.
4. Set `github` / `demo` / `image` to a real URL or path, or leave them `null`.
   A `null` link hides its button, and a `null` image shows a designed placeholder.
5. Keep `featured: true` on **one** project only (the large card at the top).

Nothing else needs to change — the card appears automatically in the grid.
The featured card lists every feature; the supporting cards show the first three
and count the rest, so the row below stays even.

## Resume

Replace the placeholder file at **`public/resume.pdf`** with your real resume, keeping the
same file name. Every "Download Resume" button points to `/resume.pdf`.

## Profile photo

The hero portrait is loaded from **`public/profile.jpg`** (the path is set by
`profile.profileImage` in `src/data/siteData.js`). If the file is missing, a monogram
placeholder is shown instead of a broken image. The crop is set in
`src/sections/Hero.css` (`.hero__portrait-img`): the picture is scaled to `150%`,
pulled up with `top` / `left` and focused with `object-position`, so the empty
backdrop above the head is cropped away while the face, shoulders and suit stay in
frame. Nudge those four values if you swap the photo.

## Notes

- The contact form has **no backend** — it opens the visitor's email app, then shows a
  success panel with a "copy email" fallback.
- Repository cards load live from the GitHub API; if the request fails, the section shows
  a plain GitHub link instead.
- Before deploying, update the `og:url` / `og:image` placeholders in `index.html`.