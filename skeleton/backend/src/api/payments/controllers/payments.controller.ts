import { Controller, Post, Get, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ProcessPaymentUseCase, RefundPaymentUseCase, GetPaymentUseCase } from 'src/application/use-cases';
import { CreatePaymentDto, RefundPaymentDto, PaymentResponseDto } from 'src/api/payments/dtos';

@ApiTags('Payments')
@ApiBearerAuth('token')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly processPaymentUseCase: ProcessPaymentUseCase,
    private readonly refundPaymentUseCase: RefundPaymentUseCase,
    private readonly getPaymentUseCase: GetPaymentUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Procesar un nuevo pago',
    description: 'Crea y procesa una nueva transacción de pago. Incluye validación de antifraude e idempotencia.'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Pago procesado exitosamente',
    type: PaymentResponseDto 
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.processPaymentUseCase.execute(createPaymentDto);
  }

  @Post('refund')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Reembolsar un pago',
    description: 'Procesa el reembolso de un pago completado'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Reembolso procesado exitosamente',
    type: PaymentResponseDto 
  })
  @ApiResponse({ status: 400, description: 'El pago no puede ser reembolsado' })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async refundPayment(@Body() refundPaymentDto: RefundPaymentDto) {
    return await this.refundPaymentUseCase.execute(refundPaymentDto);
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Obtener detalles de un pago',
    description: 'Retorna la información completa de un pago incluyendo sus transacciones'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Pago encontrado',
    type: PaymentResponseDto 
  })
  @ApiResponse({ status: 404, description: 'Pago no encontrado' })
  async getPayment(@Param('id') id: string) {
    return await this.getPaymentUseCase.execute(id);
  }

  @Get('user/:userId')
  @ApiOperation({ 
    summary: 'Obtener pagos de un usuario',
    description: 'Lista todos los pagos de un usuario específico'
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de pagos',
    type: [PaymentResponseDto] 
  })
  async getPaymentsByUser(@Param('userId') userId: string) {
    return await this.getPaymentUseCase.findByUser(userId);
  }
}
