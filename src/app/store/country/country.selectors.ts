import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountryState } from './country.reducer';
export const selectCountryState = createFeatureSelector<CountryState>('countries');
export const selectCountries = createSelector(selectCountryState, s => s.countries);
export const selectCountryLoading = createSelector(selectCountryState, s => s.loading);