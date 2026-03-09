/**
 * HourlyForecast – horizontally scrollable list of 48-hour forecast entries.
 *
 * Each entry shows the time, a weather icon from OWM, and the temperature.
 * Wraps in a Card with overflow-x-auto for the scroll behaviour.
 */
import { getWeather } from '../api'
import type { Coordinates } from '@/types'
import WeatherIcon from './WeatherIcon'
import Card from '@/components/Card'
import { useSuspenseQuery } from '@tanstack/react-query'

type Props = {
    coordinates: Coordinates
}

export default function HourlyForecast({coordinates}: Props) {
  const {data} = useSuspenseQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => getWeather({lat: coordinates.lat, lon: coordinates.lon})
  })
  
  return (
    <Card 
      title="Hourly Forecast" 
      childrenClassName="flex gap-8 overflow-x-auto pb-4"
    >
      {data.hourly.map(hour => (
        <div 
          key={hour.dt}
          className="flex flex-col gap-2 items-center shrink-0 w-20 py-3 px-2 rounded-xl bg-accent/50 hover:bg-accent transition-colors"
        >
          <p className="whitespace-nowrap text-xs text-muted-foreground font-medium tabular-nums">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p className="text-sm font-semibold text-card-foreground">{Math.round(hour.temp)}°C</p>
        </div>
      ))}
    </Card>
  )
}
