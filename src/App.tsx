import DailyForecast from "./components/cards/DailyForecast"
import { useState, useMemo } from "react"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import type { Coordinates } from "./types"
import LocationDropDown from "./components/dropdowns/LocationDropDown"
import { useQuery } from "@tanstack/react-query"
import { getGeocode } from "./api"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"

function App() {
  const [manualCoords, setManualCoords] = useState<Coordinates | null>(null)
  const [location, setLocation] = useState('London')
  const [mapType, setMapType] = useState('clouds_new')

  const {data: geocodeData} = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location),
    enabled: !!location && location !== 'cityName'
  }) as { data: Array<{name: string; lat: number; lon: number; country: string}> | undefined }
  
  const coordinates = useMemo(() => {
    if (manualCoords) {
      return manualCoords
    }
    return geocodeData?.[0] 
      ? { lat: geocodeData[0].lat, lon: geocodeData[0].lon }
      : { lat: 51.5074, lon: -0.1278 }
  }, [manualCoords, geocodeData])
  
  const onMapClick = (lat: number, lon: number) => {
    setManualCoords({ lat, lon })
    setLocation('cityName')
  }
  
  const handleLocationChange = (value: string | ((prev: string) => string)) => {
    setManualCoords(null)
    setLocation(value)
  }

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Wrap dropdowns in a horizontal flex container */}
      <div className="flex flex-row gap-4">
        <LocationDropDown location={location} setLocation={handleLocationChange}/>
        <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
      </div>
      
      <Map coordinates={coordinates} onMapClick={onMapClick} mapType={mapType}/>
      <CurrentWeather coordinates={coordinates} />
      <HourlyForecast coordinates={coordinates} />
      <DailyForecast coordinates={coordinates} />
      <AdditionalInfo coordinates={coordinates} />
    </div>
  )
}

export default App