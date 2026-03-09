/**
 * Location API – converts a city / location name into geographic coordinates
 * using the OpenWeatherMap Geocoding API.
 * Validates the response with a Zod schema.
 */
import { locationSchema } from "./schema"
import { z } from "zod"

/** OpenWeatherMap API key loaded from the .env file via Vite */
const API_KEY = import.meta.env.VITE_API_KEY

/**
 * Convert a city / location name into geographic coordinates.
 * Returns an array of matching locations (limited to 1 result).
 */
export async function getGeocode(location: string) {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`)
    const data = await res.json()
    // Parse as an array of locations
    return z.array(locationSchema).parse(data)
}
