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
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });
  // Close menu when clicking a link
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('open');
  }));
}

// Smooth scroll (with small offset for sticky header)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e){
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (!target) return;
    
    e.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 70;
    window.scrollTo({top: y, behavior: 'smooth'});
  });
});

// Back to top
toTop.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));

// Text rotation for hero section
const textElements = document.querySelectorAll('.dynamic-text');
let currentIndex = 0;

function rotateText() {
  // Remove active class from current element
  textElements[currentIndex].classList.remove('active');
  
  // Move to next element
  currentIndex = (currentIndex + 1) % textElements.length;
  
  // Add active class to next element
  textElements[currentIndex].classList.add('active');
}

// Start rotating text every 3 seconds
setInterval(rotateText, 3000);

// Testimonials slider (no dependency)
const slides = Array.from(document.querySelectorAll('.slide'));
let slideIndex = 0;
function showSlide(i){
  slides.forEach(s => s.classList.remove('current'));
  slides[i].classList.add('current');
}
function nextSlide(){ slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); }
function prevSlide(){ slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); }
const nextBtn = document.querySelector('.slider .next');
const prevBtn = document.querySelector('.slider .prev');
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);
  setInterval(nextSlide, 6000);
}

// Forms: simple UX validation (no backend)

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  // WhatsApp number - replace with your actual business number
  const whatsappNumber = "923028478487"; // add country code (important!)

  // Your business email
  const businessEmail = "aec.net.pk@gmail.com";

  function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        formStatus.textContent = "Please fill all required fields correctly.";
        formStatus.className = 'error';
        contactForm.reportValidity();
        return;
      }

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const destination = formData.get('destination');
      const message = formData.get('message') || 'No message provided';

      // Format message
      const formattedMessage = 
        `New Contact Form Submission:%0A%0A` +
        `Name: ${name}%0A` +
        `Email: ${email}%0A` +
        `Phone: ${phone}%0A` +
        `Destination: ${destination}%0A` +
        `Message: ${message}`;

      if (isMobileDevice()) {
        // WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${formattedMessage}`;
        window.open(whatsappURL, '_blank');
      } else {
        // Email URL
        const subject = encodeURIComponent("New Contact Form Submission");
        const body = encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDestination: ${destination}\nMessage: ${message}`
        );
        const mailtoURL = `mailto:${businessEmail}?subject=${subject}&body=${body}`;
        window.location.href = mailtoURL;
      }

      // Show success message
      formStatus.textContent = "Thanks! We'll contact you shortly.";
      formStatus.className = 'success';
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