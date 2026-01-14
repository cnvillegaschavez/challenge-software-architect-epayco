export default () => ({
  port: parseInt(process.env.PORT, 10) || 3001,
  database: {
    type: process.env.DATABASE_TYPE || 'sqlite', // 'sqlite' o 'postgres'
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    name: process.env.DATABASE_NAME || 'epayco_payments',
    userName: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'postgres',
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
  },
  tokenExpiration: process.env.TOKEN_EXPIRATION || '3600s',
})
