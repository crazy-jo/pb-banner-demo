import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppHeaderService {
  readonly pageTitle = signal<string>('Untitled');
  readonly showBack = signal<boolean>(false);
  readonly showAddButton = signal<boolean>(false);

  setPageHeaderData({
    title,
    showBack,
    showAddButton = false,
  }: {
    title: string;
    showBack: boolean;
    showAddButton?: boolean;
  }): void {
    this.pageTitle.set(title);
    this.showBack.set(showBack);
    this.showAddButton.set(showAddButton);
  }

  resetHeaderData(): void {
    this.pageTitle.set('Untitled');
    this.showBack.set(false);
    this.showAddButton.set(false);
  }
}
