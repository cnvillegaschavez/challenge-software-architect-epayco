import { IsNotEmpty, IsUUID, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefundPaymentDto {
  @ApiProperty({ 
    description: 'ID del pago a reembolsar',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  paymentId: string;

  @ApiProperty({ 
    description: 'Razón del reembolso',
    example: 'Cliente solicitó cancelación',
    required: false
  })
  @IsOptional()
  @IsString()
  reason?: string;

  @ApiProperty({ 
    description: 'Clave de idempotencia para evitar reembolsos duplicados',
    example: 'refund_20260114_xyz789'
  })
  @IsNotEmpty()
  @IsString()
  idempotencyKey: string;
}
