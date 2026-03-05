/**
 * Card – reusable wrapper used by every dashboard card.
 * Features glassmorphism with backdrop blur, gradient borders,
 * smooth hover effects, and fade-in animation.
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
    /** Enable gradient border and enhanced hover effects */
    glassmorphic?: boolean
}

export default function Card({children, title, childrenClassName, className, glassmorphic = true}: Props) {
  return (
    <div className={cn(
      "flex flex-col gap-4 p-5 rounded-2xl overflow-hidden",
      glassmorphic 
        ? "glass-card-gradient glass-card-hover" 
        : "bg-card border border-border/50 shadow-sm",
      className
    )}>
      {title && (
        <h2 className="text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
          {title}
        </h2>
      )}
      {/* Content wrapper with a 2-second fade-in animation */}
      <div className={cn("flex-1", childrenClassName, "animate-[fade-in_2s_ease-out_forwards]")}>
        {children}
      </div>
    </div>
  )
}
