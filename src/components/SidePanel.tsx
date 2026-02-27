import { getAirPollution } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import type { Coordinates } from "@/types";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";

type Props = {
  coordinates: Coordinates;
};

export default function SidePanel({ coordinates }: Props) {
  return (
    <div className="fixed top-0 right-0 z-1001 h-screen w-90 bg-sidebar shadow-md py-8 px-4 overflow-y-scroll">
      <Suspense fallback={null}>
        <AirPollution coordinates={coordinates} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coordinates }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coordinates.lat, coordinates.lon],
    queryFn: () => getAirPollution(coordinates),
  });

  return (
    <div className="flex flex-col gap-4 p-1">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
      <h1 className="text-2xl font-semibold">AQI</h1>
      {Object.entries(data.list[0]?.components).map(([key, value]) => {
        const range = pollutantRanges[key];
        const max = range ? range.poor : 500;
        const quality = getQualityLevel(key, value);
        return (
          <Card key={key} title={""} childrenClassName="flex flex-col gap-2" className="text-lg font-medium hover:scale-105 transition-transform duration-300 gap-0!">
            <div className="flex justify-between">
              <span className="text-lg font-bold capitalize">{key}</span>
              <span className="text-lg font-semibold">{value} μg/m³</span>
            </div>
            <Slider disabled min={0} max={max} value={[Math.min(value, max)]} />
            <div className="flex justify-between text-xs text-zinc-400">
              <span>0</span>
              <span>{max}</span>
            </div>
            <div className="flex justify-between text-xs">
              {qualityLevels.map((level) => (
                <span
                  key={level}
                  className={`px-1.5 py-0.5 rounded ${quality === level ? qualityColors[level] + " text-white" : "text-zinc-400"}`}
                >
                  {level}
                </span>
              ))}
            </div>
          </Card>
        )     
        })}
    </div>
  );
}

const pollutantRanges: Record<string, { good: number; fair: number; moderate: number; poor: number; veryPoor: number }> = {
  so2:   { good: 20,   fair: 80,   moderate: 250,   poor: 350,   veryPoor: 500 },
  no2:   { good: 40,   fair: 70,   moderate: 150,   poor: 200,   veryPoor: 400 },
  no:    { good: 10,   fair: 30,   moderate: 50,    poor: 80,    veryPoor: 150 },
  pm10:  { good: 20,   fair: 50,   moderate: 100,   poor: 200,   veryPoor: 400 },
  pm2_5: { good: 10,   fair: 25,   moderate: 50,    poor: 75,    veryPoor: 150 },
  o3:    { good: 60,   fair: 100,  moderate: 140,   poor: 180,   veryPoor: 300 },
  co:    { good: 4400, fair: 9400, moderate: 12400, poor: 15400, veryPoor: 20000 },
  nh3:   { good: 200,  fair: 400,  moderate: 800,   poor: 1200,  veryPoor: 2000 },
};

const qualityLevels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"] as const;

const qualityColors: Record<string, string> = {
  "Good": "bg-green-500",
  "Fair": "bg-yellow-500",
  "Moderate": "bg-orange-500",
  "Poor": "bg-red-500",
  "Very Poor": "bg-purple-500",
};

function getQualityLevel(key: string, value: number): string {
  const range = pollutantRanges[key];
  if (!range) return "Good";
  if (value <= range.good) return "Good";
  if (value <= range.fair) return "Fair";
  if (value <= range.moderate) return "Moderate";
  if (value <= range.poor) return "Poor";
  return "Very Poor";
}