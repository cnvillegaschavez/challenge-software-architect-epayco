import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Payment, Transaction } from '../domain/entities'
import configuration from '../config/configuration'
const config = configuration()

// Configuración dinámica según el tipo de base de datos
const getDatabaseConfig = () => {
  const baseConfig = {
    entities: [Payment, Transaction],
    synchronize: config.database.synchronize,
    logging: config.database.logging,
  };

  if (config.database.type === 'sqlite') {
    return {
      ...baseConfig,
      type: 'better-sqlite3' as const,
      database: 'epayco_payments.sqlite',
    };
  }

  // PostgreSQL (producción)
  return {
    ...baseConfig,
    type: 'postgres' as const,
    host: config.database.host,
    port: config.database.port,
    username: config.database.userName,
    password: config.database.password,
    database: config.database.name,
  };
};

@Module({
  imports: [
    TypeOrmModule.forRoot(getDatabaseConfig()),
  ],
  exports: [TypeOrmModule],
})
export class InfrastructureModule {}
