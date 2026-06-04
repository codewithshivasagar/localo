import {
  Injectable,
  ValidationPipe as NestValidationPipe,
  ValidationPipeOptions
} from '@nestjs/common';

const validationPipeOptions: ValidationPipeOptions = {
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true
  }
};

@Injectable()
export class ApiValidationPipe extends NestValidationPipe {
  constructor() {
    super(validationPipeOptions);
  }
}
