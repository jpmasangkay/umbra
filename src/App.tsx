/**
 * App – root layout with neumorphic design system.
 */
import DailyForecast from "./features/weather/components/DailyForecast"
import { useState, useMemo, Suspense, lazy } from "react"
import HourlyForecast from "./features/weather/components/HourlyForecast"
import CurrentWeather from "./features/weather/components/CurrentWeather"
import AdditionalInfo from "./features/weather/components/AdditionalInfo"
const Map = lazy(() => import("./features/map/components/Map"))
import type { Coordinates } from "./types"
import LocationSearch from "./features/location/components/LocationSearch"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { getGeocode } from "./features/location/api"
import MapTypeDropdown from "./features/map/components/MapTypeDropdown"
import MapLegend from "./features/map/components/MapLegend"
import CurrentSkeleton from "./features/weather/components/CurrentSkeleton"
import HourlySkeleton from "./features/weather/components/HourlySkeleton"
import AdditionalInfoSkeleton from "./features/weather/components/AdditionalInfoSkeleton"
import DailySkeleton from "./features/weather/components/DailySkeleton"
import SidePanel from "./features/air-pollution/components/SidePanel"
import { Menu } from "lucide-react"
import ThemeToggle from "./features/theme/ThemeToggle"

function App() {
  const [manualCoords, setManualCoords] = useState<Coordinates | null>(null)
  const [location, setLocation] = useState('')
  const [mapType, setMapType] = useState('clouds_new')
  const [sidePanelOpen, setSidePanelOpen] = useState(false)

  const { data: geocodeData } = useQuery({
    queryKey: ['geocode', location],
    queryFn: () => getGeocode(location),
    enabled: !!location && location !== 'cityName',
    placeholderData: keepPreviousData
  }) as { data: Array<{ name: string; lat: number; lon: number; country: string }> | undefined }

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
      <div className="relative z-10 flex flex-col gap-5 px-4 pb-8 pt-5 lg:mr-90">

        {/* ── Header ── */}
        <header>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-500 uppercase tracking-[0.12em] text-muted-foreground/60 shrink-0">
                  Location
                </label>
                <LocationSearch key={location} location={location} setLocation={handleLocationChange} />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-[10px] font-500 uppercase tracking-[0.12em] text-muted-foreground/60 shrink-0">
                  Overlay
                </label>
                <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <ThemeToggle />
              <button
                onClick={() => setSidePanelOpen(true)}
                className="p-2 rounded-xl transition-all cursor-pointer lg:hidden neu-button"
                aria-label="Open air quality panel"
              >
                <Menu className="size-4" />
              </button>
            </div>
          </div>
        </header>

        {/* ── Map ── */}
        <div className="relative rounded-2xl overflow-hidden neu-raised-lg">
          <Suspense fallback={<div className="h-100 w-full animate-neu-pulse rounded-2xl" />}>
            <Map coordinates={coordinates} onMapClick={onMapClick} mapType={mapType} />
          </Suspense>
          <MapLegend mapType={mapType} />
        </div>

        {/* ── Weather Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
