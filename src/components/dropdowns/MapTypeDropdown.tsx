  import type { Dispatch, SetStateAction } from 'react'
  import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

  type Props = {
    mapType: string
    setMapType: Dispatch<SetStateAction<string>>
  }

  export default function MapTypeDropDown({mapType, setMapType} : Props) {
    return (
      <Select value={mapType} onValueChange={(value) => setMapType(value)}>
        <SelectTrigger className="w-[180px] relative z-[1000]">
          <SelectValue placeholder="Select Location" />
        </SelectTrigger>
        <SelectContent position="popper" className="z-[1000]">
          <SelectGroup>
            {types.map((types) => (
              <SelectItem key={types} value={types} className='capitalize'>
                {types.split('_')[0].charAt(0).toUpperCase() + types.split('_')[0].slice(1)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select> 
    )
  }

  const types = [
    "clouds_new",
    "precipitation_new",
    "wind_new",
    "pressure_new",
    "temp_new"
  ]