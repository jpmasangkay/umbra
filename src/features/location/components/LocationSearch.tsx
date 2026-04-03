/**
 * LocationSearch – neumorphic inset search input with MapPin icon.
 */
import { useState, type Dispatch, type SetStateAction } from 'react'
import { MapPin } from 'lucide-react'

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
    <div className="relative w-full sm:w-56">
      <MapPin
        className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground/50 pointer-events-none"
        strokeWidth={2}
      />
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        onBlur={e => applyLocation(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            e.preventDefault()
            applyLocation(query)
          }
        }}
        placeholder="Search city..."
        className="w-full h-9 pl-8 pr-3 text-sm font-500 bg-background rounded-xl text-foreground placeholder:text-muted-foreground/50 outline-none transition-[box-shadow] relative z-[1000] neu-input"
      />
    </div>
  )
}
