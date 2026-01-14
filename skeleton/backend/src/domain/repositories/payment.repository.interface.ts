import { Repository } from 'typeorm';
import { Payment } from '../entities';

export interface IPaymentRepository extends Repository<Payment> {
  findByIdempotencyKey(key: string): Promise<Payment | null>;
  findByUserId(userId: string): Promise<Payment[]>;
  findByStatus(status: string): Promise<Payment[]>;
}
