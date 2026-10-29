let currentLang = localStorage.getItem("preferredLang") || "en";
if (currentLang !== "en" && currentLang !== "es") currentLang = "en";
let translations = {};

fetch("/proyecto.html/assets/json/translation.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    translations = data;

    applyLanguage();
  })
  .catch((error) => {
    console.error("Failed to load translation file:", error);
  });

function applyLanguage() {
  document.documentElement.lang = currentLang;
  const blocks = document.querySelectorAll("[data-i18n-block]");
  blocks.forEach((block) => {
    const key = block.getAttribute("data-i18n-block");
    if (translations[currentLang] && translations[currentLang][key]) {
      block.innerHTML = translations[currentLang][key];
    }
  });

  const textElements = document.querySelectorAll("[data-i18n]");
  textElements.forEach((el) => {

    const key = el.getAttribute("data-i18n");

    if (translations[currentLang] && translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });

  const flag = document.getElementById("lang-flag");
  const toggle = document.getElementById("lang-toggle");
  const label = currentLang === "en" ? "Switch to Spanish" : "Cambiar a inglés";
  if (flag) {
    flag.src = currentLang === "en"
      ? "https://flagcdn.com/24x18/mx.png"
      : "https://flagcdn.com/24x18/gb.png";
    flag.alt = label;
  }
  if (toggle) toggle.setAttribute("aria-label", label);
}

function toggleLanguage() {
  if (Object.keys(translations).length === 0) {
    alert("Translation data is still loading. Please try again in a moment.");
    return;
  }

  currentLang = currentLang === "en" ? "es" : "en";

  localStorage.setItem("preferredLang", currentLang);

  applyLanguage();
}
