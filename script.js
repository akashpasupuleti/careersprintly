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

menuBtn.addEventListener("click", () => {
  mainNav.classList.toggle("mobile-open");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("mobile-open"));
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


// Pricing duration selector: switch each plan between its 30-day and 66-day price.
document.querySelectorAll(".pricing-section .price-card[data-plan]").forEach(card => {
  const buttons = card.querySelectorAll(".duration-btn");
  const options = card.querySelectorAll(".price-option");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const duration = button.dataset.duration;
      buttons.forEach(btn => btn.classList.toggle("active", btn === button));
      options.forEach(option => {
        option.classList.toggle("selected", option.dataset.price === duration);
      });
    });
  });
});
