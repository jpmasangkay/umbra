/**
 * CurrentWeather – hero card with neumorphic raised surface.
 * Fraunces at large optical size for the temperature numeral.
 */
import { getWeather } from '../api'
import type { Coordinates } from '@/types'
import WeatherIcon from './WeatherIcon'
import { useSuspenseQuery } from '@tanstack/react-query'

type Props = {
  coordinates: Coordinates
}

export default function CurrentWeather({ coordinates }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => getWeather({ lat: coordinates.lat, lon: coordinates.lon })
  })

  const localTime = new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: data.timezone
  }).format(data.current.dt * 1000)

  const localDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    timeZone: data.timezone
  }).format(data.current.dt * 1000)

  return (
    <div className="neu-card rounded-2xl overflow-hidden h-full animate-[fade-up_0.55s_cubic-bezier(0.16,1,0.3,1)_both]">
      <div className="flex flex-col p-5 h-full">

        {/* Card label */}
        <div className="flex items-center gap-2.5 mb-5">
          <span className="w-1.5 h-4 rounded-full shrink-0 neu-inset-sm" />
          <h2 className="text-[10px] font-500 uppercase tracking-[0.14em] text-muted-foreground/70">
            Current Weather
          </h2>
        </div>

        {/* Temp + icon row */}
        <div className="flex items-start justify-between flex-1 gap-4">
          <div className="flex flex-col gap-1">
            <span
              className="font-display leading-none tracking-tight text-card-foreground"
              style={{ fontSize: 'clamp(4rem, 10vw, 5.5rem)', fontVariationSettings: '"opsz" 144' }}
            >
              {Math.round(data.current.temp)}°
            </span>
            <span className="text-sm font-400 text-muted-foreground capitalize mt-1">
              {data.current.weather[0].description}
            </span>
          </div>

          <div className="flex flex-col items-end gap-2 pt-1 shrink-0">
            <div className="rounded-xl p-2 neu-raised-sm">
              <WeatherIcon src={data.current.weather[0].icon} className="size-12 opacity-90" />
            </div>
            <div className="text-right">
              <p className="text-base font-500 text-card-foreground tabular-nums leading-tight">
                {localTime}
              </p>
              <p className="text-xs font-400 text-muted-foreground/70 mt-0.5">{localDate}</p>
            </div>
          </div>
        </div>

        {/* Divider – neumorphic groove */}
        <div className="h-[2px] rounded-full my-4 neu-inset-sm" />

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <StatItem label="Feels like" value={`${Math.round(data.current.feels_like)}°`} />
          <StatItem label="Humidity" value={`${data.current.humidity}%`} />
          <StatItem label="Wind" value={`${data.current.wind_speed} m/s`} />
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1.5 items-center px-3 py-2.5 rounded-xl neu-inset-sm">
      <p className="text-[10px] font-500 uppercase tracking-[0.1em] text-muted-foreground/60">{label}</p>
      <p className="text-lg font-500 text-card-foreground tabular-nums">{value}</p>
    </div>
  )
}
