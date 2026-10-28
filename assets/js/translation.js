// localStorage saves the language in this browser; it is separate from the PHP login session.
let currentLang = localStorage.getItem("preferredLang") || "en"; // Read the active language from localStorage; || uses en when there is no truthy saved value.
if (currentLang !== "en" && currentLang !== "es") currentLang = "en"; // Use en as the fallback when the saved value is neither en nor es.
let translations = {}; // Initialize an empty object to hold the translations loaded from JSON.

// fetch requests JSON asynchronously; the root-relative URL also works through index.php.
fetch("/proyecto.html/assets/json/translation.json") // Start an asynchronous request to the local JSON file using a root-relative path and return a promise.
  .then((response) => { // Handle the HTTP response when the fetch promise resolves.
    if (!response.ok) { // Check for an unsuccessful HTTP status before throwing the error.
      throw new Error(`HTTP error! Status: ${response.status}`); // Throw an Error containing response.status in a template literal; the failure reaches the promise chain's catch handler.
    } // Close the conditional branch opened on line 9; this brace ends that scope, not the whole file.
    return response.json(); // Return the promise that parses the response body as JSON into a JavaScript object.
  }) // Close the callback opened on line 8 and its call; the promise chain continues on the next line.
  .then((data) => { // Receive the object produced by parsing the JSON in the previous step.
    translations = data; // Store the parsed JSON object in the shared translations variable.

    // Apply the saved language after the translation object has loaded.
    applyLanguage(); // Call applyLanguage to update the translated DOM content.
  }) // Close the callback opened on line 14 and its call; the promise chain continues on the next line.
  .catch((error) => { // Handle a rejected promise, such as a network or JSON parsing failure.
    console.error("Failed to load translation file:", error); // Log the message and error object in the console to diagnose loading failures.
  }); // Close the callback opened on line 20 and its enclosing call; the semicolon ends the statement.

// Update the DOM and the document language, which is also used by accessibility tools.
function applyLanguage() { // Declare the function that applies the active language to the document and its elements.
  document.documentElement.lang = currentLang; // Update the html element's lang attribute to match the content language.
  // These blocks contain HTML from the project-controlled local JSON file.
  const blocks = document.querySelectorAll("[data-i18n-block]"); // Select the list of translatable HTML blocks; the attribute selector returns a NodeList.
  blocks.forEach((block) => { // Iterate through the NodeList and run this arrow function for each element.
    const key = block.getAttribute("data-i18n-block"); // Read the element's translation attribute to obtain its JSON dictionary key.
    if (translations[currentLang] && translations[currentLang][key]) { // Check that both the active language and requested key exist before reading the translation.
      block.innerHTML = translations[currentLang][key]; // Replace the block contents by parsing HTML from the local translation dictionary.
    } // Close the conditional branch opened on line 31; this brace ends that scope, not the whole file.
  }); // Close the callback opened on line 29 and its enclosing call; the semicolon ends the statement.

  // Use textContent for plain text instead of replacing the HTML structure.
  const textElements = document.querySelectorAll("[data-i18n]"); // Select the list of translatable text elements; the attribute selector returns a NodeList.
  textElements.forEach((el) => { // Iterate through the NodeList and run this arrow function for each element.

    const key = el.getAttribute("data-i18n"); // Read the element's translation attribute to obtain its JSON dictionary key.

    if (translations[currentLang] && translations[currentLang][key]) { // Check that both the active language and requested key exist before reading the translation.
      el.textContent = translations[currentLang][key]; // Replace only the element's text with the selected translation.
    } // Close the conditional branch opened on line 42; this brace ends that scope, not the whole file.
  }); // Close the callback opened on line 38 and its enclosing call; the semicolon ends the statement.

  // The flag indicates the next language; update its description and the button's accessible name.
  const flag = document.getElementById("lang-flag"); // Find id=lang-flag and store its DOM element as flag.
  const toggle = document.getElementById("lang-toggle"); // Find id=lang-toggle and store its DOM element as toggle.
  const label = currentLang === "en" ? "Switch to Spanish" : "Cambiar a inglés"; // Use a ternary expression to describe the language selected by the next click.
  if (flag) { // Only update the flag if its element exists.
    flag.src = currentLang === "en" // Start a ternary: when the current language is English, the flag offers Spanish.
      ? "https://flagcdn.com/24x18/mx.png" // True branch of the ternary: the Mexican flag represents switching to Spanish.
      : "https://flagcdn.com/24x18/gb.png"; // False branch of the ternary: the British flag represents switching to English.
    flag.alt = label; // Update the flag's alternative description with the available action.
  } // Close the conditional branch opened on line 51; this brace ends that scope, not the whole file.
  if (toggle) toggle.setAttribute("aria-label", label); // If the button exists, set aria-label to describe its next action.
} // Close the applyLanguage function opened on line 25; this brace ends that scope, not the whole file.

// onclick calls this function. Wait for the JSON before allowing a language change.
function toggleLanguage() { // Declare the function called by onclick to switch between English and Spanish.
  if (Object.keys(translations).length === 0) { // Detect an empty dictionary and prevent switching before translations load.
    alert("Translation data is still loading. Please try again in a moment."); // Display a browser alert; it does not send data to the server.
    return; // Return from the current function now, skipping its remaining instructions.
  } // Close the conditional branch opened on line 62; this brace ends that scope, not the whole file.

  // The ternary operator switches between the two options.
  currentLang = currentLang === "en" ? "es" : "en"; // Toggle the state from English to Spanish or from Spanish to English.

  // Save the preference for the next page or visit.
  localStorage.setItem("preferredLang", currentLang); // Persist the language in this browser under the preferredLang key.

  // Apply the selected language to the current page again.
  applyLanguage(); // Call applyLanguage to update the translated DOM content.
} // Close the toggleLanguage function opened on line 61; this brace ends that scope, not the whole file.
