import DailyForecast from "./components/cards/DailyForecast"
import { useState } from "react"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import type { Coordinates } from "./types"

function App() {
  const [coordinates, setCoordinates] = useState<Coordinates>({lat: 10, lon: 25})
  
  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon })
  }
  
  return (
    <div className="flex flex-col gap-8 p-4">
      <Map coordinates={coordinates} onMapClick={onMapClick} />
      <CurrentWeather coordinates={coordinates} />
      <HourlyForecast coordinates={coordinates} />
      <DailyForecast coordinates={coordinates} />
      <AdditionalInfo coordinates={coordinates} />
    </div>
  )
}

export default App