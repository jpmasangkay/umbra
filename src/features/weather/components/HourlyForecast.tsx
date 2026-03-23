/**
 * HourlyForecast – horizontally scrollable 48-hour outlook.
 * Each item shows time, icon and temperature in a clean pill.
 */
import { getWeather } from '../api'
import type { Coordinates } from '@/types'
import WeatherIcon from './WeatherIcon'
import Card from '@/components/Card'
import { useSuspenseQuery } from '@tanstack/react-query'

type Props = {
  coordinates: Coordinates
}

export default function HourlyForecast({ coordinates }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => getWeather({ lat: coordinates.lat, lon: coordinates.lon })
  })

  return (
    <Card title="Hourly Forecast" childrenClassName="overflow-hidden">
      <div className="scroll-fade-x overflow-x-auto pb-1 -mx-1 px-1">
        <div className="flex gap-2 w-max">
          {data.hourly.map((hour, i) => (
            <div
              key={hour.dt}
              className="flex flex-col items-center gap-2 shrink-0 w-[72px] py-3 px-2 rounded-xl bg-accent/50 hover:bg-accent/80 transition-colors cursor-default"
              style={{ animationDelay: `${i * 0.02}s` }}
            >
              <p className="text-[10px] font-600 text-muted-foreground tabular-nums whitespace-nowrap">
                {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
              <WeatherIcon src={hour.weather[0].icon} className="size-7" />
              <p className="text-sm font-700 text-card-foreground tabular-nums">
                {Math.round(hour.temp)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
