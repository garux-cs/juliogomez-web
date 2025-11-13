document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container') || document.body;

  let btn = document.getElementById('modo');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'modo';
    btn.type = 'button';
    btn.className = 'tema-btn';
    container.appendChild(btn);
  }

  const target = document.documentElement; 

  const STORAGE_KEY = 'garux_tema';
  const applyTheme = (theme) => {
    if (theme === 'oscuro') {
      target.classList.add('oscuro');
      btn.textContent = '🌙 Oscuro';
      btn.setAttribute('aria-pressed', 'true');
      btn.setAttribute('aria-label', 'Cambiar a tema claro');
    } else if (theme === 'claro') {
      target.classList.remove('oscuro');
      btn.textContent = '☀️ Claro';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Cambiar a tema oscuro');
    }
  };

  const systemPrefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'oscuro' || saved === 'claro') {
    applyTheme(saved);
  } else {
    applyTheme(systemPrefersDark() ? 'oscuro' : 'claro');
  }

  btn.addEventListener('click', () => {
    const isDark = target.classList.contains('oscuro');
    const next = isDark ? 'claro' : 'oscuro';
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });

  if (!saved) {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', (e) => {
      applyTheme(e.matches ? 'oscuro' : 'claro');
    });
  }

  btn.style.cursor = 'pointer';
  btn.style.padding = '0.4rem 0.8rem';
  btn.style.borderRadius = '8px';
  btn.style.border = 'none';
  btn.style.fontWeight = '600';
});
