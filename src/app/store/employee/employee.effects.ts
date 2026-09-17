import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { EmployeeService } from '../../core/services/employee.service';
import * as A from './employee.actions';

@Injectable()
export class EmployeeEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(EmployeeService);

  load$ = createEffect(() => this.actions$.pipe(
    ofType(A.loadEmployees),
    concatMap(() => this.service.getAll().pipe(
      map(employees => A.loadEmployeesSuccess({ employees })),
      catchError(e => of(A.loadEmployeesFailure({ error: e?.message ?? 'Unable to load employees.' })))
    ))
  ));

  loadOne$ = createEffect(() => this.actions$.pipe(
    ofType(A.loadEmployee),
    concatMap(({ id }) => this.service.getById(id).pipe(
      map(employee => A.loadEmployeeSuccess({ employee })),
      catchError(e => of(A.loadEmployeeFailure({ error: e?.status === 404 ? 'Employee not found.' : (e?.message ?? 'Unable to load employee.') })))
    ))
  ));

  search$ = createEffect(() => this.actions$.pipe(
    ofType(A.searchEmployee),
    concatMap(({ id }) => this.service.getById(id).pipe(
      map(employee => A.searchEmployeeSuccess({ employee })),
      catchError(e => of(A.searchEmployeeFailure({ error: e?.status === 404 ? 'Employee not found.' : (e?.message ?? 'Unable to search employee.') })))
    ))
  ));

  add$ = createEffect(() => this.actions$.pipe(
    ofType(A.addEmployee),
    concatMap(({ employee }) => this.service.create(employee).pipe(
      map(created => A.addEmployeeSuccess({ employee: created })),
      catchError(e => of(A.addEmployeeFailure({ error: e?.message ?? 'Unable to add employee.' })))
    ))
  ));

  update$ = createEffect(() => this.actions$.pipe(
    ofType(A.updateEmployee),
    concatMap(({ employee }) => this.service.update(employee).pipe(
      map(updated => A.updateEmployeeSuccess({ employee: updated })),
      catchError(e => of(A.updateEmployeeFailure({ error: e?.message ?? 'Unable to update employee.' })))
    ))
  ));

  delete$ = createEffect(() => this.actions$.pipe(
    ofType(A.deleteEmployee),
    concatMap(({ id }) => this.service.delete(id).pipe(
      map(() => A.deleteEmployeeSuccess({ id })),
      catchError(e => of(A.deleteEmployeeFailure({ error: e?.message ?? 'Unable to delete employee.' })))
    ))
  ));
}
