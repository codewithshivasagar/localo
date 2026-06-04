import { Input } from '../input/input';
import type { InputProps } from '../input/input.types';

export function DateInput(props: InputProps) {
  return <Input type="date" {...props} />;
}
