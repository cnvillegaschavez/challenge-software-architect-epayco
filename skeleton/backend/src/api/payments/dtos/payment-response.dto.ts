import { ApiProperty } from '@nestjs/swagger';
import { PaymentStatus, PaymentMethod } from 'src/domain/enums';

export class PaymentResponseDto {
  @ApiProperty({ 
    description: 'ID único del pago',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  id: string;

  @ApiProperty({ 
    description: 'ID del usuario',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  userId: string;

  @ApiProperty({ 
    description: 'ID del comercio',
    example: '123e4567-e89b-12d3-a456-426614174002',
    nullable: true
  })
  merchantId: string;

  @ApiProperty({ 
    description: 'Monto del pago',
    example: 50000
  })
  amount: number;

  @ApiProperty({ 
    description: 'Moneda',
    example: 'COP'
  })
  currency: string;

  @ApiProperty({ 
    description: 'Estado del pago',
    enum: PaymentStatus,
    example: PaymentStatus.COMPLETED
  })
  status: PaymentStatus;

  @ApiProperty({ 
    description: 'Método de pago',
    enum: PaymentMethod,
    example: PaymentMethod.CREDIT_CARD
  })
  method: PaymentMethod;

  @ApiProperty({ 
    description: 'Descripción',
    example: 'Pago por servicio',
    nullable: true
  })
  description: string;

  @ApiProperty({ 
    description: 'Clave de idempotencia',
    example: 'payment_20260114_abc123'
  })
  idempotencyKey: string;

  @ApiProperty({ 
    description: 'Referencia externa',
    example: 'ORDER-12345',
    nullable: true
  })
  externalReference: string;

  @ApiProperty({ 
    description: 'Mensaje de error si aplica',
    nullable: true
  })
  errorMessage: string;

  @ApiProperty({ 
    description: 'Fecha de creación',
    example: '2026-01-14T10:30:00Z'
  })
  createdAt: Date;

  @ApiProperty({ 
    description: 'Última actualización',
    example: '2026-01-14T10:31:00Z'
  })
  updatedAt: Date;
}
