import Link from 'next/link';

export function Footer() {
	return (
		<footer className="w-full bg-secondary text-secondary-foreground py-12">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="space-y-4">
						<h3 className="font-bold text-xl mb-4">ePayco</h3>
						<p className="text-sm opacity-90">
							Plataforma de pagos electrónicos segura y confiable
						</p>
					</div>
					<div className="space-y-3">
						<h4 className="font-semibold text-base mb-4">Compañía</h4>
						<nav className="flex flex-col space-y-2 text-sm">
							<Link href="/about-us" className="hover:text-primary transition-colors">
								Sobre nosotros
							</Link>
							<Link href="/help" className="hover:text-primary transition-colors">
								Ayuda
							</Link>
						</nav>
					</div>
					<div className="space-y-3">
						<h4 className="font-semibold text-base mb-4">Legal</h4>
						<nav className="flex flex-col space-y-2 text-sm">
							<Link href="/terms-and-conditions" className="hover:text-primary transition-colors">
								Términos y Condiciones
							</Link>
						</nav>
					</div>
				</div>
				<div className="mt-8 pt-6 border-t border-white/20 text-center">
					<p className="text-sm opacity-90">© {new Date().getFullYear()} ePayco. Todos los derechos reservados.</p>
				</div>
			</div>
		</footer>
	);
}
