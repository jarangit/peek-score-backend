import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class APIFootballHttpService {
  private url = this.configService.get<string>('RAPID_FOOTBALL_API_URL');
  private key = this.configService.get<string>('RAPID_FOOTBALL_API_KEY');
  private host = this.configService.get<string>('RAPID_FOOTBALL_API_HOST');
  private API_FOOTBALL_CONFIG = {
    BASE_URL: this.url,
    HEADERS: {
      'x-rapidapi-host': this.host,
      'x-rapidapi-key': this.key, // 🔹 ใช้ .env หรือค่าคงที่
    },
  };
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService, // ✅ Inject ConfigService
  ) {}

  get(url: string, params?: any) {
    return this.httpService.get(`${this.API_FOOTBALL_CONFIG.BASE_URL}${url}`, {
      headers: this.API_FOOTBALL_CONFIG.HEADERS, // ✅ ตั้ง Headers อัตโนมัติ
      params,
    });
  }

  post(url: string, data: any) {
    return this.httpService.post(
      `${this.API_FOOTBALL_CONFIG.BASE_URL}${url}`,
      data,
      {
        headers: this.API_FOOTBALL_CONFIG.HEADERS,
      },
    );
  }
}
