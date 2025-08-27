// Sticky header shadow
const header = document.querySelector('.site-header');
const toTop = document.getElementById('toTop');
const nav = document.getElementById('siteNav');
const navToggle = document.getElementById('navToggle');

function onScroll() {
  if (window.scrollY > 10) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
  if (window.scrollY > 400) toTop.classList.add('show');
  else toTop.classList.remove('show');
}
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile nav toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  // Close menu when clicking a link
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Smooth scroll (with small offset for sticky header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({top:y, behavior:'smooth'});
  });
});

// Back to top
toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// Testimonials slider (no dependency)
const slides = Array.from(document.querySelectorAll('.slide'));
let idx = 0;
function show(i){
  slides.forEach(s => s.classList.remove('current'));
  slides[i].classList.add('current');
}
function next(){ idx = (idx + 1) % slides.length; show(idx); }
function prev(){ idx = (idx - 1 + slides.length) % slides.length; show(idx); }
const nextBtn = document.querySelector('.slider .next');
const prevBtn = document.querySelector('.slider .prev');
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);
  setInterval(next, 6000);
}

// Forms: simple UX validation (no backend)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()){
      formStatus.textContent = "Please fill all required fields correctly.";
      formStatus.style.color = '#b91c1c';
      contactForm.reportValidity();
      return;
    }
    formStatus.textContent = "Thanks! We’ll contact you shortly.";
    formStatus.style.color = '#16a34a';
    contactForm.reset();
  });
}

// Newsletter
const newsForm = document.getElementById('newsletterForm');
const newsStatus = document.getElementById('newsStatus');
if (newsForm) {
  newsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!newsForm.checkValidity()){
      newsStatus.textContent = "Enter a valid email.";
      newsStatus.style.color = '#b91c1c';
      newsForm.reportValidity();
      return;
    }
    newsStatus.textContent = "Subscribed! 🎉";
    newsStatus.style.color = '#16a34a';
    newsForm.reset();
  });
}

// Current year
document.getElementById('year').textContent = new Date().getFullYear();
