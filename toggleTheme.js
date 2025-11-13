// ============================================================
// THEME TOGGLER + ALL ASSIGNMENT #5 FEATURES
// ============================================================

// ===================== TOGGLE THEME =========================
const themes = {
  light: {
    bodyClass: "light-theme",
    logo: {
      default: "Logos/logoW.png",
      mini: "Logos/logoWmini.png"
    }
  },
  dark: {
    bodyClass: "dark-theme",
    logo: {
      default: "Logos/logoB.png",
      mini: "Logos/logoBmini.png"
    }
  }
};

function applyTheme() {
  const theme = localStorage.getItem("theme") || "light";
  const logo = document.getElementById("logo");

  document.body.classList.remove("light-theme", "dark-theme");
  document.body.classList.add(themes[theme].bodyClass);

  // Устанавливаем логотип
  if (logo) {
    const isMini = logo.dataset.mini === "true";
    logo.src = isMini ? themes[theme].logo.mini : themes[theme].logo.default;
  }

  // Загружаем сохранённый цвет фона или задаём дефолтный
  const savedColor = localStorage.getItem(`customBgColor_${theme}`);
  let bgColor;

  if (savedColor) {
    bgColor = savedColor;
  } else {
    // фон по умолчанию для каждой темы
    bgColor = theme === "dark" ? "#121212" : "#ffffff";
    localStorage.setItem(`customBgColor_${theme}`, bgColor);
  }

  // Применяем фон
  document.documentElement.style.setProperty('--bg-color', bgColor);
  document.body.style.backgroundColor = bgColor;

  // Чтобы цвет текста тоже адаптировался под тему
  document.body.style.color = theme === "dark" ? "#f5f5f5" : "#1a1a1a";
}


function toggleTheme() {
  const current = localStorage.getItem("theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme();
}

// ===================== FORM VALIDATION ======================
function initFormValidation() {
  const form = document.getElementById('register-form');
  if (!form) return;
  // ... (твой весь код валидации формы без изменений)
}

// ===================== ACCORDION ============================
function initAccordion() {
  // ... (весь твой код initAccordion без изменений)
}

// ===================== POPUP FORM ===========================
function initPopupForm() {
  // ... (весь твой код initPopupForm без изменений)
}

// ===================== BACKGROUND CHANGER ===================
function initBackgroundChanger() {
  const lightColors = [
    '#ffffff', '#f0f0f0', '#e8f4f8', '#fff3e0', '#f3e5f5',
    '#e0f2f1', '#fce4ec', '#fff9c4', '#f1f8e9', '#ede7f6'
  ];
  const darkColors = [
    '#121212', '#1a1a1a', '#2c2c2c', '#242424', '#1e1e1e',
    '#2b2b2b', '#191919', '#222222', '#303030', '#262626'
  ];
  let currentIndex = 0;

  if (!document.getElementById('bg-color-btn')) {
    const btn = document.createElement('button');
    btn.id = 'bg-color-btn';
    btn.innerHTML = '🎨 Change Background';
    btn.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: var(--accent-color);
      color: var(--bg-color);
      border: none;
      padding: 15px 25px;
      border-radius: 50px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      font-size: 14px;
    `;

    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      const currentTheme = localStorage.getItem('theme') || 'light';
      const palette = currentTheme === 'dark' ? darkColors : lightColors;
      currentIndex = (currentIndex + 1) % palette.length;
      const newColor = palette[currentIndex];
      document.documentElement.style.setProperty('--bg-color', newColor);
      document.body.style.backgroundColor = newColor;
      localStorage.setItem(`customBgColor_${currentTheme}`, newColor);
      btn.innerHTML = '✓ Color Changed!';
      setTimeout(() => btn.innerHTML = '🎨 Change Background', 1000);
    });
  }

  const currentTheme = localStorage.getItem('theme') || 'light';
  const savedColor = localStorage.getItem(`customBgColor_${currentTheme}`);
  if (savedColor) {
    document.documentElement.style.setProperty('--bg-color', savedColor);
    document.body.style.backgroundColor = savedColor;
  }
}

// ===================== DATETIME DISPLAY =====================
function initDateTimeDisplay() {
  // ... (весь твой код initDateTimeDisplay без изменений)
}

// ===================== INITIALIZATION =======================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🎵 Assignment #5 + Theme Loaded');

  // Сначала применяем тему
  applyTheme();

  // Добавляем кнопку переключения темы
  if (!document.getElementById('theme-toggle-btn')) {
    const btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.textContent = '🌓 Toggle Theme';
    btn.style.cssText = `
      position: fixed;
      bottom: 90px;
      right: 30px;
      background: var(--accent-color);
      color: var(--bg-color);
      border: none;
      padding: 15px 25px;
      border-radius: 50px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      font-size: 14px;
    `;
    btn.addEventListener('click', toggleTheme);
    document.body.appendChild(btn);
  }

  // Инициализация всех твоих функций
  initFormValidation();
  initAccordion();
  initPopupForm();
  initBackgroundChanger();
  initDateTimeDisplay();

  console.log('✓ All features initialized successfully!');
});
