import type { Config } from 'tailwindcss';
import { localoTailwindPreset } from '@localo/theme';

const config = {
  presets: [localoTailwindPreset],
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    '../../packages/theme/src/**/*.{ts,tsx}',
    '../../packages/assets/src/**/*.{ts,tsx}'
  ]
} satisfies Config;

export default config;
