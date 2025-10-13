# Endeavor Car Rentals — Static Site

A lightweight, single‑page website you can deploy on GitHub Pages for your rental business.  
All assets are local (no external fonts) and it works great on mobile.

## Quick Start
1. Create a new GitHub repo and upload everything in this folder.
2. Enable **Settings › Pages** → **Deploy from branch** (branch: `main`, folder: `/root`).
3. Visit your Pages URL to see the site live.

## Customize
- **Logo/Photos:** Replace files in `assets/img/` with your brand images. Update the `<link rel="icon">` and the hero background in `assets/css/styles.css` if needed.
- **Phone numbers:** Search for the numbers in `index.html` & `assets/js/main.js` and update them.
- **Email target:** In `assets/js/main.js`, replace `endeavorrentals@example.com` with your inbox to receive email requests.
- **Prices:** Edit the "Prices Per Week" cards in `index.html`.

## Notes
- The “Text Request” button opens the user’s SMS app with a prefilled message (no server needed).
- The schema (`AutoRental`) helps with SEO.
- This site uses only HTML/CSS/JS. Add a backend or a form service later if you want automated submissions.

## License
MIT — do anything, just keep the license.