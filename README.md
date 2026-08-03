# Animated GitHub README Creator

Generate beautiful, animated GitHub Profile README files with live preview. Choose from 6 unique templates, customize every section, and download your perfect profile — all in the browser.

## Features

- **6 Unique Templates** — Neon Developer, Terminal Hacker, Minimal Professional, Developer Dashboard, VS Code Portfolio, Animated Gradient Portfolio
- **Live Preview** — Split-screen editor with real-time GitHub-style rendering
- **Python-Powered Generation** — Uses Pyodide to run Python in the browser for README generation
- **Animated Widgets** — Typing SVG, GitHub stats, streak, trophy, activity graph, contribution snake
- **Skill Chips** — Clickable chips with custom skill input
- **Dynamic Projects** — Add, remove, and reorder project entries
- **Section Toggles** — Show or hide individual sections
- **Dark/Light Theme** — Toggle between dark and light modes
- **README History** — Saved in LocalStorage with search and filter
- **Copy & Download** — Copy Markdown or download as README.md    
- **Snake Workflow Generator** — Generate the GitHub Actions workflow for contribution snake
- **Demo Data** — Pre-filled demo data to try the generator quickly
- **Fully Responsive** — Works on desktop, tablet, and mobile

## File Structure

```
animated-readme-creator/
├── index.html          # Main application HTML
├── style.css           # Dark theme styles
├── script.js           # Application logic
├── generator.py        # Python README generation (6 templates)
├── README.md           # This file
└── assets/
    ├── logo.svg        # Application logo
    └── templates/      # (reserved for template assets)
```

## How to Run

### Using VS Code Live Server

1. Open the `animated-readme-creator` folder in VS Code
2. Install the **Live Server** extension if you don't have it
3. Right-click `index.html` and select **Open with Live Server**
4. The application opens in your browser

### Direct Browser Open

Simply open `index.html` in your browser. Some features (like fetching `generator.py`) may require a local server due to CORS policies, so Live Server is recommended.

## How Pyodide Works

[Pyodide](https://pyodide.org/) is a Python runtime for the browser compiled to WebAssembly. This application uses it to:

1. Load the Python runtime when the page opens
2. Fetch and execute `generator.py`
3. Pass your form data as a Python dictionary
4. Call the template-specific generation function
5. Return the generated Markdown to JavaScript

This keeps the generation logic in Python while the UI runs in JavaScript.

## Creating Your GitHub Profile README

1. Create a repository named `YOUR_USERNAME/YOUR_USERNAME` (e.g., `Suryakumar45/Suryakumar45`)
2. Make it public and check "Add a README file"
3. Use this application to generate your README
4. Copy the generated Markdown or download it as `README.md`
5. Paste the content into your repository's README
6. Commit and push

## Contribution Snake Setup

The contribution snake animation requires a GitHub Actions workflow:

1. Click **Generate Snake Workflow** in the Settings tab
2. Create the file `.github/workflows/snake.yml` in your profile repository
3. Paste the workflow content
4. Commit and push to the `main` branch
5. The workflow runs daily and generates the snake SVG
6. The snake appears in your profile after the first run

## Templates

| Template | Style | Best For |
|----------|-------|----------|
| Neon Developer | Dark, purple/cyan neon accents | Developers who want a modern, flashy profile |
| Terminal Hacker | Green-on-black terminal aesthetic | Tech enthusiasts and Linux fans |
| Minimal Professional | Clean white/light layout | Job applications and internships |
| Developer Dashboard | Dashboard panels and widgets | Data-driven developers |
| VS Code Portfolio | VS Code editor-inspired design | Creative and coding-focused profiles |
| Animated Gradient Portfolio | Gradient banners and animations | Premium, polished portfolios |

## Technologies Used

- **HTML5** — Structure
- **CSS3** — Styling with CSS variables, glassmorphism, animations
- **Vanilla JavaScript** — All application logic
- **Pyodide** — Python runtime in the browser
- **Python** — README generation logic
- **Marked.js** — Markdown rendering
- **DOMPurify** — HTML sanitization
- **LocalStorage** — History storage

## License

MIT
Heaven X Phoenix
