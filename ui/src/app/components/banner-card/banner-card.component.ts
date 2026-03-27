import { ChangeDetectionStrategy, Component, output, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Banner } from '../../models/banner.model';

@Component({
  selector: 'app-banner-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  styleUrl: './banner-card.component.scss',
  templateUrl: './banner-card.component.html',
})
export class BannerCardComponent {
  readonly banner = input.required<Banner>();
  readonly cardClick = output<Banner>();
  readonly deleteClick = output<Banner>();
}
