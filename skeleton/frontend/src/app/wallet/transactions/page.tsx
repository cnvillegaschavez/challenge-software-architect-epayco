import { Container } from '@/components/custom/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Historial de Transacciones',
	description: 'Revisa todas tus transacciones',
	alternates: {
		canonical: 'https://epayco.co/wallet/transactions'
	}
};

export default function TransactionsPage() {
	return (
		<Container className="py-10">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Historial de Transacciones</h1>

				<Card>
					<CardHeader>
						<CardTitle>Todas las transacciones</CardTitle>
						<CardDescription>Historial completo de movimientos en tu wallet</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-center text-muted-foreground py-12">
							No hay transacciones para mostrar
						</p>
					</CardContent>
				</Card>
			</div>
		</Container>
	);
}
