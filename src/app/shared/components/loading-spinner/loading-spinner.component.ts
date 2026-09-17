import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-loading-spinner', standalone: true, imports: [MatProgressSpinnerModule],
  template: `<div style="display:grid;place-items:center;padding:40px"><mat-spinner diameter="42" /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingSpinnerComponent {}