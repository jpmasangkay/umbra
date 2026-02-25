import type { Dispatch, SetStateAction } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  mapType: string
  setMapType: Dispatch<SetStateAction<string>>
}

export default function MapTypeDropdown({ mapType, setMapType }: Props) {
  return (
    <Select value={mapType} onValueChange={(value) => setMapType(value)}>
      <SelectTrigger className="w-full sm:w-45 relative z-1000">
        <SelectValue placeholder="Select Map Type" />
      </SelectTrigger>
      <SelectContent position="popper" className="z-1000">
        <SelectGroup>
          {types.map((type) => (
            <SelectItem key={type} value={type} className="capitalize">
              {type.split('_')[0].charAt(0).toUpperCase() + type.split('_')[0].slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const types = [
  'clouds_new',
  'precipitation_new',
  'wind_new',
  'pressure_new',
  'temp_new',
]