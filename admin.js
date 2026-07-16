/* ============================================================
   TechVault Admin Panel - JavaScript
   Handles: Auth, CRUD, Dashboard, Product Management
   ============================================================ */

/* ======================== DEFAULT PRODUCTS DATA ======================== */
/* Shared with script.js — used to seed localStorage if empty. */
const ADMIN_DEFAULT_PRODUCTS = [
    { id:"hav001", name:"Havit HV-KB435L TKL Mechanical Keyboard", brand:"Havit", category:"peripherals", price:5499, originalPrice:7149, stock:45, rating:4.5, ratingCount:287, image:"images/products/havit-hv-kb435l.jpg", description:"Compact tenkeyless mechanical keyboard with blue switches and RGB backlighting.", featured:true, onSale:true, dateAdded:"2026-01-15" },
    { id:"dee001", name:"Deepcool AK620 CPU Air Cooler", brand:"Deepcool", category:"cooling", price:5499, originalPrice:null, stock:28, rating:4.8, ratingCount:512, image:"images/products/deepcool-ak620.jpg", description:"High-performance dual-tower CPU air cooler with 260W TDP support.", featured:true, onSale:false, dateAdded:"2025-12-01" },
    { id:"dee002", name:"Deepcool LS720 360mm AIO Liquid Cooler", brand:"Deepcool", category:"cooling", price:14299, originalPrice:17599, stock:14, rating:4.7, ratingCount:198, image:"images/products/deepcool-ls720.jpg", description:"360mm AIO liquid cooler with infinity mirror pump head.", featured:true, onSale:true, dateAdded:"2026-01-05" },
    { id:"msi001", name:"MSI MAG B660 TOMAHAWK WiFi Motherboard", brand:"MSI", category:"motherboards", price:19799, originalPrice:23099, stock:16, rating:4.7, ratingCount:234, image:"images/products/msi-mag-b660.jpg", description:"Intel B660 ATX motherboard with DDR5, WiFi 6E, 2.5G LAN.", featured:true, onSale:true, dateAdded:"2025-11-20" },
    { id:"msi002", name:"MSI PRO B760M-A WiFi mATX Motherboard", brand:"MSI", category:"motherboards", price:14299, originalPrice:null, stock:22, rating:4.5, ratingCount:167, image:"images/products/msi-pro-b760m.jpg", description:"Compact mATX motherboard for 12th/13th gen Intel with WiFi 6E.", featured:false, onSale:false, dateAdded:"2026-01-12" },
    { id:"msi003", name:"MSI Optix MAG274QRF-QD 27\" Gaming Monitor", brand:"MSI", category:"peripherals", price:38499, originalPrice:43999, stock:8, rating:4.6, ratingCount:312, image:"images/products/msi-mag274qrf.webp", description:"27\" QHD Rapid IPS gaming monitor, 165Hz, 1ms, Quantum Dot.", featured:true, onSale:true, dateAdded:"2025-10-15" },
    { id:"ant001", name:"Antec NX400 ATX Mid-Tower Case", brand:"Antec", category:"cases", price:6599, originalPrice:8799, stock:34, rating:4.4, ratingCount:198, image:"images/products/antec-nx400.png", description:"Mesh front panel ATX mid-tower with 4 ARGB fans.", featured:true, onSale:true, dateAdded:"2026-01-28" },
    { id:"gig001", name:"Gigabyte B650 AORUS Elite AX Motherboard", brand:"Gigabyte", category:"motherboards", price:21999, originalPrice:null, stock:12, rating:4.7, ratingCount:189, image:"images/products/gigabyte-b650.jpg", description:"AMD B650 ATX motherboard with DDR5, WiFi 6E, PCIe 5.0.", featured:true, onSale:false, dateAdded:"2025-12-15" }
];

/* ======================== DATA STORE ======================== */
const STORAGE_KEY = 'techvault_products';
const ORDERS_KEY = 'techvault_orders';

const DEMO_ORDERS = [
    {
        id: 'ORD-1721001234567',
        date: '2026-07-14T09:30:00',
        status: 'pending',
        customer: { firstName: 'Rahim', lastName: 'Uddin', email: 'rahim@email.com', phone: '+880-1712-345678', address: '123 Agrabad Road', city: 'Chittagong', state: 'Chittagong', zip: '4100', country: 'BD' },
        payment: 'cod',
        items: [
            { name: 'Havit HV-KB435L TKL Mechanical Keyboard', brand: 'Havit', price: 5499, qty: 1, image: 'images/products/havit-hv-kb435l.jpg' },
            { name: 'Deepcool AK620 CPU Air Cooler', brand: 'Deepcool', price: 5499, qty: 1, image: 'images/products/deepcool-ak620.jpg' }
        ],
        subtotal: 10998,
        shipping: 0,
        total: 10998,
        notes: 'Please deliver before evening.'
    },
    {
        id: 'ORD-1721005678901',
        date: '2026-07-13T14:15:00',
        status: 'shipped',
        customer: { firstName: 'Fatima', lastName: 'Akter', email: 'fatima@email.com', phone: '+880-1812-987654', address: '45 Station Road', city: 'Chittagong', state: 'Chittagong', zip: '4100', country: 'BD' },
        payment: 'credit',
        items: [
            { name: 'MSI Optix MAG274QRF-QD 27" Gaming Monitor', brand: 'MSI', price: 38499, qty: 1, image: 'images/products/msi-mag274qrf.webp' }
        ],
        subtotal: 38499,
        shipping: 0,
        total: 38499,
        notes: ''
    },
    {
        id: 'ORD-1721009012345',
        date: '2026-07-12T11:00:00',
        status: 'delivered',
        customer: { firstName: 'Kamal', lastName: 'Hasan', email: 'kamal@email.com', phone: '+880-1912-555123', address: '78 Oxygen Tower, GEC', city: 'Chittagong', state: 'Chittagong', zip: '4100', country: 'BD' },
        payment: 'cod',
        items: [
            { name: 'Antec NX400 ATX Mid-Tower Case', brand: 'Antec', price: 6599, qty: 1, image: 'images/products/antec-nx400.png' },
            { name: 'Gigabyte B650 AORUS Elite AX Motherboard', brand: 'Gigabyte', price: 21999, qty: 1, image: 'images/products/gigabyte-b650.jpg' }
        ],
        subtotal: 28598,
        shipping: 0,
        total: 28598,
        notes: 'Call before delivery.'
    }
];

function getAllProducts() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ADMIN_DEFAULT_PRODUCTS));
        return [...ADMIN_DEFAULT_PRODUCTS];
    }
    return JSON.parse(data);
}

function saveAllProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

function getProductById(id) {
    return getAllProducts().find(p => p.id === id);
}

function addProduct(product) {
    const products = getAllProducts();
    product.id = 'prod_' + Date.now();
    product.dateAdded = new Date().toISOString().split('T')[0];
    if (!product.rating) product.rating = 0;
    if (!product.ratingCount) product.ratingCount = 0;
    products.push(product);
    saveAllProducts(products);
    return product;
}

function updateProduct(id, updates) {
    const products = getAllProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updates };
        saveAllProducts(products);
        return products[index];
    }
    return null;
}

function deleteProduct(id) {
    const products = getAllProducts().filter(p => p.id !== id);
    saveAllProducts(products);
}

/* ======================== ORDERS DATA STORE ======================== */
function getAllOrders() {
    const data = localStorage.getItem(ORDERS_KEY);
    if (!data) {
        localStorage.setItem(ORDERS_KEY, JSON.stringify(DEMO_ORDERS));
        return [...DEMO_ORDERS];
    }
    return JSON.parse(data);
}

function saveAllOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

function getOrderById(id) {
    return getAllOrders().find(o => o.id === id);
}

function updateOrderStatus(id, newStatus) {
    const orders = getAllOrders();
    const order = orders.find(o => o.id === id);
    if (order) {
        order.status = newStatus;
        saveAllOrders(orders);
        return order;
    }
    return null;
}

function deleteOrder(id) {
    const orders = getAllOrders().filter(o => o.id !== id);
    saveAllOrders(orders);
}

/* ======================== AUTH ======================== */
const VALID_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

function initAuth() {
    // Check if already logged in
    if (sessionStorage.getItem('tv_admin_logged_in') === 'true') {
        showDashboard();
        return;
    }

    const form = document.getElementById('loginForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('loginUser').value.trim();
        const pass = document.getElementById('loginPass').value;
        const errorEl = document.getElementById('loginError');

        if (user === VALID_CREDENTIALS.username && pass === VALID_CREDENTIALS.password) {
            sessionStorage.setItem('tv_admin_logged_in', 'true');
            showDashboard();
        } else {
            errorEl.textContent = 'Invalid username or password. Try admin / admin123';
        }
    });
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminApp').style.display = 'flex';
    initDashboard();
}

function initLogout() {
    document.getElementById('logoutBtn').addEventListener('click', () => {
        sessionStorage.removeItem('tv_admin_logged_in');
        document.getElementById('loginScreen').style.display = 'flex';
        document.getElementById('adminApp').style.display = 'none';
        document.getElementById('loginUser').value = '';
        document.getElementById('loginPass').value = '';
        document.getElementById('loginError').textContent = '';
    });
}

/* ======================== SIDEBAR / TABS ======================== */
function initTabs() {
    document.querySelectorAll('.sidebar__link[data-tab]').forEach(link => {
        link.addEventListener('click', () => {
            const tab = link.dataset.tab;
            if (!tab) return;

            // Update sidebar active state
            document.querySelectorAll('.sidebar__link[data-tab]').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show tab
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            document.getElementById('tab-' + tab).classList.add('active');

            // Update page title
            const titles = { dashboard: 'Dashboard', products: 'Products', 'add-product': 'Add Product', orders: 'Orders' };
            document.getElementById('adminPageTitle').textContent = titles[tab] || tab;

            // Re-render if needed
            if (tab === 'dashboard') renderDashboard();
            if (tab === 'products') renderProductsTable();
            if (tab === 'orders') renderOrders();
        });
    });
}

function initSidebarToggle() {
    const toggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.sidebar') && !e.target.closest('.sidebar-toggle')) {
            sidebar.classList.remove('open');
        }
    });
}

/* ======================== DASHBOARD ======================== */
function initDashboard() {
    renderDashboard();
    initTabs();
    initSidebarToggle();
    initLogout();
    initProductForm();
    initProductSearch();
    initDeleteModal();
    initOrderFilters();
    initOrderDetailModal();
}

function renderDashboard() {
    const products = getAllProducts();

    // Stats
    const totalProducts = products.length;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);
    const lowStock = products.filter(p => p.stock < 10).length;
    const featured = products.filter(p => p.featured).length;

    document.getElementById('statTotalProducts').textContent = totalProducts;
    document.getElementById('statTotalValue').textContent = '৳' + totalValue.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    document.getElementById('statLowStock').textContent = lowStock;
    document.getElementById('statFeatured').textContent = featured;

    // Low Stock Table
    const lowStockBody = document.getElementById('lowStockBody');
    const lowStockProducts = products.filter(p => p.stock < 10).sort((a, b) => a.stock - b.stock);
    if (lowStockProducts.length === 0) {
        lowStockBody.innerHTML = '<tr><td colspan="5" style="text-align:center; color:var(--text-muted); padding:20px;">No low stock items</td></tr>';
    } else {
        lowStockBody.innerHTML = lowStockProducts.map(p => `
            <tr>
                <td class="product-name">${p.name}</td>
                <td>${p.brand}</td>
                <td style="color:${p.stock === 0 ? 'var(--danger)' : 'var(--warning)'}; font-weight:700;">${p.stock}</td>
                <td>৳${p.price.toLocaleString('en-IN')}</td>
                <td><button class="action-btn" onclick="editProduct('${p.id}')">Edit</button></td>
            </tr>
        `).join('');
    }

    // Recent Products Table
    const recentBody = document.getElementById('recentProductsBody');
    const recentProducts = [...products].sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).slice(0, 8);
    recentBody.innerHTML = recentProducts.map(p => `
        <tr>
            <td class="product-name">${p.name}</td>
            <td>${p.brand}</td>
            <td>${p.category}</td>
            <td>৳${p.price.toLocaleString('en-IN')}</td>
            <td>${p.stock}</td>
            <td><span class="toggle-btn ${p.featured ? 'active' : ''}" onclick="toggleFeatured('${p.id}')">${p.featured ? 'Yes' : 'No'}</span></td>
            <td><span class="toggle-btn ${p.onSale ? 'sale-active' : ''}" onclick="toggleOnSale('${p.id}')">${p.onSale ? 'Yes' : 'No'}</span></td>
        </tr>
    `).join('');
}

/* ======================== PRODUCTS TABLE ======================== */
function renderProductsTable(filter = '', category = 'all') {
    let products = getAllProducts();

    if (filter) {
        const q = filter.toLowerCase();
        products = products.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q)
        );
    }

    if (category !== 'all') {
        products = products.filter(p => p.category === category);
    }

    const tbody = document.getElementById('productsTableBody');
    if (products.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align:center; color:var(--text-muted); padding:20px;">No products found</td></tr>';
        return;
    }

    tbody.innerHTML = products.map(p => `
        <tr>
            <td><img src="${p.image}" class="product-thumb" alt="${p.name}" onerror="this.style.display='none'"></td>
            <td class="product-name">${p.name}</td>
            <td>${p.brand}</td>
            <td>${p.category}</td>
            <td>৳${p.price.toLocaleString('en-IN')}</td>
            <td style="color:${p.stock <= 0 ? 'var(--danger)' : p.stock < 10 ? 'var(--warning)' : 'var(--text-secondary)'}; font-weight:${p.stock < 10 ? '700' : '400'};">${p.stock}</td>
            <td><button class="toggle-btn ${p.featured ? 'active' : ''}" onclick="toggleFeatured('${p.id}')">${p.featured ? 'Yes' : 'No'}</button></td>
            <td><button class="toggle-btn ${p.onSale ? 'sale-active' : ''}" onclick="toggleOnSale('${p.id}')">${p.onSale ? 'Yes' : 'No'}</button></td>
            <td>
                <div class="actions">
                    <button class="action-btn" onclick="editProduct('${p.id}')" title="Edit">&#9998;</button>
                    <button class="action-btn action-btn--danger" onclick="confirmDelete('${p.id}')" title="Delete">&#128465;</button>
                </div>
            </td>
        </tr>
    `).join('');
}

function initProductSearch() {
    const searchInput = document.getElementById('productSearch');
    const categoryFilter = document.getElementById('categoryFilter');

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderProductsTable(searchInput.value, categoryFilter.value);
        });
    }

    if (categoryFilter) {
        categoryFilter.addEventListener('change', () => {
            renderProductsTable(searchInput.value, categoryFilter.value);
        });
    }
}

/* ======================== TOGGLE FEATURED / ON SALE ======================== */
function toggleFeatured(id) {
    const product = getProductById(id);
    if (product) {
        updateProduct(id, { featured: !product.featured });
        renderDashboard();
        renderProductsTable(
            document.getElementById('productSearch')?.value || '',
            document.getElementById('categoryFilter')?.value || 'all'
        );
        showToast(product.featured ? 'Removed from featured' : 'Marked as featured', 'info');
    }
}

function toggleOnSale(id) {
    const product = getProductById(id);
    if (product) {
        updateProduct(id, { onSale: !product.onSale });
        renderDashboard();
        renderProductsTable(
            document.getElementById('productSearch')?.value || '',
            document.getElementById('categoryFilter')?.value || 'all'
        );
        showToast(product.onSale ? 'Removed from sale' : 'Marked as on sale', 'info');
    }
}

/* ======================== ADD / EDIT PRODUCT FORM ======================== */
function initProductForm() {
    const form = document.getElementById('productForm');
    const cancelBtn = document.getElementById('formCancelBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const editId = document.getElementById('editProductId').value;

        const productData = {
            name: document.getElementById('prodName').value.trim(),
            brand: document.getElementById('prodBrand').value,
            category: document.getElementById('prodCategory').value,
            price: parseFloat(document.getElementById('prodPrice').value),
            originalPrice: document.getElementById('prodOriginalPrice').value ? parseFloat(document.getElementById('prodOriginalPrice').value) : null,
            stock: parseInt(document.getElementById('prodStock').value),
            rating: parseFloat(document.getElementById('prodRating').value) || 4.0,
            ratingCount: parseInt(document.getElementById('prodRatingCount').value) || 0,
            image: document.getElementById('prodImage').value.trim() || 'images/products/placeholder.jpg',
            description: document.getElementById('prodDesc').value.trim(),
            featured: document.getElementById('prodFeatured').checked,
            onSale: document.getElementById('prodOnSale').checked
        };

        if (editId) {
            updateProduct(editId, productData);
            showToast('Product updated successfully!', 'success');
        } else {
            addProduct(productData);
            showToast('Product added successfully!', 'success');
        }

        resetForm();
        renderDashboard();
        renderProductsTable();

        // Switch to products tab
        document.querySelector('[data-tab="products"]').click();
    });

    cancelBtn.addEventListener('click', resetForm);
}

function editProduct(id) {
    const product = getProductById(id);
    if (!product) return;

    // Switch to add-product tab
    document.querySelector('[data-tab="add-product"]').click();
    document.getElementById('adminPageTitle').textContent = 'Edit Product';

    // Fill form
    document.getElementById('editProductId').value = product.id;
    document.getElementById('prodName').value = product.name;
    document.getElementById('prodBrand').value = product.brand;
    document.getElementById('prodCategory').value = product.category;
    document.getElementById('prodPrice').value = product.price;
    document.getElementById('prodOriginalPrice').value = product.originalPrice || '';
    document.getElementById('prodStock').value = product.stock;
    document.getElementById('prodRating').value = product.rating || '';
    document.getElementById('prodRatingCount').value = product.ratingCount || '';
    document.getElementById('prodImage').value = product.image || '';
    document.getElementById('prodDesc').value = product.description || '';
    document.getElementById('prodFeatured').checked = product.featured;
    document.getElementById('prodOnSale').checked = product.onSale;

    document.getElementById('formTitle').textContent = 'Edit Product';
    document.getElementById('formSubmitBtn').textContent = 'Update Product';
    document.getElementById('formCancelBtn').style.display = 'inline-flex';
}

function resetForm() {
    document.getElementById('productForm').reset();
    document.getElementById('editProductId').value = '';
    document.getElementById('formTitle').textContent = 'Add New Product';
    document.getElementById('formSubmitBtn').textContent = 'Add Product';
    document.getElementById('formCancelBtn').style.display = 'none';
}

/* ======================== DELETE PRODUCT ======================== */
let pendingDeleteId = null;

function initDeleteModal() {
    document.getElementById('deleteModalClose').addEventListener('click', closeDeleteModal);
    document.getElementById('deleteCancelBtn').addEventListener('click', closeDeleteModal);
    document.getElementById('deleteConfirmBtn').addEventListener('click', () => {
        if (pendingDeleteId) {
            deleteProduct(pendingDeleteId);
            closeDeleteModal();
            renderDashboard();
            renderProductsTable(
                document.getElementById('productSearch')?.value || '',
                document.getElementById('categoryFilter')?.value || 'all'
            );
            showToast('Product deleted', 'success');
        }
    });
}

function confirmDelete(id) {
    const product = getProductById(id);
    if (!product) return;
    pendingDeleteId = id;
    document.getElementById('deleteProductName').textContent = product.name;
    document.getElementById('deleteModal').classList.add('active');
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('active');
    pendingDeleteId = null;
}

/* ======================== ORDERS ======================== */
let currentOrderFilter = 'all';

function renderOrders() {
    let orders = getAllOrders();

    // Stats
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

    document.getElementById('statTotalOrders').textContent = totalOrders;
    document.getElementById('statPendingOrders').textContent = pendingOrders;
    document.getElementById('statDeliveredOrders').textContent = deliveredOrders;
    document.getElementById('statOrderRevenue').textContent = '৳' + totalRevenue.toLocaleString('en-IN');

    // Filter
    if (currentOrderFilter !== 'all') {
        orders = orders.filter(o => o.status === currentOrderFilter);
    }

    // Sort by date (newest first)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    const tbody = document.getElementById('ordersTableBody');
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; color:var(--text-muted); padding:20px;">No orders found</td></tr>';
        return;
    }

    tbody.innerHTML = orders.map(order => {
        const date = new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
        const customerName = order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'N/A';
        const itemCount = order.items ? order.items.reduce((sum, i) => sum + i.qty, 0) : 0;
        const paymentLabel = order.payment === 'cod' ? 'Cash on Delivery' : order.payment === 'credit' ? 'Credit Card' : order.payment === 'paypal' ? 'PayPal' : order.payment;

        return `
            <tr>
                <td><strong>${order.id}</strong></td>
                <td>${date}</td>
                <td>${customerName}</td>
                <td>${itemCount} item${itemCount !== 1 ? 's' : ''}</td>
                <td>৳${(order.total || 0).toLocaleString('en-IN')}</td>
                <td>${paymentLabel}</td>
                <td><span class="order-status order-status--${order.status}">${order.status}</span></td>
                <td>
                    <div class="actions">
                        <button class="action-btn" onclick="viewOrder('${order.id}')" title="View Details">&#128065;</button>
                        <select class="order-status-select" onchange="changeOrderStatus('${order.id}', this.value)">
                            <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                            <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                            <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                            <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                        </select>
                    </div>
                </td>
            </tr>`;
    }).join('');
}

function changeOrderStatus(orderId, newStatus) {
    updateOrderStatus(orderId, newStatus);
    renderOrders();
    showToast(`Order ${orderId} status updated to ${newStatus}`, 'success');
}

function viewOrder(orderId) {
    const order = getOrderById(orderId);
    if (!order) return;

    const modal = document.getElementById('orderDetailModal');
    const titleEl = document.getElementById('orderDetailTitle');
    const bodyEl = document.getElementById('orderDetailBody');

    titleEl.textContent = `Order ${order.id}`;

    const date = new Date(order.date).toLocaleString('en-IN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const customerName = order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'N/A';
    const paymentLabel = order.payment === 'cod' ? 'Cash on Delivery' : order.payment === 'credit' ? 'Credit Card' : order.payment === 'paypal' ? 'PayPal' : order.payment;

    let itemsHTML = '';
    if (order.items && order.items.length > 0) {
        itemsHTML = order.items.map(item => `
            <div class="order-detail-item">
                <img src="${item.image}" alt="${item.name}" class="order-detail-item__img" onerror="this.style.display='none'">
                <div class="order-detail-item__info">
                    <div class="order-detail-item__name">${item.name}</div>
                    <div class="order-detail-item__brand">${item.brand}</div>
                    <div class="order-detail-item__price">৳${item.price.toLocaleString('en-IN')} x ${item.qty} = ৳${(item.price * item.qty).toLocaleString('en-IN')}</div>
                </div>
            </div>
        `).join('');
    }

    bodyEl.innerHTML = `
        <div class="order-detail-grid">
            <div class="order-detail-section">
                <h4>Customer Info</h4>
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${order.customer?.email || 'N/A'}</p>
                <p><strong>Phone:</strong> ${order.customer?.phone || 'N/A'}</p>
                <p><strong>Address:</strong> ${order.customer?.address || 'N/A'}, ${order.customer?.city || ''}, ${order.customer?.state || ''} ${order.customer?.zip || ''}</p>
            </div>
            <div class="order-detail-section">
                <h4>Order Info</h4>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Payment:</strong> ${paymentLabel}</p>
                <p><strong>Status:</strong> <span class="order-status order-status--${order.status}">${order.status}</span></p>
                ${order.notes ? `<p><strong>Notes:</strong> ${order.notes}</p>` : ''}
            </div>
        </div>
        <div class="order-detail-section" style="margin-top:20px;">
            <h4>Items</h4>
            <div class="order-detail-items">${itemsHTML}</div>
        </div>
        <div class="order-detail-totals">
            <div><span>Subtotal:</span><span>৳${(order.subtotal || 0).toLocaleString('en-IN')}</span></div>
            <div><span>Shipping:</span><span>${order.shipping === 0 ? 'FREE' : '৳' + (order.shipping || 0).toLocaleString('en-IN')}</span></div>
            <div><strong>Total:</strong><strong>৳${(order.total || 0).toLocaleString('en-IN')}</strong></div>
        </div>
    `;

    modal.classList.add('active');
}

function initOrderFilters() {
    document.querySelectorAll('.order-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.order-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentOrderFilter = btn.dataset.status;
            renderOrders();
        });
    });
}

function initOrderDetailModal() {
    document.getElementById('orderDetailClose').addEventListener('click', () => {
        document.getElementById('orderDetailModal').classList.remove('active');
    });
}

/* ======================== TOAST NOTIFICATIONS ======================== */
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `admin-toast admin-toast--${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

/* ======================== INITIALIZE ======================== */
document.addEventListener('DOMContentLoaded', () => {
    // Seed localStorage if needed
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(ADMIN_DEFAULT_PRODUCTS));
    }

    initAuth();
});
