import { Skeleton } from '@/components/ui/skeleton'

export default function HourlySkeleton() {
  return (
    <div className="flex flex-col gap-5 p-5 rounded-2xl bg-card border border-border/60">
      <div className="flex items-center gap-2.5">
        <Skeleton className="w-1 h-4 rounded-full" />
        <Skeleton className="h-3 w-28 rounded-md" />
      </div>
      <div className="flex gap-2 overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2 shrink-0 w-[72px] py-3 px-2 rounded-xl bg-accent/30">
            <Skeleton className="h-3 w-10 rounded-md" />
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-4 w-8 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
