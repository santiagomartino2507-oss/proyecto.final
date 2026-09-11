// Empty variable to hold translations once loaded
let translations = {};
let currentLang = "en";

// 1. Fetch the external JSON file when the script loads
fetch('/proyecto.html/assets/json/translation.json')
  .then((response) => {
    // Confirm the file was retrieved successfully
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Parse raw text into a JavaScript Object
  })
  .then((data) => {
    // Save parsed JSON data into our global variable
    translations = data;
    console.log("Translations loaded successfully.");
  })
  .catch((error) => {
    console.error("Failed to load translation file:", error);
  });

// 2. Triggered when the user clicks the toggle button
function toggleLanguage() {
  // Prevent execution if JSON hasn't finished loading over the network
  if (Object.keys(translations).length === 0) {
    alert("Translation data is still loading. Please try again in a moment.");
    return;
  }

  // Toggle current language state between English and Spanish
  currentLang = currentLang === "en" ? "es" : "en";

  // Update flag image based on active language
  const flag = document.getElementById("lang-flag");
  flag.src =
    currentLang === "en"
      ? "https://flagcdn.com/24x18/mx.png" /* in English → show MX to switch to Spanish */
      : "https://flagcdn.com/24x18/gb.png"; /* in Spanish → show GB to switch to English */
  flag.alt = currentLang === "en" ? "Switch to Spanish" : "Switch to English";

  // Find all elements with the 'data-i18n-block' attribute
  const blocks = document.querySelectorAll("[data-i18n-block]");

  // Loop through each block and replace its inner HTML with translated content
  blocks.forEach((block) => {
    const key = block.getAttribute("data-i18n-block");

    // Inject the full HTML string from the JSON file
    block.innerHTML = translations[currentLang][key];
  });
}
