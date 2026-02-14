import type { Dispatch, SetStateAction } from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

type Props = {
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}

export default function LocationDropDown({location, setLocation} : Props) {
  return (
    <Select value={location} onValueChange={(value) => setLocation(value)}>
      <SelectTrigger className="w-[180px] relative z-[1000]">
        <SelectValue placeholder="Select Location" />
      </SelectTrigger>
      <SelectContent position="popper" className="z-[1000]">
        <SelectGroup>
          {location === "cityName" && (
            <SelectItem value="cityName">Custom</SelectItem>
          )}
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

const locations = [
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Dubai",
  "Singapore",
  "Los Angeles",
  "Hong Kong",
  "Sydney",
  "Barcelona",
  "Rome",
  "Amsterdam",
  "Bangkok",
  "Istanbul",
  "Miami",
  "Toronto",
  "Seoul",
  "Berlin",
  "Madrid",
  "San Francisco",
  "Chicago",
  "Las Vegas",
  "Vienna",
  "Prague",
  "Bali",
  "Maldives",
  "Santorini",
  "Venice",
  "Dublin",
  "Lisbon"
]