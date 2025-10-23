import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CURRENCY_API_KEY, CURRENCY_API_BASE_URL } from '../config/constants';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CurrencyService {
  constructor(private readonly httpService: HttpService) {}

  async getCurrencies() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${CURRENCY_API_BASE_URL}/currencies`, {
          headers: { apikey: CURRENCY_API_KEY },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching currencies:', error);
      throw new HttpException(
        `Failed to fetch currencies: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getLatestRates(baseCurrency: string) {
    try {
      console.log('Fetching latest rates for:', baseCurrency);
      const response = await firstValueFrom(
        this.httpService.get(`${CURRENCY_API_BASE_URL}/latest`, {
          headers: { apikey: CURRENCY_API_KEY },
          params: { base_currency: baseCurrency },
        }),
      );
      console.log('Received response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching latest rates:', error);
      throw new HttpException(
        `Failed to fetch exchange rates: ${error.response?.data?.message || error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getHistoricalRate(date: string, baseCurrency: string) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${CURRENCY_API_BASE_URL}/historical`, {
          headers: { apikey: CURRENCY_API_KEY },
          params: {
            base_currency: baseCurrency,
            date,
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching historical rates:', error);
      throw new HttpException(
        `Failed to fetch historical rates: ${error.response?.data?.message || error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}