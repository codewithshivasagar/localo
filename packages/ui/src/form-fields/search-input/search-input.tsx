import type { InputProps } from '../input/input.types';
import { Input } from '../input/input';

export function SearchInput(props: InputProps) {
  return <Input autoComplete="off" inputMode="search" leftAddon="⌕" type="search" {...props} />;
}
