import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CountryService } from '../../core/services/country.service';
import * as A from './country.actions';
@Injectable()
export class CountryEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(CountryService);
  load$ = createEffect(() => this.actions$.pipe(
    ofType(A.loadCountries),
    switchMap(() => this.service.getAll().pipe(
      map(countries => A.loadCountriesSuccess({ countries })),
      catchError(e => of(A.loadCountriesFailure({ error: e?.message ?? 'Unable to load countries.' })))
    ))
  ));
}