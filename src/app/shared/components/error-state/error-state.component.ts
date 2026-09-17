import { ChangeDetectionStrategy, Component, input } from '@angular/core';
@Component({
  selector: 'app-error-state', standalone: true,
  template: `<div style="padding:30px;text-align:center;color:#b91c1c"><h3>{{title()}}</h3><p>{{message()}}</p></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorStateComponent { title = input('Something went wrong'); message = input('Please try again.'); }