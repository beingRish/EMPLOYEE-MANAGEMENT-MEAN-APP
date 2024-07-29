import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../appServices/auth.service';
import { Employee } from '../appInterface/emp.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;
  editMode!: boolean;

  allUsers: any[] = [];
  employees: Employee[] = [];

  constructor(
    private _du: DesignUtilityService,
    private _authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this._authService.profileInfo.subscribe(res => {
      this.user = res;
    })
  }

  ngOnInit(): void {
    this.getEmployees()
  }

  getEmployees(){
    this._du.getEmployeeList().subscribe((res: Employee[]) => {
      console.log(res);
      this.employees = res;
      
    })
  }

  addEmployee() {
    this.router.navigate(['add-employee'])
  }

  viewEmployee(id: any, mode: boolean) {
    this.router.navigate(['employee', id], { queryParams: { EditMode: mode } })
  }

  onDeleteEmployee(id: string,){
    if(confirm('Do you want to delete this Employee?')){
      this._du.deleteEmployee(id).subscribe(
        (res) => {
          console.log('Deleted Successfully', res);
          this.getEmployees();
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

}
