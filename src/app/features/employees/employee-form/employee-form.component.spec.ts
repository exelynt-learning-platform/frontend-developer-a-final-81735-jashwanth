import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { EmployeeFormComponent } from './employee-form.component';
import * as A from '../../../store/employee/employee.actions';
import * as CA from '../../../store/country/country.actions';

describe('EmployeeFormComponent', () => {
  let fixture: ComponentFixture<EmployeeFormComponent>;
  let component: EmployeeFormComponent;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;
  let snack: jasmine.SpyObj<MatSnackBar>;

  const valid = {
    name: 'Test User',
    email: 'test@test.com',
    mobile: '1234567890',
    country: 'India',
    state: 'Telangana',
    district: 'Hyderabad'
  };

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    store.select.and.returnValues(of([]), of(false), of(null));
    router = jasmine.createSpyObj('Router', ['navigateByUrl']);
    snack = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [EmployeeFormComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: Router, useValue: router },
        { provide: MatSnackBar, useValue: snack },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => null } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates add form', () => {
    expect(component.editMode).toBeFalse();
    expect(component.form.invalid).toBeTrue();
  });

  it('dispatches country loading on init', () => {
    expect(store.dispatch).toHaveBeenCalledWith(CA.loadCountries());
  });

  it('marks invalid form as touched and does not submit', () => {
    component.submit();
    expect(component.form.controls.name.touched).toBeTrue();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  it('creates an employee from valid data', () => {
    component.form.setValue(valid);
    component.submit();
    expect(store.dispatch).toHaveBeenCalledWith(A.addEmployee({ employee: valid }));
    expect(router.navigateByUrl).toHaveBeenCalledWith('/employees');
    expect(snack.open).toHaveBeenCalled();
  });
});
