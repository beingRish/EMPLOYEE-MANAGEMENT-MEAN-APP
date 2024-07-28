import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEmployeeComponent } from '../delete-employee/delete-employee.component';
import { AuthService } from '../appServices/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  allUsers: any[] = [];
  constructor(
    private _du: DesignUtilityService,
    private _authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this._authService.profileInfo.subscribe(res => {
      this.user = res;
    })
  }

  ngOnInit(): void {
    this.fetchUsers();
    this.onGetUsers();
  }

  fetchUsers(): void {
    this._du.fetchData().subscribe(
      (res: any[]) => {
        this.allUsers = res.map(user => ({ ...user, isDeleted: false }));
        console.log('allUsers',this.allUsers);
        
      },
    );
  }

  addEmployee() {
    this.router.navigate(['add-employee'])
  }

  viewEmployee(id: any) {
    this.router.navigate(['employee', id])
  }

  deleteEmployee(userId: string, enterAnimationDuration: string, exitAnimationDuration: string){
    const dialogRef = this.dialog.open(DeleteEmployeeComponent, {
      width: '350px',
      data: { userId, enterAnimationDuration, exitAnimationDuration }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this._du.deleteEmployee(userId).subscribe(
          () => {
            const userToDelete = this.allUsers.find(user => user.id === userId);
            if (userToDelete) {
              userToDelete.isDeleted = true;
            }
            this.fetchUsers()
          },
        );
      }
      
    });
  }

  onGetUsers(){
    this._du.fetchData()
      .subscribe(
        (res: any)=>{
          const data = JSON.stringify(res)
        },
        (err: any)=>{
          console.log(err);
        }
      )
  }

}
