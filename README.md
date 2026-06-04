# Localo Production Starter

Localo is a mobile-first hyperlocal marketplace.

## Build Order

1. Admin
2. Shop Owner
3. Customer

## Apps

- `apps/admin` — desktop-first admin panel
- `apps/partner` — shop owner PWA
- `apps/web` — customer PWA

## Core Commands

```bash
pnpm install
pnpm dev:admin
pnpm dev:partner
pnpm dev:web
pnpm typecheck
pnpm build
```

## Code Rules

- No hardcoded routes
- No hardcoded statuses
- No business logic inside UI components
- Use shared enums/constants
- Use service/repository/domain structure
- Use reusable UI only when reuse is real
