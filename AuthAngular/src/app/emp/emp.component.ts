import { Component, OnDestroy, OnInit } from '@angular/core';
import { DesignUtilityService } from '../appServices/design-utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../appInterface/emp.interface';
import { Select, Store } from '@ngxs/store';
import { SetSelectedEmployee } from '../store/actions/employee.action';
import { Observable, Subscription } from 'rxjs';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit, OnDestroy {

  Employee!: Employee;
  employeeId!: String | null;
  editMode!: boolean;
  EditEmployeeForm!: FormGroup;

  @Select(EmployeeState.selectedEmployee) selectedEmployee$!: Observable<Employee>
  selectedEmpSub!: Subscription;

  constructor(
    private _du: DesignUtilityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store
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
    this.getEmployeeById(this.employeeId);
  }

  getEmployeeById(id: any) {
    this.store.dispatch(new SetSelectedEmployee(id));
    this.selectedEmpSub = this.selectedEmployee$.subscribe(res => {
      this.Employee = res;
    })
  }

  onSubmit() {
    console.log();

    if (this.EditEmployeeForm.valid) {
      this._du.updateEmployee(this.employeeId, this.EditEmployeeForm.value).subscribe(
        (res: any) => {
          this.getEmployeeById(this.employeeId)
          this.onDiscard()
        },
      );
    }
  }

  onDiscard() {
    this.router.navigate([], { queryParams: { EditMode: null } })
  }
  
  ngOnDestroy(): void {
    this.selectedEmpSub.unsubscribe();
  }

}
