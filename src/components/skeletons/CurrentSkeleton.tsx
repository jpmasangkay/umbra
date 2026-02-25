import Card from '../cards/Card'
import { Skeleton } from '../ui/skeleton'

export default function CurrentSkeleton() {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6"
    >
      <div className="flex flex-col gap-2 items-center">
        {/* text-6xl font-semibold */}
        <Skeleton className="h-15 w-32" /> 
        
        {/* size-15 icon */}
        <Skeleton className="size-15 rounded-full" /> 
        
        {/* text-xl capitalize */}
        <Skeleton className="h-7 w-40" />
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local Time:</p>
        
        {/* text-4xl font-semibold */}
        <Skeleton className="h-10 w-36 mx-auto" />
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Feels Like</p>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Humidity</p>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-500">Wind</p>
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </Card>
  )
}