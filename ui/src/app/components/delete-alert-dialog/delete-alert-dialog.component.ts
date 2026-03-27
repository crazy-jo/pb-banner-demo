import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DeleteAlertDialogData {
  name: string;
}

@Component({
  selector: 'app-delete-alert-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-alert-dialog.component.html',
})
export class DeleteAlertDialogComponent {
  readonly data = inject<DeleteAlertDialogData>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<DeleteAlertDialogComponent>);
}
