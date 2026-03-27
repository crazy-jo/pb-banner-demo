import {
  type OnInit,
  type OnDestroy,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

import { Banner } from '../../models/banner.model';
import { BannerService } from '../../services/banner.service';
import { AppHeaderService } from '../../services/app-header.service';
import { BannerCardComponent } from '../../components/banner-card/banner-card.component';
import {
  DeleteAlertDialogComponent,
  DeleteAlertDialogData,
} from '../../components/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'app-banners-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BannerCardComponent, MatProgressSpinnerModule, MatButtonModule],
  styleUrl: './banners-list.component.scss',
  templateUrl: './banners-list.component.html',
})
export class BannersListComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly bannerService = inject(BannerService);
  private readonly appHeaderService = inject(AppHeaderService);

  readonly banners = signal<Banner[]>(this.route.snapshot.data['banners'] ?? []);
  readonly loading = signal(false);
  readonly error = signal(false);

  ngOnInit(): void {
    this.appHeaderService.setPageHeaderData({
      title: 'Banners List',
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
    this.loading.set(true);
    this.error.set(false);
    this.bannerService.getBanners().subscribe({
      next: (banners) => {
        this.banners.set(banners);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.loading.set(false);
      },
    });
  }

  private deleteBanner(id: number): void {
    this.bannerService.deleteBanner(id).subscribe({
      next: () => {
        this.banners.update((list) => list.filter((b) => b.id !== id));
      },
      error: () => {
        alert('Failed to delete banner. Please try again.');
      },
    });
  }
}
