import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';
import { HealthController } from './health.controller';

@Module({
  imports: [CurrencyModule],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
