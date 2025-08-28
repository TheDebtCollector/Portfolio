// === Recipe Explorer JS ===

// Demo recipe data (replace with API integration for production)
const demoRecipes = [
  {
    id: 1,
    title: 'Creamy Garlic Chicken',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
    tags: ['Chicken', 'Dinner'],
    diet: '',
    cuisine: 'American',
    time: 30,
    ingredients: ['Chicken breast', 'Garlic', 'Cream', 'Parsley', 'Olive oil', 'Salt', 'Pepper'],
    steps: [
      'Season chicken with salt and pepper.',
      'Sear chicken in olive oil until golden.',
      'Add garlic, cook 1 min.',
      'Pour in cream, simmer until thickened.',
      'Garnish with parsley and serve.'
    ],
    description: 'A quick, creamy chicken dish perfect for weeknights.'
  },
  {
    id: 2,
    title: 'Vegan Buddha Bowl',
    image: 'https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80',
    tags: ['Vegan', 'Healthy'],
    diet: 'vegan',
    cuisine: 'Asian',
    time: 25,
    ingredients: ['Quinoa', 'Chickpeas', 'Avocado', 'Spinach', 'Carrot', 'Tahini'],
    steps: [
      'Cook quinoa as per instructions.',
      'Roast chickpeas with spices.',
      'Arrange all ingredients in a bowl.',
      'Drizzle with tahini and serve.'
    ],
    description: 'A nourishing bowl packed with plant-based goodness.'
  },
  {
    id: 3,
    title: 'Classic Margherita Pizza',
    image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80',
    tags: ['Pizza', 'Vegetarian'],
    diet: 'vegetarian',
    cuisine: 'Italian',
    time: 40,
    ingredients: ['Pizza dough', 'Tomato sauce', 'Mozzarella', 'Basil', 'Olive oil'],
    steps: [
      'Roll out pizza dough.',
      'Spread tomato sauce.',
      'Add mozzarella and basil.',
      'Bake until golden and bubbly.'
    ],
    description: 'A timeless Italian favorite with fresh ingredients.'
  },
  {
    id: 4,
    title: 'Gluten-Free Pancakes',
    image: 'https://images.unsplash.com/photo-1506089676908-3592f7389d4d?auto=format&fit=crop&w=600&q=80',
    tags: ['Breakfast', 'Gluten Free'],
    diet: 'gluten free',
    cuisine: 'American',
    time: 20,
    ingredients: ['Gluten-free flour', 'Eggs', 'Milk', 'Baking powder', 'Maple syrup'],
    steps: [
      'Mix all ingredients into a batter.',
      'Pour onto hot griddle.',
      'Flip when bubbles form.',
      'Serve with maple syrup.'
    ],
    description: 'Fluffy pancakes everyone can enjoy!'
  }
];

// DOM Elements
const recipesGrid = document.getElementById('recipesGrid');
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const dietFilter = document.getElementById('dietFilter');
const cuisineFilter = document.getElementById('cuisineFilter');
const recipeModal = document.getElementById('recipeModal');
const modalRecipeContent = document.getElementById('modalRecipeContent');
const closeModalBtn = document.getElementById('closeModalBtn');
const stepModal = document.getElementById('stepModal');
const stepContent = document.getElementById('stepContent');
const closeStepModalBtn = document.getElementById('closeStepModalBtn');
const openSidebarBtn = document.getElementById('openSidebarBtn');
const shoppingListSidebar = document.getElementById('shoppingListSidebar');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const shoppingList = document.getElementById('shoppingList');
const clearListBtn = document.getElementById('clearListBtn');
const aiSuggestBtn = document.getElementById('aiSuggestBtn');
const toastContainer = document.getElementById('toast-container');
// --- DARK MODE TOGGLE ---
const modeToggle = document.getElementById('modeToggle');
const modeIcon = modeToggle ? modeToggle.querySelector('i') : null;
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    if (modeIcon) { modeIcon.classList.remove('fa-moon'); modeIcon.classList.add('fa-sun'); }
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    if (modeIcon) { modeIcon.classList.remove('fa-sun'); modeIcon.classList.add('fa-moon'); }
    localStorage.setItem('theme', 'light');
  }
}
if (modeToggle) {
  modeToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark-mode'));
  });
}
// Load mode from localStorage
(function() {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') setDarkMode(true);
  else setDarkMode(false);
})();

// Shopping List (localStorage)
let shoppingListData = JSON.parse(localStorage.getItem('shoppingList') || '[]');
function saveShoppingList() {
  localStorage.setItem('shoppingList', JSON.stringify(shoppingListData));
}
function renderShoppingList() {
  shoppingList.innerHTML = '';
  if (shoppingListData.length === 0) {
    shoppingList.innerHTML = '<li style="color:#888;">No items yet.</li>';
    return;
  }
  shoppingListData.forEach((item, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>${item}</span><button class="btn-remove-item" data-idx="${idx}"><i class="fas fa-times"></i></button>`;
    shoppingList.appendChild(li);
  });
  document.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.onclick = function() {
      const idx = +this.getAttribute('data-idx');
      shoppingListData.splice(idx, 1);
      saveShoppingList();
      renderShoppingList();
    };
  });
}
clearListBtn.onclick = function() {
  shoppingListData = [];
  saveShoppingList();
  renderShoppingList();
  showToast('Shopping list cleared!');
};
openSidebarBtn.onclick = function() {
  shoppingListSidebar.classList.add('open');
};
closeSidebarBtn.onclick = function() {
  shoppingListSidebar.classList.remove('open');
};
window.addEventListener('click', e => {
  if (e.target === shoppingListSidebar) shoppingListSidebar.classList.remove('open');
});
renderShoppingList();

// Toast Notifications
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 2200);
}

// Render Recipes
function renderRecipes(recipes) {
  recipesGrid.innerHTML = '';
  if (!recipes.length) {
    recipesGrid.innerHTML = '<div style="color:#888;font-size:1.2rem;">No recipes found.</div>';
    return;
  }
  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <div class="recipe-image"><img src="${recipe.image}" alt="${recipe.title}"></div>
      <div class="recipe-info">
        <div class="recipe-title">${recipe.title}</div>
        <div class="recipe-tags">${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}</div>
        <div class="recipe-meta">
          <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
          <span><i class="fas fa-globe"></i> ${recipe.cuisine}</span>
        </div>
        <div class="recipe-actions">
          <button class="btn-details" data-id="${recipe.id}"><i class="fas fa-info-circle"></i> Details</button>
          <button class="btn-step" data-id="${recipe.id}"><i class="fas fa-list-ol"></i> Step-by-Step</button>
          <button class="btn-add-list" data-id="${recipe.id}"><i class="fas fa-shopping-basket"></i> Add Ingredients</button>
        </div>
      </div>
    `;
    // Card click opens details
    card.onclick = e => {
      if (e.target.closest('button')) return;
      openRecipeModal(recipe.id);
    };
    recipesGrid.appendChild(card);
  });
  // Add event listeners for buttons
  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      openRecipeModal(+btn.getAttribute('data-id'));
    };
  });
  document.querySelectorAll('.btn-step').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      openStepModal(+btn.getAttribute('data-id'));
    };
  });
  document.querySelectorAll('.btn-add-list').forEach(btn => {
    btn.onclick = e => {
      e.stopPropagation();
      const recipe = demoRecipes.find(r => r.id === +btn.getAttribute('data-id'));
      if (!recipe) return;
      let added = 0;
      recipe.ingredients.forEach(ing => {
        if (!shoppingListData.includes(ing)) {
          shoppingListData.push(ing);
          added++;
        }
      });
      saveShoppingList();
      renderShoppingList();
      showToast(added ? `Added ${added} new items!` : 'All ingredients already in list.');
    };
  });
}

// Modal for Recipe Details
function openRecipeModal(id) {
  const recipe = demoRecipes.find(r => r.id === id);
  if (!recipe) return;
  modalRecipeContent.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}" style="width:100%;border-radius:16px;margin-bottom:1rem;">
    <div class="recipe-tags">${recipe.tags.map(tag => `<span class="recipe-tag">${tag}</span>`).join('')}</div>
    <div class="recipe-meta">
      <span><i class="fas fa-clock"></i> ${recipe.time} min</span>
      <span><i class="fas fa-globe"></i> ${recipe.cuisine}</span>
    </div>
    <p style="margin:1.2rem 0;">${recipe.description}</p>
    <h4>Ingredients</h4>
    <ul>${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
    <h4>Steps</h4>
    <ol>${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>
  `;
  recipeModal.classList.add('active');
}
closeModalBtn.onclick = () => recipeModal.classList.remove('active');
window.addEventListener('click', e => {
  if (e.target === recipeModal) recipeModal.classList.remove('active');
});

// Step-by-Step Mode
function openStepModal(id) {
  const recipe = demoRecipes.find(r => r.id === id);
  if (!recipe) return;
  let checklist = recipe.steps.map((step, i) => `<li><input type="checkbox" id="step${i}"><label for="step${i}">${step}</label></li>`).join('');
  stepContent.innerHTML = `
    <h2>${recipe.title} – Step-by-Step</h2>
    <ul class="step-checklist">${checklist}</ul>
    <button class="btn-details" onclick="document.getElementById('stepModal').classList.remove('active')">Done</button>
  `;
  stepModal.classList.add('active');
}
closeStepModalBtn.onclick = () => stepModal.classList.remove('active');
window.addEventListener('click', e => {
  if (e.target === stepModal) stepModal.classList.remove('active');
});

// Filters & Search
function filterRecipes() {
  let q = searchInput.value.trim().toLowerCase();
  let diet = dietFilter.value;
  let cuisine = cuisineFilter.value;
  let filtered = demoRecipes.filter(r => {
    let matchQ = !q || r.title.toLowerCase().includes(q) || r.ingredients.some(ing => ing.toLowerCase().includes(q));
    let matchDiet = !diet || (r.diet && r.diet.toLowerCase() === diet);
    let matchCuisine = !cuisine || (r.cuisine && r.cuisine.toLowerCase() === cuisine);
    return matchQ && matchDiet && matchCuisine;
  });
  renderRecipes(filtered);
}
searchForm.onsubmit = e => { e.preventDefault(); filterRecipes(); };
dietFilter.onchange = filterRecipes;
cuisineFilter.onchange = filterRecipes;
searchInput.oninput = filterRecipes;

// AI Suggestion (random recipe for demo)
aiSuggestBtn.onclick = function() {
  const idx = Math.floor(Math.random() * demoRecipes.length);
  openRecipeModal(demoRecipes[idx].id);
  showToast('AI picked a recipe for you!');
};

// Initial render
renderRecipes(demoRecipes);

// Keyboard shortcuts for accessibility
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    recipeModal.classList.remove('active');
    stepModal.classList.remove('active');
    shoppingListSidebar.classList.remove('open');
  }
}); 