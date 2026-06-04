import { Input } from '../input/input';
import type { InputProps } from '../input/input.types';

export function EmailInput(props: InputProps) {
  return <Input autoComplete="email" inputMode="email" type="email" {...props} />;
}
