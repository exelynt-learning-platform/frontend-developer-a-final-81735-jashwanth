import { TestBed } from '@angular/core/testing';
import { Subject, of, throwError } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { CountryEffects } from './country.effects';
import * as A from './country.actions';
import { CountryService } from '../../core/services/country.service';

describe('country effects', () => {
  let actions$: Subject<any>;
  let effects: CountryEffects;
  let service: jasmine.SpyObj<CountryService>;

  beforeEach(() => {
    actions$ = new Subject();
    service = jasmine.createSpyObj('CountryService', ['getAll']);
    TestBed.configureTestingModule({
      providers: [
        CountryEffects,
        { provide: Actions, useValue: actions$ },
        { provide: CountryService, useValue: service }
      ]
    });
    effects = TestBed.inject(CountryEffects);
  });

  it('loads countries', () => {
    const countries = [{ id: '1', name: 'India' }];
    service.getAll.and.returnValue(of(countries));
    effects.load$.subscribe(result => expect(result).toEqual(A.loadCountriesSuccess({ countries })));
    actions$.next(A.loadCountries());
  });

  it('handles country load failure', () => {
    service.getAll.and.returnValue(throwError(() => new Error('Country error')));
    effects.load$.subscribe(result => expect(result).toEqual(A.loadCountriesFailure({ error: 'Country error' })));
    actions$.next(A.loadCountries());
  });
});
