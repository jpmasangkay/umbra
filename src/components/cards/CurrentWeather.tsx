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
    <Card title="Current Weather" childrenClassName="flex flex-col items-center gap-5">
      <div className="flex flex-col items-center gap-1">
        <WeatherIcon src={data.current.weather[0].icon} className="size-16" /> 
        <h2 className="text-5xl font-bold tracking-tight text-foreground">{Math.round(data.current.temp)}°C</h2>
        <h3 className="capitalize text-base text-muted-foreground">{data.current.weather[0].description}</h3>
      </div>
      <div className="flex flex-col items-center gap-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">Local Time</p>
        <h3 className="text-3xl font-semibold text-foreground">
          {new Intl.DateTimeFormat("en-GB", {
            hour: "numeric", 
            minute: "2-digit",
            hour12: true,
            timeZone: data.timezone
          }).format(data.current.dt * 1000)}
        </h3>
      </div>
      <div className="grid grid-cols-3 gap-3 w-full rounded-xl bg-muted/50 p-3">
        <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-muted-foreground">Feels Like</p>
            <p className="text-base font-semibold text-foreground">{Math.round(data.current.feels_like)}°C</p>
        </div>
        <div className="flex flex-col items-center gap-1 border-x border-border/50">
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-base font-semibold text-foreground">{data.current.humidity}%</p>
        </div>
        <div className="flex flex-col items-center gap-1">
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-base font-semibold text-foreground">{data.current.wind_speed} m/s</p>
        </div>
      </div>
    </Card>
  )
}
