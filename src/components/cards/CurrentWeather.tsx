/**
 * CurrentWeather – displays the headline weather information.
 *
 * Shows the current temperature, weather icon + description,
 * local time (in the location's timezone), and quick stats
 * for "Feels Like", humidity and wind speed.
 *
 * Data is fetched with useSuspenseQuery so the nearest <Suspense>
 * boundary renders a skeleton while loading.
 */
import { getWeather } from '../../api'
import type { Coordinates } from '../../types'
import WeatherIcon from '../WeatherIcon'
import Card from './Card'
import { useSuspenseQuery } from '@tanstack/react-query'

type Props = {
    coordinates: Coordinates
}

export default function CurrentWeather({coordinates}: Props) {
  const { data   } = useSuspenseQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => getWeather({lat: coordinates.lat, lon: coordinates.lon})
  })

  return (
    <Card title="Current Weather" childrenClassName="flex flex-col items-center justify-center gap-6 flex-1" className="h-full">
      <div className="flex flex-col gap-1 items-center">
        <WeatherIcon src={data.current.weather[0].icon} className="size-16" /> 
        <h2 className="text-5xl font-bold tracking-tight text-card-foreground">{Math.round(data.current.temp)}°C</h2>
        <h3 className="capitalize text-base text-muted-foreground mt-1">{data.current.weather[0].description}</h3>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">Local Time</p>
        <h3 className="text-3xl font-semibold text-card-foreground tabular-nums">
          {new Intl.DateTimeFormat("en-GB", {
            hour: "numeric", 
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone
          }).format(data.current.dt * 1000)}
        </h3>
      </div>
      <div className="flex justify-between w-full pt-4 border-t border-border/50">
        <div className="flex flex-col gap-1 items-center flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Feels Like</p>
            <p className="text-lg font-semibold text-card-foreground">{Math.round(data.current.feels_like)}°C</p>
        </div>
        <div className="flex flex-col gap-1 items-center flex-1 border-x border-border/50">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Humidity</p>
            <p className="text-lg font-semibold text-card-foreground">{data.current.humidity}%</p>
        </div>
        <div className="flex flex-col gap-1 items-center flex-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Wind</p>
            <p className="text-lg font-semibold text-card-foreground">{data.current.wind_speed} m/s</p>
        </div>
      </div>
    </Card>
  )
}
