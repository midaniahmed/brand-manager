import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'destructive' | 'ghost' | 'gradient' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden';

  const variants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-glow-sm active:scale-[0.98] rounded-xl',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] rounded-xl',
    success: 'bg-success text-success-foreground hover:bg-success/90 hover:shadow-glow-success active:scale-[0.98] rounded-xl',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-glow-destructive active:scale-[0.98] rounded-xl',
    ghost: 'hover:bg-secondary hover:text-secondary-foreground active:scale-[0.98] rounded-xl',
    gradient: 'gradient-primary text-white hover:shadow-glow animate-gradient-shift bg-[length:200%_200%] rounded-xl active:scale-[0.98]',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground active:scale-[0.98] rounded-xl',
  };

  const sizes = {
    sm: 'h-9 px-4 text-sm gap-2',
    md: 'h-11 px-6 text-base gap-2',
    lg: 'h-14 px-8 text-lg gap-3',
    icon: 'h-10 w-10',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {/* Shimmer effect on hover */}
      <span className="absolute inset-0 opacity-0 hover:opacity-100">
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-700" />
      </span>

      {/* Content */}
      <span className="relative flex items-center gap-2">
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </span>
    </motion.button>
  );
}
