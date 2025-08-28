// mirkoz-shop.js

const products = [
  {
    title: 'Vendo G-Snack HS8 Refurbished',
    desc: 'Automaat voor snacks en dranken, energiezuinig, duurzaam en volledig gereviseerd.',
    price: 1895,
    image: 'https://www.mirkoz.be/wp-content/uploads/2023/11/vendo-g-snack-hs8-refurbished.jpg',
    category: 'Refurbished Automaten'
  },
  {
    title: 'Necta Festival 10 Refurbished',
    desc: 'Veelzijdige en energiezuinige vendingautomaat voor snacks, dranken en verse maaltijden.',
    price: 2495,
    image: 'https://www.mirkoz.be/wp-content/uploads/2023/11/necta-festival-10-refurbished.jpg',
    category: 'Refurbished Automaten'
  },
  {
    title: 'Necta Samba Top',
    desc: 'Nieuwe snack- en drankautomaat met moderne technologie en groot assortiment.',
    price: 4995,
    image: 'https://www.mirkoz.be/wp-content/uploads/2023/11/necta-samba-top.jpg',
    category: 'Nieuwe Automaten'
  },
  {
    title: 'Necta Canto',
    desc: 'Nieuwe drankautomaat voor warme dranken, hoge capaciteit en gebruiksgemak.',
    price: 5995,
    image: 'https://www.mirkoz.be/wp-content/uploads/2023/11/necta-canto.jpg',
    category: 'Drank Automaten'
  }
];

function renderProducts(category = null) {
  const container = document.getElementById('mkz-products-list');
  container.innerHTML = '';
  let filtered = products;
  if (category && category !== 'all') {
    filtered = products.filter(p => p.category === category);
  }
  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'mkz-product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" class="mkz-product-img">
      <div class="mkz-product-info">
        <h3 class="mkz-product-title">${product.title}</h3>
        <p class="mkz-product-desc">${product.desc}</p>
        <div class="mkz-product-meta">
          <span class="mkz-product-price">€${product.price.toLocaleString('nl-BE')}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderProducts();
  // Filter
  document.querySelectorAll('.mkz-shop-card').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelectorAll('.mkz-shop-card').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.textContent.trim());
    });
  });
}); 