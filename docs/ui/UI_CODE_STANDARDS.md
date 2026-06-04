# Localo UI Code Standards

## Purpose

This document defines Localo frontend/UI coding standards for Codex, Claude Code, ChatGPT, and human developers.

The goal is to avoid messy UI, duplicated API calls, hardcoded design, inconsistent forms, and random folder structure.

---

## Core Rules

```txt
Thin route pages
Feature-based folders
Templates for page-level composition
Shared UI primitives in packages/ui
Theme tokens in packages/theme
All API calls through packages/api-client
Forms use React Hook Form + Zod
Server state uses TanStack Query
Tables use consistent loading/error/empty states
Role protection per app
No random hardcoded styles
No direct fetch inside components
Codex works one screen/component phase at a time
```

---

## Page, Template, and Component Rules

### Route Page

A route page should be thin.

Good:

```tsx
import { ShopsTemplate } from '@/features/shops';

export default function ShopsPage() {
  return <ShopsTemplate />;
}
```

Bad:

```tsx
export default function ShopsPage() {
  // 400 lines of table, fetch, form, modal, and business logic
}
```

### Template

A template is the page-level composition component.

Templates live in:

```txt
features/<feature>/templates/
```

Templates may coordinate:

```txt
PageHeader
Filters
Tables
Dialogs
Pagination
Loading state
Error state
Empty state
```

### Feature Components

Feature-specific components live in the feature folder.

Examples:

```txt
apps/admin/src/features/shops/components/shops-table.tsx
apps/shop-owner/src/features/products/components/product-form.tsx
```

### Shared UI Components

Generic components live in:

```txt
packages/ui
```

Examples:

```txt
Button
Input
Card
Badge
Dialog
Table primitives
Toast
Sidebar
```

---

## Component Levels

Use three levels:

```txt
1. UI primitives
2. Feature components
3. Templates
```

### UI primitives

Generic and reusable across apps.

### Feature components

Business-aware but feature-scoped.

### Templates

Page-level composition.

---

## API Rules

No direct `fetch` in pages or components.

Bad:

```ts
fetch('/admin/shops')
```

Good:

```ts
shopsApi.list(filters)
```

All API calls must go through:

```txt
packages/api-client
```

UI data flow:

```txt
Page
↓
Template
↓
Feature hook/component
↓
api-client
↓
Backend API
```

---

## State Management Rules

### Server State

Use TanStack Query for:

```txt
shops
products
categories
support tickets
commission ledger
notifications
audit logs
```

### Form State

Use React Hook Form + Zod.

### UI State

Use local React state for:

```txt
Dialog open/close
Selected tab
Sidebar collapsed
Filter drawer open
```

### Auth State

Keep token and current-user logic centralized.

Do not scatter auth logic across components.

---

## Form Standards

Every important form should have:

```txt
Zod schema
React Hook Form
Default values
Validation messages
Submit loading state
API error handling
Success toast
Cancel/back behavior
```

Suggested structure:

```txt
features/shops/
├── schemas/
│   └── shop-form.schema.ts
├── components/
│   └── shop-form.tsx
└── hooks/
    └── use-create-shop.ts
```

No large uncontrolled forms.

---

## Table Standards

Every data table should support where needed:

```txt
Search
Filters
Pagination
Loading state
Empty state
Error state
Row actions
Status badges
```

Use table primitives from `packages/ui`.

Use TanStack Table for complex admin tables when needed.

---

## Theme Rules

Use:

```txt
packages/theme
```

for tokens.

Use:

```txt
packages/ui
```

for components.

Do not hardcode random colors.

Bad:

```tsx
className="bg-blue-600 text-white"
```

Better:

```tsx
<Button variant="primary" />
```

or use approved theme token classes.

---

## Naming Rules

### Files

Use kebab-case:

```txt
shops-table.tsx
shop-form.tsx
use-shops.ts
shop-form.schema.ts
```

### Components

Use PascalCase:

```txt
ShopsTable
ShopForm
ShopStatusBadge
```

### Hooks

Use `use` prefix:

```txt
useShops
useCreateShop
useCurrentUser
```

### API Files

Use module name:

```txt
shops.api.ts
products.api.ts
auth.api.ts
```

### Types

Use clear names:

```txt
ShopListItem
ShopDetail
CreateShopInput
UpdateShopInput
```

---

## Auth and Permission Rules

Admin app allowed roles:

```txt
SUPER_ADMIN
ADMIN
```

Shop owner app allowed roles:

```txt
SHOP_OWNER
SHOP_STAFF later
```

Public web is mostly public.

UI may hide actions based on permissions, but backend is the source of truth.

Never rely only on UI permission checks.

---

## Error, Loading, and Empty States

Every API screen must handle:

```txt
Loading state
Error state
Empty state
Success state
```

Example:

```txt
Loading → skeleton/table placeholder
Error → retry card
Empty → "No shops found"
Success → table/list
```

No blank pages during loading.

---

## Response Handling

Backend response unwrapping must happen in the API client.

Components should not parse raw backend envelopes repeatedly.

Bad:

```ts
const res = await fetch(...);
const json = await res.json();
if (json.success) ...
```

Good:

```ts
const shops = await shopsApi.list(filters);
```

---

## Package Installation Rules

Before adding packages, check existing `package.json`.

Allowed/recommended UI packages:

```txt
react-hook-form
zod
@hookform/resolvers
@tanstack/react-query
@tanstack/react-table
lucide-react
```

Do not add heavy UI libraries without approval.

---

## Codex UI Rules

Codex should not receive huge tasks like:

```txt
Build full Admin UI
```

Good tasks:

```txt
Build Admin Shell only
Build Admin Login only
Build Admin Shops List only
Build Shop Owner Product Form only
```

Codex must not:

```txt
Create random components
Hardcode API URLs
Duplicate API calls
Touch unrelated apps
Change backend unless asked
Rewrite theme
Install random UI libraries
```

---

## Shared UI Component Rule

`packages/ui` must not know Localo business concepts.

Do not put these in `packages/ui`:

```txt
ShopStatusBadge
ProductStatusBadge
CommissionStatusBadge
SupportTicketPriorityBadge
AdminSidebarMenu
ShopOwnerProductForm
```

Put business components in app feature folders.

---

## Sidebar Rule

`packages/ui` can provide generic sidebar primitives:

```txt
Sidebar
SidebarHeader
SidebarContent
SidebarFooter
SidebarGroup
SidebarItem
SidebarLink
SidebarCollapseButton
```

App-specific menus live in:

```txt
apps/admin/src/components/navigation/admin-sidebar.tsx
apps/shop-owner/src/components/navigation/shop-owner-sidebar.tsx
```

---

## Final Principle

UI should be reusable, theme-driven, API-client-driven, and built screen by screen.
