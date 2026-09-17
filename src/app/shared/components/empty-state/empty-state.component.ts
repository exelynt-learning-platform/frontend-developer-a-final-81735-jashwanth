import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'app-empty-state', standalone: true,
  template: `<div style="padding:50px;text-align:center;color:#6b7280"><h3>{{title()}}</h3><p>{{message()}}</p></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent { title = input('No records'); message = input('There is nothing to display.'); }