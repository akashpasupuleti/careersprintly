// CareerSprintly front-end demo — pricing hover interactions handled in CSS
// The ATS result below is simulated. Connect the upload flow to a secure
// backend + PDF/DOCX text extraction + AI service for a production checker.

const resumeInput = document.getElementById("resumeInput");
const chooseResume = document.getElementById("chooseResume");
const analyzeResume = document.getElementById("analyzeResume");
const fileName = document.getElementById("fileName");
const auditResult = document.getElementById("auditResult");
const scoreValue = document.getElementById("scoreValue");

chooseResume.addEventListener("click", () => resumeInput.click());

resumeInput.addEventListener("change", () => {
  const file = resumeInput.files[0];

  if (!file) {
    fileName.textContent = "";
    analyzeResume.disabled = true;
    return;
  }

  const maxSize = 10 * 1024 * 1024;
  const extension = file.name.split(".").pop().toLowerCase();

  if (!["pdf", "docx"].includes(extension)) {
    fileName.textContent = "Please upload a PDF or DOCX file.";
    analyzeResume.disabled = true;
    return;
  }

  if (file.size > maxSize) {
    fileName.textContent = "File is larger than 10 MB.";
    analyzeResume.disabled = true;
    return;
  }

  fileName.textContent = `✓ ${file.name}`;
  analyzeResume.disabled = false;
});

analyzeResume.addEventListener("click", () => {
  analyzeResume.textContent = "Analyzing...";
  analyzeResume.disabled = true;

  setTimeout(() => {
    // Demo score. Replace with real backend result.
    const demoScore = Math.floor(78 + Math.random() * 18);
    scoreValue.textContent = demoScore;

    auditResult.style.display = "block";
    auditResult.scrollIntoView({ behavior: "smooth", block: "center" });

    analyzeResume.textContent = "Analysis Complete";
  }, 1500);
});

// Mobile navigation
const menuBtn = document.getElementById("menuBtn");
const mainNav = document.getElementById("mainNav");

function closeMobileMenu() {
  mainNav.classList.remove("mobile-open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.setAttribute("aria-label", "Open navigation menu");
}

function toggleMobileMenu() {
  const isOpen = mainNav.classList.toggle("mobile-open");
  menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  menuBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
}

menuBtn.addEventListener("click", toggleMobileMenu);

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});

document.addEventListener("click", event => {
  if (!mainNav.classList.contains("mobile-open")) return;
  if (!mainNav.contains(event.target) && !menuBtn.contains(event.target)) {
    closeMobileMenu();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMobileMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) closeMobileMenu();
});

// FAQ accordion
document.querySelectorAll(".faq-question").forEach(question => {
  question.addEventListener("click", () => {
    const wasOpen = question.classList.contains("open");

    document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("open"));

    if (!wasOpen) {
      question.classList.add("open");
    }

    const symbol = question.querySelector("span");
    symbol.textContent = question.classList.contains("open") ? "−" : "+";
  });
});

// Demo contact form
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formMessage.textContent =
    "Thank you. Your audit request has been received. Our team will contact you shortly.";

  contactForm.reset();
});

// Update footer year automatically
document.querySelector(".footer-bottom span").textContent =
  `© ${new Date().getFullYear()} CareerSprintly. All rights reserved.`;


// Pricing duration selector:
// switch each plan between its 30-day and 66-day price.

document
  .querySelectorAll(".pricing-section .price-card[data-plan]")
  .forEach(card => {

    const switcher = card.querySelector(".duration-switch");
    const buttons = Array.from(card.querySelectorAll(".duration-btn"));
    const options = Array.from(card.querySelectorAll(".price-option"));

    if (!switcher || buttons.length !== 2) return;

    let slider = switcher.querySelector(".duration-slider");

    if (!slider) {
      slider = document.createElement("span");
      slider.className = "duration-slider";
      slider.setAttribute("aria-hidden", "true");
      switcher.prepend(slider);
    }

    function updatePricing(duration) {
      buttons.forEach(button => {
        const active = button.dataset.duration === duration;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", active ? "true" : "false");
      });

      options.forEach(option => {
        option.classList.toggle(
          "selected",
          option.dataset.price === duration
        );
      });

      const activeIndex = Math.max(
        0,
        buttons.findIndex(
          button => button.dataset.duration === duration
        )
      );

      slider.style.transform =
        `translateX(${activeIndex * 100}%)`;
    }

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        updatePricing(button.dataset.duration);
      });
    });

    const initialButton =
      buttons.find(button => button.classList.contains("active"))
      || buttons[0];

    updatePricing(initialButton.dataset.duration);
  });


/* ============================================================
   PRICING DURATION SWITCH
   Buttons are visually idle. Clicking 30/66 DAYS changes
   only the displayed pricing option.
   ============================================================ */

document
  .querySelectorAll(".pricing-section .price-card[data-plan]")
  .forEach(function (card) {

    const buttons = card.querySelectorAll(".duration-btn");
    const options = card.querySelectorAll(".price-option");

    buttons.forEach(function (button) {

      button.addEventListener("click", function () {

        const duration = button.getAttribute("data-duration");

        // Change selected state
        buttons.forEach(function (btn) {
          btn.classList.toggle("active", btn === button);
        });

        // Show the matching price
        options.forEach(function (option) {
          option.classList.toggle(
            "selected",
            option.getAttribute("data-price") === duration
          );
        });

      });

    });

  });



/* Final 30/66 selected-button behavior */
document.querySelectorAll(".pricing-section .price-card[data-plan]").forEach(function(card) {
  const buttons = card.querySelectorAll(".duration-btn");
  const options = card.querySelectorAll(".price-option");

  function selectDuration(duration) {
    buttons.forEach(function(btn) {
      btn.classList.toggle(
        "active",
        btn.getAttribute("data-duration") === duration
      );
    });

    options.forEach(function(option) {
      option.classList.toggle(
        "selected",
        option.getAttribute("data-price") === duration
      );
    });
  }

  buttons.forEach(function(button) {
    button.addEventListener("click", function() {
      selectDuration(button.getAttribute("data-duration"));
    });
  });

  // Preserve whichever option is marked active in the HTML.
  const initial = card.querySelector(".duration-btn.active");
  if (initial) {
    selectDuration(initial.getAttribute("data-duration"));
  }
});
