# Pokédex

A JavaScript web application that fetches and displays the original 150 Pokémon from the [PokéAPI](https://pokeapi.co/), with a searchable grid and a detail modal for each Pokémon.

**Live demo:** https://cody-ayers.github.io/Pokemon-pokedex/

![Pokédex screenshot](screenshots/pokedex.png)

---

## Features

- **150 Pokémon grid** — sprites, numbers, and names load automatically from the PokéAPI
- **Live search** — filter Pokémon by name as you type
- **Detail modal** — click any card to open a panel showing the sprite, type badges (color-coded by type), animated base stat bars, and height/weight
- **Keyboard and backdrop close** — press Escape or click outside the modal to close it
- **Pokémon-themed design** — red nav bar, dark card grid, color-coded type system

## Tech Stack

| Area | Tools |
|---|---|
| Language | Vanilla JavaScript (ES6 IIFE module pattern) |
| Styling | Custom CSS, Bootstrap 4 |
| Data | [PokéAPI](https://pokeapi.co/) (REST) |
| Deployment | GitHub Pages |

## Project Structure

```text
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Running Locally

No build step needed — just open `index.html` in a browser:

```bash
git clone https://github.com/Cody-Ayers/Pokemon-pokedex.git
cd Pokemon-pokedex
open index.html
```

The app fetches data from the PokéAPI on load, so an internet connection is required.

## What This Project Demonstrates

- Fetching and rendering data from a public REST API with the Fetch API
- IIFE module pattern for encapsulating JavaScript logic
- Dynamic DOM manipulation — building the entire UI from JavaScript
- Progressive loading — sprites fetch in the background and replace placeholders when ready
- Custom modal implementation with keyboard support and backdrop close
- Responsive CSS Grid layout with live search filtering

## Author

**Cody Ayers** · [Portfolio](https://cody-ayers.github.io/PortfolioWebsite/) · [GitHub](https://github.com/Cody-Ayers)
