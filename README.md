# B Parameswaran — Portfolio

> AI Engineer & Developer · Building intelligent systems and immersive web experiences.

A personal portfolio site showcasing projects, skills, and experience in AI/ML and full-stack web development. Designed with a techy, terminal-inspired aesthetic and built on a modern, type-safe full-stack React stack.

🌐 **Live:** _add your deployment URL_
📄 **Resume:** [`/Resume_Parameswaran_TBPA.pdf`](public/Resume_Parameswaran_TBPA.pdf)

---

## ✨ Features

- ⚡ **SSR-first** with TanStack Start + Vite 7 for fast loads and great SEO
- 🧭 **Type-safe routing** via TanStack Router (file-based routes)
- 🎨 **Custom design system** in plain CSS — no Tailwind, no UI framework lock-in
- 🖥️ **Techy / terminal aesthetic** with JetBrains Mono, neon green/cyan accents, and grid backdrop
- 📱 **Fully responsive** with a mobile-friendly nav drawer
- 🔍 **Per-route SEO** with unique titles, descriptions, and Open Graph tags
- 🧩 **Modular content** — projects, skills, and experience driven by `src/data/portfolio.ts`
- 📄 **Downloadable resume** served from `/public`

---

## 🧱 Tech Stack

| Layer       | Tech                                                  |
| ----------- | ----------------------------------------------------- |
| Framework   | [TanStack Start](https://tanstack.com/start) (React 19) |
| Routing     | TanStack Router (file-based)                          |
| Build Tool  | Vite 7                                                |
| Language    | TypeScript (strict)                                   |
| Styling     | Plain CSS with design tokens (`src/styles.css`)       |
| Icons       | [lucide-react](https://lucide.dev)                    |
| Fonts       | JetBrains Mono · Inter (Google Fonts)                 |
| Deployment  | Edge runtime (Cloudflare Workers compatible)          |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Bun](https://bun.sh/) (recommended) or npm / pnpm

### Install

```bash
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:8080](http://localhost:8080) to view the site.
The dev server has HMR — edits reflect instantly.

### Production Build

```bash
bun run build
bun run start
```

---

## 📁 Project Structure

```
.
├── public/                    # Static assets (resume, favicon, og images)
├── src/
│   ├── components/
│   │   ├── SiteLayout.tsx     # Shared header, nav, footer
│   │   └── ui/                # Reusable UI primitives
│   ├── data/
│   │   └── portfolio.ts       # ✏️ Edit your content here
│   ├── routes/
│   │   ├── __root.tsx         # Root layout + global head
│   │   ├── index.tsx          # Home / hero
│   │   ├── about.tsx          # About + experience
│   │   ├── projects.tsx       # Projects grid
│   │   └── contact.tsx        # Contact info
│   ├── styles.css             # 🎨 Design tokens + global styles
│   ├── router.tsx             # Router config
│   └── server.ts              # SSR entry
├── vite.config.ts
└── package.json
```

---

## ✏️ Customize

All content lives in **`src/data/portfolio.ts`** — update your name, bio, skills, projects, and experience there. No component edits needed for normal content changes.

To restyle, tweak the CSS variables at the top of **`src/styles.css`**:

```css
:root {
  --primary: #00ffa6;     /* neon accent */
  --bg:      #05070a;     /* page background */
  --mono:    "JetBrains Mono", monospace;
  /* ...spacing, radii, shadows */
}
```

To swap your resume, replace `public/Resume_Parameswaran_TBPA.pdf` (or update the link in `src/routes/index.tsx`).

---

## 🛣️ Routes

| Path        | Page          |
| ----------- | ------------- |
| `/`         | Home / Hero   |
| `/about`    | About & Experience |
| `/projects` | Projects      |
| `/contact`  | Contact       |

Add a new page by creating `src/routes/<name>.tsx` — the router auto-registers it.

---

## 📬 Contact

- **Email:** bparameswaran96@gmail.com
- **GitHub:** [@TBPA1896](https://github.com/TBPA1896)
- **LinkedIn:** [tbpa1896](https://www.linkedin.com/in/tbpa1896/)
- **HackerRank:** [bparameswaran96](https://www.hackerrank.com/profile/bparameswaran96)

---

## 📄 License

MIT © B Parameswaran
