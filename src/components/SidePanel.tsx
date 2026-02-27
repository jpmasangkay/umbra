import { getAirPollution } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import type { Coordinates } from "@/types";
import Card from "./cards/Card";

type Props = {
  coordinates: Coordinates;
};

export default function SidePanel({ coordinates }: Props) {
  return (
    <div className="fixed top-0 right-0 z-1001 h-screen w-80 bg-sidebar shadow-md">
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
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-5xl font-semibold">{data.list[0].main.aqi}</h1>
      {Object.entries(data.list[0]?.components).map(([key, value]) => {
        return (
          <Card key={key} title={key.toUpperCase()} childrenClassName="text-lg font-medium">
            <span className="text-lg font-bold capitalize">{key}</span>
            <span className="text-lg font-semibold">{value} μg/m³</span>
          </Card>
        )     
        })}
    </div>
  );
}