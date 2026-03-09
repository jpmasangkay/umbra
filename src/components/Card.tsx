/**
 * Card – reusable wrapper used by every dashboard card.
 * Applies a gradient background (light & dark mode), rounded corners,
 * a shadow, and a subtle fade-in animation to its children.
 */
import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
    children: React.ReactNode
    /** Card heading displayed at the top */
    title: string
    /** Extra classes applied to the inner content wrapper */
    childrenClassName?: string
    /** Extra classes applied to the outer card container */
    className?: string
}

export default function Card({children, title, childrenClassName, className}: Props) {
  return (
    <div className={cn("flex flex-col gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden", className)}>
      {title && <h2 className="text-lg font-semibold tracking-tight text-card-foreground">{title}</h2>}
        {/* Content wrapper with a 2-second fade-in animation */}
        <div className={cn("flex-1", childrenClassName, "animate-[fade-in_2s_ease-out_forwards]")}>
          {children}
        </div>
    </div>
  )
}
