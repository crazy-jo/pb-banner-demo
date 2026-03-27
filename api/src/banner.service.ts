import { Injectable } from '@nestjs/common';

@Injectable()
export class BannerService {
  getBanners(): string {
    return 'Hello World!';
  }
}
