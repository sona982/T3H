// ========== AUTH ========== //
const usersKey = 'users';
const currentUserKey = 'currentUser';

// Helper: get/set users
function getUsers() {
  return JSON.parse(localStorage.getItem(usersKey)) || [];
}
function setUsers(users) {
  localStorage.setItem(usersKey, JSON.stringify(users));
}
function setCurrentUser(user) {
  localStorage.setItem(currentUserKey, JSON.stringify(user));
}
function getCurrentUser() {
  return JSON.parse(localStorage.getItem(currentUserKey));
}
function clearCurrentUser() {
  localStorage.removeItem(currentUserKey);
}

// Switch tab login/register
const loginTab = document.getElementById('login-tab');
const registerTab = document.getElementById('register-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
loginTab.onclick = () => {
  loginTab.classList.add('active');
  registerTab.classList.remove('active');
  loginForm.style.display = '';
  registerForm.style.display = 'none';
};
registerTab.onclick = () => {
  registerTab.classList.add('active');
  loginTab.classList.remove('active');
  registerForm.style.display = '';
  loginForm.style.display = 'none';
};

// Đăng ký
registerForm.onsubmit = function(e) {
  e.preventDefault();
  const firstname = document.getElementById('register-firstname').value.trim();
  const lastname = document.getElementById('register-lastname').value.trim();
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value.trim();
  const msg = document.getElementById('register-message');
  if (!firstname || !lastname || !email || !password) {
    msg.textContent = 'Hãy nhập đầy đủ thông tin';
    return;
  }
  let users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    msg.textContent = 'Email này đã có tài khoản';
    return;
  }
  const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const user = { id, firstname, lastname, email, password };
  users.push(user);
  setUsers(users);
  msg.style.color = 'green';
  msg.textContent = 'Đăng ký thành công! Bạn có thể đăng nhập.';
  setTimeout(() => {
    loginTab.click();
    msg.style.color = '';
    msg.textContent = '';
  }, 1200);
  registerForm.reset();
};

// Đăng nhập
loginForm.onsubmit = function(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value.trim();
  const msg = document.getElementById('login-message');
  if (!email || !password) {
    msg.textContent = 'Hãy nhập đầy đủ thông tin';
    return;
  }
  let users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    msg.textContent = 'Thông tin tài khoản không chính xác';
    return;
  }
  setCurrentUser(user);
  showTodoSection();
};

// Đăng xuất
document.getElementById('logout-btn').onclick = function() {
  clearCurrentUser();
  showAuthSection();
};

// ========== TODO ========== //
const todosKey = 'todos';
function getTodos() {
  const user = getCurrentUser();
  if (!user) return [];
  return JSON.parse(localStorage.getItem(todosKey + '_' + user.id)) || [];
}
function setTodos(todos) {
  const user = getCurrentUser();
  if (!user) return;
  localStorage.setItem(todosKey + '_' + user.id, JSON.stringify(todos));
}

const todoSection = document.getElementById('todo-section');
const authSection = document.getElementById('auth-section');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const deleteAllBtn = document.getElementById('delete-all-btn');
const tabs = document.querySelectorAll('.tab');
let currentTab = 'all';

// Hiện/ẩn section
function showTodoSection() {
  authSection.style.display = 'none';
  todoSection.style.display = '';
  renderTodos();
}
function showAuthSection() {
  authSection.style.display = '';
  todoSection.style.display = 'none';
  loginForm.reset();
  registerForm.reset();
  document.getElementById('login-message').textContent = '';
  document.getElementById('register-message').textContent = '';
}

// Thêm todo
todoForm.onsubmit = function(e) {
  e.preventDefault();
  const value = todoInput.value.trim();
  if (!value) return;
  let todos = getTodos();
  todos.push({ id: Date.now(), text: value, completed: false });
  setTodos(todos);
  todoInput.value = '';
  renderTodos();
};

// Chuyển tab
tabs.forEach(tab => {
  tab.onclick = function() {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentTab = tab.dataset.tab;
    renderTodos();
  };
});

// Render todo
function renderTodos() {
  let todos = getTodos();
  let filtered = todos;
  if (currentTab === 'active') filtered = todos.filter(t => !t.completed);
  if (currentTab === 'completed') filtered = todos.filter(t => t.completed);

  todoList.innerHTML = '';
  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}">
      <label>${todo.text}</label>
      <button class="delete-btn" data-id="${todo.id}" title="Xóa">🗑</button>
    `;
    todoList.appendChild(li);
  });

  // Checkbox hoàn thành
  todoList.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.onchange = function() {
      let todos = getTodos();
      const todo = todos.find(t => t.id == cb.dataset.id);
      if (todo) {
        todo.completed = cb.checked;
        setTodos(todos);
        renderTodos();
      }
    };
  });

  // Xóa 1 todo
  todoList.querySelectorAll('.delete-btn').forEach(btn => {
    btn.onclick = function() {
      let todos = getTodos();
      todos = todos.filter(t => t.id != btn.dataset.id);
      setTodos(todos);
      renderTodos();
    };
  });

  // Xóa tất cả
  if (filtered.length && currentTab === 'completed') {
    deleteAllBtn.style.display = '';
  } else {
    deleteAllBtn.style.display = 'none';
  }
}
deleteAllBtn.onclick = function() {
  let todos = getTodos();
  todos = todos.filter(t => !t.completed);
  setTodos(todos);
  renderTodos();
};

// Tự động vào todo nếu đã đăng nhập
window.onload = function() {
  if (getCurrentUser()) showTodoSection();
  else showAuthSection();
};

// ========== QUẢN LÝ USERS & POSTS ========== //
// Lấy dữ liệu users và posts từ biến toàn cục (users.js, posts.js)
let usersData = (typeof users !== 'undefined' && Array.isArray(users)) ? users : [];
let postsData = (typeof posts !== 'undefined' && Array.isArray(posts)) ? posts : [];

function showManagerTab(tab) {
  const content = document.getElementById('manager-content');
  if (tab === 'login') {
    content.innerHTML = `
      <h3>Đăng nhập</h3>
      <input id="m-login-email" placeholder="Email">
      <input id="m-login-password" type="password" placeholder="Mật khẩu">
      <button onclick="managerLogin()">Đăng nhập</button>
      <div id="m-login-msg"></div>
    `;
  }
  if (tab === 'register') {
    content.innerHTML = `
      <h3>Đăng ký</h3>
      <input id="m-reg-first" placeholder="Họ">
      <input id="m-reg-last" placeholder="Tên">
      <input id="m-reg-email" placeholder="Email">
      <input id="m-reg-password" type="password" placeholder="Mật khẩu">
      <button onclick="managerRegister()">Đăng ký</button>
      <div id="m-reg-msg"></div>
    `;
  }
  if (tab === 'users') {
    content.innerHTML = `
      <h3>Danh sách Users</h3>
      <input id="m-user-keyword" placeholder="Nhập keyword (họ, tên, email)">
      <button onclick="managerShowUsers()">Tìm</button>
      <div id="m-users-list"></div>
    `;
    // Hiển thị toàn bộ users mặc định
    managerShowUsers();
  }
  if (tab === 'posts') {
    let html = `<h3>Danh sách Posts</h3><table border="1" cellpadding="5"><tr><th>ID</th><th>Title</th><th>Ngày tạo</th><th>Người tạo</th></tr>`;
    postsData.forEach(post => {
      const user = usersData.find(u => u.id === post.user_id);
      html += `<tr>
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.created_at}</td>
        <td>${user ? user.first_name + ' ' + user.last_name : 'N/A'}</td>
      </tr>`;
    });
    html += `</table>`;
    content.innerHTML = html;
  }
  if (tab === 'postDetail') {
    content.innerHTML = `
      <h3>Chi tiết Post</h3>
      <input id="m-post-id" placeholder="Nhập ID post">
      <button onclick="managerShowPostDetail()">Xem</button>
      <div id="m-post-detail"></div>
    `;
  }
  if (tab === 'searchPostsByUser') {
    content.innerHTML = `
      <h3>Tìm post theo user</h3>
      <input id="m-user-email" placeholder="Nhập email user">
      <button onclick="managerSearchPostsByUser()">Tìm</button>
      <div id="m-user-posts"></div>
    `;
  }
}

// Đăng nhập
function managerLogin() {
  const email = document.getElementById('m-login-email').value.trim();
  const password = document.getElementById('m-login-password').value.trim();
  const msg = document.getElementById('m-login-msg');
  if (!email || !password) {
    msg.textContent = 'Hãy nhập đầy đủ thông tin';
    msg.style.color = 'red';
    return;
  }
  const user = usersData.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (user) {
    msg.textContent = 'Xin chào ' + user.first_name + ' ' + user.last_name;
    msg.style.color = 'green';
  } else {
    msg.textContent = 'Thông tin tài khoản không chính xác';
    msg.style.color = 'red';
  }
}

// Đăng ký
function managerRegister() {
  const first = document.getElementById('m-reg-first').value.trim();
  const last = document.getElementById('m-reg-last').value.trim();
  const email = document.getElementById('m-reg-email').value.trim();
  const password = document.getElementById('m-reg-password').value.trim();
  const msg = document.getElementById('m-reg-msg');
  if (!first || !last || !email || !password) {
    msg.textContent = 'Hãy nhập đầy đủ thông tin';
    msg.style.color = 'red';
    return;
  }
  if (usersData.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    msg.textContent = 'Email này đã có tài khoản';
    msg.style.color = 'red';
    return;
  }
  const id = usersData.length ? Math.max(...usersData.map(u => u.id)) + 1 : 1;
  usersData.push({ id, first_name: first, last_name: last, email, password });
  msg.textContent = 'Đăng ký thành công!';
  msg.style.color = 'green';
}

// Xem danh sách users
function managerShowUsers() {
  const keywordInput = document.getElementById('m-user-keyword');
  const keyword = keywordInput ? keywordInput.value.trim().toLowerCase() : '';
  let filtered = usersData;
  if (keyword) {
    filtered = usersData.filter(u =>
      (u.first_name + ' ' + u.last_name).toLowerCase().includes(keyword) ||
      u.email.toLowerCase().includes(keyword)
    );
  }
  let html = `<table border="1" cellpadding="5"><tr><th>ID</th><th>Họ và tên</th><th>Email</th></tr>`;
  filtered.forEach(u => {
    html += `<tr>
      <td>${u.id}</td>
      <td>${u.first_name} ${u.last_name}</td>
      <td>${u.email}</td>
    </tr>`;
  });
  html += `</table>`;
  document.getElementById('m-users-list').innerHTML = html;
}

// Xem chi tiết post
function managerShowPostDetail() {
  const id = Number(document.getElementById('m-post-id').value.trim());
  const post = postsData.find(p => p.id === id);
  const div = document.getElementById('m-post-detail');
  if (!post) {
    div.textContent = 'Không tìm thấy post!';
    return;
  }
  const user = usersData.find(u => u.id === post.user_id);
  div.innerHTML = `
    <b>ID:</b> ${post.id}<br>
    <b>Tiêu đề:</b> ${post.title}<br>
    <b>Nội dung:</b> ${post.content}<br>
    <b>Ảnh:</b> <a href="${post.image}" target="_blank">${post.image}</a><br>
    <b>Người tạo:</b> ${user ? user.first_name + ' ' + user.last_name : 'N/A'}<br>
    <b>Ngày tạo:</b> ${post.created_at}<br>
    <b>Ngày sửa đổi:</b> ${post.updated_at}
  `;
}

// Tìm post theo user
function managerSearchPostsByUser() {
  const email = document.getElementById('m-user-email').value.trim().toLowerCase();
  const div = document.getElementById('m-user-posts');
  const user = usersData.find(u => u.email.toLowerCase() === email);
  if (!user) {
    div.textContent = 'Không tìm thấy user!';
    return;
  }
  const userPosts = postsData.filter(p => p.user_id === user.id);
  if (!userPosts.length) {
    div.textContent = 'User này không có post nào!';
    return;
  }
  let html = `<b>Posts của ${user.first_name} ${user.last_name}:</b><ul>`;
  userPosts.forEach(p => {
    html += `<li><b>${p.title}</b> (ID: ${p.id})</li>`;
  });
  html += `</ul>`;
  div.innerHTML = html;
} 