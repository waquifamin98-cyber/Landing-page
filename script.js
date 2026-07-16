/* ============================================================
   TechVault PC Store - Main JavaScript
   Handles: Product data store, Cart, Search, Carousel, Animations
   ============================================================ */

/* ======================== DEFAULT PRODUCT DATA ======================== */
/* This data seeds localStorage on first visit.
   Admin panel edits are saved to the same localStorage key. */

const FEATURED_PRODUCT_UPDATES = {
    hav001: { price: 12999, originalPrice: 14999, image: "images/products/havit-hv-kb435l.jpg" },
    dee001: { price: 14999, originalPrice: 16999, image: "images/products/deepcool-ak620.jpg" },
    msi001: { price: 34999, originalPrice: 39999, image: "images/products/msi-mag-b660.jpg" },
    msi003: { price: 58999, originalPrice: 64999, image: "images/products/msi-mag274qrf.webp" },
    ant001: { price: 10999, originalPrice: 12999, image: "images/products/antec-nx400.png" }
};

const DEFAULT_PRODUCTS = [
    {
        id: "hav001",
        name: "Havit HV-KB435L TKL Mechanical Keyboard",
        brand: "Havit",
        category: "peripherals",
        price: 12999,
        originalPrice: 14999,
        stock: 45,
        rating: 4.5,
        ratingCount: 287,
        image: "images/products/havit-hv-kb435l.jpg",
        description: "Compact tenkeyless mechanical keyboard with blue switches and RGB backlighting.",
        featured: true,
        onSale: true,
        dateAdded: "2026-01-15"
    },
    {
        id: "dee001",
        name: "Deepcool AK620 CPU Air Cooler",
        brand: "Deepcool",
        category: "cooling",
        price: 14999,
        originalPrice: 16999,
        stock: 28,
        rating: 4.8,
        ratingCount: 512,
        image: "images/products/deepcool-ak620.jpg",
        description: "High-performance dual-tower CPU air cooler with 260W TDP support and two 120mm fans.",
        featured: true,
        onSale: false,
        dateAdded: "2025-12-01"
    },
    {
        id: "dee002",
        name: "Deepcool LS720 360mm AIO Liquid Cooler",
        brand: "Deepcool",
        category: "cooling",
        price: 14299,
        originalPrice: 17599,
        stock: 14,
        rating: 4.7,
        ratingCount: 198,
        image: "images/products/deepcool-ls720.jpg",
        description: "360mm AIO liquid cooler with infinity mirror pump head and three FK120 fans.",
        featured: true,
        onSale: true,
        dateAdded: "2026-01-05"
    },
    {
        id: "msi001",
        name: "MSI MAG B660 TOMAHAWK WiFi Motherboard",
        brand: "MSI",
        category: "motherboards",
        price: 34999,
        originalPrice: 39999,
        stock: 16,
        rating: 4.7,
        ratingCount: 234,
        image: "images/products/msi-mag-b660.jpg",
        description: "Intel B660 ATX motherboard with DDR5 support, WiFi 6E, 2.5G LAN, and extended heatsink design.",
        featured: true,
        onSale: true,
        dateAdded: "2025-11-20"
    },
    {
        id: "msi002",
        name: "MSI PRO B760M-A WiFi mATX Motherboard",
        brand: "MSI",
        category: "motherboards",
        price: 14299,
        originalPrice: null,
        stock: 22,
        rating: 4.5,
        ratingCount: 167,
        image: "images/products/msi-pro-b760m.jpg",
        description: "Compact mATX motherboard for 12th/13th gen Intel with WiFi 6E and DDR5 support.",
        featured: false,
        onSale: false,
        dateAdded: "2026-01-12"
    },
    {
        id: "msi003",
        name: "MSI Optix MAG274QRF-QD 27\" Gaming Monitor",
        brand: "MSI",
        category: "peripherals",
        price: 58999,
        originalPrice: 64999,
        stock: 8,
        rating: 4.6,
        ratingCount: 312,
        image: "images/products/msi-mag274qrf.webp",
        description: "27\" QHD (2560x1440) Rapid IPS gaming monitor, 165Hz, 1ms GTG, Quantum Dot.",
        featured: true,
        onSale: true,
        dateAdded: "2025-10-15"
    },
    {
        id: "ant001",
        name: "Antec NX400 ATX Mid-Tower Case",
        brand: "Antec",
        category: "cases",
        price: 10999,
        originalPrice: 12999,
        stock: 34,
        rating: 4.4,
        ratingCount: 198,
        image: "images/products/antec-nx400.png",
        description: "Mesh front panel ATX mid-tower with 4 pre-installed 120mm ARGB fans and tempered glass side.",
        featured: true,
        onSale: true,
        dateAdded: "2026-01-28"
    },
    {
        id: "gig001",
        name: "Gigabyte B650 AORUS Elite AX Motherboard",
        brand: "Gigabyte",
        category: "motherboards",
        price: 21999,
        originalPrice: null,
        stock: 12,
        rating: 4.7,
        ratingCount: 189,
        image: "images/products/gigabyte-b650.jpg",
        description: "AMD B650 ATX motherboard with DDR5, WiFi 6E, PCIe 5.0, and advanced thermal design.",
        featured: true,
        onSale: false,
        dateAdded: "2025-12-15"
    }
];

/* ======================== DATA STORE ======================== */
/**
 * ProductStore manages the product database using localStorage.
 * The admin panel writes to the same key, so changes appear instantly.
 */
const ProductStore = {
    STORAGE_KEY: 'techvault_products',

    /** Initialize localStorage with default products if empty or stale */
    init() {
        const stored = localStorage.getItem(this.STORAGE_KEY);
        if (!stored) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
            return;
        }
        try {
            const products = JSON.parse(stored);
            if (products.length === 0) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
                return;
            }

            const updatedProducts = products.map(product => {
                const updates = FEATURED_PRODUCT_UPDATES[product.id];
                return updates ? { ...product, ...updates } : product;
            });

            const needsRefresh = updatedProducts.some((product, index) => JSON.stringify(product) !== JSON.stringify(products[index]));
            if (needsRefresh) {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedProducts));
            }
        } catch (e) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(DEFAULT_PRODUCTS));
        }
    },

    /** Get all products */
    getAll() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    },

    /** Get a single product by ID */
    getById(id) {
        return this.getAll().find(p => p.id === id);
    },

    /** Save all products */
    saveAll(products) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    },

    /** Add a product */
    add(product) {
        const products = this.getAll();
        product.id = product.id || 'prod_' + Date.now();
        product.dateAdded = product.dateAdded || new Date().toISOString().split('T')[0];
        products.push(product);
        this.saveAll(products);
        return product;
    },

    /** Update a product by ID */
    update(id, updates) {
        const products = this.getAll();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = { ...products[index], ...updates };
            this.saveAll(products);
            return products[index];
        }
        return null;
    },

    /** Delete a product by ID */
    remove(id) {
        const products = this.getAll().filter(p => p.id !== id);
        this.saveAll(products);
    },

    /** Search products by query (name, brand, category) */
    search(query) {
        const q = query.toLowerCase().trim();
        if (!q) return [];
        return this.getAll().filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );
    },

    /** Get products filtered by category */
    getByCategory(category) {
        return this.getAll().filter(p => p.category === category);
    },

    /** Get products filtered by brand */
    getByBrand(brand) {
        return this.getAll().filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    },

    /** Get featured products */
    getFeatured() {
        return this.getAll().filter(p => p.featured);
    },

    /** Get products on sale */
    getOnSale() {
        return this.getAll().filter(p => p.onSale);
    }
};

/* ======================== CART MODULE ======================== */
/**
 * Cart manages the shopping cart using localStorage.
 */
const Cart = {
    STORAGE_KEY: 'techvault_cart',

    /** Get all cart items */
    getItems() {
        return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    },

    /** Save cart items */
    saveItems(items) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
        this.updateUI();
    },

    /** Add an item to the cart */
    addItem(productId, qty = 1) {
        const product = ProductStore.getById(productId);
        if (!product) return;

        const items = this.getItems();
        const existing = items.find(i => i.productId === productId);

        if (existing) {
            existing.qty = Math.min(existing.qty + qty, product.stock);
        } else {
            items.push({ productId, qty: Math.min(qty, product.stock) });
        }

        this.saveItems(items);
        showToast(`${product.name} added to cart!`, 'success');
    },

    /** Update item quantity */
    updateQty(productId, qty) {
        const items = this.getItems();
        const product = ProductStore.getById(productId);
        const item = items.find(i => i.productId === productId);

        if (item && product) {
            item.qty = Math.min(Math.max(1, qty), product.stock);
            this.saveItems(items);
        }
    },

    /** Remove an item */
    removeItem(productId) {
        const items = this.getItems().filter(i => i.productId !== productId);
        this.saveItems(items);
    },

    /** Clear all items */
    clear() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.updateUI();
    },

    /** Get total item count */
    getCount() {
        return this.getItems().reduce((sum, i) => sum + i.qty, 0);
    },

    /** Get subtotal price */
    getSubtotal() {
        return this.getItems().reduce((sum, i) => {
            const product = ProductStore.getById(i.productId);
            return sum + (product ? product.price * i.qty : 0);
        }, 0);
    },

    /** Update all cart UI elements */
    updateUI() {
        // Update badge count
        const countEl = document.getElementById('cartCount');
        if (countEl) countEl.textContent = this.getCount();

        // Update drawer
        const itemsContainer = document.getElementById('cartItems');
        const footerEl = document.getElementById('cartFooter');
        const subtotalEl = document.getElementById('cartSubtotal');
        if (!itemsContainer) return;

        const items = this.getItems();

        if (items.length === 0) {
            itemsContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
            if (footerEl) footerEl.style.display = 'none';
            return;
        }

        let html = '';
        items.forEach(item => {
            const product = ProductStore.getById(item.productId);
            if (!product) return;
            html += `
                <div class="cart-item">
                    <img src="${product.image}" alt="${product.name}" class="cart-item__img"
                         onerror="this.style.display='none'">
                    <div class="cart-item__details">
                        <div class="cart-item__name">${product.name}</div>
                        <div class="cart-item__price">৳${product.price.toLocaleString('en-IN')}</div>
                        <div class="cart-item__qty">
                            <button onclick="Cart.updateQty('${product.id}', ${item.qty - 1})">-</button>
                            <span>${item.qty}</span>
                            <button onclick="Cart.updateQty('${product.id}', ${item.qty + 1})">+</button>
                        </div>
                    </div>
                    <button class="cart-item__remove" onclick="Cart.removeItem('${product.id}')" aria-label="Remove">&times;</button>
                </div>`;
        });
        itemsContainer.innerHTML = html;

        if (footerEl) {
            footerEl.style.display = 'block';
            if (subtotalEl) subtotalEl.textContent = '৳' + this.getSubtotal().toLocaleString('en-IN', {minimumFractionDigits: 0});
        }
    }
};

/* ======================== HERO CAROUSEL ======================== */
const Carousel = {
    currentSlide: 0,
    totalSlides: 0,
    autoplayInterval: null,
    autoplayDelay: 5000,

    init() {
        const slides = document.querySelectorAll('.hero__slide');
        if (!slides.length) return;

        this.totalSlides = slides.length;
        this.bindEvents();
        this.startAutoplay();
    },

    goTo(index) {
        if (index >= this.totalSlides) index = 0;
        if (index < 0) index = this.totalSlides - 1;
        this.currentSlide = index;

        // Update slides
        document.querySelectorAll('.hero__slide').forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });

        // Update dots
        document.querySelectorAll('.hero__dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    },

    next() { this.goTo(this.currentSlide + 1); },
    prev() { this.goTo(this.currentSlide - 1); },

    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.next(), this.autoplayDelay);
    },

    resetAutoplay() {
        clearInterval(this.autoplayInterval);
        this.startAutoplay();
    },

    bindEvents() {
        const next = document.getElementById('heroNext');
        const prev = document.getElementById('heroPrev');
        if (next) next.addEventListener('click', () => { this.next(); this.resetAutoplay(); });
        if (prev) prev.addEventListener('click', () => { this.prev(); this.resetAutoplay(); });

        document.querySelectorAll('.hero__dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.goTo(parseInt(dot.dataset.slide));
                this.resetAutoplay();
            });
        });
    }
};

/* ======================== SEARCH MODULE ======================== */
const Search = {
    debounceTimer: null,

    init() {
        const input = document.getElementById('searchInput');
        const dropdown = document.getElementById('searchDropdown');
        if (!input || !dropdown) return;

        input.addEventListener('input', () => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => this.performSearch(input.value, dropdown), 250);
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar__search')) {
                dropdown.classList.remove('active');
            }
        });

        // Handle Enter key
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const q = input.value.trim();
                if (q) window.location.href = `products.html?search=${encodeURIComponent(q)}`;
            }
        });

        // Search button click
        const searchBtn = document.getElementById('searchBtn');
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const q = input.value.trim();
                if (q) window.location.href = `products.html?search=${encodeURIComponent(q)}`;
            });
        }
    },

    performSearch(query, dropdown) {
        if (!query.trim()) {
            dropdown.classList.remove('active');
            return;
        }

        const results = ProductStore.search(query).slice(0, 6);

        if (results.length === 0) {
            dropdown.innerHTML = '<div class="search-dropdown__no-results">No products found</div>';
        } else {
            dropdown.innerHTML = results.map(p => `
                <a href="products.html?id=${p.id}" class="search-dropdown__item">
                    <img src="${p.image}" alt="${p.name}" class="search-dropdown__img"
                         onerror="this.style.display='none'">
                    <div class="search-dropdown__info">
                        <h4>${p.name}</h4>
                        <span>৳${p.price.toLocaleString('en-IN')}</span>
                    </div>
                </a>
            `).join('');
        }

        dropdown.classList.add('active');
    }
};

/* ======================== PRODUCT CARD RENDERER ======================== */
/**
 * Renders a product card HTML string.
 * Used by both index.html and products.html.
 */
function renderProductCard(product) {
    // Star rating
    const fullStars = Math.floor(product.rating);
    const halfStar = product.rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    const starsHTML = '&#9733;'.repeat(fullStars) +
                      (halfStar ? '&#9734;' : '') +
                      '&#9734;'.repeat(emptyStars);

    // Badges
    let badgesHTML = '';
    if (product.onSale && product.originalPrice) {
        const discount = Math.round((1 - product.price / product.originalPrice) * 100);
        badgesHTML += `<span class="product-badge product-badge--sale">-${discount}%</span>`;
    }
    if (product.featured) {
        badgesHTML += '<span class="product-badge product-badge--featured">Featured</span>';
    }
    if (product.stock <= 0) {
        badgesHTML += '<span class="product-badge product-badge--out-of-stock">Out of Stock</span>';
    }

    // Stock status
    let stockHTML = '';
    if (product.stock <= 0) {
        stockHTML = '<div class="product-card__stock product-card__stock--out-of-stock">Out of Stock</div>';
    } else if (product.stock <= 10) {
        stockHTML = `<div class="product-card__stock product-card__stock--low-stock">Only ${product.stock} left</div>`;
    } else {
        stockHTML = '<div class="product-card__stock product-card__stock--in-stock">In Stock</div>';
    }

    // Original price
    const originalPriceHTML = product.originalPrice
        ? `<span class="product-card__original-price">৳${product.originalPrice.toLocaleString('en-IN')}</span>`
        : '';

    return `
    <article class="product-card fade-in" data-product-id="${product.id}">
        <div class="product-card__badges">${badgesHTML}</div>
        <div class="product-card__image">
            <img src="${product.image}" alt="${product.name} - ${product.brand}" loading="lazy"
                 onerror="this.outerHTML='<div class=\\'product-card__image-placeholder\\'>&#128187;</div>'">
            <div class="product-card__quick-actions">
                <a href="products.html?id=${product.id}" class="quick-action-btn" title="Quick View">&#128065;</a>
            </div>
        </div>
        <div class="product-card__info">
            <div class="product-card__brand">${product.brand}</div>
            <h3 class="product-card__name">${product.name}</h3>
            <div class="product-card__rating">
                <span class="product-card__stars">${starsHTML}</span>
                <span class="product-card__rating-count">(${product.ratingCount})</span>
            </div>
            <div class="product-card__pricing">
                <span class="product-card__price">৳${product.price.toLocaleString('en-IN')}</span>
                ${originalPriceHTML}
            </div>
            ${stockHTML}
            <button class="product-card__add-btn"
                    onclick="Cart.addItem('${product.id}')"
                    ${product.stock <= 0 ? 'disabled' : ''}>
                ${product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
        </div>
    </article>`;
}

/* ======================== RENDER FEATURED PRODUCTS ======================== */
function renderFeaturedProducts() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    const featured = ProductStore.getFeatured();
    grid.innerHTML = featured.map(p => renderProductCard(p)).join('');
    observeFadeInElements();
}

/* ======================== SCROLL ANIMATIONS ======================== */
function observeFadeInElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}

/* ======================== NAVBAR SCROLL EFFECT ======================== */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
}

/* ======================== MOBILE MENU ======================== */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close on link click
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });
}

/* ======================== CART DRAWER TOGGLE ======================== */
function initCartDrawer() {
    const toggle = document.getElementById('cartToggle');
    const drawer = document.getElementById('cartDrawer');
    const overlay = document.getElementById('cartOverlay');
    const close = document.getElementById('cartClose');
    const clearBtn = document.getElementById('clearCartBtn');

    if (!toggle || !drawer) return;

    const openCart = () => {
        drawer.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        Cart.updateUI();
    };

    const closeCart = () => {
        drawer.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', openCart);
    if (close) close.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);
    if (clearBtn) clearBtn.addEventListener('click', () => { Cart.clear(); Cart.updateUI(); });
}

/* ======================== TOAST NOTIFICATION ======================== */
function showToast(message, type = 'success') {
    // Remove existing toast
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span>${type === 'success' ? '&#10003;' : '&#9888;'}</span> ${message}`;
    document.body.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => toast.classList.add('show'));

    // Auto-hide
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

/* ======================== NEWSLETTER FORM ======================== */
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail');
        if (email && email.value.trim()) {
            showToast('Thanks for subscribing! Check your email for a welcome offer.', 'success');
            email.value = '';
        }
    });
}

/* ======================== ADD FADE-IN CLASS TO SECTIONS ======================== */
function initScrollAnimations() {
    const sections = document.querySelectorAll(
        '.trust-badges, .brands-strip, .featured-products, .categories, ' +
        '.promo-banner, .testimonials, .newsletter, .store-location'
    );
    sections.forEach(s => s.classList.add('fade-in'));
    observeFadeInElements();
}

/* ======================== INITIALIZE EVERYTHING ======================== */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize data store first
    ProductStore.init();

    // Initialize UI modules
    Carousel.init();
    Search.init();
    initNavbarScroll();
    initMobileMenu();
    initCartDrawer();
    initNewsletter();

    // Render products
    renderFeaturedProducts();

    // Scroll animations
    initScrollAnimations();

    // Initialize cart UI
    Cart.updateUI();
});
