import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';
import { appConfig } from './config/app.config';
import { databaseConfig } from './config/database.config';
import { jwtConfig } from './config/jwt.config';
import { validateEnvironment } from './config/validation.schema';
import { PrismaModule } from './database/prisma.module';
import { AuditLogsModule } from './modules/audit-logs/audit-logs.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { CommissionModule } from './modules/commission/commission.module';
import { DiscoveryModule } from './modules/discovery/discovery.module';
import { HealthModule } from './modules/health/health.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ProductsModule } from './modules/products/products.module';
import { ShopOwnersModule } from './modules/shop-owners/shop-owners.module';
import { ShopsModule } from './modules/shops/shops.module';
import { SupportTicketsModule } from './modules/support-tickets/support-tickets.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      load: [appConfig, databaseConfig, jwtConfig],
      validate: validateEnvironment
    }),
    PrismaModule,
    HealthModule,
    AuditLogsModule,
    AuthModule,
    UsersModule,
    ShopsModule,
    ShopOwnersModule,
    CategoriesModule,
    DiscoveryModule,
    ProductsModule,
    SupportTicketsModule,
    CommissionModule,
    NotificationsModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
