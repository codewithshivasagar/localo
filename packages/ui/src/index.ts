export const localoUiPackage = {
  name: "@localo/ui",
  status: "foundation"
} as const;

export interface FoundationComponentProps {
  children?: unknown;
  className?: string;
  style?: Record<string, unknown>;
}

export function Button(_props: FoundationComponentProps) {
  return null;
}

export function Card(_props: FoundationComponentProps) {
  return null;
}
