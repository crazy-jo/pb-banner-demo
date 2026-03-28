import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'banners', pathMatch: 'full' },
  {
    path: 'banners',
    loadComponent: () =>
      import('./pages/banners-list/banners-list.component').then((m) => m.BannersListComponent),
    data: { title: 'Banners List' },
  },
  {
    path: 'banners/new',
    loadComponent: () =>
      import('./pages/banner-form/banner-form.component').then((m) => m.BannerFormComponent),
    data: { title: 'Create Banner' },
  },
  {
    path: 'banners/:id',
    loadComponent: () =>
      import('./pages/banner-form/banner-form.component').then((m) => m.BannerFormComponent),
    data: { title: 'Banner Details' },
  },
  { path: '**', redirectTo: 'banners' },
];
