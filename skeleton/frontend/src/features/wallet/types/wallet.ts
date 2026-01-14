export interface Wallet {
	id: string;
	userId: string;
	balance: number;
	currency: string;
	status: WalletStatus;
	createdAt: Date;
	updatedAt: Date;
}

export enum WalletStatus {
	ACTIVE = 'ACTIVE',
	BLOCKED = 'BLOCKED',
	SUSPENDED = 'SUSPENDED'
}

export interface Transaction {
	id: string;
	walletId: string;
	amount: number;
	type: TransactionType;
	status: TransactionStatus;
	description?: string;
	createdAt: Date;
}

export enum TransactionType {
	DEPOSIT = 'DEPOSIT',
	WITHDRAWAL = 'WITHDRAWAL',
	PAYMENT = 'PAYMENT',
	REFUND = 'REFUND'
}

export enum TransactionStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	FAILED = 'FAILED'
}
