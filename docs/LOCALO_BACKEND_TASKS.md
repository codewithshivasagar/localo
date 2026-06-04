# Localo Backend Implementation Tasks

## Purpose

This document is the execution checklist for building the Localo backend.

Use this file with Codex after reading:

```txt
docs/AI_CODING_RULES.md
docs/PROJECT_STRUCTURE.md
```

Codex should implement **one phase at a time**. Do not build the full backend in one run.

---

## Source of Truth

Use these files when needed:

```txt
docs/localo_product_roles_workflows_roadmap.pdf
docs/localo_complete_database_blueprint.pdf
docs/localo_nestjs_backend_blueprint.pdf
```

Do not use duplicate blueprint files unless explicitly requested.

Do not read:

```txt
Localo_AI_Production_Blueprint.pdf
```

unless explicitly requested.

---

## Backend Stack

Use:

```txt
Nx monorepo
NestJS
TypeScript
PostgreSQL
Prisma
REST API
JWT Auth
Refresh Tokens
RBAC
DTO Validation
Swagger/OpenAPI
Centralized Error Handling
```

---

## Global Rules for All Phases

1. Implement only the requested phase.
2. Do not touch unrelated frontend, mobile, admin UI, landing page, or branding files.
3. Do not make product decisions without asking.
4. Do not create duplicate architecture.
5. Do not scan the entire repo unless needed.
6. Do not run expensive checks unless relevant.
7. Do not create unnecessary abstractions.
8. Follow `docs/AI_CODING_RULES.md`.
9. Follow `docs/PROJECT_STRUCTURE.md`.
10. Summarize changes clearly after completion.

---

## Completion Summary Format

At the end of every Codex task, respond with:

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

# Phase 0 — Project Setup

## Goal

Create the backend foundation only.

This phase should prepare the NestJS API app, configuration system, Prisma connection foundation, health endpoint, and base response/error structure.

Do not implement business modules yet.

---

## Expected Work

* Confirm Nx workspace structure.
* Create or verify `apps/api`.
* Create or verify NestJS backend app.
* Create base API module structure.
* Add environment configuration.
* Add `.env.example` placeholders.
* Add Prisma foundation.
* Add health endpoint.
* Add base API response type.
* Add base error response type.
* Add global validation pipe.
* Add global exception filter.
* Add response interceptor if appropriate.
* Add Swagger setup if NestJS app exists.
* Confirm app starts locally.

---

## Files to Create or Update

Possible files:

```txt
apps/api/src/main.ts
apps/api/src/app.module.ts

apps/api/src/config/app.config.ts
apps/api/src/config/database.config.ts
apps/api/src/config/jwt.config.ts
apps/api/src/config/validation.schema.ts

apps/api/src/database/prisma.module.ts
apps/api/src/database/prisma.service.ts

apps/api/src/common/responses/api-response.type.ts
apps/api/src/common/responses/error-response.type.ts
apps/api/src/common/responses/pagination-response.type.ts

apps/api/src/common/filters/http-exception.filter.ts
apps/api/src/common/interceptors/response.interceptor.ts
apps/api/src/common/pipes/validation.pipe.ts

apps/api/src/modules/health/health.module.ts
apps/api/src/modules/health/health.controller.ts
apps/api/src/modules/health/health.service.ts

.env.example
package.json
```

Only create files that match the existing project structure.

---

## Environment Variables

Ensure `.env.example` contains placeholders only:

```env
NODE_ENV=development
PORT=3000

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
DIRECT_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

JWT_ACCESS_SECRET="change_me"
JWT_REFRESH_SECRET="change_me"
JWT_ACCESS_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

CORS_ORIGIN="http://localhost:4200"
```

Never commit real `.env` values.

---

## APIs Required

```txt
GET /health
```

Expected response:

```json
{
  "success": true,
  "message": "Localo API is healthy",
  "data": {
    "status": "ok"
  }
}
```

---

## Do Not Do

Do not implement:

```txt
Auth
Users
Shops
Products
Categories
Support tickets
Commission
Payments
Notifications
Audit logs
UI
Admin screens
Mobile screens
```

---

## Acceptance Checklist

* [ ] API app exists or is verified.
* [ ] App can start.
* [ ] `.env.example` has required placeholders.
* [ ] Real `.env` is not committed.
* [ ] Prisma service foundation exists.
* [ ] Health endpoint works.
* [ ] Global validation is configured.
* [ ] Global error handling is configured.
* [ ] Swagger setup exists if backend app is ready.
* [ ] No business module was implemented.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.

Implement Phase 0 only: Project Setup.

Requirements:
- Set up or verify NestJS API app under apps/api.
- Set up environment configuration.
- Set up Prisma foundation.
- Add health endpoint.
- Add base API response and error structure.
- Add global validation and exception handling.
- Update .env.example with placeholders only.
- Do not implement business modules.
- Do not touch frontend/UI/mobile files.
- Run only relevant checks.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 1 — Database Foundation

## Goal

Create the complete Prisma database foundation based on the Localo DB blueprint.

This phase focuses on schema, enums, relations, indexes, migrations, and seed foundation.

---

## Expected Work

* Read the database blueprint.
* Create or update Prisma schema.
* Add required enums.
* Add core models.
* Add relations.
* Add indexes.
* Add audit fields.
* Add soft delete fields where required.
* Add seed script foundation.
* Validate Prisma schema.
* Generate Prisma client.
* Create migration if database is available.

---

## Main Models Expected

Refer to DB blueprint for exact columns and relations.

Core models likely include:

```txt
User
UserProfile
Role or Role enum
RefreshToken

Shop
ShopOwner
ShopStaff
ShopLocation
BusinessHour
ShopMedia

Category
Product
ProductMedia
ProductVariant if needed
ProductPriceHistory if needed

Favorite
Review

SupportTicket
SupportTicketMessage

CommissionSetting
CommissionLedger
Subscription
Payment

Notification
AuditLog
PlatformSetting
```

Do not invent models beyond the DB blueprint without asking.

---

## Main Enums Expected

Possible enums:

```txt
UserRole
UserStatus
ShopStatus
ShopVerificationStatus
ShopOwnerStatus
ProductStatus
ProductVisibility
SupportTicketStatus
SupportTicketPriority
PaymentStatus
SubscriptionStatus
CommissionStatus
NotificationType
AuditAction
```

Follow DB blueprint names when available.

---

## Files to Create or Update

```txt
packages/db/prisma/schema.prisma
packages/db/prisma/seed.ts
packages/db/src/index.ts
packages/db/src/prisma-client.ts

apps/api/src/database/prisma.module.ts
apps/api/src/database/prisma.service.ts

.env.example
package.json
```

---

## Database Rules

Use:

```txt
PostgreSQL
Prisma
UUID primary keys
camelCase fields
PascalCase model names
createdAt
updatedAt
deletedAt where required
createdById where required
updatedById where required
status where required
indexes for search/filter fields
```

---

## Do Not Do

Do not implement API controllers in this phase.

Do not implement auth logic in this phase.

Do not create UI.

Do not create random tables not present in the DB blueprint.

Do not manually create tables in Supabase dashboard.

---

## Commands to Consider

Inspect `package.json` first.

Possible commands:

```bash
npx prisma validate
npx prisma generate
npx prisma migrate dev
```

Only run migration if `.env` and database connection are ready.

---

## Acceptance Checklist

* [ ] Prisma schema exists.
* [ ] Core enums exist.
* [ ] Core models exist.
* [ ] Relations are defined.
* [ ] Indexes are defined.
* [ ] Soft delete/audit fields are handled.
* [ ] Seed foundation exists.
* [ ] Prisma schema validates.
* [ ] Prisma client generates.
* [ ] Migration created if DB is ready.
* [ ] No API business modules were implemented.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.
Use docs/localo_complete_database_blueprint.pdf only for database details.

Implement Phase 1 only: Database Foundation.

Requirements:
- Create/update Prisma schema based on the DB blueprint.
- Add enums, models, relations, and indexes.
- Add seed script foundation.
- Validate Prisma schema.
- Generate Prisma client.
- Create migration only if database connection is ready.
- Do not implement controllers/services for business modules yet.
- Do not touch frontend/UI/mobile files.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 2 — Auth + Users + RBAC

## Goal

Implement secure authentication, user foundation, refresh token handling, and role-based access control.

---

## Expected Work

* Implement auth module.
* Implement users module foundation.
* Implement password hashing.
* Implement JWT access token.
* Implement refresh token.
* Implement login.
* Implement refresh endpoint.
* Implement logout.
* Implement current user endpoint.
* Implement JWT strategy/guard.
* Implement roles decorator.
* Implement roles guard.
* Implement public decorator.
* Implement current user decorator.
* Ensure user password is never returned.
* Add Swagger documentation where appropriate.

---

## APIs Required

```txt
POST /auth/login
POST /auth/refresh
POST /auth/logout
GET  /users/me
```

Optional if included in blueprint:

```txt
POST /auth/register
```

For MVP, admin may create shop owners later. Do not add public registration unless the blueprint says so or user asks.

---

## DTOs Required

```txt
login.dto.ts
refresh-token.dto.ts
logout.dto.ts
auth-response.dto.ts
current-user-response.dto.ts
```

Possible user DTOs:

```txt
user-response.dto.ts
update-user-profile.dto.ts
```

---

## Files to Create or Update

```txt
apps/api/src/modules/auth/
apps/api/src/modules/auth/dto/
apps/api/src/modules/auth/auth.module.ts
apps/api/src/modules/auth/auth.controller.ts
apps/api/src/modules/auth/auth.service.ts
apps/api/src/modules/auth/strategies/jwt.strategy.ts

apps/api/src/modules/users/
apps/api/src/modules/users/dto/
apps/api/src/modules/users/users.module.ts
apps/api/src/modules/users/users.controller.ts
apps/api/src/modules/users/users.service.ts
apps/api/src/modules/users/users.repository.ts

apps/api/src/common/decorators/current-user.decorator.ts
apps/api/src/common/decorators/public.decorator.ts
apps/api/src/common/decorators/roles.decorator.ts

apps/api/src/common/guards/jwt-auth.guard.ts
apps/api/src/common/guards/roles.guard.ts

packages/shared-types/src/roles.ts
```

---

## Security Rules

* Never store plain text passwords.
* Never return password hashes.
* Refresh tokens should be hashed if stored.
* Expired/invalid refresh tokens must be rejected.
* Protected routes must require JWT.
* Role-protected routes must use role guard.
* Public routes must be explicitly marked public.

---

## Do Not Do

Do not implement shop CRUD in this phase.

Do not implement products in this phase.

Do not implement payments.

Do not implement UI.

---

## Acceptance Checklist

* [ ] Login works.
* [ ] Refresh token works.
* [ ] Logout invalidates refresh token where supported.
* [ ] Current user endpoint works.
* [ ] JWT guard exists.
* [ ] Roles guard exists.
* [ ] Current user decorator exists.
* [ ] Public decorator exists.
* [ ] Password hash is never returned.
* [ ] Role enums/types are shared.
* [ ] Auth module has relevant validation.
* [ ] Relevant checks pass.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.
Use the backend and DB PDFs only for auth/user/RBAC details if needed.

Implement Phase 2 only: Auth + Users + RBAC.

Requirements:
- Implement auth module.
- Implement users module foundation.
- Add login, refresh, logout, and current user endpoints.
- Add password hashing.
- Add JWT strategy/guard.
- Add roles decorator and roles guard.
- Add public and current-user decorators.
- Ensure passwords and refresh token hashes are not exposed.
- Do not implement shops/products/support yet.
- Do not touch frontend/UI/mobile files.
- Run relevant checks only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 3 — Admin Shop Management

## Goal

Allow admins to create, update, approve, reject, pause, and manage shops.

---

## Expected Work

* Implement shops module.
* Implement admin shop routes.
* Implement shop owner assignment.
* Implement shop status workflow.
* Implement shop listing with filters.
* Implement shop detail endpoint.
* Implement admin-only guards.
* Add pagination and search.
* Add audit log call if audit module foundation exists; otherwise leave TODO.

---

## APIs Required

```txt
GET    /admin/shops
POST   /admin/shops
GET    /admin/shops/:id
PATCH  /admin/shops/:id
PATCH  /admin/shops/:id/status
PATCH  /admin/shops/:id/assign-owner
```

Optional:

```txt
DELETE /admin/shops/:id
```

Prefer soft delete if deletion is required.

---

## DTOs Required

```txt
create-shop.dto.ts
update-shop.dto.ts
shop-filter.dto.ts
update-shop-status.dto.ts
assign-shop-owner.dto.ts
shop-response.dto.ts
```

---

## Models Involved

```txt
Shop
User
ShopOwner
ShopLocation
BusinessHour
AuditLog if available
```

---

## Files to Create or Update

```txt
apps/api/src/modules/shops/
apps/api/src/modules/shops/dto/
apps/api/src/modules/shops/shops.module.ts
apps/api/src/modules/shops/shops.controller.ts
apps/api/src/modules/shops/shops.service.ts
apps/api/src/modules/shops/shops.repository.ts
apps/api/src/modules/shops/shops.constants.ts
```

---

## RBAC Rules

Allowed:

```txt
SUPER_ADMIN
ADMIN
```

Not allowed:

```txt
SHOP_OWNER
SHOP_STAFF
CUSTOMER
```

---

## Do Not Do

Do not build shop owner profile routes in this phase unless required for admin assignment.

Do not build product module.

Do not build UI.

---

## Acceptance Checklist

* [ ] Admin can list shops.
* [ ] Admin can create shop.
* [ ] Admin can update shop.
* [ ] Admin can view shop detail.
* [ ] Admin can update shop status.
* [ ] Admin can assign shop owner.
* [ ] Shop filters work.
* [ ] Pagination works.
* [ ] Non-admin roles are blocked.
* [ ] Validation works.
* [ ] Relevant checks pass.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.
Use the Product/Roles, DB, and Backend PDFs only for shop-management details if needed.

Implement Phase 3 only: Admin Shop Management.

Requirements:
- Add admin shop CRUD/status/assignment APIs.
- Add DTOs, service, repository, and controller.
- Enforce ADMIN/SUPER_ADMIN access.
- Add filters and pagination for shop listing.
- Use existing Prisma models.
- Do not implement products or customer discovery yet.
- Do not touch frontend/UI/mobile files.
- Run relevant checks only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 4 — Shop Owner Profile

## Goal

Allow shop owners to view and manage only their own shop profile, location, business hours, and basic settings.

---

## Expected Work

* Implement shop-owner routes.
* Get current owner’s shop.
* Update own shop profile.
* Update own shop location.
* Update own business hours.
* Enforce ownership.
* Prevent shop owner from accessing another shop.
* Add validation.

---

## APIs Required

```txt
GET   /shop-owner/shops/me
PATCH /shop-owner/shops/me
PUT   /shop-owner/shops/me/location
PUT   /shop-owner/shops/me/business-hours
```

Optional:

```txt
PATCH /shop-owner/shops/me/status
```

Only if allowed by blueprint. Shop owners should not approve/pause their own shop unless specifically allowed.

---

## DTOs Required

```txt
update-own-shop.dto.ts
update-shop-location.dto.ts
update-business-hours.dto.ts
business-hour.dto.ts
shop-owner-shop-response.dto.ts
```

---

## Models Involved

```txt
Shop
ShopOwner
ShopLocation
BusinessHour
User
```

---

## RBAC Rules

Allowed:

```txt
SHOP_OWNER
```

Possibly:

```txt
SHOP_STAFF
```

only for permitted operations if staff permissions are implemented.

---

## Do Not Do

Do not implement products yet.

Do not implement media upload unless explicitly requested.

Do not let shop owner update approval/status fields reserved for admin.

---

## Acceptance Checklist

* [ ] Shop owner can view own shop.
* [ ] Shop owner can update allowed shop profile fields.
* [ ] Shop owner can update location.
* [ ] Shop owner can update business hours.
* [ ] Ownership is enforced.
* [ ] Shop owner cannot access another shop.
* [ ] Admin-only fields are protected.
* [ ] Relevant checks pass.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.

Implement Phase 4 only: Shop Owner Profile.

Requirements:
- Add shop-owner APIs for viewing/updating own shop.
- Add location and business-hours update endpoints.
- Enforce SHOP_OWNER role.
- Enforce ownership checks.
- Prevent updates to admin-only fields.
- Do not implement product CRUD yet.
- Do not touch frontend/UI/mobile files.
- Run relevant checks only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 5 — Categories + Products

## Goal

Implement catalog foundation: categories and product CRUD.

---

## Expected Work

* Implement categories module.
* Implement products module.
* Add admin category management.
* Add public category listing.
* Add shop owner product CRUD.
* Add product status and visibility.
* Add pricing and discount fields.
* Add product tags/search fields.
* Enforce shop ownership.
* Add pagination and filters.

---

## Category APIs Required

```txt
GET    /categories
GET    /categories/:id
POST   /admin/categories
PATCH  /admin/categories/:id
DELETE /admin/categories/:id
```

Prefer soft delete if supported.

---

## Product APIs Required

Shop owner:

```txt
GET    /shop-owner/products
POST   /shop-owner/products
GET    /shop-owner/products/:id
PATCH  /shop-owner/products/:id
DELETE /shop-owner/products/:id
PATCH  /shop-owner/products/:id/status
```

Public/customer:

```txt
GET /products
GET /products/:id
```

---

## DTOs Required

Categories:

```txt
create-category.dto.ts
update-category.dto.ts
category-filter.dto.ts
category-response.dto.ts
```

Products:

```txt
create-product.dto.ts
update-product.dto.ts
product-filter.dto.ts
update-product-status.dto.ts
product-response.dto.ts
```

---

## Models Involved

```txt
Category
Product
ProductMedia
Shop
ShopOwner
User
```

---

## RBAC Rules

Category admin writes:

```txt
SUPER_ADMIN
ADMIN
```

Product owner writes:

```txt
SHOP_OWNER
SHOP_STAFF if permission exists
```

Public reads:

```txt
public or CUSTOMER
```

---

## Do Not Do

Do not implement advanced search engine.

Do not implement payment.

Do not implement external media storage unless asked.

Product media can be represented as URLs/records first if storage is not ready.

---

## Acceptance Checklist

* [ ] Admin can create/update/delete categories.
* [ ] Public can list categories.
* [ ] Shop owner can create products for own shop.
* [ ] Shop owner can update only own products.
* [ ] Shop owner can delete/soft delete only own products.
* [ ] Product pricing and discount validation works.
* [ ] Product tags/search fields exist if in DB blueprint.
* [ ] Product listing supports filters.
* [ ] Public product read endpoints exist.
* [ ] Relevant checks pass.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.

Implement Phase 5 only: Categories + Products.

Requirements:
- Add categories module.
- Add products module.
- Add admin category management APIs.
- Add public category listing APIs.
- Add shop-owner product CRUD APIs.
- Enforce shop ownership for product writes.
- Add product filters, pagination, status, visibility, price, discount, and tags.
- Do not implement advanced search engine or payment.
- Do not touch frontend/UI/mobile files.
- Run relevant checks only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 6 — Search + Discovery

## Goal

Implement customer-facing shop and product discovery using database-backed filters.

Do not over-engineer search for MVP.

---

## Expected Work

* Implement public shop listing.
* Implement shop detail by slug/id.
* Implement product search.
* Implement category filter.
* Implement location filter.
* Implement open/closed shop filter.
* Implement pagination.
* Implement sorting.
* Ensure only approved/active shops show publicly.
* Ensure only active/visible products show publicly.

---

## APIs Required

```txt
GET /shops
GET /shops/:slug
GET /shops/:id/products

GET /products
GET /products/:id
```

Optional:

```txt
GET /search
```

Only if the blueprint defines a unified search endpoint.

---

## DTOs Required

```txt
shop-discovery-filter.dto.ts
product-discovery-filter.dto.ts
public-shop-response.dto.ts
public-product-response.dto.ts
```

---

## Models Involved

```txt
Shop
ShopLocation
BusinessHour
Category
Product
ProductMedia
Review
Favorite if needed
```

---

## Search Rules

Support simple filters first:

```txt
search text
category
shop status
product status
location/city/area
openNow
sortBy
sortOrder
page
limit
```

Advanced search engines can come later.

---

## Do Not Do

Do not add Elasticsearch/Meilisearch/Algolia unless explicitly requested.

Do not expose inactive shops/products publicly.

Do not expose private shop owner/admin data.

---

## Acceptance Checklist

* [ ] Public shop listing works.
* [ ] Public shop detail works.
* [ ] Product search works.
* [ ] Category filter works.
* [ ] Location filter works.
* [ ] Active/approved filtering works.
* [ ] Pagination works.
* [ ] Private/admin fields are hidden.
* [ ] Relevant checks pass.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.

Implement Phase 6 only: Search + Discovery.

Requirements:
- Add public shop and product discovery APIs.
- Add filters for search, category, location, status, openNow, sorting, and pagination.
- Return only approved/active shops and visible/active products.
- Do not add external search engine.
- Do not expose private/admin fields.
- Do not touch frontend/UI/mobile files.
- Run relevant checks only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 7 — Support + Commission Foundation

## Goal

Implement support tickets and commission/payment foundation.

This phase should create the backend structure needed for admin/shop owner support workflows and future monetization.

---

## Expected Work

* Implement support tickets module.
* Implement ticket messages if DB blueprint includes them.
* Implement customer/shop owner ticket creation.
* Implement admin ticket listing/status update.
* Implement commission settings.
* Implement commission ledger foundation.
* Implement payment/subscription model APIs only if blueprint requires.
* Add shop pause rule foundation for unpaid commission.
* Do not integrate external payment gateway yet unless explicitly requested.

---

## Support APIs Required

```txt
POST   /support-tickets
GET    /support-tickets/my
GET    /support-tickets/:id
POST   /support-tickets/:id/messages

GET    /admin/support-tickets
GET    /admin/support-tickets/:id
PATCH  /admin/support-tickets/:id/status
```

---

## Commission APIs Required

Admin:

```txt
GET    /admin/commission/settings
PATCH  /admin/commission/settings
GET    /admin/commission/ledger
```

Shop owner:

```txt
GET /shop-owner/commission/summary
GET /shop-owner/commission/ledger
```

Only implement what DB blueprint supports.

---

## DTOs Required

Support:

```txt
create-support-ticket.dto.ts
support-ticket-filter.dto.ts
update-support-ticket-status.dto.ts
create-support-ticket-message.dto.ts
support-ticket-response.dto.ts
```

Commission:

```txt
update-commission-setting.dto.ts
commission-ledger-filter.dto.ts
commission-summary-response.dto.ts
```

---

## Models Involved

```txt
SupportTicket
SupportTicketMessage
User
Shop
CommissionSetting
CommissionLedger
Payment
Subscription
AuditLog if available
```

---

## Do Not Do

Do not integrate Razorpay/Stripe yet unless explicitly requested.

Do not build UI.

Do not implement real billing automation unless explicitly requested.

---

## Acceptance Checklist

* [ ] Users/shop owners can create tickets.
* [ ] Users can view own tickets.
* [ ] Admin can list all tickets.
* [ ] Admin can update ticket status.
* [ ] Ticket messages work if supported.
* [ ] Commission settings foundation exists.
* [ ] Commission ledger foundation exists.
* [ ] Shop owner can view own commission summary if supported.
* [ ] Payment gateway is not integrated unless requested.
* [ ] Relevant checks pass.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.

Implement Phase 7 only: Support + Commission Foundation.

Requirements:
- Add support ticket APIs for users/shop owners and admins.
- Add ticket message support if DB blueprint includes it.
- Add commission settings and ledger foundation.
- Add shop owner commission summary if supported.
- Do not integrate payment gateway yet.
- Do not touch frontend/UI/mobile files.
- Run relevant checks only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 8 — Notifications + Audit Logs

## Goal

Record key platform events and prepare internal notification foundation.

---

## Expected Work

* Implement notifications module.
* Implement audit logs module.
* Add notification records.
* Add mark-as-read endpoints.
* Add user notification listing.
* Add admin audit log listing.
* Add audit helper service.
* Add audit calls to important workflows if those modules exist.

---

## Notification APIs Required

```txt
GET   /notifications
PATCH /notifications/:id/read
PATCH /notifications/read-all
```

---

## Audit APIs Required

```txt
GET /admin/audit-logs
GET /admin/audit-logs/:id
```

---

## DTOs Required

```txt
notification-filter.dto.ts
notification-response.dto.ts
audit-log-filter.dto.ts
audit-log-response.dto.ts
```

---

## Models Involved

```txt
Notification
AuditLog
User
Shop
```

---

## Audit Events to Track

Where modules exist, track:

```txt
user login
shop created
shop updated
shop approved
shop rejected
shop paused
shop owner assigned
product created
product updated
support ticket status changed
commission setting updated
```

Do not break existing workflows if audit is not fully wired.

---

## Do Not Do

Do not integrate push notifications yet.

Do not integrate email notifications yet.

Do not integrate SMS/WhatsApp yet.

Create records only.

---

## Acceptance Checklist

* [ ] User can list notifications.
* [ ] User can mark one notification as read.
* [ ] User can mark all notifications as read.
* [ ] Admin can list audit logs.
* [ ] Admin can view audit log detail.
* [ ] Audit helper exists.
* [ ] Key workflow audit calls are added where safe.
* [ ] No external notification provider added.
* [ ] Relevant checks pass.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.

Implement Phase 8 only: Notifications + Audit Logs.

Requirements:
- Add notification module and APIs.
- Add audit logs module and admin APIs.
- Add audit helper service.
- Add audit calls to existing key workflows where safe.
- Do not integrate push/email/SMS providers.
- Do not touch frontend/UI/mobile files.
- Run relevant checks only.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Phase 9 — Testing + Production Readiness

## Goal

Make backend stable enough to start frontend/admin/mobile development.

---

## Expected Work

* Review backend structure.
* Add or improve tests for critical modules.
* Validate Prisma schema.
* Validate migrations.
* Improve seeds.
* Review Swagger docs.
* Review error handling.
* Review RBAC.
* Review ownership checks.
* Review environment configuration.
* Review security basics.

---

## Critical Areas to Test

```txt
Auth login
Refresh token
Logout
Current user
RBAC guard
Admin shop management
Shop owner ownership
Product CRUD ownership
Public discovery filtering
Support tickets
Commission settings foundation
```

---

## Commands to Consider

Inspect `package.json` first.

Possible commands:

```bash
npm run lint
npm run build
npm run test
npx prisma validate
npx prisma generate
```

---

## Do Not Do

Do not add new product features in this phase.

Do not refactor everything.

Do not add frontend.

Do not add external services unless explicitly requested.

---

## Acceptance Checklist

* [ ] Backend builds.
* [ ] Prisma validates.
* [ ] Core tests pass.
* [ ] Auth/RBAC tested.
* [ ] Ownership tested.
* [ ] Admin shop workflow tested.
* [ ] Product ownership tested.
* [ ] Support ticket basics tested.
* [ ] Swagger docs are available.
* [ ] `.env.example` is updated.
* [ ] No secrets committed.
* [ ] Backend is ready for frontend integration.

---

## Codex Prompt

```txt
Read docs/AI_CODING_RULES.md.
Read docs/PROJECT_STRUCTURE.md.
Read docs/LOCALO_BACKEND_TASKS.md.

Implement Phase 9 only: Testing + Production Readiness.

Requirements:
- Add/improve tests for auth, RBAC, ownership, admin shops, products, support tickets, and Prisma validation.
- Review error handling and Swagger docs.
- Validate environment setup.
- Do not add new product features.
- Do not touch frontend/UI/mobile files unless required for build config.
- Run relevant checks.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Recommended First Codex Task

When Codex is available, start with this exact message:

```txt
Read docs/AI_CODING_RULES.md first.
Then read docs/PROJECT_STRUCTURE.md.
Then read docs/LOCALO_BACKEND_TASKS.md.

Use these source PDFs only when needed:
1. docs/localo_product_roles_workflows_roadmap.pdf
2. docs/localo_complete_database_blueprint.pdf
3. docs/localo_nestjs_backend_blueprint.pdf

Do not read Localo_AI_Production_Blueprint.pdf unless I explicitly ask.

Implement Phase 0 only: Project Setup.

Do not touch frontend/UI/mobile files.
Do not build business modules yet.
Run only relevant checks.

At the end, summarize completed work, files changed, commands run, checks, assumptions, and pending items.
```

---

# Final Rule

Localo backend must be built phase by phase.

Good:

```txt
Implement Phase 0 only.
```

Good:

```txt
Implement Phase 5 only: Categories + Products.
```

Bad:

```txt
Build the entire Localo backend.
```

Keep Codex focused. Keep the backend modular. Keep decisions controlled.
