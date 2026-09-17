import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>Employee Management</span>
      <span style="flex:1"></span>
      <a mat-button routerLink="/employees">Employees</a>
      <a mat-button routerLink="/employees/search">Search</a>
      <a mat-button routerLink="/employees/add">Add Employee</a>
    </mat-toolbar>
    <main><router-outlet /></main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}