import { Input } from '../input/input';
import type { InputProps } from '../input/input.types';

export function FileInput(props: InputProps) {
  return <Input type="file" {...props} />;
}
