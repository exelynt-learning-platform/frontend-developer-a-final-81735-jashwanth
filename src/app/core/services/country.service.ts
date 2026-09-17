import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({ providedIn: 'root' })
export class CountryService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country';
  getAll(): Observable<Country[]> { return this.http.get<Country[]>(this.url); }
}