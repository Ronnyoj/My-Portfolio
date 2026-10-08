// Get all slides
const slides = document.querySelectorAll(".slide");

// Get all indicator dots
const dots = document.querySelectorAll(".dot");

// Get previous and next buttons
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

// Keep track of the current slide
let currentSlide = 0;

// Show a particular slide
function showSlide(index) {
  // Remove active class from all slides
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  // Remove active class from all dots
  dots.forEach((dot) => {
    dot.classList.remove("active");
  });

  // Add active class to selected slide
  slides[index].classList.add("active");

  // Add active class to selected dot
  dots[index].classList.add("active");

  // Update current slide
  currentSlide = index;
}

// Next button
nextButton.addEventListener("click", () => {
  currentSlide++;

  // Go back to first slide
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
});

// Previous button
prevButton.addEventListener("click", () => {
  currentSlide--;

  // Go to last slide
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  showSlide(currentSlide);
});

// Click the dots
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showSlide(index);
  });
});

// Automatically change slide every 5 seconds
setInterval(() => {
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  showSlide(currentSlide);
}, 5000);

// Mobile navigation menu
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  // Open and close the menu
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
  });

  // Close the menu when a link is clicked
  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
    });
  });
}

// Contact form

const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent = "Thank you! Your message has been received.";

    contactForm.reset();
  });
}
