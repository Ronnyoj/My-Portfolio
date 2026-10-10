// Portfolio JavaScript. Each feature runs only when its HTML elements exist.

// Carousel: this block runs on the home page, where the carousel is present.
const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".dot"));
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentSlide = Math.max(
  0,
  slides.findIndex((slide) => slide.classList.contains("active")),
);
let carouselTimer;

function showSlide(index) {
  if (slides.length === 0) return;

  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
    dot.setAttribute("aria-pressed", String(i === currentSlide));
  });
}

if (slides.length > 0) {
  // Ensure the active slide index is valid and show the initial slide.
  showSlide(currentSlide);

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showSlide(currentSlide + 1);
      restartCarouselTimer();
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showSlide(currentSlide - 1);
      restartCarouselTimer();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      showSlide(index);
      restartCarouselTimer();
    });
  });

  function restartCarouselTimer() {
    if (carouselTimer) clearInterval(carouselTimer);
    carouselTimer = setInterval(() => showSlide(currentSlide + 1), 5000);
  }

  // Start automatic sliding only when there is more than one slide.
  if (slides.length > 1) restartCarouselTimer();
}

// Mobile navigation menu.
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// Contact form: send messages using EmailJS.
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    if (typeof emailjs === "undefined") {
      formMessage.textContent =
        "Email service is unavailable. Please refresh the page and try again.";
      return;
    }

    formMessage.textContent = "Sending your message...";

    const submitButton = contactForm.querySelector('[type="submit"]');

    if (submitButton) submitButton.disabled = true;

    try {
      await emailjs.sendForm(
        "service_80vmneh",
        "template_u3ck5cf",
        contactForm,
        { publicKey: "WKcRMQNhlGPwetCgq" },
      );

      formMessage.textContent =
        "Thank you! Your message has been sent successfully.";

      contactForm.reset();
    } catch (error) {
      console.error("EmailJS error:", error);

      formMessage.textContent =
        "Sorry, your message could not be sent. Please try again later.";
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
