import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as A from '../../../store/employee/employee.actions';
import * as S from '../../../store/employee/employee.selectors';
import { Employee } from '../../../core/models/employee.model';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../shared/components/empty-state/empty-state.component';
import { ErrorStateComponent } from '../../../shared/components/error-state/error-state.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list', standalone: true,
  imports: [AsyncPipe, RouterLink, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule, LoadingSpinnerComponent, EmptyStateComponent, ErrorStateComponent],
  template: `
  <div class="page">
    <div class="toolbar">
      <div><h1>Employees</h1><p>Manage employee records</p></div>
      <div class="actions"><a mat-raised-button color="primary" routerLink="/employees/add">Add Employee</a><a mat-stroked-button routerLink="/employees/search">Search by ID</a></div>
    </div>
    <section class="card">
      @if (loading$ | async) { <app-loading-spinner /> }
      @else if (error$ | async; as error) { <app-error-state [message]="error" /> }
      @else if ((employees$ | async)?.length === 0) { <app-empty-state title="No employees" message="Add an employee to get started." /> }
      @else {
        <div style="overflow:auto">
          <table mat-table [dataSource]="(employees$ | async) ?? []">
            <ng-container matColumnDef="name"><th mat-header-cell *matHeaderCellDef>Name</th><td mat-cell *matCellDef="let e">{{e.name}}</td></ng-container>
            <ng-container matColumnDef="email"><th mat-header-cell *matHeaderCellDef>Email</th><td mat-cell *matCellDef="let e">{{e.email}}</td></ng-container>
            <ng-container matColumnDef="mobile"><th mat-header-cell *matHeaderCellDef>Mobile</th><td mat-cell *matCellDef="let e">{{e.mobile}}</td></ng-container>
            <ng-container matColumnDef="country"><th mat-header-cell *matHeaderCellDef>Country</th><td mat-cell *matCellDef="let e">{{e.country}}</td></ng-container>
            <ng-container matColumnDef="actions"><th mat-header-cell *matHeaderCellDef>Actions</th><td mat-cell *matCellDef="let e"><a mat-button color="primary" [routerLink]="['/employees/edit', e.id]">Edit</a><button mat-button color="warn" (click)="remove(e)">Delete</button></td></ng-container>
            <tr mat-header-row *matHeaderRowDef="columns"></tr><tr mat-row *matRowDef="let row; columns: columns"></tr>
          </table>
        </div>
      }
    </section>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);
  employees$ = this.store.select(S.selectAllEmployees);
  loading$ = this.store.select(S.selectLoading);
  error$ = this.store.select(S.selectError);
  columns = ['name','email','mobile','country','actions'];
  ngOnInit() { this.store.dispatch(A.loadEmployees()); }
  remove(employee: Employee) {
    this.dialog.open(ConfirmDialogComponent).afterClosed().subscribe(ok => {
      if (ok) { this.store.dispatch(A.deleteEmployee({id: employee.id})); this.snack.open('Delete request sent', 'OK', {duration: 2000}); }
    });
  }
}