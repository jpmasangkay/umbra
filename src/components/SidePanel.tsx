import { getAirPollution } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import type { Coordinates } from "@/types";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Info, ArrowLeft } from "lucide-react";
import SidePanelSkeleton from "./skeletons/SidePanelSkeleton";

type SidePanelProps = {
  coordinates: Coordinates;
  open: boolean;
  onClose: () => void;
};

type Props = {
  coordinates: Coordinates;
};

export default function SidePanel({ coordinates, open, onClose }: SidePanelProps) {
  return (
    <div
      className={`fixed top-0 right-0 z-1001 h-screen w-90 bg-sidebar shadow-md py-8 px-4 overflow-y-scroll transition-transform duration-300 lg:translate-x-0 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <Suspense fallback={<SidePanelSkeleton />}>
        <AirPollution coordinates={coordinates} onClose={onClose} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coordinates, onClose }: Props & { onClose: () => void }) {
  const { data } = useSuspenseQuery({
    queryKey: ["pollution", coordinates.lat, coordinates.lon],
    queryFn: () => getAirPollution(coordinates),
  });

  return (
    <div className="flex flex-col gap-4 p-1">
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-accent transition-colors cursor-pointer lg:hidden"
          aria-label="Close side panel"
        >
          <ArrowLeft className="size-5" />
        </button>
        <h1 className="text-2xl font-semibold">Air Pollution</h1>
      </div>
      <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">AQI</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="z-2000">
              <p className="max-w-xs">Air Quality Index. Possible values: 1, 2, 3, 4, 5. Where 1 = Good, 2 = Fair, 3 = Moderate, 4 = Poor, 5 = Very Poor.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      {Object.entries(data.list[0]?.components).map(([key, value]) => {
        const range = pollutantRanges[key];
        const max = range ? range.poor : 500;
        const quality = getQualityLevel(key, value);
        return (
          <Card key={key} title={""} childrenClassName="flex flex-col gap-2" className="text-lg font-medium hover:scale-105 transition-transform duration-300 gap-0!">
            <div className="flex justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold capitalize">{key}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-3.5 w-3.5 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="z-2000">
                      <p>{pollutantNameMapping[key] ?? key}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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

const pollutantNameMapping: Record<string, string> = {
  so2: "Sulfur dioxide",
  no2: "Nitrogen dioxide",
  pm10: "Particulate matter 10",
  pm2_5: "Fine particles matter",
  o3: "Ozone",
  co: "Carbon monoxide",
  no: "Nitrogen monoxide",
  nh3: "Ammonia",
};

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