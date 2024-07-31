import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../appServices/auth.service';
import { Employee } from '../appInterface/emp.interface';
import { Select, Store } from '@ngxs/store';
import { DeleteEmployee, GetEmployee } from '../store/actions/employee.action';
import { Observable, Subscription } from 'rxjs';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  user: any;
  editMode!: boolean;

  @Select(EmployeeState.getEmployeeList) employees$!:Observable<Employee[]>;

  @Select(EmployeeState.employeeLoaded) employeeLoaded$!:Observable<boolean>;
  empLoadedSub!: Subscription;

  constructor(
    private _authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private store: Store,
  ) {
    this._authService.profileInfo.subscribe(res => {
      this.user = res;
    })
  }

  ngOnInit(): void {
    this.getEmployees()
    this.employees$.subscribe(res=>{
    })
  }

  getEmployees() {
    this.empLoadedSub = this.employeeLoaded$.subscribe(loadedEmployees => {
      if(!loadedEmployees){
        this.store.dispatch(new GetEmployee());
      }
    })
  }

  addEmployee() {
    this.router.navigate(['add-employee'])
  }

  viewEmployee(id: any, mode: boolean) {
    this.router.navigate(['employee', id], { queryParams: { EditMode: mode } })
  }

  onDeleteEmployee(id: string,) {
    if (confirm('Do you want to delete this Employee?')) {
      this.store.dispatch(new DeleteEmployee(id))
      this.getEmployees();
    }
  }

  ngOnDestroy(): void {
    this.empLoadedSub.unsubscribe()
  }

}
