// Sample data
let tasks = JSON.parse(localStorage.getItem('tasks')) || [
  {
    id: 1,
    title: "Design new landing page",
    description: "Create wireframes and mockups for the new landing page",
    project: "Website Redesign",
    priority: "high",
    status: "in-progress",
    assignee: "john",
    dueDate: "2024-12-20",
    createdAt: "2024-12-01",
    completedAt: null
  },
  {
    id: 2,
    title: "Implement user authentication",
    description: "Add login and registration functionality",
    project: "Mobile App",
    priority: "urgent",
    status: "todo",
    assignee: "jane",
    dueDate: "2024-12-15",
    createdAt: "2024-12-02",
    completedAt: null
  },
  {
    id: 3,
    title: "Write API documentation",
    description: "Document all API endpoints and usage examples",
    project: "Backend API",
    priority: "medium",
    status: "completed",
    assignee: "mike",
    dueDate: "2024-12-10",
    createdAt: "2024-12-01",
    completedAt: "2024-12-08"
  },
  {
    id: 4,
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment",
    project: "DevOps",
    priority: "high",
    status: "todo",
    assignee: "john",
    dueDate: "2024-12-25",
    createdAt: "2024-12-03",
    completedAt: null
  },
  {
    id: 5,
    title: "Review code changes",
    description: "Code review for the latest feature branch",
    project: "Website Redesign",
    priority: "medium",
    status: "in-progress",
    assignee: "jane",
    dueDate: "2024-12-12",
    createdAt: "2024-12-04",
    completedAt: null
  }
];

let projects = JSON.parse(localStorage.getItem('projects')) || [
  {
    id: 1,
    name: "Website Redesign",
    description: "Complete overhaul of the company website",
    color: "#3b82f6",
    startDate: "2024-12-01",
    endDate: "2024-12-31",
    status: "active",
    progress: 65
  },
  {
    id: 2,
    name: "Mobile App",
    description: "iOS and Android mobile application",
    color: "#10b981",
    startDate: "2024-11-15",
    endDate: "2025-02-28",
    status: "active",
    progress: 35
  },
  {
    id: 3,
    name: "Backend API",
    description: "RESTful API development",
    color: "#f59e0b",
    startDate: "2024-11-01",
    endDate: "2024-12-15",
    status: "completed",
    progress: 100
  },
  {
    id: 4,
    name: "DevOps",
    description: "Infrastructure and deployment setup",
    color: "#ef4444",
    startDate: "2024-12-01",
    endDate: "2024-12-30",
    status: "active",
    progress: 20
  }
];

let activities = [
  {
    id: 1,
    type: "completed",
    message: "Completed task: Write API documentation",
    time: "2 hours ago",
    user: "Mike Johnson"
  },
  {
    id: 2,
    type: "in-progress",
    message: "Started working on: Design new landing page",
    time: "4 hours ago",
    user: "John Doe"
  },
  {
    id: 3,
    type: "created",
    message: "Created new project: DevOps",
    time: "1 day ago",
    user: "John Doe"
  },
  {
    id: 4,
    type: "completed",
    message: "Completed task: Setup database schema",
    time: "2 days ago",
    user: "Jane Smith"
  }
];

// State management
let currentView = 'dashboard';
let currentFilter = 'all';
let currentSort = 'due-date';
let currentDate = new Date();

// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const navLinks = document.querySelectorAll('.nav-link[data-view]');
const addTaskBtn = document.getElementById('addTaskBtn');
const addProjectBtn = document.getElementById('addProjectBtn');
const searchInput = document.getElementById('searchInput');
const themeToggle = document.getElementById('themeToggle');
const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');

// Charts
let progressChart, projectChart;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
  loadData();
  renderDashboard();
  updateStats();
  initializeCharts();
});

function initializeApp() {
  // Set default dates for forms
  const today = new Date().toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  if (document.getElementById('taskDueDate')) {
    document.getElementById('taskDueDate').value = nextWeek;
  }
  if (document.getElementById('projectStartDate')) {
    document.getElementById('projectStartDate').value = today;
  }
  if (document.getElementById('projectEndDate')) {
    document.getElementById('projectEndDate').value = nextWeek;
  }
}

function setupEventListeners() {
  // Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const view = link.dataset.view;
      switchView(view);
    });
  });

  // Sidebar toggle
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
  });

  // Quick actions
  addTaskBtn.addEventListener('click', () => openModal('addTaskModal'));
  addProjectBtn.addEventListener('click', () => openModal('addProjectModal'));

  // Search
  searchInput.addEventListener('input', handleSearch);

  // Theme toggle
  themeToggle.addEventListener('click', toggleTheme);

  // Form submissions
  document.getElementById('addTaskForm').addEventListener('submit', handleAddTask);
  document.getElementById('addProjectForm').addEventListener('submit', handleAddProject);

  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => closeAllModals());
  });

  // Overlay click
  document.getElementById('overlay').addEventListener('click', closeAllModals);

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
    if (e.ctrlKey && e.key === 'k') {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      renderCurrentView();
    });
  });

  // View toggle buttons
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCurrentView();
    });
  });

  // Task sorting
  document.getElementById('taskSort').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderTasks();
  });

  // Calendar navigation
  document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });
}

function switchView(view) {
  // Update navigation
  navLinks.forEach(link => link.classList.remove('active'));
  document.querySelector(`[data-view="${view}"]`).classList.add('active');

  // Hide all views
  document.querySelectorAll('.view-content').forEach(content => {
    content.classList.remove('active');
  });

  // Show selected view
  document.getElementById(view).classList.add('active');

  // Update page title and description
  updatePageInfo(view);

  // Render view content
  currentView = view;
  renderCurrentView();
}

function updatePageInfo(view) {
  const titles = {
    dashboard: 'Dashboard',
    projects: 'Projects',
    tasks: 'Tasks',
    calendar: 'Calendar'
  };

  const descriptions = {
    dashboard: 'Welcome back! Here\'s what\'s happening today.',
    projects: 'Manage your projects and track progress.',
    tasks: 'Organize and prioritize your tasks.',
    calendar: 'View your schedule and upcoming deadlines.'
  };

  pageTitle.textContent = titles[view];
  pageDescription.textContent = descriptions[view];
}

function renderCurrentView() {
  switch (currentView) {
    case 'dashboard':
      renderDashboard();
      break;
    case 'projects':
      renderProjects();
      break;
    case 'tasks':
      renderTasks();
      break;
    case 'calendar':
      renderCalendar();
      break;
  }
}

function renderDashboard() {
  renderActivityList();
  renderDeadlinesList();
  updateStats();
  initializeCharts();
}

function renderActivityList() {
  const activityList = document.getElementById('activityList');
  activityList.innerHTML = activities.map(activity => `
    <div class="activity-item">
      <div class="activity-icon ${activity.type}">
        <i class="fas fa-${getActivityIcon(activity.type)}"></i>
      </div>
      <div class="activity-content">
        <h4>${activity.message}</h4>
        <p>${activity.user}</p>
      </div>
      <div class="activity-time">${activity.time}</div>
    </div>
  `).join('');
}

function renderDeadlinesList() {
  const deadlines = tasks
    .filter(task => task.status !== 'completed' && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const deadlinesList = document.getElementById('deadlinesList');
  deadlinesList.innerHTML = deadlines.map(task => {
    const daysUntil = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    const urgency = daysUntil <= 1 ? 'urgent' : daysUntil <= 3 ? 'warning' : 'normal';
    
    return `
      <div class="deadline-item">
        <div class="deadline-icon ${urgency}">
          <i class="fas fa-calendar"></i>
        </div>
        <div class="deadline-content">
          <h4>${task.title}</h4>
          <p>${task.project}</p>
        </div>
        <div class="deadline-time">
          ${daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `${daysUntil} days`}
        </div>
      </div>
    `;
  }).join('');
}

function getActivityIcon(type) {
  const icons = {
    'completed': 'check-circle',
    'in-progress': 'play-circle',
    'created': 'plus-circle'
  };
  return icons[type] || 'circle';
}

function updateStats() {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = totalTasks - completedTasks;
  const totalProjects = projects.filter(project => project.status === 'active').length;

  document.getElementById('totalTasks').textContent = totalTasks;
  document.getElementById('completedTasks').textContent = completedTasks;
  document.getElementById('pendingTasks').textContent = pendingTasks;
  document.getElementById('totalProjects').textContent = totalProjects;

  // Update task counts
  document.getElementById('todoCount').textContent = tasks.filter(t => t.status === 'todo').length;
  document.getElementById('inProgressCount').textContent = tasks.filter(t => t.status === 'in-progress').length;
  document.getElementById('completedCount').textContent = completedTasks;
}

function initializeCharts() {
  // Progress Chart
  const progressCtx = document.getElementById('progressChart');
  if (progressChart) {
    progressChart.destroy();
  }

  const progressData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Tasks Completed',
      data: [5, 8, 12, 6, 9, 4, 7],
      borderColor: '#6366f1',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  progressChart = new Chart(progressCtx, {
    type: 'line',
    data: progressData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10
        }
      }
    }
  });

  // Project Chart
  const projectCtx = document.getElementById('projectChart');
  if (projectChart) {
    projectChart.destroy();
  }

  const projectData = {
    labels: projects.map(p => p.name),
    datasets: [{
      data: projects.map(p => p.progress),
      backgroundColor: projects.map(p => p.color),
      borderWidth: 0
    }]
  };

  projectChart = new Chart(projectCtx, {
    type: 'doughnut',
    data: projectData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12
            }
          }
        }
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10
        }
      }
    }
  });

  // Add resize handler to prevent stretching
  window.addEventListener('resize', debounce(() => {
    if (progressChart) {
      progressChart.resize();
    }
    if (projectChart) {
      projectChart.resize();
    }
  }, 250));
}

function renderProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  const filteredProjects = filterProjects(projects, currentFilter);
  
  projectsGrid.innerHTML = filteredProjects.map(project => `
    <div class="project-card">
      <div class="project-header">
        <div class="project-color" style="background: ${project.color}"></div>
        <div>
          <div class="project-title">${project.name}</div>
          <div class="project-status ${project.status}">${project.status}</div>
        </div>
      </div>
      <div class="project-description">${project.description}</div>
      <div class="project-meta">
        <div class="project-dates">
          ${formatDate(project.startDate)} - ${formatDate(project.endDate)}
        </div>
      </div>
      <div class="project-progress">
        <div class="progress-header">
          <span class="progress-label">Progress</span>
          <span class="progress-percentage">${project.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${project.progress}%"></div>
        </div>
      </div>
      <div class="project-stats">
        <div class="project-stat">
          <span class="project-stat-number">${getProjectTaskCount(project.id)}</span>
          <span class="project-stat-label">Tasks</span>
        </div>
        <div class="project-stat">
          <span class="project-stat-number">${getProjectCompletedCount(project.id)}</span>
          <span class="project-stat-label">Completed</span>
        </div>
      </div>
    </div>
  `).join('');
}

function filterProjects(projects, filter) {
  switch (filter) {
    case 'active':
      return projects.filter(p => p.status === 'active');
    case 'completed':
      return projects.filter(p => p.status === 'completed');
    case 'archived':
      return projects.filter(p => p.status === 'archived');
    default:
      return projects;
  }
}

function renderTasks() {
  const filteredTasks = filterTasks(tasks, currentFilter);
  const sortedTasks = sortTasks(filteredTasks, currentSort);
  
  // Group tasks by status
  const todoTasks = sortedTasks.filter(t => t.status === 'todo');
  const inProgressTasks = sortedTasks.filter(t => t.status === 'in-progress');
  const completedTasks = sortedTasks.filter(t => t.status === 'completed');

  // Render each column
  renderTaskColumn('todoTasks', todoTasks);
  renderTaskColumn('inProgressTasks', inProgressTasks);
  renderTaskColumn('completedTasks', completedTasks);
}

function renderTaskColumn(columnId, tasks) {
  const column = document.getElementById(columnId);
  column.innerHTML = tasks.map(task => `
    <div class="task-card" draggable="true" data-task-id="${task.id}">
      <div class="task-header">
        <div class="task-title">${task.title}</div>
        <div class="task-priority ${task.priority}"></div>
      </div>
      <div class="task-meta">
        <div class="task-project">${task.project}</div>
        <div class="task-due-date">${formatDate(task.dueDate)}</div>
      </div>
      <div class="task-footer">
        <div class="task-assignee">
          <div class="assignee-avatar">
            <i class="fas fa-user"></i>
          </div>
          <div class="assignee-name">${getAssigneeName(task.assignee)}</div>
        </div>
        <div class="task-actions">
          <button class="task-action-btn" onclick="viewTask(${task.id})">
            <i class="fas fa-eye"></i>
          </button>
          <button class="task-action-btn" onclick="editTask(${task.id})">
            <i class="fas fa-edit"></i>
          </button>
          <button class="task-action-btn" onclick="deleteTask(${task.id})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  // Add drag and drop functionality
  setupDragAndDrop(column, tasks);
}

function filterTasks(tasks, filter) {
  switch (filter) {
    case 'todo':
      return tasks.filter(t => t.status === 'todo');
    case 'in-progress':
      return tasks.filter(t => t.status === 'in-progress');
    case 'completed':
      return tasks.filter(t => t.status === 'completed');
    default:
      return tasks;
  }
}

function sortTasks(tasks, sort) {
  switch (sort) {
    case 'due-date':
      return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    case 'priority':
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return tasks.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    case 'created':
      return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'name':
      return tasks.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return tasks;
  }
}

function setupDragAndDrop(column, tasks) {
  column.addEventListener('dragover', (e) => {
    e.preventDefault();
    column.style.backgroundColor = 'rgba(99, 102, 241, 0.1)';
  });

  column.addEventListener('dragleave', () => {
    column.style.backgroundColor = '';
  });

  column.addEventListener('drop', (e) => {
    e.preventDefault();
    column.style.backgroundColor = '';
    
    const taskId = parseInt(e.dataTransfer.getData('text/plain'));
    const newStatus = column.parentElement.dataset.status;
    
    updateTaskStatus(taskId, newStatus);
  });

  column.querySelectorAll('.task-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', card.dataset.taskId);
    });
  });
}

function renderCalendar() {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  document.getElementById('currentMonth').textContent = 
    `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const calendarGrid = document.getElementById('calendarGrid');
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - firstDay.getDay());

  let calendarHTML = '';
  const today = new Date().toISOString().split('T')[0];

  for (let i = 0; i < 42; i++) {
    const currentDay = new Date(startDate);
    currentDay.setDate(startDate.getDate() + i);
    
    const isCurrentMonth = currentDay.getMonth() === currentDate.getMonth();
    const isToday = currentDay.toISOString().split('T')[0] === today;
    const dayEvents = getDayEvents(currentDay);
    
    calendarHTML += `
      <div class="calendar-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}">
        <div class="calendar-day-number">${currentDay.getDate()}</div>
        <div class="calendar-events">
          ${dayEvents.map(event => `
            <div class="calendar-event ${event.type}" title="${event.title}">
              ${event.title}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  calendarGrid.innerHTML = calendarHTML;
}

function getDayEvents(date) {
  const dateStr = date.toISOString().split('T')[0];
  const dayTasks = tasks.filter(task => task.dueDate === dateStr);
  
  return dayTasks.map(task => ({
    type: 'task',
    title: task.title
  }));
}

function handleSearch() {
  const query = searchInput.value.toLowerCase();
  
  if (currentView === 'tasks') {
    const filteredTasks = tasks.filter(task => 
      task.title.toLowerCase().includes(query) ||
      task.description.toLowerCase().includes(query) ||
      task.project.toLowerCase().includes(query)
    );
    renderFilteredTasks(filteredTasks);
  } else if (currentView === 'projects') {
    const filteredProjects = projects.filter(project => 
      project.name.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    );
    renderFilteredProjects(filteredProjects);
  }
}

function renderFilteredTasks(filteredTasks) {
  const sortedTasks = sortTasks(filteredTasks, currentSort);
  
  const todoTasks = sortedTasks.filter(t => t.status === 'todo');
  const inProgressTasks = sortedTasks.filter(t => t.status === 'in-progress');
  const completedTasks = sortedTasks.filter(t => t.status === 'completed');

  renderTaskColumn('todoTasks', todoTasks);
  renderTaskColumn('inProgressTasks', inProgressTasks);
  renderTaskColumn('completedTasks', completedTasks);
}

function renderFilteredProjects(filteredProjects) {
  const projectsGrid = document.getElementById('projectsGrid');
  projectsGrid.innerHTML = filteredProjects.map(project => `
    <div class="project-card">
      <div class="project-header">
        <div class="project-color" style="background: ${project.color}"></div>
        <div>
          <div class="project-title">${project.name}</div>
          <div class="project-status ${project.status}">${project.status}</div>
        </div>
      </div>
      <div class="project-description">${project.description}</div>
      <div class="project-progress">
        <div class="progress-header">
          <span class="progress-label">Progress</span>
          <span class="progress-percentage">${project.progress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${project.progress}%"></div>
        </div>
      </div>
    </div>
  `).join('');
}

function handleAddTask(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const newTask = {
    id: Date.now(),
    title: formData.get('taskTitle'),
    description: formData.get('taskDescription'),
    project: formData.get('taskProject'),
    priority: formData.get('taskPriority'),
    status: 'todo',
    assignee: formData.get('taskAssignee'),
    dueDate: formData.get('taskDueDate'),
    createdAt: new Date().toISOString().split('T')[0],
    completedAt: null
  };

  tasks.push(newTask);
  saveData();
  closeAllModals();
  renderCurrentView();
  showToast('success', 'Task Created', 'New task has been added successfully');
}

function handleAddProject(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const newProject = {
    id: Date.now(),
    name: formData.get('projectName'),
    description: formData.get('projectDescription'),
    color: formData.get('projectColor'),
    startDate: formData.get('projectStartDate'),
    endDate: formData.get('projectEndDate'),
    status: 'active',
    progress: 0
  };

  projects.push(newProject);
  saveData();
  closeAllModals();
  renderCurrentView();
  showToast('success', 'Project Created', 'New project has been created successfully');
}

function updateTaskStatus(taskId, newStatus) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = newStatus;
    if (newStatus === 'completed') {
      task.completedAt = new Date().toISOString().split('T')[0];
    }
    saveData();
    renderCurrentView();
    showToast('success', 'Task Updated', 'Task status has been updated');
  }
}

function viewTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  const modal = document.getElementById('taskDetailsModal');
  const title = document.getElementById('taskDetailsTitle');
  const content = document.getElementById('taskDetailsContent');

  title.textContent = task.title;
  content.innerHTML = `
    <div class="task-detail-section">
      <h3>Task Information</h3>
      <div class="task-detail-grid">
        <div class="task-detail-item">
          <div class="task-detail-label">Description</div>
          <div class="task-detail-value">${task.description || 'No description'}</div>
        </div>
        <div class="task-detail-item">
          <div class="task-detail-label">Project</div>
          <div class="task-detail-value">${task.project}</div>
        </div>
        <div class="task-detail-item">
          <div class="task-detail-label">Priority</div>
          <div class="task-detail-value">
            <span class="priority-badge ${task.priority}">${task.priority}</span>
          </div>
        </div>
        <div class="task-detail-item">
          <div class="task-detail-label">Status</div>
          <div class="task-detail-value">
            <span class="status-badge ${task.status}">${task.status}</span>
          </div>
        </div>
        <div class="task-detail-item">
          <div class="task-detail-label">Assignee</div>
          <div class="task-detail-value">${getAssigneeName(task.assignee)}</div>
        </div>
        <div class="task-detail-item">
          <div class="task-detail-label">Due Date</div>
          <div class="task-detail-value">${formatDate(task.dueDate)}</div>
        </div>
        <div class="task-detail-item">
          <div class="task-detail-label">Created</div>
          <div class="task-detail-value">${formatDate(task.createdAt)}</div>
        </div>
        ${task.completedAt ? `
          <div class="task-detail-item">
            <div class="task-detail-label">Completed</div>
            <div class="task-detail-value">${formatDate(task.completedAt)}</div>
          </div>
        ` : ''}
      </div>
    </div>
  `;

  openModal(modal);
}

function editTask(taskId) {
  // Implementation for editing tasks
  showToast('info', 'Edit Task', 'Edit functionality coming soon');
}

function deleteTask(taskId) {
  if (confirm('Are you sure you want to delete this task?')) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveData();
    renderCurrentView();
    showToast('success', 'Task Deleted', 'Task has been removed');
  }
}

function toggleTheme() {
  const body = document.body;
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  const icon = themeToggle.querySelector('i');
  icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  
  showToast('success', 'Theme Changed', `${newTheme.charAt(0).toUpperCase() + newTheme.slice(1)} theme applied`);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  const overlay = document.getElementById('overlay');
  
  modal.classList.add('active');
  overlay.classList.add('active');
  
  // Populate project options in task form
  if (modalId === 'addTaskModal') {
    const projectSelect = document.getElementById('taskProject');
    projectSelect.innerHTML = '<option value="">Select Project</option>' +
      projects.map(p => `<option value="${p.name}">${p.name}</option>`).join('');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
  document.getElementById('overlay').classList.remove('active');
}

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

// Utility functions
function formatDate(dateString) {
  if (!dateString) return 'No date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
}

function getAssigneeName(assigneeId) {
  const assignees = {
    'john': 'John Doe',
    'jane': 'Jane Smith',
    'mike': 'Mike Johnson'
  };
  return assignees[assigneeId] || 'Unassigned';
}

function getProjectTaskCount(projectId) {
  return tasks.filter(task => task.project === projects.find(p => p.id === projectId)?.name).length;
}

function getProjectCompletedCount(projectId) {
  const projectName = projects.find(p => p.id === projectId)?.name;
  return tasks.filter(task => task.project === projectName && task.status === 'completed').length;
}

function saveData() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('projects', JSON.stringify(projects));
}

function loadData() {
  // Load theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// Performance optimization: Debounce search
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

// Apply debouncing to search
const debouncedSearch = debounce(handleSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

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