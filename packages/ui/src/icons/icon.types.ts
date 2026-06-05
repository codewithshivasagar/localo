import type { ComponentType, MouseEventHandler, ReactNode, SVGProps } from 'react';
import type { IconName } from './icon-map';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type IconTone =
  | 'default'
  | 'muted'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'navy'
  | 'white'
  | 'current';

export type IconBackgroundTone =
  | 'none'
  | 'default'
  | 'muted'
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'navy'
  | 'white';

export type IconOutlineTone = Exclude<IconBackgroundTone, 'none'>;

export type IconShape = 'none' | 'square' | 'rounded' | 'circle';

export type CustomIconComponent = ComponentType<
  SVGProps<SVGSVGElement> & {
    size?: number;
    strokeWidth?: number;
  }
>;

export interface IconProps {
  'aria-label'?: string;
  bg?: IconBackgroundTone;
  className?: string;
  customIcon?: CustomIconComponent;
  disabled?: boolean;
  iconClassName?: string;
  iconSize?: IconSize | number;
  name?: IconName;
  onClick?: MouseEventHandler<HTMLElement>;
  outline?: boolean;
  outlineTone?: IconOutlineTone;
  shape?: IconShape;
  size?: IconSize | number;
  strokeWidth?: number;
  svg?: ReactNode;
  title?: string;
  tone?: IconTone;
  wrapperClassName?: string;
  wrapperSize?: IconSize | number;
}
