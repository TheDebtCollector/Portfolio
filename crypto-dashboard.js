// Crypto Dashboard Application
class CryptoDashboard {
  constructor() {
    this.portfolio = this.loadPortfolio();
    this.marketData = [];
    this.chart = null;
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.isLoading = false;
    
    this.init();
  }

  // Initialize the application
  async init() {
    this.setupEventListeners();
    this.applyTheme();
    await this.loadMarketData();
    this.renderPortfolio();
    this.renderMarketData();
    this.setupChart();
    this.hideLoadingScreen();
    this.startAutoRefresh();
  }

  // Setup event listeners
  setupEventListeners() {
    // Theme toggle
    document.getElementById('themeToggle').addEventListener('click', () => {
      this.toggleTheme();
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
      this.refreshData();
    });

    // Add coin modal
    document.getElementById('addCoinBtn').addEventListener('click', () => {
      this.showAddCoinModal();
    });

    // Modal controls
    document.getElementById('closeModal').addEventListener('click', () => {
      this.hideModal('addCoinModal');
    });

    document.getElementById('closeEditModal').addEventListener('click', () => {
      this.hideModal('editCoinModal');
    });

    // Form submissions
    document.getElementById('addCoinForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.addCoin();
    });

    document.getElementById('editCoinForm').addEventListener('submit', (e) => {
      e.preventDefault();
      this.updateCoin();
    });

    // Search and sort
    document.getElementById('searchInput').addEventListener('input', (e) => {
      this.filterPortfolio(e.target.value);
    });

    document.getElementById('sortSelect').addEventListener('change', (e) => {
      this.sortPortfolio(e.target.value);
    });

    // Market tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.switchMarketTab(e.target.dataset.tab);
      });
    });

    // Time filter
    document.getElementById('timeFilter').addEventListener('change', (e) => {
      this.updateChart(e.target.value);
    });

    // Modal backdrop clicks
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.hideModal(modal.id);
        }
      });
    });

    // Delete coin
    document.getElementById('deleteCoin').addEventListener('click', () => {
      this.deleteCoin();
    });
  }

  // Theme management
  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.applyTheme();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    const themeIcon = document.querySelector('#themeToggle i');
    themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // Loading screen
  hideLoadingScreen() {
    setTimeout(() => {
      document.getElementById('loading-screen').classList.add('hidden');
    }, 1500);
  }

  // API calls
  async fetchMarketData() {
    try {
      // Using CoinGecko API (free tier)
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h');
      
      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const data = await response.json();
      return data.map(coin => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        price: coin.current_price,
        change24h: coin.price_change_percentage_24h,
        marketCap: coin.market_cap,
        volume: coin.total_volume,
        image: coin.image
      }));
    } catch (error) {
      console.error('Error fetching market data:', error);
      // Fallback to mock data
      return this.getMockMarketData();
    }
  }

  // Mock data for demonstration
  getMockMarketData() {
    const coins = [
      { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', price: 45000, change24h: 2.5, marketCap: 850000000000, volume: 25000000000 },
      { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', price: 3200, change24h: -1.2, marketCap: 380000000000, volume: 18000000000 },
      { id: 'binancecoin', symbol: 'BNB', name: 'BNB', price: 380, change24h: 5.8, marketCap: 58000000000, volume: 2200000000 },
      { id: 'cardano', symbol: 'ADA', name: 'Cardano', price: 1.25, change24h: -0.8, marketCap: 42000000000, volume: 1500000000 },
      { id: 'solana', symbol: 'SOL', name: 'Solana', price: 140, change24h: 8.2, marketCap: 42000000000, volume: 3200000000 },
      { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', price: 25, change24h: 3.1, marketCap: 25000000000, volume: 1200000000 },
      { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', price: 0.15, change24h: -2.3, marketCap: 20000000000, volume: 800000000 },
      { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', price: 85, change24h: 12.5, marketCap: 18000000000, volume: 1500000000 }
    ];

    return coins.map(coin => ({
      ...coin,
      image: `https://api.coingecko.com/api/v3/coins/${coin.id}/image`
    }));
  }

  async loadMarketData() {
    this.isLoading = true;
    this.updateRefreshButton(true);
    
    try {
      this.marketData = await this.fetchMarketData();
      this.populateCoinSelect();
    } catch (error) {
      this.showToast('Error loading market data', 'error');
    } finally {
      this.isLoading = false;
      this.updateRefreshButton(false);
    }
  }

  // Portfolio management
  loadPortfolio() {
    const saved = localStorage.getItem('cryptoPortfolio');
    return saved ? JSON.parse(saved) : [];
  }

  savePortfolio() {
    localStorage.setItem('cryptoPortfolio', JSON.stringify(this.portfolio));
  }

  addCoin() {
    const coinId = document.getElementById('coinSelect').value;
    const amount = parseFloat(document.getElementById('coinAmount').value);
    const purchasePrice = parseFloat(document.getElementById('coinPrice').value);

    if (!coinId || !amount || !purchasePrice) {
      this.showToast('Please fill in all fields', 'error');
      return;
    }

    const coin = this.marketData.find(c => c.id === coinId);
    if (!coin) {
      this.showToast('Invalid coin selected', 'error');
      return;
    }

    // Check if coin already exists in portfolio
    const existingIndex = this.portfolio.findIndex(p => p.id === coinId);
    if (existingIndex >= 0) {
      // Update existing holding
      const existing = this.portfolio[existingIndex];
      const totalAmount = existing.amount + amount;
      const avgPrice = ((existing.amount * existing.purchasePrice) + (amount * purchasePrice)) / totalAmount;
      
      this.portfolio[existingIndex] = {
        ...existing,
        amount: totalAmount,
        purchasePrice: avgPrice
      };
    } else {
      // Add new coin
      this.portfolio.push({
        id: coinId,
        symbol: coin.symbol,
        name: coin.name,
        amount: amount,
        purchasePrice: purchasePrice,
        addedAt: new Date().toISOString()
      });
    }

    this.savePortfolio();
    this.renderPortfolio();
    this.hideModal('addCoinModal');
    this.showToast('Coin added to portfolio', 'success');
    
    // Reset form
    document.getElementById('addCoinForm').reset();
  }

  updateCoin() {
    const coinId = document.getElementById('editCoinId').value;
    const amount = parseFloat(document.getElementById('editCoinAmount').value);
    const purchasePrice = parseFloat(document.getElementById('editCoinPrice').value);

    const index = this.portfolio.findIndex(p => p.id === coinId);
    if (index >= 0) {
      this.portfolio[index] = {
        ...this.portfolio[index],
        amount: amount,
        purchasePrice: purchasePrice
      };

      this.savePortfolio();
      this.renderPortfolio();
      this.hideModal('editCoinModal');
      this.showToast('Portfolio updated', 'success');
    }
  }

  deleteCoin() {
    const coinId = document.getElementById('editCoinId').value;
    const index = this.portfolio.findIndex(p => p.id === coinId);
    
    if (index >= 0) {
      this.portfolio.splice(index, 1);
      this.savePortfolio();
      this.renderPortfolio();
      this.hideModal('editCoinModal');
      this.showToast('Coin removed from portfolio', 'success');
    }
  }

  // Portfolio calculations
  calculatePortfolioValue() {
    return this.portfolio.reduce((total, holding) => {
      const coin = this.marketData.find(c => c.id === holding.id);
      if (coin) {
        return total + (holding.amount * coin.price);
      }
      return total;
    }, 0);
  }

  calculatePortfolioChange() {
    const currentValue = this.calculatePortfolioValue();
    const investedValue = this.portfolio.reduce((total, holding) => {
      return total + (holding.amount * holding.purchasePrice);
    }, 0);

    return {
      value: currentValue - investedValue,
      percentage: investedValue > 0 ? ((currentValue - investedValue) / investedValue) * 100 : 0
    };
  }

  // Rendering
  renderPortfolio() {
    const portfolioValue = this.calculatePortfolioValue();
    const portfolioChange = this.calculatePortfolioChange();

    // Update header stats
    document.getElementById('totalValue').textContent = this.formatCurrency(portfolioValue);
    document.getElementById('totalChange').textContent = `${portfolioChange.percentage >= 0 ? '+' : ''}${portfolioChange.percentage.toFixed(2)}%`;
    document.getElementById('totalChange').className = `stat-change ${portfolioChange.percentage >= 0 ? 'positive' : 'negative'}`;
    
    document.getElementById('dailyChange').textContent = this.formatCurrency(portfolioChange.value);
    document.getElementById('dailyChangePercent').textContent = `${portfolioChange.percentage >= 0 ? '+' : ''}${portfolioChange.percentage.toFixed(2)}%`;
    document.getElementById('dailyChangePercent').className = `stat-change ${portfolioChange.percentage >= 0 ? 'positive' : 'negative'}`;
    
    document.getElementById('totalCoins').textContent = this.portfolio.length;

    // Find best performer
    let bestPerformer = null;
    let bestChange = -Infinity;

    this.portfolio.forEach(holding => {
      const coin = this.marketData.find(c => c.id === holding.id);
      if (coin && coin.change24h > bestChange) {
        bestChange = coin.change24h;
        bestPerformer = coin;
      }
    });

    if (bestPerformer) {
      document.getElementById('bestPerformer').textContent = bestPerformer.symbol;
      document.getElementById('bestPerformerChange').textContent = `${bestPerformer.change24h >= 0 ? '+' : ''}${bestPerformer.change24h.toFixed(2)}%`;
      document.getElementById('bestPerformerChange').className = `stat-change ${bestPerformer.change24h >= 0 ? 'positive' : 'negative'}`;
    } else {
      document.getElementById('bestPerformer').textContent = '-';
      document.getElementById('bestPerformerChange').textContent = '+0.00%';
    }

    // Render portfolio table
    this.renderPortfolioTable();
    this.updateChart();
  }

  renderPortfolioTable() {
    const tbody = document.getElementById('portfolioTableBody');
    tbody.innerHTML = '';

    if (this.portfolio.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center" style="padding: 3rem;">
            <div style="color: var(--text-muted);">
              <i class="fas fa-coins" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
              <p>No coins in your portfolio yet</p>
              <p style="font-size: 0.875rem;">Click "Add Coin" to get started</p>
            </div>
          </td>
        </tr>
      `;
      return;
    }

    this.portfolio.forEach(holding => {
      const coin = this.marketData.find(c => c.id === holding.id);
      if (!coin) return;

      const currentValue = holding.amount * coin.price;
      const profitLoss = currentValue - (holding.amount * holding.purchasePrice);
      const profitLossPercent = ((coin.price - holding.purchasePrice) / holding.purchasePrice) * 100;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <div class="coin-info">
            <div class="coin-icon">${coin.symbol.charAt(0)}</div>
            <div class="coin-details">
              <h4>${coin.name}</h4>
              <span>${coin.symbol}</span>
            </div>
          </div>
        </td>
        <td>${this.formatCurrency(coin.price)}</td>
        <td>
          <div class="price-change ${coin.change24h >= 0 ? 'positive' : 'negative'}">
            <i class="fas fa-${coin.change24h >= 0 ? 'arrow-up' : 'arrow-down'}"></i>
            ${Math.abs(coin.change24h).toFixed(2)}%
          </div>
        </td>
        <td>${holding.amount.toFixed(6)}</td>
        <td>
          <div>
            <div>${this.formatCurrency(currentValue)}</div>
            <div class="price-change ${profitLoss >= 0 ? 'positive' : 'negative'}" style="font-size: 0.75rem;">
              ${profitLoss >= 0 ? '+' : ''}${this.formatCurrency(profitLoss)} (${profitLossPercent >= 0 ? '+' : ''}${profitLossPercent.toFixed(2)}%)
            </div>
          </div>
        </td>
        <td>
          <div class="action-buttons">
            <button class="action-btn" onclick="dashboard.editCoin('${holding.id}')" title="Edit">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn" onclick="dashboard.removeCoin('${holding.id}')" title="Remove">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  renderMarketData() {
    const grid = document.getElementById('marketGrid');
    grid.innerHTML = '';

    const activeTab = document.querySelector('.tab-btn.active').dataset.tab;
    let filteredData = [...this.marketData];

    // Filter based on active tab
    switch (activeTab) {
      case 'gainers':
        filteredData = filteredData.filter(coin => coin.change24h > 0).sort((a, b) => b.change24h - a.change24h);
        break;
      case 'losers':
        filteredData = filteredData.filter(coin => coin.change24h < 0).sort((a, b) => a.change24h - b.change24h);
        break;
      case 'trending':
      default:
        filteredData = filteredData.slice(0, 8); // Show top 8
        break;
    }

    filteredData.forEach(coin => {
      const card = document.createElement('div');
      card.className = 'market-card';
      card.innerHTML = `
        <div class="market-card-header">
          <div class="market-card-info">
            <div class="market-card-icon">${coin.symbol.charAt(0)}</div>
            <div class="market-card-details">
              <h4>${coin.name}</h4>
              <span>${coin.symbol}</span>
            </div>
          </div>
          <div class="market-card-price">
            <h3>${this.formatCurrency(coin.price)}</h3>
            <div class="market-card-change ${coin.change24h >= 0 ? 'positive' : 'negative'}">
              ${coin.change24h >= 0 ? '+' : ''}${coin.change24h.toFixed(2)}%
            </div>
          </div>
        </div>
      `;
      
      card.addEventListener('click', () => {
        this.showAddCoinModal(coin.id);
      });
      
      grid.appendChild(card);
    });
  }

  // Chart management
  setupChart() {
    const ctx = document.getElementById('portfolioChart').getContext('2d');
    
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Portfolio Value',
          data: [],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#3b82f6'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#3b82f6',
            borderWidth: 1,
            callbacks: {
              label: function(context) {
                return `Portfolio Value: $${context.parsed.y.toLocaleString()}`;
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            grid: {
              display: false
            },
            ticks: {
              color: 'var(--text-secondary)'
            }
          },
          y: {
            display: true,
            grid: {
              color: 'var(--border-light)'
            },
            ticks: {
              color: 'var(--text-secondary)',
              callback: function(value) {
                return '$' + value.toLocaleString();
              }
            }
          }
        },
        interaction: {
          mode: 'nearest',
          axis: 'x',
          intersect: false
        }
      }
    });
  }

  updateChart(timeframe = '24h') {
    if (!this.chart) return;

    // Generate mock data for demonstration
    const data = this.generateChartData(timeframe);
    
    this.chart.data.labels = data.labels;
    this.chart.data.datasets[0].data = data.values;
    this.chart.update('none');
  }

  generateChartData(timeframe) {
    const now = new Date();
    const labels = [];
    const values = [];
    let points = 24;
    let interval = 1; // hours

    switch (timeframe) {
      case '7d':
        points = 7;
        interval = 24; // days
        break;
      case '30d':
        points = 30;
        interval = 24; // days
        break;
      case '1y':
        points = 12;
        interval = 30 * 24; // months
        break;
    }

    const baseValue = this.calculatePortfolioValue();
    
    for (let i = points; i >= 0; i--) {
      const date = new Date(now.getTime() - (i * interval * 60 * 60 * 1000));
      
      if (timeframe === '24h') {
        labels.push(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      } else if (timeframe === '7d' || timeframe === '30d') {
        labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      } else {
        labels.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
      }

      // Generate realistic price movement
      const volatility = 0.02; // 2% daily volatility
      const randomChange = (Math.random() - 0.5) * volatility;
      const value = baseValue * (1 + randomChange * (i / points));
      values.push(Math.max(0, value));
    }

    return { labels, values };
  }

  // Modal management
  showAddCoinModal(coinId = null) {
    const modal = document.getElementById('addCoinModal');
    modal.classList.add('active');
    
    if (coinId) {
      document.getElementById('coinSelect').value = coinId;
    }
  }

  hideModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
  }

  editCoin(coinId) {
    const holding = this.portfolio.find(p => p.id === coinId);
    if (!holding) return;

    document.getElementById('editCoinId').value = holding.id;
    document.getElementById('editCoinAmount').value = holding.amount;
    document.getElementById('editCoinPrice').value = holding.purchasePrice;
    
    document.getElementById('editCoinModal').classList.add('active');
  }

  removeCoin(coinId) {
    if (confirm('Are you sure you want to remove this coin from your portfolio?')) {
      const index = this.portfolio.findIndex(p => p.id === coinId);
      if (index >= 0) {
        this.portfolio.splice(index, 1);
        this.savePortfolio();
        this.renderPortfolio();
        this.showToast('Coin removed from portfolio', 'success');
      }
    }
  }

  // Search and filter
  filterPortfolio(searchTerm) {
    const rows = document.querySelectorAll('#portfolioTableBody tr');
    const term = searchTerm.toLowerCase();

    rows.forEach(row => {
      const coinName = row.querySelector('.coin-details h4')?.textContent.toLowerCase() || '';
      const coinSymbol = row.querySelector('.coin-details span')?.textContent.toLowerCase() || '';
      
      if (coinName.includes(term) || coinSymbol.includes(term)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  sortPortfolio(sortBy) {
    const tbody = document.getElementById('portfolioTableBody');
    const rows = Array.from(tbody.querySelectorAll('tr'));

    rows.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'value':
          aValue = parseFloat(a.querySelector('td:nth-child(5)')?.textContent.replace(/[$,]/g, '') || 0);
          bValue = parseFloat(b.querySelector('td:nth-child(5)')?.textContent.replace(/[$,]/g, '') || 0);
          break;
        case 'change':
          aValue = parseFloat(a.querySelector('.price-change')?.textContent.replace(/[+%]/g, '') || 0);
          bValue = parseFloat(b.querySelector('.price-change')?.textContent.replace(/[+%]/g, '') || 0);
          break;
        case 'name':
        default:
          aValue = a.querySelector('.coin-details h4')?.textContent || '';
          bValue = b.querySelector('.coin-details h4')?.textContent || '';
          break;
      }

      if (sortBy === 'name') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue - aValue;
      }
    });

    rows.forEach(row => tbody.appendChild(row));
  }

  // Market tabs
  switchMarketTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
    this.renderMarketData();
  }

  // Utility functions
  formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }

  populateCoinSelect() {
    const select = document.getElementById('coinSelect');
    select.innerHTML = '<option value="">Choose a coin...</option>';
    
    this.marketData.forEach(coin => {
      const option = document.createElement('option');
      option.value = coin.id;
      option.textContent = `${coin.name} (${coin.symbol})`;
      select.appendChild(option);
    });
  }

  updateRefreshButton(loading) {
    const btn = document.getElementById('refreshBtn');
    const icon = btn.querySelector('i');
    
    if (loading) {
      btn.classList.add('loading');
      btn.disabled = true;
    } else {
      btn.classList.remove('loading');
      btn.disabled = false;
    }
  }

  async refreshData() {
    await this.loadMarketData();
    this.renderPortfolio();
    this.renderMarketData();
    this.showToast('Data refreshed', 'success');
  }

  startAutoRefresh() {
    // Auto refresh every 5 minutes
    setInterval(() => {
      this.refreshData();
    }, 5 * 60 * 1000);
  }

  // Toast notifications
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconMap = {
      success: 'check-circle',
      error: 'exclamation-circle',
      info: 'info-circle'
    };

    toast.innerHTML = `
      <i class="fas fa-${iconMap[type]} toast-icon"></i>
      <div class="toast-content">
        <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">
        <i class="fas fa-times"></i>
      </button>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.add('show');
    }, 100);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
      this.hideToast(toast);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      this.hideToast(toast);
    }, 5000);
  }

  hideToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }
}

// Initialize the dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
  dashboard = new CryptoDashboard();
});

// Console welcome message
console.log(`
%c🚀 Crypto Portfolio Tracker
%c
%cWelcome to Noah's advanced crypto dashboard!
%c
%cFeatures:
%c• Real-time market data from CoinGecko API
%c• Portfolio tracking with profit/loss calculations
%c• Interactive charts with Chart.js
%c• Dark/light theme support
%c• Responsive design
%c• Local storage for portfolio persistence
%c
%cBuilt with modern web technologies:
%c• Vanilla JavaScript (ES6+)
%c• CSS Grid & Flexbox
%c• Chart.js for data visualization
%c• RESTful API integration
%c
%cFeel free to explore the code! 📊
`,
'color: #3b82f6; font-size: 18px; font-weight: bold;',
'color: #6b7280; font-size: 14px;',
'color: #1f2937; font-size: 14px; font-weight: bold;',
'color: #6b7280; font-size: 12px;',
'color: #1f2937; font-size: 12px; font-weight: bold;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #1f2937; font-size: 12px; font-weight: bold;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #6b7280; font-size: 11px;',
'color: #3b82f6; font-size: 12px; font-weight: bold;'
); 