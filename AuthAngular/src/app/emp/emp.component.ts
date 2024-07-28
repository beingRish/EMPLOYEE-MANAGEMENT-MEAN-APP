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

  Employee: any;
  employeeId: any;
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

    this.employeeId = this.activatedRoute.snapshot.paramMap.get('id')

    this.activatedRoute.queryParamMap.subscribe(res => {
      let qParams = res.get('EditMode');
      if (qParams != null) {
        this.editMode = true;
      } else {
        this.editMode = false;
      }
    })
    this.getEmployee(this.employeeId);
  }

  getEmployee(id: any) {
    this._du.getSingleEmployee(id).subscribe(res => {
      this.Employee = res
      this.EditEmployeeForm.patchValue(this.Employee)
    })
  }


  onSubmit() {
    console.log();
    
    if (this.EditEmployeeForm.valid) {
      this._du.updateEmployee(this.employeeId, this.EditEmployeeForm.value).subscribe(
        (res: any) => {
          this.getEmployee(this.employeeId)
          this.onDiscard()
        },
      );
    }
  }

  onDiscard() {
    this.router.navigate([], { queryParams: { EditMode: null } })
  }

}
