# Decisiones Pendientes

## Alta Prioridad (Q1 2026)

**Estrategia de Caching:** Evaluar ElastiCache Redis vs DynamoDB DAX para reducir latencia consultas frecuentes (saldos, tarifas). Requiere load testing real.

**DR Multi-región:** Definir RPO/RTO. Evaluar activo-pasivo vs activo-activo. Trade-off: costo adicional $800-1,200/mes vs uptime 99.99%.

## Media Prioridad (Q2 2026)

**Observabilidad:** AWS X-Ray vs Datadog vs New Relic. X-Ray es económico pero Datadog tiene mejores dashboards. Decidir post-MVP basado en métricas reales.

**API Rate Limiting:** Evaluar AWS WAF vs Kong vs implementación custom. Decisión depende de patrones de tráfico reales.

## Baja Prioridad (Post-Lanzamiento)

**GraphQL Federation:** Evaluar si API Gateway unificado justifica complejidad. Decisión basada en feedback desarrolladores frontend.

**Service Mesh:** Istio/Linkerd solo si complejidad networking lo justifica (15+ microservicios). Hoy overhead innecesario.
