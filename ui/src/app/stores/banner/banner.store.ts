import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { mapResponse } from '@ngrx/operators';
import { switchMap, tap } from 'rxjs';

import type { Banner } from '../../models/banner.model';
import { bannerEvents } from './banner.events';
import { BannerService } from '../../services/banner.service';

type BannerState = {
  isLoading: boolean;
  banners: Banner[];
  error: string | null;
};

const initialState: BannerState = {
  isLoading: false,
  banners: [],
  error: null,
};

export const BannerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // Data reducers
  withReducer(
    on(bannerEvents.startLoadingBanners, () => ({
      isLoading: true,
      error: null,
    })),
    on(bannerEvents.loadedBannersSuccess, (event, state) => ({
      isLoading: false,
      banners: event.payload.banners,
    })),
    on(bannerEvents.loadedBannersFailure, (event, state) => ({
      isLoading: false,
      error: event.payload,
    })),
    on(bannerEvents.deleteBanner, (event, state) => ({
      banners: state.banners.filter((banner) => banner.id !== event.payload.id),
    })),
    on(bannerEvents.createBanner, (event, state) => ({
      isLoading: true,
      error: null,
    })),
    on(bannerEvents.bannerCreatedSuccessfully, (event, state) => ({
      isLoading: false,
      banners: [...state.banners, event.payload.banner],
    })),
    on(bannerEvents.updateBanner, (event, state) => ({
      isLoading: true,
      error: null,
    })),
    on(bannerEvents.bannerUpdatedSuccessfully, (event, state) => ({
      isLoading: false,
      banners: state.banners.map((banner) =>
        banner.id === event.payload.banner.id ? event.payload.banner : banner,
      ),
    })),
    on(bannerEvents.bannerUpdateFailed, (event, state) => ({
      isLoading: false,
      error: event.payload,
    })),
  ),
  // Side effects
  withEventHandlers(
    (
      store,
      events = inject(Events),
      bannerService = inject(BannerService),
      router = inject(Router),
    ) => ({
      // Fetch banners from API
      loadBanners$: events.on(bannerEvents.startLoadingBanners).pipe(
        switchMap(() =>
          bannerService.getBanners().pipe(
            mapResponse({
              next: (banners) => bannerEvents.loadedBannersSuccess({ banners }),
              error: (error: { message: string }) =>
                bannerEvents.loadedBannersFailure(error.message),
            }),
          ),
        ),
      ),
      // Delete a specific banner
      deleteBanner$: events
        .on(bannerEvents.deleteBanner)
        .pipe(switchMap((event) => bannerService.deleteBanner(event.payload.id))),
      // Create a new banner
      createBanner$: events.on(bannerEvents.createBanner).pipe(
        switchMap((event) =>
          bannerService.createBanner(event.payload).pipe(
            mapResponse({
              next: (banner) => bannerEvents.bannerCreatedSuccessfully({ banner }),
              error: (error: { message: string }) =>
                bannerEvents.bannerCreationFailed(error.message),
            }),
          ),
        ),
      ),
      // Handle banner creation success
      bannerCreatedSuccessfully$: events
        .on(bannerEvents.bannerCreatedSuccessfully)
        .pipe(tap(() => router.navigate(['/banners']))),
      // Update a specific banner
      updateBanner$: events.on(bannerEvents.updateBanner).pipe(
        switchMap((event) =>
          bannerService.updateBanner(event.payload.id, event.payload.dto).pipe(
            mapResponse({
              next: (banner) => bannerEvents.bannerUpdatedSuccessfully({ banner }),
              error: (error: { message: string }) => bannerEvents.bannerUpdateFailed(error.message),
            }),
          ),
        ),
      ),
      // Handle banner update success
      bannerUpdatedSuccessfully$: events
        .on(bannerEvents.bannerUpdatedSuccessfully)
        .pipe(tap(() => router.navigate(['/banners']))),
    }),
  ),
);
