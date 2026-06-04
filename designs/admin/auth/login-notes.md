# Localo Admin Login Design Notes

## Purpose

These files are visual references for implementing the Localo Admin login screen.

Design files:

```txt
designs/admin/auth/login-design.png
designs/admin/auth/login-mobile-design.png
designs/admin/auth/login-notes.md
```

## Important

These are reference designs only. Do not place the entire screenshot into the UI.

The screen must be implemented using React components, shared UI primitives, Localo theme tokens, and real assets from `@localo/assets`.

## Visual Direction

The Localo Admin login screen should feel:

```txt
Premium
Clean
Secure
Business/dashboard focused
Professional
Not playful
Not crowded
```

## Theme

Use the Localo brand theme:

```txt
Primary Green: #16A34A
Teal: #0D9488
Deep Navy: #0F172A
Amber: #F59E0B
Light Gray: #F2F4F7
Charcoal: #111827
Typography: Poppins
```

## Desktop Layout

Use a split layout:

```txt
Left panel  → Localo brand, platform message, key value points
Right panel → Login card
```

Recommended left panel copy:

```txt
Localo Admin

Manage local shops, products, support, commissions, and platform operations from one secure dashboard.
```

Feature points:

```txt
Shop approvals
Catalog control
Support operations
Commission tracking
```

## Mobile Layout

Mobile should be simple:

```txt
Logo/brand at top
Centered login card
No heavy left panel
Comfortable spacing
Touch-friendly fields and button
```

## Login Card Copy

```txt
Title:
Welcome back

Subtitle:
Sign in to continue to Localo Admin.

Email label:
Email address

Password label:
Password

Button:
Sign in

Loading:
Signing in...

Security note:
Admin access only. Unauthorized access is restricted.

Invalid login:
Invalid email or password.

Non-admin:
You do not have permission to access the Admin Panel.
```

## UX States

Required states:

```txt
Default
Loading
Invalid credentials
Non-admin unauthorized
Network/API error
Disabled submit while submitting
```

## Field Rules

```txt
Email is required
Email must be valid
Password is required
Password field should support show/hide
Inputs should be at least 40–44px tall
Labels should be visible; do not rely only on placeholders
```

## Implementation Rules

```txt
Route files must stay thin
Use templates and blocks
Use AdminRoutes enum for redirects
Use @localo/ui primitives
Use @localo/theme tokens
Use @localo/api-client for auth calls
Use @localo/assets for images
Do not hardcode random colors
Do not call fetch directly inside UI
Do not add forgot-password, signup, OTP, magic link, or social login yet
```

## Suggested Assets

Use assets from:

```txt
packages/assets/public/localo/auth/
```

Expected references:

```txt
localoAuthAssets.shopIllustration
localoAuthAssets.adminDashboardIllustration
localoAuthAssets.securityShield
localoAuthAssets.shopApprovalsIcon
localoAuthAssets.catalogControlIcon
localoAuthAssets.supportOperationsIcon
localoAuthAssets.commissionTrackingIcon
```

## Suggested Feature Structure

```txt
apps/admin/src/features/auth/
├── templates/
│   ├── login-template.tsx
│   └── unauthorized-template.tsx
├── blocks/
│   ├── login-form.tsx
│   ├── auth-card.tsx
│   └── auth-brand-panel.tsx
├── hooks/
│   ├── use-admin-login.ts
│   ├── use-admin-logout.ts
│   └── use-current-admin.ts
├── schemas/
│   └── login.schema.ts
├── config/
│   └── admin-auth.constants.ts
└── index.ts
```

## Do Not Build Yet Unless Phase Requires

```txt
Admin shops UI
Category UI
Support UI
Commission UI
Audit logs UI
Shop owner UI
Public web UI
Forgot password
Admin registration
```
