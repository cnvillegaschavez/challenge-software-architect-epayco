'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/accordion';

const faqs = [
	{
		question: '¿Cómo funciona esto?',
		answer:
			'Es bastante simple. Puedes hacer pagos usando diferentes métodos como tarjetas o PSE, y también tienes una wallet para guardar dinero y pagar más rápido. Todo se procesa al instante.'
	},
	{
		question: '¿Es seguro?',
		answer:
			'Sí, usamos los mismos estándares de seguridad que los bancos. Tus datos están encriptados y protegidos todo el tiempo.'
	}
];

export default function FAQAcordion() {
	return (
		<Accordion type="single" collapsible className="w-full">
			{faqs.map((faq, index) => (
				<AccordionItem key={index} value={`item-${index}`}>
					<AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
					<AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
