import { Skeleton } from '@/components/ui/skeleton'

export default function SidePanelSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-1 h-4 rounded-full" />
        <Skeleton className="h-3 w-24 rounded-md" />
      </div>
      {/* AQI hero glass card skeleton */}
      <div className="rounded-2xl border border-border/50 p-5 flex flex-col gap-3">
        <Skeleton className="h-2.5 w-28 rounded-md" />
        <div className="flex items-baseline gap-2">
          <Skeleton className="h-14 w-12 rounded-xl" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="flex-1 h-1 rounded-full" />
          ))}
        </div>
      </div>
      {/* Pollutant cards */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-2.5 p-4 rounded-xl border border-border/50">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-12 rounded-md" />
              <Skeleton className="size-3 rounded-full" />
            </div>
            <Skeleton className="h-4 w-20 rounded-md" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
          <div className="flex justify-between">
            <Skeleton className="h-2.5 w-4 rounded-md" />
            <Skeleton className="h-2.5 w-8 rounded-md" />
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <Skeleton key={j} className="flex-1 h-5 rounded-md" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
