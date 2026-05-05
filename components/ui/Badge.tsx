type BadgeColor = 'default' | 'accent' | 'blue' | 'green' | 'gold' | 'purple'

interface BadgeProps {
  color?: BadgeColor
  children: React.ReactNode
  className?: string
}

const colorStyles: Record<BadgeColor, string> = {
  default: 'bg-bg2 border-border text-muted',
  accent: 'bg-[rgba(200,64,26,0.08)] border-[rgba(200,64,26,0.2)] text-accent',
  blue: 'bg-[rgba(26,108,200,0.08)] border-[rgba(26,108,200,0.2)] text-accent2',
  green: 'bg-[rgba(26,140,90,0.08)] border-[rgba(26,140,90,0.2)] text-accent3',
  gold: 'bg-[rgba(200,150,26,0.08)] border-[rgba(200,150,26,0.2)] text-gold',
  purple: 'bg-[rgba(140,26,200,0.08)] border-[rgba(140,26,200,0.2)] text-accent4',
}

export function Badge({ color = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-block font-mono text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 border ${colorStyles[color]} ${className}`}
    >
      {children}
    </span>
  )
}
