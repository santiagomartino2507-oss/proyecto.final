// 1. Check localStorage for a saved language preference and if none exists yet, default to "en".
let currentLang = localStorage.getItem("preferredLang") || "en";
let translations = {};

// 2. Fetch the external JSON file when the page loads
fetch("../assets/json/translation.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    translations = data;
    console.log("Translations loaded successfully.");

    // 3. Automatically apply the saved language immediately after JSON loads
    applyLanguage();
  })
  .catch((error) => {
    console.error("Failed to load translation file:", error);
  });

// 4. Function to update page elements and button label
function applyLanguage() {
  // Update all section blocks tagged with 'data-i18n-block'
  const blocks = document.querySelectorAll("[data-i18n-block]");
  blocks.forEach((block) => {
    const key = block.getAttribute("data-i18n-block");
    if (translations[currentLang] && translations[currentLang][key]) {
      block.innerHTML = translations[currentLang][key];
    }
  });

  const textElements = document.querySelectorAll("[data-i18n]"); // Find every element that has the "data-i18n" attribute and store them in a list
  textElements.forEach((el) => {
    // Loop through that list one by one; "el" is the current element on each pass

    const key = el.getAttribute("data-i18n"); // Read the value of that element's "data-i18n" attribute (e.g. "la10")

    if (translations[currentLang] && translations[currentLang][key]) {
      // Check that translations for the current language exist AND that this specific key exists
      el.textContent = translations[currentLang][key]; // Replace the element's visible text with the matching translation
    }
  });

  // Update the account/login button text
  const loginBtn = document.getElementById("login-btn");
  if (
    loginBtn && // Only proceed if the button exists (it won't if the user is already logged in)
    translations[currentLang] && // Only proceed if translations for the current language loaded
    translations[currentLang]["account"] // Only proceed if the "account" key exists for this language
  ) {
    loginBtn.textContent = translations[currentLang]["account"]; // Replace the button text with the translated version
  }

  // Update flag image based on active language
  const flag = document.getElementById("lang-flag"); // Find the flag <img> element
  flag.src = // Assigns the image based on the current language
    currentLang === "en" // This is the condition
      ? "https://flagcdn.com/24x18/mx.png" // ? marks the beginning of what happens if the condition is true
      : "https://flagcdn.com/24x18/gb.png"; // : marks the beginning of what happens if the condition is false
}

// 5. Triggered when the user clicks the toggle button
function toggleLanguage() {
  if (Object.keys(translations).length === 0) {
    alert("Translation data is still loading. Please try again in a moment.");
    return;
  }

  // Toggle current language state
  currentLang = currentLang === "en" ? "es" : "en";

  // Save the new language selection to localStorage
  localStorage.setItem("preferredLang", currentLang);

  // Re-render the page content with the new language
  applyLanguage();
}
