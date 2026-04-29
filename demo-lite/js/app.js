/* ==========================================
   MANOPLAS VIANDAS GOURMET — DEMO LITE
   JavaScript Vanilla — Lógica completa
   ========================================== */

// =====================
// MOCK PRODUCT DATA
// =====================
const PRODUCTOS = [
    {
        id: 1,
        nombre: 'Milanesa con Puré',
        descripcion: 'Milanesa de ternera crujiente con puré de papas cremoso. Clásico argentino.',
        precio: 4500,
        imagenUrl: 'https://images.unsplash.com/photo-1585325701956-60dd9c8553bc?w=400&h=300&fit=crop',
        activo: true
    },
    {
        id: 2,
        nombre: 'Pollo al Horno con Verduras',
        descripcion: 'Pollo jugoso al horno con papas, batatas y calabaza asada. Saludable y delicioso.',
        precio: 4200,
        imagenUrl: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
        activo: true
    },
    {
        id: 3,
        nombre: 'Pastel de Papa',
        descripcion: 'Carne picada jugosa con capa dorada de puré gratinado. Comfort food perfecto.',
        precio: 3800,
        imagenUrl: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&h=300&fit=crop',
        activo: true
    },
    {
        id: 4,
        nombre: 'Ravioles de Ricota',
        descripcion: 'Ravioles caseros rellenos de ricota y nuez, con salsa fileto casera.',
        precio: 4800,
        imagenUrl: 'https://images.unsplash.com/photo-1587740908075-9e245070dfaa?w=400&h=300&fit=crop',
        activo: true
    },
    {
        id: 5,
        nombre: 'Guiso de Lentejas',
        descripcion: 'Guiso bien casero con chorizo colorado, papas y verduras de estación.',
        precio: 3500,
        imagenUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
        activo: true
    },
    {
        id: 6,
        nombre: 'Tarta de Jamón y Queso',
        descripcion: 'Tarta criolla con masa casera, jamón, queso y un toque de huevo.',
        precio: 3200,
        imagenUrl: 'https://images.unsplash.com/photo-1571047399553-603e2138e1de?w=400&h=300&fit=crop',
        activo: true
    }
];

// =====================
// CART STATE (localStorage)
// =====================
const CART_KEY = 'manoplas_demo_cart';

function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
    renderCart();
}

function addToCart(productId) {
    const product = PRODUCTOS.find(p => p.id === productId);
    if (!product) return;

    const cart = getCart();
    const existing = cart.find(item => item.producto.id === productId);

    if (existing) {
        existing.cantidad++;
    } else {
        cart.push({ producto: product, cantidad: 1 });
    }

    saveCart(cart);
    showToast(`${product.nombre} agregado al carrito`);
}

function removeFromCart(productId) {
    let cart = getCart();
    const existing = cart.find(item => item.producto.id === productId);

    if (existing && existing.cantidad > 1) {
        existing.cantidad--;
    } else {
        cart = cart.filter(item => item.producto.id !== productId);
    }

    saveCart(cart);
}

function removeAllOfItem(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.producto.id !== productId);
    saveCart(cart);
}

function clearCart() {
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
    renderCart();
}

function getCartTotal() {
    return getCart().reduce((acc, item) => acc + (item.producto.precio * item.cantidad), 0);
}

function getCartCount() {
    return getCart().reduce((acc, item) => acc + item.cantidad, 0);
}

// =====================
// UI RENDERING
// =====================

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');

    if (PRODUCTOS.length === 0) {
        grid.classList.add('hidden');
        noProducts.classList.remove('hidden');
        return;
    }

    noProducts.classList.add('hidden');
    grid.classList.remove('hidden');

    grid.innerHTML = PRODUCTOS.map(prod => `
        <div class="product-card">
            <div class="image-container">
                <img src="${prod.imagenUrl}" alt="${prod.nombre}" loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'">
            </div>
            <div class="card-details">
                <h3>${prod.nombre}</h3>
                <p class="description">${prod.descripcion}</p>
                <div class="price-row">
                    <span class="price">$ ${prod.precio.toLocaleString('es-AR')}</span>
                    <button class="btn-add" onclick="addToCart(${prod.id})">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderCart() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '';
        emptyCart.classList.remove('hidden');
        cartFooter.classList.add('hidden');
        return;
    }

    emptyCart.classList.add('hidden');
    cartFooter.classList.remove('hidden');

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <span class="item-name">${item.producto.nombre}</span>
                <span class="item-price">$ ${item.producto.precio.toLocaleString('es-AR')}</span>
            </div>
            <div class="item-controls">
                <span class="qty">x ${item.cantidad}</span>
                <button class="btn-remove" onclick="handleRemoveItem(${item.producto.id}, ${item.cantidad})">
                    <i class="fas fa-trash"></i> Eliminar
                </button>
            </div>
        </div>
    `).join('');

    cartTotal.textContent = `$ ${getCartTotal().toLocaleString('es-AR')}`;
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    const count = getCartCount();

    if (count > 0) {
        badge.textContent = count;
        badge.style.display = 'flex';
    } else {
        badge.style.display = 'none';
    }
}

// =====================
// EVENT HANDLERS
// =====================

function handleRemoveItem(productId, cantidad) {
    if (cantidad > 1) {
        // Show options
        if (confirm(`Tienes ${cantidad} unidades. ¿Quitar solo 1? (Cancelar para eliminar todo)`)) {
            removeFromCart(productId);
        } else {
            removeAllOfItem(productId);
        }
    } else {
        if (confirm('¿Eliminar este producto del carrito?')) {
            removeAllOfItem(productId);
        }
    }
}

function confirmOrder() {
    const cart = getCart();
    if (cart.length === 0) return;

    const selected = document.querySelector('input[name="payment"]:checked');
    const method = selected ? selected.value : 'EFECTIVO';

    // Show success overlay
    showSuccessOverlay(method);

    clearCart();
    toggleCart();
}

function showSuccessOverlay(method) {
    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.id = 'successOverlay';
    overlay.innerHTML = `
        <div class="success-modal">
            <i class="fas fa-check-circle success-icon"></i>
            <h2>¡Pedido Confirmado!</h2>
            <p>Tu pedido ha sido realizado con éxito.<br>Método de pago: <strong>${method}</strong></p>
            <button class="btn-ok" onclick="closeSuccessOverlay()">
                <i class="fas fa-thumbs-up"></i> Genial
            </button>
        </div>
    `;
    document.body.appendChild(overlay);
}

function closeSuccessOverlay() {
    const overlay = document.getElementById('successOverlay');
    if (overlay) overlay.remove();
}

// =====================
// NAVIGATION (SPA)
// =====================

function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.add('hidden'));

    // Show target page
    const target = document.getElementById(`page-${page}`);
    if (target) {
        target.classList.remove('hidden');
        // Re-trigger animation
        target.style.animation = 'none';
        target.offsetHeight; // trigger reflow
        target.style.animation = '';
    }

    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.dataset.page === page);
    });

    // Close mobile menu
    closeMobileMenu();

    // Close user dropdown
    closeUserMenu();

    // Render products if menu
    if (page === 'menu') {
        renderProducts();
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// =====================
// MOBILE MENU
// =====================

let isMobileMenuOpen = false;

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const navContent = document.getElementById('navContent');
    const icon = document.getElementById('mobileMenuIcon');
    const btn = document.getElementById('mobileMenuBtn');

    navContent.classList.toggle('mobile-open', isMobileMenuOpen);
    btn.classList.toggle('active', isMobileMenuOpen);
    icon.classList.toggle('fa-bars', !isMobileMenuOpen);
    icon.classList.toggle('fa-times', isMobileMenuOpen);
}

function closeMobileMenu() {
    isMobileMenuOpen = false;
    const navContent = document.getElementById('navContent');
    const icon = document.getElementById('mobileMenuIcon');
    const btn = document.getElementById('mobileMenuBtn');

    navContent.classList.remove('mobile-open');
    if (btn) btn.classList.remove('active');
    if (icon) {
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
}

// =====================
// CART TOGGLE
// =====================

function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.toggle('hidden');
    renderCart();
    closeMobileMenu();
}

// =====================
// USER DROPDOWN
// =====================

let showUserMenu = false;

function toggleUserMenu() {
    showUserMenu = !showUserMenu;
    const menu = document.getElementById('dropdownMenu');
    const arrow = document.getElementById('arrowIcon');

    menu.classList.toggle('show', showUserMenu);
    arrow.classList.toggle('rotated', showUserMenu);
}

function closeUserMenu() {
    showUserMenu = false;
    const menu = document.getElementById('dropdownMenu');
    const arrow = document.getElementById('arrowIcon');

    if (menu) menu.classList.remove('show');
    if (arrow) arrow.classList.remove('rotated');
}

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown && !dropdown.contains(e.target)) {
        closeUserMenu();
    }
});

// =====================
// PAYMENT METHOD SELECTION
// =====================

document.addEventListener('click', (e) => {
    const option = e.target.closest('.method-option');
    if (!option) return;

    // Update visual selection
    document.querySelectorAll('.method-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');

    // Check the radio
    const radio = option.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
});

// =====================
// TOAST NOTIFICATION
// =====================

let toastTimeout;

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');

    // Clear any existing
    clearTimeout(toastTimeout);
    toast.classList.add('hidden');

    // Set message and show
    toastMsg.textContent = message;
    toast.classList.remove('hidden');
    toast.style.animation = 'none';
    toast.offsetHeight;
    toast.style.animation = 'slideInToast 0.4s ease, fadeOutToast 0.4s ease 2.5s forwards';

    toastTimeout = setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// =====================
// ABOUT MODAL
// =====================

function showAbout() {
    closeUserMenu();
    const overlay = document.createElement('div');
    overlay.className = 'about-overlay';
    overlay.id = 'aboutOverlay';
    overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
    overlay.innerHTML = `
        <div class="about-modal">
            <button class="close-btn" onclick="document.getElementById('aboutOverlay').remove()">&times;</button>
            <h2>Manoplas Viandas Gourmet</h2>
            <p>Sistema de pedidos de viandas caseras gourmet.</p>
            <p>Esta es una <strong>versión demo</strong> para demostración. Los datos son de ejemplo y el carrito se guarda localmente en tu navegador.</p>
            <p style="margin-top: 1rem; font-size: 0.85rem; opacity: 0.7;">Desarrollado por <strong style="color: var(--primary-color);">VK-Web-Dev</strong></p>
        </div>
    `;
    document.body.appendChild(overlay);
}

// =====================
// INITIALIZATION
// =====================

document.addEventListener('DOMContentLoaded', () => {
    // Show home page by default
    navigateTo('home');

    // Update cart badge from localStorage
    updateCartBadge();
});
