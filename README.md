# Peehu Solanki — AI/ML Portfolio Website

A modern, high-performance, single-page slide portfolio website built for **Peehu Solanki**, B.Tech CSE (AI/ML) student at **JECRC University, Jaipur (Batch 2026–2030)**.

Designed with an electric indigo & cyber cyan aesthetic, full-height scroll-snapped slides, interactive neural network canvas, animated SVG progress rings, typewriter text effect, dark/light theme toggle, and a single-file content manager (`data.js`).

---

## 🌟 Key Features

1. **Slide-Style Architecture**:
   - 5 full-screen sections with smooth CSS scroll-snapping (`scroll-snap-type: y mandatory`).
   - Fixed side dot navigation with tooltips.
   - Keyboard arrow-key navigation (`↑`, `↓`, `PageUp`, `PageDown`, `Space`, `Home`, `End`).
   - Top reading progress bar showing scroll depth in real time.
2. **Hero Slide**:
   - High-performance HTML5 interactive neural network particle canvas that gently responds to mouse movements.
   - Dynamic typewriter cycling through career titles (*Machine Learning Engineer*, *Deep Learning Explorer*, *Problem Solver*).
   - Quick action buttons ("View Projects", "Download Resume", "Contact Me") and glowing social icons.
3. **About & Education Slide**:
   - Personalized bio and 4 highlight metric cards (*9.2 CGPA*, *6+ Projects*, *3 Certifications*, *1 Internship*).
   - Animated circular SVG progress rings for **CGPA (9.2 / 10)** and **Class XII (92%)**.
   - Vertical timeline for academic journey at JECRC University & CBSE.
4. **Skills Slide**:
   - Grouped cards: Languages, AI/ML, Web Frameworks, and Developer Tools.
   - Animated progress bars triggered on view.
   - "Currently Learning" badge showcase (*Generative AI*, *LangChain*, *MLOps*).
5. **Projects Slide**:
   - 6 detailed projects with realistic vector art banners, category filters, tech stack chips, metrics, and repository/demo links.
   - Interactive deep-dive modal popup for comprehensive architecture and performance metrics.
6. **Experience & Contact Slide**:
   - Machine Learning Internship card with quantifiable metrics (+12% sentiment model accuracy gain).
   - Verified certifications list (Stanford/Coursera, Udemy, Google).
   - Working contact form with validation and toast feedback.
   - Live Jaipur local time clock (IST) and one-click copy email button.
7. **Dark / Light Mode**:
   - Smooth transition with preference stored in `localStorage`.
8. **Zero Dependencies**:
   - Built exclusively in **Pure HTML5, CSS3, and Vanilla JavaScript (ES6+)**. No build tools, webpack, or npm packages required!

---

## 📁 File Structure

```text
peehu/
├── index.html       # Semantic HTML5 markup, SEO meta tags & Open Graph
├── style.css        # Responsive CSS design system, dark/light tokens, animations
├── data.js          # Single source of truth for all portfolio content
├── main.js          # JavaScript engine (canvas, navigation, modal, theme, rings)
├── favicon.svg      # Futuristic AI neural brain SVG icon
└── README.md        # Documentation and deployment guide
```

---

## 🚀 How to Run Locally

Because this project is built entirely in vanilla HTML, CSS, and JavaScript, you can run it using any of the following methods:

### Option 1: Direct File Opening (Simplest)
Double-click `index.html` in your file explorer to open it directly in Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option 2: Using VS Code Live Server
1. Open the `peehu` folder in **Visual Studio Code**.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and select **"Open with Live Server"**.

### Option 3: Using PowerShell (Built-in Windows Server)
Run this command directly in PowerShell from the project folder:
```powershell
powershell -ExecutionPolicy Bypass -Command "Start-Process 'index.html'"
```

### Option 4: Using Python (if installed)
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000` in your browser.

---

## ✏️ How to Customize Content (`data.js`)

All website content is organized in a single file: `data.js`. You do not need to touch HTML or CSS to update your personal details, projects, or links!

### 1. Update Personal Info & Social Links
Open `data.js` and locate `personal`:
```javascript
personal: {
  name: "Peehu Solanki",
  headline: "AI/ML Enthusiast | Full-Stack Developer",
  email: "your.real.email@gmail.com",
  resumeUrl: "https://your-drive-link-to-resume.pdf",
  socials: {
    github: "https://github.com/your-username",
    linkedin: "https://linkedin.com/in/your-username",
    email: "mailto:your.real.email@gmail.com"
  }
}
```

### 2. Add or Edit Projects
Locate `projects` array in `data.js`:
```javascript
{
  id: "my-new-project",
  title: "My AI Project Name",
  category: "Computer Vision",
  badge: "95% Accuracy",
  tagline: "Short one-line summary",
  description: "Card description...",
  longDescription: "Detailed breakdown shown inside the modal dialog...",
  tech: ["PyTorch", "OpenCV", "FastAPI"],
  metrics: "Sub-second inference time",
  github: "https://github.com/your-username/repo-name",
  demo: "https://your-demo-link.app"
}
```

### 3. Connect Real Contact Form (Formspree)
1. Sign up for free at [Formspree.io](https://formspree.io/).
2. Create a new form and copy your Form ID (e.g. `https://formspree.io/f/mqkvnxyz`).
3. In `data.js`, paste your URL into `formspreeEndpoint`:
   ```javascript
   contact: {
     formspreeEndpoint: "https://formspree.io/f/your_form_id"
   }
   ```
Submissions from your website will now be delivered straight to your email inbox!

---

## 🌐 Deployment Guide

### Deploying to Netlify (Recommended - 60 seconds)
1. Visit [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the `peehu` project folder into the browser window.
3. Your site will instantly go live with an HTTPS link (e.g., `peehu-solanki.netlify.app`)!

### Deploying to Vercel
1. Install Vercel CLI (optional) or push this folder to a GitHub repository.
2. In [Vercel Dashboard](https://vercel.com/new), select **"Add New Project"** and import your repository.
3. Keep the build command empty (Framework Preset: **Other** / Static).
4. Click **Deploy**.

### Deploying to GitHub Pages
1. Create a GitHub repository named `peehu-portfolio`.
2. Push your files to the `main` branch:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Peehu Solanki AI/ML portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/peehu-portfolio.git
   git push -u origin main
   ```
3. Go to **Settings > Pages > Branch: main / root** and click **Save**.

---

## 📄 License
Designed and developed for Peehu Solanki. Free to use and customize for personal portfolios.
