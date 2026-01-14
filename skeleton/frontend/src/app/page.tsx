import { Container } from '@/components/custom/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Shield, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
	return (
		<>
			{/* Hero Section */}
			<Container as="section" className="my-10">
				<div className="text-center space-y-4">
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
						Plataforma de Pagos Electrónicos
					</h1>
					<h2 className="text-xl text-muted-foreground sm:text-2xl md:text-3xl max-w-3xl mx-auto">
						Procesa pagos de forma segura, rápida y confiable en toda Latinoamérica
					</h2>
					<div className="flex gap-4 justify-center mt-8">
						<Button size="lg" asChild>
							<Link href="/auth/register">Comenzar ahora</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/about-us">Conocer más</Link>
						</Button>
					</div>
				</div>
			</Container>

			{/* Features Section */}
			<Container as="section" className="mt-16">
				<h3 className="text-2xl font-bold text-center mb-8">¿Por qué elegir ePayco?</h3>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<Card>
						<CardHeader>
							<Shield className="w-10 h-10 mb-2 text-primary" />
							<CardTitle>Seguro</CardTitle>
							<CardDescription>
								Cumplimiento PCI-DSS y encriptación de extremo a extremo
							</CardDescription>
						</CardHeader>
					</Card>
					<Card>
						<CardHeader>
							<Zap className="w-10 h-10 mb-2 text-primary" />
							<CardTitle>Rápido</CardTitle>
							<CardDescription>
								Procesamiento de transacciones en tiempo real
							</CardDescription>
						</CardHeader>
					</Card>
					<Card>
						<CardHeader>
							<CreditCard className="w-10 h-10 mb-2 text-primary" />
							<CardTitle>Múltiples métodos</CardTitle>
							<CardDescription>
								Tarjetas, PSE, transferencias y más formas de pago
							</CardDescription>
						</CardHeader>
					</Card>
					<Card>
						<CardHeader>
							<TrendingUp className="w-10 h-10 mb-2 text-primary" />
							<CardTitle>Escalable</CardTitle>
							<CardDescription>
								Crece con tu negocio sin límites de transacciones
							</CardDescription>
						</CardHeader>
					</Card>
				</div>
			</Container>

			{/* Stats Section */}
			<Container as="section" className="mt-16 mb-10">
				<Card>
					<CardHeader>
						<CardTitle className="text-center text-2xl">Estadísticas de la plataforma</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
							<div>
								<p className="text-4xl font-bold text-primary">99.9%</p>
								<p className="text-muted-foreground mt-2">Disponibilidad</p>
							</div>
							<div>
								<p className="text-4xl font-bold text-primary">{'<'}100ms</p>
								<p className="text-muted-foreground mt-2">Tiempo de respuesta</p>
							</div>
							<div>
								<p className="text-4xl font-bold text-primary">5 países</p>
								<p className="text-muted-foreground mt-2">Cobertura regional</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}
