import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { config } from '../config';
import { map, Observable, take } from 'rxjs';
import { Employee } from '../appInterface/emp.interface';

@Injectable({
  providedIn: 'root'
})
export class DesignUtilityService {

  api = config.API_URL;

  constructor(
    private http: HttpClient,
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

  deleteEmployee(id: any): Observable<any> {
    return this.http.put(`${this.api}/empData2/${id}.json`, { isDeleted: true });
  }

  updateEmployee(id: any, data:any){
    return this.http.put(`${this.api}/empData2/${id}.json`, data)
  }


}
