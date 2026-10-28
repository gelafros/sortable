# Sortable — Superhero Intelligence Database

[![JavaScript](https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CI](https://github.com/gelafros/sortable/actions/workflows/ci.yml/badge.svg)](https://github.com/gelafros/sortable/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> *"You either die a hero, or you live long enough to see yourself in a sortable table."*

A zero-dependency **Vanilla JavaScript (ES Modules)** web application for searching, multi-type sorting, and paginating the [Superhero API](https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json) dataset across 560+ records.

---

## Features

| Feature | Description |
|---|---|
| **Dynamic Data Table** | Renders icon, name, full name, all 6 powerstats, race, gender, height, weight, place of birth, and alignment in a responsive `<table>` |
| **Unit-Aware Numeric Sorting** | Click any header to toggle `ascending` -> `descending` -> reset (`name` ascending). Parses & normalizes heterogeneous strings (`"188 cm"`, `"62.5 meters"`, `"95 kg"`, `"90,000 tons"`) so `78 kg` sorts before `100 kg` and `9 tons` sorts after `500 kg` |
| **Missing-Value Invariant** | Missing, empty (`""`), placeholder (`"-"`), or zeroed (`"0 cm"`, `"0 kg"`) values are always sorted **last** regardless of ascending or descending direction |
| **Real-Time Search** | Instant client-side filtering on every `input` keystroke |
| **Configurable Pagination** | Select `10`, `20` (default), `50`, `100`, or `all` records per page with dynamic page bounds |

---

## Project Structure

```text
sortable/
├── index.html              # Application entry point
├── style.css               # Dark UI theme
├── sortable.js             # DOM creation, state management, pagination & event listeners
├── helpers.js              # Pure unit-tested parsers & comparator functions
├── all.json                # Local fallback snapshot of the Superhero API dataset
├── tests/
│   └── helpers.test.js     # Node.js built-in test suite for parsers & comparators
└── package.json
```

---

## Getting Started

```bash
# Clone the repository
git clone https://github.com/gelafros/sortable.git
cd sortable

# Serve locally
python3 -m http.server 8080
# Open http://localhost:8080 in your browser
```

### Run Unit Tests

```bash
npm test
```

---

## License

Released under the [MIT License](LICENSE).
