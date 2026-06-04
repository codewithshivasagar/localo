import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import { hash } from 'bcryptjs';

function findRootEnv(startDir: string): string | null {
  let currentDir = startDir;

  while (true) {
    const envPath = join(currentDir, '.env');

    if (existsSync(envPath)) {
      return envPath;
    }

    const parentDir = dirname(currentDir);

    if (parentDir === currentDir) {
      return null;
    }

    currentDir = parentDir;
  }
}

function loadRootEnv() {
  const envPath = findRootEnv(process.cwd());

  if (!envPath) {
    return;
  }

  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();
    const rawValue = trimmedLine.slice(separatorIndex + 1).trim();

    if (!key || process.env[key] !== undefined) {
      continue;
    }

    process.env[key] = rawValue.replace(/^(['"])(.*)\1$/, '$2');
  }
}

loadRootEnv();

const prisma = new PrismaClient();

const SUPER_ADMIN_ROLE = {
  code: 'super_admin',
  name: 'Super Admin',
  description: 'Full platform configuration and operational access.'
} as const;

function requiredEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`${name} is required to seed an admin user.`);
  }

  return value;
}

function getNameParts(fullName: string) {
  const [firstName, ...rest] = fullName.trim().split(/\s+/);

  return {
    firstName: firstName || null,
    lastName: rest.length > 0 ? rest.join(' ') : null
  };
}

async function seedAdmin() {
  const email = requiredEnv('ADMIN_EMAIL').toLowerCase();
  const password = requiredEnv('ADMIN_PASSWORD');
  const fullName = process.env.ADMIN_NAME?.trim() || 'Localo Admin';
  const { firstName, lastName } = getNameParts(fullName);
  const passwordHash = await hash(password, 12);

  const role = await prisma.role.upsert({
    where: { code: SUPER_ADMIN_ROLE.code },
    update: {
      name: SUPER_ADMIN_ROLE.name,
      description: SUPER_ADMIN_ROLE.description,
      isSystem: true
    },
    create: {
      ...SUPER_ADMIN_ROLE,
      isSystem: true
    }
  });

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      fullName,
      firstName,
      lastName,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      userType: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      deletedAt: null
    },
    create: {
      email,
      fullName,
      firstName,
      lastName,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      userType: UserRole.SUPER_ADMIN,
      status: UserStatus.ACTIVE,
      emailVerifiedAt: new Date()
    }
  });

  const existingAssignment = await prisma.userRoleAssignment.findFirst({
    where: {
      userId: user.id,
      roleId: role.id,
      shopId: null
    }
  });

  if (!existingAssignment) {
    await prisma.userRoleAssignment.create({
      data: {
        userId: user.id,
        roleId: role.id
      }
    });
  }

  console.log(`Seeded SUPER_ADMIN user: ${email}`);
}

seedAdmin()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
