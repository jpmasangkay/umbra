/**
 * SidePanelSkeleton – loading placeholder for the air pollution SidePanel.
 * Mirrors the heading, AQI value, AQI label, and 8 pollutant cards
 * (each with a slider, min/max, and quality-level pills).
 */
import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

/** Number of pollutant card skeletons to render */
const CARD_COUNT = 8;

export default function SidePanelSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-1">
      {/* "Air Pollution" heading */}
      <Skeleton className="h-8 w-40" />

      {/* AQI large number */}
      <Skeleton className="h-12 w-16" />

      {/* "AQI" label + info icon */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-14" />
        <Skeleton className="size-4 rounded-full" />
      </div>

      {/* Pollutant cards */}
      {Array.from({ length: CARD_COUNT }).map((_, i) => (
        <Card
          key={i}
          title=""
          childrenClassName="flex flex-col gap-2"
          className="text-lg font-medium gap-0!"
        >
          {/* Name + value row */}
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="size-3.5 rounded-full" />
            </div>
            <Skeleton className="h-5 w-24" />
          </div>

          {/* Slider */}
          <Skeleton className="h-2 w-full rounded-full" />

          {/* Min / max labels */}
          <div className="flex justify-between">
            <Skeleton className="h-3 w-4" />
            <Skeleton className="h-3 w-8" />
          </div>

          {/* Quality level pills */}
          <div className="flex justify-between">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="h-5 w-12 rounded" />
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
