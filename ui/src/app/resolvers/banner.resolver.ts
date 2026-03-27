import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { BannerService } from '../services/banner.service';
import { Banner } from '../models/banner.model';

export const bannerResolver: ResolveFn<Banner> = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.paramMap.get('id'));
  return inject(BannerService).getBannerById(id);
};
