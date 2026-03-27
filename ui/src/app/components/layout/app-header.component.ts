import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppHeaderService } from '../../services/app-header.service';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  styleUrl: './app-header.component.scss',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent {
  readonly pageTitle = inject(AppHeaderService).pageTitle;
  readonly showBack = inject(AppHeaderService).showBack;
  readonly showAddButton = inject(AppHeaderService).showAddButton;
  private readonly router = inject(Router);

  goBack(): void {
    this.router.navigate(['/banners']);
  }
}
