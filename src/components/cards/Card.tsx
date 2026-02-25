import React from 'react'
import { cn } from '../../lib/utils'

type Props = {
    children: React.ReactNode
    title: string
    childrenClassName?: string
    className?: string
}

export default function Card({children, title, childrenClassName, className}: Props) {
  return (
    <div className={cn("flex flex-col gap-4 p-4 rounded-xl bg-linear-to-br from-zinc-800 to-zinc-900 shadow-md overflow-hidden", className)}>
      <h2 className="text-2xl font-semibold">{title}</h2>
        <div className={cn(childrenClassName, "animate-[fade-in_3s_ease-out_forwards]")}>
          {children}
        </div>
    </div>
  )
}