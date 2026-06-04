import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

const userSelect = {
  id: true,
  email: true,
  role: true,
  status: true,
  firstName: true,
  lastName: true,
  phone: true,
  createdAt: true,
  updatedAt: true
};

const userWithPasswordSelect = {
  ...userSelect,
  passwordHash: true
};

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
        deletedAt: null
      },
      select: userSelect
    });
  }

  findByEmailWithPassword(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        deletedAt: null
      },
      select: userWithPasswordSelect
    });
  }
}

export type UserEntity = NonNullable<
  Awaited<ReturnType<UsersRepository['findById']>>
>;

export type UserWithPasswordEntity = NonNullable<
  Awaited<ReturnType<UsersRepository['findByEmailWithPassword']>>
>;
