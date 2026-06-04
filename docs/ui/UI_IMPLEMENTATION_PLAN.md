# Localo UI Implementation Plan

## Purpose

This document defines the first Localo UI implementation phases.

Like backend, UI must be built phase by phase. UI should not be built randomly screen by screen without foundation.

---

## First UI Scope

For now, implement only:

```txt
UI-0: UI Documentation
UI-1: Foundation Packages
UI-2: Theme Setup
UI-3: API Client Foundation
UI-4: Shared UI Components
UI-5: Brand Theme Sync
UI-5.5: Shared UI Primitive UX Alignment
UI-6: Admin App Shell
UI-7: Admin Auth/Login
```

Do not start business Admin screens until UI-0 to UI-7 foundation/auth work is complete and reviewed.

---

# UI-0: UI Documentation

## Goal

Create the UI documentation foundation.

## Files

```txt
docs/ui/UI_PROJECT_STRUCTURE.md
docs/ui/UI_CODE_STANDARDS.md
docs/ui/UI_THEME_GUIDE.md
docs/ui/UI_IMPLEMENTATION_PLAN.md
docs/ui/localo_ui_foundation_blueprint.pdf
```

## Acceptance Checklist

```txt
docs/ui exists
UI project structure doc exists
UI code standards doc exists
UI theme guide exists
UI implementation plan exists
UI foundation blueprint PDF exists
No code changes required
```

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/ui/localo_ui_foundation_blueprint.pdf if needed.

Implement UI-0 only: UI Documentation.

Create docs/ui files:
- UI_PROJECT_STRUCTURE.md
- UI_CODE_STANDARDS.md
- UI_THEME_GUIDE.md
- UI_IMPLEMENTATION_PLAN.md

Do not write UI code.
Do not change backend code.
Do not create app screens.
Do not touch database/schema.
At the end, summarize files changed.
```

---

# UI-1: Foundation Packages

## Goal

Prepare shared frontend package structure, aliases, and index exports.

## Target Packages

```txt
packages/theme
packages/ui
packages/api-client
packages/utils
packages/shared-types
packages/config
```

If some packages already exist, preserve them and only align structure.

## Work

```txt
Create missing package folders
Create src/index.ts for each package
Create minimal package.json/project config if needed
Add/align tsconfig path aliases
Prepare package exports
Avoid deep imports
Do not build business components
Do not build app screens
```

## Acceptance Checklist

```txt
packages/theme exists
packages/ui exists
packages/api-client exists
packages/utils exists
src/index.ts exists for each package
Path aliases exist
No backend code changed
No app screens created
Typecheck passes where available
```

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/ui/UI_PROJECT_STRUCTURE.md.
Read docs/ui/UI_CODE_STANDARDS.md.
Read docs/ui/UI_IMPLEMENTATION_PLAN.md.

Implement UI-1 only: Foundation Packages.

Requirements:
- Create/align packages/theme, packages/ui, packages/api-client, packages/utils, packages/shared-types, packages/config if needed.
- Add src/index.ts for each package.
- Add clean path aliases:
  @localo/ui
  @localo/theme
  @localo/api-client
  @localo/shared-types
  @localo/config
  @localo/utils
- Do not create business UI components.
- Do not create Admin/Shop Owner/Public screens.
- Do not change backend logic.
- Run relevant typecheck only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# UI-2: Theme Setup

## Goal

Create Localo theme system.

## Work

```txt
Create base Localo theme
Create admin theme
Create shopOwner theme
Create publicWeb theme
Create semantic color tokens
Create status color tokens
Create spacing/radius/shadow/typography tokens
Create Tailwind preset foundation if Tailwind is used
Create CSS variable strategy/foundation if useful
```

## Rules

```txt
All apps use same base theme by default
Keep flexibility for app-level overrides
No business screens
No hardcoded component-specific business styles
No backend changes
```

## Acceptance Checklist

```txt
packages/theme/src/tokens.ts exists
packages/theme/src/colors.ts exists
packages/theme/src/typography.ts exists
packages/theme/src/spacing.ts exists
packages/theme/src/radius.ts exists
packages/theme/src/shadows.ts exists
packages/theme/src/app-themes.ts exists
packages/theme/src/tailwind-preset.ts exists if applicable
packages/theme/src/index.ts exports public theme API
Typecheck passes
```

## Codex Prompt

```txt
Read docs/ui/UI_THEME_GUIDE.md.
Read docs/ui/UI_CODE_STANDARDS.md.
Read docs/ui/UI_IMPLEMENTATION_PLAN.md.

Implement UI-2 only: Theme Setup.

Requirements:
- Build packages/theme with base Localo theme tokens.
- Add admin, shopOwner, and publicWeb app theme exports.
- For now all app themes may extend the same base theme.
- Add semantic colors, status colors, typography, spacing, radius, shadows.
- Add Tailwind preset foundation if current repo uses Tailwind.
- Export all public theme APIs through packages/theme/src/index.ts.
- Do not build UI screens.
- Do not build business components.
- Do not change backend code.
- Run relevant typecheck only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# UI-3: API Client Foundation

## Goal

Create frontend API client foundation.

## Work

```txt
Create http-client
Create api-error
Create auth-token helpers
Create response unwrap helpers
Create pagination types
Create base auth API if useful
Prepare module folders for backend resources
```

## Target Structure

```txt
packages/api-client/
└── src/
    ├── index.ts
    ├── http/
    │   ├── http-client.ts
    │   ├── api-error.ts
    │   ├── auth-token.ts
    │   └── response.ts
    ├── auth/
    │   ├── auth.api.ts
    │   └── auth.types.ts
    ├── shops/
    ├── categories/
    ├── products/
    ├── support-tickets/
    ├── commission/
    ├── notifications/
    └── audit-logs/
```

## Rules

```txt
No direct fetch in UI later
No screens
No backend changes
No feature API overbuild unless needed
```

## Acceptance Checklist

```txt
http-client exists
api-error exists
auth-token helper exists
response unwrap helper exists
pagination types exist
index exports exist
Typecheck passes
```

## Codex Prompt

```txt
Read docs/ui/UI_CODE_STANDARDS.md.
Read docs/ui/UI_PROJECT_STRUCTURE.md.
Read docs/ui/UI_IMPLEMENTATION_PLAN.md.

Implement UI-3 only: API Client Foundation.

Requirements:
- Create packages/api-client HTTP foundation.
- Add base URL handling.
- Add auth token helper foundation.
- Add API error normalization.
- Add backend response unwrap helper.
- Add pagination/shared response types.
- Add auth API base only if practical.
- Prepare module folders for shops, categories, products, support, commission, notifications, and audit logs.
- Do not build UI screens.
- Do not change backend code.
- Do not overbuild all feature APIs yet.
- Run relevant typecheck only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# UI-4: Shared UI Components

## Goal

Build generic reusable UI components only.

## Work

Create components under:

```txt
packages/ui/src/
```

Recommended component order:

```txt
utils/cn
Button
Badge
Card
FormField
Input
Textarea
Select
MultiSelect
Checkbox
Switch
Radio
SearchInput
PasswordInput
NumberInput
EmailInput
PhoneInput
DateInput
TimeInput
FileInput
Dialog
ConfirmDialog
Table primitives
EmptyState
ErrorState
LoadingState
Spinner
Skeleton
Toast
Pagination
PageHeader
PageContainer
Sidebar
Topbar
DashboardShell
Avatar
```

## Rules

```txt
No business components
No Admin screens
No Shop Owner screens
No Public Web screens
No backend changes
No hardcoded Localo feature logic
Use theme tokens/variants
Export via index.ts
```

## Acceptance Checklist

```txt
packages/ui form-fields structure exists
packages/ui layout structure exists
packages/ui feedback structure exists
packages/ui navigation structure exists
packages/ui primitives exist
Sidebar generic primitives exist
All public UI exports go through packages/ui/src/index.ts
No business-specific components added
Typecheck passes
```

## Codex Prompt

```txt
Read docs/ui/UI_CODE_STANDARDS.md.
Read docs/ui/UI_PROJECT_STRUCTURE.md.
Read docs/ui/UI_THEME_GUIDE.md.
Read docs/ui/UI_IMPLEMENTATION_PLAN.md.

Implement UI-4 only: Shared UI Components.

Requirements:
- Build generic reusable UI primitives in packages/ui only.
- Add form-fields:
  Input, Textarea, Select, MultiSelect, Checkbox, Switch, Radio, SearchInput, PasswordInput, NumberInput, EmailInput, PhoneInput, DateInput, TimeInput, FileInput, FormField.
- Add layout primitives:
  Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarGroup, SidebarItem, SidebarLink, SidebarCollapseButton, Topbar, PageHeader, PageContainer, DashboardShell.
- Add feedback/navigation primitives:
  EmptyState, ErrorState, LoadingState, Spinner, Skeleton, Toast, ConfirmDialog, Pagination.
- Add Button, Badge, Card, Dialog, Dropdown, Tabs, Table primitives, Avatar.
- Use theme-friendly classes/tokens.
- Export all public components through package index files.
- Do not create business components like ShopStatusBadge, ProductForm, ShopsTable, AdminSidebarMenu.
- Do not create app screens.
- Do not change backend code.
- Run relevant typecheck only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# UI-5: Brand Theme Sync

## Goal

Sync the theme package and UI docs with the finalized Localo brand identity.

## Brand Source Of Truth

```txt
Primary Green: #16A34A
Teal: #0D9488
Deep Navy: #0F172A
Amber: #F59E0B
Light Gray: #F2F4F7
Charcoal: #111827
Typography: Poppins
```

## Work

```txt
Update packages/theme tokens
Preserve base/admin/shopOwner/publicWeb theme exports
Preserve CSS variable helper
Preserve Tailwind preset foundation
Update UI theme/code/implementation docs
Use admin login references as visual direction
```

## Rules

```txt
No Admin login screen
No routes/pages/templates
No business components
No backend changes
No API client behavior changes
No dependency installs
```

## Acceptance Checklist

```txt
Theme colors match finalized brand tokens
Poppins remains the typography default
Theme supports deep navy auth panel, green CTA, white card, light gray background
Docs mention UI-5, UI-5.5, UI-6, and UI-7
Typecheck passes
```

---

# UI-5.5: Shared UI Primitive UX Alignment

## Goal

Review and align generic shared UI primitives against the finalized Localo theme and admin auth design direction.

## Work

```txt
Tune Button/Input/Card/FormField/Dialog UX if needed
Improve focus, disabled, error, and mobile touch states
Keep components generic
Keep variants semantic
```

## Rules

```txt
No business components
No app screens
No hardcoded feature labels
No React Query hooks
No API changes
```

---

# UI-6: Admin App Shell

## Goal

Create the generic Admin app shell foundation.

## Work

```txt
Admin shell layout
Protected layout placeholder
Topbar/sidebar composition using @localo/ui primitives
Route constants where needed
No business pages yet
```

## Rules

```txt
No shop/category/product/support screens yet
No deep business workflows
Use @localo/ui, @localo/theme, and @localo/assets
```

---

# UI-7: Admin Auth/Login

## Goal

Implement Admin auth/login using the finalized brand theme and existing backend auth APIs.

## Work

```txt
Login route
Login template and blocks
Login form validation
Auth guard/redirect flow
Current admin handling
Unauthorized state
Logout flow if needed
```

## Rules

```txt
Use @localo/api-client for auth calls
Use @localo/ui primitives
Use @localo/theme tokens
Use @localo/assets image references
Do not call fetch directly
Do not add forgot password, signup, OTP, magic link, or social login yet
Do not implement Admin business modules
```

---

## After UI-4

Pause and review before moving to:

```txt
UI-5: Admin App Shell
UI-6: Admin Auth/Login
UI-7: Admin Shops
```

Do not start UI-5 until UI-0 to UI-4 are committed and pushed.
