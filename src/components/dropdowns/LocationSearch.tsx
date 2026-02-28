/**
 * LocationSearch – text input that lets the user search for a city.
 *
 * Maintains its own local `query` state to allow free typing.
 * The parent’s `setLocation` is only called on Enter or blur so we
 * avoid firing a geocode request on every keystroke.
 * If the input is cleared, it reverts to the last valid location.
 */
import { useState, type Dispatch, type SetStateAction } from 'react'
import { Input } from '../ui/input'

type Props = {
  /** Current location string held by the parent */
  location: string
  /** Callback to update the parent’s location state */
  setLocation: Dispatch<SetStateAction<string>>
}

export default function LocationSearch({ location, setLocation }: Props) {
  // Local query mirrors the input; synced to parent only on commit
  const [query, setQuery] = useState(location === 'cityName' ? '' : location)

  /** Trim the value and commit it, or revert if empty. */
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
