// Скрипты для портфолио‑сайта

// Переключение темы (тёмная/светлая)
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    // Сохраняем выбранную тему в localStorage
    try {
        localStorage.setItem('portfolioTheme', next);
    } catch (err) {
        // storage может быть недоступен (например, в режиме приватного браузера)
    }
});

// Загружаем тему из localStorage при инициализации
(() => {
    try {
        const saved = localStorage.getItem('portfolioTheme');
        if (saved) {
            document.documentElement.setAttribute('data-theme', saved);
        }
    } catch (err) {
        // игнорировать
    }
})();

// Навигация для мобильных устройств
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
});

navLinks.addEventListener('click', (e) => {
    if (e.target.tagName.toLowerCase() === 'a') {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
    }
});

// Анимация появления секций при прокрутке
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            // Если секция навыков появилась — запускаем анимацию прогресса
            if (entry.target.id === 'skills') {
                animateSkills();
            }
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});
sections.forEach((section) => observer.observe(section));

// Анимация полос навыков
function animateSkills() {
    const bars = document.querySelectorAll('.skill-progress');
    bars.forEach((bar) => {
        const value = bar.getAttribute('data-progress');
        bar.style.width = value + '%';
    });
}

// Обновляем год в футере
document.getElementById('year').textContent = new Date().getFullYear();

// Валидация формы контактов
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;
        // скрываем все сообщения об ошибках
        form.querySelectorAll('.error-message').forEach((el) => {
            el.style.display = 'none';
        });
        // получаем значения полей
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        // проверяем имя
        if (!name) {
            showError('name');
            valid = false;
        }
        // проверяем email
        if (!validateEmail(email)) {
            showError('email');
            valid = false;
        }
        // проверяем сообщение
        if (!message) {
            showError('message');
            valid = false;
        }
        if (valid) {
            formStatus.textContent = 'Отправка…';
            formStatus.style.color = 'var(--primary)';
            // эмулируем сетевой запрос
            setTimeout(() => {
                formStatus.textContent = 'Спасибо! Ваше сообщение отправлено.';
                formStatus.style.color = 'var(--primary)';
                form.reset();
            }, 1500);
        }
    });
}

function showError(fieldId) {
    const field = document.getElementById(fieldId);
    const error = field.nextElementSibling;
    if (error) {
        error.style.display = 'block';
    }
}

function validateEmail(value) {
    // простая проверка email
    return /^\S+@\S+\.\S+$/.test(value);
}