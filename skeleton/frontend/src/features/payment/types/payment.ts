export enum PaymentStatus {
	PENDING = 'PENDING',
	PROCESSING = 'PROCESSING',
	COMPLETED = 'COMPLETED',
	FAILED = 'FAILED',
	CANCELLED = 'CANCELLED'
}

export enum PaymentMethod {
	CREDIT_CARD = 'CREDIT_CARD',
	DEBIT_CARD = 'DEBIT_CARD',
	PSE = 'PSE',
	BANK_TRANSFER = 'BANK_TRANSFER',
	WALLET = 'WALLET'
}

export interface Payment {
	id: string;
	amount: number;
	currency: string;
	status: PaymentStatus;
	method: PaymentMethod;
	merchantId: string;
	userId: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreatePaymentRequest {
	amount: number;
	currency: string;
	method: PaymentMethod;
	merchantId: string;
	description?: string;
}

export interface PaymentResponse {
	payment: Payment;
	transactionId: string;
	redirectUrl?: string;
}
