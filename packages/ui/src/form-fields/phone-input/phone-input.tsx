import { Input } from '../input/input';
import type { InputProps } from '../input/input.types';

export function PhoneInput(props: InputProps) {
  return <Input autoComplete="tel" inputMode="tel" type="tel" {...props} />;
}
