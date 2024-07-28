import { Component, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit {

  user: any;
  userId: any;
  editMode!: boolean;
  EditEmployeeForm!: FormGroup;
  EmployeeInfo: any;

  constructor(
    private _du: DesignUtilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.EditEmployeeForm = this.fb.group({
      name: ['', Validators.required],
      designation: ['', Validators.required],
      dept: ['', Validators.required],
      status: ['', Validators.required]
    })

    this.userId = this.activatedRoute.snapshot.paramMap.get('id')

    this.activatedRoute.queryParamMap.subscribe(res => {
      let qParams = res.get('EditMode');
      if (qParams != null) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    })
    this.getEmployee(this.userId);
  }

  getEmployee(userId: any) {
    this._du.fetchSingleEmployee(userId).subscribe(res => {
      this.user = res
      console.log(res);
    })
  }


  onSubmit() {
    if (this.EditEmployeeForm.valid) {
      const updatedEmployee = {
        ...this.EditEmployeeForm.value,
        id: new Date().getTime().toString()
      };
      this._du.updateEmployee(this.userId, updatedEmployee).subscribe(
        (res: any) => {
          this.onDiscard()
        },
      );
    }
  }

  onDiscard() {
    this.router.navigate([], { queryParams: { EditMode: null } })
  }

}
