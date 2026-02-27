import DailyForecast from "./components/cards/DailyForecast"
import { useState, useMemo, Suspense } from "react"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import type { Coordinates } from "./types"
import LocationSearch from "./components/dropdowns/LocationSearch"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { getGeocode } from "./api"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"
import MapLegend from "./components/MapLegend"
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton"
import HourlySkeleton from "./components/skeletons/HourlySkeleton"
import AdditionalInfoSkeleton from "./components/skeletons/AdditionalInfoSkeleton"
import DailySkeleton from "./components/skeletons/DailySkeleton"
import SidePanel from "./components/SidePanel"

function App() {
  const [manualCoords, setManualCoords] = useState<Coordinates | null>(null)
  const [location, setLocation] = useState('')
  const [mapType, setMapType] = useState('clouds_new')

  const {data: geocodeData} = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location),
    enabled: !!location && location !== 'cityName',
    placeholderData: keepPreviousData
  }) as { data: Array<{name: string; lat: number; lon: number; country: string}> | undefined }
  
  const coordinates = useMemo(() => {
    if (manualCoords) return manualCoords
    if (geocodeData?.[0]) return { lat: geocodeData[0].lat, lon: geocodeData[0].lon }
    return { lat: 51.5074, lon: -0.1278 }
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
    <>
      <div className="flex flex-col gap-8 px-4 pb-4 pt-4 sm:pt-4">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <h1 className="text-lg sm:text-xl font-semibold">Location:</h1>
            <LocationSearch key={location} location={location} setLocation={handleLocationChange}/>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
            <h1 className="text-lg sm:text-xl font-semibold">Map Type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
          </div>
        </div>
      
        <div className="relative">
          <Map coordinates={coordinates} onMapClick={onMapClick} mapType={mapType}/>
          <MapLegend mapType={mapType} />
        </div>
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather coordinates={coordinates} />
        </Suspense>
        <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecast coordinates={coordinates} />
        </Suspense>
        <Suspense fallback={<DailySkeleton />}>
          <DailyForecast coordinates={coordinates} />
        </Suspense>
        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <AdditionalInfo coordinates={coordinates} />
        </Suspense>
      </div>
      <SidePanel coordinates={coordinates} />
    </>
  )
}

export default App