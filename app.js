// Select UI variables
const themeToggle = document.querySelector("#theme-toggle");
const searchInput = document.querySelector("#search-input");
const regionFilter = document.querySelector("#region-filter");
const countriesContainer = document.querySelector("#countries-container");

// Function to toggle the dark mode class on the body
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
};

// Fetch countries from the API and display them
async function fetchCountries() {
  try {
    const response = await fetch("https://restcountries.com/v2/all");
    const countries = await response.json();

    countriesContainer.innerHTML = "";
    countries.forEach((country) => {
      // Create country cards
      const countryCard = document.createElement("div");
      countryCard.classList.add("country-card", "card", "col-md-3", "mb-4", "p-3");

      countryCard.innerHTML = `
                <h2 class="card-title">${country.name}</h2>
                <img class="flag card-img-top" src="${country.flags.svg}" alt="${country.name} Flag">
                <p class="card-text">Capital: ${country.capital}</p>
                <p class="card-text">Region: ${country.region}</p>
                <p class="card-text">Population: ${country.population}</p>
            `;

      countriesContainer.appendChild(countryCard);
    });
    // Display error if not able to fetch them
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Function to filter countries based on the search input and region filter
function filterCountries() {
  const searchValue = searchInput.value.toLowerCase();
  const regionValue = regionFilter.value.toLowerCase();
  const countryCards = countriesContainer.querySelectorAll(".country-card");

  countryCards.forEach((countryCard) => {
    const countryName = countryCard.querySelector(".card-title").textContent.toLowerCase();
    const countryRegion = countryCard.querySelector(".card-text:nth-of-type(2)").textContent.toLowerCase();

    if (countryName.includes(searchValue) && (regionValue === "" || countryRegion.includes(regionValue))) {
      countryCard.style.display = "block";
    } else {
      countryCard.style.display = "none";
    }
  });
}

// Event listeners for the theme toggle, search input, and region filter
themeToggle.addEventListener("change", () => {
  toggleDarkMode();
});

searchInput.addEventListener("input", () => {
  filterCountries();
});

regionFilter.addEventListener("change", () => {
  filterCountries();
});

// Initial fetch of countries
fetchCountries();
