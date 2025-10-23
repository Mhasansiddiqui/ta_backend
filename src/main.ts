import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Configure CORS
  const corsOptions: CorsOptions = {
    origin: ['http://localhost:4200', 
            'https://ta-front-b53c19g8g-mhasansiddiquis-projects.vercel.app',
            'https://ta-currency-converter.vercel.app',
            'https://ta-front-end.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };
  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
