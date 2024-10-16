import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { envs } from './config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log(envs.port)
  const app = await NestFactory.create(AppModule);

  if (envs.isProd()) {
    app.useGlobalFilters(new HttpExceptionFilter());
  }

  const config = new DocumentBuilder()
    .setTitle('RBAC')
    .setDescription('')
    .setVersion('0.0.1')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      in: 'header',
      name: 'Authorization',
      description: 'Enter your Bearer token',
    })
    .addSecurityRequirements('bearer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}

bootstrap();
