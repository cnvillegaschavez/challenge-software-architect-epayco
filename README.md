# Prueba técnica - Arquitectura de Pagos Electrónicos

Arquitectura cloud-native en AWS para procesamiento de pagos electrónicos con alta disponibilidad, escalabilidad y observabilidad completa.

## Stack Tecnológico

**Backend**
- NestJS + TypeScript con Clean Architecture
- Microservicios con patrón SAGA para transacciones distribuidas
- TypeORM + PostgreSQL

**Frontend**
- Next.js 16 + React 19
- Tailwind CSS 4
- Server-side rendering

**Infraestructura AWS**
- ECS Fargate para microservicios
- Aurora PostgreSQL (Multi-AZ)
- ElastiCache Redis
- Step Functions para orquestación SAGA
- CloudFront + WAF

## Estructura del Proyecto

```
├── docs/                           # Documentación técnica
│   └── documento-arquitectonico.md
│
├── diagrams/                       # Diagramas C4 Model
│   ├── c1-context.md
│   ├── c2-containers.md
│   ├── c3-components.md
│   └── c4-code.md
│
├── justifications/                 # ADRs (Architecture Decision Records)
│   ├── adr-001-microservicios.md
│   ├── adr-002-saga-pattern.md
│   ├── adr-003-aws-eks.md
│   ├── adr-004-nestjs-clean-arch.md
│   └── analisis-comparativo.md
│
└── skeleton/                       # Código de referencia
    ├── backend/
    │   └── payment-service/        # Clean Architecture implementada
    │       ├── src/
    │       │   ├── domain/         # Entidades y lógica de negocio
    │       │   ├── application/    # Use Cases y SAGA Orchestrator
    │       │   ├── infrastructure/ # TypeORM, repositorios
    │       │   └── api/           # Controllers REST
    │       └── README.md
    │
    └── frontend/                   # Next.js App Router
        └── src/
```

## Decisiones Arquitectónicas

### Microservicios
Escalado independiente por servicio y deploy sin afectar toda la plataforma. Equipos autónomos trabajando en dominios separados.

### ECS Fargate
Containers serverless sin gestión de infraestructura Kubernetes. Auto-scaling más simple y time-to-market rápido. Path a EKS si crece la complejidad.

### Step Functions para SAGA
Auditoría completa, visual workflow debugging, compensaciones automáticas y retry built-in. Menos código que un orquestador custom.

### Clean Architecture
Separación clara de responsabilidades con dominio desacoplado de frameworks. Facilita testing y permite portabilidad entre clouds.

Más detalles en [justifications/](justifications/).

## Documentación

- **[Documento Arquitectónico](docs/documento-arquitectonico.md)** - Arquitectura completa del sistema
- **[Diagramas C4](diagrams/)** - Context, Containers, Components y Code
- **[ADRs](justifications/)** - Justificaciones de decisiones técnicas
- **[Backend README](skeleton/backend/README.md)** - Guía de implementación con Clean Architecture

## Seguridad

- OAuth 2.0 + JWT (RS256)
- TLS 1.3 en tránsito, AES-256 en reposo
- PCI-DSS Level 1 compliance
- AWS WAF con reglas anti-DDoS

## Performance

- Latencia P95 < 500ms
- Uptime 99.9% (SLA)
- Auto-scaling basado en CPU/memoria

## Inicio Rápido

### Backend (SQLite para desarrollo)

```bash
cd skeleton/backend
npm install
npm run start:dev
```

Swagger disponible en http://localhost:3001/swagger

### Frontend

```bash
cd skeleton/frontend
npm install
npm run dev
```

Aplicación en http://localhost:3000

