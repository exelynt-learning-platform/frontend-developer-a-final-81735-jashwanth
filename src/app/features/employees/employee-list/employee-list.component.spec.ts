import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeListComponent } from './employee-list.component';
import * as A from '../../../store/employee/employee.actions';

describe('EmployeeListComponent', () => {
  let fixture: ComponentFixture<EmployeeListComponent>;
  let component: EmployeeListComponent;
  let store: jasmine.SpyObj<Store>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snack: jasmine.SpyObj<MatSnackBar>;

  const employee = { id: '1', name: 'A', email: 'a@test.com', mobile: '1234567890', country: 'India', state: 'Telangana', district: 'Hyderabad' };

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    store.select.and.returnValues(of([]), of(false), of(null));
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    snack = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent],
      providers: [
        { provide: Store, useValue: store },
        { provide: MatDialog, useValue: dialog },
        { provide: MatSnackBar, useValue: snack }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates and loads employees', () => {
    expect(component).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(A.loadEmployees());
  });

  it('deletes after confirmation', () => {
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as any);
    component.remove(employee);
    expect(store.dispatch).toHaveBeenCalledWith(A.deleteEmployee({ id: '1' }));
    expect(snack.open).toHaveBeenCalled();
  });

  it('does not delete when cancelled', () => {
    store.dispatch.calls.reset();
    dialog.open.and.returnValue({ afterClosed: () => of(false) } as any);
    component.remove(employee);
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
