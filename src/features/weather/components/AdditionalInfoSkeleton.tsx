import { Skeleton } from '@/components/ui/skeleton'

export default function AdditionalInfoSkeleton() {
  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl neu-card">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-1.5 h-4 rounded-full" />
        <Skeleton className="h-3 w-24 rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex justify-between items-center py-2.5 px-3 rounded-xl neu-inset-sm">
            <div className="flex items-center gap-3">
              <Skeleton className="size-7 rounded-lg" />
              <Skeleton className="h-3.5 w-28 rounded-md" />
            </div>
            <Skeleton className="h-3.5 w-16 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
