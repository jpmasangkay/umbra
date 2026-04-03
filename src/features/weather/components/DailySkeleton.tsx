import { Skeleton } from '@/components/ui/skeleton'

export default function DailySkeleton() {
  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl neu-card">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-1.5 h-4 rounded-full" />
        <Skeleton className="h-3 w-28 rounded-md" />
      </div>
      <div className="flex flex-col gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5 px-3 rounded-xl neu-inset-sm">
            <Skeleton className="h-3 w-9 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-lg" />
            <Skeleton className="h-3 w-24 rounded-md hidden sm:block" />
            <div className="flex-1 flex items-center gap-2.5">
              <Skeleton className="h-3 w-8 rounded-md" />
              <Skeleton className="flex-1 h-1.5 rounded-full" />
              <Skeleton className="h-3 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
