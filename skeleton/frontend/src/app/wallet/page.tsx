import { Container } from '@/components/custom/container';
import { WalletBalance } from '@/features/wallet/components/wallet-balance';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowDownToLine, ArrowUpFromLine, History } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Mi Wallet',
	description: 'Gestiona tu wallet y revisa tus transacciones',
	alternates: {
		canonical: 'https://epayco.co/wallet'
	}
};

export default function WalletPage() {
	return (
		<Container className="py-10">
			<div className="max-w-4xl mx-auto">
				<h1 className="text-3xl font-bold mb-8">Mi Wallet</h1>

				<div className="grid gap-6">
					<WalletBalance balance={0} currency="COP" />

					<Card>
						<CardHeader>
							<CardTitle>Acciones rápidas</CardTitle>
							<CardDescription>Gestiona tu dinero</CardDescription>
						</CardHeader>
						<CardContent className="flex gap-4">
							<Button variant="outline" className="flex-1">
								<ArrowDownToLine className="mr-2 h-4 w-4" />
								Depositar
							</Button>
							<Button variant="outline" className="flex-1">
								<ArrowUpFromLine className="mr-2 h-4 w-4" />
								Retirar
							</Button>
							<Button variant="outline" className="flex-1" asChild>
								<Link href="/wallet/transactions">
									<History className="mr-2 h-4 w-4" />
									Historial
								</Link>
							</Button>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Transacciones recientes</CardTitle>
							<CardDescription>Últimas actividades de tu wallet</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-center text-muted-foreground py-8">
								No hay transacciones recientes
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</Container>
	);
}
