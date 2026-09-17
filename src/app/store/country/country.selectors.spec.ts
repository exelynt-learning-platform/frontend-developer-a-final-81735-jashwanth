import { selectCountries, selectCountryLoading } from './country.selectors';

describe('country selectors', () => {
  const state = { countries: [{ id: '1', name: 'India' }], loading: true, error: null };
  it('selects countries and loading state', () => {
    expect(selectCountries.projector(state)).toEqual(state.countries);
    expect(selectCountryLoading.projector(state)).toBeTrue();
  });
});
