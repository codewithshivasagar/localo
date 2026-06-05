export const createShopStepIds = {
  basicInfo: 'basic-info',
  contact: 'contact',
  category: 'category',
  location: 'location',
  payment: 'payment',
  review: 'review'
} as const;

export type CreateShopStepId = (typeof createShopStepIds)[keyof typeof createShopStepIds];

export interface CreateShopStepConfig {
  description: string;
  id: CreateShopStepId;
  optional?: boolean;
  title: string;
}

export const createShopSteps: CreateShopStepConfig[] = [
  {
    description: 'Shop identity',
    id: createShopStepIds.basicInfo,
    title: 'Basic Info'
  },
  {
    description: 'Phone and email',
    id: createShopStepIds.contact,
    title: 'Contact Details'
  },
  {
    description: 'Discovery setup',
    id: createShopStepIds.category,
    title: 'Category & Discovery'
  },
  {
    description: 'Address and map',
    id: createShopStepIds.location,
    title: 'Location'
  },
  {
    description: 'Optional payout info',
    id: createShopStepIds.payment,
    optional: true,
    title: 'Shop Payment Details'
  },
  {
    description: 'Final check',
    id: createShopStepIds.review,
    title: 'Review & Create'
  }
];
