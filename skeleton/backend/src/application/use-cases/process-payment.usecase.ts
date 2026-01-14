import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, Transaction } from 'src/domain/entities';
import { PaymentStatus, TransactionType } from 'src/domain/enums';
import { CreatePaymentDto } from 'src/api/payments/dtos';

@Injectable()
export class ProcessPaymentUseCase {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async execute(dto: CreatePaymentDto): Promise<Payment> {
    // 1. Verificar idempotencia
    const existingPayment = await this.paymentRepository.findOne({
      where: { idempotencyKey: dto.idempotencyKey },
    });

    if (existingPayment) {
      return existingPayment;
    }

    // 2. Crear el pago
    const payment = this.paymentRepository.create({
      userId: dto.userId,
      merchantId: dto.merchantId,
      amount: dto.amount,
      currency: dto.currency || 'COP',
      method: dto.method,
      description: dto.description,
      idempotencyKey: dto.idempotencyKey,
      externalReference: dto.externalReference,
      metadata: dto.metadata,
      status: PaymentStatus.PENDING,
    });

    const savedPayment = await this.paymentRepository.save(payment);

    // 3. Validar antifraude (simulado)
    const fraudValidation = await this.validateFraud(savedPayment);
    
    if (!fraudValidation.isValid) {
      savedPayment.status = PaymentStatus.FAILED;
      savedPayment.errorMessage = fraudValidation.reason;
      await this.paymentRepository.save(savedPayment);
      return savedPayment;
    }

    // 4. Actualizar estado a PROCESSING
    savedPayment.status = PaymentStatus.PROCESSING;
    await this.paymentRepository.save(savedPayment);

    // 5. Crear transacción de reserva
    await this.createTransaction(savedPayment, TransactionType.RESERVE);

    // 6. Procesar el pago (simulado)
    const processed = await this.processPaymentGateway(savedPayment);

    if (processed.success) {
      savedPayment.status = PaymentStatus.COMPLETED;
      await this.createTransaction(savedPayment, TransactionType.PAYMENT, true);
    } else {
      savedPayment.status = PaymentStatus.FAILED;
      savedPayment.errorMessage = processed.error;
      await this.createTransaction(savedPayment, TransactionType.RELEASE);
    }

    return await this.paymentRepository.save(savedPayment);
  }

  private async validateFraud(payment: Payment): Promise<{ isValid: boolean; reason?: string }> {
    // Simulación de validación antifraude
    // En producción, aquí iría la integración con servicio de antifraude
    
    // Ejemplo: rechazar pagos mayores a 10 millones sin verificación adicional
    if (payment.amount > 10000000) {
      return {
        isValid: false,
        reason: 'Monto excede límite sin verificación adicional',
      };
    }

    return { isValid: true };
  }

  private async processPaymentGateway(payment: Payment): Promise<{ success: boolean; error?: string }> {
    // Simulación de procesamiento con gateway de pago
    // En producción, aquí iría la integración con el proveedor de pagos real
    
    try {
      // Simular delay de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Simular éxito del 95%
      const random = Math.random();
      if (random > 0.95) {
        return {
          success: false,
          error: 'Gateway rechazó la transacción',
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

  private async createTransaction(
    payment: Payment,
    type: TransactionType,
    success: boolean = true,
  ): Promise<Transaction> {
    const transaction = this.transactionRepository.create({
      paymentId: payment.id,
      type,
      amount: payment.amount,
      currency: payment.currency,
      success,
      reference: `TXN-${Date.now()}`,
      metadata: {
        paymentMethod: payment.method,
        timestamp: new Date().toISOString(),
      },
    });

    return await this.transactionRepository.save(transaction);
  }
}
