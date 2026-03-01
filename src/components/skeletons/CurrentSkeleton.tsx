/**
 * CurrentSkeleton – loading placeholder that mirrors the layout of
 * CurrentWeather.tsx.  Shown inside a <Suspense> boundary while the
 * weather API call is in flight.
 */
import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

export default function CurrentSkeleton() {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-1 items-center">
        <Skeleton className="size-16 rounded-full" /> 
        <Skeleton className="h-12 w-32" /> 
        <Skeleton className="h-5 w-40 mt-1" />
      </div>

      <div className="flex flex-col gap-1 items-center">
        <p className="text-sm text-muted-foreground uppercase tracking-wider">Local Time</p>
        <Skeleton className="h-9 w-36" />
      </div>

      <div className="flex justify-between w-full pt-4 border-t border-border/50">
        <div className="flex flex-col gap-1 items-center flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Feels Like</p>
          <Skeleton className="h-6 w-14" />
        </div>
        <div className="flex flex-col gap-1 items-center flex-1 border-x border-border/50">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Humidity</p>
          <Skeleton className="h-6 w-14" />
        </div>
        <div className="flex flex-col gap-1 items-center flex-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">Wind</p>
          <Skeleton className="h-6 w-14" />
        </div>
      </div>
    </Card>
  )
}
