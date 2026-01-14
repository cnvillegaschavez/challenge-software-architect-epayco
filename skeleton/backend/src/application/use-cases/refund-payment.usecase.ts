import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, Transaction } from 'src/domain/entities';
import { PaymentStatus, TransactionType } from 'src/domain/enums';
import { RefundPaymentDto } from 'src/api/payments/dtos';

@Injectable()
export class RefundPaymentUseCase {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async execute(dto: RefundPaymentDto): Promise<Payment> {
    // 1. Buscar el pago
    const payment = await this.paymentRepository.findOne({
      where: { id: dto.paymentId },
      relations: ['transactions'],
    });

    if (!payment) {
      throw new NotFoundException(`Pago ${dto.paymentId} no encontrado`);
    }

    // 2. Validar que el pago pueda ser reembolsado
    if (payment.status !== PaymentStatus.COMPLETED) {
      throw new BadRequestException(
        `No se puede reembolsar un pago con estado ${payment.status}`,
      );
    }

    // 4. Verificar idempotencia del reembolso
    const existingRefund = await this.transactionRepository.findOne({
      where: {
        paymentId: payment.id,
        type: TransactionType.REFUND,
        reference: dto.idempotencyKey,
      },
    });

    if (existingRefund) {
      payment.status = PaymentStatus.REFUNDED;
      return payment;
    }

    // 5. Procesar el reembolso
    const refundResult = await this.processRefundGateway(payment);

    if (refundResult.success) {
      // 6. Crear transacción de reembolso
      await this.createRefundTransaction(payment, dto);

      // 7. Actualizar estado del pago
      payment.status = PaymentStatus.REFUNDED;
      payment.metadata = {
        ...payment.metadata,
        refundReason: dto.reason,
        refundedAt: new Date().toISOString(),
      };
    } else {
      throw new BadRequestException(
        `Error al procesar reembolso: ${refundResult.error}`,
      );
    }

    return await this.paymentRepository.save(payment);
  }

  private async processRefundGateway(payment: Payment): Promise<{ success: boolean; error?: string }> {
    // Simulación de reembolso con gateway
    // En producción, aquí iría la integración real
    
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      // Simular éxito del 98%
      const random = Math.random();
      if (random > 0.98) {
        return {
          success: false,
          error: 'Gateway rechazó el reembolso',
        };
      }

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Error de comunicación con gateway',
      };
    }
  }

  private async createRefundTransaction(
    payment: Payment,
    dto: RefundPaymentDto,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      paymentId: payment.id,
      type: TransactionType.REFUND,
      amount: payment.amount,
      currency: payment.currency,
      success: true,
      reference: dto.idempotencyKey,
      notes: dto.reason,
      metadata: {
        originalPaymentMethod: payment.method,
        timestamp: new Date().toISOString(),
      },
    });

    return await this.transactionRepository.save(transaction);
  }
}
