/**
 * Air Pollution API – fetches air quality data for given coordinates
 * using the OpenWeatherMap Air Pollution endpoint.
 * Validates the response with a Zod schema.
 */
import { AirPollutionSchema } from "./schema"

/** OpenWeatherMap API key loaded from the .env file via Vite */
const API_KEY = import.meta.env.VITE_API_KEY

/**
 * Fetch air pollution / air quality data for the given coordinates.
 * Includes AQI index and individual pollutant concentrations.
 */
export async function getAirPollution({lat, lon} : {lat: number, lon: number}) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    const data = await res.json()
    return AirPollutionSchema.parse(data)
}   
