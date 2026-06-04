import { OrderStatus, ShopStatus, SubscriptionStatus } from "@localo/constants";

export function canShopReceiveOrders(shopStatus: ShopStatus, subscriptionStatus: SubscriptionStatus) {
  return shopStatus === ShopStatus.OPEN && subscriptionStatus === SubscriptionStatus.ACTIVE;
}

export function canTransitionOrder(from: OrderStatus, to: OrderStatus) {
  const transitions: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.PLACED]: [OrderStatus.ACCEPTED, OrderStatus.REJECTED, OrderStatus.CANCELLED],
    [OrderStatus.ACCEPTED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
    [OrderStatus.PREPARING]: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.CANCELLED],
    [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED],
    [OrderStatus.DELIVERED]: [],
    [OrderStatus.REJECTED]: [],
    [OrderStatus.CANCELLED]: [],
    [OrderStatus.REFUNDED]: []
  };

  return transitions[from]?.includes(to) ?? false;
}
