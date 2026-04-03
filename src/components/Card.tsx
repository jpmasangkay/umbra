/**
 * Card – base card shell used throughout the dashboard.
 * Neumorphic raised surface with soft shadow definition.
 */
import React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  title: string
  childrenClassName?: string
  className?: string
}

export default function Card({ children, title, childrenClassName, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 p-5 rounded-2xl overflow-hidden neu-card',
        className
      )}
    >
      {title && (
        <div className="flex items-center gap-2.5">
          <span className="w-1.5 h-4 rounded-full shrink-0 neu-inset-sm" />
          <h2 className="text-xs font-700 uppercase tracking-[0.12em] text-muted-foreground">
            {title}
          </h2>
        </div>
      )}
      <div
        className={cn(
          'flex-1 animate-[fade-up_0.5s_cubic-bezier(0.16,1,0.3,1)_both]',
          childrenClassName
        )}
      >
        {children}
      </div>
    </div>
  )
}
