import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service';

@Controller('api/currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('currencies')
  async getCurrencies() {
    return this.currencyService.getCurrencies();
  }

  @Get('latest')
  async getLatestRates(@Query('base_currency') baseCurrency: string) {
    return this.currencyService.getLatestRates(baseCurrency);
  }

  @Get('historical')
  async getHistoricalRate(
    @Query('date') date: string,
    @Query('base_currency') baseCurrency: string,
  ) {
    return this.currencyService.getHistoricalRate(date, baseCurrency);
  }
}