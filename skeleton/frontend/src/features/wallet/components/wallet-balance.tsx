'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface WalletBalanceProps {
	balance?: number;
	currency?: string;
}

export function WalletBalance({ balance = 0, currency = 'COP' }: WalletBalanceProps) {
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('es-CO', {
			style: 'currency',
			currency: currency
		}).format(amount);
	};

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">Balance de Wallet</CardTitle>
				<DollarSign className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{formatCurrency(balance)}</div>
				<p className="text-xs text-muted-foreground mt-1">Disponible para transacciones</p>
			</CardContent>
		</Card>
	);
}
