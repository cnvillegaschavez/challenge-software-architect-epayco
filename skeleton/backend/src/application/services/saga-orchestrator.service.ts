import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, Transaction } from 'src/domain/entities';
import { PaymentStatus, TransactionType } from 'src/domain/enums';

export enum SagaStep {
  VALIDATE_USER = 'VALIDATE_USER',
  RESERVE_FUNDS = 'RESERVE_FUNDS',
  VALIDATE_FRAUD = 'VALIDATE_FRAUD',
  PROCESS_PAYMENT = 'PROCESS_PAYMENT',
  NOTIFY_USER = 'NOTIFY_USER',
  NOTIFY_MERCHANT = 'NOTIFY_MERCHANT',
}

export interface SagaState {
  paymentId: string;
  currentStep: SagaStep;
  completedSteps: SagaStep[];
  failedStep?: SagaStep;
  compensationSteps: SagaStep[];
  metadata: any;
}

@Injectable()
export class SagaOrchestratorService {
  private readonly logger = new Logger(SagaOrchestratorService.name);

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  /**
   * Ejecuta la SAGA de procesamiento de pago
   * Patrón de orquestación con compensación automática en caso de fallo
   */
  async executePaymentSaga(payment: Payment): Promise<SagaState> {
    const sagaState: SagaState = {
      paymentId: payment.id,
      currentStep: SagaStep.VALIDATE_USER,
      completedSteps: [],
      compensationSteps: [],
      metadata: {},
    };

    this.logger.log(`Iniciando SAGA para pago ${payment.id}`);

    try {
      // Paso 1: Validar usuario
      await this.executeStep(sagaState, SagaStep.VALIDATE_USER, async () => {
        return await this.validateUser(payment);
      });

      // Paso 2: Reservar fondos en wallet
      await this.executeStep(sagaState, SagaStep.RESERVE_FUNDS, async () => {
        return await this.reserveFunds(payment);
      });

      // Paso 3: Validar antifraude
      await this.executeStep(sagaState, SagaStep.VALIDATE_FRAUD, async () => {
        return await this.validateFraud(payment);
      });

      // Paso 4: Procesar pago con gateway
      await this.executeStep(sagaState, SagaStep.PROCESS_PAYMENT, async () => {
        return await this.processPayment(payment);
      });

      // Paso 5: Notificar usuario (no crítico)
      await this.executeStep(sagaState, SagaStep.NOTIFY_USER, async () => {
        return await this.notifyUser(payment);
      }, false);

      // Paso 6: Notificar comercio (no crítico)
      await this.executeStep(sagaState, SagaStep.NOTIFY_MERCHANT, async () => {
        return await this.notifyMerchant(payment);
      }, false);

      this.logger.log(`SAGA completada exitosamente para pago ${payment.id}`);
      return sagaState;

    } catch (error) {
      this.logger.error(`SAGA falló en paso ${sagaState.currentStep}: ${error.message}`);
      
      // Ejecutar compensación
      await this.compensate(sagaState, payment);
      
      throw error;
    }
  }

  /**
   * Ejecuta un paso de la SAGA
   */
  private async executeStep(
    state: SagaState,
    step: SagaStep,
    action: () => Promise<any>,
    critical: boolean = true,
  ): Promise<void> {
    state.currentStep = step;
    this.logger.log(`Ejecutando paso: ${step}`);

    try {
      const result = await action();
      state.completedSteps.push(step);
      state.metadata[step] = result;
      
    } catch (error) {
      if (critical) {
        state.failedStep = step;
        throw error;
      } else {
        this.logger.warn(`Paso no crítico ${step} falló: ${error.message}`);
      }
    }
  }

  /**
   * Ejecuta la compensación de pasos completados
   */
  private async compensate(state: SagaState, payment: Payment): Promise<void> {
    this.logger.log(`Iniciando compensación para pago ${payment.id}`);

    // Compensar en orden inverso
    const stepsToCompensate = [...state.completedSteps].reverse();

    for (const step of stepsToCompensate) {
      try {
        await this.compensateStep(step, payment, state);
        state.compensationSteps.push(step);
      } catch (error) {
        this.logger.error(`Error en compensación de ${step}: ${error.message}`);
      }
    }

    // Actualizar estado del pago
    payment.status = PaymentStatus.FAILED;
    await this.paymentRepository.save(payment);

    this.logger.log(`Compensación completada para pago ${payment.id}`);
  }

  /**
   * Compensa un paso específico
   */
  private async compensateStep(step: SagaStep, payment: Payment, state: SagaState): Promise<void> {
    switch (step) {
      case SagaStep.RESERVE_FUNDS:
        await this.releaseFunds(payment);
        break;
      case SagaStep.PROCESS_PAYMENT:
        await this.reversePayment(payment);
        break;
      default:
        this.logger.log(`No hay compensación para el paso ${step}`);
    }
  }

  // ==================== IMPLEMENTACIONES DE PASOS ====================

  private async validateUser(payment: Payment): Promise<{ valid: boolean }> {
    // TODO: Integrar con servicio de usuarios
    // Validar que el usuario existe y está activo
    return { valid: true };
  }

  private async reserveFunds(payment: Payment): Promise<{ reserved: boolean; walletId: string }> {
    // TODO: Integrar con servicio de wallet
    // Reservar fondos en la wallet del usuario
    
    const transaction = this.transactionRepository.create({
      paymentId: payment.id,
      type: TransactionType.RESERVE,
      amount: payment.amount,
      currency: payment.currency,
      success: true,
      reference: `RESERVE-${Date.now()}`,
      metadata: { step: SagaStep.RESERVE_FUNDS },
    });

    await this.transactionRepository.save(transaction);
    
    return { reserved: true, walletId: 'wallet-simulated-id' };
  }

  private async validateFraud(payment: Payment): Promise<{ valid: boolean; score: number }> {
    // TODO: Integrar con servicio de antifraude
    // Validar reglas de antifraude
    
    const fraudScore = Math.random() * 100;
    return { valid: fraudScore < 80, score: fraudScore };
  }

  private async processPayment(payment: Payment): Promise<{ processed: boolean; gatewayRef: string }> {
    // TODO: Integrar con gateway de pagos real
    
    const transaction = this.transactionRepository.create({
      paymentId: payment.id,
      type: TransactionType.PAYMENT,
      amount: payment.amount,
      currency: payment.currency,
      success: true,
      reference: `PAY-${Date.now()}`,
      metadata: { step: SagaStep.PROCESS_PAYMENT },
    });

    await this.transactionRepository.save(transaction);
    
    return { processed: true, gatewayRef: `GW-${Date.now()}` };
  }

  private async notifyUser(payment: Payment): Promise<{ notified: boolean }> {
    // TODO: Integrar con servicio de notificaciones
    // Enviar email/SMS al usuario
    return { notified: true };
  }

  private async notifyMerchant(payment: Payment): Promise<{ notified: boolean }> {
    // TODO: Integrar con servicio de notificaciones
    // Notificar al comercio sobre el pago
    return { notified: true };
  }

  // ==================== COMPENSACIONES ====================

  private async releaseFunds(payment: Payment): Promise<void> {
    // TODO: Integrar con servicio de wallet
    // Liberar fondos reservados
    
    const transaction = this.transactionRepository.create({
      paymentId: payment.id,
      type: TransactionType.RELEASE,
      amount: payment.amount,
      currency: payment.currency,
      success: true,
      reference: `RELEASE-${Date.now()}`,
      metadata: { compensation: true },
    });

    await this.transactionRepository.save(transaction);
  }

  private async reversePayment(payment: Payment): Promise<void> {
    // TODO: Integrar con gateway de pagos
    // Revertir el pago procesado
    
    const transaction = this.transactionRepository.create({
      paymentId: payment.id,
      type: TransactionType.REVERSAL,
      amount: payment.amount,
      currency: payment.currency,
      success: true,
      reference: `REVERSAL-${Date.now()}`,
      metadata: { compensation: true },
    });

    await this.transactionRepository.save(transaction);
  }
}
