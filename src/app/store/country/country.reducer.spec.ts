import { countryReducer } from './country.reducer';
import * as A from './country.actions';

describe('countryReducer', () => {
  const country = { id: '1', name: 'India' };

  it('loads countries', () => {
    let state = countryReducer(undefined, A.loadCountries());
    expect(state.loading).toBeTrue();
    state = countryReducer(state, A.loadCountriesSuccess({ countries: [country] }));
    expect(state.countries).toEqual([country]);
    expect(state.loading).toBeFalse();
  });

  it('handles country failure', () => {
    const state = countryReducer(undefined, A.loadCountriesFailure({ error: 'Failed' }));
    expect(state.error).toBe('Failed');
    expect(state.loading).toBeFalse();
  });
});
