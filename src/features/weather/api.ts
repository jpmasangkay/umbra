/**
 * Weather API – fetches current weather, hourly and daily forecast
 * using the OpenWeatherMap OneCall 3.0 endpoint.
 * Validates the response with a Zod schema.
 */
import { weatherSchema } from "./schema"

/** OpenWeatherMap API key loaded from the .env file via Vite */
const API_KEY = import.meta.env.VITE_API_KEY

/**
 * Fetch current weather, hourly and daily forecast using OneCall 3.0.
 * Returns parsed & validated data (metric units, minutely/alerts excluded).
 */
export async function getWeather({lat, lon} : {lat: number, lon: number}) {
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`)
    const data = await res.json()
    return weatherSchema.parse(data)
}   
