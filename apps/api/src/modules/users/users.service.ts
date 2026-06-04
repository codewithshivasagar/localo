import { Injectable, NotFoundException } from '@nestjs/common';
import { Role } from '@localo/shared-types';
import { UsersRepository, UserWithPasswordEntity } from './users.repository';
import type { UserResponseDto } from './dto/user-response.dto';

interface UserResponseSource {
  id: string;
  email: string;
  role: string;
  status: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findCurrentUser(id: string): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toUserResponse(user);
  }

  findByEmailWithPassword(email: string): Promise<UserWithPasswordEntity | null> {
    return this.usersRepository.findByEmailWithPassword(email);
  }

  toUserResponse(user: UserResponseSource): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      role: user.role as Role,
      status: user.status,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString()
    };
  }
}
