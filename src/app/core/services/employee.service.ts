import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee';

  getAll(): Observable<Employee[]> { return this.http.get<Employee[]>(this.url); }
  getById(id: string): Observable<Employee> { return this.http.get<Employee>(`${this.url}/${id}`); }
  create(employee: Omit<Employee, 'id'>): Observable<Employee> { return this.http.post<Employee>(this.url, employee); }
  update(employee: Employee): Observable<Employee> { return this.http.put<Employee>(`${this.url}/${employee.id}`, employee); }
  delete(id: string): Observable<void> { return this.http.delete<void>(`${this.url}/${id}`); }
}