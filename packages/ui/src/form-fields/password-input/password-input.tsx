'use client';

import { useState } from 'react';
import { Button } from '../../primitives/button';
import { Input } from '../input/input';
import type { InputProps } from '../input/input.types';

export interface PasswordInputProps extends Omit<InputProps, 'rightAddon' | 'type'> {
  hideLabel?: string;
  showLabel?: string;
  showToggleLabel?: boolean;
}

export function PasswordInput({
  hideLabel = 'Hide',
  showLabel = 'Show',
  showToggleLabel = true,
  ...props
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Input
      autoComplete="current-password"
      rightAddon={
        <Button
          aria-label={isVisible ? hideLabel : showLabel}
          className="-mr-1 min-h-10 px-2 text-xs"
          onClick={() => setIsVisible((value) => !value)}
          type="button"
          variant="ghost"
        >
          {showToggleLabel ? (isVisible ? hideLabel : showLabel) : <span aria-hidden="true">•••</span>}
        </Button>
      }
      type={isVisible ? 'text' : 'password'}
      {...props}
    />
  );
}
