import { Employee } from '../../core/models/employee.model';
import { initialState } from './employee.reducer';
import * as S from './employee.selectors';

describe('employee selectors', () => {
  const employee: Employee = {
    id: '1', name: 'A', email: 'a@test.com', mobile: '1234567890',
    country: 'India', state: 'Telangana', district: 'Hyderabad'
  };
  const state = {
    ...initialState,
    ids: ['1'],
    entities: { '1': employee },
    loading: true,
    detailLoading: true,
    saving: true,
    error: 'error',
    selected: employee,
    searchLoading: true,
    searchCompleted: true,
    searchNotFound: false,
    searchError: null
  };

  it('selects all employee state values', () => {
    expect(S.selectLoading.projector(state)).toBeTrue();
    expect(S.selectDetailLoading.projector(state)).toBeTrue();
    expect(S.selectSaving.projector(state)).toBeTrue();
    expect(S.selectError.projector(state)).toBe('error');
    expect(S.selectSelectedEmployee.projector(state)).toEqual(employee);
    expect(S.selectSearchLoading.projector(state)).toBeTrue();
    expect(S.selectSearchCompleted.projector(state)).toBeTrue();
    expect(S.selectSearchNotFound.projector(state)).toBeFalse();
    expect(S.selectSearchError.projector(state)).toBeNull();
  });

  it('selects an employee by id', () => {
    expect(S.selectEmployeeById('1').projector(state.entities)).toEqual(employee);
    expect(S.selectEmployeeById('99').projector(state.entities)).toBeNull();
  });
});
