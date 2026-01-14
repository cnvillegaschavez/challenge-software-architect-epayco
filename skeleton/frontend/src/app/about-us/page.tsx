import { Container } from '@/components/custom/container';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Sobre Nosotros - Conoce a ePayco',
	description:
		'Somos ePayco, la plataforma líder para procesar pagos electrónicos en Latinoamérica. Conoce nuestra misión y visión.',
	alternates: {
		canonical: 'https://epayco.co/about-us'
	}
};

export default function AboutUsPage() {
	return (
		<Container className="pt-10">
			<h1 className="text-3xl font-bold mb-4">Sobre Nosotros</h1>

			
			<h2 className="text-2xl font-semibold mt-6 mb-2">Contacto</h2>
			<p className="mb-4">
				¿Tienes alguna idea, sugerencia o simplemente quieres saludarnos? Escríbenos a:{' '}
				<a href="mailto:correo@epayco.co" className="text-blue-600 underline">
					correo@epayco.co
				</a>
			</p>
		</Container>
	);
}
