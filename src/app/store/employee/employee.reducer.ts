import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Employee } from '../../core/models/employee.model';
import * as A from './employee.actions';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  detailLoading: boolean;
  saving: boolean;
  error: string | null;
  selected: Employee | null;
  searchLoading: boolean;
  searchCompleted: boolean;
  searchNotFound: boolean;
  searchError: string | null;
}

export const adapter = createEntityAdapter<Employee>();

export const initialState: EmployeeState = adapter.getInitialState({
  loading: false,
  detailLoading: false,
  saving: false,
  error: null,
  selected: null,
  searchLoading: false,
  searchCompleted: false,
  searchNotFound: false,
  searchError: null
});

export const employeeReducer = createReducer(
  initialState,
  on(A.loadEmployees, s => ({ ...s, loading: true, error: null })),
  on(A.loadEmployeesSuccess, (s, { employees }) => adapter.setAll(employees, { ...s, loading: false })),
  on(A.loadEmployeesFailure, (s, { error }) => ({ ...s, loading: false, error })),

  on(A.loadEmployee, (s) => ({
    ...s,
    detailLoading: true,
    error: null,
    selected: null
  })),
  on(A.loadEmployeeSuccess, (s, { employee }) => ({
    ...adapter.upsertOne(employee, s),
    detailLoading: false,
    selected: employee
  })),
  on(A.loadEmployeeFailure, (s, { error }) => ({
    ...s,
    detailLoading: false,
    selected: null,
    error
  })),

  on(A.searchEmployee, s => ({
    ...s,
    searchLoading: true,
    searchCompleted: false,
    searchNotFound: false,
    searchError: null,
    selected: null
  })),
  on(A.searchEmployeeSuccess, (s, { employee }) => ({
    ...adapter.upsertOne(employee, s),
    searchLoading: false,
    searchCompleted: true,
    searchNotFound: false,
    searchError: null,
    selected: employee
  })),
  on(A.searchEmployeeFailure, (s, { error }) => ({
    ...s,
    searchLoading: false,
    searchCompleted: true,
    searchNotFound: true,
    searchError: error,
    selected: null
  })),

  on(A.addEmployee, A.updateEmployee, A.deleteEmployee, s => ({ ...s, saving: true, error: null })),
  on(A.addEmployeeSuccess, (s, { employee }) => ({
    ...adapter.upsertOne(employee, s),
    saving: false
  })),
  on(A.updateEmployeeSuccess, (s, { employee }) => ({
    ...adapter.upsertOne(employee, s),
    saving: false,
    selected: employee
  })),
  on(A.deleteEmployeeSuccess, (s, { id }) => ({
    ...adapter.removeOne(id, s),
    saving: false,
    selected: s.selected?.id === id ? null : s.selected
  })),
  on(A.addEmployeeFailure, A.updateEmployeeFailure, A.deleteEmployeeFailure, (s, { error }) => ({
    ...s,
    saving: false,
    error
  })),
  on(A.clearSelectedEmployee, s => ({ ...s, selected: null }))
);
