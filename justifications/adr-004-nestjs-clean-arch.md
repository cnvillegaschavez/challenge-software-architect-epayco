# ADR-004: NestJS + Clean Architecture

## Contexto

Necesitamos TypeScript con dependency injection, validación DTOs, auth integrada, testing robusto y OpenAPI automático. Equipo con experiencia Node.js/React pero sin frameworks enterprise.

**Requisito clave:** Dominio de negocio independiente de framework, base de datos, APIs externas e infraestructura AWS.

## Decisión

**NestJS + Clean Architecture** (4 capas: Domain, Application, Infrastructure, Presentation).

**Principio:** Domain NO depende de nada. Infrastructure depende de Domain (Dependency Inversion).

**Estructura:** domain/ (entities, value-objects, repository interfaces), application/ (use-cases, DTOs, mappers), infrastructure/ (TypeORM, AWS SDK, external APIs), presentation/ (controllers, event handlers).

## Alternativas

**Express.js:** Minimalista y flexible pero sin structure opinions, DI manual, testing complejo. Rechazado por falta de guardrails para equipos.

**Fastify:** Performance superior pero ecosystem pequeño, plugins limitados, menos maduro. Rechazado por ecosystem.

**Serverless Framework:** Vendor lock-in extremo, cold starts, testing difícil. Rechazado.

