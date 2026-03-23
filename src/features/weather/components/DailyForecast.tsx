/**
 * DailyForecast – 7-day weather outlook with refined row layout.
 * Shows day, icon, condition, and a temp range bar.
 */
import { getWeather } from '../api'
import type { Coordinates } from '@/types'
import WeatherIcon from './WeatherIcon'
import Card from '@/components/Card'
import { useSuspenseQuery } from '@tanstack/react-query'

type Props = {
  coordinates: Coordinates
}

export default function DailyForecast({ coordinates }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => getWeather({ lat: coordinates.lat, lon: coordinates.lon })
  })

  // Find overall min/max for relative range bar sizing
  const allTemps = data.daily.flatMap(d => [d.temp.min, d.temp.max])
  const globalMin = Math.min(...allTemps)
  const globalMax = Math.max(...allTemps)
  const span = globalMax - globalMin || 1

  return (
    <Card title="7-Day Forecast" childrenClassName="flex flex-col gap-0">
      {data.daily.map((day, index) => {
        const barLeft = ((day.temp.min - globalMin) / span) * 100
        const barWidth = ((day.temp.max - day.temp.min) / span) * 100

        return (
          <div
            key={day.dt}
            className={`flex items-center gap-3 py-3 ${
              index !== data.daily.length - 1 ? 'border-b border-border/30' : ''
            }`}
          >
            {/* Day label */}
            <p className="w-9 text-xs font-700 uppercase tracking-wide text-muted-foreground shrink-0">
              {new Date(day.dt * 1000).toLocaleDateString(undefined, { weekday: 'short' })}
            </p>

            {/* Icon */}
            <WeatherIcon src={day.weather[0].icon} className="size-6 shrink-0" />

            {/* Condition */}
            <p className="text-xs font-500 text-muted-foreground capitalize hidden sm:block w-28 truncate shrink-0">
              {day.weather[0].description}
            </p>

            {/* Temp range track */}
            <div className="flex-1 flex items-center gap-2.5">
              <span className="text-xs font-600 text-muted-foreground tabular-nums w-8 text-right shrink-0">
                {Math.round(day.temp.min)}°
              </span>
              <div className="flex-1 h-1 rounded-full bg-border/50 relative overflow-hidden">
                <div
                  className="absolute top-0 h-full rounded-full bg-muted-foreground/40"
                  style={{ left: `${barLeft}%`, width: `${barWidth}%` }}
                />
              </div>
              <span className="text-xs font-700 text-card-foreground tabular-nums w-8 shrink-0">
                {Math.round(day.temp.max)}°
              </span>
            </div>
          </div>
        )
      })}
    </Card>
  )
}
