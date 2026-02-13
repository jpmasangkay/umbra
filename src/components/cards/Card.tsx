import React from 'react'

type Props = {
    children: React.ReactNode
    title: string
    childrenClassName?: string
}

export default function Card({children, title, childrenClassName}: Props) {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-xl bg-linear-to-br from-zinc-800 to-zinc-900 shadow-md overflow-hidden">
      <h2 className="text-2xl font-semibold">{title}</h2>
        <div className={childrenClassName}>{children}</div>
    </div>
  )
}