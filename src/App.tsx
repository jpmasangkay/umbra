import DailyForecast from "./components/cards/DailyForecast"
import { useState } from "react"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import type { Coordinates } from "./types"
import LocationDropDown from "./components/dropdowns/LocationDropDown"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "./api"

function App() {
  const [coords, setCoordinates] = useState<Coordinates>({lat: 10, lon: 25})
  const [location, setLocation] = useState('London')

  const {data: geocodeData} = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location),
    enabled: !!location && location !== 'cityName'
  }) as { data: Array<{name: string; lat: number; lon: number; country: string}> | undefined }
  
  const onMapClick = (lat: number, lon: number) => {
    setCoordinates({ lat, lon })
    setLocation('cityName')
  }
  
const coordinates = location === 'cityName' ? coords : {lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0}

  return (
    <div className="flex flex-col gap-8 p-4">
      <LocationDropDown location={location} setLocation={setLocation}/>
      <Map coordinates={coordinates} onMapClick={onMapClick} />
      <CurrentWeather coordinates={coordinates} />
      <HourlyForecast coordinates={coordinates} />
      <DailyForecast coordinates={coordinates} />
      <AdditionalInfo coordinates={coordinates} />
    </div>
  )
}

export default App