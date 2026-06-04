export enum ShopStatus {
  OPEN = "open",
  CLOSED = "closed",
  PAUSED = "paused",
  BUSY = "busy",
  DISABLED = "disabled"
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  EXPIRING_SOON = "expiring_soon",
  GRACE_PERIOD = "grace_period",
  SUSPENDED = "suspended",
  CANCELLED = "cancelled"
}

export enum ProductStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  OUT_OF_STOCK = "out_of_stock",
  ARCHIVED = "archived"
}

export enum InventoryStatus {
  AVAILABLE = "available",
  LOW_STOCK = "low_stock",
  OUT_OF_STOCK = "out_of_stock"
}

export enum OrderStatus {
  PLACED = "placed",
  ACCEPTED = "accepted",
  PREPARING = "preparing",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  REJECTED = "rejected",
  CANCELLED = "cancelled",
  REFUNDED = "refunded"
}

export enum PaymentMethod {
  UPI = "upi"
}

export enum PaymentStatus {
  PENDING = "pending",
  PAYMENT_CLAIMED = "payment_claimed",
  PAID = "paid",
  FAILED = "failed",
  REFUNDED = "refunded"
}

export enum DeliveryProvider {
  SELF = "self",
  RAPIDO = "rapido",
  PORTER = "porter",
  SHADOWFAX = "shadowfax"
}
