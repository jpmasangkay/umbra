/**
 * Card – reusable wrapper used by every dashboard card.
 * Applies a gradient background (light & dark mode), rounded corners,
 * a shadow, and a subtle fade-in animation to its children.
 */
import React from 'react'
import { cn } from '../../lib/utils'

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
    <div className={cn(
      "flex flex-col gap-4 p-5 rounded-2xl border border-border/50 bg-card text-card-foreground shadow-sm overflow-hidden",
      className
    )}>
      {title && (
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
      )}
      <div className={cn(childrenClassName, "animate-[fade-in_0.6s_ease-out_forwards]")}>
        {children}
      </div>
    </div>
  )
}
