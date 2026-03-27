import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { BannerService } from '../services/banner.service';
import { Banner } from '../models/banner.model';

export const bannersResolver: ResolveFn<Banner[]> = () => {
  return inject(BannerService).getBanners();
};
