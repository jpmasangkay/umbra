# Umbra – Weather Dashboard 🌤️

A modern, responsive weather dashboard built with React, TypeScript and Tailwind CSS. View real-time weather data, hourly & daily forecasts, air pollution levels, and interactive weather maps — all in one place.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)

## Features ✨

- **Current Weather** – temperature, feels-like, humidity, wind speed & local time
- **Hourly Forecast** – scrollable 48-hour outlook with icons
- **7-Day Forecast** – daily high/low temps at a glance
- **Additional Info** – cloudiness, UV index, wind direction, pressure, sunrise & sunset
- **Air Pollution Panel** – AQI index + per-pollutant concentrations with quality-level indicators
- **Interactive Map** – Leaflet + MapTiler base layer with selectable OpenWeatherMap overlays (clouds, precipitation, wind, pressure, temperature)
- **Click-to-Select** – click anywhere on the map to fetch weather for that location
- **Location Search** – type a city name to geocode and jump to it
- **Dark / Light Mode** – toggle with localStorage persistence; defaults to system preference
- **Responsive Design** – mobile-first layout; air pollution panel slides in on small screens, always visible on desktop
- **Skeleton Loaders** – every card shows a shimmer placeholder while data loads (powered by React Suspense)
- **Runtime Validation** – all API responses validated with Zod schemas

## Tech Stack 🛠️

| Category | Library |
| --- | --- |
| UI Framework | **React 19** + **TypeScript** |
| Build Tool | **Vite** (SWC plugin) |
| Styling | **Tailwind CSS v4** + **shadcn/ui** components |
| Data Fetching | **TanStack React Query** (`useSuspenseQuery`) |
| Validation | **Zod** |
| Maps | **Leaflet** + **react-leaflet** + **MapTiler SDK** |
| Icons | **lucide-react** |
| Weather Data | **OpenWeatherMap** (OneCall 3.0, Geocoding, Air Pollution) |

## Getting Started 🚀

### Prerequisites

- **Node.js** ≥ 18
- An **OpenWeatherMap** API key (with OneCall 3.0 access)
- A **MapTiler** API key

### Installation

```bash
# Clone the repo
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

Open the URL shown in your terminal (usually http://localhost:5173).

### Production Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

## Project Structure 📁

```
umbra/
├── public/                      # Static assets
├── src/
│   ├── api.ts                   # API fetch functions (weather, geocode, air pollution)
│   ├── App.tsx                  # Root component – layout, state, Suspense boundaries
│   ├── main.tsx                 # Entry point – React DOM + QueryClientProvider
│   ├── types.ts                 # Shared TypeScript types (Coordinates)
│   ├── index.css                # Global styles & Tailwind directives
│   ├── lib/
│   │   └── utils.ts             # cn() helper (clsx + tailwind-merge)
│   ├── schemas/
│   │   ├── weatherSchema.ts     # Zod schema for OneCall 3.0 response
│   │   ├── geoCodeSchema.ts     # Zod schema for Geocoding response
│   │   └── airPollutionSchema.ts# Zod schema for Air Pollution response
│   ├── components/
│   │   ├── Map.tsx              # Leaflet map with MapTiler & weather overlays
│   │   ├── MapLegend.tsx        # Colour-gradient legend for the active map layer
│   │   ├── SidePanel.tsx        # Air pollution panel (AQI + pollutant cards)
│   │   ├── ThemeToggle.tsx      # Dark / light mode button
│   │   ├── WeatherIcon.tsx      # OWM icon renderer
│   │   ├── cards/
│   │   │   ├── Card.tsx         # Reusable gradient card wrapper
│   │   │   ├── CurrentWeather.tsx
│   │   │   ├── HourlyForecast.tsx
│   │   │   ├── DailyForecast.tsx
│   │   │   └── AdditionalInfo.tsx
│   │   ├── dropdowns/
│   │   │   ├── LocationSearch.tsx
│   │   │   └── MapTypeDropdown.tsx
│   │   ├── skeletons/           # Matching skeleton loaders for every card
│   │   │   ├── CurrentSkeleton.tsx
│   │   │   ├── HourlySkeleton.tsx
│   │   │   ├── DailySkeleton.tsx
│   │   │   ├── AdditionalInfoSkeleton.tsx
│   │   │   └── SidePanelSkeleton.tsx
│   │   └── ui/                  # shadcn/ui primitives (button, input, select, …)
│   └── assets/
├── components.json              # shadcn/ui config
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Available Scripts 📝

| Command | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Deployment

The app is deployed on **Vercel**. Push to `main` and Vercel will build + deploy automatically. Make sure the environment variables above are set in the Vercel project settings.

## Acknowledgements 👏

- Weather data by [OpenWeatherMap](https://openweathermap.org/)
- Map tiles by [MapTiler](https://www.maptiler.com/)
- Icons by [Lucide](https://lucide.dev/)
- UI primitives by [shadcn/ui](https://ui.shadcn.com/)

---

Built with React + TypeScript + Tailwind CSS

[![DeepWiki](https://img.shields.io/badge/DeepWiki-jpmasangkay%2Fumbra-blue?logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTQgMTloMTYiLz48cGF0aCBkPSJNNCAxNWgxNiIvPjxwYXRoIGQ9Ik00IDExaDE2Ii8+PHBhdGggZD0iTTQgN2gxNiIvPjwvc3ZnPg==)](https://deepwiki.com/jpmasangkay/umbra)
