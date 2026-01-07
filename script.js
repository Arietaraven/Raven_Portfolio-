// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Navbar elements
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelector('.nav-links');
const hamburger = document.querySelector('.hamburger');
const navOverlay = document.querySelector('.nav-overlay');
const navItems = document.querySelectorAll('.nav-link');

// Navbar scroll effect with hide on scroll down, show on scroll up
let lastScroll = 0;

// Combined scroll event listener for both navbar and back-to-top button
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Navbar scroll effects
  if (navbar) {
    // Add/remove scrolled class for styling
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide navbar on scroll down, show on scroll up
    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.classList.add('hidden');
    } else {
      navbar.classList.remove('hidden');
    }
  }

  lastScroll = currentScroll;

  // Show/hide back to top button
  if (backToTopButton) {
    if (currentScroll > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
});

// Smooth scroll to top
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mobile menu toggle
function toggleMenu() {
  if (hamburger && navLinks && navOverlay) {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }
}

// Toggle menu on hamburger click
if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

// Close menu when clicking on overlay
if (navOverlay) {
  navOverlay.addEventListener('click', toggleMenu);
}

// Close menu when clicking on a nav link
navItems.forEach(link => {
  link.addEventListener('click', () => {
    if (hamburger && hamburger.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80, // Account for fixed navbar
        behavior: 'smooth'
      });
    }
  });
});

// Add active class to current section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
  if (sections.length === 0) return;

  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 100;
    const sectionId = current.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      // Remove active class from all nav items
      navItems.forEach(item => item.classList.remove('active'));

      // Add active class to current section's nav item
      const currentLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
      if (currentLink) {
        currentLink.classList.add('active');
      }
    }
  });
}

window.addEventListener('scroll', highlightNav);

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Lightbox functionality
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImage');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeLightbox = document.querySelector('.close-lightbox');

  // Open lightbox when clicking on gallery images
  if (document.querySelector('.gallery-slide')) {
    document.querySelectorAll('.gallery-slide').forEach(slide => {
      slide.addEventListener('click', function () {
        const imgSrc = this.getAttribute('data-fullsize');
        const imgAlt = this.querySelector('img').alt;

        if (lightbox && lightboxImg && lightboxCaption) {
          lightboxImg.src = imgSrc;
          lightboxImg.alt = imgAlt;
          lightboxCaption.textContent = imgAlt;
          lightbox.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
      });
    });
  }

  // Close lightbox function
  function closeLightboxFunc() {
    if (lightbox) {
      lightbox.classList.remove('show');
      document.body.style.overflow = '';
    }
  }

  // Close when clicking the close button
  if (closeLightbox) {
    closeLightbox.addEventListener('click', closeLightboxFunc);
  }

  // Close when clicking outside the image
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightboxFunc();
      }
    });
  }

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('show')) {
      closeLightboxFunc();
    }
  });

  // Preloader
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 500);
      }, 1000);
    });
  }

  // Typing effect for subtitle
  const typingTextElements = document.querySelectorAll('.typing-text');

  if (typingTextElements.length > 0) {
    typingTextElements.forEach(element => {
      const texts = JSON.parse(element.getAttribute('data-texts'));
      let textIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let currentText = '';

      function type() {
        const currentTextArray = texts[textIndex];

        if (isDeleting) {
          currentText = currentTextArray.substring(0, charIndex - 1);
          charIndex--;
        } else {
          currentText = currentTextArray.substring(0, charIndex + 1);
          charIndex++;
        }

        element.textContent = currentText;

        let typeSpeed = 100;

        if (isDeleting) {
          typeSpeed /= 2;
        }

        if (!isDeleting && charIndex === currentTextArray.length) {
          typeSpeed = 2000; // Pause at end of word
          isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length;
        }

        setTimeout(type, typeSpeed);
      }

      // Start the typing effect
      setTimeout(type, 1000);
    });
  }
});
