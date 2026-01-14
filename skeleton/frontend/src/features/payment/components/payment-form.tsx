'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { PaymentMethod } from '../types/payment';

export function PaymentForm() {
	const [amount, setAmount] = useState('');
	const [method, setMethod] = useState<PaymentMethod | ''>('');

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement payment processing
		console.log('Processing payment:', { amount, method });
	};

	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Procesar Pago</CardTitle>
				<CardDescription>Ingresa los detalles del pago</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="amount">Monto</Label>
						<Input
							id="amount"
							type="number"
							placeholder="0.00"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
							required
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="method">Método de Pago</Label>
						<Select value={method} onValueChange={(value) => setMethod(value as PaymentMethod)}>
							<SelectTrigger id="method">
								<SelectValue placeholder="Selecciona un método" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={PaymentMethod.CREDIT_CARD}>Tarjeta de Crédito</SelectItem>
								<SelectItem value={PaymentMethod.DEBIT_CARD}>Tarjeta de Débito</SelectItem>
								<SelectItem value={PaymentMethod.PSE}>PSE</SelectItem>
								<SelectItem value={PaymentMethod.BANK_TRANSFER}>Transferencia Bancaria</SelectItem>
								<SelectItem value={PaymentMethod.WALLET}>Wallet</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Button type="submit" className="w-full">
						Procesar Pago
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
