import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { EmployeeSearchComponent } from './employee-search.component';
import * as A from '../../../store/employee/employee.actions';

describe('EmployeeSearchComponent', () => {
  let fixture: ComponentFixture<EmployeeSearchComponent>;
  let component: EmployeeSearchComponent;
  let store: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    store.select.and.returnValues(of(null), of(false), of(false), of(null));
    await TestBed.configureTestingModule({
      imports: [EmployeeSearchComponent],
      providers: [{ provide: Store, useValue: store }]
    }).compileComponents();
    fixture = TestBed.createComponent(EmployeeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('creates the component', () => expect(component).toBeTruthy());

  it('searches using a trimmed id', () => {
    component.id.setValue('  123  ');
    component.search();
    expect(store.dispatch).toHaveBeenCalledWith(A.searchEmployee({ id: '123' }));
  });

  it('does not search with an empty id', () => {
    component.id.setValue('   ');
    component.search();
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
