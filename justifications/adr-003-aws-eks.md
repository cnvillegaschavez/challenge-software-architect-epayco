# ADR-003: ECS Fargate vs EKS

## Contexto

6 microservicios (auth, wallet, payment, merchant, notification, audit) necesitan auto-scaling, rolling updates, service discovery, health checks y multi-AZ.

**Restricciones:** MVP en 2-3 meses, equipo de 3-4 devs sin expertise K8s profundo, presupuesto ~$2,000/mes, sin portabilidad multi-cloud a corto plazo.

## Decisión

**Amazon ECS Fargate** (serverless containers).

**Razones:**

1. Zero infrastructure: No EC2, no AMIs, no capacity planning.
2. Setup 2-3 días vs 3-4 semanas EKS.
3. Auto-scaling simplificado: ALB + CloudWatch directo.
4. Seguridad: IAM roles por task, aislamiento task-level, Secrets Manager nativo.
5. Costos predecibles: Pay-per-second, sin over-provisioning.

## Patrón Híbrido Lambda + Fargate

**Fargate** para servicios core (auth, wallet, payment, merchant, notification, audit): API síncrona, latencia <100ms, tráfico sostenido >100K req/día.

**Lambda** para casos esporádicos: Compensaciones SAGA (<1% tx, ahorra $150/mes vs Fargate 24/7), webhooks salientes, batch reports mensuales.

**Break-even:** 100K req/día → Fargate más económico. <100K/día → Lambda.

**Costo:** Fargate $480/mes + Lambda $20/mes = $500/mes (vs $660/mes puro Fargate).

## Alternativas

**EKS:** Setup 3-4 semanas, requiere 0.5 FTE ops, $600-800/mes. Rechazado por timeline y equipo pequeño. Reconsiderar si crecemos a 20+ servicios o necesitamos multi-cloud.

**ECS sobre EC2:** 30% más barato pero gestión manual de AMIs y patching. Rechazado por overhead operacional.

**Lambda puro:** Cold starts 200-500ms inaceptables para payments. Uso híbrido solamente.

## Consecuencias

**Positivas:** Zero infrastructure management, setup en días, auto-scaling nativo, costos predecibles, task roles granulares, integración AWS nativa.

**Negativas:** Vendor lock-in AWS, 20-30% más caro que EC2 en escala, menos flexible que K8s.

**Mitigaciones:** Clean Architecture para portabilidad, Terraform IaC, AWS Budgets, path documentado a EKS si complejidad aumenta.

