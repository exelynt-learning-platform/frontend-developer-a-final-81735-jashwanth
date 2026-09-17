import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let http: HttpTestingController;
  const base = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee';
  const employee = { id: '1', name: 'A', email: 'a@test.com', mobile: '1234567890', country: 'India', state: 'Telangana', district: 'Hyderabad' };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(EmployeeService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('gets all employees', () => {
    service.getAll().subscribe(v => expect(v).toEqual([employee]));
    const req = http.expectOne(base);
    expect(req.request.method).toBe('GET');
    req.flush([employee]);
  });

  it('gets an employee by id', () => {
    service.getById('1').subscribe(v => expect(v).toEqual(employee));
    const req = http.expectOne(`${base}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(employee);
  });

  it('creates an employee', () => {
    const payload = { ...employee };
    delete (payload as any).id;
    service.create(payload).subscribe(v => expect(v).toEqual(employee));
    const req = http.expectOne(base);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(employee);
  });

  it('updates an employee', () => {
    service.update(employee).subscribe(v => expect(v).toEqual(employee));
    const req = http.expectOne(`${base}/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(employee);
    req.flush(employee);
  });

  it('deletes an employee', () => {
    service.delete('1').subscribe(v => expect(v).toBeNull());
    const req = http.expectOne(`${base}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
