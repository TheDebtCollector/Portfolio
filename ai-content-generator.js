// AI Content Generator - JavaScript

// Sample content templates for demonstration
const contentTemplates = {
  blog: {
    title: "Blog Post",
    prompt: "Write a comprehensive blog post about {topic} with a {tone} tone. Include an introduction, main points, and conclusion. Target length: {length} words.",
    examples: {
      "The Future of AI in Business": "Artificial Intelligence is revolutionizing how businesses operate in the modern world. From automated customer service to predictive analytics, AI technologies are becoming essential tools for companies looking to stay competitive in an increasingly digital marketplace.\n\nIn this comprehensive guide, we'll explore the key ways AI is transforming business operations, the benefits it brings to organizations, and what the future holds for AI-powered business solutions.\n\n**The Current State of AI in Business**\n\nToday, AI is already deeply integrated into many business processes. Machine learning algorithms help companies analyze customer behavior, optimize marketing campaigns, and make data-driven decisions. Natural language processing enables chatbots to handle customer inquiries 24/7, while computer vision systems automate quality control in manufacturing.\n\n**Key Benefits of AI Implementation**\n\n1. **Increased Efficiency**: AI automates repetitive tasks, allowing employees to focus on higher-value work\n2. **Better Decision Making**: Data analysis provides insights that humans might miss\n3. **Improved Customer Experience**: Personalized recommendations and instant support\n4. **Cost Reduction**: Automation reduces operational costs and human error\n\n**Looking Ahead**\n\nAs AI technology continues to advance, we can expect even more sophisticated applications. The integration of AI with other emerging technologies like blockchain and IoT will create new opportunities for business innovation.\n\nThe future of AI in business is not about replacing humans, but about augmenting human capabilities and creating more efficient, intelligent, and customer-focused organizations."
    }
  },
  social: {
    title: "Social Media Post",
    prompt: "Create an engaging social media post about {topic} with a {tone} tone. Make it shareable and include relevant hashtags. Target length: {length} words.",
    examples: {
      "Healthy Morning Routine": "🌅 Start your day right! Here's a simple 5-minute morning routine that will boost your energy and productivity:\n\n☀️ 1. Drink a glass of water\n🧘‍♀️ 2. 2-minute meditation\n📝 3. Write 3 goals for the day\n\nSmall changes, big impact! 💪\n\n#MorningRoutine #HealthyHabits #Productivity #Wellness #SelfCare"
    }
  },
  email: {
    title: "Email Newsletter",
    prompt: "Write a professional email newsletter about {topic} with a {tone} tone. Include a compelling subject line and clear call-to-action. Target length: {length} words.",
    examples: {
      "Weekly Tech Updates": "Subject: This Week in Tech: AI Breakthroughs & Industry Insights\n\nHi [Name],\n\nHere's what's happening in the world of technology this week:\n\n🚀 **AI Breakthroughs**\n- OpenAI releases GPT-5 with enhanced reasoning capabilities\n- Google's new AI model shows 40% improvement in accuracy\n- Microsoft integrates AI into Office 365\n\n💡 **Industry Insights**\n- Remote work trends continue to evolve\n- Cybersecurity threats increase by 25%\n- Green tech investments reach record highs\n\n📊 **Market Updates**\n- Tech stocks show strong performance\n- Startup funding reaches $15B this quarter\n- New regulations impact data privacy\n\nStay ahead of the curve with our expert analysis and insights.\n\nBest regards,\n[Your Name]\nTech Insights Team"
    }
  },
  product: {
    title: "Product Description",
    prompt: "Write a compelling product description for {topic} with a {tone} tone. Focus on benefits and features that drive sales. Target length: {length} words.",
    examples: {
      "Smart Fitness Watch": "Transform your fitness journey with our revolutionary Smart Fitness Watch! 🏃‍♀️💪\n\n**Why Choose Our Smart Watch?**\n\n✨ **24/7 Health Monitoring**\nTrack your heart rate, sleep patterns, and stress levels with medical-grade accuracy. Get insights that help you optimize your health and wellness.\n\n🏃‍♀️ **Advanced Fitness Tracking**\nMonitor 15+ workout modes including running, cycling, swimming, and yoga. Get real-time feedback and personalized coaching to reach your fitness goals faster.\n\n📱 **Smart Connectivity**\nReceive calls, texts, and notifications directly on your wrist. Control your music and camera remotely for hands-free convenience.\n\n🔋 **7-Day Battery Life**\nNever worry about charging with our long-lasting battery. Perfect for busy professionals and active lifestyles.\n\n**Key Features:**\n• 1.4\" AMOLED touchscreen\n• Water-resistant (5ATM)\n• GPS tracking\n• Sleep analysis\n• Stress monitoring\n• Music storage\n• Contactless payments\n\nJoin thousands of satisfied customers who've transformed their health and fitness with our Smart Watch!\n\n**Limited Time Offer:** Get 20% off + Free Shipping! 🎉"
    }
  },
  seo: {
    title: "SEO Article",
    prompt: "Write an SEO-optimized article about {topic} with a {tone} tone. Include relevant keywords naturally and structure for search engines. Target length: {length} words.",
    examples: {
      "Best Coffee Brewing Methods": "**The Ultimate Guide to Coffee Brewing Methods: Find Your Perfect Cup**\n\nCoffee brewing is both an art and a science. Whether you're a coffee connoisseur or just starting your journey, understanding different brewing methods can help you create the perfect cup every time.\n\n**Why Brewing Method Matters**\n\nThe way you brew your coffee significantly impacts its flavor, aroma, and overall experience. Different methods extract different compounds from the coffee beans, resulting in unique taste profiles.\n\n**Top Coffee Brewing Methods**\n\n1. **Pour-Over Coffee**\n   - Clean, bright flavors\n   - Full control over brewing process\n   - Perfect for single servings\n   - Equipment: Chemex, V60, or Kalita Wave\n\n2. **French Press**\n   - Rich, full-bodied coffee\n   - Simple and affordable\n   - Great for multiple servings\n   - Brew time: 4-5 minutes\n\n3. **Espresso Machine**\n   - Concentrated, intense flavor\n   - Base for many coffee drinks\n   - Requires skill and practice\n   - Professional-grade results\n\n4. **Cold Brew**\n   - Smooth, low-acidity coffee\n   - Perfect for hot weather\n   - 12-24 hour brewing time\n   - Less bitter than hot brewing\n\n**Choosing Your Method**\n\nConsider your lifestyle, taste preferences, and time constraints when selecting a brewing method. Beginners might prefer the simplicity of a French press, while coffee enthusiasts might enjoy the precision of pour-over brewing.\n\n**Pro Tips for Better Coffee**\n\n- Use freshly ground beans\n- Maintain proper water temperature (195-205°F)\n- Clean your equipment regularly\n- Experiment with grind sizes\n- Store coffee properly\n\n**Conclusion**\n\nFinding your perfect coffee brewing method is a personal journey. Don't be afraid to experiment with different techniques and equipment. The best method is the one that produces coffee you love to drink.\n\nStart your coffee brewing adventure today and discover the amazing world of artisanal coffee!"
    }
  },
  custom: {
    title: "Custom Content",
    prompt: "Create custom content about {topic} with a {tone} tone based on the provided requirements. Target length: {length} words.",
    examples: {
      "Custom Story": "Once upon a time, in a world not so different from our own, there lived a curious developer named Alex. Alex had a passion for creating things that made people's lives better, one line of code at a time.\n\nEvery morning, Alex would wake up with excitement, ready to tackle new challenges and learn something new. The world of technology was constantly evolving, and Alex loved being part of that evolution.\n\n**The Journey Begins**\n\nAlex started with simple websites, learning HTML and CSS. Each project brought new challenges and opportunities to grow. From static pages to dynamic applications, the journey was filled with both successes and learning moments.\n\n**The Power of Community**\n\nWhat made Alex's journey special was the amazing community of developers who shared knowledge, offered support, and inspired each other to push boundaries. Collaboration became the key to innovation.\n\n**Looking Forward**\n\nAs technology continues to advance, Alex remains excited about the future. The possibilities are endless, and every day brings new opportunities to create something amazing.\n\nThe story of Alex is the story of every developer who dares to dream, learn, and create."
    }
  }
};

// Sample generated content for demonstration
const sampleContent = {
  "The Future of AI in Business": "Artificial Intelligence is revolutionizing how businesses operate in the modern world. From automated customer service to predictive analytics, AI technologies are becoming essential tools for companies looking to stay competitive in an increasingly digital marketplace.\n\nIn this comprehensive guide, we'll explore the key ways AI is transforming business operations, the benefits it brings to organizations, and what the future holds for AI-powered business solutions.\n\n**The Current State of AI in Business**\n\nToday, AI is already deeply integrated into many business processes. Machine learning algorithms help companies analyze customer behavior, optimize marketing campaigns, and make data-driven decisions. Natural language processing enables chatbots to handle customer inquiries 24/7, while computer vision systems automate quality control in manufacturing.\n\n**Key Benefits of AI Implementation**\n\n1. **Increased Efficiency**: AI automates repetitive tasks, allowing employees to focus on higher-value work\n2. **Better Decision Making**: Data analysis provides insights that humans might miss\n3. **Improved Customer Experience**: Personalized recommendations and instant support\n4. **Cost Reduction**: Automation reduces operational costs and human error\n\n**Looking Ahead**\n\nAs AI technology continues to advance, we can expect even more sophisticated applications. The integration of AI with other emerging technologies like blockchain and IoT will create new opportunities for business innovation.\n\nThe future of AI in business is not about replacing humans, but about augmenting human capabilities and creating more efficient, intelligent, and customer-focused organizations.",
  
  "Healthy Morning Routine": "🌅 Start your day right! Here's a simple 5-minute morning routine that will boost your energy and productivity:\n\n☀️ 1. Drink a glass of water\n🧘‍♀️ 2. 2-minute meditation\n📝 3. Write 3 goals for the day\n\nSmall changes, big impact! 💪\n\n#MorningRoutine #HealthyHabits #Productivity #Wellness #SelfCare",
  
  "Smart Fitness Watch": "Transform your fitness journey with our revolutionary Smart Fitness Watch! 🏃‍♀️💪\n\n**Why Choose Our Smart Watch?**\n\n✨ **24/7 Health Monitoring**\nTrack your heart rate, sleep patterns, and stress levels with medical-grade accuracy. Get insights that help you optimize your health and wellness.\n\n🏃‍♀️ **Advanced Fitness Tracking**\nMonitor 15+ workout modes including running, cycling, swimming, and yoga. Get real-time feedback and personalized coaching to reach your fitness goals faster.\n\n📱 **Smart Connectivity**\nReceive calls, texts, and notifications directly on your wrist. Control your music and camera remotely for hands-free convenience.\n\n🔋 **7-Day Battery Life**\nNever worry about charging with our long-lasting battery. Perfect for busy professionals and active lifestyles.\n\n**Key Features:**\n• 1.4\" AMOLED touchscreen\n• Water-resistant (5ATM)\n• GPS tracking\n• Sleep analysis\n• Stress monitoring\n• Music storage\n• Contactless payments\n\nJoin thousands of satisfied customers who've transformed their health and fitness with our Smart Watch!\n\n**Limited Time Offer:** Get 20% off + Free Shipping! 🎉"
};

// State management
let currentContentType = 'blog';
let generationHistory = JSON.parse(localStorage.getItem('aiContentHistory')) || [];
let currentFilter = 'all';

// DOM Elements
const contentTypes = document.querySelectorAll('.content-type');
const contentForm = document.getElementById('contentForm');
const outputContent = document.getElementById('outputContent');
const contentStats = document.getElementById('contentStats');
const loadingOverlay = document.getElementById('loadingOverlay');
const themeToggle = document.getElementById('themeToggle');
const historyList = document.getElementById('historyList');
const filterBtns = document.querySelectorAll('.filter-btn');
const templateBtns = document.querySelectorAll('[data-template]');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  loadHistory();
  updateHistoryDisplay();
});

function initializeApp() {
  // Set default theme
  const savedTheme = localStorage.getItem('aiContentTheme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function setupEventListeners() {
  // Content type selection
  contentTypes.forEach(type => {
    type.addEventListener('click', () => {
      contentTypes.forEach(t => t.classList.remove('active'));
      type.classList.add('active');
      currentContentType = type.dataset.type;
    });
  });

  // Form submission
  contentForm.addEventListener('submit', handleContentGeneration);

  // Action buttons
  document.getElementById('clearBtn').addEventListener('click', clearForm);
  document.getElementById('copyBtn').addEventListener('click', copyContent);
  document.getElementById('downloadBtn').addEventListener('click', downloadContent);
  document.getElementById('regenerateBtn').addEventListener('click', regenerateContent);

  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);

  // Template buttons
  templateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const template = btn.dataset.template;
      useTemplate(template);
    });
  });

  // History filters
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      updateHistoryDisplay();
    });
  });

  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href').substring(1);
      navigateToSection(target);
    });
  });
}

function handleContentGeneration(e) {
  e.preventDefault();
  
  const formData = new FormData(contentForm);
  const topic = formData.get('topic') || document.getElementById('topic').value;
  const tone = document.getElementById('tone').value;
  const length = document.getElementById('length').value;
  const keywords = document.getElementById('keywords').value;
  const additionalInfo = document.getElementById('additionalInfo').value;

  if (!topic.trim()) {
    showToast('error', 'Error', 'Please enter a topic');
    return;
  }

  showLoading(true);
  
  // Simulate AI generation with a delay
  setTimeout(() => {
    generateContent(topic, tone, length, keywords, additionalInfo);
    showLoading(false);
  }, 2000);
}

function generateContent(topic, tone, length, keywords, additionalInfo) {
  // Use sample content or generate based on template
  let content = '';
  
  if (sampleContent[topic]) {
    content = sampleContent[topic];
  } else {
    const template = contentTemplates[currentContentType];
    const prompt = template.prompt
      .replace('{topic}', topic)
      .replace('{tone}', tone)
      .replace('{length}', getLengthRange(length));
    
    content = `Generated content for: ${topic}\n\n${prompt}\n\nThis is a ${tone} piece of content about ${topic}. ${additionalInfo ? `Additional context: ${additionalInfo}` : ''}${keywords ? `\n\nKeywords: ${keywords}` : ''}\n\n[AI-generated content would appear here based on the provided parameters and OpenAI API integration.]`;
  }

  displayContent(content, topic, currentContentType);
  saveToHistory(topic, content, currentContentType);
  updateHistoryDisplay();
}

function displayContent(content, topic, type) {
  outputContent.innerHTML = `<div class="generated-content">${content}</div>`;
  contentStats.style.display = 'flex';
  
  // Update stats
  const words = content.split(/\s+/).length;
  const chars = content.length;
  const readTime = Math.ceil(words / 200);
  
  document.getElementById('wordCount').textContent = words;
  document.getElementById('charCount').textContent = chars;
  document.getElementById('readTime').textContent = readTime;
}

function getLengthRange(length) {
  const ranges = {
    'short': '150-300',
    'medium': '300-600',
    'long': '600-1000',
    'very-long': '1000+'
  };
  return ranges[length] || '300-600';
}

function clearForm() {
  contentForm.reset();
  outputContent.innerHTML = `
    <div class="placeholder-content">
      <i class="fas fa-robot"></i>
      <h4>Ready to Generate</h4>
      <p>Fill in the form and click "Generate Content" to create your AI-powered content.</p>
    </div>
  `;
  contentStats.style.display = 'none';
}

function copyContent() {
  const content = outputContent.textContent;
  if (content && !content.includes('Ready to Generate')) {
    navigator.clipboard.writeText(content).then(() => {
      showToast('success', 'Copied!', 'Content copied to clipboard');
    }).catch(() => {
      showToast('error', 'Error', 'Failed to copy content');
    });
  }
}

function downloadContent() {
  const content = outputContent.textContent;
  if (content && !content.includes('Ready to Generate')) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-content.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Downloaded!', 'Content saved as file');
  }
}

function regenerateContent() {
  const topic = document.getElementById('topic').value;
  if (topic) {
    handleContentGeneration(new Event('submit'));
  }
}

function useTemplate(templateType) {
  // Set content type
  contentTypes.forEach(type => {
    type.classList.remove('active');
    if (type.dataset.type === templateType) {
      type.classList.add('active');
    }
  });
  currentContentType = templateType;
  
  // Fill form with template example
  const template = contentTemplates[templateType];
  const exampleTopic = Object.keys(template.examples)[0];
  
  document.getElementById('topic').value = exampleTopic;
  
  showToast('info', 'Template Loaded', `${template.title} template selected`);
}

function saveToHistory(topic, content, type) {
  const historyItem = {
    id: Date.now(),
    topic,
    content: content.substring(0, 200) + '...',
    type,
    date: new Date().toISOString(),
    fullContent: content
  };
  
  generationHistory.unshift(historyItem);
  
  // Keep only last 50 items
  if (generationHistory.length > 50) {
    generationHistory = generationHistory.slice(0, 50);
  }
  
  localStorage.setItem('aiContentHistory', JSON.stringify(generationHistory));
}

function loadHistory() {
  generationHistory = JSON.parse(localStorage.getItem('aiContentHistory')) || [];
}

function updateHistoryDisplay() {
  const filteredHistory = currentFilter === 'all' 
    ? generationHistory 
    : generationHistory.filter(item => item.type === currentFilter);
  
  historyList.innerHTML = filteredHistory.length === 0 
    ? '<p style="text-align: center; color: var(--text-secondary);">No content generated yet</p>'
    : filteredHistory.map(item => `
        <div class="history-item">
          <div class="history-header">
            <div class="history-title">${item.topic}</div>
            <div class="history-date">${formatDate(item.date)}</div>
          </div>
          <div class="history-preview">${item.content}</div>
          <div class="history-actions">
            <button class="btn btn-outline" onclick="loadFromHistory(${item.id})">Load</button>
            <button class="btn btn-secondary" onclick="deleteFromHistory(${item.id})">Delete</button>
          </div>
        </div>
      `).join('');
}

function loadFromHistory(id) {
  const item = generationHistory.find(h => h.id === id);
  if (item) {
    // Set content type
    contentTypes.forEach(type => {
      type.classList.remove('active');
      if (type.dataset.type === item.type) {
        type.classList.add('active');
      }
    });
    currentContentType = item.type;
    
    // Fill form
    document.getElementById('topic').value = item.topic;
    
    // Display content
    displayContent(item.fullContent, item.topic, item.type);
    
    showToast('success', 'Loaded!', 'Content loaded from history');
  }
}

function deleteFromHistory(id) {
  generationHistory = generationHistory.filter(h => h.id !== id);
  localStorage.setItem('aiContentHistory', JSON.stringify(generationHistory));
  updateHistoryDisplay();
  showToast('success', 'Deleted!', 'Item removed from history');
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('aiContentTheme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');
  }
}

function showLoading(show) {
  if (show) {
    loadingOverlay.classList.add('active');
  } else {
    loadingOverlay.classList.remove('active');
  }
}

function showToast(type, title, message) {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    </div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  
  document.getElementById('toast-container').appendChild(toast);
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 100);
  
  // Remove toast
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Add some sample history items on first load
if (generationHistory.length === 0) {
  const sampleItems = [
    {
      id: Date.now() - 86400000,
      topic: "The Future of AI in Business",
      content: "Artificial Intelligence is revolutionizing how businesses operate in the modern world...",
      type: "blog",
      date: new Date(Date.now() - 86400000).toISOString(),
      fullContent: sampleContent["The Future of AI in Business"]
    },
    {
      id: Date.now() - 172800000,
      topic: "Healthy Morning Routine",
      content: "🌅 Start your day right! Here's a simple 5-minute morning routine...",
      type: "social",
      date: new Date(Date.now() - 172800000).toISOString(),
      fullContent: sampleContent["Healthy Morning Routine"]
    }
  ];
  
  generationHistory = sampleItems;
  localStorage.setItem('aiContentHistory', JSON.stringify(generationHistory));
} 