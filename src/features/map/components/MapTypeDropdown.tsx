/**
 * MapTypeDropdown – clean select for weather overlay layers.
 */
import type { Dispatch, SetStateAction } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  mapType: string
  setMapType: Dispatch<SetStateAction<string>>
}

const types = [
  { value: 'clouds_new',       label: 'Clouds'        },
  { value: 'precipitation_new', label: 'Precipitation' },
  { value: 'wind_new',         label: 'Wind'          },
  { value: 'pressure_new',     label: 'Pressure'      },
  { value: 'temp_new',         label: 'Temperature'   },
]

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={value => setMapType(value)}>
      <SelectTrigger className="w-full sm:w-44 h-9 text-sm font-500 rounded-xl border-border/70 relative z-[1000]">
        <SelectValue placeholder="Select overlay" />
      </SelectTrigger>
      <SelectContent position="popper" className="z-[1000] rounded-xl">
        <SelectGroup>
          {types.map(type => (
            <SelectItem key={type.value} value={type.value} className="text-sm font-500">
              {type.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
