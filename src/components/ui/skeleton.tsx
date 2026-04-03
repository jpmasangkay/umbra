import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("rounded-md animate-neu-pulse", className)}
      style={{ background: 'var(--background)', boxShadow: 'var(--neu-inset-sm)' }}
      {...props}
    />
  )
}

export { Skeleton }
