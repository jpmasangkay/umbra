import { useSuspenseQuery } from '@tanstack/react-query'
import Card from './Card'
import { getWeather } from '../../api'
import { Cloud, Sun, Wind, Gauge, Sunrise, Sunset } from 'lucide-react'
import type { Coordinates } from '../../types'

type Props = {
    coordinates: Coordinates
}

export default function AdditionalInfo({coordinates}: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['weather', coordinates],
    queryFn: () => getWeather({lat: coordinates.lat, lon: coordinates.lon})
  })
  
  return (
    <Card title="Additional Info" childrenClassName="flex flex-col gap-8">
      {rows.map(({label, value, Icon}) => (
        <div key={value} className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icon className="size-8 text-white" />
            <span className="text-gray-500">{label}</span>
          </div>
          <span className="font-semibold">
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

function FormatComponent({field, value}: {field: string, value: number}) {
    if(field === 'sunrise' || field === 'sunset') {
        return new Intl.DateTimeFormat("en-PH", {
            hour: "numeric", 
            minute: "2-digit",
            hour12: true
        }).format(value * 1000)
    }

    if(field === 'wind_deg') {
        return <Wind className="size-5" style={{transform: `rotate(${value + 90}deg)`}} />
    }
    return value
}

const rows = [
    {
      label: "Cloudiness (%)",
      value: "clouds",
      Icon: Cloud,
    },
    {
      label: "UV Index",
      value: "uvi",
      Icon: Sun,
    },
    {
      label: "Wind Direction",
      value: "wind_deg",
      Icon: Wind,
    },
    {
      label: "Pressure (hPa)",
      value: "pressure",
      Icon: Gauge,
    },
    {
      label: "Sunrise",
      value: "sunrise",
      Icon: Sunrise,
    },
    {
      label: "Sunset",
      value: "sunset",
      Icon: Sunset,
    },
] as const