import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-confirm-dialog', standalone: true, imports: [MatDialogModule, MatButtonModule],
  template: `<h2 mat-dialog-title>Delete employee?</h2><mat-dialog-content>This action cannot be undone.</mat-dialog-content><mat-dialog-actions align="end"><button mat-button (click)="close(false)">Cancel</button><button mat-raised-button color="warn" (click)="close(true)">Delete</button></mat-dialog-actions>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  private readonly ref = inject(MatDialogRef<ConfirmDialogComponent>);
  close(value: boolean) { this.ref.close(value); }
}