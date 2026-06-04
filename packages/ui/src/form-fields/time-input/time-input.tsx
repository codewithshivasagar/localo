import { Input } from '../input/input';
import type { InputProps } from '../input/input.types';

export function TimeInput(props: InputProps) {
  return <Input type="time" {...props} />;
}
