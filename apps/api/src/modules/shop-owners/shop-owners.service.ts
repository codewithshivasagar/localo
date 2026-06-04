import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthenticatedUser } from '../../common/types/authenticated-user.type';
import { UpdateBusinessHoursDto } from './dto/update-business-hours.dto';
import { UpdateOwnShopDto } from './dto/update-own-shop.dto';
import { UpdateShopLocationDto } from './dto/update-shop-location.dto';
import {
  ShopOwnerBusinessHourResponseDto,
  ShopOwnerShopResponseDto
} from './dto/shop-owner-shop-response.dto';
import {
  OwnerShopWithRelations,
  ShopOwnersRepository
} from './shop-owners.repository';

@Injectable()
export class ShopOwnersService {
  constructor(private readonly shopOwnersRepository: ShopOwnersRepository) {}

  async getOwnShop(user: AuthenticatedUser): Promise<ShopOwnerShopResponseDto> {
    const shop = await this.getOwnedShopOrThrow(user.id);
    return this.toShopResponse(shop);
  }

  async updateOwnShop(
    user: AuthenticatedUser,
    dto: UpdateOwnShopDto
  ): Promise<ShopOwnerShopResponseDto> {
    const shop = await this.getOwnedShopOrThrow(user.id);
    const updatedShop = await this.shopOwnersRepository.updateOwnedShop(shop.id, {
      name: dto.name,
      legalName: dto.legalName,
      description: dto.description,
      phone: dto.phone,
      email: dto.email,
      websiteUrl: dto.websiteUrl
    });

    return this.toShopResponse(updatedShop);
  }

  async updateLocation(
    user: AuthenticatedUser,
    dto: UpdateShopLocationDto
  ): Promise<ShopOwnerShopResponseDto> {
    const shop = await this.getOwnedShopOrThrow(user.id);
    const updatedShop = await this.shopOwnersRepository.upsertPrimaryLocation(
      shop.id,
      {
        label: dto.label ?? 'Main',
        addressLine1: dto.addressLine1,
        addressLine2: dto.addressLine2,
        areaId: dto.areaId,
        cityId: dto.cityId,
        stateId: dto.stateId,
        countryId: dto.countryId,
        pincode: dto.pincode,
        latitude: new Prisma.Decimal(dto.latitude),
        longitude: new Prisma.Decimal(dto.longitude),
        googlePlaceId: dto.googlePlaceId,
        isServiceAreaEnabled: dto.isServiceAreaEnabled ?? false,
        serviceRadiusKm:
          dto.serviceRadiusKm === undefined
            ? undefined
            : new Prisma.Decimal(dto.serviceRadiusKm)
      }
    );

    return this.toShopResponse(updatedShop);
  }

  async updateBusinessHours(
    user: AuthenticatedUser,
    dto: UpdateBusinessHoursDto
  ): Promise<ShopOwnerShopResponseDto> {
    const shop = await this.getOwnedShopOrThrow(user.id);
    const seenDays = new Set<number>();
    const businessHours = dto.businessHours.map((businessHour) => {
      if (seenDays.has(businessHour.dayOfWeek)) {
        throw new BadRequestException('Business hours cannot contain duplicate days');
      }

      seenDays.add(businessHour.dayOfWeek);

      return {
        dayOfWeek: businessHour.dayOfWeek,
        opensAt: businessHour.isClosed
          ? null
          : parseBusinessTime(businessHour.opensAt, 'opensAt'),
        closesAt: businessHour.isClosed
          ? null
          : parseBusinessTime(businessHour.closesAt, 'closesAt'),
        isClosed: businessHour.isClosed ?? false
      };
    });

    const updatedShop = await this.shopOwnersRepository.replaceBusinessHours(
      shop.id,
      businessHours
    );

    return this.toShopResponse(updatedShop);
  }

  private async getOwnedShopOrThrow(ownerUserId: string) {
    const shop = await this.shopOwnersRepository.findOwnedShop(ownerUserId);

    if (!shop) {
      throw new NotFoundException('Owned shop not found');
    }

    return shop;
  }

  private toShopResponse(shop: OwnerShopWithRelations): ShopOwnerShopResponseDto {
    const primaryLocation = shop.locations[0];

    return {
      id: shop.id,
      name: shop.name,
      slug: shop.slug,
      legalName: shop.legalName,
      description: shop.description,
      status: shop.status,
      verificationStatus: shop.verificationStatus,
      commissionStatus: shop.commissionStatus,
      phone: shop.phone,
      email: shop.email,
      websiteUrl: shop.websiteUrl,
      ratingAvg: shop.ratingAvg.toString(),
      ratingCount: shop.ratingCount,
      createdAt: shop.createdAt.toISOString(),
      updatedAt: shop.updatedAt.toISOString(),
      location: primaryLocation
        ? {
            id: primaryLocation.id,
            label: primaryLocation.label,
            addressLine1: primaryLocation.addressLine1,
            addressLine2: primaryLocation.addressLine2,
            pincode: primaryLocation.pincode,
            latitude: primaryLocation.latitude.toString(),
            longitude: primaryLocation.longitude.toString(),
            googlePlaceId: primaryLocation.googlePlaceId,
            isPrimary: primaryLocation.isPrimary,
            isServiceAreaEnabled: primaryLocation.isServiceAreaEnabled,
            serviceRadiusKm: primaryLocation.serviceRadiusKm?.toString() ?? null
          }
        : null,
      businessHours: shop.businessHours.map(toBusinessHourResponse)
    };
  }
}

const toBusinessHourResponse = (
  businessHour: OwnerShopWithRelations['businessHours'][number]
): ShopOwnerBusinessHourResponseDto => ({
  id: businessHour.id,
  dayOfWeek: businessHour.dayOfWeek,
  opensAt: formatBusinessTime(businessHour.opensAt),
  closesAt: formatBusinessTime(businessHour.closesAt),
  isClosed: businessHour.isClosed
});

const parseBusinessTime = (value: string | undefined, field: string) => {
  if (!value) {
    throw new BadRequestException(`${field} is required when the shop is open`);
  }

  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value);

  if (!match) {
    throw new BadRequestException(`${field} must use HH:mm format`);
  }

  return new Date(`1970-01-01T${value}:00.000Z`);
};

const formatBusinessTime = (value: Date | null) =>
  value ? value.toISOString().slice(11, 16) : null;
