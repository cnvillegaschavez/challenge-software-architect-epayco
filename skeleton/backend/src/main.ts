import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/filters/http-exception-filter'
import configuration from './config/configuration'
const configApp = configuration()

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new HttpExceptionFilter())

  const config = new DocumentBuilder()
    .setTitle('ePayco Payment Service API')
    .setDescription('Microservicio de procesamiento de pagos electrónicos')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document)
  app.enableCors()
  
  await app.listen(configApp.port)
  
  console.log(`\n🚀 Servidor corriendo en: http://localhost:${configApp.port}`)
  console.log(`📚 Swagger disponible en: http://localhost:${configApp.port}/swagger`)
  console.log(`💾 Base de datos: ${configuration().database.type === 'sqlite' ? 'SQLite (epayco_payments.sqlite)' : 'PostgreSQL'}\n`)
}
bootstrap()
