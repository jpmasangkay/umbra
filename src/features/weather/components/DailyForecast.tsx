/**
 * DailyForecast – shows the 7-day weather outlook.
 *
 * Each row displays the weekday abbreviation, weather icon,
 * day temperature, and the min/max range for that day.
 */
import { getWeather } from '../api'
import type { Coordinates } from '@/types'
import WeatherIcon from './WeatherIcon'
import Card from '@/components/Card'
import { useSuspenseQuery } from '@tanstack/react-query'

type Props = {
    coordinates: Coordinates
}

export default function DailyForecast({coordinates}: Props) {
  const {data} = useSuspenseQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => getWeather({lat: coordinates.lat, lon: coordinates.lon})
  })

  return (
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-0">
      {data?.daily.map((day, index) => (
        <div key={day.dt} className={`flex justify-between items-center py-3 ${index !== data.daily.length - 1 ? 'border-b border-border/40' : ''}`}>  
          <p className="w-10 text-sm font-medium text-card-foreground">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: 'short'
              })}
            </p>
            <WeatherIcon src={day.weather[0].icon} /> 
            <p className="w-14 text-right text-sm font-semibold text-card-foreground">{Math.round(day.temp.day)}°C</p>
            <div className="flex items-center gap-3 w-32 justify-end">
              <span className="text-xs text-muted-foreground">L</span>
              <p className="w-10 text-right text-sm text-muted-foreground tabular-nums">{Math.round(day.temp.min)}°C</p>
              <span className="text-xs text-muted-foreground">H</span>
              <p className="w-10 text-right text-sm text-muted-foreground tabular-nums">{Math.round(day.temp.max)}°C</p>
            </div>
          </div>
        ))}
    </Card>
  )
}
