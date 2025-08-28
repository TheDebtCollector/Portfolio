// Sample product data
const products = [
  {
    id: 1,
    title: "Gaming Laptop Pro 15",
    desc: "High-performance laptop with RTX 4060, 16GB RAM, 1TB SSD.",
    price: 1499,
    rating: 4.8,
    category: "laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    title: "UltraWide Monitor 34''",
    desc: "Immersive 34-inch ultrawide monitor, 144Hz, QHD.",
    price: 499,
    rating: 4.7,
    category: "monitor",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    title: "Wireless Mouse X200",
    desc: "Ergonomic wireless mouse, 16000 DPI, RGB lighting.",
    price: 59,
    rating: 4.6,
    category: "accessory",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    title: "Mechanical Keyboard K70",
    desc: "RGB mechanical keyboard, blue switches, full-size.",
    price: 129,
    rating: 4.9,
    category: "accessory",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    title: "Desktop PC PowerStation",
    desc: "Intel i7, RTX 4070, 32GB RAM, 2TB SSD, WiFi 6.",
    price: 1899,
    rating: 4.9,
    category: "desktop",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    title: "SSD 1TB NVMe",
    desc: "Ultra-fast 1TB NVMe SSD, PCIe Gen4, 7000MB/s.",
    price: 119,
    rating: 4.8,
    category: "component",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 7,
    title: "Business Laptop 14",
    desc: "Lightweight, 14-inch, 12GB RAM, 512GB SSD, 10hr battery.",
    price: 899,
    rating: 4.5,
    category: "laptop",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 8,
    title: "4K UHD Monitor 27''",
    desc: "27-inch 4K UHD, HDR, 99% sRGB, USB-C.",
    price: 349,
    rating: 4.7,
    category: "monitor",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
  }
];

const reviews = [
  {
    name: "Alice W.",
    rating: 5,
    text: "Amazing service and fast shipping! My new laptop is perfect for gaming.",
    avatar: "<i class='fas fa-user'></i>"
  },
  {
    name: "Brian K.",
    rating: 5,
    text: "Great prices and the support team helped me pick the right monitor.",
    avatar: "<i class='fas fa-user'></i>"
  },
  {
    name: "Samantha L.",
    rating: 4,
    text: "The checkout was easy and my order arrived in 2 days!",
    avatar: "<i class='fas fa-user'></i>"
  }
];

let cart = JSON.parse(localStorage.getItem('computerStoreCart') || '[]');

// DOM Elements
const productsCarousel = document.getElementById('productsCarousel');
const dealContent = document.getElementById('dealContent');
const sidebarLinks = document.querySelectorAll('.sidebar-link');
const heroBgAnim = document.getElementById('heroBgAnim');
const categoryFilter = document.getElementById('categoryFilter');
const sortFilter = document.getElementById('sortFilter');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCartBtn = document.getElementById('closeCartBtn');
const cartItems = document.getElementById('cartItems');
const cartSummary = document.getElementById('cartSummary');
const cartCount = document.getElementById('cartCount');
const checkoutBtn = document.getElementById('checkoutBtn');
const reviewsGrid = document.getElementById('reviewsGrid');
const toastContainer = document.getElementById('toast-container');

// Carousel Arrow Buttons
const carouselLeft = document.getElementById('carouselLeft');
const carouselRight = document.getElementById('carouselRight');
if (carouselLeft && carouselRight && productsCarousel) {
  carouselLeft.onclick = () => {
    productsCarousel.scrollBy({ left: -350, behavior: 'smooth' });
  };
  carouselRight.onclick = () => {
    productsCarousel.scrollBy({ left: 350, behavior: 'smooth' });
  };
}

// Deal of the Day Countdown
const dealTimer = document.getElementById('dealTimer');
const dealBadge = document.getElementById('dealBadge');
let dealEnd = new Date(Date.now() + 3600 * 1000); // 1 hour from now
function updateDealTimer() {
  const now = new Date();
  let diff = Math.max(0, Math.floor((dealEnd - now) / 1000));
  const h = String(Math.floor(diff / 3600)).padStart(2, '0');
  const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
  const s = String(diff % 60).padStart(2, '0');
  if (dealTimer) dealTimer.textContent = `${h}:${m}:${s}`;
  if (dealBadge) dealBadge.textContent = diff < 600 ? 'Last Chance!' : (diff < 1800 ? 'Hot!' : 'Deal!');
  if (diff === 0) {
    dealEnd = new Date(Date.now() + 3600 * 1000);
    renderDealOfTheDay(products);
  }
}
setInterval(updateDealTimer, 1000);
updateDealTimer();

// Animate Section Titles on Scroll
function animateTitlesOnScroll() {
  const titles = document.querySelectorAll('[data-animate-title]');
  titles.forEach(title => {
    const rect = title.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      title.classList.add('in-view');
    } else {
      title.classList.remove('in-view');
    }
  });
}
window.addEventListener('scroll', animateTitlesOnScroll);
window.addEventListener('DOMContentLoaded', animateTitlesOnScroll);

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});
if (backToTop) {
  backToTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Parallax Hero Image
const parallaxHero = document.querySelector('.parallax-hero img');
if (parallaxHero) {
  window.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    parallaxHero.style.transform = `rotateY(${-x}deg) rotateX(${y}deg)`;
  });
  window.addEventListener('mouseleave', () => {
    parallaxHero.style.transform = '';
  });
}

// Smooth Scrolling for Anchor Links
[...document.querySelectorAll('a[href^="#"]')].forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Render Products as Carousel
function renderProducts(products) {
  productsCarousel.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-info">
        <div class="product-title">${product.title}</div>
        <div class="product-desc">${product.desc}</div>
        <div class="product-meta">
          <span class="product-price">$${product.price.toFixed(2)}</span>
          <span class="product-rating">${'★'.repeat(Math.round(product.rating))}<span style="color:#b3b8c5;">${'★'.repeat(5 - Math.round(product.rating))}</span></span>
        </div>
        <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    `;
    productsCarousel.appendChild(card);
  });
}

// Deal of the Day (random product)
function renderDealOfTheDay(products) {
  if (!dealContent) return;
  const deal = products[Math.floor(Math.random() * products.length)];
  dealContent.innerHTML = `
    <div style="display:flex;align-items:center;gap:2rem;justify-content:center;flex-wrap:wrap;">
      <img src="${deal.image}" alt="${deal.title}" style="width:120px;height:120px;object-fit:contain;filter:drop-shadow(0 0 16px var(--neon-blue));border-radius:18px;background:rgba(0,234,255,0.08);">
      <div style="text-align:left;max-width:320px;">
        <div class="product-title" style="font-size:1.4rem;">${deal.title}</div>
        <div class="product-desc" style="margin-bottom:0.7rem;">${deal.desc}</div>
        <div class="product-price" style="font-size:1.5rem;">$${deal.price.toFixed(2)}</div>
        <button class="add-cart-btn" data-id="${deal.id}">Add to Cart</button>
      </div>
    </div>
  `;
}

// Sidebar Navigation Active State
sidebarLinks.forEach(link => {
  link.addEventListener('click', function() {
    sidebarLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Animate Hero Background (simple SVG neon lines)
if (heroBgAnim) {
  heroBgAnim.innerHTML = `
    <svg width="100%" height="100%" viewBox="0 0 1440 480" fill="none" xmlns="http://www.w3.org/2000/svg" style="position:absolute;top:0;left:0;width:100%;height:100%;">
      <defs>
        <linearGradient id="neon1" x1="0" y1="0" x2="1440" y2="480" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00eaff"/>
          <stop offset="1" stop-color="#ff00cc"/>
        </linearGradient>
      </defs>
      <path d="M0 400 Q 360 320 720 400 T 1440 400" stroke="url(#neon1)" stroke-width="8" fill="none" opacity="0.18">
        <animate attributeName="d" values="M0 400 Q 360 320 720 400 T 1440 400;M0 400 Q 360 380 720 320 T 1440 400;M0 400 Q 360 320 720 400 T 1440 400" dur="8s" repeatCount="indefinite"/>
      </path>
      <circle cx="1200" cy="120" r="80" fill="#ff00cc" opacity="0.08">
        <animate attributeName="r" values="80;120;80" dur="7s" repeatCount="indefinite"/>
      </circle>
      <circle cx="300" cy="80" r="60" fill="#00eaff" opacity="0.10">
        <animate attributeName="r" values="60;100;60" dur="6s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
}

// On load
renderProducts(products);
renderDealOfTheDay(products);

// Render reviews
document.addEventListener('DOMContentLoaded', () => {
  renderReviews();
  updateCartCount();
});

categoryFilter.addEventListener('change', updateProducts);
sortFilter.addEventListener('change', updateProducts);
cartBtn.addEventListener('click', () => cartModal.classList.add('active'));
closeCartBtn.addEventListener('click', () => cartModal.classList.remove('active'));
checkoutBtn.addEventListener('click', handleCheckout);

// Replace grid rendering with carousel
function updateProducts() {
  let filtered = [...products];
  const category = categoryFilter.value;
  const sort = sortFilter.value;
  if (category !== 'all') filtered = filtered.filter(p => p.category === category);
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);
  renderProducts(filtered);
}

// Update add-to-cart event listeners after rendering
function updateAddToCartButtons() {
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.onclick = function() {
      const id = this.getAttribute('data-id');
      addToCart(id);
    };
  });
}
// Call after rendering products and deal
updateAddToCartButtons();

window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  showToast('success', 'Added to cart!');
  updateCartCount();
};

function updateCartCount() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

cartBtn.onclick = () => {
  renderCart();
  cartModal.classList.add('active');
};

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = '<p style="text-align:center;color:var(--text-secondary);">Your cart is empty.</p>';
    cartSummary.innerHTML = '';
    return;
  }
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image"><img src="${item.image}" alt="${item.title}"></div>
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-qty">Qty: ${item.qty}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})"><i class="fas fa-trash"></i></button>
    </div>
  `).join('');
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartSummary.innerHTML = `<div>Total: <span style="font-weight:700;">$${total.toFixed(2)}</span></div>`;
}

window.removeFromCart = function(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
  updateCartCount();
  showToast('success', 'Removed from cart');
};

function handleCheckout() {
  if (cart.length === 0) return;
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
  showToast('success', 'Thank you for your purchase!');
}

function saveCart() {
  localStorage.setItem('computerStoreCart', JSON.stringify(cart));
}

function renderReviews() {
  reviewsGrid.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="review-avatar">${r.avatar}</div>
        <div class="review-info">
          <div class="review-name">${r.name}</div>
          <div class="review-rating">${'★'.repeat(r.rating)}</div>
        </div>
      </div>
      <div class="review-text">${r.text}</div>
    </div>
  `).join('');
}

// Toast notifications
function showToast(type, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<div class="toast-content"><div class="toast-title">${message}</div></div>`;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

// Contact form (demo only)
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  showToast('success', 'Message sent!');
  this.reset();
});

// Animated Counters for About Facts
function animateCounter(id, target, duration = 1200) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const step = Math.ceil(target / (duration / 16));
  function update() {
    start += step;
    if (start >= target) {
      el.textContent = target.toLocaleString();
    } else {
      el.textContent = start.toLocaleString();
      requestAnimationFrame(update);
    }
  }
  update();
}
let aboutFactsAnimated = false;
function animateAboutFactsIfInView() {
  if (aboutFactsAnimated) return;
  const facts = document.querySelector('.about-facts');
  if (!facts) return;
  const rect = facts.getBoundingClientRect();
  if (rect.top < window.innerHeight - 80) {
    aboutFactsAnimated = true;
    animateCounter('factYears', 6);
    animateCounter('factCustomers', 12000);
    animateCounter('factProducts', 35000);
    animateCounter('factSupport', 8500);
  }
}
window.addEventListener('scroll', animateAboutFactsIfInView);
window.addEventListener('DOMContentLoaded', animateAboutFactsIfInView); 