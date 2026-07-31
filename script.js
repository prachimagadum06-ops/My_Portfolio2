const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const chatToggle = document.getElementById('chat-toggle');
const closeChat = document.getElementById('close-chat');
const chatPopup = document.getElementById('chat-popup');
const chatBody = document.getElementById('chat-body');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const backToTop = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const visitorCount = document.getElementById('visitor-count');
const downloadResumeBtn = document.getElementById('download-resume-btn');
const imageModal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementById('close-modal');
const typingTarget = document.getElementById('typing-text');
const revealItems = document.querySelectorAll('.reveal');
const counters = document.querySelectorAll('.counter');
const projectActions = document.querySelectorAll('.project-action');
const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
const certificateImages = document.querySelectorAll('.certificate-card img');
const lastVisit = document.getElementById('last-visit');

const roles = ['DevOps Engineer', 'Cloud Engineer', 'AWS Learner', 'Docker | Jenkins'];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function applyTheme(theme) {
  body.classList.toggle('light', theme === 'light');
  const icon = themeToggle.querySelector('i');
  icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(savedTheme);
}

function initializeVisitorCounter() {
  const count = Number(localStorage.getItem('portfolio-visitor-count') || 0) + 1;
  localStorage.setItem('portfolio-visitor-count', count);
  visitorCount.textContent = count;
  localStorage.setItem('portfolio-last-visit', new Date().toISOString());
  if (lastVisit) {
    lastVisit.textContent = `Last visit: ${new Date().toLocaleString()}`;
  }
}

function updateFavoriteButtons() {
  const favorites = JSON.parse(localStorage.getItem('portfolio-favorites') || '[]');
  bookmarkButtons.forEach((button) => {
    const project = button.getAttribute('data-project');
    const active = favorites.includes(project);
    button.classList.toggle('active', active);
    const icon = button.querySelector('i');
    icon.className = active ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark';
  });
}

function initializeChat() {
  const savedMessages = JSON.parse(localStorage.getItem('portfolio-chat') || '[]');
  if (savedMessages.length) {
    chatBody.innerHTML = savedMessages.map((entry) => `<div class="chat-bubble">${entry}</div>`).join('');
  } else {
    chatBody.innerHTML = '<div class="chat-bubble">Hello! I would love to connect.</div>';
  }
}

function initializeContactMessages() {
  const stored = JSON.parse(localStorage.getItem('portfolio-contact-messages') || '[]');
  if (!stored.length) {
    localStorage.setItem('portfolio-contact-messages', '[]');
  }
}

function typeEffect() {
  if (!typingTarget) return;
  const currentRole = roles[roleIndex];
  typingTarget.textContent = deleting ? currentRole.substring(0, charIndex--) : currentRole.substring(0, charIndex++);

  if (!deleting && charIndex === currentRole.length + 1) {
    deleting = true;
    setTimeout(typeEffect, 1200);
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, deleting ? 70 : 110);
}

function revealOnScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
}

function animateCounters() {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.getAttribute('data-target'));
      let current = 0;
      const step = Math.max(1, Math.floor(target / 25));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target;
          clearInterval(timer);
        } else {
          el.textContent = current;
        }
      }, 40);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.6 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

function createRipple(event) {
  const button = event.currentTarget;
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  ripple.style.width = ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;
  ripple.className = 'ripple';
  button.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
}

function addRippleEffect() {
  document.querySelectorAll('.btn, .theme-toggle, .chat-toggle, .back-to-top, .project-actions a').forEach((el) => {
    el.addEventListener('click', createRipple);
  });
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('light') ? 'dark' : 'light';
  applyTheme(nextTheme);
  localStorage.setItem('portfolio-theme', nextTheme);
});

chatToggle.addEventListener('click', () => {
  chatPopup.classList.toggle('open');
});

closeChat.addEventListener('click', () => {
  chatPopup.classList.remove('open');
});

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;
  const messages = JSON.parse(localStorage.getItem('portfolio-chat') || '[]');
  messages.push(message);
  localStorage.setItem('portfolio-chat', JSON.stringify(messages));
  chatBody.innerHTML += `<div class="chat-bubble">${message}</div>`;
  chatInput.value = '';
});

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const message = {
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    date: new Date().toISOString()
  };
  const messages = JSON.parse(localStorage.getItem('portfolio-contact-messages') || '[]');
  messages.push(message);
  localStorage.setItem('portfolio-contact-messages', JSON.stringify(messages));
  contactForm.reset();
  alert('Thank you! Your message has been recorded locally.');
});

downloadResumeBtn.addEventListener('click', () => {
  const count = Number(localStorage.getItem('portfolio-download-count') || 0) + 1;
  localStorage.setItem('portfolio-download-count', count);
});

projectActions.forEach((action) => {
  action.addEventListener('click', (event) => {
    event.preventDefault();
    const projectId = action.getAttribute('data-project');
    const viewed = JSON.parse(localStorage.getItem('portfolio-recent-projects') || '[]');
    if (!viewed.includes(projectId)) {
      viewed.push(projectId);
      localStorage.setItem('portfolio-recent-projects', JSON.stringify(viewed));
    }
    action.closest('.project-card').classList.add('recent');
  });
});

bookmarkButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const project = button.getAttribute('data-project');
    const favorites = JSON.parse(localStorage.getItem('portfolio-favorites') || '[]');
    const index = favorites.indexOf(project);
    if (index >= 0) {
      favorites.splice(index, 1);
    } else {
      favorites.push(project);
    }
    localStorage.setItem('portfolio-favorites', JSON.stringify(favorites));
    updateFavoriteButtons();
  });
});

certificateImages.forEach((image) => {
  image.addEventListener('click', () => {
    modalImage.src = image.src;
    imageModal.classList.add('open');
  });
});

closeModal.addEventListener('click', () => {
  imageModal.classList.remove('open');
});

imageModal.addEventListener('click', (event) => {
  if (event.target === imageModal) {
    imageModal.classList.remove('open');
  }
});

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 520);
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

initializeTheme();
initializeVisitorCounter();
initializeChat();
initializeContactMessages();
updateFavoriteButtons();
revealOnScroll();
animateCounters();
addRippleEffect();
typeEffect();
