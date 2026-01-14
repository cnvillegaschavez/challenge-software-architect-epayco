import { Container } from '@/components/custom/container';
import { PaymentForm } from '@/features/payment/components/payment-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Procesar Pago',
	description: 'Realiza pagos de forma segura con ePayco',
	alternates: {
		canonical: 'https://epayco.co/payments'
	}
};

export default function PaymentsPage() {
	return (
		<Container className="py-10">
			<div className="max-w-2xl mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">Procesar Pago</h1>
					<p className="text-muted-foreground">
						Completa el formulario para procesar tu pago de forma segura
					</p>
				</div>
				<PaymentForm />
			</div>
		</Container>
	);
}
