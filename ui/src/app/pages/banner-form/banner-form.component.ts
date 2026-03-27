import {
  type OnInit,
  type OnDestroy,
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  computed,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';

import { Banner, BannerImage } from '../../models/banner.model';
import { BannerService } from '../../services/banner.service';
import { AppHeaderService } from '../../services/app-header.service';
import {
  DeleteAlertDialogComponent,
  DeleteAlertDialogData,
} from '../../components/delete-alert-dialog/delete-alert-dialog.component';

@Component({
  selector: 'app-banner-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
  ],
  styleUrl: './banner-form.component.scss',
  templateUrl: './banner-form.component.html',
})
export class BannerFormComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bannerService = inject(BannerService);
  private readonly appHeaderService = inject(AppHeaderService);
  private readonly dialog = inject(MatDialog);
  private readonly fb = inject(FormBuilder);

  readonly isCreate = computed(() => !this.route.snapshot.paramMap.get('id'));
  readonly pageTitle = computed(() => (this.isCreate() ? 'Create Banner' : 'Banner Details'));
  readonly banner = signal<Banner | null>(this.route.snapshot.data['banner'] ?? null);
  readonly loadError = signal(false);
  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly imagePreview = signal<string | null>(null);
  readonly formSubmitted = signal(false);

  private selectedImageData: BannerImage | null = null;

  readonly form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit(): void {
    this.appHeaderService.setPageHeaderData({ title: this.pageTitle(), showBack: true });
    const banner = this.banner();
    if (banner) {
      this.form.patchValue({
        name: banner.name,
        description: banner.description,
      });
      this.imagePreview.set(banner.imageUrl);
    }
  }

  ngOnDestroy(): void {
    this.appHeaderService.resetHeaderData();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // result is "data:<mime>;base64,<data>" — extract the base64 part
      const b64Data = result.split(',')[1];
      this.selectedImageData = { b64Data, fileName: file.name };
      this.imagePreview.set(result);
    };
    reader.readAsDataURL(file);
  }

  submit(): void {
    this.formSubmitted.set(true);
    this.form.markAllAsTouched();

    if (this.isCreate() && !this.selectedImageData) {
      return;
    }
    if (this.form.invalid) return;

    const { name, description } = this.form.getRawValue();
    this.submitting.set(true);
    this.submitError.set(null);

    if (this.isCreate()) {
      this.bannerService
        .createBanner({
          name: name!,
          description: description!,
          imageData: this.selectedImageData!,
        })
        .subscribe({
          next: () => {
            this.submitting.set(false);
            this.router.navigate(['/banners']);
          },
          error: () => {
            this.submitting.set(false);
            this.submitError.set('Failed to create banner. Please try again.');
          },
        });
    } else {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      const dto: { name?: string; description?: string; imageData?: BannerImage } = {
        name: name!,
        description: description!,
      };
      if (this.selectedImageData) {
        dto.imageData = this.selectedImageData;
      }
      this.bannerService.updateBanner(id, dto).subscribe({
        next: () => {
          this.submitting.set(false);
          this.router.navigate(['/banners']);
        },
        error: () => {
          this.submitting.set(false);
          this.submitError.set('Failed to update banner. Please try again.');
        },
      });
    }
  }

  confirmDelete(): void {
    const banner = this.banner();
    if (!banner) return;

    const dialogRef = this.dialog.open<DeleteAlertDialogComponent, DeleteAlertDialogData, boolean>(
      DeleteAlertDialogComponent,
      { data: { name: banner.name } },
    );

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.bannerService.deleteBanner(banner.id).subscribe({
          next: () => this.router.navigate(['/banners']),
          error: () => {
            this.submitError.set('Failed to delete banner. Please try again.');
          },
        });
      }
    });
  }
}
