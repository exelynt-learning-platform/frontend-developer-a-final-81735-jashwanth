import { createAction, props } from '@ngrx/store';
import { Country } from '../../core/models/country.model';
export const loadCountries = createAction('[Countries] Load');
export const loadCountriesSuccess = createAction('[Countries] Load Success', props<{ countries: Country[] }>());
export const loadCountriesFailure = createAction('[Countries] Load Failure', props<{ error: string }>());