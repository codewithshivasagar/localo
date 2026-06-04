import {
  BillingCycle,
  CommissionType,
  PrismaClient,
  UserRole
} from '@prisma/client';

const prisma = new PrismaClient();

const systemRoles = [
  {
    code: 'super_admin',
    name: 'Super Admin',
    description: 'Full platform configuration and operational access.'
  },
  {
    code: 'admin',
    name: 'Admin',
    description: 'Platform operations, approvals, shops, support, and billing.'
  },
  {
    code: 'shop_owner',
    name: 'Shop Owner',
    description: 'Owns and manages assigned shops.'
  },
  {
    code: 'shop_staff',
    name: 'Shop Staff',
    description: 'Handles assigned shop operations.'
  },
  {
    code: 'customer',
    name: 'Customer',
    description: 'Discovers shops, reviews, favorites, and support tickets.'
  },
  {
    code: 'support_agent',
    name: 'Support Agent',
    description: 'Manages assigned support workflows.'
  }
] as const;

const permissions = [
  { code: 'shops.read', module: 'shops', description: 'Read shop records.' },
  { code: 'shops.approve', module: 'shops', description: 'Approve or reject shops.' },
  { code: 'products.read', module: 'products', description: 'Read product records.' },
  { code: 'products.manage', module: 'products', description: 'Create and update products.' },
  { code: 'support.manage', module: 'support', description: 'Manage support tickets.' },
  { code: 'billing.manage', module: 'billing', description: 'Manage shop billing and commission.' },
  { code: 'settings.manage', module: 'settings', description: 'Manage platform settings.' }
] as const;

const rootCategories = [
  { name: 'Grocery', slug: 'grocery', sortOrder: 10 },
  { name: 'Pharmacy', slug: 'pharmacy', sortOrder: 20 },
  { name: 'Restaurants', slug: 'restaurants', sortOrder: 30 },
  { name: 'Electronics', slug: 'electronics', sortOrder: 40 },
  { name: 'Fashion', slug: 'fashion', sortOrder: 50 }
] as const;

async function seedRoles() {
  for (const role of systemRoles) {
    await prisma.role.upsert({
      where: { code: role.code },
      update: {
        name: role.name,
        description: role.description,
        isSystem: true
      },
      create: {
        ...role,
        isSystem: true
      }
    });
  }
}

async function seedPermissions() {
  for (const permission of permissions) {
    await prisma.permission.upsert({
      where: { code: permission.code },
      update: {
        module: permission.module,
        description: permission.description
      },
      create: permission
    });
  }
}

async function seedCategories() {
  for (const category of rootCategories) {
    const existingCategory = await prisma.category.findFirst({
      where: {
        parentId: null,
        slug: category.slug
      }
    });

    if (existingCategory) {
      await prisma.category.update({
        where: { id: existingCategory.id },
        data: {
          name: category.name,
          sortOrder: category.sortOrder,
          isActive: true
        }
      });
      continue;
    }

    await prisma.category.create({
      data: {
        ...category,
        level: 0
      }
    });
  }
}

async function seedCommissionPlans() {
  await prisma.commissionPlan.upsert({
    where: { code: 'standard' },
    update: {
      name: 'Standard',
      commissionType: CommissionType.PERCENTAGE,
      commissionRate: 5,
      fixedAmount: 0,
      billingCycle: BillingCycle.MONTHLY,
      gracePeriodDays: 7,
      isActive: true
    },
    create: {
      name: 'Standard',
      code: 'standard',
      commissionType: CommissionType.PERCENTAGE,
      commissionRate: 5,
      fixedAmount: 0,
      billingCycle: BillingCycle.MONTHLY,
      gracePeriodDays: 7,
      features: {
        defaultPlan: true
      }
    }
  });
}

async function seedAppSettings() {
  await prisma.appSetting.upsert({
    where: { key: 'platform.default_currency' },
    update: {
      value: 'INR',
      description: 'Default currency code for Localo.'
    },
    create: {
      key: 'platform.default_currency',
      value: 'INR',
      description: 'Default currency code for Localo.',
      isPublic: true
    }
  });

  await prisma.appSetting.upsert({
    where: { key: 'auth.default_user_role' },
    update: {
      value: UserRole.CUSTOMER,
      description: 'Default role for newly created users.'
    },
    create: {
      key: 'auth.default_user_role',
      value: UserRole.CUSTOMER,
      description: 'Default role for newly created users.',
      isPublic: false
    }
  });
}

async function seedDemoLocations() {
  const country = await prisma.country.upsert({
    where: { iso2: 'IN' },
    update: {
      name: 'India',
      currencyCode: 'INR',
      phoneCode: '+91',
      isActive: true
    },
    create: {
      iso2: 'IN',
      name: 'India',
      currencyCode: 'INR',
      phoneCode: '+91'
    }
  });

  const state = await prisma.state.upsert({
    where: {
      countryId_name: {
        countryId: country.id,
        name: 'Karnataka'
      }
    },
    update: {
      code: 'KA',
      isActive: true
    },
    create: {
      countryId: country.id,
      name: 'Karnataka',
      code: 'KA'
    }
  });

  const city = await prisma.city.upsert({
    where: {
      stateId_slug: {
        stateId: state.id,
        slug: 'bengaluru'
      }
    },
    update: {
      name: 'Bengaluru',
      isActive: true
    },
    create: {
      stateId: state.id,
      name: 'Bengaluru',
      slug: 'bengaluru'
    }
  });

  await prisma.area.upsert({
    where: {
      cityId_slug: {
        cityId: city.id,
        slug: 'indiranagar'
      }
    },
    update: {
      name: 'Indiranagar',
      pincode: '560038',
      isActive: true
    },
    create: {
      cityId: city.id,
      name: 'Indiranagar',
      slug: 'indiranagar',
      pincode: '560038'
    }
  });
}

export async function seed() {
  await seedRoles();
  await seedPermissions();
  await seedCategories();
  await seedCommissionPlans();
  await seedAppSettings();
  await seedDemoLocations();
}

seed()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
