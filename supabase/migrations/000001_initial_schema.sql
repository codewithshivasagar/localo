-- Localo initial schema placeholder
-- Use UUID primary keys, foreign keys, indexes, and RLS from day one.

create extension if not exists "pgcrypto";

-- Example enums
create type shop_status as enum ('open', 'closed', 'paused', 'busy', 'disabled');
create type order_status as enum ('placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'rejected', 'cancelled', 'refunded');

-- Add full tables after UX/database freeze:
-- users, shops, shop_users, products, product_variants, orders, order_items, media, support, notifications, subscriptions.
