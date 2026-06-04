import type { HTMLAttributes, ImgHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  fallback?: string;
  src?: string | null;
  alt?: string;
}

export function Avatar({ alt = '', className, fallback, src, ...props }: AvatarProps) {
  return (
    <div
      className={cn('inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-localo-full bg-localo-surface-muted text-sm font-bold text-localo-text', className)}
      {...props}
    >
      {src ? <img alt={alt} className="h-full w-full object-cover" src={src} /> : <span>{fallback}</span>}
    </div>
  );
}

export function AvatarImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  return <img className={cn('h-full w-full object-cover', props.className)} {...props} />;
}

export function AvatarFallback({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn('text-sm font-bold text-localo-text', className)} {...props} />;
}
