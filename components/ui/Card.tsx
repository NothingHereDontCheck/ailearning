import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  featured?: boolean
  hover?: boolean
}

export function Card({ featured = false, hover = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'bg-surface border border-[var(--border)]',
        featured ? 'shadow-[6px_6px_0_var(--border2)]' : '',
        hover ? 'transition-colors duration-200 hover:bg-bg' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
