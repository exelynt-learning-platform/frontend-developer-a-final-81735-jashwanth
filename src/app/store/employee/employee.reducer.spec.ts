import { Employee } from '../../core/models/employee.model';
import { employeeReducer, initialState } from './employee.reducer';
import * as A from './employee.actions';

describe('employeeReducer', () => {
  const employee: Employee = {
    id: '1', name: 'Test User', email: 'test@test.com', mobile: '1234567890',
    country: 'India', state: 'Telangana', district: 'Hyderabad'
  };
  const second: Employee = { ...employee, id: '2', name: 'Second User' };

  it('starts with an empty state', () => {
    expect(employeeReducer(undefined, { type: '@@init' })).toEqual(initialState);
  });

  it('sets list loading', () => {
    const state = employeeReducer(initialState, A.loadEmployees());
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('loads employees', () => {
    const state = employeeReducer(initialState, A.loadEmployeesSuccess({ employees: [employee, second] }));
    expect(state.ids).toEqual(['1', '2']);
    expect(state.loading).toBeFalse();
  });

  it('handles list failure', () => {
    const state = employeeReducer(initialState, A.loadEmployeesFailure({ error: 'Network error' }));
    expect(state.error).toBe('Network error');
    expect(state.loading).toBeFalse();
  });

  it('clears selected and loads one employee', () => {
    const previous = employeeReducer(initialState, A.loadEmployeeSuccess({ employee }));
    const state = employeeReducer(previous, A.loadEmployee({ id: '2' }));
    expect(state.detailLoading).toBeTrue();
    expect(state.selected).toBeNull();
  });

  it('upserts a loaded employee', () => {
    const state = employeeReducer(initialState, A.loadEmployeeSuccess({ employee }));
    expect(state.entities['1']).toEqual(employee);
    expect(state.selected).toEqual(employee);
    expect(state.detailLoading).toBeFalse();
  });

  it('handles load-one failure', () => {
    const state = employeeReducer(initialState, A.loadEmployeeFailure({ error: 'Employee not found.' }));
    expect(state.selected).toBeNull();
    expect(state.error).toBe('Employee not found.');
  });

  it('starts a search with a clean result state', () => {
    const previous = employeeReducer(initialState, A.searchEmployeeSuccess({ employee }));
    const state = employeeReducer(previous, A.searchEmployee({ id: '999' }));
    expect(state.searchLoading).toBeTrue();
    expect(state.searchCompleted).toBeFalse();
    expect(state.searchNotFound).toBeFalse();
    expect(state.selected).toBeNull();
  });

  it('stores search success', () => {
    const state = employeeReducer(initialState, A.searchEmployeeSuccess({ employee }));
    expect(state.selected).toEqual(employee);
    expect(state.searchCompleted).toBeTrue();
    expect(state.searchNotFound).toBeFalse();
  });

  it('stores search not-found state', () => {
    const state = employeeReducer(initialState, A.searchEmployeeFailure({ error: 'Employee not found.' }));
    expect(state.searchCompleted).toBeTrue();
    expect(state.searchNotFound).toBeTrue();
    expect(state.searchError).toBe('Employee not found.');
    expect(state.selected).toBeNull();
  });

  it('starts saving for mutations', () => {
    expect(employeeReducer(initialState, A.addEmployee({ employee })).saving).toBeTrue();
    expect(employeeReducer(initialState, A.updateEmployee({ employee })).saving).toBeTrue();
    expect(employeeReducer(initialState, A.deleteEmployee({ id: '1' })).saving).toBeTrue();
  });

  it('upserts on add success', () => {
    const state = employeeReducer(initialState, A.addEmployeeSuccess({ employee }));
    expect(state.entities['1']).toEqual(employee);
    expect(state.saving).toBeFalse();
  });

  it('upserts on update success even when the id was not loaded', () => {
    const state = employeeReducer(initialState, A.updateEmployeeSuccess({ employee }));
    expect(state.entities['1']).toEqual(employee);
    expect(state.selected).toEqual(employee);
    expect(state.saving).toBeFalse();
  });

  it('removes on delete success', () => {
    const withEmployee = employeeReducer(initialState, A.addEmployeeSuccess({ employee }));
    const state = employeeReducer(withEmployee, A.deleteEmployeeSuccess({ id: '1' }));
    expect(state.entities['1']).toBeUndefined();
    expect(state.saving).toBeFalse();
  });

  it('clears selected when the selected employee is deleted', () => {
    const selected = employeeReducer(initialState, A.loadEmployeeSuccess({ employee }));
    const state = employeeReducer(selected, A.deleteEmployeeSuccess({ id: '1' }));
    expect(state.selected).toBeNull();
  });

  it('keeps selected when another employee is deleted', () => {
    let state = employeeReducer(initialState, A.loadEmployeeSuccess({ employee }));
    state = employeeReducer(state, A.addEmployeeSuccess(second));
    state = employeeReducer(state, A.deleteEmployeeSuccess({ id: '2' }));
    expect(state.selected).toEqual(employee);
  });

  it('handles mutation failure', () => {
    const state = employeeReducer(initialState, A.addEmployeeFailure({ error: 'Create failed' }));
    expect(state.saving).toBeFalse();
    expect(state.error).toBe('Create failed');
    expect(employeeReducer(initialState, A.updateEmployeeFailure({ error: 'Update failed' })).error).toBe('Update failed');
    expect(employeeReducer(initialState, A.deleteEmployeeFailure({ error: 'Delete failed' })).error).toBe('Delete failed');
  });

  it('clears selected employee', () => {
    const selected = employeeReducer(initialState, A.loadEmployeeSuccess({ employee }));
    expect(employeeReducer(selected, A.clearSelectedEmployee).selected).toBeNull();
  });
});
