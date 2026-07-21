# 🦹‍♂️ Sortable — Superhero Intelligence Database

> *"You either die a hero, or you live long enough to see yourself in a sortable table."*

A villain's ultimate weapon: a sleek, lightning-fast web app for organizing **confidential dossiers** on every known superhero. Search them, sort them, study their weaknesses — all from a single page.

---

## ✨ Features

| Feature | Description |
|---|---|
| 📊 **Data Table** | Displays icon, name, full name, all powerstats, race, gender, height, weight, place of birth, and alignment in a clean `<table>` |
| 📄 **Pagination** | Browse results across pages — choose page size (10 · 20 · 50 · 100 · All) via a `<select>` dropdown. Default: **20** |
| 🔍 **Live Search** | Filter heroes by name in real time — results update on every keystroke, no button needed |
| ⬆️⬇️ **Column Sorting** | Click any header to sort ascending; click again to toggle descending. Numeric-aware (e.g. *78 kg* before *100 kg*). Missing values always sort last |

---

## 🛠️ Tech Stack

- **HTML / CSS / JavaScript** — zero frameworks, zero libraries, 100% vanilla
- **Data Source** — [Superhero API](https://rawcdn.githack.com/akabab/superhero-api/0.2.0/api/all.json) via `fetch`

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://platform.zone01.gr/git/ebimai/sortable.git
cd sortable

# Option 1 — Open directly in your browser with Live Server
open index.html


# Option 2 — Serve with Python
python3 -m http.server 8080
# Then visit http://localhost:8080
```

No build step. No dependencies. Just open and go.

---

## 📂 Project Structure

```
sortable/
├── index.html      # Entry point
├── style.css       # Villain-themed dark UI
├── sortable.js     # All logic — fetch, search, sort, pagination
├── all.json        # Local copy of superhero data
└── README.md       # You are here
```

---

## 📸 How It Works

1. **On load** — hero data is fetched and rendered in a table, sorted by name (A → Z).
2. **Search** — type in the search field to instantly filter heroes by name.
3. **Sort** — click any column header to sort. Click again to reverse. Numeric columns sort by value, not by string.
4. **Paginate** — use the dropdown to control how many rows per page, then navigate with Previous / Next.

---

## 📋 Displayed Columns

| Column | Data Path |
|---|---|
| Icon | `.images.xs` |
| Name | `.name` |
| Full Name | `.biography.fullName` |
| Intelligence | `.powerstats.intelligence` |
| Strength | `.powerstats.strength` |
| Speed | `.powerstats.speed` |
| Durability | `.powerstats.durability` |
| Power | `.powerstats.power` |
| Combat | `.powerstats.combat` |
| Race | `.appearance.race` |
| Gender | `.appearance.gender` |
| Height | `.appearance.height` |
| Weight | `.appearance.weight` |
| Place of Birth | `.biography.placeOfBirth` |
| Alignment | `.biography.alignment` |

---

## 📄 License

Educational project — [zone01](https://zone01.gr).
