import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { finalize, catchError } from 'rxjs';

import { Banner } from '../models/banner.model';
import { BannerService } from '../services/banner.service';
import { LoadingService } from '../services/loading.service';

export const bannersResolver: ResolveFn<Banner[]> = () => {
  const loadingService = inject(LoadingService);
  loadingService.show();
  return inject(BannerService)
    .getBanners()
    .pipe(
      finalize(() => {
        loadingService.hide();
      }),
      catchError((err) => {
        console.error(err);
        loadingService.hide();
        throw err;
      }),
    );
};
