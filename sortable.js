import { compareValues, getSortValue } from "./helpers.js";

const API_URL = "https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json";
const LOCAL_FALLBACK_URL = "./all.json";

let allHeroes = [];
let filteredHeroes = [];
let currentPage = 1;
let pageSize = 20;
let sortColumn = "name";
let sortDirection = "asc";

/**
 * Creates and appends control elements (search input, page-size select dropdown,
 * pagination buttons, page info status) to the document body.
 *
 * @returns {void}
 */
function createControls() {
  const searchField = document.createElement("input");
  searchField.id = "search-input";
  searchField.type = "search";
  searchField.placeholder = "Search by name...";
  searchField.setAttribute("aria-label", "Search heroes by name");
  document.body.appendChild(searchField);

  searchField.addEventListener("input", (event) => {
    const query = event.target.value.toLowerCase().trim();

    // Filter the heroes by name
    filteredHeroes = allHeroes.filter((hero) =>
      (hero.name || "").toLowerCase().includes(query),
    );

    currentPage = 1;
    updateDisplay();
  });

  const select = document.createElement("select");
  select.id = "page-size";
  select.setAttribute("aria-label", "Results per page");
  const sizes = [10, 20, 50, 100, "all"];
  for (const size of sizes) {
    const option = document.createElement("option");
    option.value = String(size);
    option.textContent = String(size);
    if (size === 20) {
      option.selected = true;
    } // default size is 20
    select.appendChild(option);
  }
  document.body.appendChild(select);

  select.addEventListener("change", (event) => {
    pageSize = event.target.value;
    currentPage = 1; // Reset to first page
    updateDisplay();
  });

  const prevButton = document.createElement("button");
  prevButton.id = "prev-btn";
  prevButton.type = "button";
  prevButton.textContent = "Previous";
  document.body.appendChild(prevButton);

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      updateDisplay();
    }
  });

  const nextButton = document.createElement("button");
  nextButton.id = "next-btn";
  nextButton.type = "button";
  nextButton.textContent = "Next";
  document.body.appendChild(nextButton);

  nextButton.addEventListener("click", () => {
    const limit = pageSize === "all" ? filteredHeroes.length : Number.parseInt(pageSize, 10);
    const totalPages = (limit > 0 ? Math.ceil(filteredHeroes.length / limit) : 1) || 1;
    if (currentPage < totalPages) {
      currentPage++;
      updateDisplay();
    }
  });

  const pageInfo = document.createElement("span");
  pageInfo.id = "page-info";
  pageInfo.setAttribute("role", "status");
  pageInfo.setAttribute("aria-live", "polite");
  pageInfo.textContent = "Page 1 of 1";
  document.body.appendChild(pageInfo);

  const tableContainer = document.createElement("div");
  tableContainer.id = "table-container";
  document.body.appendChild(tableContainer);
}

/**
 * Dynamically builds and inserts the table structure for the list of heroes,
 * binding click sorting events to the header cells.
 *
 * @param {object[]} heroes The list of hero objects to display in the table.
 * @returns {void}
 */
function renderTable(heroes) {
  const table = document.createElement("table");

  const headers = [
    "Icon",
    "Name",
    "Full Name",
    "Intelligence",
    "Race",
    "Gender",
    "Height",
    "Weight",
    "Place of Birth",
    "Alignment",
    "Strength",
    "Speed",
    "Durability",
    "Power",
    "Combat",
  ];

  const tableHead = document.createElement("thead");
  const headerRow = document.createElement("tr");

  const columnMapping = {
    Icon: "id",
    Name: "name",
    "Full Name": "biography.fullName",
    Intelligence: "powerstats.intelligence",
    Race: "appearance.race",
    Gender: "appearance.gender",
    Height: "appearance.height",
    Weight: "appearance.weight",
    "Place of Birth": "biography.placeOfBirth",
    Alignment: "biography.alignment",
    Strength: "powerstats.strength",
    Speed: "powerstats.speed",
    Durability: "powerstats.durability",
    Power: "powerstats.power",
    Combat: "powerstats.combat",
  };

  for (const header of headers) {
    const th = document.createElement("th");
    th.scope = "col";
    th.textContent = header;
    th.style.cursor = "pointer";

    const fieldPath = columnMapping[header];

    th.addEventListener("click", () => {
      if (sortColumn === fieldPath) {
        if (sortDirection === "asc") {
          sortDirection = "desc"; // 2nd click
        } else if (sortDirection === "desc") {
          // 3rd click
          sortColumn = "name";
          sortDirection = "asc";
        }
      } else {
        sortColumn = fieldPath;
        sortDirection = "asc";
      }
      updateDisplay();
    });

    if (fieldPath === sortColumn) {
      th.textContent += sortDirection === "asc" ? " ascending" : " descending";
      th.setAttribute("aria-sort", sortDirection === "asc" ? "ascending" : "descending");
    } else {
      th.setAttribute("aria-sort", "none");
    }

    headerRow.appendChild(th);
  }

  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);

  const tableBody = document.createElement("tbody");

  for (const hero of heroes) {
    const row = document.createElement("tr");

    const iconCell = document.createElement("td");
    const img = document.createElement("img");
    img.src = hero.images?.xs || "";
    img.alt = hero.name ? `${hero.name} icon` : "Hero icon";
    img.loading = "lazy";
    iconCell.appendChild(img);
    row.appendChild(iconCell);

    const nameCell = document.createElement("td");
    nameCell.textContent = hero.name;
    row.appendChild(nameCell);

    const fullNameCell = document.createElement("td");
    fullNameCell.textContent = hero.biography?.fullName;
    row.appendChild(fullNameCell);

    const intelligenceCell = document.createElement("td");
    intelligenceCell.textContent = hero.powerstats?.intelligence;
    row.appendChild(intelligenceCell);

    const raceCell = document.createElement("td");
    raceCell.textContent = hero.appearance?.race;
    row.appendChild(raceCell);

    const genderCell = document.createElement("td");
    genderCell.textContent = hero.appearance?.gender;
    row.appendChild(genderCell);

    const heightCell = document.createElement("td");
    heightCell.textContent = hero.appearance?.height;
    row.appendChild(heightCell);

    const weightCell = document.createElement("td");
    weightCell.textContent = hero.appearance?.weight;
    row.appendChild(weightCell);

    const placeCell = document.createElement("td");
    placeCell.textContent = hero.biography?.placeOfBirth;
    row.appendChild(placeCell);

    const alignCell = document.createElement("td");
    alignCell.textContent = hero.biography?.alignment;
    row.appendChild(alignCell);

    const strengthCell = document.createElement("td");
    strengthCell.textContent = hero.powerstats?.strength;
    row.appendChild(strengthCell);

    const speedCell = document.createElement("td");
    speedCell.textContent = hero.powerstats?.speed;
    row.appendChild(speedCell);

    const durabilityCell = document.createElement("td");
    durabilityCell.textContent = hero.powerstats?.durability;
    row.appendChild(durabilityCell);

    const powerCell = document.createElement("td");
    powerCell.textContent = hero.powerstats?.power;
    row.appendChild(powerCell);

    const combatCell = document.createElement("td");
    combatCell.textContent = hero.powerstats?.combat;
    row.appendChild(combatCell);

    tableBody.appendChild(row);
  }

  table.appendChild(tableBody);

  const container = document.getElementById("table-container");
  container.textContent = "";
  container.appendChild(table);
}

/**
 * Sorts, slices, and renders the filtered heroes list according to the active page and page size.
 *
 * @returns {void}
 */
function updateDisplay() {
  const isNumeric =
    sortColumn.startsWith("powerstats") ||
    sortColumn === "appearance.height" ||
    sortColumn === "appearance.weight" ||
    sortColumn === "id";

  filteredHeroes.sort((a, b) => {
    const valA = getSortValue(a, sortColumn);
    const valB = getSortValue(b, sortColumn);
    return compareValues(valA, valB, sortDirection === "asc", isNumeric);
  });

  const limit = pageSize === "all" ? filteredHeroes.length : Number.parseInt(pageSize, 10);
  const totalPages = (limit > 0 ? Math.ceil(filteredHeroes.length / limit) : 1) || 1;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }
  if (currentPage < 1) {
    currentPage = 1;
  }

  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  const pageHeroes = filteredHeroes.slice(startIndex, endIndex);

  renderTable(pageHeroes);

  document.getElementById("page-info").textContent =
    `Page ${currentPage} of ${totalPages}`;
  document.getElementById("prev-btn").disabled = currentPage === 1;
  document.getElementById("next-btn").disabled = currentPage === totalPages;
}

/**
 * Initializes the heroes lists with fetched data, creates the page controls, and displays the first page.
 *
 * @param {object[]} heroes The fetched list of hero objects.
 * @returns {void}
 */
function loadData(heroes) {
  allHeroes = Array.isArray(heroes) ? heroes : [];
  filteredHeroes = [...allHeroes];
  createControls();
  updateDisplay();
}

/**
 * Fetches the superhero dataset from the remote API, falling back to the local
 * `all.json` snapshot if the remote endpoint fails or is unreachable.
 *
 * @returns {Promise<void>}
 */
async function init() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    const heroes = await response.json();
    loadData(heroes);
  } catch {
    try {
      const fallbackResponse = await fetch(LOCAL_FALLBACK_URL);
      if (!fallbackResponse.ok) {
        throw new Error(`Fallback HTTP error ${fallbackResponse.status}`);
      }
      const heroes = await fallbackResponse.json();
      loadData(heroes);
    } catch {
      const errorMsg = document.createElement("p");
      errorMsg.id = "error-message";
      errorMsg.setAttribute("role", "alert");
      errorMsg.textContent = "Failed to load superhero data. Please try refreshing the page.";
      document.body.appendChild(errorMsg);
    }
  }
}

void init();

