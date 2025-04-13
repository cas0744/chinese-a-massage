document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
  }

  // Close mobile menu when clicking a nav link
  const mobileNavLinks = document.querySelectorAll('.nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Testimonial Slider
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  let currentSlide = 0;
  
  function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
  }
  
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => showSlide(index));
    });
  }
  
  // Auto-rotate testimonials every 5 seconds
  let testimonialsInterval = setInterval(() => {
    if (slides.length > 1) {
      showSlide(currentSlide + 1);
    }
  }, 5000);
  
  // Pause auto-rotation when hovering over testimonials
  const testimonialSlider = document.getElementById('testimonial-slider');
  if (testimonialSlider) {
    testimonialSlider.addEventListener('mouseenter', () => {
      clearInterval(testimonialsInterval);
    });
    
    testimonialSlider.addEventListener('mouseleave', () => {
      testimonialsInterval = setInterval(() => {
        if (slides.length > 1) {
          showSlide(currentSlide + 1);
        }
      }, 5000);
    });
  }
  
  // Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Smooth Scrolling for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Animation on Scroll
  function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .gallery-image, .about-content, .testimonial-content');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Set initial styles for animation elements
  const animatedElements = document.querySelectorAll('.service-card, .gallery-image, .about-content, .testimonial-content');
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  // Run animation check on load and scroll
  window.addEventListener('load', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
});