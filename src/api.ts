import { locationSchema } from "./schemas/geoCodeSchema"
import { weatherSchema } from "./schemas/weatherSchema"
import { z } from "zod"

const API_KEY = import.meta.env.VITE_API_KEY

export async function getWeather({lat, lon} : {lat: number, lon: number}) {
    const res = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${API_KEY}`)
    const data = await res.json()
    return weatherSchema.parse(data)
}   

export async function getGeocode(location: string) {
    const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${API_KEY}`)
    const data = await res.json()
    // Parse as an array of locations
    return z.array(locationSchema).parse(data)
}