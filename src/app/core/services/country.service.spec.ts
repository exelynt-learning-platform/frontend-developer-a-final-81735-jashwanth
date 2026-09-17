import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CountryService } from './country.service';

describe('CountryService', () => {
  let service: CountryService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(CountryService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('gets countries', () => {
    service.getAll().subscribe(value => expect(value[0].name).toBe('India'));
    const req = http.expectOne('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
    expect(req.request.method).toBe('GET');
    req.flush([{ id: '1', name: 'India' }]);
  });
});
