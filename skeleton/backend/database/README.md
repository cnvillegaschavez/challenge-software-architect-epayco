# Database Setup

Scripts SQL para PostgreSQL (compatible con Aurora PostgreSQL en AWS).

## Archivos

- `schema.sql` - Definición de tablas e índices
- `seed.sql` - Datos de prueba (opcional)

## Setup Local

```bash
# Crear base de datos
createdb epayco_payments

# Ejecutar schema
psql -d epayco_payments -f schema.sql

# Cargar datos de prueba (opcional)
psql -d epayco_payments -f seed.sql
```

## Producción (AWS Aurora)

En producción se usa Aurora PostgreSQL con:
- Multi-AZ deployment
- Read replicas
- Automated backups
- Encriptación

El schema se debe aplicar manualmente la primera vez:
```bash
psql -h aurora-cluster-endpoint -U admin -d epayco_production -f schema.sql
```

