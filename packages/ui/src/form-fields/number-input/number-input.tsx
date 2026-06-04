import { Input } from '../input/input';
import type { InputProps } from '../input/input.types';

export function NumberInput(props: InputProps) {
  return <Input inputMode="decimal" type="number" {...props} />;
}
