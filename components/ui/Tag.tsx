interface TagProps {
  children: React.ReactNode
  className?: string
}

export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-block font-mono text-[10px] tracking-[0.05em] px-2.5 py-1 bg-bg2 border border-border text-ink2 ${className}`}
    >
      {children}
    </span>
  )
}
