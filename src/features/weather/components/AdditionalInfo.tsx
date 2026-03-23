/**
 * AdditionalInfo – refined metric rows for secondary weather data.
 */
import { useSuspenseQuery } from '@tanstack/react-query'
import Card from '@/components/Card'
import { getWeather } from '../api'
import { Cloud, Sun, Wind, Gauge, Sunrise, Sunset } from 'lucide-react'
import type { Coordinates } from '@/types'

type Props = {
  coordinates: Coordinates
}

export default function AdditionalInfo({ coordinates }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => getWeather({ lat: coordinates.lat, lon: coordinates.lon })
  })

  return (
    <Card title="Conditions" childrenClassName="flex flex-col gap-0">
      {rows.map(({ label, value, Icon }, index) => (
        <div
          key={value}
          className={`flex justify-between items-center py-3 ${
            index !== rows.length - 1 ? 'border-b border-border/30' : ''
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon
              className="size-4 text-muted-foreground/60 shrink-0"
              strokeWidth={1.75}
            />
            <span className="text-sm font-500 text-muted-foreground">{label}</span>
          </div>
          <span className="text-sm font-600 text-card-foreground tabular-nums">
            <FormatComponent
              field={value}
              value={data.current[value as keyof typeof data.current] as number}
            />
          </span>
        </div>
      ))}
    </Card>
  )
}

function FormatComponent({ field, value }: { field: string; value: number }) {
  if (field === 'sunrise' || field === 'sunset') {
    return new Intl.DateTimeFormat('en-PH', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(value * 1000)
  }
  if (field === 'wind_deg') {
    return (
      <Wind
        className="size-4"
        style={{ transform: `rotate(${value + 90}deg)` }}
        strokeWidth={2}
      />
    )
  }
  return value
}

const rows = [
  { label: 'Cloudiness', value: 'clouds', Icon: Cloud },
  { label: 'UV Index', value: 'uvi', Icon: Sun },
  { label: 'Wind Direction', value: 'wind_deg', Icon: Wind },
  { label: 'Pressure (hPa)', value: 'pressure', Icon: Gauge },
  { label: 'Sunrise', value: 'sunrise', Icon: Sunrise },
  { label: 'Sunset', value: 'sunset', Icon: Sunset },
] as const
