import type { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: ReactNode;
  leftAddon?: ReactNode;
  rightIcon?: ReactNode;
  rightAddon?: ReactNode;
  wrapperClassName?: string;
}
