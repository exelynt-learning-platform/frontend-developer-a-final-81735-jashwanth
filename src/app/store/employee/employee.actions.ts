import { createAction, props } from '@ngrx/store';
import { Employee } from '../../core/models/employee.model';

export const loadEmployees = createAction('[Employees] Load');
export const loadEmployeesSuccess = createAction('[Employees] Load Success', props<{ employees: Employee[] }>());
export const loadEmployeesFailure = createAction('[Employees] Load Failure', props<{ error: string }>());

export const loadEmployee = createAction('[Employees] Load One', props<{ id: string }>());
export const loadEmployeeSuccess = createAction('[Employees] Load One Success', props<{ employee: Employee }>());
export const loadEmployeeFailure = createAction('[Employees] Load One Failure', props<{ error: string }>());

export const searchEmployee = createAction('[Employees] Search', props<{ id: string }>());
export const searchEmployeeSuccess = createAction('[Employees] Search Success', props<{ employee: Employee }>());
export const searchEmployeeFailure = createAction('[Employees] Search Failure', props<{ error: string }>());

export const addEmployee = createAction('[Employees] Add', props<{ employee: Omit<Employee, 'id'> }>());
export const addEmployeeSuccess = createAction('[Employees] Add Success', props<{ employee: Employee }>());
export const addEmployeeFailure = createAction('[Employees] Add Failure', props<{ error: string }>());

export const updateEmployee = createAction('[Employees] Update', props<{ employee: Employee }>());
export const updateEmployeeSuccess = createAction('[Employees] Update Success', props<{ employee: Employee }>());
export const updateEmployeeFailure = createAction('[Employees] Update Failure', props<{ error: string }>());

export const deleteEmployee = createAction('[Employees] Delete', props<{ id: string }>());
export const deleteEmployeeSuccess = createAction('[Employees] Delete Success', props<{ id: string }>());
export const deleteEmployeeFailure = createAction('[Employees] Delete Failure', props<{ error: string }>());

export const clearSelectedEmployee = createAction('[Employees] Clear Selected');
