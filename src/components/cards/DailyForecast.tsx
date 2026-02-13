import { getWeather } from '../../api'
import type { Coordinates } from '../../types'
import WeatherIcon from '../WeatherIcon'
import Card from './Card'
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
    <Card title="Daily Forecast" childrenClassName="flex flex-col gap-4">
      {data?.daily.map((day) => (
        <div key={day.dt} className="flex justify-between items-center">  
          <p className="w-9">
            {new Date(day.dt * 1000).toLocaleDateString(undefined, {
                weekday: 'short'
              })}
            </p>
            <WeatherIcon src={day.weather[0].icon} /> 
            <p className="w-14 text-right">{Math.round(day.temp.day)}°C</p>
            <p className="w-14 text-right text-gray-500/75">{Math.round(day.temp.min)}°C</p>
            <p className="w-14 text-right text-gray-500/75">{Math.round(day.temp.max)}°C</p>
          </div>
        ))}
    </Card>
  )
}