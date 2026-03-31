# The Waiting Room — Sales Page

Standalone HTML/CSS/JS sales page for The Waiting Room journal. Drives traffic directly to Amazon.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Full page markup |
| `styles.css` | Dark theme, gold accents, responsive |
| `script.js` | FAQ accordion, scroll effects, UTM passthrough |

## Setup Before Deploying

### 1. Add the book cover image
Copy `waiting_room_last_frame_v2.jpg` from the main project's `public/` folder into this directory.

```
cp ../public/waiting_room_last_frame_v2.jpg ./
```

### 2. Replace placeholder testimonials
In `index.html`, find the section marked `<!-- REPLACE THESE WITH REAL AMAZON REVIEWS WHEN AVAILABLE -->` and swap in real customer quotes from your Amazon listing.

### 3. Confirm prices
The page currently shows **Paperback $29.99 | Hardcover $39.99**. Update if your pricing changes.

## Deploying

### Option A: Vercel (recommended — matches existing setup)
1. Go to vercel.com → Add New Project
2. Import from GitHub — select the `waiting-room-sales/` folder as the root
3. Framework: **Other** (no build step needed)
4. Deploy

Or deploy via CLI:
```
cd waiting-room-sales
npx vercel --name waiting-room-sales
```

### Option B: Netlify
Drag and drop the entire `waiting-room-sales/` folder onto netlify.com/drop.

### Option C: GitHub Pages
Push to a separate repo and enable Pages in Settings.

## UTM Tracking

All Amazon buttons include `?ref=ext_waiting_room_site` by default.

For Meta ads, append UTM params to your landing page URL:
```
https://your-domain.com/sales?utm_source=meta&utm_medium=paid&utm_campaign=waiting_room
```

The `script.js` UTM passthrough will automatically add these to every Amazon click so you can track conversions in Meta Ads Manager.

## Amazon Link

All links use: `https://www.amazon.com/dp/B0GRQBC2JP?ref=ext_waiting_room_site`

To update, find and replace `B0GRQBC2JP` across `index.html`.
