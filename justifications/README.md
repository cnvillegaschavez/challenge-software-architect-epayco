# Justificaciones Arquitectónicas

Análisis de decisiones técnicas para la plataforma de pagos.

## ADRs (Architecture Decision Records)

- **[ADR-001](adr-001-microservicios.md)** - Arquitectura de Microservicios
- **[ADR-002](adr-002-saga-pattern.md)** - SAGA Pattern con Step Functions
- **[ADR-003](adr-003-aws-eks.md)** - ECS Fargate para Orquestación
- **[ADR-004](adr-004-nestjs-clean-arch.md)** - NestJS + Clean Architecture

## Análisis Complementarios

- **[Análisis Comparativo](analisis-comparativo.md)** - EKS vs Fargate, Custom SAGA vs Step Functions
- **[Decisiones Pendientes](decisiones-pendientes.md)** - Trade-offs activos y preguntas abiertas

---

## Decisiones Principales

**Arquitectura:** Microservicios (6 servicios) para escalabilidad independiente.

**Orquestación:** ECS Fargate sobre EKS. Setup en días vs semanas, menos complejidad operacional.

**SAGA Pattern:** AWS Step Functions sobre orquestador custom. Auditoría PCI-DSS nativa, ahorro de desarrollo ~$12k.

**Base de Datos:** Aurora PostgreSQL Multi-AZ para ACID transaccional.

**Backend:** NestJS + Clean Architecture. Type safety end-to-end, portabilidad.

**Frontend:** Next.js con SSR/SSG para SEO y performance.

**Multi-región:** Activo-pasivo (RTO 30min, +$450/mes) sobre single región.

## Análisis Comparativo

**EKS + Custom SAGA:** Score 5.6/10
**Fargate + Step Functions:** Score 8.1/10 (seleccionada)

Fargate gana en time-to-market (9/10 vs 4/10), complejidad ops (9/10 vs 3/10), y PCI-DSS compliance (9/10 vs 5/10). EKS es marginalmente mejor en costo ($613 vs $665/mes) pero el ahorro operacional de Fargate (~$36k/año) supera ampliamente la diferencia.

## Costos

**Primary (us-east-1):** $1,720/mes (Fargate $500, Aurora $400, Redis $200, Step Functions $200, otros $420)

**DR (us-west-2):** $450/mes (Aurora replica, ALB, S3 CRR)

**Total:** $2,170/mes (~$26k/año)

**ROI Step Functions:** Break-even en 3 meses, ahorro neto año 1 ~$9,600 vs desarrollo custom.

## Decisiones Pendientes

**Alta prioridad:** Schema evolution strategy, API versioning, coverage targets, load testing CQRS.

**Media prioridad:** Service mesh evaluation, feature flags, DR drill frequency.

**Baja prioridad:** GraphQL, chaos engineering, multi-región activo-activo.

## Métricas de Éxito

**Performance:** Latencia P95 < 500ms, throughput alto en picos, overhead Clean Arch < 50ms.

**Disponibilidad:** SLA 99.9%, RPO < 10min, RTO < 1h.

**Calidad:** Coverage > 80% (domain > 90%), < 5 bugs/mes producción.

**Time-to-market:** Setup infra 2-3 días, onboarding dev < 2 semanas.

## Filosofía

"Choose boring technology, optimize for time-to-market, embrace managed services"

Pragmatismo sobre purismo. Step Functions managed sobre custom SAGA elegante. Equipo pequeño necesita servicios managed más que control total.

**Decisiones reversibles (bajo costo):** TypeORM → Prisma, Redis → Memcached, REST → GraphQL, Fargate → EKS.

**Decisiones irreversibles (alto costo):** AWS → otro cloud, PostgreSQL → MongoDB, microservicios → monolito.

Lección: Diferir decisiones irreversibles hasta tener información suficiente.

---

## Referencias

- [Architecture Decision Records - Michael Nygard](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/)
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)


