# Localo Project Structure

## Purpose

This document defines the expected Localo project structure so humans, Codex, Claude Code, and future AI agents can understand where code should live and what rules to follow.

Localo is being built backend-first. The first implementation focus is the NestJS API, PostgreSQL database, Prisma schema, authentication, role-based access control, admin shop management, shop owner workflows, product catalog, search, support, commission, notifications, and audit logs.

UI, mobile, and admin screens will be implemented after the backend foundation is stable.

---

## Tech Stack

### Monorepo

* Nx monorepo
* TypeScript
* Shared packages for types, config, utilities, and database logic

### Backend

* NestJS
* PostgreSQL
* Prisma ORM
* REST API
* JWT authentication
* Refresh tokens
* DTO validation
* Swagger/OpenAPI
* Role-based access control

### Frontend / UI

Frontend and mobile are planned but should not be implemented during backend phases unless explicitly requested.

Expected future apps:

* Admin app
* Shop owner app
* Customer/mobile app
* Public web/landing pages

---

## Root Structure

```txt
localo/
├── apps/
│   └── api/
│
├── packages/
│   ├── db/
│   ├── shared-types/
│   ├── config/
│   └── utils/
│
├── docs/
│   ├── PROJECT_STRUCTURE.md
│   ├── AI_CODING_RULES.md
│   ├── LOCALO_BACKEND_TASKS.md
│   ├── localo_product_roles_workflows_roadmap.pdf
│   ├── localo_complete_database_blueprint.pdf
│   └── localo_nestjs_backend_blueprint.pdf
│
├── tools/
│
├── package.json
├── nx.json
├── tsconfig.base.json
├── eslint.config.js
├── prettier.config.js
└── README.md
```

---

## Apps Folder

The `apps/` directory contains runnable applications.

```txt
apps/
└── api/
```

### `apps/api`

Main Localo backend API.

Expected responsibility:

* Authentication
* Users
* Roles and permissions
* Shop management
* Shop owner workflows
* Categories
* Products
* Product media
* Business hours
* Location
* Favorites
* Reviews
* Support tickets
* Commission foundation
* Payments/subscriptions foundation
* Notifications
* Audit logs
* Analytics foundation

Expected structure:

```txt
apps/api/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   │
│   ├── common/
│   │   ├── decorators/
│   │   ├── filters/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pipes/
│   │   ├── responses/
│   │   └── utils/
│   │
│   ├── config/
│   │   ├── app.config.ts
│   │   ├── database.config.ts
│   │   ├── jwt.config.ts
│   │   └── validation.schema.ts
│   │
│   ├── database/
│   │   ├── prisma.module.ts
│   │   └── prisma.service.ts
│   │
│   └── modules/
│       ├── auth/
│       ├── users/
│       ├── roles/
│       ├── shops/
│       ├── shop-owners/
│       ├── shop-staff/
│       ├── shop-locations/
│       ├── business-hours/
│       ├── categories/
│       ├── products/
│       ├── product-media/
│       ├── favorites/
│       ├── reviews/
│       ├── support-tickets/
│       ├── commission/
│       ├── payments/
│       ├── subscriptions/
│       ├── notifications/
│       ├── audit-logs/
│       └── analytics/
│
├── test/
├── project.json
└── tsconfig.app.json
```

---

## Backend Module Structure

Each backend module should follow a consistent structure.

Example:

```txt
apps/api/src/modules/products/
├── dto/
│   ├── create-product.dto.ts
│   ├── update-product.dto.ts
│   ├── product-filter.dto.ts
│   └── product-response.dto.ts
│
├── products.controller.ts
├── products.service.ts
├── products.repository.ts
├── products.module.ts
└── products.constants.ts
```

Use this pattern for most business modules.

### Controller

Responsibility:

* Define REST endpoints
* Apply guards
* Apply role restrictions
* Accept DTOs
* Return response objects

Controller should not contain business logic.

### Service

Responsibility:

* Business rules
* Validation beyond DTO-level validation
* Transaction orchestration
* Ownership checks
* Calls to repository/database layer

### Repository

Responsibility:

* Prisma queries
* Database access
* Query filters
* Includes/selects
* Pagination queries

Repository should not contain product/business policy decisions.

### DTO

Responsibility:

* Request validation
* Input shape
* Query params
* Response shape if needed

DTO files must be kept inside the module’s `dto/` folder.

---

## Common Folder

The `common/` folder stores reusable backend infrastructure.

```txt
apps/api/src/common/
├── decorators/
│   ├── current-user.decorator.ts
│   ├── public.decorator.ts
│   └── roles.decorator.ts
│
├── filters/
│   └── http-exception.filter.ts
│
├── guards/
│   ├── jwt-auth.guard.ts
│   ├── roles.guard.ts
│   └── ownership.guard.ts
│
├── interceptors/
│   └── response.interceptor.ts
│
├── pipes/
│   └── validation.pipe.ts
│
├── responses/
│   ├── api-response.type.ts
│   ├── pagination-response.type.ts
│   └── error-response.type.ts
│
└── utils/
    ├── pagination.util.ts
    ├── slug.util.ts
    └── date.util.ts
```

Common code must be generic and reusable.

Do not place feature-specific logic in `common/`.

---

## Packages Folder

The `packages/` directory contains shared libraries.

```txt
packages/
├── db/
├── shared-types/
├── config/
└── utils/
```

---

## `packages/db`

Database package.

Expected responsibility:

* Prisma schema
* Prisma migrations
* Prisma client exports
* Seed scripts
* Database-related shared utilities

Expected structure:

```txt
packages/db/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
│
├── src/
│   ├── index.ts
│   └── prisma-client.ts
│
├── project.json
└── package.json
```

### Prisma Rules

* Use PostgreSQL.
* Use UUID primary keys unless explicitly changed.
* Follow the Localo DB blueprint.
* Use proper relations and indexes.
* Use enums for controlled statuses and roles.
* Use audit fields where required.
* Do not add random columns without checking the DB blueprint.

---

## `packages/shared-types`

Shared TypeScript types and enums.

Expected responsibility:

* User roles
* Shop status
* Product status
* Support ticket status
* Payment status
* Subscription status
* Common API response types
* Shared DTO-like types if needed

Expected structure:

```txt
packages/shared-types/
├── src/
│   ├── index.ts
│   ├── roles.ts
│   ├── users.ts
│   ├── shops.ts
│   ├── products.ts
│   ├── support.ts
│   ├── payments.ts
│   └── api.ts
│
├── project.json
└── package.json
```

Rules:

* Do not duplicate enums across backend modules.
* Prefer importing shared enums from this package.
* Keep shared types stable and generic.

---

## `packages/config`

Shared configuration package.

Expected responsibility:

* Environment variable names
* Config validation helpers
* Shared app configuration types
* Runtime config helpers

Expected structure:

```txt
packages/config/
├── src/
│   ├── index.ts
│   ├── env.ts
│   └── validation.ts
│
├── project.json
└── package.json
```

---

## `packages/utils`

Shared utility package.

Expected responsibility:

* Slug generation
* Date helpers
* String helpers
* Pagination helpers
* Safe parsing helpers

Expected structure:

```txt
packages/utils/
├── src/
│   ├── index.ts
│   ├── slug.ts
│   ├── date.ts
│   ├── pagination.ts
│   └── strings.ts
│
├── project.json
└── package.json
```

Rules:

* Utilities must be generic.
* Do not put business rules here.
* If logic is Localo business-specific, keep it in the related module service.

---

## Docs Folder

The `docs/` folder is the main knowledge base for humans and AI tools.

```txt
docs/
├── PROJECT_STRUCTURE.md
├── AI_CODING_RULES.md
├── LOCALO_BACKEND_TASKS.md
├── localo_product_roles_workflows_roadmap.pdf
├── localo_complete_database_blueprint.pdf
└── localo_nestjs_backend_blueprint.pdf
```

### `docs/PROJECT_STRUCTURE.md`

Defines the expected folder and codebase structure.

### `docs/AI_CODING_RULES.md`

Defines rules for Codex, Claude Code, and AI coding assistants.

Should include:

* How to work on tasks
* Which files to read first
* What not to touch
* How to avoid token waste
* Coding standards
* Completion report format

### `docs/LOCALO_BACKEND_TASKS.md`

Defines backend implementation phases and task checklist.

This file should be used when asking Codex to implement backend work.

### Product / DB / Backend PDFs

These are source-of-truth planning documents:

```txt
localo_product_roles_workflows_roadmap.pdf
localo_complete_database_blueprint.pdf
localo_nestjs_backend_blueprint.pdf
```

Do not ask Codex to read duplicate blueprint files unless specifically needed.

---

## Backend Build Order

Implementation must follow this order.

```txt
Phase 0: Project Setup
Phase 1: Database Foundation
Phase 2: Auth + Users + RBAC
Phase 3: Admin Shop Management
Phase 4: Shop Owner Profile
Phase 5: Categories + Products
Phase 6: Search + Discovery
Phase 7: Support + Commission Foundation
Phase 8: Notifications + Audit Logs
Phase 9: Testing + Production Readiness
```

Do not build multiple phases in one task unless explicitly requested.

---

## Naming Conventions

### Files

Use kebab-case.

```txt
create-shop.dto.ts
shops.service.ts
shops.controller.ts
jwt-auth.guard.ts
api-response.type.ts
```

### Classes

Use PascalCase.

```ts
CreateShopDto
ShopsService
ShopsController
JwtAuthGuard
```

### Variables and Functions

Use camelCase.

```ts
shopId
createShop
findShopById
```

### Constants

Use UPPER_SNAKE_CASE.

```ts
DEFAULT_PAGE_SIZE
MAX_PRODUCT_IMAGES
```

### Database Models

Use PascalCase in Prisma model names.

```prisma
model User
model Shop
model Product
model SupportTicket
```

### Database Fields

Use camelCase in Prisma fields.

```prisma
createdAt
updatedAt
deletedAt
shopOwnerId
```

---

## API Structure

Use REST API.

Expected route style:

```txt
/auth
/users
/admin/shops
/shop-owner/shops
/categories
/products
/support-tickets
/notifications
/audit-logs
```

### Admin Routes

Admin routes should use:

```txt
/admin/...
```

Examples:

```txt
GET    /admin/shops
POST   /admin/shops
PATCH  /admin/shops/:id
PATCH  /admin/shops/:id/status
```

### Shop Owner Routes

Shop owner routes should use:

```txt
/shop-owner/...
```

Examples:

```txt
GET    /shop-owner/shops/me
PATCH  /shop-owner/shops/me
POST   /shop-owner/products
PATCH  /shop-owner/products/:id
DELETE /shop-owner/products/:id
```

### Public/User Routes

Public or customer-facing routes should not expose admin capabilities.

Examples:

```txt
GET /shops
GET /shops/:slug
GET /products
GET /products/:id
POST /favorites
POST /reviews
POST /support-tickets
```

---

## Auth and Role Structure

Expected roles:

```txt
SUPER_ADMIN
ADMIN
SHOP_OWNER
SHOP_STAFF
CUSTOMER
SUPPORT_AGENT
```

### Access Rules

* Super Admin can manage platform-wide configuration.
* Admin can manage shops, users, approvals, support, commission, and operational data.
* Shop Owner can manage only their own shop, products, business hours, and related data.
* Shop Staff can manage only assigned shop operations.
* Customer can browse, favorite, review, and raise support tickets.
* Support Agent can manage assigned support workflows.

Ownership checks are required for shop-owner and shop-staff routes.

---

## Testing Structure

Backend tests should live near the module or in the app test folder depending on project setup.

Possible structure:

```txt
apps/api/src/modules/products/
├── products.service.spec.ts
└── products.controller.spec.ts
```

or:

```txt
apps/api/test/
├── auth.e2e-spec.ts
├── shops.e2e-spec.ts
└── products.e2e-spec.ts
```

Do not create unnecessary tests if the task does not require them.

For MVP, prefer:

* Auth tests
* RBAC tests
* Shop ownership tests
* Product CRUD tests
* Support ticket tests

---

## Environment Files

Expected local environment files:

```txt
.env
.env.example
```

Required environment variables:

```txt
NODE_ENV=
PORT=
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=
CORS_ORIGIN=
```

Never commit real secrets.

Always update `.env.example` when adding a required environment variable.

---

## Commands

Expected common commands:

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

Final commands may differ based on Nx project configuration.

AI agents should inspect `package.json` before running commands.

---

## AI Agent Rules

When Codex or another AI agent works on this project:

1. Read `docs/AI_CODING_RULES.md` first.
2. Read `docs/LOCALO_BACKEND_TASKS.md` for the active task.
3. Use the three source PDFs only when needed.
4. Do not read duplicate planning files unless asked.
5. Do not implement the full backend in one run.
6. Do not touch unrelated frontend/UI code.
7. Do not refactor unrelated files.
8. Do not make product decisions without asking.
9. Run only relevant checks.
10. Summarize changes clearly.

---

## Do Not Touch Unless Asked

AI agents should avoid modifying:

```txt
frontend apps
mobile apps
admin UI
landing pages
branding assets
unrelated documentation
unrelated shared packages
deployment files
```

unless the task explicitly requires it.

---

## Completion Summary Format

At the end of each task, AI agents should respond with:

```txt
Completed:
- What was implemented

Files changed:
- path/to/file.ts
- path/to/file.ts

Commands run:
- command

Checks:
- pass/fail details

Notes:
- assumptions
- pending items
```

---

## Final Principle

This project should be built in small, controlled phases.

Do not ask AI tools to build the whole Localo backend at once.

A good task is:

```txt
Implement Phase 0 only.
```

A bad task is:

```txt
Build the complete Localo backend.
```

Keep the architecture clean, modular, typed, and easy to extend.
