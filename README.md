# 🌤️ UMBRA
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/jpmasangkay/umbra)

### Weather Dashboard

**Search. Map. Forecast. Now.**

A modern, responsive weather dashboard built with React and TypeScript — delivering real-time conditions, hourly & daily forecasts, air pollution data, and interactive weather maps all in one sleek interface.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://umbra-sooty.vercel.app)

🔗 **Live Demo:** [umbra-sooty.vercel.app](https://umbra-sooty.vercel.app)

---

## ✨ Features

### 🌡️ Current Weather

- Displays **temperature**, feels-like, **humidity**, **wind speed**, and **local time**
- Live weather icon reflecting current sky conditions
- Pulls live data from **OpenWeatherMap OneCall 3.0**

### 🕐 Forecasts

- **Hourly Forecast** — scrollable 48-hour outlook with weather icons and temperatures
- **7-Day Forecast** — daily high/low temperature view at a glance
- **Additional Info** panel — cloudiness, UV index, wind direction, pressure, sunrise & sunset

### 🗺️ Interactive Weather Map

| Feature | Description |
|---------|-------------|
| **Base Layer** | MapTiler tiles with a clean, modern map style |
| **Weather Overlays** | Toggle between clouds, precipitation, wind, pressure, and temperature layers |
| **Click-to-Select** | Click anywhere on the map to fetch weather for that exact location |
| **Map Legend** | Colour-gradient legend updates to reflect the active overlay layer |

### 🌫️ Air Pollution Panel

- Displays **AQI index** with quality-level indicators (Good → Hazardous)
- Per-pollutant concentration cards: CO, NO, NO₂, O₃, SO₂, PM₂.₅, PM₁₀, NH₃
- Slides in as an overlay on mobile; always visible on desktop

### 🔍 Location Search

- Type any city name to geocode and jump to it instantly
- Powered by the **OpenWeatherMap Geocoding API**

### 🌗 Dark / Light Mode

- Toggle between dark and light themes with one click
- Preference persists via **localStorage**; defaults to system preference on first visit

### ⚡ Performance & UX

- **Skeleton Loaders** — every card shows a shimmer placeholder while data loads
- **React Suspense** boundaries for clean, progressive async state handling
- **Runtime Validation** — all API responses validated with **Zod** schemas
- Fully **responsive** — mobile-first layout that adapts to any screen size

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | Component architecture with Suspense-powered data fetching |
| **TypeScript 5** | Full type safety across the entire codebase |
| **Vite** (SWC) | Lightning-fast dev server and optimized production builds |
| **Tailwind CSS v4** | Utility-first styling with responsive, mobile-first design |
| **shadcn/ui** | Accessible UI primitives (buttons, inputs, selects, and more) |
| **TanStack React Query** | Server state management via `useSuspenseQuery` |
| **Zod** | Runtime API response validation and TypeScript type inference |
| **Leaflet + react-leaflet** | Interactive map rendering and layer control |
| **MapTiler SDK** | Base map tiles and vector layer support |
| **Lucide React** | Crisp, consistent icon set |
| **OpenWeatherMap API** | Weather data, geocoding, and air pollution data |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- An **OpenWeatherMap** API key (OneCall 3.0 access required)
- A **MapTiler** API key

### Installation

```bash
# Clone the repository
git clone https://github.com/jpmasangkay/umbra.git
cd umbra

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_KEY=your_openweathermap_api_key
VITE_MAPTILES_API_KEY=your_maptiler_api_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check with `tsc` and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy to any static hosting provider.

---

## 📁 Project Structure

```
umbra/
├── public/                          # Static assets
├── src/
│   ├── api.ts                       # API fetch functions (weather, geocode, air pollution)
│   ├── App.tsx                      # Root component — layout, state, Suspense boundaries
│   ├── main.tsx                     # Entry point — React DOM + QueryClientProvider
│   ├── types.ts                     # Shared TypeScript types (Coordinates, etc.)
│   ├── index.css                    # Global styles & Tailwind directives
│   ├── lib/
│   │   └── utils.ts                 # cn() helper (clsx + tailwind-merge)
│   ├── schemas/
│   │   ├── weatherSchema.ts         # Zod schema for OneCall 3.0 response
│   │   ├── geoCodeSchema.ts         # Zod schema for Geocoding API response
│   │   └── airPollutionSchema.ts    # Zod schema for Air Pollution response
│   ├── components/
│   │   ├── Map.tsx                  # Leaflet map with MapTiler & weather overlays
│   │   ├── MapLegend.tsx            # Colour-gradient legend for the active map layer
│   │   ├── SidePanel.tsx            # Air pollution panel (AQI + pollutant cards)
│   │   ├── ThemeToggle.tsx          # Dark / light mode toggle button
│   │   ├── WeatherIcon.tsx          # OpenWeatherMap icon renderer
│   │   ├── cards/
│   │   │   ├── Card.tsx             # Reusable gradient card wrapper
│   │   │   ├── CurrentWeather.tsx   # Current conditions card
│   │   │   ├── HourlyForecast.tsx   # 48-hour scrollable forecast card
│   │   │   ├── DailyForecast.tsx    # 7-day daily forecast card
│   │   │   └── AdditionalInfo.tsx   # UV, pressure, wind, sunrise/sunset card
│   │   ├── dropdowns/
│   │   │   ├── LocationSearch.tsx   # City search input with geocoding
│   │   │   └── MapTypeDropdown.tsx  # Weather overlay layer selector
│   │   ├── skeletons/               # Shimmer skeleton loaders for every card
│   │   │   ├── CurrentSkeleton.tsx
│   │   │   ├── HourlySkeleton.tsx
│   │   │   ├── DailySkeleton.tsx
│   │   │   ├── AdditionalInfoSkeleton.tsx
│   │   │   └── SidePanelSkeleton.tsx
│   │   └── ui/                      # shadcn/ui primitives (button, input, select, …)
│   └── assets/
├── components.json                  # shadcn/ui configuration
├── vite.config.ts                   # Vite configuration
├── tsconfig.json                    # TypeScript project references
├── tsconfig.app.json                # TypeScript config for app source
├── tsconfig.node.json               # TypeScript config for Node tooling
├── eslint.config.js                 # ESLint flat config
└── package.json
```

---

## 🧠 How It Works

Umbra is built around a **Suspense-first data architecture** powered by TanStack React Query:

1. **Location Resolution** — On load, the app requests the user's geolocation. If denied, it falls back to a default city. The search box lets users geocode any city by name via the OpenWeatherMap Geocoding API.

2. **Data Fetching** — Three parallel `useSuspenseQuery` calls fetch current weather (OneCall 3.0), geocoding metadata, and air pollution data. Each call is guarded by a **Zod schema** that validates the API response shape at runtime and infers TypeScript types automatically.

3. **Suspense Boundaries** — Each dashboard card is wrapped in its own `<Suspense>` boundary with a matching skeleton loader, so the UI loads progressively — cards appear as their data resolves rather than waiting for everything at once.

4. **Interactive Map** — Leaflet renders the base map using MapTiler tiles. A dropdown switches between five **OpenWeatherMap tile overlays** (clouds, precipitation, wind, pressure, temperature). Clicking anywhere on the map fires a coordinate lookup and refreshes all dashboard data for that location.

5. **Theme System** — A CSS variable–based theme toggles between dark and light mode. The preference is stored in `localStorage` and applied before the first render to prevent a flash of unstyled content.

---

## 🌐 Deployment

Umbra is deployed on **Vercel**. Pushing to `main` triggers an automatic build and deployment.

To deploy your own instance:
1. Import the repo into [Vercel](https://vercel.com)
2. Add `VITE_API_KEY` and `VITE_MAPTILES_API_KEY` in the project's **Environment Variables** settings
3. Deploy — Vercel handles the rest

---

## 👏 Acknowledgements

- Weather data by [OpenWeatherMap](https://openweathermap.org/)
- Map tiles by [MapTiler](https://www.maptiler.com/)
- Icons by [Lucide](https://lucide.dev/)
- UI primitives by [shadcn/ui](https://ui.shadcn.com/)

---
