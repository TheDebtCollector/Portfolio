// Sample product data
const products = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "smartphones",
    price: 999,
    originalPrice: 1099,
    rating: 4.8,
    reviews: 1247,
    image: "fas fa-mobile-alt",
    badge: "New",
    description: "Latest iPhone with advanced camera system and A17 Pro chip"
  },
  {
    id: 2,
    name: "MacBook Air M2",
    category: "laptops",
    price: 1199,
    originalPrice: 1299,
    rating: 4.9,
    reviews: 892,
    image: "fas fa-laptop",
    badge: "Best Seller",
    description: "Ultra-thin laptop with powerful M2 chip and all-day battery life"
  },
  {
    id: 3,
    name: "Sony WH-1000XM5",
    category: "audio",
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviews: 1563,
    image: "fas fa-headphones",
    badge: "Sale",
    description: "Premium noise-canceling headphones with exceptional sound quality"
  },
  {
    id: 4,
    name: "iPad Air",
    category: "tablets",
    price: 599,
    originalPrice: 649,
    rating: 4.6,
    reviews: 734,
    image: "fas fa-tablet-alt",
    badge: "",
    description: "Powerful tablet perfect for work, creativity, and entertainment"
  },
  {
    id: 5,
    name: "Samsung Galaxy S24",
    category: "smartphones",
    price: 799,
    originalPrice: 899,
    rating: 4.5,
    reviews: 987,
    image: "fas fa-mobile-alt",
    badge: "Hot",
    description: "Android flagship with AI features and stunning display"
  },
  {
    id: 6,
    name: "Dell XPS 13",
    category: "laptops",
    price: 1299,
    originalPrice: 1499,
    rating: 4.4,
    reviews: 456,
    image: "fas fa-laptop",
    badge: "Deal",
    description: "Premium Windows laptop with InfinityEdge display"
  },
  {
    id: 7,
    name: "AirPods Pro",
    category: "audio",
    price: 249,
    originalPrice: 279,
    rating: 4.6,
    reviews: 2134,
    image: "fas fa-headphones",
    badge: "Popular",
    description: "Wireless earbuds with active noise cancellation"
  },
  {
    id: 8,
    name: "Google Pixel 8",
    category: "smartphones",
    price: 699,
    originalPrice: 799,
    rating: 4.3,
    reviews: 567,
    image: "fas fa-mobile-alt",
    badge: "",
    description: "Google's flagship with exceptional camera capabilities"
  }
];

// State management
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let currentProducts = [...products];
let currentView = 'grid';
let currentSort = 'featured';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const cartBtn = document.getElementById('cartBtn');
const wishlistBtn = document.getElementById('wishlistBtn');
const userBtn = document.getElementById('userBtn');
const cartSidebar = document.getElementById('cartSidebar');
const wishlistSidebar = document.getElementById('wishlistSidebar');
const userMenu = document.getElementById('userMenu');
const overlay = document.getElementById('overlay');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const viewBtns = document.querySelectorAll('.view-btn');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const cartItems = document.getElementById('cartItems');
const wishlistItems = document.getElementById('wishlistItems');
const cartCount = document.getElementById('cartCount');
const wishlistCount = document.getElementById('wishlistCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const productModal = document.getElementById('productModal');
const checkoutModal = document.getElementById('checkoutModal');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  updateWishlistCount();
  updateCartTotal();
  renderCart();
  renderWishlist();
  startCountdown();
  initializeEventListeners();
});

// Event Listeners
function initializeEventListeners() {
  // Sidebar toggles
  cartBtn.addEventListener('click', () => toggleSidebar(cartSidebar));
  wishlistBtn.addEventListener('click', () => toggleSidebar(wishlistSidebar));
  userBtn.addEventListener('click', () => toggleSidebar(userMenu));
  
  // Close buttons
  document.getElementById('closeCart').addEventListener('click', () => closeSidebar(cartSidebar));
  document.getElementById('closeWishlist').addEventListener('click', () => closeSidebar(wishlistSidebar));
  document.getElementById('closeUserMenu').addEventListener('click', () => closeSidebar(userMenu));
  document.getElementById('closeModal').addEventListener('click', () => closeModal(productModal));
  document.getElementById('closeCheckout').addEventListener('click', () => closeModal(checkoutModal));
  
  // Overlay click
  overlay.addEventListener('click', closeAllSidebars);
  
  // Search functionality
  searchInput.addEventListener('input', handleSearch);
  
  // Sort functionality
  sortSelect.addEventListener('change', handleSort);
  
  // View toggle
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.dataset.view;
      renderProducts();
    });
  });
  
  // Load more
  loadMoreBtn.addEventListener('click', loadMoreProducts);
  
  // Checkout
  checkoutBtn.addEventListener('click', openCheckout);
  
  // Category cards
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.dataset.category;
      filterByCategory(category);
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllSidebars();
      closeAllModals();
    }
  });
}

// Product rendering
function renderProducts() {
  const productsToShow = currentProducts.slice(0, 8); // Show first 8 products
  
  productsGrid.innerHTML = productsToShow.map(product => `
    <div class="product-card" data-id="${product.id}">
      ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
      <div class="product-image">
        <i class="${product.image}"></i>
      </div>
      <div class="product-actions">
        <button class="action-btn-small" onclick="toggleWishlist(${product.id})">
          <i class="fas fa-heart ${wishlist.includes(product.id) ? 'text-red-500' : ''}"></i>
        </button>
        <button class="action-btn-small" onclick="quickView(${product.id})">
          <i class="fas fa-eye"></i>
        </button>
      </div>
      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h3 class="product-title" onclick="quickView(${product.id})">${product.name}</h3>
        <div class="product-rating">
          <div class="stars">
            ${generateStars(product.rating)}
          </div>
          <span class="rating-text">(${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="current-price">$${product.price}</span>
          ${product.originalPrice > product.price ? `
            <span class="original-price">$${product.originalPrice}</span>
            <span class="discount">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
          ` : ''}
        </div>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          <i class="fas fa-shopping-cart"></i>
          Add to Cart
        </button>
      </div>
    </div>
  `).join('');
  
  // Update load more button visibility
  loadMoreBtn.style.display = currentProducts.length > 8 ? 'block' : 'none';
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '☆' : '') + 
         '☆'.repeat(emptyStars);
}

// Cart functionality
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }
  
  saveCart();
  updateCartCount();
  updateCartTotal();
  renderCart();
  showToast('success', 'Added to Cart', `${product.name} has been added to your cart`);
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  updateCartTotal();
  renderCart();
  showToast('success', 'Removed from Cart', 'Item has been removed from your cart');
}

function updateQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartCount();
      updateCartTotal();
      renderCart();
    }
  }
}

function renderCart() {
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
        <i class="fas fa-shopping-cart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <p>Your cart is empty</p>
        <p style="font-size: 0.875rem;">Add some products to get started</p>
      </div>
    `;
    return;
  }
  
  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-image">
        <i class="${item.image}"></i>
      </div>
      <div class="cart-item-content">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price}</div>
        <div class="cart-item-actions">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
          <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      </div>
    </div>
  `).join('');
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Wishlist functionality
function toggleWishlist(productId) {
  const index = wishlist.indexOf(productId);
  const product = products.find(p => p.id === productId);
  
  if (index > -1) {
    wishlist.splice(index, 1);
    showToast('success', 'Removed from Wishlist', `${product.name} has been removed from your wishlist`);
  } else {
    wishlist.push(productId);
    showToast('success', 'Added to Wishlist', `${product.name} has been added to your wishlist`);
  }
  
  saveWishlist();
  updateWishlistCount();
  renderWishlist();
  renderProducts(); // Re-render to update heart icons
}

function renderWishlist() {
  if (wishlist.length === 0) {
    wishlistItems.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-secondary);">
        <i class="fas fa-heart" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
        <p>Your wishlist is empty</p>
        <p style="font-size: 0.875rem;">Save products you love</p>
      </div>
    `;
    return;
  }
  
  wishlistItems.innerHTML = wishlist.map(productId => {
    const product = products.find(p => p.id === productId);
    return `
      <div class="cart-item">
        <div class="cart-item-image">
          <i class="${product.image}"></i>
        </div>
        <div class="cart-item-content">
          <div class="cart-item-title">${product.name}</div>
          <div class="cart-item-price">$${product.price}</div>
          <div class="cart-item-actions">
            <button class="add-to-cart" onclick="addToCart(${product.id})" style="padding: 0.5rem 1rem; font-size: 0.875rem;">
              Add to Cart
            </button>
            <button class="remove-btn" onclick="toggleWishlist(${product.id})">Remove</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateWishlistCount() {
  wishlistCount.textContent = wishlist.length;
}

function saveWishlist() {
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

// Search functionality
function handleSearch() {
  const query = searchInput.value.toLowerCase();
  currentProducts = products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
  renderProducts();
}

// Sort functionality
function handleSort() {
  currentSort = sortSelect.value;
  
  switch (currentSort) {
    case 'price-low':
      currentProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      currentProducts.sort((a, b) => b.price - a.price);
      break;
    case 'newest':
      currentProducts.sort((a, b) => b.id - a.id);
      break;
    case 'rating':
      currentProducts.sort((a, b) => b.rating - a.rating);
      break;
    default:
      currentProducts = [...products];
  }
  
  renderProducts();
}

// Category filtering
function filterByCategory(category) {
  currentProducts = products.filter(product => product.category === category);
  renderProducts();
  showToast('success', 'Category Filtered', `Showing ${category} products`);
}

// Load more products
function loadMoreProducts() {
  // Simulate loading more products
  showToast('info', 'Loading...', 'Loading more products...');
  setTimeout(() => {
    currentProducts = [...products]; // Show all products
    renderProducts();
    showToast('success', 'Loaded', 'All products loaded');
  }, 1000);
}

// Quick view modal
function quickView(productId) {
  const product = products.find(p => p.id === productId);
  const modal = document.getElementById('productModal');
  const details = document.getElementById('productDetails');
  
  details.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
      <div class="product-image" style="height: 300px;">
        <i class="${product.image}" style="font-size: 5rem;"></i>
      </div>
      <div>
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">${product.name}</h2>
        <p style="color: var(--text-secondary); margin-bottom: 1rem;">${product.description}</p>
        <div class="product-rating" style="margin-bottom: 1rem;">
          <div class="stars">${generateStars(product.rating)}</div>
          <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
        </div>
        <div class="product-price" style="margin-bottom: 2rem;">
          <span class="current-price" style="font-size: 1.5rem;">$${product.price}</span>
          ${product.originalPrice > product.price ? `
            <span class="original-price">$${product.originalPrice}</span>
            <span class="discount">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
          ` : ''}
        </div>
        <div style="display: flex; gap: 1rem;">
          <button class="btn btn-primary" onclick="addToCart(${product.id}); closeModal(productModal);">
            <i class="fas fa-shopping-cart"></i>
            Add to Cart
          </button>
          <button class="btn btn-secondary" onclick="toggleWishlist(${product.id}); closeModal(productModal);">
            <i class="fas fa-heart"></i>
            ${wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  `;
  
  openModal(modal);
}

// Checkout functionality
function openCheckout() {
  if (cart.length === 0) {
    showToast('error', 'Empty Cart', 'Please add items to your cart before checkout');
    return;
  }
  
  const modal = document.getElementById('checkoutModal');
  const form = document.getElementById('checkoutForm');
  
  form.innerHTML = `
    <div style="padding: 2rem;">
      <h3 style="margin-bottom: 1rem;">Shipping Information</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem;">
        <input type="text" placeholder="First Name" required>
        <input type="text" placeholder="Last Name" required>
        <input type="email" placeholder="Email" required>
        <input type="tel" placeholder="Phone" required>
        <input type="text" placeholder="Address" required style="grid-column: 1 / -1;">
        <input type="text" placeholder="City" required>
        <input type="text" placeholder="State" required>
        <input type="text" placeholder="ZIP Code" required>
      </div>
      <div style="display: flex; gap: 1rem;">
        <button class="btn btn-secondary" onclick="closeModal(checkoutModal)">
          Cancel
        </button>
        <button class="btn btn-primary" onclick="processCheckout()">
          Continue to Payment
        </button>
      </div>
    </div>
  `;
  
  openModal(modal);
}

function processCheckout() {
  showToast('success', 'Order Placed!', 'Thank you for your purchase. You will receive a confirmation email shortly.');
  cart = [];
  saveCart();
  updateCartCount();
  updateCartTotal();
  renderCart();
  closeModal(checkoutModal);
  closeSidebar(cartSidebar);
}

// Sidebar and modal management
function toggleSidebar(sidebar) {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('active');
}

function closeSidebar(sidebar) {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
}

function closeAllSidebars() {
  document.querySelectorAll('.cart-sidebar, .wishlist-sidebar, .user-menu').forEach(sidebar => {
    sidebar.classList.remove('open');
  });
  overlay.classList.remove('active');
}

function openModal(modal) {
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

function closeAllModals() {
  document.querySelectorAll('.product-modal, .checkout-modal').forEach(modal => {
    modal.classList.remove('active');
  });
  overlay.classList.remove('active');
}

// Countdown timer
function startCountdown() {
  const countdowns = document.querySelectorAll('.countdown');
  
  countdowns.forEach(countdown => {
    const endDate = new Date(countdown.dataset.end).getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        countdown.innerHTML = '<span style="color: var(--error-color);">Expired</span>';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      
      countdown.innerHTML = `
        <span class="time-unit">
          <span class="number">${days.toString().padStart(2, '0')}</span>
          <span class="label">Days</span>
        </span>
        <span class="time-unit">
          <span class="number">${hours.toString().padStart(2, '0')}</span>
          <span class="label">Hours</span>
        </span>
        <span class="time-unit">
          <span class="number">${minutes.toString().padStart(2, '0')}</span>
          <span class="label">Minutes</span>
        </span>
      `;
    }, 1000);
  });
}

// Toast notifications
function showToast(type, title, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'success' ? 'fas fa-check-circle' : 
               type === 'error' ? 'fas fa-exclamation-circle' : 
               'fas fa-info-circle';
  
  toast.innerHTML = `
    <i class="toast-icon ${icon}"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  
  document.getElementById('toast-container').appendChild(toast);
  
  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 100);
  
  // Remove toast after 5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 5000);
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation highlighting
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(() => {
  // Active navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}, 10));

// Accessibility improvements
document.addEventListener('DOMContentLoaded', () => {
  // Add ARIA labels to interactive elements
  const buttons = document.querySelectorAll('button:not([aria-label])');
  buttons.forEach(button => {
    if (button.textContent.trim()) {
      button.setAttribute('aria-label', button.textContent.trim());
    }
  });
  
  // Add focus indicators
  const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
  focusableElements.forEach(element => {
    element.addEventListener('focus', () => {
      element.style.outline = '2px solid var(--primary-color)';
      element.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', () => {
      element.style.outline = '';
      element.style.outlineOffset = '';
    });
  });
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  showToast('error', 'Error', 'Something went wrong. Please refresh the page.');
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
} 