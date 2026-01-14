# ADR-002: SAGA Pattern con AWS Step Functions

## Contexto

Un pago involucra 6+ pasos distribuidos: ValidateUser → CheckBalance → ReserveFunds → ProcessPayment → CreditMerchant → SendNotification.

**Desafíos:** Cada servicio tiene su BD (database per service), no podemos usar 2PC (no escala en cloud), cualquier paso puede fallar, necesitamos rollback consistente, PCI-DSS requiere auditoría completa.

**Por qué NO 2-Phase Commit:** Latencia alta, bloqueo de recursos, punto único de falla, no apto para cloud.

## Decisión

SAGA Pattern usando AWS Step Functions como orquestador.

**Por qué Step Functions:**

1. Auditoría PCI-DSS nativa: Logs inmutables, execution history completo, trazabilidad de cada decisión.
2. Visual debugging: Flujo gráfico en consola AWS, ver ejecuciones en tiempo real.
3. Error handling declarativo: Retry con backoff, catch blocks, timeout automático.
4. Compensaciones declarativas: Catch → invoke Lambda compensación.
5. Time-to-market: Días vs 2-3 semanas custom.

**Costos:** ~$200/mes (1M tx × 8 steps) vs 2-3 semanas desarrollo + mantenimiento.

## Flujos

**Éxito:** Reserve → Process → Credit → Notify → COMPLETED

**Fallo:** Reserve → Process (FRAUD) → Unreserve → Notify Failure → FAILED (compensated)

## Consecuencias

**Positivas:** Consistencia eventual garantizada, resiliencia, visibilidad centralizada, debugging fácil, idempotencia, auditoría completa.

**Negativas:** Más código que ACID, procesamiento asíncrono, consistencia eventual visible para usuario, testing de todos los escenarios.

**Mitigaciones:** Timeout 30s, retry con backoff, Dead Letter Queue, monitoring de SAGAs > 5min.

## Alternativas

**SAGA Custom (NestJS):** Portabilidad y control total pero 2-3 semanas desarrollo y sin auditoría nativa. Rechazado por time-to-market y PCI-DSS.

**SAGA Coreografiada:** Desacoplamiento máximo pero debugging imposible. Rechazado por falta de visibilidad.

**2PC:** Bloqueante, no funciona en cloud. Rechazado.

---

## Referencias

- [Saga Pattern - Chris Richardson](https://microservices.io/patterns/data/saga.html)
- [Designing Data-Intensive Applications - Martin Kleppmann](https://dataintensive.net/)
- [AWS Step Functions for SAGA](https://aws.amazon.com/blogs/compute/implementing-the-saga-pattern-with-aws-step-functions/)
