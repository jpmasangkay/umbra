/**
 * Zod schema for the OpenWeatherMap Air Pollution API response.
 *
 * Validates the coordinate echo, the AQI index (1–5) and the
 * individual pollutant component concentrations (μg/m³).
 */
import z from "zod";

export const AirPollutionSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  list: z.array(
    z.object({
      dt: z.number(),
      main: z.object({
        aqi: z.number(),
      }),
      components: z.object({
        co: z.number(),
        no: z.number(),
        no2: z.number(),
        o3: z.number(),
        so2: z.number(),
        pm2_5: z.number(),
        pm10: z.number(),
        nh3: z.number(),
      }),
    })
  ),
})
