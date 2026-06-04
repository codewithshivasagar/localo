# Localo UI Project Structure

## Purpose

This document defines the UI/frontend project structure for Localo so humans, Codex, Claude Code, and future AI agents can build UI in a clean, reusable, phase-based way.

Localo UI must be built after the backend foundation. The first UI stage is not business screens. The first UI stage is documentation, shared packages, theme, API client, and reusable UI components.

---

## Current UI Scope

This document covers only the first UI foundation stages:

```txt
UI-0: UI Documentation
UI-1: Foundation Packages
UI-2: Theme Setup
UI-3: API Client Foundation
UI-4: Shared UI Components
```

Admin app, shop owner app, and public web screens will be planned after this foundation is complete.

---

## Target App Structure

```txt
apps/
├── admin/
├── shop-owner/
└── web/
```

### `apps/admin`

Admin platform operations.

Expected future scope:

```txt
Admin login
Admin dashboard
Shop management
Shop approval/status management
Shop owner assignment
Category management
Support tickets
Commission settings
Commission ledger
Audit logs
Platform settings
```

Admin should be desktop-first and table/form focused.

### `apps/shop-owner`

Shop owner dashboard.

Expected future scope:

```txt
Shop owner login
Dashboard
My shop profile
Location
Business hours
Products
Support tickets
Commission summary
Notifications
```

Shop owner app should be responsive and mobile-friendly.

### `apps/web`

Public/customer discovery website.

Expected future scope:

```txt
Shop listing
Shop detail
Product listing
Product detail
Category browse
Search/filter
Open now filter
Location filter
```

Public web comes after admin/shop-owner workflows because public data depends on approved shops and products.

---

## Target Package Structure

```txt
packages/
├── ui/
├── theme/
├── api-client/
├── shared-types/
├── config/
└── utils/
```

### `packages/ui`

Reusable generic UI components only.

Examples:

```txt
Button
Input
Card
Badge
Dialog
Table primitives
Toast
EmptyState
Sidebar
PageHeader
```

Do not put Localo business-specific components here.

Do not put these in `packages/ui`:

```txt
ShopStatusBadge
ProductForm
ShopsTable
CommissionCard
SupportTicketDetail
AdminSidebarMenu
```

Those belong inside app feature folders.

### `packages/theme`

Design tokens and app-level theme configuration.

Purpose:

```txt
Base Localo theme
Admin theme extension
Shop owner theme extension
Public web theme extension
Tailwind preset
Semantic colors
Status colors
Spacing/radius/shadow tokens
```

### `packages/api-client`

Frontend API client package.

All API calls must go through this package.

No direct `fetch` inside pages or components.

### `packages/shared-types`

Shared TypeScript types and enums.

Rules:

```txt
No React imports
No UI imports
Pure TypeScript only
```

### `packages/utils`

Generic helpers only.

Examples:

```txt
cn
formatDate
formatCurrency
formatPhone
slug helpers
pagination helpers
string helpers
```

No Localo business workflow logic here.

---

## `packages/ui` Structure

```txt
packages/ui/
└── src/
    ├── index.ts
    ├── primitives/
    ├── form-fields/
    ├── layout/
    ├── feedback/
    ├── navigation/
    └── utils/
```

### `primitives`

```txt
packages/ui/src/primitives/
├── button/
├── badge/
├── card/
├── dialog/
├── dropdown/
├── tabs/
├── table/
├── toast/
├── spinner/
├── skeleton/
└── avatar/
```

### `form-fields`

```txt
packages/ui/src/form-fields/
├── input/
├── textarea/
├── select/
├── multi-select/
├── checkbox/
├── switch/
├── radio/
├── search-input/
├── password-input/
├── number-input/
├── email-input/
├── phone-input/
├── date-input/
├── time-input/
├── file-input/
└── form-field/
```

### `layout`

```txt
packages/ui/src/layout/
├── sidebar/
├── topbar/
├── dashboard-shell/
├── page-header/
├── page-container/
└── section/
```

### `feedback`

```txt
packages/ui/src/feedback/
├── empty-state/
├── error-state/
├── loading-state/
├── confirm-dialog/
└── alert/
```

### `navigation`

```txt
packages/ui/src/navigation/
├── breadcrumbs/
├── pagination/
├── nav-item/
└── mobile-nav/
```

### `utils`

```txt
packages/ui/src/utils/
└── cn.ts
```

---

## Component Folder Rule

Each component should use this pattern:

```txt
button/
├── button.tsx
├── button.types.ts
└── index.ts
```

For simple components, `types.ts` is optional.

Every folder should export through its local `index.ts`.

The package root should export public APIs through:

```txt
packages/ui/src/index.ts
```

---

## Template Standard

Next.js route files should stay thin.

Route page:

```txt
apps/admin/src/app/shops/page.tsx
```

should render a template:

```tsx
import { ShopsTemplate } from '@/features/shops';

export default function ShopsPage() {
  return <ShopsTemplate />;
}
```

Feature templates live here:

```txt
apps/admin/src/features/shops/templates/shops-template.tsx
```

A template is a page-level composition component.

It can include:

```txt
Page header
Filters
Table
Dialogs
Pagination
Empty/error/loading states
```

It should not contain low-level reusable UI logic that belongs in `packages/ui`.

---

## Feature Folder Pattern

Example:

```txt
apps/admin/src/features/shops/
├── templates/
│   ├── shops-template.tsx
│   ├── shop-detail-template.tsx
│   └── create-shop-template.tsx
│
├── components/
│   ├── shops-table.tsx
│   ├── shop-form.tsx
│   ├── shop-filters.tsx
│   └── shop-status-badge.tsx
│
├── hooks/
│   ├── use-shops.ts
│   ├── use-shop.ts
│   ├── use-create-shop.ts
│   └── use-update-shop.ts
│
├── schemas/
│   └── shop-form.schema.ts
│
├── utils/
│   └── shop-status-options.ts
│
└── index.ts
```

---

## Import and Alias Rules

Avoid deep relative imports.

Bad:

```tsx
import { Button } from '../../../../packages/ui/src/primitives/button/button';
```

Good:

```tsx
import { Button } from '@localo/ui';
```

Expected package aliases:

```json
{
  "@localo/ui": ["packages/ui/src/index.ts"],
  "@localo/theme": ["packages/theme/src/index.ts"],
  "@localo/api-client": ["packages/api-client/src/index.ts"],
  "@localo/shared-types": ["packages/shared-types/src/index.ts"],
  "@localo/config": ["packages/config/src/index.ts"],
  "@localo/utils": ["packages/utils/src/index.ts"]
}
```

App-local imports should use:

```tsx
import { ShopsTemplate } from '@/features/shops';
import { AdminLayout } from '@/components/admin-layout';
import { routes } from '@/lib/routes';
```

---

## Index File Rules

Every shared package must have:

```txt
src/index.ts
```

Every feature may have:

```txt
index.ts
```

Export only stable/public APIs.

Do not export every internal helper unless required.

Good:

```ts
export * from './templates/shops-template';
export * from './components/shop-status-badge';
export * from './hooks/use-shops';
```

Avoid:

```ts
export * from './utils/internal-map-prisma-error';
```

unless it is truly public for the feature.

---

## UI Data Flow

Every screen should follow this pattern:

```txt
Route page
↓
Feature template
↓
Feature components/hooks
↓
packages/api-client
↓
Backend API
```

Example:

```txt
apps/admin/src/app/shops/page.tsx
↓
ShopsTemplate
↓
useShops()
↓
shopsApi.list()
↓
GET /admin/shops
```

No direct API calls in random components.

---

## First UI Implementation Scope

Only start with:

```txt
UI-0: UI Documentation
UI-1: Foundation Packages
UI-2: Theme Setup
UI-3: API Client Foundation
UI-4: Shared UI Components
```

Do not build admin/shop-owner/public screens during these phases.

---

## Final Principle

UI must be built foundation-first and screen-by-screen.

Do not ask Codex to build the full UI at once.
