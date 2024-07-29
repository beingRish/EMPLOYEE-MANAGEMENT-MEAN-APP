import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { config } from '../config';
import { Observable } from 'rxjs';
import { Employee } from '../appInterface/emp.interface';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  api = config.API_URL  // mongodb api url

  constructor(
    private http: HttpClient,
  ) { }

  addEmployee(emp: Employee){
    return this.http.post(this.api, emp);
  }

  getEmployeeList() : Observable<Employee[]> {
    return this.http.get<Employee[]>(this.api);
  }

  getSingleEmployee(id: string) {
    return this.http.get<any>(`${this.api}/${id}`)
  }

  updateEmployee(id: any, emp:Employee){
    return this.http.put(`${this.api}/${id}`, emp)
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
