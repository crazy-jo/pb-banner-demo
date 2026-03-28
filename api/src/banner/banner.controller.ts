import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { ZodValidationPipe } from 'src/shared/pipes/zod-validation.pipe';
import {
  type UpdateBannerDto,
  updateBannerDtoSchema,
  type CreateBannerDto,
  createBannerDtoSchema,
} from './banner.model';

@Controller('banners')
export class BannerController {
  constructor(private readonly bannerService: BannerService) {}

  @Get()
  public async getBanners() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return this.bannerService.getBanners();
  }

  @Get(':id')
  public getBannerById(@Param('id', ParseIntPipe) id: number) {
    const banner = this.bannerService.getBannerById(id);
    if (!banner) {
      throw new NotFoundException(`Banner with id ${id} not found`);
    }
    return banner;
  }

  @Delete(':id')
  public async deleteBanner(@Param('id', ParseIntPipe) id: number) {
    const banner = this.bannerService.getBannerById(id);
    if (!banner) {
      throw new NotFoundException(`Banner with id ${id} not found`);
    }
    await this.bannerService.deleteBanner(id);
  }

  @Put(':id')
  public async updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ZodValidationPipe(updateBannerDtoSchema)) banner: UpdateBannerDto,
  ) {
    const existingBanner = this.bannerService.getBannerById(id);
    if (!existingBanner) {
      throw new NotFoundException(`Banner with id ${id} not found`);
    }
    await this.bannerService.updateBanner(id, banner);
    return this.bannerService.getBannerById(id);
  }

  @Post()
  public createBanner(
    @Body(new ZodValidationPipe(createBannerDtoSchema)) banner: CreateBannerDto,
  ) {
    return this.bannerService.createBanner(banner);
  }
}
