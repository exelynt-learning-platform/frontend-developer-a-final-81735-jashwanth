import { createReducer, on } from '@ngrx/store';
import { Country } from '../../core/models/country.model';
import * as A from './country.actions';
export interface CountryState { countries: Country[]; loading: boolean; error: string | null; }
const initialState: CountryState = { countries: [], loading: false, error: null };
export const countryReducer = createReducer(
  initialState,
  on(A.loadCountries, s => ({ ...s, loading: true, error: null })),
  on(A.loadCountriesSuccess, (s, { countries }) => ({ ...s, countries, loading: false })),
  on(A.loadCountriesFailure, (s, { error }) => ({ ...s, loading: false, error }))
);