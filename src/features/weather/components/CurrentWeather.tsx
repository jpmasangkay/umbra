/**
 * CurrentWeather – hero card.
 * Fraunces at large optical size for the temperature numeral.
 * DM Sans for all labels and stats.
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
    <div className="glass rounded-2xl overflow-hidden h-full animate-[fade-up_0.55s_cubic-bezier(0.16,1,0.3,1)_both]">
      <div className="flex flex-col p-5 h-full">

        {/* Card label */}
        <div className="flex items-center gap-2.5 mb-5">
          <span className="w-1 h-4 rounded-full bg-muted-foreground/25 shrink-0" />
          <h2 className="text-[10px] font-500 uppercase tracking-[0.14em] text-muted-foreground/70">
            Current Weather
          </h2>
        </div>

        {/* Temp + icon row */}
        <div className="flex items-start justify-between flex-1 gap-4">
          <div className="flex flex-col gap-1">
            {/* Fraunces at 144px optical size — large, editorial */}
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
            <WeatherIcon src={data.current.weather[0].icon} className="size-14 opacity-90" />
            <div className="text-right">
              <p className="text-base font-500 text-card-foreground tabular-nums leading-tight">
                {localTime}
              </p>
              <p className="text-xs font-400 text-muted-foreground/70 mt-0.5">{localDate}</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border/40 my-4" />

        {/* Stats */}
        <div className="grid grid-cols-3">
          <StatItem label="Feels like" value={`${Math.round(data.current.feels_like)}°`} />
          <StatItem label="Humidity" value={`${data.current.humidity}%`} border />
          <StatItem label="Wind" value={`${data.current.wind_speed} m/s`} />
        </div>
      </div>
    </div>
  )
}

function StatItem({ label, value, border }: { label: string; value: string; border?: boolean }) {
  return (
    <div className={`flex flex-col gap-1 items-center px-3 py-1 ${border ? 'border-x border-border/35' : ''}`}>
      <p className="text-[10px] font-500 uppercase tracking-[0.1em] text-muted-foreground/60">{label}</p>
      <p className="text-lg font-500 text-card-foreground tabular-nums">{value}</p>
    </div>
  )
}
