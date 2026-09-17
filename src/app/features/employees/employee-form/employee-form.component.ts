import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import * as EA from '../../../store/employee/employee.actions';
import * as ES from '../../../store/employee/employee.selectors';
import * as CA from '../../../store/country/country.actions';
import * as CS from '../../../store/country/country.selectors';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatSnackBarModule],
  template: `
  <div class="page">
    <div class="toolbar"><div><h1>{{editMode ? 'Edit Employee' : 'Add Employee'}}</h1><p>Enter valid employee information.</p></div></div>
    <form class="card" style="padding:24px;display:grid;gap:8px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))" [formGroup]="form" (ngSubmit)="submit()">
      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label><input matInput formControlName="name">
        @if (form.controls.name.hasError('required')) { <mat-error>Name is required.</mat-error> }
        @else if (form.controls.name.hasError('minlength')) { <mat-error>Name must have at least 2 characters.</mat-error> }
        @else if (form.controls.name.hasError('maxlength')) { <mat-error>Name cannot exceed 50 characters.</mat-error> }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Email</mat-label><input matInput type="email" formControlName="email">
        @if (form.controls.email.hasError('required')) { <mat-error>Email is required.</mat-error> }
        @else if (form.controls.email.hasError('email')) { <mat-error>Enter a valid email.</mat-error> }
        @else if (form.controls.email.hasError('maxlength')) { <mat-error>Email cannot exceed 100 characters.</mat-error> }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Mobile</mat-label><input matInput formControlName="mobile">
        @if (form.controls.mobile.hasError('required')) { <mat-error>Mobile is required.</mat-error> }
        @else if (form.controls.mobile.hasError('pattern')) { <mat-error>Enter 10-15 digits.</mat-error> }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>Country</mat-label>
        <mat-select formControlName="country">
          @for (c of (countries$ | async) ?? []; track c.id) { <mat-option [value]="c.name">{{c.name}}</mat-option> }
        </mat-select>
        @if (form.controls.country.hasError('required')) { <mat-error>Country is required.</mat-error> }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>State</mat-label><input matInput formControlName="state">
        @if (form.controls.state.hasError('required')) { <mat-error>State is required.</mat-error> }
        @else if (form.controls.state.hasError('minlength')) { <mat-error>State must have at least 2 characters.</mat-error> }
        @else if (form.controls.state.hasError('maxlength')) { <mat-error>State cannot exceed 50 characters.</mat-error> }
      </mat-form-field>

      <mat-form-field appearance="outline">
        <mat-label>District</mat-label><input matInput formControlName="district">
        @if (form.controls.district.hasError('required')) { <mat-error>District is required.</mat-error> }
        @else if (form.controls.district.hasError('minlength')) { <mat-error>District must have at least 2 characters.</mat-error> }
        @else if (form.controls.district.hasError('maxlength')) { <mat-error>District cannot exceed 50 characters.</mat-error> }
      </mat-form-field>

      <div style="grid-column:1/-1" class="actions">
        <a mat-stroked-button routerLink="/employees">Cancel</a>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid || (saving$ | async)">{{editMode ? 'Update' : 'Create'}}</button>
      </div>
    </form>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);

  countries$ = this.store.select(CS.selectCountries);
  saving$ = this.store.select(ES.selectSaving);
  editMode = false;
  id = '';

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(100)]],
    mobile: ['', [Validators.required, Validators.pattern(/^\d{10,15}$/)]],
    country: ['', Validators.required],
    state: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    district: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
  });

  ngOnInit() {
    this.store.dispatch(CA.loadCountries());
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.editMode = true;
    this.id = id;
    this.store.dispatch(EA.loadEmployee({ id }));
    this.store.select(ES.selectEmployeeById(id))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(employee => {
        if (employee) this.form.patchValue(employee);
      });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();
    if (this.editMode) {
      this.store.dispatch(EA.updateEmployee({ employee: { id: this.id, ...value } }));
      this.snack.open('Employee update request sent', 'OK', { duration: 2000 });
    } else {
      this.store.dispatch(EA.addEmployee({ employee: value }));
      this.snack.open('Employee create request sent', 'OK', { duration: 2000 });
    }
    this.router.navigateByUrl('/employees');
  }
}
