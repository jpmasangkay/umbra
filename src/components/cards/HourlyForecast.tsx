import { getWeather } from '../../api'
import type { Coordinates } from '../../types'
import WeatherIcon from '../WeatherIcon'
import Card from './Card'
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
          className="flex flex-col gap-3 items-center shrink-0 w-20"
        >
          <p className="whitespace-nowrap text-base">
            {new Date(hour.dt * 1000).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true
            })}
          </p>
          <WeatherIcon src={hour.weather[0].icon} />
          <p className="text-lg font-medium">{Math.round(hour.temp)}°F</p>
        </div>
      ))}
    </Card>
  )
}