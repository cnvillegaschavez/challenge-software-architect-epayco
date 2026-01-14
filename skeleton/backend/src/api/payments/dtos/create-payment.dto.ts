import { IsNotEmpty, IsUUID, IsNumber, IsEnum, IsString, IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod } from 'src/domain/enums';

export class CreatePaymentDto {
  @ApiProperty({ 
    description: 'ID del usuario que realiza el pago',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({ 
    description: 'ID del comercio receptor (opcional)',
    example: '123e4567-e89b-12d3-a456-426614174001',
    required: false
  })
  @IsOptional()
  @IsUUID()
  merchantId?: string;

  @ApiProperty({ 
    description: 'Monto del pago',
    example: 50000
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0.01)
  amount: number;

  @ApiProperty({ 
    description: 'Moneda del pago',
    example: 'COP',
    default: 'COP'
  })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ 
    description: 'Método de pago',
    enum: PaymentMethod,
    example: PaymentMethod.CREDIT_CARD
  })
  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @ApiProperty({ 
    description: 'Descripción del pago',
    example: 'Pago por servicio de streaming',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ 
    description: 'Clave de idempotencia para evitar pagos duplicados',
    example: 'payment_20260114_abc123'
  })
  @IsNotEmpty()
  @IsString()
  idempotencyKey: string;

  @ApiProperty({ 
    description: 'Referencia externa del comercio',
    example: 'ORDER-12345',
    required: false
  })
  @IsOptional()
  @IsString()
  externalReference?: string;

  @ApiProperty({ 
    description: 'Metadatos adicionales en formato JSON',
    example: { customerId: 'CUST-001', productId: 'PROD-123' },
    required: false
  })
  @IsOptional()
  metadata?: any;
}
