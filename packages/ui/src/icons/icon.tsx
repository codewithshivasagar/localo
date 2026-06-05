import type { CSSProperties, MouseEventHandler } from 'react';
import { cn } from '../utils/cn';
import { localoIconMap } from './icon-map';
import type {
  IconBackgroundTone,
  IconOutlineTone,
  IconProps,
  IconShape,
  IconSize,
  IconTone
} from './icon.types';

const iconSizePixels: Record<IconSize, number> = {
  xs: 14,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};

const iconToneClasses: Record<IconTone, string> = {
  current: 'text-current',
  danger: 'text-localo-danger',
  default: 'text-localo-text',
  muted: 'text-localo-text-muted',
  navy: 'text-localo-panel',
  primary: 'text-localo-primary',
  success: 'text-localo-success',
  warning: 'text-localo-warning',
  white: 'text-white'
};

const backgroundToneClasses: Record<IconBackgroundTone, string> = {
  danger: 'bg-localo-danger/10',
  default: 'bg-localo-surface',
  muted: 'bg-localo-surface-muted',
  navy: 'bg-localo-panel',
  none: 'bg-transparent',
  primary: 'bg-localo-primary/10',
  success: 'bg-localo-success/10',
  warning: 'bg-localo-warning/10',
  white: 'bg-white'
};

const outlineToneClasses: Record<IconOutlineTone, string> = {
  danger: 'border-localo-danger/40',
  default: 'border-localo-border',
  muted: 'border-localo-border',
  navy: 'border-localo-panel/40',
  primary: 'border-localo-primary/40',
  success: 'border-localo-success/40',
  warning: 'border-localo-warning/40',
  white: 'border-white/70'
};

const shapeClasses: Record<IconShape, string> = {
  circle: 'rounded-full',
  none: 'rounded-none',
  rounded: 'rounded-localo-lg',
  square: 'rounded-localo-md'
};

function resolveSize(size: IconSize | number | undefined, fallback: IconSize): number {
  if (typeof size === 'number') {
    return size;
  }

  return iconSizePixels[size ?? fallback];
}

export function Icon({
  'aria-label': ariaLabel,
  bg = 'none',
  className,
  customIcon: CustomIcon,
  disabled,
  iconClassName,
  iconSize,
  name,
  onClick,
  outline,
  outlineTone = 'default',
  shape = 'none',
  size = 'md',
  strokeWidth = 2,
  svg,
  title,
  tone = 'default',
  wrapperClassName,
  wrapperSize
}: IconProps) {
  const LucideIcon = name ? localoIconMap[name] : undefined;
  const resolvedIconSize = resolveSize(iconSize ?? size, 'md');
  const resolvedWrapperSize = resolveSize(wrapperSize ?? size, 'md');
  const isInteractive = Boolean(onClick);
  const accessibleLabel = ariaLabel ?? title;
  const wrapperStyle: CSSProperties = {
    height: resolvedWrapperSize,
    width: resolvedWrapperSize
  };
  const iconStyle: CSSProperties = {
    height: resolvedIconSize,
    width: resolvedIconSize
  };
  const wrapperClasses = cn(
    'inline-flex shrink-0 items-center justify-center align-middle transition',
    backgroundToneClasses[bg],
    shapeClasses[shape],
    outline && 'border',
    outline && outlineToneClasses[outlineTone],
    isInteractive &&
      'touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-localo-primary focus-visible:ring-offset-2',
    disabled && 'cursor-not-allowed opacity-50',
    !disabled && isInteractive && 'cursor-pointer hover:brightness-95 active:brightness-90',
    iconToneClasses[tone],
    wrapperClassName,
    className
  );
  const iconClasses = cn('shrink-0', iconClassName);
  const renderedIcon = LucideIcon ? (
    <LucideIcon
      aria-hidden="true"
      className={iconClasses}
      color="currentColor"
      focusable="false"
      size={resolvedIconSize}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      style={iconStyle}
    />
  ) : CustomIcon ? (
    <CustomIcon
      aria-hidden="true"
      className={iconClasses}
      color="currentColor"
      focusable="false"
      size={resolvedIconSize}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      style={iconStyle}
    />
  ) : svg ? (
    <span aria-hidden="true" className={iconClasses} style={iconStyle}>
      {svg}
    </span>
  ) : null;

  if (isInteractive) {
    return (
      <button
        aria-label={accessibleLabel ?? 'Icon button'}
        className={wrapperClasses}
        disabled={disabled}
        onClick={onClick as MouseEventHandler<HTMLButtonElement>}
        style={wrapperStyle}
        title={title}
        type="button"
      >
        {renderedIcon}
      </button>
    );
  }

  return (
    <span
      aria-hidden={accessibleLabel ? undefined : true}
      aria-label={accessibleLabel}
      className={wrapperClasses}
      role={accessibleLabel ? 'img' : undefined}
      style={wrapperStyle}
      title={title}
    >
      {renderedIcon}
    </span>
  );
}
