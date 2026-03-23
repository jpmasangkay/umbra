/**
 * SidePanel – fixed right panel with air quality data.
 * Glassmorphism applied to the AQI header section only.
 */
import { getAirPollution } from '../api'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import type { Coordinates } from '@/types'
import { Slider } from '@/components/ui/slider'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Info, ArrowLeft } from 'lucide-react'
import SidePanelSkeleton from './SidePanelSkeleton'

type SidePanelProps = {
  coordinates: Coordinates
  open: boolean
  onClose: () => void
}

type Props = {
  coordinates: Coordinates
}

export default function SidePanel({ coordinates, open, onClose }: SidePanelProps) {
  return (
    <div
      className={`fixed top-0 right-0 z-[1001] h-screen w-90 bg-sidebar border-l border-border/50 py-6 px-5 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution coordinates={coordinates} onClose={onClose} />
      </Suspense>
    </div>
  )
}

const aqiLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Good', color: 'text-green-500' },
  2: { label: 'Fair', color: 'text-yellow-500' },
  3: { label: 'Moderate', color: 'text-orange-400' },
  4: { label: 'Poor', color: 'text-red-400' },
  5: { label: 'Very Poor', color: 'text-red-600' },
}

function AirPollution({ coordinates, onClose }: Props & { onClose: () => void }) {
  const { data } = useSuspenseQuery({
    queryKey: ['pollution', coordinates.lat, coordinates.lon],
    queryFn: () => getAirPollution(coordinates),
  })

  const aqi = data.list[0].main.aqi
  const aqiInfo = aqiLabels[aqi] ?? aqiLabels[1]

  return (
    <div className="flex flex-col gap-5 animate-[fade-up_0.55s_cubic-bezier(0.16,1,0.3,1)_both]">

      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-1.5 rounded-xl hover:bg-accent transition-colors cursor-pointer lg:hidden"
          aria-label="Close side panel"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex items-center gap-2.5">
          <span className="w-1 h-4 rounded-full bg-muted-foreground/30 shrink-0" />
          <h1 className="text-xs font-700 uppercase tracking-[0.12em] text-muted-foreground">
            Air Quality
          </h1>
        </div>
      </div>

      {/* AQI hero – glass treatment */}
      <div className="glass rounded-2xl p-5 flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] font-600 uppercase tracking-[0.12em] text-muted-foreground/70 mb-1">
              Air Quality Index
            </p>
            <div className="flex items-baseline gap-2">
              <span className="font-display leading-none text-sidebar-foreground" style={{ fontSize: "3.5rem", fontVariationSettings: "\"opsz\" 144" }}>
                {aqi}
              </span>
              <span className={`text-sm font-700 ${aqiInfo.color}`}>{aqiInfo.label}</span>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="size-4 text-muted-foreground/50" />
              </TooltipTrigger>
              <TooltipContent className="z-[2000] max-w-xs">
                AQI scale: 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* AQI step indicator */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map(level => (
            <div
              key={level}
              className={`flex-1 h-1 rounded-full transition-all ${
                level <= aqi
                  ? level === 1 ? 'bg-green-500'
                  : level === 2 ? 'bg-yellow-500'
                  : level === 3 ? 'bg-orange-400'
                  : level === 4 ? 'bg-red-400'
                  : 'bg-red-600'
                  : 'bg-border/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Pollutant cards */}
      <div className="flex flex-col gap-3">
        {Object.entries(data.list[0]?.components).map(([key, value]) => {
          const range = pollutantRanges[key]
          const max = range ? range.poor : 500
          const quality = getQualityLevel(key, value)

          return (
            <div
              key={key}
              className="flex flex-col gap-2.5 p-4 rounded-xl bg-card border border-border/50"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-700 uppercase text-card-foreground">{key}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="size-3 text-muted-foreground/50" />
                      </TooltipTrigger>
                      <TooltipContent className="z-[2000]">
                        <p>{pollutantNameMapping[key] ?? key}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <span className="text-sm font-600 text-card-foreground tabular-nums">
                  {value}{' '}
                  <span className="text-muted-foreground font-400 text-xs">μg/m³</span>
                </span>
              </div>

              <Slider disabled min={0} max={max} value={[Math.min(value, max)]} />

              <div className="flex justify-between text-[10px] text-muted-foreground/60 tabular-nums">
                <span>0</span>
                <span>{max}</span>
              </div>

              <div className="flex items-center gap-1">
                {qualityLevels.map(level => (
                  <span
                    key={level}
                    className={`py-1 rounded-md text-center flex-1 text-[9px] font-700 uppercase tracking-wide leading-none whitespace-nowrap transition-all ${
                      quality === level
                        ? qualityColors[level] + ' text-white'
                        : 'text-muted-foreground/40 bg-muted/40'
                    }`}
                  >
                    {qualityLabels[level]}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const pollutantNameMapping: Record<string, string> = {
  so2: 'Sulfur dioxide',
  no2: 'Nitrogen dioxide',
  pm10: 'Particulate matter 10',
  pm2_5: 'Fine particles matter',
  o3: 'Ozone',
  co: 'Carbon monoxide',
  no: 'Nitrogen monoxide',
  nh3: 'Ammonia',
}

const pollutantRanges: Record<string, { good: number; fair: number; moderate: number; poor: number; veryPoor: number }> = {
  so2:   { good: 20,   fair: 80,   moderate: 250,   poor: 350,   veryPoor: 500 },
  no2:   { good: 40,   fair: 70,   moderate: 150,   poor: 200,   veryPoor: 400 },
  no:    { good: 10,   fair: 30,   moderate: 50,    poor: 80,    veryPoor: 150 },
  pm10:  { good: 20,   fair: 50,   moderate: 100,   poor: 200,   veryPoor: 400 },
  pm2_5: { good: 10,   fair: 25,   moderate: 50,    poor: 75,    veryPoor: 150 },
  o3:    { good: 60,   fair: 100,  moderate: 140,   poor: 180,   veryPoor: 300 },
  co:    { good: 4400, fair: 9400, moderate: 12400, poor: 15400, veryPoor: 20000 },
  nh3:   { good: 200,  fair: 400,  moderate: 800,   poor: 1200,  veryPoor: 2000 },
}

const qualityLevels = ['Good', 'Fair', 'Moderate', 'Poor', 'Very Poor'] as const
const qualityLabels: Record<string, string> = {
  Good: 'Good', Fair: 'Fair', Moderate: 'Med', Poor: 'Poor', 'Very Poor': 'V.Poor',
}
const qualityColors: Record<string, string> = {
  Good: 'bg-green-600', Fair: 'bg-yellow-500', Moderate: 'bg-orange-500', Poor: 'bg-red-500', 'Very Poor': 'bg-red-800',
}

function getQualityLevel(key: string, value: number): string {
  const range = pollutantRanges[key]
  if (!range) return 'Good'
  if (value <= range.good) return 'Good'
  if (value <= range.fair) return 'Fair'
  if (value <= range.moderate) return 'Moderate'
  if (value <= range.poor) return 'Poor'
  return 'Very Poor'
}
