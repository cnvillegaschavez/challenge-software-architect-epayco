import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment, Transaction } from '../../domain/entities';
import { PaymentsController } from './controllers/payments.controller';
import { ProcessPaymentUseCase, RefundPaymentUseCase, GetPaymentUseCase } from '../../application/use-cases';
import { SagaOrchestratorService } from '../../application/services';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Transaction])],
  controllers: [PaymentsController],
  providers: [
    ProcessPaymentUseCase,
    RefundPaymentUseCase,
    GetPaymentUseCase,
    SagaOrchestratorService,
  ],
  exports: [
    ProcessPaymentUseCase,
    RefundPaymentUseCase,
    GetPaymentUseCase,
    SagaOrchestratorService,
  ],
})
export class PaymentsModule {}
