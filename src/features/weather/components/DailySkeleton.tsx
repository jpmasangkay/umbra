import { Skeleton } from '@/components/ui/skeleton'

export default function DailySkeleton() {
  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl bg-card border border-border/60">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-1 h-4 rounded-full" />
        <Skeleton className="h-3 w-28 rounded-md" />
      </div>
      <div className="flex flex-col gap-0">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className={`flex items-center gap-3 py-3 ${i < 6 ? 'border-b border-border/30' : ''}`}>
            <Skeleton className="h-3 w-9 rounded-md" />
            <Skeleton className="h-6 w-6 rounded-lg" />
            <Skeleton className="h-3 w-24 rounded-md hidden sm:block" />
            <div className="flex-1 flex items-center gap-2.5">
              <Skeleton className="h-3 w-8 rounded-md" />
              <Skeleton className="flex-1 h-1 rounded-full" />
              <Skeleton className="h-3 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
