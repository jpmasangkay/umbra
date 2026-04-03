import { Skeleton } from '@/components/ui/skeleton'

export default function CurrentSkeleton() {
  return (
    <div className="neu-card rounded-2xl p-5 flex flex-col gap-5 h-full">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-1.5 h-4 rounded-full" />
        <Skeleton className="h-3 w-32 rounded-md" />
      </div>
      <div className="flex items-start justify-between gap-4 flex-1">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-20 w-40 rounded-xl" />
          <Skeleton className="h-4 w-28 rounded-md" />
        </div>
        <div className="flex flex-col items-end gap-3">
          <Skeleton className="h-14 w-14 rounded-xl" />
          <Skeleton className="h-5 w-20 rounded-md" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
      </div>
      <div className="h-[2px] rounded-full neu-inset-sm" />
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 py-2.5 px-3 rounded-xl neu-inset-sm">
            <Skeleton className="h-2.5 w-12 rounded-md" />
            <Skeleton className="h-6 w-10 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
