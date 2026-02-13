# Weather Dashboard 🌤️

A modern, interactive weather dashboard application that provides real-time weather information with an interactive map interface.

## Features ✨

- **Real-time Weather Data**: Get current weather conditions for any location
- **Interactive Map Visualization**: View weather patterns with multiple map types (clouds, temperature, precipitation, wind)
- **Location Search**: Search and switch between different cities worldwide
- **Current Weather Display**: 
  - Temperature and weather conditions
  - Feels like temperature
  - Humidity percentage
  - Wind speed
  - Local time
- **Daily Weather Forecast**: View upcoming weather predictions
- **Dark/Light Mode Toggle**: Switch between themes for comfortable viewing
- **Responsive Design**: Optimized for all screen sizes

## Tech Stack 🛠️

- **React** - UI library
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Zod** - TypeScript-first schema validation
- **Lucide React** - Beautiful, consistent icon library
- **MapTiler** - Interactive map visualization
- **Leaflet** - Map rendering library
- **OpenStreetMap** - Map data provider

## Installation 📦

1. Clone the repository:
```bash
git clone https://github.com/yourusername/weather-dashboard.git
cd weather-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your API keys:
```env
VITE_WEATHER_API_KEY=your_weather_api_key
VITE_MAPTILER_API_KEY=your_maptiler_api_key
```

4. Start the development server:
```bash
npm run dev
```

5. Open the local URL shown in your terminal (usually http://localhost:5173)

## Usage 🚀

1. **Select Location**: Use the dropdown to choose your city
2. **Choose Map Type**: Select weather visualization layers (clouds, temperature, etc.)
3. **View Details**: Check current weather conditions and metrics
4. **Toggle Theme**: Switch between dark and light mode
5. **Check Forecast**: View daily weather predictions

## Project Structure 📁
```
weather-dashboard/
├── src/
│   ├── components/
│   │   └── cards/
│   ├── assets/
│   ├── schemas/        # Zod validation schemas
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## Key Technologies Explained 🔍

### Zod for Type Safety
Zod is used for runtime type validation of API responses, ensuring data integrity:
```typescript
const weatherSchema = z.object({
  temperature: z.number(),
  condition: z.string(),
  // ... more fields
});
```

### Tailwind CSS for Styling
Utility-first approach for rapid UI development with responsive design built-in.

### Lucide React Icons
Clean, customizable icons that match the modern UI aesthetic.

### TypeScript
Full type safety across the application, catching errors at compile time.

## Available Scripts 📝

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments 👏

- Weather data from weather API provider
- Map tiles and visualization by MapTiler
- Icons by Lucide React

---

Built with React + TypeScript + Tailwind CSS
