import { type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'nav'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-accent text-white font-semibold',
    'hover:bg-[#a83314] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(200,64,26,0.25)]',
    'transition-all duration-200',
  ].join(' '),
  outline: [
    'bg-transparent text-ink2 font-medium',
    'border border-[1.5px] border-border2',
    'hover:border-ink hover:text-ink',
    'transition-all duration-200',
  ].join(' '),
  ghost: [
    'bg-transparent text-muted font-medium',
    'hover:text-ink',
    'transition-colors duration-200',
  ].join(' '),
  nav: [
    'bg-accent text-white font-semibold text-xs tracking-[0.05em]',
    'hover:bg-[#a83314] hover:-translate-y-px',
    'transition-all duration-200',
  ].join(' '),
}

const sizeStyles = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-7 py-3 text-[13px]',
  lg: 'px-8 py-4 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center cursor-pointer rounded-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
