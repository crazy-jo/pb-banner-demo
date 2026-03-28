import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';

import type { Banner, CreateBannerDto, UpdateBannerDto } from '../../models/banner.model';

export const bannerEvents = eventGroup({
  source: 'Banner',
  events: {
    startLoadingBanners: type<void>(),
    loadedBannersSuccess: type<{ banners: Banner[] }>(),
    loadedBannersFailure: type<string>(),
    deleteBanner: type<{ id: number }>(),
    createBanner: type<CreateBannerDto>(),
    bannerCreatedSuccessfully: type<{ banner: Banner }>(),
    bannerCreationFailed: type<string>(),
    updateBanner: type<{ id: number; dto: UpdateBannerDto }>(),
    bannerUpdatedSuccessfully: type<{ banner: Banner }>(),
    bannerUpdateFailed: type<string>(),
  },
});
