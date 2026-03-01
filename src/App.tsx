/**
 * App – root component that orchestrates the entire weather dashboard.
 *
 * Responsibilities:
 *  - Holds the top-level state (selected location, map type, side-panel toggle).
 *  - Resolves the active coordinates from either a map click or a geocode search.
 *  - Renders the responsive header (location search, map type picker, theme & menu).
 *  - Lays out the main content grid with Suspense boundaries + skeleton fallbacks.
 *  - Renders the air-pollution SidePanel (always visible on desktop, slide-in on mobile).
 */
import DailyForecast from "./components/cards/DailyForecast"
import { useState, useMemo, Suspense, lazy } from "react"
import HourlyForecast from "./components/cards/HourlyForecast"
import CurrentWeather from "./components/cards/CurrentWeather"
import AdditionalInfo from "./components/cards/AdditionalInfo"
const Map = lazy(() => import("./components/Map"))
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
import { Menu, CloudSun } from "lucide-react"
import ThemeToggle from "./components/ThemeToggle"

function App() {
  // Coordinates set by clicking on the map (takes priority over geocode)
  const [manualCoords, setManualCoords] = useState<Coordinates | null>(null)
  // Text location typed into the search bar
  const [location, setLocation] = useState('')
  // Currently selected weather overlay layer for the map
  const [mapType, setMapType] = useState('clouds_new')
  // Controls the mobile slide-in side panel visibility
  const [sidePanelOpen, setSidePanelOpen] = useState(false)

  // Convert the text location to coordinates via the Geocoding API.
  // keepPreviousData avoids a flash of empty state when the query key changes.
  const {data: geocodeData} = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location),
    enabled: !!location && location !== 'cityName',
    placeholderData: keepPreviousData
  }) as { data: Array<{name: string; lat: number; lon: number; country: string}> | undefined }
  
  // Derive the active coordinates with a clear priority:
  // 1. Manual map click  2. Geocode result  3. Default (London)
  const coordinates = useMemo(() => {
    if (manualCoords) return manualCoords
    if (geocodeData?.[0]) return { lat: geocodeData[0].lat, lon: geocodeData[0].lon }
    return { lat: 51.5074, lon: -0.1278 } // Fallback: London
  }, [manualCoords, geocodeData])
  
  /** When the user clicks the map, store those coordinates and reset the text input. */
  const onMapClick = (lat: number, lon: number) => {
    setManualCoords({ lat, lon })
    setLocation('cityName')
  }
  
  /** When the user types a new location, clear the manual coords so geocode takes over. */
  const handleLocationChange = (value: string | ((prev: string) => string)) => {
    setManualCoords(null)
    setLocation(value)
  }

  return (
    <>
      <div className="flex flex-col gap-5 px-4 pb-6 pt-4 lg:mr-90">
        {/* Header bar */}
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CloudSun className="size-6 text-foreground" />
            <h1 className="text-xl font-bold tracking-tight text-foreground">Umbra</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Location</label>
              <LocationSearch key={location} location={location} setLocation={handleLocationChange}/>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Map Type</label>
              <MapTypeDropdown mapType={mapType} setMapType={setMapType}/>
            </div>
            <div className="flex items-center gap-1 sm:ml-auto">
              <ThemeToggle />
              <button
                onClick={() => setSidePanelOpen(true)}
                className="p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer lg:hidden"
                aria-label="Open air pollution panel"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </header>
      
        {/* Map */}
        <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-sm">
          <Suspense fallback={<div className="h-[400px] w-full bg-muted animate-pulse" />}>
            <Map coordinates={coordinates} onMapClick={onMapClick} mapType={mapType}/>
          </Suspense>
          <MapLegend mapType={mapType} />
        </div>

        {/* Weather cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Suspense fallback={<CurrentSkeleton />}>
            <CurrentWeather coordinates={coordinates} />
          </Suspense>
          <Suspense fallback={<AdditionalInfoSkeleton />}>
            <AdditionalInfo coordinates={coordinates} />
          </Suspense>
        </div>
        <Suspense fallback={<HourlySkeleton />}>
          <HourlyForecast coordinates={coordinates} />
        </Suspense>
        <Suspense fallback={<DailySkeleton />}>
          <DailyForecast coordinates={coordinates} />
        </Suspense>
      </div>
      <SidePanel coordinates={coordinates} open={sidePanelOpen} onClose={() => setSidePanelOpen(false)} />
    </>
  )
}

export default App
