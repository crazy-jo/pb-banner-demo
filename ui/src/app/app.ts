import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { AppHeaderComponent } from './components/layout/app-header.component';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, MatProgressBarModule, AppHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly isLoading = inject(LoadingService).isLoading;
  protected readonly title = signal('pb-banner-demo');
}
