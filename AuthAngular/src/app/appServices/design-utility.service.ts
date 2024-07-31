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
    return this.http.post<Employee>(this.api, emp);
  }

  getEmployeeList(){
    return this.http.get<Employee[]>(this.api);
  }

  getEmployeeById(id: string): Observable<Employee>  {
    return this.http.get<Employee>(`${this.api}/${id}`)
  }

  updateEmployee(id: string, emp:Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.api}/${id}`, emp)
  }

  deleteEmployee(id: string){
    return this.http.delete(`${this.api}/${id}`);
  }
}
