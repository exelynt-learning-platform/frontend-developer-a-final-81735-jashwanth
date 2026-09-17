import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adapter, EmployeeState } from './employee.reducer';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');
export const { selectAll: selectAllEmployees, selectEntities: selectEmployeeEntities } = adapter.getSelectors(selectEmployeeState);
export const selectLoading = createSelector(selectEmployeeState, s => s.loading);
export const selectDetailLoading = createSelector(selectEmployeeState, s => s.detailLoading);
export const selectSaving = createSelector(selectEmployeeState, s => s.saving);
export const selectError = createSelector(selectEmployeeState, s => s.error);
export const selectSelectedEmployee = createSelector(selectEmployeeState, s => s.selected);
export const selectSearchLoading = createSelector(selectEmployeeState, s => s.searchLoading);
export const selectSearchCompleted = createSelector(selectEmployeeState, s => s.searchCompleted);
export const selectSearchNotFound = createSelector(selectEmployeeState, s => s.searchNotFound);
export const selectSearchError = createSelector(selectEmployeeState, s => s.searchError);
export const selectEmployeeById = (id: string) =>
  createSelector(selectEmployeeEntities, entities => entities[id] ?? null);
