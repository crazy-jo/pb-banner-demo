import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { injectDispatch } from '@ngrx/signals/events';

import { AppHeaderComponent } from './components/layout/app-header.component';
import { bannerEvents } from './stores/banner/banner.events';
import { BannerStore } from './stores/banner/banner.store';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, AppHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  readonly store = inject(BannerStore);
  protected readonly dispatch = injectDispatch(bannerEvents);
  protected readonly title = signal('pb-banner-demo');

  ngOnInit(): void {
    // Trigger initial data loading.
    this.dispatch.startLoadingBanners();
  }
}
