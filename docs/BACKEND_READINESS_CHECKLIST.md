# Backend Readiness Checklist

## Completed Backend Phases

- Phase 0: Project setup
- Phase 1: Database foundation
- Auth/RBAC foundation
- Phase 3: Admin shop management
- Phase 4: Shop owner profile
- Phase 5: Categories and products
- Phase 6: Search and discovery
- Phase 7: Support and commission foundation
- Phase 8: Notifications and audit logs
- Phase 9: Testing and production readiness foundation

## Current Readiness Status

- Prisma schema validates and client generation is expected to run before deploy.
- API, database package, and shared types have typecheck scripts.
- Swagger is configured at `/docs` in the NestJS API.
- Global JWT and role guards are registered in `AppModule`.
- Critical ownership and visibility rules have targeted unit coverage.
- `.env.example` uses placeholders only and documents `DATABASE_URL` plus `DIRECT_URL`.

## Security And Ownership Notes

- User responses do not expose `passwordHash` or refresh token records.
- Auth refresh tokens are stored hashed and rotated on refresh.
- Public shop/product discovery only exposes active, approved, non-deleted records.
- Shop owner product/profile routes are scoped to the authenticated owner shop.
- Support ticket user routes are scoped to creator or owned shop context.
- Notification routes are scoped to the authenticated user.
- Audit log responses redact sensitive-looking keys before returning stored JSON.

## Intentionally Not Implemented Yet

- Frontend, admin UI, partner UI, and mobile screens
- Payment gateway integration
- Real billing automation
- Push, email, SMS, WhatsApp, Firebase, OneSignal, SendGrid, or Twilio delivery
- External search infrastructure such as Elasticsearch, Meilisearch, Algolia, or Redis
- Queue workers or background automation
- Full end-to-end tests against a seeded test database

## Known TODOs

- Add integration/e2e tests once a stable test PostgreSQL database is available.
- Add distance sorting and timezone-aware open-hours logic when shop timezone rules are modeled.
- Expand audit coverage for login and product workflows if deeper operational traceability is required.
- Add provider-backed notification delivery only after product requirements are finalized.
- Add CI steps for Prisma validate, Prisma generate, typecheck, and backend tests.

## Recommended Next Step Before UI Integration

- Run the backend readiness command set in CI or locally:
  - `corepack pnpm --filter @localo/api typecheck`
  - `corepack pnpm --filter @localo/api test`
  - `corepack pnpm --filter @localo/db typecheck`
  - `corepack pnpm --filter @localo/shared-types typecheck`
  - `corepack pnpm --filter @localo/db exec prisma validate --schema prisma/schema.prisma`
  - `corepack pnpm --filter @localo/db generate`

