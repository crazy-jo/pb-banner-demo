import { Routes } from '@angular/router';
import { bannersResolver } from './resolvers/banners.resolver';
import { bannerResolver } from './resolvers/banner.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'banners', pathMatch: 'full' },
  {
    path: 'banners',
    loadComponent: () =>
      import('./pages/banners-list/banners-list.component').then(
        (m) => m.BannersListComponent
      ),
    resolve: { banners: bannersResolver },
    data: { title: 'Banners List' },
  },
  {
    path: 'banners/new',
    loadComponent: () =>
      import('./pages/banner-form/banner-form.component').then(
        (m) => m.BannerFormComponent
      ),
    data: { title: 'Create Banner' },
  },
  {
    path: 'banners/:id',
    loadComponent: () =>
      import('./pages/banner-form/banner-form.component').then(
        (m) => m.BannerFormComponent
      ),
    resolve: { banner: bannerResolver },
    data: { title: 'Banner Details' },
  },
  { path: '**', redirectTo: 'banners' },
];
