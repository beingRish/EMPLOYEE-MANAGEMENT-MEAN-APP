import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { config } from '../config';
import { Observable, exhaustMap, map, of, take } from 'rxjs';
import { Employee } from '../appInterface/emp.interface';
import { AuthService } from './auth.service';
import { User } from '../appModels/user.model';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  api = config.API_URL;

  constructor(
    private http: HttpClient,
    private _authService: AuthService
  ) { }

  saveData(data: any) {
    return this.http.post(`${this.api}/empData2.json`, data)
  }

  fetchData(): Observable<any> {
    return this.http.get<Employee>(`${this.api}/empData2.json`).pipe(
      map((resData: any) => {
        const userArray = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key) && !resData[key]?.isDeleted) {
            userArray.push({ userId: key, ...resData[key] });
          }
        }
        return userArray;
      })
    )
  }

  fetchSingleEmployee(id: any) {
    return this.http.get<any>(`${this.api}/empData2/${id}.json`)
  }

  deleteEmployee(userId: any): Observable<any> {
    return this.http.put(`${this.api}/empData2/${userId}.json`, { isDeleted: true });
  }


}
