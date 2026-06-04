# Localo AI Coding Rules

## Purpose

This document defines how Codex, Claude Code, ChatGPT, and any AI coding assistant must work on the Localo project.

The goal is to keep implementation focused, reduce unnecessary token usage, avoid duplicate planning, and prevent AI tools from making random product or architecture decisions.

Localo must be built in small, controlled phases.

Do not ask AI tools to build the entire backend in one run.

---

## What is Localo?

Localo is a local shop discovery and catalog platform.

It helps users discover nearby shops, browse products, check shop details, view business hours, filter by category/location, favorite shops/products, submit reviews, and raise support tickets.

It helps shop owners manage their shop profile, products, prices, discounts, categories, business hours, media, and support requests.

It helps admins manage shops, shop owners, approvals, platform settings, commissions, support tickets, audits, and operational workflows.

---

## Current Project Direction

Localo is being built backend-first.

The first implementation focus is:

```txt
NestJS backend
PostgreSQL database
Prisma schema
Auth
RBAC
Admin shop management
Shop owner workflows
Product catalog
Search foundation
Support foundation
Commission foundation
Notifications
Audit logs
```

Frontend, admin UI, mobile UI, and customer app screens will be built after the backend foundation is stable.

Do not build UI screens unless explicitly requested.

---

## Main Backend Stack

Use:

```txt
Nx monorepo
NestJS
TypeScript
PostgreSQL
Prisma
REST API
JWT authentication
Refresh tokens
DTO validation
Swagger/OpenAPI
Role-based access control
Centralized error handling
Modular architecture
```

Do not switch to another backend framework unless explicitly requested.

Do not introduce GraphQL unless explicitly requested.

Do not introduce MongoDB unless explicitly requested.

---

## Source Documents

Use these three documents as the main source of truth when needed:

```txt
docs/localo_product_roles_workflows_roadmap.pdf
docs/localo_complete_database_blueprint.pdf
docs/localo_nestjs_backend_blueprint.pdf
```

### 1. Product / Roles / Workflows PDF

Use this for:

```txt
What Localo is
User roles
User journeys
Feature scope
Workflows
Roadmap
Backend-first plan
```

### 2. Database Blueprint PDF

Use this for:

```txt
Tables
Columns
Relations
Indexes
Enums
Soft delete strategy
Audit fields
Status fields
Ownership fields
Database decisions
```

### 3. NestJS Backend Blueprint PDF

Use this for:

```txt
Backend stack
Folder structure
API standards
DTOs
Modules
Services
Repositories
Guards
RBAC rules
Implementation standards
```

---

## Duplicate Documents Rule

Do not read duplicate or older blueprint files unless explicitly asked.

Specifically, do not read:

```txt
Localo_AI_Production_Blueprint.pdf
```

unless the user explicitly asks.

Reason:

This file may contain overlapping product, DB, API, workflow, and architecture content. Reading duplicate documents wastes Codex usage and may confuse implementation.

---

## Reading Order for AI Agents

When starting backend work for the first time, read in this order:

```txt
1. docs/AI_CODING_RULES.md
2. docs/PROJECT_STRUCTURE.md
3. docs/LOCALO_BACKEND_TASKS.md
4. Relevant source PDF only when needed
```

Do not re-read all PDFs for every task.

For each task, read only the relevant sections.

---

## Token Saving Rules

AI agents must avoid wasting usage.

Follow these rules:

```txt
Do not scan the whole repo unless needed.
Do not read duplicate docs.
Do not build multiple phases together.
Do not refactor unrelated files.
Do not touch UI unless asked.
Do not run every test if only one module changed.
Do not install unnecessary packages.
Do not generate huge explanations.
Do not create unused abstractions.
Do not make product decisions without asking.
```

A good task is:

```txt
Implement Phase 0 only.
```

A bad task is:

```txt
Build the complete Localo backend.
```

---

## Required Project Files to Read First

Before coding, AI agents should inspect:

```txt
package.json
nx.json
tsconfig.base.json
docs/AI_CODING_RULES.md
docs/PROJECT_STRUCTURE.md
docs/LOCALO_BACKEND_TASKS.md
```

If backend already exists, also inspect:

```txt
apps/api/src/main.ts
apps/api/src/app.module.ts
packages/db/prisma/schema.prisma
```

Do not scan unrelated frontend folders unless the task requires it.

---

## Expected Root Structure

Expected project shape:

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
├── package.json
├── nx.json
├── tsconfig.base.json
└── README.md
```

---

## Expected Backend App Structure

Main backend app:

```txt
apps/api/
```

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

## Module Structure Rules

Each backend module should follow this pattern:

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

---

## Controller Rules

Controllers must:

```txt
Define REST endpoints
Apply guards
Apply role restrictions
Accept DTOs
Return response objects
Use Swagger decorators where required
```

Controllers must not contain business logic.

Bad:

```txt
Controller directly writes Prisma queries.
```

Good:

```txt
Controller calls service.
Service handles business rules.
Repository handles database queries.
```

---

## Service Rules

Services must contain:

```txt
Business logic
Ownership checks
Workflow rules
Transaction orchestration
Calls to repositories
Validation beyond DTO-level validation
```

Services should not contain large raw SQL unless necessary.

Services should not directly expose Prisma models to controllers when a response DTO is expected.

---

## Repository Rules

Repositories must contain:

```txt
Prisma queries
Database filters
Pagination queries
Includes/selects
Relation loading
Database update logic
```

Repositories should not contain business policy decisions.

Example:

```txt
products.repository.ts
```

should know how to fetch products.

```txt
products.service.ts
```

should know whether the current shop owner is allowed to update the product.

---

## DTO Rules

Use DTOs for all request bodies and query filters.

DTOs should live inside:

```txt
apps/api/src/modules/<module-name>/dto/
```

Examples:

```txt
create-shop.dto.ts
update-shop.dto.ts
shop-filter.dto.ts
update-shop-status.dto.ts
create-product.dto.ts
update-product.dto.ts
product-filter.dto.ts
create-support-ticket.dto.ts
```

DTOs must use validation decorators.

Do not accept untyped plain objects.

Do not use `any`.

---

## TypeScript Rules

Follow strict TypeScript rules:

```txt
Use explicit types where useful.
Avoid any.
Avoid unknown unless properly narrowed.
Avoid large functions.
Avoid duplicate logic.
Avoid magic strings.
Use enums/constants where needed.
```

Use shared types from:

```txt
packages/shared-types
```

when available.

---

## Naming Rules

### Files

Use kebab-case:

```txt
create-shop.dto.ts
shops.service.ts
shops.controller.ts
jwt-auth.guard.ts
api-response.type.ts
```

### Classes

Use PascalCase:

```txt
CreateShopDto
ShopsService
ShopsController
JwtAuthGuard
```

### Variables and Functions

Use camelCase:

```txt
shopId
createShop
findShopById
```

### Constants

Use UPPER_SNAKE_CASE:

```txt
DEFAULT_PAGE_SIZE
MAX_PRODUCT_IMAGES
```

### Prisma Models

Use PascalCase:

```txt
User
Shop
Product
SupportTicket
```

### Prisma Fields

Use camelCase:

```txt
createdAt
updatedAt
deletedAt
shopOwnerId
```

---

## API Rules

Use REST API conventions.

Examples:

```txt
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
GET    /users/me

GET    /admin/shops
POST   /admin/shops
PATCH  /admin/shops/:id
PATCH  /admin/shops/:id/status

GET    /shop-owner/shops/me
PATCH  /shop-owner/shops/me

GET    /categories
POST   /admin/categories
PATCH  /admin/categories/:id

GET    /products
POST   /shop-owner/products
PATCH  /shop-owner/products/:id
DELETE /shop-owner/products/:id
```

Do not invent random route names if the backend blueprint already defines them.

---

## API Response Standard

Use a consistent response format.

Recommended success response:

```ts
{
  success: true,
  message: string,
  data: unknown,
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  }
}
```

Recommended error response:

```ts
{
  success: false,
  message: string,
  error: {
    code: string;
    details?: unknown;
  }
}
```

Do not return inconsistent response shapes across modules.

---

## Pagination Rules

For list endpoints, support pagination.

Recommended query params:

```txt
page
limit
search
sortBy
sortOrder
status
```

Recommended pagination meta:

```ts
{
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
```

Default page size should be reasonable.

Do not return unlimited large lists.

---

## Database Rules

Use Prisma as the ORM.

Follow the database blueprint for:

```txt
table names
columns
relations
indexes
enums
soft delete strategy
audit fields
status fields
ownership fields
```

Use UUID primary keys unless the DB blueprint says otherwise.

Do not add random columns without checking the DB blueprint.

Do not remove columns without asking.

Do not rename models without asking.

---

## Common Database Fields

Main tables should generally include:

```txt
id
createdAt
updatedAt
deletedAt where required
createdById where required
updatedById where required
status where required
```

Use soft delete where appropriate.

Do not hard delete important business records unless explicitly required.

---

## Prisma Rules

Prisma schema should live in:

```txt
packages/db/prisma/schema.prisma
```

Seed file should live in:

```txt
packages/db/prisma/seed.ts
```

Prisma client export should live in:

```txt
packages/db/src/
```

Always update Prisma schema based on the DB blueprint.

After changing schema, run:

```bash
npx prisma generate
```

For migrations, use:

```bash
npx prisma migrate dev
```

Do not run destructive database commands unless explicitly asked.

---

## Auth Rules

Localo auth must support:

```txt
Login
Refresh token
Logout
Current user endpoint
Password hashing
JWT access token
JWT refresh token
Role-based permissions
```

Never store plain text passwords.

Use secure password hashing.

Do not expose password hashes in API responses.

---

## Roles

Expected roles:

```txt
SUPER_ADMIN
ADMIN
SHOP_OWNER
SHOP_STAFF
CUSTOMER
SUPPORT_AGENT
```

Role rules:

```txt
SUPER_ADMIN can manage platform-level configuration.
ADMIN can manage shops, users, approvals, support, commission, and operations.
SHOP_OWNER can manage only their own shop and related products.
SHOP_STAFF can manage only assigned shop operations.
CUSTOMER can browse, favorite, review, and raise tickets.
SUPPORT_AGENT can manage assigned support workflows.
```

---

## RBAC Rules

Use guards and decorators.

Expected examples:

```txt
@Roles(Role.ADMIN)
@Roles(Role.SHOP_OWNER)
@Public()
@CurrentUser()
```

Protected endpoints must use:

```txt
JwtAuthGuard
RolesGuard where role restriction is needed
Ownership checks where shop ownership is required
```

Do not rely only on frontend restrictions.

Backend must enforce permissions.

---

## Ownership Rules

Shop owner routes must verify ownership.

Example:

```txt
A shop owner can update only their own shop.
A shop owner can update only products belonging to their own shop.
A shop staff member can update only assigned shop resources.
A customer can update only their own favorites/reviews/tickets.
```

Never allow one shop owner to access another shop’s private data.

---

## Admin Route Rules

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
GET    /admin/support-tickets
PATCH  /admin/support-tickets/:id/status
```

Admin routes must be protected by admin roles.

---

## Shop Owner Route Rules

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

Shop owner routes must include ownership checks.

---

## Public / Customer Route Rules

Public and customer-facing routes should not expose admin functionality.

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

Customer-only write actions must require authentication.

Public browse endpoints may be open where appropriate.

---

## Error Handling Rules

Use centralized error handling.

Expected error types:

```txt
BadRequestException
UnauthorizedException
ForbiddenException
NotFoundException
ConflictException
InternalServerErrorException
```

Do not leak internal database errors to API clients.

Convert known Prisma errors into meaningful API errors.

---

## Validation Rules

Use DTO validation.

Validate:

```txt
required fields
email format
phone format where required
UUID format
enum values
price values
discount values
pagination limits
date formats
location fields
```

Do not trust client input.

---

## Swagger / OpenAPI Rules

Use Swagger decorators where useful.

Document:

```txt
Auth endpoints
Admin shop endpoints
Shop owner endpoints
Product endpoints
Support ticket endpoints
Common DTOs
Error responses
```

Do not over-document internal implementation details.

---

## Environment Rules

Expected environment files:

```txt
.env
.env.example
```

Required variables:

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

Always update `.env.example` when adding a new required variable.

---

## Package Installation Rules

Before installing a package, check whether the project already has a package that solves the need.

Do not install unnecessary packages.

Prefer stable, popular packages.

Do not add heavy dependencies for small utilities.

If a new package is required, explain why in the completion summary.

---

## Testing Rules

Run only relevant checks for the current task.

Possible checks:

```bash
npm run lint
npm run build
npm run test
npx prisma validate
npx prisma generate
```

AI agents should inspect `package.json` before running commands.

Do not run unrelated expensive checks unless required.

---

## Minimum Tests for Backend

For MVP backend, prioritize tests for:

```txt
Auth
RBAC
Shop ownership
Admin shop management
Product CRUD
Support tickets
Prisma schema validation
```

Do not create excessive tests for unfinished features.

---

## Seed Data Rules

Seed data should support local development.

Recommended seed data:

```txt
Super admin user
Admin user
Demo shop owner
Demo shop
Demo categories
Demo products
Demo business hours
Demo support ticket
Commission settings
```

Never seed real secrets.

Use safe demo passwords only for local development.

---

## Backend Build Order

Build backend in this order:

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

Never build more than one phase in a single AI task unless explicitly requested.

---

## Phase 0: Project Setup

Goal:

```txt
Set up backend foundation.
```

Expected work:

```txt
Nx backend app
NestJS API app
Environment config
Prisma setup
Database connection
Health endpoint
Base response/error structure
```

Do not implement business modules yet.

---

## Phase 1: Database Foundation

Goal:

```txt
Create database schema foundation.
```

Expected work:

```txt
Prisma schema
Enums
Relations
Indexes
Migrations
Base seed data
Prisma service
```

Follow the DB blueprint.

Do not invent tables.

---

## Phase 2: Auth + Users + RBAC

Goal:

```txt
Implement secure authentication and role foundation.
```

Expected work:

```txt
User model integration
Login
Refresh token
Logout
Current user endpoint
Password hashing
JWT strategy
Roles guard
Current user decorator
Public decorator
```

Do not implement shop logic in this phase unless required for ownership scaffolding.

---

## Phase 3: Admin Shop Management

Goal:

```txt
Allow admins to create and manage shops.
```

Expected work:

```txt
Admin shop listing
Create shop
Update shop
Approve/reject shop
Pause shop
Assign shop owner
Shop filters
```

Must enforce admin role.

---

## Phase 4: Shop Owner Profile

Goal:

```txt
Allow shop owners to manage their own shop profile.
```

Expected work:

```txt
View own shop
Update own shop profile
Update business hours
Update location
Update basic shop settings
```

Must enforce ownership.

---

## Phase 5: Categories + Products

Goal:

```txt
Implement catalog foundation.
```

Expected work:

```txt
Category management
Product CRUD
Product pricing
Product discount
Product tags/search fields
Product status
Product visibility
```

Shop owners can manage only products belonging to their own shop.

---

## Phase 6: Search + Discovery

Goal:

```txt
Support customer-facing shop and product discovery.
```

Expected work:

```txt
Shop search
Product search
Category filters
Location filters
Open/closed shop filters
Pagination
Sorting
```

Do not over-engineer search in MVP.

Use database-backed filters first.

---

## Phase 7: Support + Commission Foundation

Goal:

```txt
Create support and commercial foundation.
```

Expected work:

```txt
Support tickets
Ticket status updates
Commission settings
Commission tracking foundation
Payment/subscription foundation
Shop pause rules for unpaid commission
```

Payment gateway integration can come later unless explicitly requested.

---

## Phase 8: Notifications + Audit Logs

Goal:

```txt
Record important activity and prepare notification system.
```

Expected work:

```txt
Notification records
Audit log records
Admin activity history
Shop owner activity history
```

Do not implement external push/email providers unless asked.

---

## Phase 9: Testing + Production Readiness

Goal:

```txt
Make backend reliable enough to continue frontend work.
```

Expected work:

```txt
Seeds
Unit tests
API tests
Swagger docs
Error handling review
Security review
RBAC review
Ownership review
```

---

## Task Execution Rule

When given a task, AI agents must follow this process:

```txt
1. Read docs/AI_CODING_RULES.md
2. Read docs/PROJECT_STRUCTURE.md
3. Read docs/LOCALO_BACKEND_TASKS.md
4. Read only the relevant source PDF sections if needed
5. Inspect current repo structure
6. Make a short implementation plan
7. Implement only the requested task
8. Run relevant checks
9. Fix only related issues
10. Summarize changes clearly
```

---

## Files Not To Touch Unless Asked

Do not modify:

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

unless explicitly required by the task.

---

## No Large Refactor Rule

Do not perform large refactors unless the user explicitly asks.

If code looks messy but is unrelated to the current task, leave it alone.

If a refactor is required, explain why before doing it.

---

## No Product Decision Rule

Do not make major product decisions alone.

Ask before changing:

```txt
roles
commission logic
payment rules
shop approval workflow
subscription logic
review rules
support escalation logic
database structure
API naming strategy
```

---

## No Full Backend Rule

Never build the full backend in one task.

Always work phase by phase.

Good:

```txt
Implement Phase 0 only.
```

Good:

```txt
Implement products module only.
```

Bad:

```txt
Build all Localo backend APIs.
```

---

## Completion Summary Format

At the end of each task, AI agents must respond with:

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

## Codex First Message Template

When starting a Codex session, use this:

```txt
Read docs/AI_CODING_RULES.md first.
Then read docs/PROJECT_STRUCTURE.md.
Then read docs/LOCALO_BACKEND_TASKS.md.

Use these source PDFs only when needed:
1. docs/localo_product_roles_workflows_roadmap.pdf
2. docs/localo_complete_database_blueprint.pdf
3. docs/localo_nestjs_backend_blueprint.pdf

Do not read Localo_AI_Production_Blueprint.pdf unless I explicitly ask.

Implement the requested phase only.
Do not touch unrelated files.
Do not build the full backend in one run.
Run only relevant checks.
Summarize files changed, commands run, checks, assumptions, and pending items.
```

---

## Example Codex Task Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.

Implement Phase 0 only: Project Setup.

Requirements:
- Set up NestJS API app if missing.
- Set up Prisma foundation if missing.
- Add environment validation.
- Add health endpoint.
- Add base API response/error structure.
- Do not implement business modules yet.
- Do not touch frontend/UI code.
- Run relevant checks only.

At the end, summarize:
- Completed work
- Files changed
- Commands run
- Checks
- Assumptions
- Pending items
```

---

## Final Principle

Localo should be built carefully, module by module.

The job of AI agents is not to guess the product.

The job of AI agents is to execute the provided architecture, database design, backend rules, and task plan with clean, typed, maintainable code.
