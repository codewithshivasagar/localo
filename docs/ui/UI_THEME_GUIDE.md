# Localo UI Theme Guide

## Purpose

This document defines the Localo theme strategy.

Localo should use one shared base theme by default, with flexibility to override per app later.

---

## Theme Package

Theme code lives in:

```txt
packages/theme/
```

Recommended structure:

```txt
packages/theme/
└── src/
    ├── index.ts
    ├── tokens.ts
    ├── colors.ts
    ├── typography.ts
    ├── spacing.ts
    ├── radius.ts
    ├── shadows.ts
    ├── app-themes.ts
    └── tailwind-preset.ts
```

---

## Theme Strategy

By default all apps use the same Localo base theme:

```txt
Admin       → Localo base theme
Shop Owner  → Localo base theme
Public Web  → Localo base theme
```

But each app must be able to override theme tokens later:

```txt
Admin       → dashboard/data-table focused
Shop Owner  → action-friendly/mobile-friendly
Public Web  → discovery/customer-focused
```

---

## Theme Exports

Expected exports:

```ts
export * from './tokens';
export * from './colors';
export * from './typography';
export * from './spacing';
export * from './radius';
export * from './shadows';
export * from './app-themes';
export * from './tailwind-preset';
```

---

## Base Theme Shape

```ts
export const localoBaseTheme = {
  colors: {
    primary: '',
    primaryForeground: '',
    background: '',
    surface: '',
    surfaceMuted: '',
    text: '',
    textMuted: '',
    border: '',
    success: '',
    warning: '',
    danger: '',
    info: '',
  },
  typography: {
    fontSans: '',
    headingWeight: '',
    bodyWeight: '',
  },
  spacing: {
    pageX: '',
    pageY: '',
    sectionY: '',
    cardPadding: '',
  },
  radius: {
    sm: '',
    md: '',
    lg: '',
    xl: '',
    full: '',
  },
  shadows: {
    sm: '',
    md: '',
    lg: '',
  },
};
```

Exact values can be finalized in UI-2.

---

## App Themes

```ts
export const localoAppThemes = {
  admin: {
    ...localoBaseTheme,
  },
  shopOwner: {
    ...localoBaseTheme,
  },
  publicWeb: {
    ...localoBaseTheme,
  },
};
```

For now, all three may be identical.

Later, app-specific overrides can change:

```txt
Primary color
Sidebar background
Card style
Status color intensity
Mobile navigation style
Public shop card style
```

---

## Semantic Color Rules

Use semantic names, not one-off colors.

Good:

```txt
primary
surface
surfaceMuted
border
textMuted
success
warning
danger
info
```

Bad:

```txt
blue500
randomOrange
myGreen
```

Raw palette colors can exist internally, but components should use semantic tokens.

---

## Status Colors

Localo needs consistent status colors for:

```txt
Shop status
Product status
Support ticket status
Payment status
Notification status
Commission status
```

Use shared semantic status tokens:

```txt
statusActive
statusPending
statusApproved
statusRejected
statusPaused
statusDraft
statusArchived
statusSuccess
statusWarning
statusDanger
statusInfo
```

Business status badges should be built inside feature folders later.

---

## Tailwind Preset

The theme package should expose a Tailwind preset if the repo uses Tailwind.

Expected file:

```txt
packages/theme/src/tailwind-preset.ts
```

Apps can consume it later.

The preset should expose:

```txt
colors
borderRadius
boxShadow
spacing
fontFamily
```

---

## CSS Variables Strategy

Prefer CSS variables for app-level theme switching.

Example variables:

```css
:root {
  --localo-color-primary: ...;
  --localo-color-background: ...;
  --localo-color-surface: ...;
  --localo-color-border: ...;
  --localo-radius-md: ...;
}
```

App-level themes can override these variables later.

---

## Hardcoded Style Rule

Do not hardcode random colors in app screens.

Bad:

```tsx
<div className="bg-blue-600 text-white" />
```

Better:

```tsx
<Button variant="primary" />
```

or approved token class.

---

## Theme and UI Separation

`packages/theme` owns tokens.

`packages/ui` owns reusable components.

Do not put components in `packages/theme`.

Do not put theme tokens only inside `packages/ui`.

---

## Theme Setup Phase

UI-2 should implement:

```txt
packages/theme structure
Base token exports
App theme exports
Tailwind preset foundation
CSS variable helper/foundation
Index exports
Type-safe theme objects
```

No business screens should be built in UI-2.

---

## Final Principle

Theme first, screens later.

All apps use one Localo base theme by default, with clean app-level override flexibility.
