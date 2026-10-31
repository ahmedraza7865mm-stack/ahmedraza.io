# Ahmed Raza - Portfolio

A static portfolio website. No backend, no build step, no paid services.

## Folder structure
```
index.html          main page
css/style.css       all styles
js/main.js          page scripts (counters, animations, menu, working hours)
js/loader.js        battery loading screen
js/eyes.js          eyes that follow the cursor
js/fx.js            cursor circle and moving hero background
js/dino.js          small spinning dino in the corner
assets/images/      photo, logo and project screenshots
assets/video/       showreel video
robots.txt, sitemap.xml  for search engines
assets/cv/          Ahmed-Raza-CV.pdf (the Download CV button)
```

## Put it live on GitHub Pages (free)
1. Create a new public repository on GitHub, for example `portfolio`.
2. Upload everything from this folder (keep the folders as they are), then click Commit changes.
3. Open Settings > Pages. Under Source choose "Deploy from a branch", branch `main`, folder `/ (root)`, then Save.
4. After 1 to 2 minutes the site is live at `https://YOUR-USERNAME.github.io/portfolio/`.

To open it on your own computer, just double-click `index.html`.

## Notes
- Fonts (Bricolage Grotesque and DM Sans) load free from Google Fonts. Without internet the site falls back to system fonts.
- The contact form opens the visitor's email app addressed to wqahmedraza@gmail.com (no server needed).
- To change the CV, replace `assets/cv/Ahmed-Raza-CV.pdf` and keep the same file name.
- Facebook and TikTok icons still point to the Contact section. Replace the `href` of those icons in `index.html` with your profile links when you have them.
