# ADR-001: Arquitectura de Microservicios

## Contexto

ePayco procesa pagos electrónicos en tiempo real y planea expandirse a varios países de LATAM. Necesita escalabilidad independiente por dominio, deploys sin afectar servicios críticos, equipos autónomos y resiliencia ante fallos.

**Desafíos:** Picos de tráfico variables, payment processing no puede caer por notificaciones, disponibilidad 99.9%, auditoría completa.

---

## Decisión

Arquitectura de microservicios basada en DDD con bounded contexts:

**Servicios:** Auth (OAuth 2.0 + JWT), Wallet (saldos, reservas), Payment (procesamiento, antifraude, tokenización, event sourcing), Merchant (integración e-commerce, dispersión), Notification (email/SMS/webhooks), Audit (compliance, reportes).

**Patrones:** X-Ray tracing, API Gateway, Event Sourcing (DynamoDB), SAGA (Step Functions), Circuit Breaker.

---

## Alternativas

**Monolito Modular:** Deployment simple, ACID nativo, pero escalado uniforme y deploys riesgosos. Rechazado por no permitir escalabilidad independiente.

**Serverless Puro (Lambda):** Auto-scaling infinito pero cold starts 200-500ms inaceptables para pagos. Uso parcial: Lambda solo para compensaciones SAGA.

**Híbrido (core monolito + servicios):** Bueno para migración gradual pero no aplica en proyecto greenfield.
## Consecuencias

**Positivas:** Escalabilidad independiente, deploys sin afectar otros servicios, tecnología heterogénea, equipos autónomos, resiliencia, bounded contexts claros.

**Negativas:** Complejidad operacional, consistencia distribuida (requiere SAGA), testing de integración complejo, latencia de red, debugging distribuido.

**Mitigaciones:** X-Ray tracing, API Gateway, Event Sourcing, contract testing.

---

## Referencias

- [Building Microservices - Sam Newman](https://samnewman.io/books/building_microservices/)
- [Domain-Driven Design - Eric Evans](https://www.domainlanguage.com/ddd/)
- [Netflix Microservices Architecture](https://netflixtechblog.com/)

---

