import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../appInterface/emp.interface';
import { Select, Store } from '@ngxs/store';
import { SetSelectedEmployee, UpdateEmployee } from '../store/actions/employee.action';
import { Observable, Subscription, tap } from 'rxjs';
import { EmployeeState } from '../store/state/employee.state';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css']
})
export class EmpComponent implements OnInit, OnDestroy {

  Employee!: Employee;
  employeeId!: any;
  editMode!: boolean;
  EditEmployeeForm!: FormGroup;

  @Select(EmployeeState.selectedEmployee) selectedEmployee$!: Observable<Employee>
  selectedEmpSub!: Subscription;

  constructor(
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
    this.selectedEmpSub = this.selectedEmployee$.pipe(
      tap(employee => {
        this.Employee = employee;
        if (this.editMode) {
          this.prefillForm(employee);
        }
      })
    ).subscribe(res => {
      this.Employee = res;
    })
  }

  prefillForm(employee: Employee) {
    this.EditEmployeeForm.patchValue({
      name: employee.name,
      designation: employee.designation,
      dept: employee.dept,
      status: employee.status
    });
  }


  onSubmit() {
    if (this.EditEmployeeForm.valid) {
      this.store.dispatch(new UpdateEmployee({...this.EditEmployeeForm.value, _id: this.employeeId}))
        .subscribe(() => {
          this.getEmployeeById(this.employeeId); 
          this.onDiscard();
        })
    }
  }
  

  onDiscard() {
    this.router.navigate([], { queryParams: { EditMode: null } })
  }
  
  ngOnDestroy(): void {
    this.selectedEmpSub.unsubscribe();
  }

}
