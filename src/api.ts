/**
 * Centralised API layer.
 * Every function fetches data from the OpenWeatherMap API and validates
 * the response with a Zod schema so the rest of the app can trust the types.
 */
import { AirPollutionSchema } from "./schemas/airPollutionSchema"
import { locationSchema } from "./schemas/geoCodeSchema"
import { weatherSchema } from "./schemas/weatherSchema"
import { z } from "zod"

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

/**
 * Fetch air pollution / air quality data for the given coordinates.
 * Includes AQI index and individual pollutant concentrations.
 */
export async function getAirPollution({lat, lon} : {lat: number, lon: number}) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    const data = await res.json()
    return AirPollutionSchema.parse(data)
}   
