1. Objetivo de la Prueba 

Evaluar la capacidad del candidato para diseñar, justificar y comunicar una arquitectura de software cloud-native sobre AWS, aplicando buenas prácticas de arquitectura, resiliencia, seguridad y escalabilidad, alineadas a un contexto empresarial real. 

La prueba prioriza: 

Criterio arquitectónico 

Experiencia práctica demostrable 

Capacidad de toma de decisiones 

Comunicación clara hacia audiencias técnicas y no técnicas 

2. Alcance General 

Deberá diseñar la arquitectura de una plataforma digital empresarial que incluya: 

Backend basado en servicios (NodeJS, TypeScript, NestJS) 

Frontend web (NextJS) 

Infraestructura cloud en AWS 

Estrategias de resiliencia, consistencia y seguridad 

No se espera código productivo completo, sino diseño, diagramas, decisiones y justificaciones técnicas. 

3. Escenario de Negocio 

La organización requiere una plataforma que: 

Atienda usuarios concurrentes con picos variables 

Garantice una disponibilidad mínima del 99.9% 

Permita crecimiento regional 

Sea segura, observable y costo-eficiente 

Los flujos de negocio involucran múltiples dominios (ej. usuarios, órdenes, pagos, notificaciones). 

 

4. Caso de Uso – Plataforma de Pagos Electrónicos 

4.1 Contexto de la Compañía 

ePayco es una compañía de pagos electrónicos que ofrece servicios de: 

Procesamiento de pagos en línea. 

Dispersión de pagos. 

Integración con comercios (e-commerce) 

ePayco es una compañía que opera en Colombia y quiere extender su operación a varios países de Latinoamérica y debe cumplir con altos estándares de disponibilidad, seguridad y consistencia, ya que procesa transacciones financieras en tiempo real. 

4.2 Objetivo de la Prueba 

Diseñar la arquitectura de una plataforma de pagos electrónicos cloud-native sobre AWS, capaz de: 

Procesar transacciones de forma segura y confiable. 

Mantener consistencia de datos entre múltiples servicios. 

Escalar ante picos de alta demanda (fechas comerciales, campañas) 

Garantizar observabilidad, resiliencia y cumplimiento 

4.3 Dominios Funcionales 

La plataforma debe contemplar al menos los siguientes dominios: 

Usuarios y Autenticación 

Wallet / Cuentas 

Pagos y Transacciones 

Comercios 

Notificaciones 

Auditoría y Reportes 

Cada dominio debe poder evolucionar de forma independiente. 

 

4.4 Flujo Principal de Negocio (Pago Electrónico) 

El usuario inicia un pago desde la aplicación web. 

Se valida identidad, saldo y reglas antifraude. 

Se reserva el monto en la wallet del usuario. 

Se procesa el pago al comercio. 

Se confirma o revierte la transacción. 

Se notifica a usuario y comercio. 

Este flujo debe ser tolerante a fallos y soportar consistencia eventual. 

4.5 Requerimientos No Funcionales 

Disponibilidad: ≥ 99.9% 

Latencia: baja para pagos síncronos 

Seguridad: cifrado en tránsito y reposo 

Escalabilidad: horizontal 

Trazabilidad: auditoría completa de transacciones 

4.6 Responsabilidad del Candidato 

El candidato deberá: 

Diseñar la arquitectura completa en AWS 

Definir cómo se implementa el flujo de pago 

Proponer una estrategia de SAGA para la transacción 

Definir mecanismos de retry, idempotencia y compensación 

Justificar decisiones técnicas y arquitectónicas 

5. Evaluación Técnica 

5.1 Arquitectura Cloud en AWS 

Definir y justificar: 

Servicios AWS seleccionados (ej.: ALB, ECS/EKS, Lambda, RDS/DynamoDB, SQS/SNS, API Gateway, CloudFront, S3) 

Diseño Multi-AZ 

Estrategia de autoescalado 

Separación de cuentas y entornos 

Diseño de red (VPC, subnets públicas/privadas) 

Seguridad: 

IAM (principio de menor privilegio) 

Gestión de secretos (Secrets Manager / Parameter Store) 

Estrategia de DRP (RPO / RTO) 

Entregables: 

Diagrama de arquitectura AWS 

Documento de decisiones arquitectónicas 

5.2 Arquitectura de Servicios Backend (NestJS / TypeScript) 

Se evaluará: 

Elección entre monolito modular vs microservicios 

Aplicación de principios SOLID 

Arquitectura limpia (Clean / Hexagonal) 

Organización de módulos en NestJS 

Manejo de: 

Configuración por entorno 

Logging estructurado 

Manejo de errores 

Versionamiento y gobernanza de APIs 

5.3 Arquitectura Frontend (NextJS) 

Abordar: 

Uso adecuado de SSR, SSG e ISR 

Estrategia de performance y caching 

Integración segura con backend 

Separación de capas y manejo de estado 

Consideraciones de seguridad (XSS, CSRF) 

5.4 Patrones de Diseño y Arquitectónicos 

Conocimiento y aplicación de: 

Patrones de diseño: Factory, Strategy, Adapter 

Patrones arquitectónicos: 

Event-Driven Architecture 

CQRS (criterio de aplicación) 

Justificación del patrón seleccionado según el problema 

5.5 Consistencia y Transacciones Distribuidas – SAGA 

Se evaluará: 

Diseño de SAGA (orquestada vs coreografiada) 

Manejo de consistencia eventual 

Definición de eventos y compensaciones 

Manejo de fallos parciales 

5.6 Resiliencia y Buenas Prácticas 

El candidato debe demostrar conocimiento en: 

Retry con backoff exponencial 

Idempotencia 

Circuit Breaker 

Timeouts y bulkheads 

Observabilidad: 

Logs 

Métricas 

Trazabilidad distribuida 

6. Entregables Esperados 

Documento arquitectónico (PDF o Word) 

Diagramas (C4, AWS o similares) 

Justificación escrita de decisiones 

(Opcional) Repositorio con skeleton o ejemplos 