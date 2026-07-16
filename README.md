# TechVault PC Store - Landing Page

A high-converting, modern landing page for an IT/computer hardware store built with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no build tools required.

## Quick Start

1. **Open `index.html`** in any modern browser — the site works immediately.
2. **Admin panel** — open `admin.html` and log in with:
   - Username: `admin`
   - Password: `admin123`
3. Products are seeded with demo data on first visit and stored in `localStorage`.

## File Structure

```
/
├── index.html          # Homepage / landing page
├── products.html       # Full product catalog with filters
├── style.css           # Main stylesheet (dark theme, responsive)
├── script.js           # Storefront JS (cart, carousel, search, products)
├── admin.html          # Admin panel
├── admin.css           # Admin panel styles
├── admin.js            # Admin panel logic (CRUD, dashboard)
├── sitemap.xml         # XML sitemap for SEO
├── robots.txt          # Robots directive for search engines
├── README.md           # This file
├── images/             # Placeholder image directory (add your own)
│   ├── products/       # Product images
│   ├── hero/           # Hero carousel images
│   ├── categories/     # Category images
│   └── promo/          # Promo banner images
└── checkout.html       # (Create this for checkout functionality)
```

## How It Works

### Product Data Store
- Products are stored in `localStorage` under the key `techvault_products`.
- On first visit, `script.js` seeds localStorage with 20 demo products.
- The admin panel reads/writes to the **same localStorage key**, so changes appear instantly on the storefront.
- **No backend required** — everything runs client-side.

### Admin Panel Sync
1. Open `admin.html` and log in.
2. Add, edit, or delete products.
3. Switch to `index.html` or `products.html` — changes are live immediately.
4. Toggle "Featured" and "On Sale" status per product.

### Cart
- Click "Add to Cart" on any product card.
- Open the slide-in cart drawer (cart icon in navbar).
- Adjust quantities or remove items.
- Cart persists across page refreshes via localStorage.

## Customization Guide

### Replace Placeholder Images
1. Add your product images to `images/products/`.
2. Update the `image` field for each product in the admin panel or edit `DEFAULT_PRODUCTS` in `script.js`.

### Change Branding
- **Logo**: Edit the `.navbar__logo` section in `index.html` and `admin.html`.
- **Colors**: Modify CSS custom properties in `:root` at the top of `style.css`:
  ```css
  --accent-primary: #00d4ff;    /* Change main accent color */
  --accent-secondary: #7b2ff7;  /* Change secondary accent */
  ```
- **Business Info**: Update NAP (Name, Address, Phone) in:
  - `index.html` footer and store location section
  - `index.html` Schema.org JSON-LD markup
  - `sitemap.xml`
  - `robots.txt`

### Add More Products
Use the admin panel (`admin.html`) to add products, or edit the `DEFAULT_PRODUCTS` array in `script.js`.

## SEO Features Included
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Meta title, description, Open Graph, and Twitter Card tags
- Schema.org JSON-LD structured data (LocalBusiness, Product, BreadcrumbList)
- Alt text on all images
- Proper heading hierarchy (single H1 per page)
- `robots.txt` and `sitemap.xml`
- Lazy-loading images
- Clean URL structure via query parameters

## Google Business Profile Setup Checklist

After deploying, follow these steps to optimize your Google Business Profile:

1. **Claim or create** your profile at https://business.google.com
2. **Category selection**: Primary = "Computer store" or "Computer hardware store"; Secondary = "Electronics store", "Office supply store"
3. **NAP consistency**: Ensure Name, Address, Phone match *exactly* what's in the website footer and Schema.org markup
4. **Business hours**: Enter the same hours as shown on the website
5. **Photos**: Upload at least 10-15 high-quality photos:
   - Storefront exterior (2-3 angles)
   - Interior shots
   - Product displays
   - Team/staff photos
6. **Description**: Write a keyword-rich 750-character description mentioning brands you carry
7. **Posts**: Publish weekly Google Posts with:
   - New product announcements
   - Sale/promotion updates
   - PC building tips
8. **Reviews strategy**:
   - Ask satisfied customers to leave reviews
   - Respond to every review (positive and negative) within 24 hours
   - Use keywords in your review responses naturally
9. **Q&A section**: Pre-populate common questions and answers
10. **Products section**: Add your top 25+ products directly to Google Business Profile with prices and images
11. **Attributes**: Enable relevant attributes (e.g., "Identifies as Asian-owned", "Wheelchair accessible", etc.)
12. **Verify** your listing via postcard, phone, or email

## Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License
Free to use and modify. No attribution required.
