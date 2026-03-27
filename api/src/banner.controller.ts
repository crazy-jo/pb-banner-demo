import { Controller, Get } from '@nestjs/common';
import { BannerService } from './banner.service';

@Controller()
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  getBanners(): string {
    return this.bannerService.getBanners();
  }
}
