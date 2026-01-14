import type { Metadata } from 'next';
import './globals.css';
import { geistMono, geistSans } from './fonts';
import Providers from './providers';
import { Layout } from '@/components/layout/layout';
import { Toaster } from '@/components/ui/sonner';
import { ConfirmDialog } from '@/components/custom/confirm-dialog';
import { GoogleAnalytics } from '@next/third-parties/google';
import { configEnv } from '@/core/config';

export const metadata: Metadata = {
	title: {
		default: 'ePayco - Plataforma de Pagos Electrónicos',
		template: '%s | ePayco'
	},
	icons: {
		icon: [
			{ url: '/epayco.svg', type: 'image/svg' },
			{ url: '/epayco.svg', type: 'image/svg' }
		],
		shortcut: '/epayco.svg',
		apple: '/epayco.svg'
	},
	description:
		'ePayco - Plataforma segura de pagos electrónicos. Procesa pagos, gestiona transacciones y acepta múltiples métodos de pago.',
	keywords: [
		'pagos electrónicos',
		'pasarela de pagos',
		'ePayco',
		'procesar pagos',
		'pagos online',
		'transacciones',
		'gateway de pagos',
		'PSE',
		'tarjetas crédito'
	],
	authors: [{ name: 'ePayco' }],
	creator: 'ePayco',
	publisher: 'ePayco',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1
		}
	},
	openGraph: {
		type: 'website',
		locale: 'es_CO',
		url: 'https://epayco.co',
		siteName: 'ePayco',
		title: 'ePayco - Plataforma de Pagos Electrónicos',
		description:
			'ePayco plataforma de pagos electronicos',
		images: [
			{
				url: '/epayco.svg',
				width: 1200,
				height: 630,
				alt: 'ePayco - Plataforma de Pagos'
			}
		]
	},
	twitter: {
		card: 'summary_large_image',
		title: 'ePayco - Plataforma de Pagos',
		description: 'Procesa pagos de forma segura con ePayco.',
		images: ['/epayco.svg']
	},
	verification: {
		google: configEnv.googleSearchConsole || ''
	},
	alternates: {
		canonical: 'https://epayco.co'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen w-full bg-background text-foreground flex flex-col`}
			>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
				<Toaster position="top-center" richColors />
				<ConfirmDialog />
				<GoogleAnalytics gaId={configEnv.gaId} />
			</body>
		</html>
	);
}
