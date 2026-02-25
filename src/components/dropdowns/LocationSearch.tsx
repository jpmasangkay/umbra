import { useState, type Dispatch, type SetStateAction } from 'react'
import { Input } from '../ui/input'

type Props = {
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}

export default function LocationSearch({ location, setLocation }: Props) {
  const [query, setQuery] = useState(location === 'cityName' ? '' : location)

  const applyLocation = (value: string) => {
    const normalizedValue = value.trim()

    if (!normalizedValue) {
      setQuery(location === 'cityName' ? '' : location)
      return
    }

    setLocation(normalizedValue)
  }

  return (
    <Input
      value={query}
      onChange={(event) => setQuery(event.target.value)}
      onBlur={(event) => applyLocation(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault()
          applyLocation(query)
        }
      }}
      placeholder="Enter a Location"
      className="w-full sm:w-55 relative z-1000"
    />
  )
}
