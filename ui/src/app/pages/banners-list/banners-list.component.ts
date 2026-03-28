import {
  type OnInit,
  type OnDestroy,
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { injectDispatch } from '@ngrx/signals/events';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { Banner } from '../../models/banner.model';
import { AppHeaderService } from '../../services/app-header.service';
import { BannerCardComponent } from '../../components/banner-card/banner-card.component';
import {
  DeleteAlertDialogComponent,
  DeleteAlertDialogData,
} from '../../components/delete-alert-dialog/delete-alert-dialog.component';
import { BannerStore } from '../../stores/banner/banner.store';
import { bannerEvents } from '../../stores/banner/banner.events';

@Component({
  selector: 'app-banners-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BannerCardComponent, MatProgressSpinnerModule, MatButtonModule],
  styleUrl: './banners-list.component.scss',
  templateUrl: './banners-list.component.html',
})
export class BannersListComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly appHeaderService = inject(AppHeaderService);

  readonly store = inject(BannerStore);
  private readonly dispatch = injectDispatch(bannerEvents);

  ngOnInit(): void {
    this.appHeaderService.setPageHeaderData({
      title: 'Banners',
      showBack: false,
      showAddButton: true,
    });
  }

  ngOnDestroy(): void {
    this.appHeaderService.resetHeaderData();
  }

  openDetails(banner: Banner): void {
    this.router.navigate(['/banners', banner.id]);
  }

  confirmDelete(banner: Banner): void {
    const dialogRef = this.dialog.open<DeleteAlertDialogComponent, DeleteAlertDialogData, boolean>(
      DeleteAlertDialogComponent,
      { data: { name: banner.name } },
    );

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteBanner(banner.id);
      }
    });
  }

  reload(): void {
    this.dispatch.startLoadingBanners();
  }

  private deleteBanner(id: number): void {
    this.dispatch.deleteBanner({ id });
  }
}
