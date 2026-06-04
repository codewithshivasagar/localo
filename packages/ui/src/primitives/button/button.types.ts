import type { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'muted';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: false;
  fullWidth?: boolean;
  isLoading?: boolean;
  loadingLabel?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
}
