/**
 * Zod schema for a single result from the OpenWeatherMap
 * Geocoding API (geo/1.0/direct).
 *
 * Fields like `local_names` and `state` are optional because
 * the API only returns them when data is available.
 */
import { z } from "zod";

export const locationSchema = z.object({
  name: z.string(),
  local_names: z.record(z.string(), z.string()).optional(),
  lat: z.number(),
  lon: z.number(),
  country: z.string(),
  state: z.string().optional(),
});

export type LocationData = z.infer<typeof locationSchema>;