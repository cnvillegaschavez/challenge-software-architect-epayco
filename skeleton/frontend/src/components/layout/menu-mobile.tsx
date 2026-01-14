'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { CreditCard, HelpCircle, Home, Menu, Wallet } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function MenuMobile() {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" className="md:hidden px-2" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-[250px] p-0">
				<SheetHeader>
					<SheetTitle></SheetTitle>
				</SheetHeader>
				<ul className="flex flex-col gap-4 px-6 text-lg">
					<Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
						<Home className="size-5" /> Inicio
					</Link>
					<Link href="/payments" className="flex items-center gap-2" onClick={() => setOpen(false)}>
						<CreditCard className="size-5" /> Pagos
					</Link>
					<Link href="/wallet" className="flex items-center gap-2" onClick={() => setOpen(false)}>
						<Wallet className="size-5" /> Wallet
					</Link>
					<Link href="/help" className="flex items-center gap-2" onClick={() => setOpen(false)}>
						<HelpCircle className="size-5" /> Ayuda
					</Link>
				</ul>
			</SheetContent>
		</Sheet>
	);
}
