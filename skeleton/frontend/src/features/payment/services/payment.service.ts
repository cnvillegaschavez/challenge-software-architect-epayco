import { CreatePaymentRequest, Payment, PaymentResponse } from '../types/payment';

// TODO: Implement actual API calls
export class PaymentService {
	static async createPayment(data: CreatePaymentRequest): Promise<PaymentResponse> {
		// TODO: Replace with actual API call
		throw new Error('Not implemented');
	}

	static async getPayment(paymentId: string): Promise<Payment> {
		// TODO: Replace with actual API call
		throw new Error('Not implemented');
	}

	static async listPayments(userId: string): Promise<Payment[]> {
		// TODO: Replace with actual API call
		throw new Error('Not implemented');
	}

	static async cancelPayment(paymentId: string): Promise<Payment> {
		// TODO: Replace with actual API call
		throw new Error('Not implemented');
	}
}
