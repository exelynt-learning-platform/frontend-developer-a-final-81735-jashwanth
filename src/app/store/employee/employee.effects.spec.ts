import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { EmployeeEffects } from './employee.effects';
import * as A from './employee.actions';
import { EmployeeService } from '../../core/services/employee.service';
import { Employee } from '../../core/models/employee.model';

describe('EmployeeEffects', () => {
  let actions$: Subject<any>;
  let effects: EmployeeEffects;
  let service: jasmine.SpyObj<EmployeeService>;
  const employee: Employee = {
    id: '1', name: 'A', email: 'a@test.com', mobile: '1234567890',
    country: 'India', state: 'Telangana', district: 'Hyderabad'
  };

  beforeEach(() => {
    actions$ = new Subject();
    service = jasmine.createSpyObj('EmployeeService', ['getAll', 'getById', 'create', 'update', 'delete']);
    TestBed.configureTestingModule({
      providers: [
        EmployeeEffects,
        { provide: Actions, useValue: actions$ },
        { provide: EmployeeService, useValue: service }
      ]
    });
    effects = TestBed.inject(EmployeeEffects);
  });

  function expectEffect(effect$: any, action: any, expected: any, setup: () => void) {
    setup();
    effect$.subscribe((result: any) => expect(result).toEqual(expected));
    actions$.next(action);
  }

  it('loads all employees', () => {
    expectEffect(effects.load$, A.loadEmployees(), A.loadEmployeesSuccess({ employees: [employee] }), () => service.getAll.and.returnValue(of([employee])));
  });

  it('handles list load failure', () => {
    expectEffect(effects.load$, A.loadEmployees(), A.loadEmployeesFailure({ error: 'Network error' }), () => service.getAll.and.returnValue(throwError(() => new Error('Network error'))));
  });

  it('loads one employee', () => {
    expectEffect(effects.loadOne$, A.loadEmployee({ id: '1' }), A.loadEmployeeSuccess({ employee }), () => service.getById.and.returnValue(of(employee)));
  });

  it('handles load-one 404', () => {
    expectEffect(effects.loadOne$, A.loadEmployee({ id: '99' }), A.loadEmployeeFailure({ error: 'Employee not found.' }), () => service.getById.and.returnValue(throwError(() => ({ status: 404 }))));
  });

  it('searches an employee', () => {
    expectEffect(effects.search$, A.searchEmployee({ id: '1' }), A.searchEmployeeSuccess({ employee }), () => service.getById.and.returnValue(of(employee)));
  });

  it('handles search 404', () => {
    expectEffect(effects.search$, A.searchEmployee({ id: '99' }), A.searchEmployeeFailure({ error: 'Employee not found.' }), () => service.getById.and.returnValue(throwError(() => ({ status: 404 }))));
  });

  it('handles search server error', () => {
    expectEffect(effects.search$, A.searchEmployee({ id: '99' }), A.searchEmployeeFailure({ error: 'Server error' }), () => service.getById.and.returnValue(throwError(() => new Error('Server error'))));
  });

  it('adds an employee', () => {
    expectEffect(effects.add$, A.addEmployee({ employee }), A.addEmployeeSuccess({ employee }), () => service.create.and.returnValue(of(employee)));
  });

  it('handles add failure', () => {
    expectEffect(effects.add$, A.addEmployee({ employee }), A.addEmployeeFailure({ error: 'Create failed' }), () => service.create.and.returnValue(throwError(() => new Error('Create failed'))));
  });

  it('updates an employee', () => {
    expectEffect(effects.update$, A.updateEmployee({ employee }), A.updateEmployeeSuccess({ employee }), () => service.update.and.returnValue(of(employee)));
  });

  it('handles update failure', () => {
    expectEffect(effects.update$, A.updateEmployee({ employee }), A.updateEmployeeFailure({ error: 'Update failed' }), () => service.update.and.returnValue(throwError(() => new Error('Update failed'))));
  });

  it('deletes an employee', () => {
    expectEffect(effects.delete$, A.deleteEmployee({ id: '1' }), A.deleteEmployeeSuccess({ id: '1' }), () => service.delete.and.returnValue(of(void 0)));
  });

  it('handles delete failure', () => {
    expectEffect(effects.delete$, A.deleteEmployee({ id: '1' }), A.deleteEmployeeFailure({ error: 'Delete failed' }), () => service.delete.and.returnValue(throwError(() => new Error('Delete failed'))));
  });
});
